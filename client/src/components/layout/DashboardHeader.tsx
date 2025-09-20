import React from "react";
import { Bell, Search, User } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
};
export default function DashboardHeader({ title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 h-auto border-b border-gray-200 pb-2 p-4 pt-2">
      {/* Left Side - Title */}
      <div className="flex flex-col">
        <p className="text-xl font-medium text-slate-800 sm:text-2xl">
          {title}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm">{subtitle}</p>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search (hidden input on mobile, icon only) */}
        <div className="hidden sm:flex items-center bg-violet-50 px-3 py-1.5 rounded-xl">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent outline-none text-sm w-36 sm:w-40"
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="sm:hidden p-2 rounded-full hover:bg-violet-100 transition">
          <Search className="h-5 w-5 text-gray-600" />
        </button>

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
