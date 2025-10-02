import React, { useEffect, useState } from "react";
import { Search, List, LayoutGrid, X } from "lucide-react";
import CardsModeProjects from "./CardsModeProjects";
import ListModeProjects from "./ListModeProjects";
import AddProjectModal from "../projects/AddProjectModal";
import axios from "axios";
import { handleError } from "../../utils/utils";

export default function ProjectCards() {
  const [isOpen, setIsOpen] = useState(false);
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const [viewMode, setViewMode] = useState<"board" | "list">(
    (params.get("view") as "board" | "list") || "board"
  );

  const handleViewChange = (mode: "board" | "list") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", mode);
      window.history.pushState({}, "", url);
    }
  };
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/projects");
      setProjects(res.data);
    } catch (error: any) {
      handleError(error.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="p-4 mt-2 rounded-2xl flex flex-col w-full bg-white border border-gray-200 ">
      {/* Header with search + buttons */}
      <header className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search project..."
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full focus:ring-2 focus:ring-violet-400 outline-none text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
          {/* Toggle View */}
          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("list")}
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
              onClick={() => handleViewChange("board")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-xl cursor-pointer ${
                viewMode === "board"
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
            onClick={() => setIsOpen(!isOpen)}
            className="bg-violet-500 hover:bg-violet-600 px-4 sm:px-5 py-2 rounded-full text-white text-sm shadow cursor-pointer relative"
          >
            + Add Project
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto p-5 pt-14">
              <div className="bg-white  rounded-xl  w-[90%] max-w-md p-6 relative ">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-2 -right-2 bg-violet-200 shadow-2xl rounded-full w-8 h-8 flex items-center justify-center text-violet-900 hover:bg-violet-300 cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Your Form */}
                <AddProjectModal
                  onClose={() => setIsOpen(false)}
                  onProjectAdded={fetchProjects}
                  initialProject={{}}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="overflow-x-auto ">
        {viewMode === "board" ? <CardsModeProjects /> : <ListModeProjects />}
      </div>
    </div>
  );
}
