import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex ">
      <Sidebar />
      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}
