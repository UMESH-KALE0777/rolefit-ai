import { useEffect, useState } from 'react'

function CircularScore({ score, size = 160, strokeWidth = 8 }) {
    const [animatedScore, setAnimatedScore] = useState(0)
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const progress = (animatedScore / 100) * circumference
    const offset = circumference - progress

    const getColor = (s) => {
        if (s >= 75) return '#22C55E'
        if (s >= 60) return '#F59E0B'
        return '#EF4444'
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            let start = 0
            const increment = score / 60
            const interval = setInterval(() => {
                start += increment
                if (start >= score) {
                    setAnimatedScore(score)
                    clearInterval(interval)
                } else {
                    setAnimatedScore(Math.floor(start))
                }
            }, 16)
            return () => clearInterval(interval)
        }, 200)
        return () => clearTimeout(timer)
    }, [score])

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#F0F0F0"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor(animatedScore)}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.016s linear' }}
                />
            </svg>

            {/* Score text */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: getColor(animatedScore),
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-1px',
                    lineHeight: 1,
                }}>
                    {animatedScore}%
                </span>
                <span style={{
                    fontSize: '11px',
                    color: '#8A8A8A',
                    fontWeight: '500',
                    marginTop: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Match
                </span>
            </div>
        </div>
    )
}

function SkillPill({ skill, type }) {
    const colors = {
        matched: { bg: '#F0FDF6', color: '#22C55E', border: '#C3F0DA' },
        missing: { bg: '#FFF5F5', color: '#EF4444', border: '#FED7D7' },
        extra: { bg: '#EEF0FF', color: '#635BFF', border: '#D4D0FF' },
    }
    const c = colors[type]

    return (
        <span style={{
            display: 'inline-block',
            backgroundColor: c.bg,
            color: c.color,
            border: `1px solid ${c.border}`,
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: '500',
            margin: '3px',
        }}>
            {skill}
        </span>
    )
}

export default function ScoreCard({ score, skills }) {
    const getScoreSubtitle = (s) => {
        if (s >= 75) return 'Your resume aligns very well with this role.'
        if (s >= 60) return 'Your resume shows a strong foundation for this role.'
        if (s >= 40) return 'Your resume has moderate alignment but is missing key skills.'
        return 'Your resume lacks several core requirements for this role.'
    }

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
        }}>

            {/* Top — Score */}
            <div style={{
                padding: '40px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                borderBottom: '1px solid #F0F0F0',
                flexWrap: 'wrap',
            }}>

                {/* Circular score */}
                <CircularScore score={score.overall} />

                {/* Score details */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#111111',
                        letterSpacing: '-0.5px',
                        marginBottom: '4px',
                    }}>
                        {score.label}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#8A8A8A',
                        marginBottom: '24px',
                    }}>
                        {getScoreSubtitle(score.overall)}
                    </div>

                    {/* Breakdown */}
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Semantic Score', value: score.semantic },
                            { label: 'Skill Coverage', value: score.skill_coverage },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#8A8A8A',
                                    fontWeight: '500',
                                    marginBottom: '4px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                }}>
                                    {item.label}
                                </div>
                                <div style={{
                                    fontSize: '22px',
                                    fontWeight: '700',
                                    color: '#111111',
                                    fontFamily: 'Inter, sans-serif',
                                    letterSpacing: '-0.5px',
                                }}>
                                    {item.value}%
                                </div>
                                {/* Progress bar */}
                                <div style={{
                                    width: '120px',
                                    height: '4px',
                                    backgroundColor: '#F0F0F0',
                                    borderRadius: '2px',
                                    marginTop: '6px',
                                }}>
                                    <div style={{
                                        width: `${item.value}%`,
                                        height: '100%',
                                        backgroundColor: '#635BFF',
                                        borderRadius: '2px',
                                        transition: 'width 1s ease',
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom — Skills */}
            <div style={{ padding: '28px 32px' }}>

                {/* Matched */}
                {skills.matched.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#8A8A8A',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '10px',
                        }}>
                            Matched Skills ({skills.matched.length})
                        </div>
                        <div>
                            {skills.matched.map(s => (
                                <SkillPill key={s} skill={s} type="matched" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Missing */}
                {skills.missing.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#8A8A8A',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '10px',
                        }}>
                            Missing Skills ({skills.missing.length})
                        </div>
                        <div>
                            {skills.missing.map(s => (
                                <SkillPill key={s} skill={s} type="missing" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Extra */}
                {skills.extra.length > 0 && (
                    <div>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#8A8A8A',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            marginBottom: '10px',
                        }}>
                            Additional Skills ({skills.extra.length})
                        </div>
                        <div>
                            {skills.extra.map(s => (
                                <SkillPill key={s} skill={s} type="extra" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}