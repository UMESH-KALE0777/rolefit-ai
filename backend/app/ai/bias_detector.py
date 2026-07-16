import re
from loguru import logger

# ── Bias word ruleset (150+ words) ──────────────────
BIAS_WORDS = {
    # Gender biased
    "ninja": "skilled professional",
    "rockstar": "high performer",
    "guru": "expert",
    "wizard": "specialist",
    "superhero": "talented professional",
    "manpower": "workforce",
    "mankind": "humanity",
    "chairman": "chairperson",
    "businessman": "business professional",
    "salesman": "sales representative",
    "policeman": "police officer",
    "fireman": "firefighter",
    "stewardess": "flight attendant",
    "waitress": "server",
    "actress": "actor",
    "housewife": "homemaker",
    "mankind": "humankind",
    "he/she": "they",
    "his/her": "their",

    # Age biased
    "young": "motivated",
    "energetic": "driven",
    "digital native": "tech-savvy",
    "recent graduate": "early career professional",
    "fresh": "enthusiastic",
    "mature": "experienced",
    "seasoned": "experienced",
    "veteran": "experienced professional",
    "overqualified": "highly experienced",

    # Culture fit biased
    "culture fit": "values alignment",
    "culture add": "values alignment",
    "beer friday": "team social events",
    "ping pong": "recreational activities",
    "frat": "team environment",
    "fraternity": "team environment",
    "hustle": "dedication",
    "hustler": "motivated professional",
    "grind": "hard work",
    "work hard play hard": "dedicated team",
    "passionate": "motivated",
    "obsessed": "dedicated",
    "hungry": "motivated",
    "killer instinct": "competitive drive",
    "aggressive": "results-driven",
    "dominant": "high performing",

    # Exclusionary language
    "native english speaker": "fluent english speaker",
    "mother tongue": "primary language",
    "traditional": "established",
    "unconventional": "innovative",
    "normal": "standard",
    "typical": "standard",
    "exotic": "diverse",

    # Unnecessary requirements
    "must be available 24/7": "flexible availability",
    "unlimited hours": "flexible hours",
    "work weekends": "occasional weekend availability",
    "no work-life balance": "fast-paced environment",
    "family-friendly": "supportive environment",

    # Physical requirements (unless necessary)
    "physically fit": "able to perform required tasks",
    "able-bodied": "able to perform required tasks",
    "walk": "move through",
    "stand for long periods": "ability to remain stationary",

    # Socioeconomic bias
    "prestigious university": "accredited university",
    "top school": "accredited institution",
    "ivy league": "top university",
    "elite": "top performing",
    "pedigree": "background",

    # Personality bias
    "extrovert": "collaborative",
    "introvert": "independent",
    "type a": "goal-oriented",
    "alpha": "leader",
    "lone wolf": "independent worker",
    "team player": "collaborative professional",

    # Vague requirements
    "self-starter": "proactive professional",
    "go-getter": "motivated professional",
    "thought leader": "industry expert",
    "visionary": "strategic thinker",
    "evangelist": "advocate",
    "champion": "advocate",
    "ninja developer": "skilled developer",
    "code ninja": "skilled developer",
    "10x engineer": "highly productive engineer",
    "unicorn": "versatile professional",
    "hacker": "innovative developer",
    "growth hacker": "growth specialist",
}


def detect_bias(jd_text: str) -> dict:
    """
    Scan job description for biased language.
    Returns flagged words and neutral suggestions.
    """
    
    text_lower = jd_text.lower()
    flagged = []
    
    for biased_word, suggestion in BIAS_WORDS.items():
        # Word boundary matching
        pattern = r'\b' + re.escape(biased_word.lower()) + r'\b'
        
        if re.search(pattern, text_lower):
            flagged.append({
                "word": biased_word,
                "suggestion": suggestion
            })
            logger.info(f"Bias detected: '{biased_word}'")
    
    return {
        "found": len(flagged) > 0,
        "flagged": flagged
    }


def get_bias_summary(bias_report: dict) -> str:
    """Generate human readable bias summary."""
    
    if not bias_report["found"]:
        return "No biased language detected in job description."
    
    count = len(bias_report["flagged"])
    words = [f["word"] for f in bias_report["flagged"]]
    
    return (
        f"Found {count} potentially biased "
        f"term(s): {', '.join(words)}. "
        f"Consider using more inclusive language."
    )