export default function Explainability({ explainability, candidate }) {
    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-white font-bold text-lg mb-4">
                💡 Analysis Insights
            </h3>

            {/* Candidate Info */}
            {candidate && (
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">
                        Candidate
                    </p>
                    <div className="space-y-1">
                        {candidate.name && (
                            <p className="text-white font-semibold">{candidate.name}</p>
                        )}
                        {candidate.email && (
                            <p className="text-gray-400 text-sm">{candidate.email}</p>
                        )}
                        {candidate.phone && (
                            <p className="text-gray-400 text-sm">{candidate.phone}</p>
                        )}
            {candidate.linkedin && (
              <a
                href={"https://" + candidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline block"
              >
                {candidate.linkedin}
              </a>
            )}
            {candidate.github && (
              <a
                href={"https://" + candidate.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline block"
              >
                {candidate.github}
              </a>
            )}
        </div>
    </div>
)}

{/* Why this score */ }
<div className="bg-blue-950 border border-blue-800 rounded-xl p-4 mb-4">
    <p className="text-blue-400 text-xs font-semibold uppercase tracking-wide mb-2">
        Why This Score
    </p>
    <p className="text-gray-300 text-sm leading-relaxed">
        {explainability.why_this_score}
    </p>
</div>

{/* Improvement suggestions */ }
<div>
    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">
        How To Improve
    </p>
    <div className="space-y-2">
        {explainability.improvement_suggestions.map((suggestion, index) => (
            <div
                key={index}
                className="flex gap-3 bg-gray-800 rounded-lg p-3"
            >
                <span className="text-yellow-500 min-w-fit">→</span>
                <p className="text-gray-300 text-sm">{suggestion}</p>
            </div>
        ))}
    </div>
</div>

    </div >
  )
}