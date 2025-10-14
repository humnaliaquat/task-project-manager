import React, { useEffect, useState } from "react";
import { Search, List, LayoutGrid, X, Plus } from "lucide-react";
import CardsModeProjects from "./CardsModeProjects";
import ListModeProjects from "./ListModeProjects";
import AddProjectModal from "../projects/AddProjectModal";
import axios from "axios";
import { handleError } from "../../utils/utils";

// --- START: Shared Types ---
type Project = {
  _id: string;
  title: string;
  status?: string;
  dueDate?: string;
  inChargeName?: string;
  isTrashed?: boolean;
  // Add these for CardsMode, if needed in the fetched data structure
  role?: string;
  completedTasks?: number;
  totalTasks?: number;
  progress?: number;
};

type ViewMode = "list" | "card";
// --- END: Shared Types ---

export default function ProjectCards() {
  const projectsPerPage = 10; // Shared pagination setting
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchTerm, setSearchTerm] = useState("");

  // --- START: Data and State moved from children ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  ); // For details modal

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
        const res = await axios.get("http://localhost:3000/projects", {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        // Filtering out trashed projects
        setProjects(res.data.filter((p: Project) => !p.isTrashed));
      } catch (error: any) {
        handleError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // --- Filtering (if needed for search) ---
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination Logic ---
  const dynamicProjectsPerPage = viewMode === "list" ? 10 : 6;
  const totalPages =
    Math.ceil(filteredProjects.length / dynamicProjectsPerPage) || 1;
  const indexOfLast = currentPage * dynamicProjectsPerPage;
  const indexOfFirst = indexOfLast - dynamicProjectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  // Reset page when switching views
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode]);

  // --- Handlers ---
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

  const handleProjectAdded = (newProject: Project) => {
    if (editProject) {
      // Edit logic
      setProjects((prev) =>
        prev.map((p) => (p._id === newProject._id ? newProject : p))
      );
    } else {
      // New project logic
      setProjects((prev) => [newProject, ...prev]);
    }
    setIsProjectModalOpen(false);
    setEditProject(null);
  };
  // --- END: Data and State moved from children ---

  if (loading) {
    return <p className="text-center mt-10">Loading projects...</p>;
  }

  // --- Props for child components ---
  const commonProps = {
    currentProjects,
    totalPages,
    currentPage,
    setCurrentPage,
    onDeleteProject,
    setSelectedProjectId,
    setEditProject,
    setIsProjectModalOpen,
    selectedProjectId,
    editProject,
    handleProjectAdded,
  };

  // --- Shared Modal Wrapper (CLEANUP) ---
  const ProjectModal = () =>
    isProjectModalOpen && (
      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="relative bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
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
            onProjectAdded={handleProjectAdded}
          />
        </div>
      </div>
    );

  return (
    <div className="p-4 border border-gray-200 rounded-2xl">
      <header className="flex justify-between items-center mb-6 ">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search project..."
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full focus:ring-1 focus:ring-violet-400 outline-none text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        <div className="flex items-center space-x-3">
          {/* Actions */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
            {/* Toggle View */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-xl cursor-pointer ${
                  viewMode === "list"
                    ? "bg-violet-100 border-violet-400 text-violet-600"
                    : "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>

              <button
                onClick={() => setViewMode("card")}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-xl cursor-pointer ${
                  viewMode === "card"
                    ? "bg-violet-100 border-violet-400 text-violet-600"
                    : "border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Board</span>
              </button>
            </div>

            {/* Add Project */}

            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-violet-500 hover:bg-violet-600 px-4 sm:px-5 py-2 flex items-center justify-center gap-1 rounded-full text-white text-sm shadow cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Project</span>
            </button>
          </div>
        </div>
      </header>

      {viewMode === "list" ? (
        <ListModeProjects {...commonProps} />
      ) : (
        <CardsModeProjects {...commonProps} />
      )}

      {/* Render the shared modal and ProjectDetails here to manage global state */}
      <ProjectModal />
    </div>
  );
}
