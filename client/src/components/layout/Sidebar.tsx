import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Folder,
  ListTodo,
  Settings,
  Trash,
  LogOut,
  ChevronLeft,
  Bell,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSidebarStore } from "../../store/useSidebarStore";
import NotificationsDropdown from "../notifications/NotificationsDropdown";

type SidebarProps = {
  setIsOpen: (value: boolean) => void;
};
type MenuItem = {
  name: string;
  icon: React.ComponentType<any>;
  path?: string; // optional
  onClick?: () => void;
};

export default function Sidebar({ setIsOpen }: SidebarProps) {
  const { isOpen, closeSidebar } = useSidebarStore();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const collection: MenuItem[] = [
    { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", name: "Projects", icon: Folder },
    { path: "/tasks", name: "Tasks", icon: ListTodo },
    { path: "/trash", name: "Trash", icon: Trash },
    {
      name: "Notifications",
      icon: Bell,
      onClick: () => setIsNotificationsOpen((prev) => !prev),
    },
  ];

  const general: MenuItem[] = [
    { path: "/settings", name: "Settings", icon: Settings },
    { path: "/logout", name: "Logout", icon: LogOut },
  ];

  return (
    <>
      {/* ✅ Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10  z-[50] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:sticky top-0 left-0 h-screen bg-[var(--sidebar-bg-color)]  shadow-md flex flex-col justify-between transition-transform duration-300 z-50 w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "md:w-20" : "md:w-64"}
        md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between  mb-8">
            <div
              className={` transition-all duration-300 00 ${
                isCollapsed ? "md:w-0 md:opacity-0 " : "w-auto opacity-100"
              }`}
            >
              <p className="font-medium text-xl text-slate-900 whitespace-nowrap">
                Planora
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden top-5 -left-1.5 absolute md:flex items-center justify-center p-2 rounded-full bg-violet-100 hover:bg-violet-200 cursor-pointer transition"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Close button (mobile only) */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-violet-100 cursor-pointer"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Menu */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="mb-8 pt-5">
              {!isCollapsed && (
                <p className="text-xs font-semibold text-white mb-2 uppercase tracking-widest">
                  Menu
                </p>
              )}
              <nav className="flex flex-col gap-2 ">
                {collection.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = item.path && location.pathname === item.path;

                  const content = (
                    <>
                      <div className="flex justify-center w-8">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`ml-2 transition-all duration-200 ${
                          isCollapsed
                            ? "md:opacity-0 md:w-0 md:overflow-hidden"
                            : "opacity-100 translate-x-0"
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  );

                  return item.path ? (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "bg-violet-200 text-violet-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={index} className="relative">
                      <button
                        onClick={() => {
                          item.onClick?.();
                          setIsOpen(false);
                        }}
                        className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-gray-600 hover:bg-gray-100 transition-all"
                      >
                        {content}
                      </button>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* General */}
            <div>
              {!isCollapsed && (
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">
                  General
                </p>
              )}
              <nav className="flex flex-col gap-1">
                {general.map((item) => {
                  const Icon = item.icon;
                  if (item.name === "Logout") {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          logout();
                          navigate("/login");
                          setIsOpen(false);
                        }}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                      >
                        <div className="flex justify-center w-8">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`ml-2 transition-all duration-200 ${
                            isCollapsed
                              ? "md:opacity-0 md:w-0 md:overflow-hidden"
                              : "opacity-100 translate-x-0"
                          }`}
                        >
                          {item.name}
                        </span>
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.path}
                      to={item.path!}
                      onClick={closeSidebar}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        location.pathname === item.path
                          ? "bg-violet-200 text-violet-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-center w-8">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`ml-2 transition-all duration-200 ${
                          isCollapsed
                            ? "md:opacity-0 md:w-0 md:overflow-hidden"
                            : "opacity-100 translate-x-0"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
      {isNotificationsOpen && <NotificationsDropdown />}
    </>
  );
}
