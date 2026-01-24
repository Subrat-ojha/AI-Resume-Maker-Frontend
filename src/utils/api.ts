// Mock API utilities for demonstration
// Replace these with actual API calls to your backend

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ResumeData {
    name?: string;
    title?: string;
    summary?: string;
    experience?: any[];
    skills?: string[];
    [key: string]: any;
}

export interface Resume {
    id: string;
    title?: string;
    status: 'success' | 'processing' | 'failed' | 'completed';
    data?: ResumeData;
    lastModified?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    success?: boolean;
    data?: T;
    error?: string;
    status?: string;
    id?: string;
    url?: string;
    [key: string]: any;
}

export const api = {
    // Generate resume from prompt
    generateResume: async (prompt: string): Promise<Resume> => {
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
    getResume: async (id: string): Promise<Resume> => {
        await delay(500)

        return {
            id,
            status: 'completed',
            data: {
                name: 'John Doe',
                title: 'Software Engineer',
            }
        }
    },

    // Get all user resumes
    getResumes: async (): Promise<Resume[]> => {
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
    updateResume: async (id: string, data: any): Promise<Resume> => {
        await delay(500)

        return {
            id,
            status: 'success',
            ...data,
            updatedAt: new Date().toISOString(),
        }
    },

    // Delete resume
    deleteResume: async (id: string): Promise<{ success: boolean }> => {
        await delay(500)

        return { success: true }
    },

    // Download resume as PDF
    downloadResume: async (id: string): Promise<{ success: boolean; url: string }> => {
        await delay(1000)

        // In a real implementation, this would return a blob or trigger a download
        return { success: true, url: `/downloads/resume-${id}.pdf` }
    },
}

export const authService = {
    login: async (email: string, password: string) => {
        await delay(1000)
        return {
            token: 'mock-jwt-token',
            user: {
                id: '1',
                email,
                name: 'John Doe',
                role: 'user'
            }
        }
    },
    register: async (userData: any) => {
        await delay(1000)
        return {
            token: 'mock-jwt-token',
            user: {
                id: '1',
                email: userData.email,
                name: userData.name,
                role: 'user'
            }
        }
    },
    logout: () => {
        localStorage.removeItem('token')
    }
}

export const resumeService = {
    generate: async (prompt: string, file: File | null): Promise<Resume> => {
        await delay(2000)

        // Mock ID generation
        return {
            id: Math.random().toString(36).substr(2, 9),
            status: 'success'
        }
    }
}

export default api
