from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import streamlit as st

@st.cache_resource
def get_vectorizer():
    return TfidfVectorizer()

def calculate_similarity(resume_text, job_description_vector, vectorizer):
    """
    Returns semantic similarity score using a pre-fitted vectorizer and JD vector.
    """
    resume_vector = vectorizer.transform([resume_text])
    similarity_score = cosine_similarity(resume_vector, job_description_vector)[0][0]
    return similarity_score


def compute_final_score(semantic_score, skill_score):
    """
    Weighted hybrid scoring:
    60% semantic similarity
    40% skill coverage
    """
    final_score = 0.6 * semantic_score + 0.4 * skill_score
    return round(float(final_score), 2)


def generate_explanation(semantic_score, skill_score, missing_skills):
    if semantic_score > 0.75 and skill_score > 0.75:
        verdict = "Excellent match. Strong alignment in both context and technical skills."
    elif semantic_score > 0.75 and skill_score < 0.5:
        verdict = "Good contextual fit but missing key technical skills."
    elif skill_score > 0.75 and semantic_score < 0.5:
        verdict = "Strong technical skills but may not align closely with the job context."
    else:
        verdict = "Moderate match. Consider reviewing missing skill areas."

    if missing_skills:
        # missing_skills might be a list or a string
        skills_str = missing_skills if isinstance(missing_skills, str) else ", ".join(missing_skills)
        verdict += f" Missing skills: {skills_str}."

    return verdict

def get_recommendation(final_score):
    """
    Returns a recommendation label based on the final score.
    """
    if final_score >= 0.80:
        return "Strongly Recommended"
    elif final_score >= 0.65:
        return "Recommended"
    elif final_score >= 0.50:
        return "Consider with Caution"
    else:
        return "Not Recommended"
