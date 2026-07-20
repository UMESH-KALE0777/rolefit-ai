export default function Hero() {
    return (
        <section className="pt-32 pb-20 px-4 text-center bg-gray-950">
            <div className="max-w-4xl mx-auto">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-400 text-sm px-4 py-2 rounded-full mb-8">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    AI-Powered Resume Screening
                </div>

                {/* Headline */}
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                    Know Your Resume Score
                    <br />
                    <span className="text-blue-500">Before The Recruiter Does</span>
                </h1>

                {/* Subheadline */}
                <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
                    Upload your resume and paste any job description.
                    Get your match score, skill gaps, bias report,
                    and interview questions in under 5 seconds.
                </p>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 mb-12 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">🔒</span>
                        Resume never stored
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">⚡</span>
                        Results in 5 seconds
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✨</span>
                        No signup required
                    </div>
                </div>

        {/* CTA */}
        <a
          href="#analyze"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-block"
        >
          Analyze My Resume
        </a>

        </div>
    </section >
  )
}