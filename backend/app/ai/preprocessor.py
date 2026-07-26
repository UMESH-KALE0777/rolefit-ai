import re
from loguru import logger

def preprocess_text(text: str) -> str:
    """
    Clean and normalize text for AI processing.
    Used for both resume and job description.
    """
    if not text:
        return ""

    text = text.lower()
    text = re.sub(r"[^\w\s+#.,-]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()

def detect_sections(text: str) -> dict:
    """
    Detect resume sections using keyword matching.
    """
    
    SECTION_HEADERS = {
        "experience": [
            "work experience", "experience",
            "employment history", "professional experience",
            "work history", "career history"
        ],
        "education": [
            "education", "academic background",
            "qualifications", "academic history"
        ],
        "skills": [
            "skills", "technical skills", "core competencies",
            "technologies", "tools", "expertise",
            "technical expertise"
        ],
        "projects": [
            "projects", "personal projects",
            "academic projects", "portfolio",
            "key projects"
        ],
        "summary": [
            "summary", "objective", "profile",
            "about me", "professional summary",
            "career objective"
        ]
    }
    
    lines = text.split('\n')
    sections = {}
    current_section = "unknown"
    
    for line in lines:
        line_lower = line.lower().strip()
        
        matched = False
        for section, keywords in SECTION_HEADERS.items():
            if any(kw in line_lower for kw in keywords):
                current_section = section
                sections[section] = []
                matched = True
                break
        
        if not matched and current_section in sections:
            sections[current_section].append(line)
    
    return sections