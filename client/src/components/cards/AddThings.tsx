import React from "react";
import {
  PlusSquare,
  ClipboardList,
  FolderKanban,
  CheckSquare,
} from "lucide-react";

export default function AddThings() {
  const actions = [
    {
      name: "Create Task",
      detail: "Add tasks to your projects",
      icon: <ClipboardList className="h-6 w-6 text-violet-500" />,
    },
    {
      name: "Add Project",
      detail: "Start a new project",
      icon: <PlusSquare className="h-6 w-6 text-violet-500" />,
    },
  ];

  const stats = [
    {
      name: "Total Projects",
      count: 3,
      icon: <FolderKanban className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Total Tasks",
      count: 8,
      icon: <CheckSquare className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl">
      {/* Quick Actions */}
      {actions.map((item, index) => (
        <div
          key={index}
          className="p-2 flex items-center gap-4 border border-gray-200 rounded-xl bg-white s cursor-pointer"
        >
          {/* Icon */}
          <div className="p-2 rounded-full bg-violet-100 flex items-center justify-center">
            {item.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <p className="text-base font-medium ">{item.name}</p>
            <p className="text-sm  text-gray-600">{item.detail}</p>
          </div>
        </div>
      ))}

      {/* Stats */}
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-2 flex items-center gap-4 border border-gray-200 rounded-xl bg-white "
        >
          {/* Icon */}
          <div className="p-2.5 rounded-full  bg-violet-100 flex items-center justify-center">
            {stat.icon}
          </div>

          {/* Numbers */}
          <div className="flex flex-col">
            <p className="text-2xl font-bold ">{stat.count}</p>
            <p className="text-sm ">{stat.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
