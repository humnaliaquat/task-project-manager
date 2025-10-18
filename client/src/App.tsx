import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-gray-900 = transition-colors duration-300 m-0 p-0"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </div>
  );
}
