export default function ProjectAnalysis({ projects }) {
    if (!projects || projects.length === 0) return null

    const getColors = (color) => {
        const map = {
            green: {
                bg: '#F0FDF6',
                border: '#C3F0DA',
                text: '#15803D',
                badge: '#DCFCE7',
                badgeText: '#15803D',
                bar: '#22C55E',
            },
            yellow: {
                bg: '#FFFBEB',
                border: '#FDE68A',
                text: '#92400E',
                badge: '#FEF3C7',
                badgeText: '#92400E',
                bar: '#F59E0B',
            },
            red: {
                bg: '#FFF5F5',
                border: '#FED7D7',
                text: '#991B1B',
                badge: '#FEE2E2',
                badgeText: '#991B1B',
                bar: '#EF4444',
            },
        }
        return map[color] || map.yellow
    }

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #F0F0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111111',
                        marginBottom: '4px',
                        letterSpacing: '-0.3px',
                    }}>
                        Project Relevance Analysis
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#8A8A8A',
                    }}>
                        How well your projects align with this job role
                    </div>
                </div>

                {/* Summary badge */}
                <div style={{
                    backgroundColor: '#EEF0FF',
                    border: '1px solid #D4D0FF',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#635BFF',
                }}>
                    {projects.filter(p => p.color === 'green').length} of {projects.length} highly relevant
                </div>
            </div>

            {/* Projects list */}
            <div style={{ padding: '24px 32px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    {projects.map((project, index) => {
                        const c = getColors(project.color)
                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '16px',
                                    border: '1px solid #F0F0F0',
                                    padding: '20px',
                                    transition: 'border-color 0.2s',
                                }}
                            >
                                {/* Project header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                }}>
                                    <div style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#111111',
                                        letterSpacing: '-0.2px',
                                        flex: 1,
                                    }}>
                                        {project.title}
                                    </div>

                                    {/* Relevance badge */}
                                    <div style={{
                                        backgroundColor: c.badge,
                                        color: c.badgeText,
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        padding: '4px 12px',
                                        borderRadius: '100px',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                    }}>
                                        {project.relevance_label}
                                    </div>
                                </div>

                                {/* Description */}
                                {project.description && (
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#6B7280',
                                        lineHeight: '1.6',
                                        marginBottom: '16px',
                                        margin: '0 0 16px 0',
                                    }}>
                                        {project.description.length > 150
                                            ? project.description.substring(0, 150) + '...'
                                            : project.description
                                        }
                                    </p>
                                )}

                                {/* Score bar */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}>
                                    <div style={{
                                        flex: 1,
                                        height: '6px',
                                        backgroundColor: '#F0F0F0',
                                        borderRadius: '3px',
                                        overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            width: `${project.relevance_score}%`,
                                            height: '100%',
                                            backgroundColor: c.bar,
                                            borderRadius: '3px',
                                            transition: 'width 1s ease',
                                        }} />
                                    </div>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        color: c.text,
                                        minWidth: '40px',
                                        textAlign: 'right',
                                        fontFamily: 'monospace',
                                    }}>
                                        {project.relevance_score}%
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom tip */}
                <div style={{
                    marginTop: '20px',
                    padding: '14px 16px',
                    backgroundColor: '#EEF0FF',
                    borderRadius: '12px',
                    border: '1px solid #D4D0FF',
                    fontSize: '13px',
                    color: '#635BFF',
                    fontWeight: '500',
                }}>
                    💡 Tip: Highlight your most relevant projects first on your resume for this role.
                </div>
            </div>
        </div>
    )
}