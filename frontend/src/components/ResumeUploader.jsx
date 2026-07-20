import { useState, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function ResumeUploader({ onFileSelect, file }) {
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef(null)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const dropped = e.dataTransfer.files[0]
        if (dropped && dropped.type === 'application/pdf') {
            onFileSelect(dropped)
        } else {
            alert('Please upload a PDF file only.')
        }
    }

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (selected) onFileSelect(selected)
    }

    return (
        <div>
            <label className="block text-white font-semibold mb-3">
                Resume (PDF only)
            </label>

            {/* Drop zone */}
            <div
                onClick={() => inputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragging
                        ? 'border-blue-500 bg-blue-950'
                        : file
                            ? 'border-green-500 bg-green-950'
                            : 'border-gray-700 bg-gray-900 hover:border-blue-500'
                    }`}
            >
                {file ? (
                    <div className="flex items-center justify-center gap-3">
                        <FileText className="text-green-400" size={24} />
                        <span className="text-green-400 font-medium">{file.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onFileSelect(null)
                            }}
                            className="text-gray-500 hover:text-red-400"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ) : (
                    <div>
                        <Upload className="mx-auto text-gray-500 mb-3" size={32} />
                        <p className="text-gray-400">
                            Drop your resume here or{' '}
                            <span className="text-blue-400">browse</span>
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                            PDF only — max 5MB
                        </p>
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}