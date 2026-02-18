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
