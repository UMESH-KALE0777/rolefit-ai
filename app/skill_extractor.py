import json
import os
import re
import streamlit as st

@st.cache_data
def load_skills():
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    skills_path = os.path.join(base_path, "data", "skills_dictionary.json")

    try:
        with open(skills_path, "r") as f:
            skills = json.load(f)
        return skills
    except (FileNotFoundError, json.JSONDecodeError) as e:
        st.error(f"Error loading skills dictionary: {e}")
        return []


def extract_skills(text):
    skills = load_skills()
    found_skills = []

    text = text.lower()

    for skill in skills:
        # Use regex with word boundaries to avoid false positives (e.g., 'git' in 'digital')
        pattern = rf"\b{re.escape(skill.lower())}\b"
        if re.search(pattern, text):
            found_skills.append(skill)

    return list(set(found_skills))
