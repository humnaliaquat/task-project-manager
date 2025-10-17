import React, { useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, Search, User } from "lucide-react";
import Dropdown from "../common/Dropdown";
import { useSidebarStore } from "../../store/useSidebarStore";
import { useTheme } from "../../context/ThemeContext";

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
  const { theme, setTheme, isDark } = useTheme();

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
    <header
      className="sticky top-0 z-40 p-4 flex justify-between items-center"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
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
          <p
            className="text-xl sm:text-2xl font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </p>
          <p
            className="text-xs sm:text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {showSearch && (
          <div
            className="hidden sm:flex items-center px-3 py-1.5 rounded-xl"
            style={{ backgroundColor: "var(--chip-bg)" }}
          >
            <Search
              className="h-4 w-4 mr-2"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search anything"
              className="bg-transparent outline-none text-sm w-40"
              style={{ color: "var(--text-primary)" }}
            />
          </div>
        )}

        <div className="hidden sm:block">
          <button
            className="relative p-2 rounded-full transition cursor-pointer"
            style={{ backgroundColor: "transparent" }}
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
          >
            {isDark ? (
              <Sun className="h-5 w-5" style={{ color: "var(--icon)" }} />
            ) : (
              <Moon className="h-5 w-5" style={{ color: "var(--icon)" }} />
            )}
          </button>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 rounded-full flex items-center justify-center cursor-pointer transition"
            style={{ backgroundColor: "var(--chip-bg)" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <User className="h-5 w-5" style={{ color: "var(--icon)" }} />
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
