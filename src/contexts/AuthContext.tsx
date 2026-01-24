import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../utils/api';

interface User {
    id?: string;
    email?: string;
    name?: string;
    token?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<any>;
    register: (userData: any) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you might want to verify the token with the backend here
            setUser({ token, name: 'John Doe' }); // Restoring mock user
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);
        setUser({ token: data.token, ...data.user });
        localStorage.setItem('token', data.token);
        return data;
    };

    const register = async (userData: any) => {
        const data = await authService.register(userData);
        setUser({ token: data.token, ...data.user });
        localStorage.setItem('token', data.token);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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
