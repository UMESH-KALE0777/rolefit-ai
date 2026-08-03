<div align="center">

<!-- Project Logo -->
<img src="./screenshots/logo.png" alt="RoleFit AI Logo" width="120"/>

# RoleFit AI

### Explainable AI-powered resume screening — know *why* you scored, not just *what* you scored.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![GitHub Stars](https://img.shields.io/github/stars/UMESH-KALE0777/rolefit-ai?style=social)](https://github.com/UMESH-KALE0777/rolefit-ai/stargazers)

[**Live Demo**](https://rolefit-ai-five.vercel.app) &nbsp;·&nbsp; [**GitHub Repo**](https://github.com/UMESH-KALE0777/rolefit-ai) &nbsp;·&nbsp; [**Report Bug**](https://github.com/UMESH-KALE0777/rolefit-ai/issues) &nbsp;·&nbsp; [**Request Feature**](https://github.com/UMESH-KALE0777/rolefit-ai/issues)

</div>

> ⭐ If this project helped you, please consider giving it a star. It really motivates me to keep improving RoleFit AI.

---

## 📊 Project Metrics

- 🚀 <5s analysis time
- 🧠 500+ technical skills
- 📁 Project-level scoring
- 🤖 Explainable AI
- 🔒 Privacy-first
- 🌍 Google Indexed

---

## 🖼️ Screenshots

| Landing Page | Resume Upload |
|---|---|
| ![Landing](./screenshots/1-hero.png) | ![Upload](./screenshots/2-analyzer.png) |

| ATS Results | Project Analysis |
|---|---|
| ![ATS](./screenshots/3-score-card.png) | ![Projects](./screenshots/4-project-analysis.png) |

| AI Insights |
|---|
| ![Insights](./screenshots/5-ai-insights.png) |

---

## 💡 Why RoleFit AI?

Most ATS checkers give you a percentage and leave you guessing.

> **RoleFit AI explains *why* your resume scored the way it did — and exactly what to fix before you apply again.**

Job seekers routinely apply without knowing:
- Why their resume got rejected
- Which skills are missing for the role
- Whether their projects actually match the job
- How ATS systems evaluate them in the first place
- What to improve before the next application

RoleFit AI closes that gap with transparent, actionable, explainable resume analysis — not just a score.

### Why I Built This

While applying for internships, I realized I never knew why my resume was rejected.

Existing ATS checkers only gave a score without explaining the reasoning.

RoleFit AI was built to make resume screening transparent by showing exactly what matched, what was missing, and how to improve.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 **Hybrid ATS Match Scoring** | 60% semantic similarity + 40% skill coverage — more meaningful than keyword matching alone |
| 🧠 **Semantic Similarity** | TF-IDF-based similarity scoring between resume and job description |
| 📊 **Skill Gap Analysis** | Matched, missing, and additional skills — instantly visible |
| 📁 **Project Relevance Analysis** | Each project scored individually against the job description |
| ⚖️ **Inclusive Language / Bias Detection** | Flags biased or exclusive wording in job descriptions |
| 🎤 **AI Interview Questions** | Auto-generated questions based on your missing skills |
| 🔍 **Explainable AI** | Shows *why* a score is high or low, not just the number |
| 🔒 **Resume Privacy** | No storage, no database, analysis happens in memory |
| 🚫 **No Signup Required** | Zero friction — upload and go |

---

## 🚀 Demo

- **Live Website:** [rolefit-ai-five.vercel.app](https://rolefit-ai-five.vercel.app)
- **Demo Video:** _optional — add a Loom/YouTube link here_
- **Demo GIF:** _add once available — see screenshots above in the meantime_

---

## ⚙️ How It Works

```
Resume PDF
   ↓
PDF Parsing (pdfplumber + PyMuPDF)
   ↓
Skill Extraction (500+ skills, 16 categories)
   ↓
Semantic Matching (TF-IDF similarity)
   ↓
ATS Score (60% similarity + 40% skill coverage)
   ↓
Project-Level Relevance Analysis
   ↓
AI Insights & Recommendations
   ↓
AI Interview Question Generation
   ↓
Results Displayed
```

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend  │  (Vite + Tailwind + Framer Motion)
└────────┬─────────┘
         ↓
┌─────────────────┐
│  FastAPI Backend │
└────────┬─────────┘
         ↓
┌─────────────────┐
│    NLP Engine     │  (spaCy + scikit-learn)
└────────┬─────────┘
         ↓
┌─────────────────┐
│  Scoring Engine   │  (Semantic + Skill Coverage)
└────────┬─────────┘
         ↓
┌─────────────────┐
│   AI Insights     │
└─────────────────┘
```

_Note: this is a placeholder ASCII diagram — swap in a clean version made with Figma, Excalidraw, or draw.io once ready._

---

## 🧰 Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Framer Motion

**Backend**
- FastAPI
- Python

**NLP**
- spaCy
- scikit-learn

**PDF Processing**
- pdfplumber
- PyMuPDF

**Deployment**
- Vercel (Frontend)
- Render (Backend)

**DevOps**
- GitHub Actions (CI/CD)
- Auto deployment on push

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/UMESH-KALE0777/rolefit-ai.git
cd rolefit-ai

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd ../frontend
npm install
npm run dev
```

The app should now be running locally — frontend on Vite's dev server, backend on FastAPI's default port.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/analyze` | Analyzes a resume against a job description and returns ATS score, skill gaps, and project relevance |
| `POST` | `/bias-analysis` | Analyzes a job description for biased or exclusive language |
| `GET` | `/health` | Health check endpoint for uptime monitoring |

### 📖 API Docs

_If your Swagger docs are public, add the link here:_
`https://your-backend-url/docs`

---

## 📁 Folder Structure

```
rolefit-ai/
├── frontend/          # React + Vite + Tailwind client
├── backend/           # FastAPI application, NLP + scoring engine
├── docs/              # Documentation
└── screenshots/        # App screenshots used in this README
```

---

## 🏆 Project Highlights

- ✅ 500+ technical skills across 16 categories
- ✅ Hybrid ATS scoring engine
- ✅ Explainable AI, not just a percentage
- ✅ Project-level relevance analysis
- ✅ Google Indexed & SEO optimized
- ✅ CI/CD with auto-deployment
- ✅ Production-ready, publicly deployed

---

## 🧩 Challenges Solved

- Reconciling inconsistent extraction results by running **dual PDF parsers** (pdfplumber + PyMuPDF)
- Designing an ATS **scoring formula** that balances semantic similarity with hard skill coverage
- Building reliable **project-level extraction** from unstructured resume text
- Implementing **semantic matching** without relying on keyword-only comparison
- Navigating **deployment** across two separate platforms (Vercel + Render) with CI/CD
- Getting the site fully **SEO-optimized** and indexed by Google

---

## 📚 Lessons Learned

- Building and shipping a production **FastAPI** backend
- Structuring a scalable **React** frontend with component-driven design
- Practical **NLP** — skill extraction, similarity scoring, text parsing at scale
- **SEO** fundamentals: structured data, sitemaps, Open Graph, rich results
- Setting up **CI/CD** pipelines for automatic deployment
- What it actually takes to go from prototype to **production deployment**
- Designing for **explainability** rather than just accuracy

---

## 🗺️ Roadmap

- [ ] Resume comparison (multiple resumes side-by-side)
- [ ] Resume history
- [ ] Google Login / user accounts
- [ ] Recruiter dashboard
- [ ] AI-powered resume rewriting
- [ ] Custom domain
- [ ] Resume templates
- [ ] Cover letter generation
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please open an issue first for major changes to discuss what you'd like to add.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Umesh Kale**

- GitHub: [@UMESH-KALE0777](https://github.com/UMESH-KALE0777)
- LinkedIn: _add your LinkedIn URL_
- Email: _add your email_

---

## 👨‍💻 Built By

Hi, I'm **Umesh Kale**.

I'm passionate about building AI-powered products that solve real-world problems.

If you like this project, connect with me:

- 🌐 LinkedIn
- 💻 GitHub
- 📧 Email

---

## ⭐ Support

If you found this project useful, please consider giving it a star — it helps a lot!

```
⭐ Star this repo if RoleFit AI helped you understand your resume better.
```

---

## 🏆 Why is RoleFit AI Different? (Comparison)

| Capability | Traditional ATS Checkers | RoleFit AI |
|---|---|---|
| Match score | ✅ | ✅ |
| Explains *why* the score is what it is | ❌ | ✅ |
| Project-level relevance scoring | ❌ | ✅ |
| Skill gap detection | Partial | ✅ |
| Bias / inclusive language detection | ❌ | ✅ |
| AI-generated interview questions | ❌ | ✅ |
| Privacy-first (no storage) | ❌ (often stores resumes) | ✅ |
| Personalized recommendations | ❌ | ✅ |

## 📊 Project Statistics

- 500+ technical skills tracked across 16 categories
- Dual-parser PDF extraction pipeline
- Fully deployed, production frontend + backend

## 🚀 Performance

- Analysis completes in under 5 seconds per resume

## 🔒 Privacy & Security

- No resume storage — analysis happens entirely in memory
- No signup or account required
- HTTPS enforced end-to-end

## 🌍 SEO & Google Search

- Google Search Console configured
- Sitemap and robots.txt in place
- Open Graph and Twitter Card metadata
- Schema.org structured data — rich results eligible

## 📈 Star History

_Add a star-history chart here once the repo has stars — e.g. via [star-history.com](https://star-history.com/)._

## 🙌 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [spaCy](https://spacy.io/)
- [scikit-learn](https://scikit-learn.org/)

## ❓ FAQ

**Is my resume stored anywhere?**
No. RoleFit AI analyzes your resume in memory and never saves it to a database.

**Do I need to create an account?**
No signup is required to use RoleFit AI.

**What file formats are supported?**
Currently, PDF resumes are supported via a dual-parser pipeline (pdfplumber + PyMuPDF).

**How is the ATS score calculated?**
It's a hybrid score: 60% semantic similarity (TF-IDF-based) between your resume and the job description, plus 40% technical skill coverage.

</div>