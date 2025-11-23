// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Vérifier si l'utilisateur est connecté en cherchant le token
  const checkAuth = () => {
    // Vérifier dans localStorage
    const accessToken = localStorage.getItem('accessToken');
    // Vérifier dans les cookies (pour le refreshToken)
    const hasRefreshToken = document.cookie.split(';').some(c => c.trim().startsWith('refreshToken='));
    
    setIsAuthenticated(!!(accessToken || hasRefreshToken));
  };

  useEffect(() => {
    checkAuth();
    // Vérifier périodiquement (toutes les 30 secondes)
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
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

