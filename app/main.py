import streamlit as st
import os
import sys

# ---- Fix Import Path ----
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text
from app.scoring import calculate_similarity
from app.skill_extractor import extract_skills

# ---- Page Config ----
st.set_page_config(
    page_title="RoleFit AI",
    page_icon="📄",
    layout="wide"
)

st.title("📄 RoleFit AI – Intelligent Resume Screening")
st.markdown("Upload a resume and paste a job description to evaluate candidate fit.")

# ---- Inputs ----
uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])

st.subheader("📌 Enter Job Description")
job_description = st.text_area("Paste Job Description Here")

# ---- Main Processing ----
if uploaded_file is not None and job_description:

    try:
        # Save temporary resume file
        temp_path = "temp_resume.pdf"
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        # Extract raw text
        raw_text = extract_text_from_pdf(temp_path)

        if not raw_text.strip():
            st.error("❌ Could not extract text from the uploaded PDF.")
        else:
            # Clean resume and JD
            cleaned_resume = clean_text(raw_text)
            cleaned_jd = clean_text(job_description)

            # ---- Similarity Score ----
            similarity = calculate_similarity(cleaned_resume, cleaned_jd)

            st.subheader("🎯 Overall Match Score")
            st.success(f"Resume matches the job description by {similarity}%")

            # ---- Skill Extraction ----
            resume_skills = extract_skills(cleaned_resume)
            jd_skills = extract_skills(cleaned_jd)

            matched_skills = list(set(resume_skills) & set(jd_skills))
            missing_skills = list(set(jd_skills) - set(resume_skills))

            if len(jd_skills) > 0:
                skill_match_percentage = round((len(matched_skills) / len(jd_skills)) * 100, 2)
            else:
                skill_match_percentage = 0

            # ---- Skill Display ----
            st.subheader("🧠 Skill Match Analysis")

            col1, col2 = st.columns(2)

            with col1:
                st.markdown("### ✅ Matched Skills")
                if matched_skills:
                    for skill in matched_skills:
                        st.write(f"- {skill}")
                else:
                    st.write("No matching skills found")

            with col2:
                st.markdown("### ❌ Missing Skills")
                if missing_skills:
                    for skill in missing_skills:
                        st.write(f"- {skill}")
                else:
                    st.write("No missing skills")

            st.info(f"Skill Match Percentage: {skill_match_percentage}%")

    except Exception as e:
        st.error(f"⚠️ An error occurred: {str(e)}")

    finally:
        # Remove temporary file
        if os.path.exists("temp_resume.pdf"):
            os.remove("temp_resume.pdf")
