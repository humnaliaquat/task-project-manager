import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSidebarStore } from "../../store/useSidebarStore";

export default function DashboardLayout() {
  const { isOpen } = useSidebarStore();
  return (
    <div className="min-h-screen flex">
      <Sidebar setIsOpen={() => {}} />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
