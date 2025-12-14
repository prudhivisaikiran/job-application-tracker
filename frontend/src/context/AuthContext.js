import React, { createContext, useState, useEffect, useContext } from 'react';
import { setToken as setApiToken, getMe } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initUser = async () => {
            if (token) {
                setApiToken(token);
                try {
                    const data = await getMe();
                    setUser(data);
                } catch (err) {
                    console.error('Session expired', err);
                    logout();
                }
            } else {
                setApiToken(null);
            }
            setLoading(false);
        };
        initUser();
    }, [token]);

    const login = (data) => {
        setUser(data);
        setToken(data.token);
        setApiToken(data.token);
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setApiToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
