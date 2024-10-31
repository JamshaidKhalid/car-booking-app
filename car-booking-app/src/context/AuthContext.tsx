'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: any;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = Boolean(user);
  const router = useRouter();

  const login = (token: string, userEmail: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', userEmail);
    setUser({ email: userEmail });
    toast.success('Login successful');
    router.push('/vehicle');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    toast.success('Logged out');
    router.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) setUser({ email });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
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
