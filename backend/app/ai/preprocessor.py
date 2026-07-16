import spacy
import re
from loguru import logger

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
    logger.info("spaCy model loaded successfully")
except OSError:
    logger.error(
        "spaCy model not found. "
        "Run: python -m spacy download en_core_web_sm"
    )
    nlp = None


def preprocess_text(text: str) -> str:
    """
    Clean and normalize text for AI processing.
    Used for both resume and job description.
    """
    
    if not text:
        return ""
    
    # Lowercase
    text = text.lower()
    
    # Remove special characters but keep important ones
    text = re.sub(r'[^\w\s\+\#\.\,\-]', ' ', text)
    
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    
    if nlp is None:
        return text.strip()
    
    # spaCy processing
    doc = nlp(text)
    
    # Lemmatize and remove stopwords + punctuation
    tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop
        and not token.is_punct
        and len(token.text) > 1
    ]
    
    return " ".join(tokens).strip()


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