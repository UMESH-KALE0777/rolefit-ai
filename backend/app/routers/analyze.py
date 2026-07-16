import time
import io
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from loguru import logger

from app.ai.parser import extract_text_from_pdf, extract_contact_info
from app.ai.preprocessor import preprocess_text
from app.ai.skill_extractor import extract_skills
from app.ai.bias_detector import detect_bias
from app.ai.interview_gen import generate_interview_questions
from app.ai.scorer import calculate_hybrid_score
from app.models.schemas import AnalyzeResponse

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    start_time = time.time()

    logger.info(
        f"Analysis started | "
        f"file: {resume.filename} | "
        f"size: {resume.size} bytes"
    )

    # ── Validate file type ───────────────────────────
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are accepted."
        )

    # ── Validate file size (5MB max) ─────────────────
    pdf_bytes = await resume.read()
    size_mb = len(pdf_bytes) / (1024 * 1024)

    if size_mb > 5:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is 5MB."
        )

    # ── Validate job description ─────────────────────
    if len(job_description.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Job description is too short. "
                   "Please provide a complete job description."
        )

    try:
        # ── Step 1: Parse PDF ────────────────────────
        logger.info("Step 1: Parsing PDF...")
        raw_resume_text = extract_text_from_pdf(pdf_bytes)
        contact_info = extract_contact_info(raw_resume_text)

        # ── Step 2: Preprocess text ──────────────────
        logger.info("Step 2: Preprocessing text...")
        clean_resume = preprocess_text(raw_resume_text)
        clean_jd = preprocess_text(job_description)

        # ── Step 3: Extract skills ───────────────────
        logger.info("Step 3: Extracting skills...")
        resume_skills = extract_skills(raw_resume_text)
        jd_skills = extract_skills(job_description)

        # ── Step 4: Calculate score ──────────────────
        logger.info("Step 4: Calculating hybrid score...")
        results = calculate_hybrid_score(
            clean_resume,
            clean_jd,
            resume_skills,
            jd_skills
        )

        # ── Step 5: Detect bias ──────────────────────
        logger.info("Step 5: Detecting bias...")
        bias_report = detect_bias(job_description)

        # ── Step 6: Generate interview questions ─────
        logger.info("Step 6: Generating interview questions...")
        interview_questions = generate_interview_questions(
            results["skills"]["missing"]
        )

        # ── Build response ───────────────────────────
        processing_time = round(time.time() - start_time, 2)

        logger.info(
            f"Analysis complete | "
            f"score: {results['score']['overall']} | "
            f"time: {processing_time}s"
        )

        return AnalyzeResponse(
            status="success",
            processing_time=f"{processing_time}s",
            candidate=contact_info,
            score=results["score"],
            skills=results["skills"],
            bias_report=bias_report,
            interview_questions=interview_questions,
            explainability=results["explainability"]
        )

    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        raise HTTPException(
            status_code=500,
            detail="Analysis failed. Please try again."
        )