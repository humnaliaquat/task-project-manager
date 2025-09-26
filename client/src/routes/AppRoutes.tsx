import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignUpPage from "../pages/SignUpPage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import TasksPage from "../pages/TasksPage";
import ProjectDetails from "../components/projects/ProjectDetails";
import Trash from "../pages/Trash";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
      <Route
        path="/"
        element={
          <PublicRoutes>
            <LandingPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <SignUpPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />

      {/* private routes */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoutes>
              <Projects />
            </PrivateRoutes>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoutes>
              <TasksPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PrivateRoutes>
              <ProjectDetails />
            </PrivateRoutes>
          }
        />
        <Route
          path="/trash"
          element={
            <PrivateRoutes>
              <Trash />
            </PrivateRoutes>
          }
        />
      </Route>
    </Routes>
  );
}
