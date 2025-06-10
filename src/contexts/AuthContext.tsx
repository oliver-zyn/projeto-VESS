import React, { createContext, useContext, useEffect, useState } from "react";
import type { UserConfig } from "../types";
import apiService from "../services/api";
interface User extends UserConfig {
  id: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<UserConfig>) => Promise<void>;
  isAuthenticated: boolean;
}
interface RegisterData {
  email: string;
  name: string;
  password: string;
  address?: string;
  country?: string;
  cityState?: string;
  language?: string;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeAuth();
  }, []);
  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const result = await apiService.verifyToken();
        if (result) {
          setUser(result.user);
        } else {
          apiService.logout();
        }
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      apiService.logout();
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    const result = await apiService.login(email, password);
    setUser(result.user);
  };
  const register = async (userData: RegisterData) => {
    const result = await apiService.register(userData);
    setUser(result.user);
  };
  const logout = () => {
    apiService.logout();
    setUser(null);
  };
  const updateProfile = async (userData: Partial<UserConfig>) => {
    const updatedUser = await apiService.updateUserProfile(userData);
    setUser(updatedUser);
  };
  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
