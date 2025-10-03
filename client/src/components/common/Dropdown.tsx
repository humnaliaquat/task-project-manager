import React from "react";
import { User, Settings, LogOut, Palette } from "lucide-react";

type DropdownProps = {
  name?: string;
  email?: string;
  avatarLetter?: string;
  onLogout?: () => void;
};

export default function Dropdown({
  name = "John Doe",
  email = "example@gmail.com",
  avatarLetter = "J",
  onLogout,
}: DropdownProps) {
  const items = [
    {
      name: "Manage Account",
      icon: User,
      onClick: () => console.log("Manage Account"),
    },
    {
      name: "Settings",
      icon: Settings,
      onClick: () => console.log("Settings"),
    },
    { name: "Theme", icon: Palette, onClick: () => console.log("Theme") },
  ];

  return (
    <div className="w-64 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b border-gray-200">
        <span className="bg-violet-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium">
          {avatarLetter}
        </span>
        <div className="flex flex-col">
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-gray-500 text-sm truncate">{email}</p>
        </div>
      </header>

      {/* Menu Items */}
      <main className="p-2">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-violet-50 focus:bg-gray-100 focus:outline-none cursor-pointer"
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </button>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 p-2">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-red-600 hover:bg-violet-50  focus:bg-red-50 focus:outline-none cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </footer>
    </div>
  );
}
