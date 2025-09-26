import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

// type for context value
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// create context with type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook with safety check
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
