import React, { useEffect, useState } from "react";
import { Search, List, LayoutGrid, Plus, X } from "lucide-react";
import BoardView from "./BoardView";
import ListView from "./ListView";
import AddNewTask from "./AddNewTask";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  status: "to do" | "in progress" | "completed";
};
export default function ViewsCombined() {
  const [isOpen, setIsOpen] = useState(false);
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const [viewMode, setViewMode] = useState<"board" | "list">(
    (params.get("view") as "board" | "list") || "board"
  );
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleViewChange = (mode: "board" | "list") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", mode);
      window.history.pushState({}, "", url);
    }
  };
  const mapStatus = (status: string): Task["status"] => {
    switch (status.toLowerCase()) {
      case "to do":
      case "to do":
        return "to do";
      case "in progress":
      case "in progress":
        return "in progress";
      case "completed":
        return "completed";
      default:
        return "to do"; // fallback
    }
  };
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log("🔑 Sending token:", authUser.token);

      const res = await axios.get(
        `http://localhost:3000/tasks?userId=${authUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      console.log("Tasks fetched:", res.data);
      const normalized = res.data.map((task: any) => ({
        ...task,
        status: mapStatus(task.status),
      }));
      setTasks(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4  rounded-2xl flex flex-col w-full bg-white border border-gray-200 ">
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
            onClick={() => setIsOpen(true)}
            className="bg-violet-500 hover:bg-violet-600 px-4 sm:px-5 py-2 flex items-center justify-center gap-1 rounded-full text-white text-sm shadow cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto ">
              <div className="bg-white  rounded-xl  w-[90%] max-w-md p-6 relative ">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-2 -right-2 bg-violet-200 shadow-2xl rounded-full w-8.5 h-8.5 flex items-center justify-center text-violet-900 hover:bg-violet-300 cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Your Form */}
                <AddNewTask
                  onClose={() => setIsOpen(false)}
                  onTaskAdded={(newTask) => {
                    setTasks((prev) => [...prev, newTask]);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="overflow-x-auto">
        {viewMode === "board" ? (
          <BoardView tasks={tasks} loading={loading} setTasks={setTasks} />
        ) : (
          <ListView tasks={tasks} loading={loading} />
        )}
      </main>
    </div>
  );
}
