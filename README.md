📄 RoleFit AI – Explainable Resume Screening Assistant

RoleFit AI is an intelligent hiring assistant that evaluates candidate resumes against job descriptions using Natural Language Processing (NLP) and Explainable AI techniques.
It helps recruiters quickly rank candidates, detect skill gaps, identify biased language in job descriptions, and generate structured interview questions.

The system is designed as a decision-support tool for recruiters, combining machine learning, responsible AI practices, and interactive analytics.

🚀 Features
🧠 Resume Screening

Upload multiple resumes (PDF).

Automatically extract text and analyze candidate qualifications.

Compare resumes against a job description.

📊 Hybrid Candidate Scoring

RoleFit AI calculates a composite candidate score using:

Semantic similarity (TF-IDF + Cosine Similarity)

Skill coverage

Weighted hybrid scoring system

This ensures transparent and explainable candidate evaluation.

🔍 Skill Gap Analysis

Extracts skills from resumes and job descriptions.

Identifies matched skills and missing skills.

Helps recruiters understand candidate fit instantly.

⚖️ Bias Detection in Job Descriptions

The system detects potentially biased or exclusionary language in job descriptions.

Examples:

Gender-coded terms

Age-biased phrases

It can also generate a neutral rewrite of the job description.

🎤 Automated Interview Question Generator

RoleFit AI generates structured interview questions based on:

Skill gaps

Technical context

Behavioral evaluation

This helps recruiters conduct consistent and targeted interviews.

📈 Analytics Dashboard

Interactive Plotly visualizations help recruiters understand candidate performance.

Includes:

Radar chart showing score breakdown

Skill coverage analytics

Candidate ranking table

🏆 Multi-Resume Ranking

Recruiters can upload multiple resumes simultaneously.

The system automatically:

Scores each candidate

Sorts candidates by final score

Displays a ranking leaderboard

🧠 System Architecture
Resume PDF
     ↓
PDF Text Extraction
     ↓
NLP Preprocessing
     ↓
Skill Extraction
     ↓
TF-IDF Semantic Similarity
     ↓
Hybrid Candidate Scoring
     ↓
Candidate Ranking
     ↓
Explainable AI Dashboard
🛠️ Tech Stack
Category	Technology
Language	Python
Web Framework	Streamlit
NLP Libraries	spaCy, NLTK
Machine Learning	Scikit-learn
Visualization	Plotly
Data Processing	Pandas
PDF Parsing	PyPDF2
📂 Project Structure
rolefit-ai/
│
├── app/
│   ├── main.py
│   ├── preprocessing.py
│   ├── skill_extractor.py
│   ├── scoring.py
│
├── utils/
│   ├── pdf_reader.py
│   ├── bias_detector.py
│   ├── interview_generator.py
│
├── data/
│   └── skills_dictionary.json
│
├── requirements.txt
├── README.md
└── .gitignore
⚙️ Installation

Clone the repository:

git clone https://github.com/UMESH-KALE0777/rolefit-ai.git
cd rolefit-ai

Create a virtual environment:

python -m venv venv

Activate the virtual environment:

Windows

.\venv\Scripts\Activate.ps1

Mac/Linux

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt
▶️ Run the Application

Start the Streamlit server:

python -m streamlit run app/main.py

The application will open at:

http://localhost:8501
📊 Example Workflow

Upload one or more resumes

Paste a job description

The system automatically:

Extracts resume content

Detects required skills

Calculates candidate scores

Ranks candidates

Generates interview questions

Displays analytics dashboard

🔐 Responsible AI Considerations

RoleFit AI incorporates responsible AI principles by:

Detecting biased language in job descriptions

Providing explainable scoring

Avoiding demographic-based candidate evaluation

🎯 Future Improvements

Possible enhancements include:

LLM-powered interview question generation

Resume-job embedding models (BERT)

Candidate comparison dashboards

Cloud deployment for recruiter access

👨‍💻 Author

Umesh Kale....

Artificial Intelligence & Machine Learning Undergraduate
