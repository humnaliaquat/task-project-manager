import { useEffect, useState, useRef } from "react";
import ProjectDetails from "../projects/ProjectDetails";
import { handleError } from "../../utils/utils";
import { MoreHorizontal, X } from "lucide-react";
import axios from "axios";
import ActionDropdown from "../projects/dropdown/ActionDropdown";
import AddProjectModal from "../projects/AddProjectModal";

type Project = {
  _id: string;
  title: string;
  status?: string;
  dueDate?: string;
  inChargeName?: string;
  isTrashed?: boolean;
};

export default function ListModeProjects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [isSmScreenDropdownOpen, setIsSmScreenDropdownOpen] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const projectsPerPage = 10;
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const smDropdownRef = useRef<HTMLDivElement | null>(null);
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);
  const toggleDropdown = (id: string) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };
  const toggleSmDropdown = (id: string) => {
    setIsSmScreenDropdownOpen(isSmScreenDropdownOpen === id ? null : id);
  };
  const totalPages = Math.ceil(projects.length / projectsPerPage) || 1;
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [selectedSmProjectId, setSelectedSmProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
        const res = await axios.get("http://localhost:3000/projects", {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        setProjects(res.data.filter((p: Project) => !p.isTrashed));
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
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        smDropdownRef.current &&
        !smDropdownRef.current.contains(e.target as Node)
      ) {
        setIsSmScreenDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onDeleteProject = async (projectId: string) => {
    try {
      const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
      await axios.delete(`http://localhost:3000/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${authUser.token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Error moving to trash:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading projects...</p>;
  }

  return (
    <div className="w-full">
      {projects.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium">No projects yet</p>
          <p className="text-sm mt-2">
            Start by adding a new project to see it here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Due Date</th>
                  <th className="px-4 py-2">In Charge</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project, idx) => (
                  <tr
                    key={project._id}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 1 ? "bg-violet-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-left">
                      <button
                        onClick={() => setSelectedProjectId(project._id)}
                        className="hover:underline cursor-pointer text-violet-600"
                      >
                        {project.title}
                      </button>
                      <ProjectDetails
                        projectId={selectedProjectId}
                        onClose={() => setSelectedProjectId(null)}
                      />
                    </td>
                    <td className="px-4 py-2">{project.status || "N/A"}</td>
                    <td className="px-4 py-2">
                      {project.dueDate
                        ? new Date(project.dueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {project.inChargeName || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-left">
                      <div className="relative">
                        <button className="cursor-pointer flex items-center justify-center">
                          <MoreHorizontal
                            size={18}
                            className="text-gray-600 hover:text-gray-700"
                            onClick={() => toggleDropdown(project._id)}
                          />
                        </button>
                        {isDropdownOpen == project._id && (
                          <div
                            className="absolute top-4 z-50 bg-white right-16"
                            ref={dropdownRef}
                          >
                            <ActionDropdown
                              onViewDetails={() =>
                                setSelectedProjectId(project._id)
                              }
                              onEditProject={() => {
                                setEditProject(project);
                                setIsProjectModalOpen(true);
                              }}
                              onAddTask={() =>
                                console.log("TODO: open Add Task modal")
                              }
                              onDeleteProject={() =>
                                onDeleteProject(project._id)
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
                                        p._id === newProject._id
                                          ? newProject
                                          : p
                                      )
                                    );
                                  } else {
                                    setProjects((prev) => [
                                      newProject,
                                      ...prev,
                                    ]);
                                  }
                                  setIsProjectModalOpen(false);
                                  setEditProject(null);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile 2-Column Layout */}
          <div className="md:hidden  mt-4">
            {currentProjects.map((project) => (
              <div
                key={project._id}
                className="grid grid-cols-2 gap-4 border border-b-0 border-gray-200 p-4 bg-white shadow-sm"
              >
                {/* Left col - Project Name */}
                <div className="flex items-center border-r border-gray-200">
                  <button
                    onClick={() => setSelectedProjectId(project._id)}
                    className="font-medium text-violet-600 cursor-pointer hover:underline"
                  >
                    {project.title}
                  </button>
                </div>
                <ProjectDetails
                  projectId={selectedSmProjectId}
                  onClose={() => setSelectedSmProjectId(null)}
                />

                {/* Right col - Other info */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Status: </span>
                    {project.status || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Due: </span>
                    {project.dueDate
                      ? new Date(project.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">In Charge: </span>
                    {project.inChargeName || "N/A"}
                  </p>
                  <div className="relative">
                    <button onClick={() => toggleSmDropdown(project._id)}>
                      <MoreHorizontal
                        size={18}
                        className="text-gray-600 cursor-pointer mt-1"
                      />
                    </button>
                    {isSmScreenDropdownOpen == project._id && (
                      <div
                        className="absolute top-6 z-50 bg-white left-0"
                        ref={smDropdownRef}
                      >
                        <ActionDropdown
                          onViewDetails={() =>
                            setSelectedSmProjectId(project._id)
                          }
                          onEditProject={() => {
                            setEditProject(project);
                            setIsOpen(true);
                          }}
                          onAddTask={() =>
                            console.log("TODO: open Add Task modal")
                          }
                          onDeleteProject={() =>
                            console.log("Delete project", project._id)
                          }
                        />
                      </div>
                    )}
                    {/* Project Modal (New/Edit) */}
                    {isOpen && (
                      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                        <div className="relative bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                          {/* Close Button inside modal */}
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              setEditProject(null);
                            }}
                            className="absolute -top-2  cursor-pointer -right-2 bg-violet-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-300"
                          >
                            <X size={18} />
                          </button>

                          <AddProjectModal
                            initialProject={editProject || undefined}
                            onClose={() => {
                              setIsOpen(false);
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
                              setIsOpen(false);
                              setEditProject(null);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
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

        {projects.length > 0 && (
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer ${
                  num === currentPage
                    ? "bg-violet-500 text-white border-violet-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}

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
