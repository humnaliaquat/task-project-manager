import React from "react";

export default function TasksOverview() {
  const collection = [
    { name: "Total tasks", count: 8 },
    { name: "Pending tasks", count: 3 },
    { name: "Completed tasks", count: 5 },
    { name: "In Progress", count: 5 },
    { name: "Due today", count: 0 },
  ];

  return (
    <div className="p-4 pt-4 pb-3 dark:bg-gray-900 rounded-xl">
      <div
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {collection.map((item, index) => (
          <div
            key={index}
            className="p-1.5 flex flex-col items-center justify-center border rounded-xl bg-white border-gray-200 "
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
    </div>
  );
}
