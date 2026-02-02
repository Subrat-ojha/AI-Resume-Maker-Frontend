import api from './api';

// Types for resume API
export interface ResumePrompt {
    role: string;
    experienceYears: number;
    skills: string[];
    projects: string[];
    tone: string;
    jobDescription?: string;
}

export interface GenerateResumeRequest {
    templateId: string;
    outputFormat: string;
    prompt: ResumePrompt;
}

export interface ResumeResponse {
    status: string;
    message: string;
    downloadUrl: string;
    remainingOptimizations?: number;
    isGuest?: boolean;
    usedCount?: number;
}

export interface UsageResponse {
    status: string;
    message: string;
    remainingOptimizations: number;
    isGuest: boolean;
    usedCount: number;
}

// Resume API functions
export const getUsage = () =>
    api.get<UsageResponse>('/api/resumes/usage');
export const generateResume = (data: GenerateResumeRequest) =>
    api.post<ResumeResponse>('/api/resumes/generate', data);

export const optimizeResume = (file: File, jobDescription: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);
    return api.post<ResumeResponse>('/api/resumes/optimize', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const getDownloadUrl = (downloadPath: string): string => {
    return `${import.meta.env.VITE_API_URL}${downloadPath}`;
};
