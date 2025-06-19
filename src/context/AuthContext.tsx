import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const username = localStorage.getItem('username');
            setIsAuthenticated(true);
            setUser(username ? { username } : null);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            setError(null);
            const data = await apiService.login({ username, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            setIsAuthenticated(true);
            setUser({ username });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
            throw new Error(message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
