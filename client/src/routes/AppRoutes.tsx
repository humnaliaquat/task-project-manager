import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
export default function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<Login />} />

      {/* private routes */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
