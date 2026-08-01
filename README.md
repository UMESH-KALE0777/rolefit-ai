<div align="center">
  <img src="logo.png" width="72" alt="RoleFit AI"/>
  <h2>RoleFit AI</h2>
  <p>Know your resume score before the recruiter does.</p>

  <a href="https://rolefit-ai-five.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-635BFF?style=flat-square&logo=vercel&logoColor=white" alt="Live Demo"/></a>
  <a href="https://rolefit-ai-xva6.onrender.com/docs"><img src="https://img.shields.io/badge/API%20Docs-009688?style=flat-square&logo=fastapi&logoColor=white" alt="API Docs"/></a>
  <a href="https://github.com/UMESH-KALE0777/rolefit-ai/stargazers"><img src="https://img.shields.io/github/stars/UMESH-KALE0777/rolefit-ai?style=flat-square&color=635BFF" alt="Stars"/></a>
  <a href="https://github.com/UMESH-KALE0777/rolefit-ai/blob/main/LICENSE"><img src="https://img.shields.io/github/license/UMESH-KALE0777/rolefit-ai?style=flat-square&color=635BFF" alt="License"/></a>
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
</div>

<br/>

RoleFit AI is a **production-grade AI resume screening tool** — not a Streamlit prototype. Upload a resume PDF, paste any job description, and get a full analysis in under 5 seconds. No signup. Resume never stored.

**[Try it live →](https://rolefit-ai-five.vercel.app)**

---

## Screenshots

![Hero](screenshots/1-hero.png)

![Score Card](screenshots/3-score-card.png)

![Project Analysis](screenshots/4-project-analysis.png)

![AI Insights](screenshots/5-ai-insights.png)

---

## What it does

**Resume Match Score** — Hybrid scoring: TF-IDF semantic similarity (60%) + skill coverage (40%). Gives a 0–100 score with a label and explanation.

**Project Relevance Analysis** — Extracts each project from your resume individually and scores it against the job description. Tells you which projects to highlight for this specific role.

**Skill Gap Analysis** — Matches 500+ skills across 16 categories using word-boundary regex. Shows matched, missing, and extra skills.

**Bias Detection** — Scans the job description against 150+ biased terms and suggests neutral rewrites.

**Interview Questions** — Generates 3 targeted questions per missing skill using Gemini API, with a hardcoded fallback for 50+ common skills.

**Explainable AI** — Tells you exactly why you got the score and gives prioritized improvement suggestions.

---

## Why I built this

Most ATS tools match keywords and give you a number. They don't tell you **why** you got that score or what to do about it — and they completely ignore whether your projects are relevant to the role.

I built RoleFit AI to give candidates **actionable insights**, not just a score.

---

## Tech stack

| Layer | Technology |
|---|---|
| Backend | FastAPI, spaCy, scikit-learn, pdfplumber, pyMuPDF |
| Frontend | React, Vite, Axios |
| AI | TF-IDF cosine similarity, Gemini API |
| Deployment | Render (backend), Vercel (frontend) |
| CI/CD | Auto-deploy on every git push |

---

## Architecture

```
React (Vercel)
     │
     │ REST API
     ▼
FastAPI (Render)
     │
     ├─ PDF Parser       pdfplumber → pyMuPDF fallback
     ├─ Preprocessor     spaCy tokenization + lemmatization
     ├─ Skill Extractor  500+ skills · word boundary regex
     ├─ Scorer           TF-IDF cosine sim · hybrid formula
     ├─ Project Scorer   per-project relevance against JD
     ├─ Bias Detector    150+ word ruleset · neutral rewrites
     └─ Interview Gen    Gemini API · 50+ skill fallback
```

---

## Scoring formula

```
Final Score = (Semantic Score × 0.60) + (Skill Coverage × 0.40)

90–100  Perfect Match
75–89   Strong Match
60–74   Good Match
45–59   Partial Match
 0–44   Low Match
```

---

## API

Base URL: `https://rolefit-ai-xva6.onrender.com`

```
POST  /api/analyze    Analyze resume against job description
GET   /health         Health check
GET   /docs           Swagger UI
```

**Request** (`multipart/form-data`)
```
resume           PDF file · max 5MB
job_description  string   · min 50 chars
```

**Response** (abbreviated)
```json
{
  "score": { "overall": 78.5, "label": "Strong Match" },
  "skills": { "matched": ["Python"], "missing": ["Kubernetes"] },
  "project_analysis": [
    { "title": "Supply Chain Risk", "relevance_score": 85.2, "relevance_label": "Highly Relevant" }
  ],
  "bias_report": { "found": true, "flagged": [{ "word": "ninja", "suggestion": "skilled professional" }] },
  "interview_questions": [{ "skill": "Kubernetes", "questions": ["..."] }],
  "explainability": { "why_this_score": "...", "improvement_suggestions": ["..."] }
}
```

---

## Local setup

**Backend**

```bash
git clone https://github.com/UMESH-KALE0777/rolefit-ai.git
cd rolefit-ai/backend

python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Add your GEMINI_API_KEY to backend/.env
uvicorn app.main:app --reload --port 8000
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Environment variables** (`backend/.env`)

```env
GEMINI_API_KEY=your_key_here
ENVIRONMENT=development
MAX_FILE_SIZE_MB=5
RATE_LIMIT_PER_MINUTE=10
ALLOWED_ORIGINS=http://localhost:5173
```

Get a free Gemini key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## Project structure

```
rolefit-ai/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/analyze.py
│   │   └── ai/
│   │       ├── parser.py            dual PDF parser
│   │       ├── preprocessor.py      spaCy cleaning
│   │       ├── embedder.py          semantic scoring
│   │       ├── scorer.py            hybrid formula
│   │       ├── skill_extractor.py   500+ skills
│   │       ├── bias_detector.py     150+ word ruleset
│   │       ├── interview_gen.py     Gemini + fallback
│   │       └── project_extractor.py per-project scoring
│   └── data/skills_dictionary.json
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ScoreCard.jsx
│       │   ├── ProjectAnalysis.jsx
│       │   ├── BiasReport.jsx
│       │   ├── InterviewQuestions.jsx
│       │   └── Explainability.jsx
│       └── pages/Home.jsx
└── screenshots/
```

---

## Roadmap

- [x] Hybrid ATS scoring
- [x] Skill gap analysis  
- [x] Bias detection
- [x] AI interview questions
- [x] Project relevance scoring
- [x] Production deployment + CI/CD
- [ ] Google OAuth + saved analyses
- [ ] Multi-resume recruiter ranking mode
- [ ] OCR for scanned PDFs

---

## Contributing

PRs welcome. Open an issue first for major changes.

---

## License

MIT © 2026 [Umesh Kale](https://www.linkedin.com/in/umesh-kale9192/)

---

<div align="center">
  Built by <a href="https://www.linkedin.com/in/umesh-kale9192/"><strong>Umesh Kale</strong></a> · AI & ML Undergraduate · Open to internships
  <br/><br/>
  If this helped you, a ⭐ means a lot.
</div>