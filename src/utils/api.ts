// Re-export from new API modules for backward compatibility
// This file is deprecated - import from src/api/ modules directly

import api from '../api/api';
export { api };
export * from '../api/auth';
export * from '../api/resume';

// Legacy types for backward compatibility
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

// Legacy auth service wrapper
import * as authApi from '../api/auth';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await authApi.login({ email, password });
        return {
            token: response.data.token,
            user: response.data
        };
    },
    register: async (userData: any) => {
        const response = await authApi.register(userData);
        return {
            token: '',
            user: response.data
        };
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Legacy resume service wrapper
import * as resumeApi from '../api/resume';

export const resumeService = {
    generate: async (prompt: string, file: File | null): Promise<Resume> => {
        if (file) {
            // Use optimize endpoint for existing resume
            const response = await resumeApi.optimizeResume(file, prompt);
            return {
                id: response.data.downloadUrl,
                status: 'success'
            };
        } else {
            // For now, mock the response until we implement proper prompt parsing
            // The backend expects structured data, not just a prompt string
            const response = await resumeApi.generateResume({
                templateId: 'modern',
                outputFormat: 'docx',
                prompt: {
                    role: prompt,
                    experienceYears: 0,
                    skills: [],
                    projects: [],
                    tone: 'professional'
                }
            });
            return {
                id: response.data.downloadUrl,
                status: 'success'
            };
        }
    }
};

export default api;
