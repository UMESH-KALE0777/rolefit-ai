from loguru import logger
from app.ai.embedder import (
    embed_resume,
    embed_job_description,
    calculate_semantic_similarity
)
from app.ai.skill_extractor import (
    extract_skills,
    compare_skills,
    calculate_skill_coverage
)


def get_score_label(score: float) -> str:
    """Convert numeric score to human readable label."""
    if score >= 90:
        return "Perfect Match"
    elif score >= 75:
        return "Strong Match"
    elif score >= 60:
        return "Good Match"
    elif score >= 45:
        return "Partial Match"
    else:
        return "Low Match"


def generate_explainability(
    score: float,
    matched_skills: list,
    missing_skills: list,
    label: str
) -> dict:
    """Generate human readable explanation of score."""

    # Why this score
    if score >= 75:
        why = (
            f"Resume strongly matches the job requirements. "
            f"Key matching skills: {', '.join(matched_skills[:3])}. "
            f"Missing skills account for the gap."
        )
    elif score >= 50:
        why = (
            f"Resume partially matches the job requirements. "
            f"Some key skills match but important gaps exist. "
            f"Focus on acquiring: {', '.join(missing_skills[:3])}."
        )
    else:
        why = (
            f"Resume has low alignment with job requirements. "
            f"Significant skill gaps detected. "
            f"Consider building skills in: "
            f"{', '.join(missing_skills[:5])}."
        )

    # Improvement suggestions
    suggestions = []

    if missing_skills:
        suggestions.append(
            f"Add experience with: "
            f"{', '.join(missing_skills[:3])}"
        )

    if len(matched_skills) < 3:
        suggestions.append(
            "Highlight more relevant technical skills "
            "in your resume"
        )

    suggestions.append(
        "Tailor your resume summary to match "
        "the job description keywords"
    )

    if len(missing_skills) > 3:
        suggestions.append(
            f"Consider certifications in: "
            f"{', '.join(missing_skills[3:6])}"
        )

    return {
        "why_this_score": why,
        "improvement_suggestions": suggestions
    }


def calculate_hybrid_score(
    resume_text: str,
    jd_text: str,
    resume_skills: dict,
    jd_skills: dict
) -> dict:
    """
    Calculate hybrid match score.

    Formula:
    Final Score = (Semantic Score × 60%) +
                  (Skill Coverage × 40%)
    """

    logger.info("Calculating semantic similarity...")

    # ── Semantic Score (60%) ─────────────────────────
    resume_embedding = embed_resume(resume_text)
    jd_embedding = embed_job_description(jd_text)
    semantic_score = calculate_semantic_similarity(
        resume_embedding,
        jd_embedding
    )

    logger.info(f"Semantic score: {semantic_score:.2f}")

    # ── Skill Coverage (40%) ─────────────────────────
    skill_comparison = compare_skills(resume_skills, jd_skills)
    skill_score = calculate_skill_coverage(
        skill_comparison["matched"],
        jd_skills
    )

    logger.info(f"Skill coverage score: {skill_score:.2f}")

    # ── Hybrid Score ─────────────────────────────────
    final_score = (semantic_score * 0.60) + (skill_score * 0.40)
    final_score = round(final_score, 2)

    label = get_score_label(final_score)

    logger.info(f"Final hybrid score: {final_score} — {label}")

    # ── Explainability ───────────────────────────────
    explainability = generate_explainability(
        final_score,
        skill_comparison["matched"],
        skill_comparison["missing"],
        label
    )

    return {
        "score": {
            "overall": final_score,
            "semantic": round(semantic_score, 2),
            "skill_coverage": round(skill_score, 2),
            "label": label
        },
        "skills": skill_comparison,
        "explainability": explainability
    }