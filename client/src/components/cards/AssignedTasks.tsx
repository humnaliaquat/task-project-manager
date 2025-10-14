import React, { useEffect, useRef, useState } from "react";
import { Eye, MoreHorizontal, MoveRight, MoveUpRight, X } from "lucide-react";
import AllAssignedTask from "../assigned/AllAssignedTask";
import Dropdown from "../assigned/Dropdown";
import AddAssignedTask from "../assigned/AddAssignedTask";

export default function AssignedTasks() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const collection = [
    {
      name: "Web Mockup",
      detail: "Yellow branding",
      duedate: "12 May",
    },
    {
      name: "Mobile App",
      detail: "UI Redesign",
      duedate: "18 May",
    },
    {
      name: "Landing Page",
      detail: "SEO Optimized",
      duedate: "25 May",
    },
  ];
  const menuItems = [
    { label: "Add Task", onClick: () => setIsAddOpen(true) },
    { label: "View All", onClick: () => setIsAllOpen(true) },
  ];

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl ">
      {/* Header */}
      <div className=" flex justify-between items-center border-gray-200 dark:border-gray-700 px-4 py-3">
        <p className="text-lg font-medium text-slate-800 dark:text-white">
          Assigned Tasks
        </p>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex justify-center items-center cursor-pointer text-slate-600 hover:text-gray-800 "
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <MoreHorizontal size={17} />
          </button>
          {isDropdownOpen && (
            <div>
              <Dropdown items={menuItems} />
            </div>
          )}
        </div>
      </div>

      {/* Task List */}
      <div className=" p-2 pb-0 pt-0  ">
        {collection.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-full px-4 py-1 mt-2 hover:bg-violet-50 border rounded border-gray-300 dark:hover:bg-violet-900/30 transition"
          >
            {/* Left side */}
            <div className="flex flex-col">
              <p className="text-base font-medium text-slate-800">
                {item.name}
              </p>
              <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                <p>{item.detail}</p>
                <p className="text-violet-400 font-medium">
                  Due {item.duedate}
                </p>
              </div>
            </div>

            {/* Right side - Eye Icon */}
            <button className="p-2 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900 transition cursor-pointer">
              <Eye className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        ))}
        <button
          className="flex items-center justify-end gap-1.5 w-full text-sm font-medium text-violet-600 hover:text-violet-700 hover:underline transition-colors duration-200 p-2 cursor-pointer"
          onClick={() => setIsAllOpen(true)}
        >
          <span>View All</span>
          <MoveRight size={16} className="shrink-0" />
        </button>
        {isAllOpen && (
          <AllAssignedTask
            isOpen={isAllOpen}
            onClose={() => setIsAllOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
