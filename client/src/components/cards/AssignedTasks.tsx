import React from "react";
import { Eye } from "lucide-react";

export default function AssignedTasks() {
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

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl ">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <p className="text-xl font-medium text-slate-800 dark:text-white">
          Assigned Tasks
        </p>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {collection.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-3 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition"
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
      </div>
    </div>
  );
}
