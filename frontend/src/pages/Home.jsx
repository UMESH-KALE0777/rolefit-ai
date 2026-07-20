import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import ResumeUploader from '../components/ResumeUploader'
import ScoreCard from '../components/ScoreCard'
import BiasReport from '../components/BiasReport'
import InterviewQuestions from '../components/InterviewQuestions'
import Explainability from '../components/Explainability'
import Hero from '../components/Hero'
import { analyzeResume } from '../api/analyze'

export default function Home() {
    const [file, setFile] = useState(null)
    const [jd, setJd] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload your resume PDF.')
            return
        }
        if (jd.trim().length < 50) {
            setError('Please paste a complete job description.')
            return
        }

        setError(null)
        setLoading(true)
        setResult(null)

        try {
            const data = await analyzeResume(file, jd)
            setResult(data)

            // Scroll to results
            setTimeout(() => {
                document.getElementById('results')?.scrollIntoView({
                    behavior: 'smooth'
                })
            }, 100)

        } catch (err) {
            setError(
                err.response?.data?.detail ||
                'Analysis failed. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950">

            {/* Hero */}
            <Hero />

            {/* Analyzer */}
            <section id="analyze" className="py-20 px-4 bg-gray-900">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl font-bold text-white text-center mb-2">
                        Analyze Your Resume
                    </h2>
                    <p className="text-gray-400 text-center mb-10">
                        No signup required. Your resume is never stored.
                    </p>

                    <div className="bg-gray-950 rounded-2xl p-8 border border-gray-800">

                        {/* Resume Upload */}
                        <div className="mb-6">
                            <ResumeUploader
                                onFileSelect={setFile}
                                file={file}
                            />
                        </div>

                        {/* Job Description */}
                        <div className="mb-6">
                            <label className="block text-white font-semibold mb-3">
                                Job Description
                            </label>
                            <textarea
                                value={jd}
                                onChange={(e) => setJd(e.target.value)}
                                placeholder="Paste the full job description here..."
                                rows={8}
                                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-900 border border-red-700 text-red-300 rounded-xl p-4 mb-6">
                                {error}
                            </div>
                        )}

                        {/* Privacy note */}
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                            <span>🔒</span>
                            <span>
                                Your resume is analyzed in memory only.
                                Never stored. Never shared.
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={22} />
                                    Analyzing your resume...
                                </>
                            ) : (
                                'Analyze Now →'
                            )}
                        </button>

                    </div>
                </div>
            </section>

            {/* Results */}
            {result && (
                <section id="results" className="py-20 px-4 bg-gray-950">
                    <div className="max-w-4xl mx-auto">

                        <h2 className="text-3xl font-bold text-white text-center mb-2">
                            Your Analysis Results
                        </h2>
                        <p className="text-gray-400 text-center mb-10">
                            Completed in {result.processing_time}
                        </p>

                        <div className="space-y-6">

                            {/* Score + Skills */}
                            <ScoreCard
                                score={result.score}
                                skills={result.skills}
                            />

                            {/* Explainability */}
                            <Explainability
                                explainability={result.explainability}
                                candidate={result.candidate}
                            />

                            {/* Bias Report */}
                            <BiasReport biasReport={result.bias_report} />

                            {/* Interview Questions */}
                            <InterviewQuestions
                                questions={result.interview_questions}
                            />

                            {/* Analyze Again */}
                            <div className="bg-blue-950 border border-blue-800 rounded-2xl p-6 text-center">
                                <p className="text-white font-semibold mb-2">
                                    Want to try another resume?
                                </p>
                                <button
                                    onClick={() => {
                                        setResult(null)
                                        setFile(null)
                                        setJd('')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
                                >
                                    Analyze Another Resume →
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}