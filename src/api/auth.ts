import api from './api';

// Types matching backend response
export interface User {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
    emailVerified: boolean;
    subscriptionPlan: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse extends User {
    token: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
    profileImageUrl?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
}

export interface MessageResponse {
    success: boolean;
    message: string;
}

export interface ImageUploadResponse {
    url: string;
}

// Auth API functions
export const register = (data: RegisterRequest) =>
    api.post<User>('/api/auth/register', data);

export const login = (data: LoginRequest) =>
    api.post<LoginResponse>('/api/auth/login', data);

export const verifyOtp = (data: VerifyOtpRequest) =>
    api.post<MessageResponse>('/api/auth/verify-otp', data);

export const resendOtp = (email: string) =>
    api.post<MessageResponse>('/api/auth/resend-otp', { email });

export const forgotPassword = (email: string) =>
    api.post<MessageResponse>('/api/auth/forgot-password', { email });

export const resetPassword = (data: ResetPasswordRequest) =>
    api.post<MessageResponse>('/api/auth/reset-password', data);

export const getProfile = () =>
    api.get<User>('/api/auth/profile');

export const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<ImageUploadResponse>('/api/auth/uploadimage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
