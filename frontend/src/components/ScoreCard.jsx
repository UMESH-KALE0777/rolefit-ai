import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

export default function ScoreCard({ score, skills }) {

    const radarData = [
        { subject: 'Semantic', value: score.semantic },
        { subject: 'Skill Match', value: score.skill_coverage },
        { subject: 'Overall', value: score.overall },
    ]

    const getScoreColor = (score) => {
        if (score >= 75) return 'text-green-400'
        if (score >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getScoreBg = (score) => {
        if (score >= 75) return 'bg-green-900 border-green-700'
        if (score >= 60) return 'bg-yellow-900 border-yellow-700'
        return 'bg-red-900 border-red-700'
    }

    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">

            {/* Overall Score */}
            <div className={`rounded-xl p-6 border text-center mb-6 ${getScoreBg(score.overall)}`}>
                <p className="text-gray-400 text-sm mb-1">Overall Match Score</p>
                <p className={`text-6xl font-bold ${getScoreColor(score.overall)}`}>
                    {score.overall}%
                </p>
                <p className={`text-lg font-semibold mt-2 ${getScoreColor(score.overall)}`}>
                    {score.label}
                </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs mb-1">Semantic Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(score.semantic)}`}>
                        {score.semantic}%
                    </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs mb-1">Skill Coverage</p>
                    <p className={`text-2xl font-bold ${getScoreColor(score.skill_coverage)}`}>
                        {score.skill_coverage}%
                    </p>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Radar
                            dataKey="value"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Skills */}
            <div className="mt-6 grid grid-cols-1 gap-4">

                {/* Matched */}
                <div>
                    <p className="text-green-400 font-semibold text-sm mb-2">
                        ✅ Matched Skills ({skills.matched.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {skills.matched.map((skill) => (
                            <span
                                key={skill}
                                className="bg-green-900 text-green-300 text-xs px-3 py-1 rounded-full border border-green-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Missing */}
                <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">
                        ❌ Missing Skills ({skills.missing.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {skills.missing.map((skill) => (
                            <span
                                key={skill}
                                className="bg-red-900 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Extra */}
                {skills.extra.length > 0 && (
                    <div>
                        <p className="text-blue-400 font-semibold text-sm mb-2">
                            ⭐ Extra Skills ({skills.extra.length})
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {skills.extra.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-blue-900 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}