import re

# ---- Gender-Coded Words ----

MASCULINE_CODED_WORDS = [
    "ninja",
    "rockstar",
    "aggressive",
    "dominant",
    "competitive",
    "fearless",
    "assertive",
    "driven"
]

FEMININE_CODED_WORDS = [
    "supportive",
    "collaborative",
    "empathetic",
    "understanding",
    "nurturing",
    "committed",
    "loyal"
]

# ---- Age-Biased Phrases ----

AGE_BIASED_PHRASES = [
    "young team",
    "recent graduate",
    "digital native",
    "5+ years minimum",
    "energetic young",
    "junior only"
]


def detect_bias(text):
    """
    Detect gender-coded and age-biased language in job descriptions.
    Returns a dictionary with findings.
    """

    text = text.lower()

    masculine_found = [
        word for word in MASCULINE_CODED_WORDS if re.search(rf"\b{word}\b", text)
    ]

    feminine_found = [
        word for word in FEMININE_CODED_WORDS if re.search(rf"\b{word}\b", text)
    ]

    age_found = [
        phrase for phrase in AGE_BIASED_PHRASES if phrase in text
    ]

    total_flags = len(masculine_found) + len(feminine_found) + len(age_found)

    bias_score = min(total_flags, 10)  # Simple 0–10 scale

    return {
        "masculine_words": masculine_found,
        "feminine_words": feminine_found,
        "age_phrases": age_found,
        "bias_score": bias_score
    }
