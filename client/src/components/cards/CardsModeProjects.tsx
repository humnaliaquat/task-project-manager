import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

export default function CardsModeProjects() {
  const collection = [
    {
      projectName: "Project 1",
      status: "In Progress",
      incharge: "Humna",
      role: "Engineer",
      completedTasks: 5,
      totalTasks: 10,
      deadline: "12 May 2022",
      progress: 50,
    },
    {
      projectName: "Project 2",
      status: "Completed",
      incharge: "Ayesha",
      role: "Designer",
      completedTasks: 10,
      totalTasks: 10,
      deadline: "05 Jun 2022",
      progress: 100,
    },
    {
      projectName: "Project 3",
      status: "Pending",
      incharge: "Ali",
      role: "Manager",
      completedTasks: 2,
      totalTasks: 8,
      deadline: "20 Jul 2022",
      progress: 25,
    },
    {
      projectName: "Project 4",
      status: "In Progress",
      incharge: "Sara",
      role: "Developer",
      completedTasks: 7,
      totalTasks: 15,
      deadline: "10 Aug 2022",
      progress: 45,
    },
    {
      projectName: "Project 5",
      status: "Completed",
      incharge: "Bilal",
      role: "Tester",
      completedTasks: 12,
      totalTasks: 12,
      deadline: "01 Sep 2022",
      progress: 100,
    },
    {
      projectName: "Project 5",
      status: "Completed",
      incharge: "Bilal",
      role: "Tester",
      completedTasks: 12,
      totalTasks: 12,
      deadline: "01 Sep 2022",
      progress: 100,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const totalPages = Math.ceil(collection.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = collection.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  return (
    <div>
      {/* Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProjects.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-3  rounded-xl p-4 shadow-sm transition ${
              index % 2 === 0
                ? "bg-violet-50  border border-gray-200"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Header */}
            <header className="flex justify-between items-center">
              <p className="font-medium text-base text-slate-800">
                {item.projectName}
              </p>
              <div className="flex gap-2 justify-center items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-600 border border-gray-200"
                      : item.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600 border border-gray-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {item.status}
                </span>
                <button className="cursor-pointer">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </header>

            {/* Info */}
            <section className="grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div>
                <p className="text-gray-500">Incharge</p>
                <p className="font-medium">{item.incharge}</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-medium">{item.role}</p>
              </div>
              <div>
                <p className="text-gray-500">Tasks</p>
                <p className="font-medium">
                  {item.completedTasks}/{item.totalTasks}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Deadline</p>
                <p className="font-medium">{item.deadline}</p>
              </div>
            </section>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center text-sm mb-1">
                <p className="text-gray-500">Progress</p>
                <p className="font-medium">{item.progress}%</p>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex gap-2 mt-2">
              <button className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-100 cursor-pointer">
                View Details
              </button>
              <button className="flex-1 border border-violet-200 text-violet-600 rounded-lg py-2 text-sm hover:bg-violet-50 cursor-pointer">
                Edit Info
              </button>
            </footer>
          </div>
        ))}
      </main>

      {/* Pagination */}
      <footer className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-lg border ${
                num === currentPage
                  ? "bg-violet-500 text-white border-violet-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 cursor-pointer rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
