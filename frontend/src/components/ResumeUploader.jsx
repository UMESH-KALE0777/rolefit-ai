import { useState, useRef } from 'react'
import { Upload, FileText } from 'lucide-react'

export default function ResumeUploader({ onFileSelect, file }) {
    const [isDragging, setIsDragging] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const inputRef = useRef(null)

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const dropped = e.dataTransfer.files[0]

        if (dropped && dropped.type === 'application/pdf') {
            setUploadError('')
            onFileSelect(dropped)
        } else {
            setUploadError('Please upload a PDF file only.')
        }
    }

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (selected) {
            if (selected.type === 'application/pdf') {
                setUploadError('')
                onFileSelect(selected)
            } else {
                setUploadError('Please upload a PDF file only.')
            }
        }
    }

    return (
        <div>
            <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#111111',
                marginBottom: '8px',
            }}>
                Resume
                <span style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#8A8A8A',
                    marginLeft: '6px',
                }}>
                    PDF • Maximum 5 MB
                </span>
            </label>

            <div
                onClick={() => inputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                style={{
                    border: `1.5px dashed ${isDragging ? '#635BFF' : file ? '#00D46A' : '#E8E8E8'}`,
                    borderRadius: '12px',
                    padding: '56px 32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragging
                        ? '#EEF0FF'
                        : file
                            ? '#F0FDF6'
                            : '#FAFAFA',
                    transition: 'all 0.15s ease',
                }}
            >
                {file ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#00D46A',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            ✓ Resume uploaded
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '4px'
                        }}>
                            <FileText size={18} color="#8A8A8A" />
                            <span style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#111111',
                            }}>
                                {file.name}
                            </span>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onFileSelect(null)
                                setUploadError('')
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#635BFF',
                                fontSize: '13px',
                                fontWeight: '500',
                                marginTop: '8px',
                                padding: '4px 8px',
                            }}
                        >
                            Change file
                        </button>
                    </div>
                ) : (
                    <div>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            backgroundColor: '#F0F0F0',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 12px',
                        }}>
                            <Upload size={22} color="#8A8A8A" />
                        </div>
                        <p style={{
                            fontSize: '14px',
                            color: '#111111',
                            fontWeight: '500',
                            marginBottom: '6px',
                        }}>
                            Upload your resume
                        </p>
                        <p style={{
                            fontSize: '13px',
                            color: '#8A8A8A',
                            lineHeight: '1.5'
                        }}>
                            Drag & drop your PDF here<br />
                            or{' '}
                            <span style={{ color: '#635BFF', fontWeight: '500' }}>
                                browse your device
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {uploadError && (
                <p style={{
                    color: '#DC2626',
                    fontSize: '13px',
                    marginTop: '10px'
                }}>
                    {uploadError}
                </p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    )
}