export default function BiasReport({ biasReport }) {
    if (!biasReport.found) {
        return (
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-white font-bold text-lg mb-4">
                    ⚖️ Bias Report
                </h3>
                <div className="bg-green-900 border border-green-700 rounded-xl p-4 text-center">
                    <p className="text-green-400 font-semibold">
                        ✅ No biased language detected
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                        This job description uses inclusive language.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-white font-bold text-lg mb-2">
                ⚖️ Bias Report
            </h3>
            <p className="text-gray-400 text-sm mb-4">
                Found {biasReport.flagged.length} potentially biased term(s) in the job description.
            </p>

            <div className="space-y-3">
                {biasReport.flagged.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div>
                            <span className="text-red-400 font-semibold text-sm">
                                "{item.word}"
                            </span>
                            <span className="text-gray-500 text-sm mx-2">→</span>
                            <span className="text-green-400 text-sm">
                                "{item.suggestion}"
                            </span>
                        </div>
                        <span className="bg-red-900 text-red-400 text-xs px-2 py-1 rounded-full border border-red-700">
                            Biased
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}