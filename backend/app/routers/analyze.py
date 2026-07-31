import asyncio
import io
import time
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from loguru import logger

from app.ai.bias_detector import detect_bias
from app.ai.interview_gen import generate_interview_questions
from app.ai.parser import extract_contact_info, extract_text_from_pdf
from app.ai.preprocessor import preprocess_text
from app.ai.scorer import calculate_hybrid_score, analyze_projects
from app.ai.skill_extractor import extract_skills
from app.models.schemas import AnalyzeResponse

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    start_time = time.time()

    logger.info(
        f"Analysis started | "
        f"size: {resume.size} bytes | "
        f"content_type: {resume.content_type}"
    )

    # ── 1. Validate File Metadata ─────────────────────
    if not resume.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only PDF files are accepted."
        )

    # Read bytes and check size
    pdf_bytes = await resume.read()
    if len(pdf_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size allowed is 5MB."
        )

    # ── 2. Validate Job Description ────────────────────
    clean_jd_raw = job_description.strip()
    if len(clean_jd_raw) < 50:
        raise HTTPException(
            status_code=400,
            detail="Job description is too short. Please provide a complete description (minimum 50 characters)."
        )

    try:
        # ── Step 1: Parse PDF ────────────────────────
        logger.info("Step 1: Parsing PDF...")
        raw_resume_text = await asyncio.to_thread(extract_text_from_pdf, pdf_bytes)
        
        if not raw_resume_text or len(raw_resume_text.strip()) < 30:
            raise HTTPException(
                status_code=400,
                detail="Could not extract readable text from the PDF. If this is a scanned image, please upload a text-based PDF."
            )

        contact_info = await asyncio.to_thread(extract_contact_info, raw_resume_text)

        # ── Step 2: Preprocess text ──────────────────
        logger.info("Step 2: Preprocessing text...")
        clean_resume = await asyncio.to_thread(preprocess_text, raw_resume_text)
        clean_jd = await asyncio.to_thread(preprocess_text, clean_jd_raw)

        # ── Step 3: Extract skills ───────────────────
        logger.info("Step 3: Extracting skills...")
        resume_skills_task = asyncio.to_thread(extract_skills, raw_resume_text)
        jd_skills_task = asyncio.to_thread(extract_skills, clean_jd_raw)
        
        # Run skill extraction in parallel to reduce processing time
        resume_skills, jd_skills = await asyncio.gather(
            resume_skills_task, jd_skills_task
        )

        # ── Step 4: Calculate score ──────────────────
        logger.info("Step 4: Calculating hybrid score...")
        results = await asyncio.to_thread(
            calculate_hybrid_score,
            clean_resume,
            clean_jd,
            resume_skills,
            jd_skills
        )

        # ── Steps 5, 6 & 7: Run Bias, Questions & Project Analysis concurrently ──
        logger.info("Steps 5-7: Running bias check, interview generation, and project analysis...")
        bias_task = asyncio.to_thread(detect_bias, clean_jd_raw)
        interview_task = asyncio.to_thread(
            generate_interview_questions, 
            results["skills"]["missing"]
        )
        project_task = asyncio.to_thread(
            analyze_projects,
            raw_resume_text,
            clean_jd_raw
        )

        bias_report, interview_questions, project_analysis = await asyncio.gather(
            bias_task, interview_task, project_task
        )

        # ── Build response ───────────────────────────
        processing_time = round(time.time() - start_time, 2)

        logger.info(
            f"Analysis complete | score: {results['score']['overall']} | time: {processing_time}s"
        )

        return AnalyzeResponse(
            status="success",
            processing_time=f"{processing_time}s",
            candidate=contact_info,
            score=results["score"],
            skills=results["skills"],
            bias_report=bias_report,
            interview_questions=interview_questions,
            explainability=results["explainability"],
            project_analysis=project_analysis
        )

    except HTTPException:
        # Re-raise explicit HTTP exceptions (e.g., bad PDFs or unreadable text)
        raise

    except ValueError as e:
        logger.error(f"Validation error during processing: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        logger.exception("Analysis failed")
        raise HTTPException(
            status_code=500,
            detail="Analysis failed. Please try again."
        )