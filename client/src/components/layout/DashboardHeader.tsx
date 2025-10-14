import React, { useEffect, useRef, useState } from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import Dropdown from "../common/Dropdown";
import { useSidebarStore } from "../../store/useSidebarStore";

type Props = {
  title: string;
  subtitle: string;
  showSearch?: boolean;
  onToggleSidebar?: () => void;
};

export default function DashboardHeader({
  title,
  subtitle,
  showSearch = true,
  onToggleSidebar,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleSidebar } = useSidebarStore();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      {/* Left - Hamburger + Title */}
      <div className="flex items-center gap-3">
        {/* Hamburger (only visible on small screens) */}
        <button
          onClick={toggleSidebar}
          className="sm:hidden p-2 rounded-lg hover:bg-violet-100 transition cursor-pointer"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        <div>
          <p className="text-xl sm:text-2xl font-medium text-slate-800">
            {title}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {showSearch && (
          <div className="hidden sm:flex items-center bg-violet-50 px-3 py-1.5 rounded-xl">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search anything"
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>
        )}

        <div className="hidden sm:block">
          <button className="relative p-2 rounded-full hover:bg-violet-100 transition cursor-pointer">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="bg-violet-100 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-200 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <User className="h-5 w-5 text-violet-600" />
          </button>
          {isOpen && (
            <div className="absolute top-10 right-0 min-w-64">
              <Dropdown />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
