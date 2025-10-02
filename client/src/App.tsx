import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import "react-toastify/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
