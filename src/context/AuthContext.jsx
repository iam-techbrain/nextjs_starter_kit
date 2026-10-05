'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoadingAuth: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initialize auth state from localStorage on client side mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('dummyjson_token');
      const storedUser = localStorage.getItem('dummyjson_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to load auth from localStorage', err);
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    try {
      localStorage.setItem('dummyjson_token', authToken);
      localStorage.setItem('dummyjson_user', JSON.stringify(userData));
    } catch (err) {
      console.error('Failed to save auth to localStorage', err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('dummyjson_token');
      localStorage.removeItem('dummyjson_user');
    } catch (err) {
      console.error('Failed to remove auth from localStorage', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        isLoadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
