import streamlit as st
import os
import sys
from app.scoring import calculate_similarity 
from app.skill_extractor import extract_skills


# ---- Fix Import Path (Important for your folder structure) ----
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text

# ---- Page Config ----
st.set_page_config(
    page_title="RoleFit AI",
    page_icon="📄",
    layout="wide"
)

# ---- UI Header ----
st.title("📄 RoleFit AI – Resume Preprocessing Demo")
st.markdown("Upload a resume to extract and preprocess text.")

# ---- File Upload ----
uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])

if uploaded_file is not None:

    try:
        # Save temporary file
        temp_path = "temp_resume.pdf"

        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        # Extract text
        raw_text = extract_text_from_pdf(temp_path)

        if not raw_text.strip():
            st.error("❌ Could not extract text from this PDF.")
        else:
            # Display Raw Text
            st.subheader("📌 Raw Extracted Text (Preview)")
            st.text_area("Raw Text", raw_text[:1000], height=250)

            # Clean Text
            cleaned_text = clean_text(raw_text)

            # Display Cleaned Text
            st.subheader("🧹 Cleaned & Processed Text (Preview)")
            st.text_area("Cleaned Text", cleaned_text[:1000], height=250)

    except Exception as e:
        st.error(f"⚠️ An error occurred: {str(e)}")

    finally:
        # Remove temp file
        if os.path.exists("temp_resume.pdf"):
            os.remove("temp_resume.pdf")
st.subheader("📌 Enter Job Description")
job_description = st.text_area("Paste Job Description Here")

if uploaded_file is not None and job_description:

    try:
        temp_path = "temp_resume.pdf"

        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        raw_text = extract_text_from_pdf(temp_path)
        cleaned_resume = clean_text(raw_text)
        cleaned_jd = clean_text(job_description)

        similarity = calculate_similarity(cleaned_resume, cleaned_jd)

        st.subheader("🎯 Match Score")
        st.success(f"Resume matches the job description by {similarity}%")

    except Exception as e:
        st.error(f"Error: {str(e)}")

    finally:
        if os.path.exists("temp_resume.pdf"):
            os.remove("temp_resume.pdf")


# Extract skills
resume_skills = extract_skills(cleaned_resume)
jd_skills = extract_skills(cleaned_jd)

matched_skills = list(set(resume_skills) & set(jd_skills))
missing_skills = list(set(jd_skills) - set(resume_skills))

if len(jd_skills) > 0:
    skill_match_percentage = round((len(matched_skills) / len(jd_skills)) * 100, 2)
else:
    skill_match_percentage = 0

st.subheader("🧠 Skill Match Analysis")

st.write("### ✅ Matched Skills")
st.write(matched_skills if matched_skills else "No matching skills found")

st.write("### ❌ Missing Skills")
st.write(missing_skills if missing_skills else "No missing skills")

st.info(f"Skill Match: {skill_match_percentage}%")
