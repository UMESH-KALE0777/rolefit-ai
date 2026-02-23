SKILL_QUESTIONS = {
    "python": "Can you describe a project where you used Python to solve a real-world problem?",
    "sql": "How have you optimized SQL queries for performance?",
    "machine learning": "Can you explain a machine learning project you built end-to-end?",
    "docker": "Have you containerized an application before? What challenges did you face?",
    "aws": "What AWS services have you worked with and in what context?",
    "data engineering": "Can you explain how you would design a scalable data pipeline?",
    "etl": "What ETL tools have you used and how did you ensure data quality?",
}


def generate_questions(missing_skills):
    questions = []

    for skill in missing_skills:
        if skill in SKILL_QUESTIONS:
            questions.append(SKILL_QUESTIONS[skill])
        else:
            questions.append(
                f"Can you describe your experience or familiarity with {skill}?"
            )

    return questions[:5]  # Limit to 5 questions