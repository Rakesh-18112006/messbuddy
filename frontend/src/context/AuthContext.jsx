import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Retrieve user and token from localStorage if available
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            try {
                setUser(JSON.parse(savedUser)); // Parse user data from string
                setToken(savedToken); // Set the token from localStorage
            } catch (err) {
                console.error('Error parsing saved user data from localStorage:', err);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
    }, []);

    // Set user and token data in context and localStorage
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    // Clear user and token data (log out)
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
