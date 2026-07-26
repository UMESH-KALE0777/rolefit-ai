import React from 'react';

export default function BiasReport({ biasReport }) {
    return (
        <div className="bias-report-container" style={{
            backgroundColor: 'white',
            borderRadius: '24px', // Rec 8: Better card styling
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)', // Rec 8: Subtle shadow
            overflow: 'hidden',
        }}>
            {/* Embedded styles for responsive stacking (Rec 5 & 9) */}
            <style>{`
                .suggestion-flow {
                    display: flex;
                    gap: 16px;
                    align-items: stretch;
                }
                .arrow-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #8A8A8A;
                    font-size: 20px;
                }
                .arrow-icon::before {
                    content: "→";
                }
                @media (max-width: 600px) {
                    .header-container {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 16px;
                    }
                    .suggestion-flow {
                        flex-direction: column;
                    }
                    .arrow-container {
                        padding: 4px 0;
                    }
                    .arrow-icon::before {
                        content: "↓";
                    }
                }
            `}</style>

            {/* Header */}
            <div className="header-container" style={{
                padding: '24px 32px',
                borderBottom: '1px solid #F0F0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
            }}>
                <div>
                    <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111111',
                        marginBottom: '4px',
                        letterSpacing: '-0.3px',
                    }}>
                        Inclusive Language Analysis {/* Rec 1: Rename title */}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#8A8A8A',
                        lineHeight: '1.5',
                        maxWidth: '500px',
                    }}>
                        {/* Rec 7: Add a short explanation */}
                        This analysis highlights terms that may discourage some applicants and suggests more inclusive alternatives.
                    </div>
                </div>

                {/* Status badge (Rec 2 & 3: Better text and updated colors) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: biasReport.found ? '#FFF5F5' : '#F0FDF6',
                    border: `1px solid ${biasReport.found ? '#FED7D7' : '#C3F0DA'}`,
                    borderRadius: '100px',
                    padding: '8px 14px',
                    flexShrink: 0,
                }}>
                    <span style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: biasReport.found ? '#DC2626' : '#15803D',
                    }}>
                        {biasReport.found
                            ? `⚠ ${biasReport.flagged.length} Suggestion${biasReport.flagged.length > 1 ? 's' : ''}`
                            : '✓ Inclusive Language'
                        }
                    </span>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '32px' }}>
                {!biasReport.found ? (
                    /* Rec 4: Improve the "No Issues" state */
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '16px',
                        border: '1px dashed #E5E7EB',
                    }}>
                        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎉</div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111111',
                            marginBottom: '8px',
                        }}>
                            Great!
                        </div>
                        <div style={{
                            fontSize: '14.5px',
                            color: '#6B7280',
                            maxWidth: '350px',
                            lineHeight: '1.6',
                        }}>
                            No potentially biased language was detected. This job description already uses inclusive and welcoming language.
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {biasReport.flagged.map((item, index) => (
                            /* Rec 5 & 9: Improved flagged items & mobile layout */
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '16px',
                                    border: '1px solid #F0F0F0',
                                    padding: '20px',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginBottom: '16px',
                                }}>
                                    {/* Rec 6: Replace "Biased" tag */}
                                    <span style={{
                                        fontSize: '11px',
                                        color: '#635BFF',
                                        backgroundColor: '#EEF0FF',
                                        padding: '4px 10px',
                                        borderRadius: '100px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}>
                                        Suggestion
                                    </span>
                                </div>

                                <div className="suggestion-flow">
                                    {/* Original Word */}
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: '#FFF5F5',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid #FED7D7',
                                    }}>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#EF4444',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px',
                                        }}>
                                            Replace
                                        </div>
                                        <div style={{
                                            fontSize: '16px',
                                            color: '#991B1B',
                                            fontWeight: '500',
                                        }}>
                                            {item.word}
                                        </div>
                                    </div>

                                    {/* Arrow Divider */}
                                    <div className="arrow-container">
                                        <span className="arrow-icon"></span>
                                    </div>

                                    {/* Suggested Word */}
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: '#F0FDF6',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid #C3F0DA',
                                    }}>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#22C55E',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            marginBottom: '6px',
                                        }}>
                                            Suggested
                                        </div>
                                        <div style={{
                                            fontSize: '16px',
                                            color: '#166534',
                                            fontWeight: '500',
                                        }}>
                                            {item.suggestion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}