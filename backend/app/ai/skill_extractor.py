import re
import json
import os
from loguru import logger


def load_skills_dictionary() -> dict:
    """Load skills dictionary from JSON file."""
    
    # Find the data directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(
        current_dir, "..", "..", "data", "skills_dictionary.json"
    )
    
    try:
        with open(data_path, "r") as f:
            skills = json.load(f)
            logger.info(f"Skills dictionary loaded successfully")
            return skills
    except Exception as e:
        logger.error(f"Failed to load skills dictionary: {e}")
        return {}


# Load once at module level
SKILLS_DICTIONARY = load_skills_dictionary()


def extract_skills(text: str) -> dict:
    """
    Extract skills from text using dictionary + regex.
    Uses word boundaries to avoid false positives.
    Example: "Java" won't match inside "JavaScript"
    """
    
    text_lower = text.lower()
    found_skills = {}
    
    for category, skills in SKILLS_DICTIONARY.items():
        found_in_category = []
        
        for skill in skills:
            # Word boundary pattern
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            
            if re.search(pattern, text_lower):
                found_in_category.append(skill)
        
        if found_in_category:
            found_skills[category] = found_in_category
    
    return found_skills


def get_flat_skill_list(skills_dict: dict) -> list:
    """Convert categorized skills dict to flat list."""
    flat = []
    for category, skills in skills_dict.items():
        flat.extend(skills)
    return flat


def compare_skills(
    resume_skills: dict,
    jd_skills: dict
) -> dict:
    """
    Compare resume skills against JD skills.
    Returns matched, missing, and extra skills.
    """
    
    resume_flat = set(get_flat_skill_list(resume_skills))
    jd_flat = set(get_flat_skill_list(jd_skills))
    
    matched = list(resume_flat.intersection(jd_flat))
    missing = list(jd_flat - resume_flat)
    extra = list(resume_flat - jd_flat)
    
    return {
        "matched": sorted(matched),
        "missing": sorted(missing),
        "extra": sorted(extra)
    }


def calculate_skill_coverage(
    matched_skills: list,
    jd_skills: dict
) -> float:
    """
    Calculate what percentage of JD skills
    are present in the resume.
    Returns score 0-100.
    """
    
    jd_flat = get_flat_skill_list(jd_skills)
    
    if not jd_flat:
        return 0.0
    
    coverage = (len(matched_skills) / len(jd_flat)) * 100
    return min(100.0, coverage)