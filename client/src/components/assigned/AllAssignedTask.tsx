import { Eye, MoreHorizontal, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { handleError } from "../../utils/utils";
import axios from "axios";
import AddAssignedTask from "./AddAssignedTask";

type AllAssignedTasksProps = {
  onClose: () => void;
  isOpen: boolean;
};
type AssignedTasks = {
  _id: string;
  title: string;
  dueDate: string;
  description: string;
};
export default function AllAssignedTask({
  onClose,
  isOpen,
}: AllAssignedTasksProps) {
  const [tasks, setTasks] = useState<AssignedTasks[]>([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const collection = [
    { name: "Web Mockup", detail: "Yellow branding", duedate: "12 May" },
    { name: "Mobile App", detail: "UI Redesign", duedate: "18 May" },
    { name: "Landing Page", detail: "SEO Optimized", duedate: "25 May" },
  ];
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await axios.get("http://localhost:3000/assigned");
        if (!tasks) {
          handleError("No tasks found");
        }
        setTasks(tasks.data);
      } catch (err: any) {
        handleError(err.message || "Something went wrong");
      }
    };
    fetchTasks();
  }, []);
  useEffect(() => {
    if (isOpen) {
      // disable scroll on body
      document.body.style.overflow = "hidden";
    } else {
      // re-enable scroll
      document.body.style.overflow = "";
    }

    // cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div
      className={`fixed inset-0 z-50 transition-colors duration-300 ${
        isOpen ? "bg-black/30 visible" : "invisible"
      }`}
    >
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl border-l border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <header className="flex justify-between items-center   relative">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-violet-300 bg-violet-200 transition absolute cursor-pointer -left-4 top-1"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </header>
        <div className="flex justify-between items-center p-4">
          <p className="text-lg ">Assigned Tasks</p>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer">
            <MoreHorizontal size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Task List */}
        <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-60px)]">
          {tasks.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-2 rounded-lg border border-gray-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition"
            >
              {/* Left side */}
              <div>
                <p className="text-base font-semibold text-slate-800">
                  {item?.title}
                </p>
                <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <p>{item?.description}</p>
                  <p className="text-violet-500 font-medium">
                    Due {item?.dueDate}
                  </p>
                </div>
              </div>

              {/* Right side - Eye Icon */}
              <button className="p-2 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900 transition">
                <Eye className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
