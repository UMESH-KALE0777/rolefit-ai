import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8000'

export const analyzeResume = async (resumeFile, jobDescription) => {
    const formData = new FormData()
    formData.append('resume', resumeFile)
    formData.append('job_description', jobDescription)

    const response = await axios.post(
        `${API_BASE}/api/analyze`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )

    return response.data
}