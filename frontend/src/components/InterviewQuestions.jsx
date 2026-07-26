import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function InterviewQuestions({ questions }) {
    const [openIndex, setOpenIndex] = useState(0)

    if (!questions || questions.length === 0) return null

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E8E8E8',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '24px 32px',
                borderBottom: '1px solid #F0F0F0',
            }}>
                <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111111',
                    marginBottom: '2px',
                }}>
                    Interview Preparation
                </div>
                <div style={{
                    fontSize: '13px',
                    color: '#8A8A8A',
                }}>
                    Questions based on your skill gaps — prepare these before your interview
                </div>
            </div>

            {/* Questions */}
            <div style={{ padding: '16px 24px' }}>
                {questions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: '12px',
                            border: '1px solid #F0F0F0',
                            marginBottom: '8px',
                            overflow: 'hidden',
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
                                padding: '14px 16px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                backgroundColor: openIndex === index ? '#FAFAFA' : 'white',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <span style={{
                                    backgroundColor: '#EEF0FF',
                                    color: '#635BFF',
                                    border: '1px solid #D4D0FF',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    padding: '3px 10px',
                                    borderRadius: '100px',
                                }}>
                                    {item.skill}
                                </span>
                                <span style={{
                                    fontSize: '13px',
                                    color: '#8A8A8A',
                                    fontWeight: '400',
                                }}>
                                    {item.questions.length} questions
                                </span>
                            </div>
                            {openIndex === index
                                ? <ChevronUp size={16} color="#8A8A8A" />
                                : <ChevronDown size={16} color="#8A8A8A" />
                            }
                        </button>

                        {/* Questions list */}
                        {openIndex === index && (
                            <div style={{
                                padding: '0 16px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}>
                                {item.questions.map((q, qIndex) => (
                                    <div
                                        key={qIndex}
                                        style={{
                                            display: 'flex',
                                            gap: '12px',
                                            padding: '12px 14px',
                                            backgroundColor: '#FAFAFA',
                                            borderRadius: '8px',
                                            border: '1px solid #F0F0F0',
                                        }}
                                    >
                                        <span style={{
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            color: '#635BFF',
                                            minWidth: '24px',
                                            fontFamily: 'monospace',
                                        }}>
                                            Q{qIndex + 1}
                                        </span>
                                        <p style={{
                                            fontSize: '14px',
                                            color: '#111111',
                                            lineHeight: '1.5',
                                            margin: 0,
                                        }}>
                                            {q}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}