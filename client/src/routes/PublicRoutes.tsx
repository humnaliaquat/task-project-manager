import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PublicRoutesProps {
  children: ReactNode;
}

export default function PublicRoutes({ children }: PublicRoutesProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
