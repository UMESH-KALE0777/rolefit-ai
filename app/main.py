import streamlit as st
import os
import tempfile
import pandas as pd
import plotly.graph_objects as go

# Proper module imports (assuming run from root or with python -m app.main)
# For Streamlit apps, the working directory is usually the project root.
from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text
from app.skill_extractor import extract_skills
from utils.bias_detector import detect_bias, suggest_rewrite
from utils.interview_generator import generate_questions
from app.scoring import (
    get_vectorizer,
    calculate_similarity,
    compute_final_score,
    generate_explanation,
    get_recommendation
)

# Page configuration
st.set_page_config(page_title="RoleFit AI", page_icon="📄", layout="wide")

st.markdown("""
    <style>
    .main {
        background-color: #f5f7f9;
    }
    .stMetric {
        background-color: #ffffff;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    </style>
    """, unsafe_allow_html=True)

st.title("📄 RoleFit AI – Intelligent Hiring Assistant")
st.markdown("---")

# ---------------- INPUTS ----------------
col1, col2 = st.columns([1, 2])

with col1:
    st.subheader("📁 Upload Data")
    uploaded_files = st.file_uploader(
        "Upload Resumes (PDF)",
        type=["pdf"],
        accept_multiple_files=True
    )
    
with col2:
    st.subheader("📌 Job Description")
    job_description = st.text_area("Paste the Job Description here to analyze alignment", height=200)

# ---------------- BIAS DETECTION ----------------
if job_description:
    bias_report = detect_bias(job_description)
    
    with st.expander("⚖️ Job Description Bias Analysis", expanded=False):
        if bias_report["bias_score"] == 0:
            st.success("No obviously biased language detected.")
        else:
            st.warning(f"Bias Score: {bias_report['bias_score']}/10 ({bias_report['severity']} Severity)")
            st.write("Flagged Words & Suggested Neutral Alternatives:")
            for word, replacement in bias_report["found_bias"].items():
                st.markdown(f"**{word}** → *{replacement}*")
            
            if st.button("🔄 Generate Neutral JD"):
                improved_jd = suggest_rewrite(job_description, bias_report["found_bias"])
                st.info("Suggested Neutral Version:")
                st.code(improved_jd, language="text")

# ---------------- MAIN PROCESSING ----------------
if uploaded_files and job_description:
    st.markdown("---")
    st.subheader("⚙️ Processing Resumes...")

    try:
        results = []
        vectorizer = get_vectorizer()
        
        # Pre-process JD once to optimize
        cleaned_jd = clean_text(job_description)
        jd_vector = vectorizer.fit_transform([cleaned_jd])
        jd_skills = extract_skills(cleaned_jd)

        progress_bar = st.progress(0)
        
        for idx, uploaded_file in enumerate(uploaded_files):
            # SAFE TEMPORARY FILE HANDLING
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
                tmp_file.write(uploaded_file.getbuffer())
                tmp_path = tmp_file.name

            try:
                raw_text = extract_text_from_pdf(tmp_path)
                
                if not raw_text.strip():
                    st.error(f"Could not extract text from: {uploaded_file.name}")
                    continue

                cleaned_resume = clean_text(raw_text)
                
                # Semantic Similarity (Optimized: only transform resume)
                semantic_similarity = calculate_similarity(cleaned_resume, jd_vector, vectorizer)

                # Skill Extraction
                resume_skills = extract_skills(cleaned_resume)
                matched_skills = list(set(resume_skills) & set(jd_skills))
                missing_skills = list(set(jd_skills) - set(resume_skills))

                # Skill Score
                skill_score = len(matched_skills) / len(jd_skills) if jd_skills else 0

                # Final Scoring
                final_score = compute_final_score(semantic_similarity, skill_score)
                recommendation = get_recommendation(final_score)
                explanation = generate_explanation(semantic_similarity, skill_score, missing_skills)
                
                # Interview Questions
                interview_data = generate_questions(missing_skills)

                results.append({
                    "Candidate": uploaded_file.name,
                    "Final Score": float(final_score),
                    "Semantic": float(semantic_similarity),
                    "Skill Coverage": float(skill_score),
                    "Matched Skills": matched_skills,
                    "Missing Skills": missing_skills,
                    "Recommendation": recommendation,
                    "Explanation": explanation,
                    "Interview Questions": interview_data
                })

            finally:
                # Ensure temp file is removed
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
            
            progress_bar.progress((idx + 1) / len(uploaded_files))

        # ---------------- RESULTS DISPLAY ----------------
        if results:
            df_display = pd.DataFrame(results).sort_values(by="Final Score", ascending=False)
            
            st.subheader("🏆 Candidate Ranking Leaderboard")
            st.dataframe(
                df_display[["Candidate", "Final Score", "Recommendation"]].style.format({"Final Score": "{:.2%}"}),
                use_container_width=True
            )

            st.markdown("---")
            st.subheader("📊 Detailed Candidate Analysis")
            
            selected_candidate = st.selectbox("Select a candidate to view detailed breakdown", df_display["Candidate"])
            candidate_data = next(item for item in results if item["Candidate"] == selected_candidate)

            c_col1, c_col2 = st.columns([1, 1])

            with c_col1:
                st.markdown(f"### Results for {selected_candidate}")
                st.metric("Final Score", f"{candidate_data['Final Score']:.2%}")
                st.info(f"**Recommendation:** {candidate_data['Recommendation']}")
                st.write(f"**Explanation:** {candidate_data['Explanation']}")
                
                with st.expander("🛠️ Skill Gap Analysis"):
                    st.write("**Matched Skills:**", ", ".join(candidate_data["Matched Skills"]) if candidate_data["Matched Skills"] else "None")
                    st.write("**Missing Skills:**", ", ".join(candidate_data["Missing Skills"]) if candidate_data["Missing Skills"] else "None")

                with st.expander("❓ Suggested Interview Questions"):
                    st.write("**Skill Gap Questions:**")
                    for q in candidate_data["Interview Questions"]["skill_gap"]:
                        st.write(f"- {q}")
                    st.write("**Technical Questions:**")
                    for q in candidate_data["Interview Questions"]["technical"]:
                        st.write(f"- {q}")

            with c_col2:
                # RADAR CHART
                categories = ['Final Score', 'Semantic Similarity', 'Skill Coverage']
                values = [candidate_data['Final Score'], candidate_data['Semantic'], candidate_data['Skill Coverage']]

                fig = go.Figure()
                fig.add_trace(go.Scatterpolar(
                    r=values,
                    theta=categories,
                    fill='toself',
                    name=selected_candidate,
                    line_color='#1f77b4'
                ))

                fig.update_layout(
                    polar=dict(
                        radialaxis=dict(visible=True, range=[0, 1])
                    ),
                    showlegend=False,
                    title="Candidate Score Breakdown"
                )
                st.plotly_chart(fig, use_container_width=True)

    except Exception as e:
        st.error(f"⚠️ An error occurred during processing: {str(e)}")
        st.exception(e)
else:
    st.info("💡 Please upload resumes and provide a job description to begin the screening process.")




