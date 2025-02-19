// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/utils/api";

interface User {
  id: number;
  email: string;
  role: "user" | "manager";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/v1/users/me"); // Измененный эндпоинт
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await api.post("/api/v1/users/sign_in", { email, password });
      const { data } = await api.get("/api/v1/users/me");
      setUser(data);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      throw new Error("Invalid login credentials");
    }
  };

  const logout = () => {
    api.delete("/api/v1/users/sign_out");
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, login: async () => {}, logout: () => {} };
  }
  return context;
}
