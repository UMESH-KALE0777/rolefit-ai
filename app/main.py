import streamlit as st
import os
import sys
import plotly.graph_objects as go

# Fix import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.pdf_reader import extract_text_from_pdf
from app.preprocessing import clean_text
from app.skill_extractor import extract_skills
from utils.bias_detector import detect_bias, suggest_rewrite
from utils.interview_generator import generate_questions
from app.scoring import (
    calculate_similarity,
    compute_final_score,
    generate_explanation,
    get_recommendation
)

# Page config
st.set_page_config(page_title="RoleFit AI", page_icon="📄", layout="wide")

st.title("📄 RoleFit AI – Intelligent Hiring Assistant")

# ---------------- INPUTS ----------------

uploaded_file = st.file_uploader("Upload Resume (PDF)", type=["pdf"])
st.subheader("📌 Enter Job Description")
job_description = st.text_area("Paste Job Description Here")

# ---------------- BIAS DETECTION (Runs when JD exists) ----------------

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

# ---------------- MAIN SCORING LOGIC ----------------

if uploaded_file is not None and job_description:

    try:
        temp_path = "temp_resume.pdf"

        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

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

            # ---- Skill Score ----
            if len(jd_skills) > 0:
                skill_score = len(matched_skills) / len(jd_skills)
            else:
                skill_score = 0

            # ---- Hybrid Final Score ----
            final_score = compute_final_score(
                semantic_similarity,
                skill_score
            )
            recommendation = get_recommendation(final_score)

            # ---- Explanation ----
            explanation = generate_explanation(
                semantic_similarity,
                skill_score,
                missing_skills
            )

            # ---------------- DISPLAY SCORES ----------------

            st.subheader("📊 Evaluation Summary")
            st.metric("Final Score", f"{final_score*100:.0f}%")

            st.subheader("📌 Hiring Recommendation")

            if recommendation == "Strongly Recommended":
                st.success(recommendation)
            elif recommendation == "Recommended":
                st.info(recommendation)
            elif recommendation == "Consider with Caution":
                st.warning(recommendation)
            else:
                st.error(recommendation)

            st.subheader("🎯 Overall Match Score")
            st.metric("Final Score", f"{final_score*100:.0f}%")

            st.subheader("📊 Score Breakdown")
            st.write("Semantic Similarity")
            st.progress(semantic_similarity)

            st.write("Skill Coverage")
            st.progress(skill_score)

            st.subheader("🧠 AI Explanation")
            st.info(explanation)
            # ---------------- INTERVIEW QUESTIONS ----------------

            questions = generate_questions(
                missing_skills,
                role_title="Data Engineer Intern"
            )

            st.subheader("🎤 Suggested Interview Questions")

            with st.expander("🎯 Skill-Gap Questions"):
                if questions["skill_gap"]:
                    for q in questions["skill_gap"]:
                        st.write(f"- {q}")
                else:
                    st.write("No major skill gaps detected.")

            with st.expander("🛠 Technical Questions"):
                for q in questions["technical"]:
                    st.write(f"- {q}")

            with st.expander("🧠 Behavioral Questions"):
                for q in questions["behavioral"]:
                    st.write(f"- {q}")

            # ---------------- ANALYTICS DASHBOARD ----------------

            st.subheader("📈 Candidate Analytics Dashboard")

            fig = go.Figure()

            fig.add_trace(go.Scatterpolar(
                r=[semantic_similarity, skill_score, final_score],
                theta=["Semantic Similarity", "Skill Coverage", "Final Score"],
                fill='toself'
            ))

            fig.update_layout(
                polar=dict(radialaxis=dict(visible=True, range=[0, 1])),
                showlegend=False
            )

            st.plotly_chart(fig, use_container_width=True)

            # Skill Bar Chart
            if jd_skills:
                skill_status = {
                    "Matched Skills": len(matched_skills),
                    "Missing Skills": len(missing_skills)
                }

                bar_fig = go.Figure(
                    data=[go.Bar(
                        x=list(skill_status.keys()),
                        y=list(skill_status.values())
                    )]
                )

                bar_fig.update_layout(
                    title="Skill Coverage Overview",
                    yaxis_title="Number of Skills"
                )

                st.plotly_chart(bar_fig, use_container_width=True)

    except Exception as e:
        st.error(f"Error occurred: {str(e)}")

    finally:
        if os.path.exists("temp_resume.pdf"):
            os.remove("temp_resume.pdf")



import pandas as pd

# Convert to DataFrame
df = pd.DataFrame(results)

# Sort by Final Score descending
df = df.sort_values(by="Final Score", ascending=False)

st.subheader("🏆 Candidate Ranking Leaderboard")
st.dataframe(df, use_container_width=True)