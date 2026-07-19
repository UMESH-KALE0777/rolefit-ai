from google import genai
from loguru import logger
from app.core.config import get_settings

settings = get_settings()

# ── Configure Gemini ─────────────────────────────────
client = genai.Client(api_key=settings.gemini_api_key)

# ── Fallback questions for common skills ─────────────
FALLBACK_QUESTIONS = {
    "python": [
        "Explain the difference between a list and a tuple in Python.",
        "What are Python decorators and how do you use them?",
        "How does Python handle memory management?"
    ],
    "javascript": [
        "What is the difference between let, const, and var?",
        "Explain event delegation in JavaScript.",
        "What is the event loop in JavaScript?"
    ],
    "react": [
        "What is the difference between state and props in React?",
        "Explain the useEffect hook and when to use it.",
        "What is the virtual DOM and how does React use it?"
    ],
    "node.js": [
        "What is the event-driven architecture in Node.js?",
        "How does Node.js handle asynchronous operations?",
        "What is the difference between require and import?"
    ],
    "sql": [
        "What is the difference between INNER JOIN and LEFT JOIN?",
        "Explain database normalization and its forms.",
        "What is an index and how does it improve performance?"
    ],
    "docker": [
        "What is the difference between a Docker image and container?",
        "Explain the purpose of a Dockerfile.",
        "How does Docker networking work?"
    ],
    "aws": [
        "What is the difference between EC2 and Lambda?",
        "Explain S3 storage classes and when to use each.",
        "What is IAM and why is it important?"
    ],
    "machine learning": [
        "What is the difference between supervised and unsupervised learning?",
        "Explain overfitting and how to prevent it.",
        "What is cross-validation and why is it used?"
    ],
    "fastapi": [
        "What makes FastAPI faster than Flask or Django?",
        "How does FastAPI handle request validation?",
        "Explain dependency injection in FastAPI."
    ],
    "kubernetes": [
        "What is the difference between a Pod and a Deployment?",
        "How does Kubernetes handle service discovery?",
        "Explain the role of etcd in Kubernetes."
    ],
    "git": [
        "What is the difference between git merge and git rebase?",
        "Explain the git branching strategy you follow.",
        "How do you resolve merge conflicts in Git?"
    ],
    "typescript": [
        "What is the difference between type and interface in TypeScript?",
        "Explain generics in TypeScript with an example.",
        "What are TypeScript decorators?"
    ],
    "postgresql": [
        "What is the difference between PostgreSQL and MySQL?",
        "Explain ACID properties in PostgreSQL.",
        "How do you optimize a slow PostgreSQL query?"
    ],
    "redis": [
        "What data structures does Redis support?",
        "When would you use Redis over a relational database?",
        "Explain Redis pub/sub mechanism."
    ],
    "mongodb": [
        "What is the difference between SQL and NoSQL databases?",
        "Explain MongoDB aggregation pipeline.",
        "How does MongoDB handle transactions?"
    ],
}


def generate_questions_with_gemini(skill: str) -> list:
    """Generate interview questions using Gemini API."""
    try:
        prompt = f"""Generate exactly 3 technical interview questions 
for a candidate who is missing the skill: {skill}

Rules:
- Questions should test fundamental understanding
- One easy, one medium, one hard question
- Be specific and technical
- Return only the 3 questions, numbered 1. 2. 3.
- No extra text or explanation"""

        response = client.models.generate_content(
            model="gemini-2.0-flash-lite",
            contents=prompt
        )

        # Parse response into list
        lines = response.text.strip().split('\n')
        questions = []

        for line in lines:
            line = line.strip()
            if line and (
                line[0].isdigit() or
                line.startswith('-') or
                line.startswith('•')
            ):
                cleaned = line.lstrip('0123456789.-•) ').strip()
                if cleaned:
                    questions.append(cleaned)

        if len(questions) >= 2:
            logger.info(
                f"Gemini generated {len(questions)} "
                f"questions for: {skill}"
            )
            return questions[:3]

    except Exception as e:
        logger.warning(
            f"Gemini failed for {skill}: {e}. "
            f"Using fallback questions."
        )

    return None


def get_fallback_questions(skill: str) -> list:
    """Get hardcoded questions for common skills."""
    skill_lower = skill.lower()

    if skill_lower in FALLBACK_QUESTIONS:
        return FALLBACK_QUESTIONS[skill_lower]

    for key in FALLBACK_QUESTIONS:
        if key in skill_lower or skill_lower in key:
            return FALLBACK_QUESTIONS[key]

    return [
        f"What is your experience level with {skill}?",
        f"Can you describe a project where you used {skill}?",
        f"What are the core concepts of {skill} you are familiar with?"
    ]


def generate_interview_questions(missing_skills: list) -> list:
    """
    Generate interview questions for missing skills.
    Uses Gemini API with fallback to hardcoded questions.
    Max 5 skills = max 15 questions.
    """

    results = []
    top_skills = missing_skills[:5]

    for skill in top_skills:
        questions = generate_questions_with_gemini(skill)

        if not questions:
            questions = get_fallback_questions(skill)

        results.append({
            "skill": skill,
            "questions": questions
        })

    return results