import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal, X } from "lucide-react";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/utils";
import ProjectDetails from "../projects/ProjectDetails";
import ActionDropdown from "../projects/dropdown/ActionDropdown";
import AddProjectModal from "../projects/AddProjectModal";
type Project = {
  _id: string;
  title: string;
  status?: string;
  dueDate?: string;
  inChargeName?: string;
};
export default function CardsModeProjects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [editProject, setEditProject] = useState<Project | null>(null);

  const projectsPerPage = 6;
  const [projects, setProjects] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const toggleDropdown = (id: string) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:3000/projects");
        setProjects(res.data);
      } catch (error: any) {
        handleError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (loading) {
    return <p className="text-center mt-10">Loading projects...</p>;
  }
  return (
    <div>
      {/* Cards */}
      {/* Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProjects.length === 0 ? (
          <div className="col-span-full text-center  text-gray-500 ">
            <p className="text-lg font-medium">No projects yet</p>
            <p className="text-sm mt-2">
              Start by adding a new project to see it here.
            </p>
          </div>
        ) : (
          currentProjects.map((item, index) => (
            <div
              key={item._id || index}
              className={`flex flex-col gap-3 rounded-xl p-4 shadow-sm transition ${
                index % 2 === 0
                  ? "bg-violet-50 border border-gray-200"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Header */}
              <header className="flex justify-between items-center">
                <button
                  className="font-medium text-base text-left text-slate-800 hover:underline cursor-pointer"
                  onClick={() => setSelectedProjectId(item._id)}
                >
                  {item.title}
                </button>
                <div className="flex gap-2 justify-center items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-600 border border-gray-200"
                        : item.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-600 border border-gray-200"
                        : "bg-gray-300 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                  <div
                    className="relative "
                    onClick={() => toggleDropdown(item._id)}
                  >
                    <button className="cursor-pointer">
                      <MoreHorizontal size={18} />
                    </button>
                    {isDropdownOpen == item._id && (
                      <div
                        className="absolute top-4 z-50 bg-white right-0"
                        ref={dropdownRef}
                      >
                        <ActionDropdown
                          onViewDetails={() => setSelectedProjectId(item._id)}
                          onEditProject={() => {
                            setEditProject(item);
                            setIsProjectModalOpen(true);
                          }}
                          onAddTask={() =>
                            console.log("TODO: open Add Task modal")
                          }
                          onDeleteProject={() =>
                            console.log("Delete project", item._id)
                          }
                        />
                      </div>
                    )}
                    {/* Project Modal (New/Edit) */}
                    {isProjectModalOpen && (
                      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                        <div className="relative bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                          {/* Close Button inside modal */}
                          <button
                            onClick={() => {
                              setIsProjectModalOpen(false);
                              setEditProject(null);
                            }}
                            className="absolute -top-2  cursor-pointer -right-2 bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-300"
                          >
                            <X size={18} />
                          </button>

                          <AddProjectModal
                            initialProject={editProject || undefined}
                            onClose={() => {
                              setIsProjectModalOpen(false);
                              setEditProject(null);
                            }}
                            onProjectAdded={(newProject) => {
                              if (editProject) {
                                setProjects((prev) =>
                                  prev.map((p) =>
                                    p._id === newProject._id ? newProject : p
                                  )
                                );
                              } else {
                                setProjects((prev) => [newProject, ...prev]);
                              }
                              setIsProjectModalOpen(false);
                              setEditProject(null);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Info */}
              <section className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>
                  <p className="text-gray-500">Incharge</p>
                  <p className="font-medium">{item.inChargeName}</p>
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
                  <p className="font-medium">
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
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
                <button
                  className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedProjectId(item._id)}
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    setEditProject(item);
                    setIsEditInfoOpen(true);
                  }}
                  className="flex-1 border relative border-violet-200 text-violet-600 rounded-lg py-2 text-sm hover:bg-violet-50 cursor-pointer"
                >
                  Edit Info
                </button>

                {isEditInfoOpen && (
                  <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                    <div className="relative bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                      {/* Close Button inside modal */}
                      <button
                        onClick={() => {
                          setIsEditInfoOpen(false);
                          setEditProject(item);
                        }}
                        className="absolute -top-2  cursor-pointer -right-2 bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-300"
                      >
                        <X size={18} />
                      </button>

                      <AddProjectModal
                        initialProject={editProject || undefined}
                        onClose={() => {
                          setIsEditInfoOpen(false);
                          setEditProject(null);
                        }}
                        onProjectAdded={(newProject) => {
                          if (editProject) {
                            setProjects((prev) =>
                              prev.map((p) =>
                                p._id === newProject._id ? newProject : p
                              )
                            );
                          } else {
                            setProjects((prev) => [newProject, ...prev]);
                          }
                          setIsEditInfoOpen(false);
                          setEditProject(null);
                        }}
                      />
                    </div>
                  </div>
                )}
              </footer>
            </div>
          ))
        )}
      </main>

      {/* Render ProjectDetails once */}
      {selectedProjectId && (
        <ProjectDetails
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

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
