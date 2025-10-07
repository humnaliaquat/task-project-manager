import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import TasksPage from "../pages/TasksPage";
import Trash from "../pages/Trash";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import SettingsPage from "../pages/SettingsPage";

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
          path="/settings"
          element={
            <PrivateRoutes>
              <SettingsPage />
            </PrivateRoutes>
          }
        ></Route>
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
