SKILL_QUESTIONS = {
    "python": "Describe a project where you used Python to solve a complex problem.",
    "sql": "How do you optimize SQL queries for large datasets?",
    "machine learning": "Explain an end-to-end ML project you built and deployed.",
    "docker": "Have you containerized applications? What challenges did you face?",
    "aws": "What AWS services have you worked with and how did you use them?",
    "data engineering": "How would you design a scalable data pipeline?",
    "etl": "How do you ensure data quality during ETL processes?"
}

TECHNICAL_GENERAL = [
    "Can you walk me through the most technically challenging project on your resume?",
    "How do you debug production issues in a live system?",
    "How do you ensure scalability and performance in your solutions?"
]

BEHAVIORAL_QUESTIONS = [
    "Tell me about a time you faced a difficult technical challenge.",
    "How do you prioritize tasks under tight deadlines?",
    "Describe a situation where you worked in a team to solve a problem."
]


def generate_questions(missing_skills, role_title=None):

    skill_gap_questions = []
    technical_questions = TECHNICAL_GENERAL.copy()
    behavioral_questions = BEHAVIORAL_QUESTIONS.copy()

    # Skill-gap specific questions
    for skill in missing_skills:
        if skill in SKILL_QUESTIONS:
            skill_gap_questions.append(SKILL_QUESTIONS[skill])
        else:
            skill_gap_questions.append(
                f"What is your experience level with {skill}?"
            )

    # Optional role-based question
    if role_title:
        technical_questions.append(
            f"What excites you about working as a {role_title}?"
        )

    return {
        "skill_gap": skill_gap_questions[:3],
        "technical": technical_questions[:3],
        "behavioral": behavioral_questions[:3]
    }