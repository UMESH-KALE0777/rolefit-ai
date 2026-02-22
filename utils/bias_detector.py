import re

# ---- Gender-Coded Words + Neutral Suggestions ----

BIAS_WORDS = {
    "ninja": "skilled professional",
    "rockstar": "high-performing professional",
    "aggressive": "proactive",
    "dominant": "strong",
    "competitive": "results-oriented",
    "fearless": "confident",
    "young team": "dynamic team",
    "recent graduate": "entry-level candidate",
    "digital native": "tech-savvy individual",
    "5+ years minimum": "experience preferred"
}


def detect_bias(text):

    text_lower = text.lower()
    found_bias = {}

    for word, replacement in BIAS_WORDS.items():
        if re.search(rf"\b{word}\b", text_lower):
            found_bias[word] = replacement

    bias_score = min(len(found_bias), 10)

    if bias_score == 0:
        severity = "Low"
    elif bias_score <= 3:
        severity = "Moderate"
    else:
        severity = "High"

    return {
        "found_bias": found_bias,
        "bias_score": bias_score,
        "severity": severity
    }


def suggest_rewrite(text, found_bias):
    rewritten_text = text

    for word, replacement in found_bias.items():
        rewritten_text = re.sub(
            rf"\b{word}\b",
            replacement,
            rewritten_text,
            flags=re.IGNORECASE
        )

    return rewritten_text