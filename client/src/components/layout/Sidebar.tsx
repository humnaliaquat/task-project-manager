import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Folder,
  ListTodo,
  Settings,
  Trash,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const collection = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", name: "Projects", icon: Folder },
    { path: "/tasks", name: "Tasks", icon: ListTodo },
    { path: "/trash", name: "Trash", icon: Trash },
  ];

  const general = [
    { path: "/settings", name: "Settings", icon: Settings },
    { path: "/logout", name: "Logout", icon: LogOut },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-violet-600 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen md:h-screen w-64 bg-violet-50 border-r border-gray-100 shadow-md flex flex-col justify-between p-4 transform transition-transform duration-300 z-40
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top Section */}
        <div>
          {/* Brand */}
          <div className="mb-8">
            <p className="font-medium text-xl text-slate-900">Planora</p>
          </div>

          {/* Menu */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">
              Menu
            </p>
            <nav className="flex flex-col gap-1">
              {collection.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-violet-200 text-violet-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)} // close sidebar on mobile
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* General */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">
              General
            </p>
            <nav className="flex flex-col gap-1">
              {general.map((item, index) =>
                item.name === "Logout" ? (
                  <button
                    key={index}
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-left"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-violet-100 text-violet-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 bg-violet-50 border border-violet-200 rounded-xl p-4 text-center">
          <h2 className="font-medium text-violet-700 text-lg mb-2">
            Upgrade Pro
          </h2>
          <p className="text-gray-600 text-sm mb-3">
            Unlock premium features to boost your productivity and workflow.
          </p>
          <button className="w-full py-2 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 transition">
            Upgrade Now
          </button>
        </footer>
      </div>
    </>
  );
}
