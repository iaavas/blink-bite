"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  token: string | null;
  role: string | null;
  login: (newToken: string) => void;
  addRole: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  role: null,
  login: () => {},
  addRole: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(function () {
    setToken(localStorage.getItem("token") ?? null);
    setRole(localStorage.getItem("role") ?? null);
  }, []);

  const login = (newToken: string) => {
    console.log("newToken", newToken);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const addRole = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, role, addRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
