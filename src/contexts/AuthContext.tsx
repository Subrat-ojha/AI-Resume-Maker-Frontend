import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authApi from '../api/auth';

export interface User {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
    emailVerified: boolean;
    subscriptionPlan: string;
    token?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<authApi.LoginResponse>;
    register: (data: authApi.RegisterRequest) => Promise<authApi.User>;
    logout: () => void;
    verifyOtp: (email: string, otp: string) => Promise<authApi.MessageResponse>;
    resendOtp: (email: string) => Promise<authApi.MessageResponse>;
    forgotPassword: (email: string) => Promise<authApi.MessageResponse>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<authApi.MessageResponse>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    // Verify token by fetching profile
                    const response = await authApi.getProfile();
                    setUser({ ...response.data, token });
                } catch (error) {
                    // Token invalid, clear storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login({ email, password });
        const userData = response.data;

        // Store token and user
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        return userData;
    };

    const register = async (data: authApi.RegisterRequest) => {
        const response = await authApi.register(data);
        // Don't auto-login after registration - user must verify OTP first
        return response.data;
    };

    const verifyOtp = async (email: string, otp: string) => {
        const response = await authApi.verifyOtp({ email, otp });
        return response.data;
    };

    const resendOtp = async (email: string) => {
        const response = await authApi.resendOtp(email);
        return response.data;
    };

    const forgotPassword = async (email: string) => {
        const response = await authApi.forgotPassword(email);
        return response.data;
    };

    const resetPassword = async (email: string, otp: string, newPassword: string) => {
        const response = await authApi.resetPassword({ email, otp, newPassword });
        return response.data;
    };

    const refreshProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await authApi.getProfile();
            setUser({ ...response.data, token });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            verifyOtp,
            resendOtp,
            forgotPassword,
            resetPassword,
            refreshProfile
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
