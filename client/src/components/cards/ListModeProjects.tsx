// keep your imports same
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

type Project = {
  id: number;
  name: string;
  incharge: string; // replaced start with incharge
  deadline: string;
  status: "Completed" | "In Progress" | "Pending";
  totaltasks: number;
};

export default function ListModeProjects() {
  const projects: Project[] = [
    {
      id: 1,
      name: "Project 1",
      incharge: "Ali Khan",
      deadline: "20 June 2025",
      status: "Pending",
      totaltasks: 10,
    },
    {
      id: 2,
      name: "Project 2",
      incharge: "Sara Ahmed",
      deadline: "25 June 2025",
      status: "In Progress",
      totaltasks: 8,
    },
    {
      id: 3,
      name: "Project 3",
      incharge: "Hamza Malik",
      deadline: "18 June 2025",
      status: "Completed",
      totaltasks: 12,
    },
    {
      id: 4,
      name: "Project 4",
      incharge: "Ayesha Khan",
      deadline: "30 June 2025",
      status: "In Progress",
      totaltasks: 14,
    },
    {
      id: 5,
      name: "Project 5",
      incharge: "Bilal Ahmed",
      deadline: "05 July 2025",
      status: "Pending",
      totaltasks: 12,
    },
    {
      id: 5,
      name: "Project 5",
      incharge: "Bilal Ahmed",
      deadline: "05 July 2025",
      status: "Pending",
      totaltasks: 12,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 12;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const allSelected = selectedProjects.length === currentProjects.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(currentProjects.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const statusColors: Record<Project["status"], string> = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-violet-50">
            <tr className="text-sm border-b border-gray-200">
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  className="accent-violet-600 cursor-pointer"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-3 px-4 text-center">Project Name</th>
              <th className="py-3 px-4 text-center">Incharge</th>
              <th className="py-3 px-4 text-center">Deadline</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Total Tasks</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentProjects.map((project) => (
              <tr
                key={project.id}
                className={`text-sm hover:bg-violet-100 transition ${
                  selectedProjects.includes(project.id)
                    ? "bg-violet-50"
                    : "odd:bg-white even:bg-violet-50"
                }`}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    className="accent-violet-600 cursor-pointer"
                    checked={selectedProjects.includes(project.id)}
                    onChange={() => toggleSelectOne(project.id)}
                  />
                </td>
                <td className="py-3 px-4 font-medium text-center">
                  <Link
                    to={`/projects/${project.id}`}
                    className="hover:underline text-violet-600"
                  >
                    {project.name}
                  </Link>
                </td>
                <td className="px-4 text-center">{project.incharge}</td>
                <td className="px-4 text-center">{project.deadline}</td>
                <td className="px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColors[project.status]
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 text-center">{project.totaltasks}</td>
                <td className="px-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button className="text-red-500 hover:text-red-700 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden  ">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="border-b border-gray-300  p-4  bg-white"
          >
            <div className="flex justify-between items-center">
              <Link
                to={`/projects/${project.id}`}
                className="font-semibold text-violet-600 hover:underline"
              >
                {project.name}
              </Link>
              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-2">
              <span className="font-medium">Incharge:</span> {project.incharge}
            </p>
            <p className="text-sm text-gray-600  mb-2">
              <span className="font-medium">Deadline:</span> {project.deadline}
            </p>
            <p className="text-sm mt-1 text-gray-600 flex gap-1  mb-2">
              Status:
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Total Tasks:</span>{" "}
              {project.totaltasks}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <footer className="flex justify-between items-center mt-4 px-4 py-2 text-sm text-gray-600">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg disabled:opacity-50 border-gray-300 cursor-pointer "
        >
          Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 rounded-lg border cursor-pointer ${
                num === currentPage
                  ? "bg-violet-500 text-white border-violet-500"
                  : "hover:bg-gray-100 border-gray-300 cursor-pointer "
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
