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
    <div className="flex flex-col border border-[var(--border)] bg-[var(--cards-bg)]  rounded-xl ">
      {/* Header */}
      <div className=" flex justify-between items-center border-[var(--border)]  px-4 py-3">
        <p className="text-lg font-medium  ">Assigned Tasks</p>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex justify-center items-center cursor-pointer   "
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
            className="flex justify-between items-center w-full px-4 py-1 mt-2 bg-[var(--inside-card-bg)]  border rounded border-[var(--border)]  transition"
          >
            {/* Left side */}
            <div className="flex flex-col">
              <p className="text-base font-medium ">{item.name}</p>
              <div className="flex gap-3 text-sm text-[var(--light-text)] ">
                <p>{item.detail}</p>
                <p className="text-[var(--violet-text)] font-medium">
                  Due {item.duedate}
                </p>
              </div>
            </div>

            {/* Right side - Eye Icon */}
            <button className="p-2 rounded-full hover:bg-[var(--hover-bg)]  transition cursor-pointer">
              <Eye className="w-5 h-5 " />
            </button>
          </div>
        ))}
        <button
          className="flex items-center justify-end gap-1.5 w-full text-sm font-medium text-[var(--violet-text)] hover:underline transition-colors duration-200 p-2 cursor-pointer"
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
