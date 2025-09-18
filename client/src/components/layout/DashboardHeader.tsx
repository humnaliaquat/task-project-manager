import React from "react";
import { Bell, Search, User } from "lucide-react";
export default function DashboardHeader() {
  return (
    <header className="flex justify-between items-center h-10  ">
      {/* Left Side - Title */}
      <div>
        <h1 className="text-2xl font-medium text-slate-700 ">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Monitor all of your projects and tasks here
        </p>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center bg-violet-50 px-3 py-1.5 rounded-xl">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent outline-none text-sm w-40"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-violet-100 transition">
          <Bell className="h-5 w-5 text-gray-600" />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <span className="bg-violet-100 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-200 transition">
          <User className="h-5 w-5 text-violet-600" />
        </span>
      </div>
    </header>
  );
}
