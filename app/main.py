import streamlit as st
import os
from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text

st.set_page_config(page_title="RoleFit AI", layout="wide")

st.title("📄 RoleFit AI – Resume Preprocessing Demo")

uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])

if uploaded_file is not None:
    
    # Save temp file
    temp_path = "temp_resume.pdf"

    with open(temp_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    # Extract raw text
    raw_text = extract_text_from_pdf(temp_path)

    st.subheader("📌 Raw Extracted Text")
    st.write(raw_text[:1000])

    # Clean text
    cleaned_text = clean_text(raw_text)

    st.subheader("🧹 Cleaned & Processed Text")
    st.write(cleaned_text[:1000])
