import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function InterviewQuestions({ questions }) {
    const [openIndex, setOpenIndex] = useState(0)

    if (!questions || questions.length === 0) {
        return null
    }

    return (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-white font-bold text-lg mb-2">
                💬 Interview Questions
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                Based on your skill gaps — prepare for these questions.
            </p>

            <div className="space-y-3">
                {questions.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                    >
                        {/* Skill header */}
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <span className="bg-blue-900 text-blue-400 text-xs px-3 py-1 rounded-full border border-blue-700">
                                    {item.skill}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {item.questions.length} questions
                                </span>
                            </div>
                            {openIndex === index
                                ? <ChevronUp className="text-gray-400" size={18} />
                                : <ChevronDown className="text-gray-400" size={18} />
                            }
                        </button>

                        {/* Questions */}
                        {openIndex === index && (
                            <div className="px-4 pb-4 space-y-3">
                                {item.questions.map((q, qIndex) => (
                                    <div
                                        key={qIndex}
                                        className="flex gap-3 bg-gray-900 rounded-lg p-3"
                                    >
                                        <span className="text-blue-500 font-bold text-sm min-w-fit">
                                            Q{qIndex + 1}.
                                        </span>
                                        <p className="text-gray-300 text-sm">{q}</p>
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