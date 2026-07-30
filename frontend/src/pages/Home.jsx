import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import ResumeUploader from '../components/ResumeUploader'
import ScoreCard from '../components/ScoreCard'
import BiasReport from '../components/BiasReport'
import InterviewQuestions from '../components/InterviewQuestions'
import Explainability from '../components/Explainability'
import Hero from '../components/Hero'
import { analyzeResume } from '../api/analyze'

// ── Responsive helper ────────────────────────────────
const isMobile = () => window.innerWidth < 768

export default function Home() {
    const [file, setFile] = useState(null)
    const [jd, setJd] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleAnalyze = async () => {
        if (!file) { setError('Please upload your resume PDF.'); return }
        if (jd.trim().length < 50) { setError('Please paste a complete job description.'); return }
        setError(null)
        setLoading(true)
        setResult(null)
        try {
            const data = await analyzeResume(file, jd)
            setResult(data)
            setTimeout(() => {
                document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
            }, 300)
        } catch (err) {
            setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => {
        setResult(null)
        setFile(null)
        setJd('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div style={{ backgroundColor: '#F7F7F5', minHeight: '100vh' }}>

            {/* ── Global styles ─────────────────────────── */}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }

        /* Responsive breakpoints */
        @media (max-width: 768px) {
          .hero-title    { font-size: 36px !important; letter-spacing: -1px !important; }
          .hero-sub      { font-size: 15px !important; }
          .trust-row     { gap: 16px !important; }
          .form-card     { padding: 20px !important; }
          .results-card  { padding: 20px !important; }
          .score-top     { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .score-breakdown { justify-content: center !important; }
          .analyze-again { flex-direction: column !important; align-items: flex-start !important; }
          .candidate-row { flex-direction: column !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 28px !important; }
          .section-heading { font-size: 24px !important; }
        }

        textarea:focus { outline: none; }
        button:hover { opacity: 0.88; }
      `}</style>

            {/* ── 1. HERO ───────────────────────────────── */}
            <Hero />

            {/* ── Divider ───────────────────────────────── */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ height: '1px', backgroundColor: '#E8E8E8' }} />
            </div>

            {/* ── 2. ANALYZER SECTION ───────────────────── */}
            <section
                id="analyze"
                style={{
                    padding: '80px 24px',
                    background: 'linear-gradient(180deg, #ffffff 0%, #F7F7F5 100%)',
                    position: 'relative',
                }}
            >
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>

                    {/* Section label */}
                    <p style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#635BFF',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}>
                        Resume Analyzer
                    </p>

                    {/* Heading */}
                    <h2
                        className="section-heading"
                        style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: '#111111',
                            letterSpacing: '-1px',
                            textAlign: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        Analyze your resume
                    </h2>

                    {/* Subtext */}
                    <p style={{
                        fontSize: '15px',
                        color: '#8A8A8A',
                        textAlign: 'center',
                        marginBottom: '36px',
                        lineHeight: '1.5',
                    }}>
                        No signup required. Your resume is never stored.
                    </p>

                    {/* ── Form card ─────────────────────────── */}
                    <div
                        className="form-card"
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            border: '1px solid rgba(99,91,255,0.12)',
                            padding: '32px',
                            boxShadow: '0 8px 40px rgba(99,91,255,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                            animation: 'fadeUp 0.4s ease',
                        }}
                    >

                        {/* Resume upload */}
                        <div style={{ marginBottom: '24px' }}>
                            <ResumeUploader onFileSelect={setFile} file={file} />
                        </div>

                        {/* Divider */}
                        <div style={{
                            height: '1px',
                            backgroundColor: '#F0F0F0',
                            margin: '0 0 24px',
                        }} />

                        {/* Job description */}
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#111111',
                                marginBottom: '8px',
                            }}>
                                Job Description
                            </label>
                            <textarea
                                value={jd}
                                onChange={(e) => setJd(e.target.value)}
                                placeholder="Paste the full job description here..."
                                rows={8}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#FAFAFA',
                                    border: '1.5px solid rgba(99,91,255,0.15)',
                                    borderRadius: '12px',
                                    padding: '14px 16px',
                                    fontSize: '14px',
                                    color: '#111111',
                                    resize: 'vertical',
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '1.6',
                                    transition: 'border-color 0.15s',
                                }}
                                onFocus={e => e.target.style.borderColor = '#635BFF'}
                                onBlur={e => e.target.style.borderColor = '#E8E8E8'}
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <div style={{
                                backgroundColor: '#FFF5F5',
                                border: '1px solid #FED7D7',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#E53E3E',
                                animation: 'fadeUp 0.2s ease',
                            }}>
                                ⚠ {error}
                            </div>
                        )}

                        {/* Privacy note */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '20px',
                        }}>
                            <span style={{ fontSize: '13px' }}>🔒</span>
                            <span style={{ fontSize: '13px', color: '#8A8A8A' }}>
                                Analyzed in memory only — never stored or shared
                            </span>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            style={{
                                width: '100%',
                                background: loading
                                    ? '#A8A4FF'
                                    : 'linear-gradient(135deg, #635BFF 0%, #7C3AED 100%)',
                                boxShadow: loading ? 'none' : '0 8px 24px rgba(99,91,255,0.35)',
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '600',
                                padding: '14px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                letterSpacing: '-0.2px',
                                transition: 'opacity 0.15s',
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        style={{ animation: 'spin 1s linear infinite' }}
                                    />
                                    Analyzing your resume...
                                </>
                            ) : (
                                'Analyze Now'
                            )}
                        </button>

                    </div>
                </div>
            </section>

            {/* ── 3. RESULTS SECTION ────────────────────── */}
            {result && (
                <section
                    id="results"
                    style={{
                        padding: '0 24px 80px',
                        background: '#FFFFFF',
                        animation: 'fadeUp 0.5s ease',
                    }}
                >
                    <div style={{ maxWidth: '780px', margin: '0 auto' }}>

                        {/* Results header */}
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '40px',
                        }}>
                            <p style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#635BFF',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: '8px',
                            }}>
                                Analysis Complete
                            </p>
                            <h2
                                className="section-heading"
                                style={{
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#111111',
                                    letterSpacing: '-1px',
                                    marginBottom: '4px',
                                }}
                            >
                                Your results
                            </h2>
                            <p style={{ fontSize: '14px', color: '#8A8A8A' }}>
                                Completed in {result.processing_time}
                            </p>
                        </div>

                        {/* Result cards */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}>
                            <ScoreCard score={result.score} skills={result.skills} />
                            <Explainability
                                explainability={result.explainability}
                                candidate={result.candidate}
                            />
                            <BiasReport biasReport={result.bias_report} />
                            <InterviewQuestions questions={result.interview_questions} />
                        </div>

                        {/* ── Analyze again ─────────────────── */}
                        <div
                            className="analyze-again"
                            style={{
                                marginTop: '24px',
                                padding: '24px 28px',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                border: '1px solid #E8E8E8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '16px',
                            }}
                        >
                            <div>
                                <p style={{
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#111111',
                                    marginBottom: '2px',
                                }}>
                                    Try another resume
                                </p>
                                <p style={{ fontSize: '13px', color: '#8A8A8A' }}>
                                    Compare different resumes against the same job description
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                style={{
                                    backgroundColor: '#635BFF',
                                    color: 'white',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                }}
                            >
                                Analyze Another
                            </button>
                        </div>

                    </div>
                </section>
            )}

            {/* ── 4. FOOTER ─────────────────────────────── */}
            <footer style={{
                borderTop: '1px solid #E8E8E8',
                backgroundColor: 'white',
                padding: '24px',
                textAlign: 'center',
            }}>
                <p style={{ fontSize: '13px', color: '#8A8A8A' }}>
                    RoleFit AI — Built with FastAPI, React, and BAAI/bge-base-en-v1.5
                    {' · '}
                    <a
                        href="https://github.com/UMESH-KALE0777/rolefit-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#635BFF', textDecoration: 'none', fontWeight: '500' }}
                    >
                        GitHub
                    </a>
                </p>
            </footer>

        </div>
    )
}