import streamlit as st
import os
import sys

# Fix import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text
from app.skill_extractor import extract_skills
from utils.bias_detector import detect_bias
from utils.bias_detector import detect_bias, suggest_rewrite
from utils.interview_generator import generate_questions
from app.scoring import (
    calculate_similarity,
    compute_final_score,
    generate_explanation
)

# Page config
st.set_page_config(page_title="RoleFit AI", page_icon="📄", layout="wide")

st.title("📄 RoleFit AI – Explainable Resume Screening")

# Inputs
uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])
st.subheader("📌 Enter Job Description")
job_description = st.text_area("Paste Job Description Here")

# Main logic
if uploaded_file is not None and job_description:

    try:
        temp_path = "temp_resume.pdf"

        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        # Extract text
        raw_text = extract_text_from_pdf(temp_path)

        if not raw_text.strip():
            st.error("Could not extract text from PDF.")
        else:
            # Clean text
            cleaned_resume = clean_text(raw_text)
            cleaned_jd = clean_text(job_description)

            # ---- Semantic Similarity (0–1) ----
            semantic_similarity = calculate_similarity(
                cleaned_resume, cleaned_jd
            )

            # ---- Skill Extraction ----
            resume_skills = extract_skills(cleaned_resume)
            jd_skills = extract_skills(cleaned_jd)

            matched_skills = list(set(resume_skills) & set(jd_skills))
            missing_skills = list(set(jd_skills) - set(resume_skills))

            if len(jd_skills) > 0:
                skill_score = len(matched_skills) / len(jd_skills)
            else:
                skill_score = 0

            # ---- Hybrid Final Score ----
            final_score = compute_final_score(
                semantic_similarity,
                skill_score
            )

            # ---- Explanation ----
            explanation = generate_explanation(
                semantic_similarity,
                skill_score,
                missing_skills
            )

            # ---- Display ----
            st.subheader("🎯 Overall Match Score")
            st.metric("Final Score", f"{final_score*100:.0f}%")

            st.subheader("📊 Score Breakdown")

            st.write("Semantic Similarity")
            st.progress(semantic_similarity)

            st.write("Skill Coverage")
            st.progress(skill_score)

            st.subheader("🧠 AI Explanation")
            st.info(explanation)

    except Exception as e:
        st.error(f"Error occurred: {str(e)}")

    finally:
        if os.path.exists("temp_resume.pdf"):
            os.remove("temp_resume.pdf")


# ---- Bias Detection ----
if job_description:

    bias_report = detect_bias(job_description)

    st.subheader("⚖️ Bias Detection Report")

    if bias_report["bias_score"] == 0:
        st.success("No obvious biased language detected.")
    else:
        st.warning(
            f"Bias Score: {bias_report['bias_score']} / 10 "
            f"({bias_report['severity']} Risk)"
        )

        st.write("Flagged Words & Suggested Replacements:")

        for word, replacement in bias_report["found_bias"].items():
            st.write(f"- '{word}' → consider replacing with '{replacement}'")

        # ---- Fix My JD Button ----
        if st.button("🔄 Fix My JD"):
            improved_jd = suggest_rewrite(
                job_description,
                bias_report["found_bias"]
            )

            st.subheader("✨ Suggested Neutral Version")
            st.text_area("Rewritten JD", improved_jd, height=200)

    st.info(
        "RoleFit AI does not use candidate names or demographic attributes in scoring."
    )