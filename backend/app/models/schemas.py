from pydantic import BaseModel
from typing import List, Optional

# ─── Request ───────────────────────────────────────

class AnalyzeRequest(BaseModel):
    job_description: str

# ─── Response ──────────────────────────────────────

class CandidateInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None

class ScoreResult(BaseModel):
    overall: float
    semantic: float
    skill_coverage: float
    label: str

class SkillsResult(BaseModel):
    matched: List[str]
    missing: List[str]
    extra: List[str]

class BiasFlag(BaseModel):
    word: str
    suggestion: str

class BiasReport(BaseModel):
    found: bool
    flagged: List[BiasFlag]

class InterviewQuestion(BaseModel):
    skill: str
    questions: List[str]

class Explainability(BaseModel):
    why_this_score: str
    improvement_suggestions: List[str]

class AnalyzeResponse(BaseModel):
    status: str
    processing_time: str
    candidate: CandidateInfo
    score: ScoreResult
    skills: SkillsResult
    bias_report: BiasReport
    interview_questions: List[InterviewQuestion]
    explainability: Explainability