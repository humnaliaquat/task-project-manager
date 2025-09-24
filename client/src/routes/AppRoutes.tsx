import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import TasksPage from "../pages/TasksPage";
import ProjectDetails from "../components/projects/ProjectDetails";
import Trash from "../pages/Trash";
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
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/trash" element={<Trash />} />
      </Route>
    </Routes>
  );
}
