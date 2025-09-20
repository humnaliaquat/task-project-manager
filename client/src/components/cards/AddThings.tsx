import React from "react";
import { PlusSquare, ClipboardList } from "lucide-react";

export default function AddThings() {
  const collection = [
    {
      name: "Create Tasks",
      detail: "Add task to your project",
      icon: <ClipboardList className="h-6 w-6 text-violet-500" />,
    },
    {
      name: "Add Project",
      detail: "Start a new project",
      icon: <PlusSquare className="h-6 w-6 text-violet-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4  pb-2 pt-4  rounded-xl">
      {collection.map((item, index) => (
        <div
          key={index}
          className="p-4 pt-2 pb-2 flex items-center gap-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition  "
        >
          {/* Icon */}
          <div className="p-3 rounded-full bg-violet-100 flex items-center justify-center">
            {item.icon}
          </div>

          {/* Title + Detail */}
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-800 dark:text-white">
              {item.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
