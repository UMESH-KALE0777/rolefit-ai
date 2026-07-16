import pdfplumber
import fitz  # pyMuPDF
import io
import re
from loguru import logger


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Primary:  pdfplumber (better for tables + layout)
    Fallback: pyMuPDF   (handles edge cases)
    """
    
    # ── Primary: pdfplumber ──────────────────────────
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            for page in pdf.pages:
                # Extract tables first
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        row_text = " ".join(
                            cell for cell in row if cell
                        )
                        text += row_text + "\n"
                
                # Extract regular text
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        # Good extraction check
        if len(text.strip()) > 100:
            logger.info("PDF parsed successfully with pdfplumber")
            return clean_extracted_text(text)
    
    except Exception as e:
        logger.warning(f"pdfplumber failed: {e}. Trying pyMuPDF.")
    
    # ── Fallback: pyMuPDF ────────────────────────────
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        
        if len(text.strip()) > 100:
            logger.info("PDF parsed successfully with pyMuPDF")
            return clean_extracted_text(text)
    
    except Exception as e:
        logger.error(f"pyMuPDF also failed: {e}")
    
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
    
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Remove non-printable characters
    text = re.sub(r'[^\x20-\x7E\n]', ' ', text)
    
    # Fix multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text.strip()


def extract_contact_info(text: str) -> dict:
    """Extract contact information using regex."""
    
    # Email
    emails = re.findall(
        r'[\w\.-]+@[\w\.-]+\.\w+', text
    )
    
    # Phone (handles +91, brackets, dashes)
    phones = re.findall(
        r'[\+]?[1-9][0-9\s\-\(\)]{7,}[0-9]', text
    )
    
    # LinkedIn
    linkedin = re.findall(
        r'linkedin\.com/in/[\w\-]+', text
    )
    
    # GitHub
    github = re.findall(
        r'github\.com/[\w\-]+', text
    )
    
    # Name — first non-empty line (usually the name)
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    name = lines[0] if lines else None
    
    return {
        "name": name,
        "email": emails[0] if emails else None,
        "phone": phones[0].strip() if phones else None,
        "linkedin": linkedin[0] if linkedin else None,
        "github": github[0] if github else None
    }