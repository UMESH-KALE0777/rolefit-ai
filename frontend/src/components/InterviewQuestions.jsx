import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

export default function InterviewQuestions({ questions }) {
    // Recommendation #11: Start with all sections closed by default
    const [openIndex, setOpenIndex] = useState(-1);

    // Recommendation #8: Keep empty state simple for V1
    if (!questions || questions.length === 0) return null;

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px', // Recommendation #9: Updated card styling
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden',
        }}>
            {/* Embedded styles for animations (Rec #4) and mobile (Rec #10) */}
            <style>{`
                .accordion-content {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
                    opacity: 0;
                }
                .accordion-content.open {
                    grid-template-rows: 1fr;
                    opacity: 1;
                }
                .accordion-inner {
                    overflow: hidden;
                }
                .skill-header-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                @media (max-width: 600px) {
                    .skill-header-content {
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                }
            `}</style>

            {/* Header */}
            <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #F0F0F0',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                }}>
                    {/* Recommendation #7: Add an icon */}
                    <MessageSquare size={18} color="#635BFF" />
                    <div style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111111',
                        letterSpacing: '-0.3px',
                    }}>
                        {/* Recommendation #1: Rename Title */}
                        AI Interview Preparation
                    </div>
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#8A8A8A',
                    marginLeft: '26px', // Align text with title (accounting for icon)
                }}>
                    {/* Recommendation #2: Better Subtitle */}
                    Practice these AI-generated questions to prepare for the interview.
                </div>
            </div>

            {/* Questions */}
            <div style={{ padding: '24px 32px' }}>
                {questions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: '16px',
                            border: '1px solid #F0F0F0',
                            marginBottom: '12px',
                            overflow: 'hidden',
                            backgroundColor: openIndex === index ? '#FAFAFA' : 'white',
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        {/* Skill header */}
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px 20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            <div className="skill-header-content">
                                {/* Recommendation #3: Improve skill badge padding & weight */}
                                <span style={{
                                    backgroundColor: '#EEF0FF',
                                    color: '#635BFF',
                                    border: '1px solid #D4D0FF',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    padding: '6px 14px',
                                    borderRadius: '100px',
                                }}>
                                    {item.skill}
                                </span>
                                <span style={{
                                    fontSize: '13px',
                                    color: '#8A8A8A',
                                    fontWeight: '500',
                                }}>
                                    {item.questions.length} questions
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: openIndex === index ? '#EEF0FF' : 'transparent',
                                transition: 'background-color 0.2s ease',
                                flexShrink: 0,
                            }}>
                                {openIndex === index
                                    ? <ChevronUp size={18} color="#635BFF" />
                                    : <ChevronDown size={18} color="#8A8A8A" />
                                }
                            </div>
                        </button>

                        {/* Recommendation #4: Smooth accordion animation */}
                        <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
                            <div className="accordion-inner">
                                <div style={{
                                    padding: '0 20px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                }}>
                                    {item.questions.map((q, qIndex) => (
                                        <div
                                            key={qIndex}
                                            style={{
                                                display: 'flex',
                                                gap: '16px',
                                                padding: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '12px', // Recommendation #6: Increased border radius
                                                border: '1px solid #F0F0F0',
                                            }}
                                        >
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#8A8A8A',
                                                minWidth: '24px',
                                                marginTop: '2px', // Alignment tweak
                                            }}>
                                                {/* Recommendation #5: Better question numbering */}
                                                {String(qIndex + 1).padStart(2, '0')}
                                            </span>
                                            <p style={{
                                                fontSize: '14.5px',
                                                color: '#111111',
                                                lineHeight: '1.6',
                                                margin: 0,
                                            }}>
                                                {q}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}