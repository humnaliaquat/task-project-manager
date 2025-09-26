import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface PrivateRoutesProps {
  children: ReactNode;
}

export default function PrivateRoutes({ children }: PrivateRoutesProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
