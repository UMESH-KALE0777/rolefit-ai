import json
import os


def load_skills():
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    skills_path = os.path.join(base_path, "data", "skills_dictionary.json")

    with open(skills_path, "r") as f:
        skills = json.load(f)

    return skills


def extract_skills(text):
    skills = load_skills()
    found_skills = []

    text = text.lower()

    for skill in skills:
        if skill.lower() in text:
            found_skills.append(skill)

    return list(set(found_skills))
