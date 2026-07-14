import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('inkspire_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to load user session from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('inkspire_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('inkspire_user');
      }
    } catch (error) {
      console.error('Failed to update user session in localStorage:', error);
    }
  }, [user]);

  const login = (email, password) => {
    // Simple email-based display name simulation
    const name = email.split('@')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const mockUser = {
      email,
      name: capitalizedName,
      token: 'mock-jwt-token-12345'
    };
    
    setUser(mockUser);
    return true;
  };

  const signup = (name, email, password) => {
    const mockUser = {
      email,
      name,
      token: 'mock-jwt-token-12345'
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
