import React from "react";

export default function ProjectsOverview() {
  const collection = [
    { name: "Total Projects", count: 8 },
    { name: "Pending Projects", count: 3 },
    { name: "Completed Projects", count: 5 },
    { name: "In Progress", count: 5 },
    { name: "Due today", count: 0 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 pt-3 pb-3 dark:bg-gray-900 rounded-xl">
      {collection.map((item, index) => (
        <div
          key={index}
          className="p-3 flex flex-col items-center justify-center border rounded-xl bg-white border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
            {item.name}
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mt-2">
            {item.count}
          </p>
        </div>
      ))}
    </div>
  );
}
