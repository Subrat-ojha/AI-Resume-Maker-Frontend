// Mock API utilities for demonstration
// Replace these with actual API calls to your backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
    // Generate resume from prompt
    generateResume: async (prompt) => {
        await delay(1500)

        // Mock response - replace with actual API call
        return {
            id: Math.random().toString(36).substr(2, 9),
            status: 'success',
            data: {
                name: 'John Doe',
                title: 'Software Engineer',
                summary: 'Generated summary based on your prompt...',
                experience: [],
                skills: [],
            },
        }
    },

    // Get resume by ID
    getResume: async (id) => {
        await delay(500)

        return {
            id,
            name: 'John Doe',
            title: 'Software Engineer',
            // ... more resume data
        }
    },

    // Get all user resumes
    getResumes: async () => {
        await delay(500)

        return [
            {
                id: '1',
                title: 'Software Engineer Resume',
                lastModified: new Date().toISOString(),
                status: 'completed',
            },
            // ... more resumes
        ]
    },

    // Update resume
    updateResume: async (id, data) => {
        await delay(500)

        return {
            id,
            ...data,
            updatedAt: new Date().toISOString(),
        }
    },

    // Delete resume
    deleteResume: async (id) => {
        await delay(500)

        return { success: true }
    },

    // Download resume as PDF
    downloadResume: async (id) => {
        await delay(1000)

        // In a real implementation, this would return a blob or trigger a download
        return { success: true, url: `/downloads/resume-${id}.pdf` }
    },
}

export default api
