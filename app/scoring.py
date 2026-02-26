from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(resume_text, job_description):
    """
    Returns semantic similarity score (0–1 range)
    """
    documents = [resume_text, job_description]

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity_score = cosine_similarity(
        tfidf_matrix[0:1], tfidf_matrix[1:2]
    )[0][0]

    return similarity_score


def compute_final_score(semantic_score, skill_score):
    """
    Weighted hybrid scoring:
    60% semantic similarity
    40% skill coverage
    """
    final_score = 0.6 * semantic_score + 0.4 * skill_score
    return round(final_score, 2)


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
        verdict += f" Missing skills: {', '.join(missing_skills)}."

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
