import io
import re
import fitz  # PyMuPDF
import pdfplumber
from loguru import logger

MIN_EXTRACTED_TEXT_LENGTH = 100


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extract text from PDF using pdfplumber, falling back to PyMuPDF (fitz)."""
    
    # ── Primary: pdfplumber ──────────────────────────
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            for page in pdf.pages:
                # extract_text handles both regular text and tables cleanly without duplication
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        # Good extraction check
        if len(text.strip()) > MIN_EXTRACTED_TEXT_LENGTH:
            logger.info("PDF parsed successfully with pdfplumber")
            return clean_extracted_text(text)
    
    except Exception:
        logger.exception("pdfplumber extraction failed. Trying PyMuPDF fallback.")
    
    # ── Fallback: PyMuPDF ────────────────────────────
    try:
        text = ""
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            for page in doc:
                text += page.get_text() + "\n"
        
        if len(text.strip()) > MIN_EXTRACTED_TEXT_LENGTH:
            logger.info("PDF parsed successfully with PyMuPDF")
            return clean_extracted_text(text)
    
    except Exception:
        logger.exception("PyMuPDF extraction also failed")
    
    # ── Scanned PDF detected ─────────────────────────
    raise ValueError(
        "This PDF appears to be scanned or image-based. "
        "Please upload a text-based PDF."
    )


def clean_extracted_text(text: str) -> str:
    """Clean raw extracted PDF text."""
    
    # Fix ligatures (common PDF artifacts)
    text = text.replace("ﬁ", "fi")
    text = text.replace("ﬂ", "fl")
    text = text.replace("ﬀ", "ff")
    text = text.replace("ﬃ", "ffi")
    
    # Normalize whitespace (preserving logical line breaks)
    text = re.sub(r'[ \t]+', ' ', text)
    
    # Remove non-printable characters
    text = re.sub(r'[^\x20-\x7E\n]', ' ', text)
    
    # Fix multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip()


def extract_contact_info(raw_text: str) -> dict:
    """Extract contact information using regex and heuristics."""
    
    # Email
    emails = re.findall(
        r'[\w\.-]+@[\w\.-]+\.\w+', raw_text
    )
    
    # Phone (handles +91, brackets, dashes, spaces)
    phones = re.findall(
        r'[\+]?[1-9][0-9\s\-\(\)]{7,}[0-9]', raw_text
    )
    
    # LinkedIn
    linkedin = re.findall(
        r'linkedin\.com/in/[\w\-]+', raw_text
    )
    
    # GitHub
    github = re.findall(
        r'github\.com/[\w\-]+', raw_text
    )
    
    # Improved Name Extraction
    name = None
    ignored_headers = {"resume", "curriculum vitae", "cv", "profile", "summary"}
    
    for line in raw_text.splitlines():
        cleaned_line = line.strip()
        if not cleaned_line:
            continue
            
        # Skip generic CV titles
        if cleaned_line.lower() in ignored_headers:
            continue
            
        # Skip lines that contain email or web links
        if "@" in cleaned_line or "http" in cleaned_line or "linkedin" in cleaned_line:
            continue
            
        # Fixed regex string quote escaping (`\'` handles single quotes in names like O'Connor)
        if re.match(r"^[A-Z][a-zA-Z\.\-']+(\s+[A-Z][a-zA-Z\.\-']+){1,3}$", cleaned_line):
            name = cleaned_line
            break

    # Fallback to first non-empty line if regex rule misses
    if not name:
        lines = [l.strip() for l in raw_text.splitlines() if l.strip()]
        name = lines[0] if lines else None
    
    return {
        "name": name,
        "email": emails[0] if emails else None,
        "phone": phones[0].strip() if phones else None,
        "linkedin": linkedin[0] if linkedin else None,
        "github": github[0] if github else None
    }