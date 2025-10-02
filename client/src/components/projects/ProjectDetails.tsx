import { useEffect, useState } from "react";
import axios from "axios";
import { X, MoreHorizontal } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
};

type ProjectDrawerProps = {
  projectId: string | null;
  onClose: () => void;
};

export default function ProjectDetails({
  projectId,
  onClose,
}: ProjectDrawerProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"tasks" | "comments">("tasks");

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/projects/${projectId}`
        );
        setProject(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <>
      {/* Backdrop */}
      {projectId && (
        <div className="fixed inset-0 bg-black/10 z-50" onClick={onClose}></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl border-l border-gray-200 z-50
  transform transition-transform duration-300 ease-in-out
  ${projectId ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex justify-between border-b border-gray-200 p-4 pt-3 pb-3 ">
          <button>
            <X
              size={17}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={onClose}
            />
          </button>
          <button>
            <MoreHorizontal
              size={17}
              className="text-gray-500 hover:text-gray-600 cursor-pointer"
            />
          </button>
        </header>
        <main className="flex flex-col p-4 gap-4 ">
          <p className="text-left text-2xl font-medium text-black">
            {loading ? "Loading..." : project?.title || "Project Details"}
          </p>
          <div className="flex gap-6">
            <p className="font-medium text-gray-700">Due Date</p>
            <p>
              {project?.dueDate
                ? new Date(project.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          <div className="flex gap-10">
            <span className="font-medium text-gray-700">Status</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                project?.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : project?.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-violet-100 text-violet-700"
              }`}
            >
              {project?.status || "Unknown"}
            </span>
          </div>
          <div className="flex gap-10">
            <p className="font-medium text-gray-600">Priority</p>
            <p>{project?.priority || "N/A"}</p>
          </div>
        </main>
        <div className="flex flex-col p-4 pt-2 pb-2 gap-2">
          <p className="font-medium text-left text-xl">Description:</p>
          <p className="text-left text-gray-600">{project?.description}</p>
        </div>
        <div>
          {/* tabs */}
          <div className="flex gap-2 border-b border-gray-300 p-4 pb-0">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-4 py-2 font-medium cursor-pointer ${
                activeTab === "tasks"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-4 py-2 font-medium cursor-pointer ${
                activeTab === "comments"
                  ? "text-violet-600 border-b-2 border-violet-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Comments
            </button>
          </div>
          {/* Tab Content */}
          <div className="p-4 text-sm">
            {activeTab === "tasks" ? (
              <p className="text-gray-600">
                📋 Project tasks will appear here.
              </p>
            ) : (
              <p className="text-gray-600">💬 Comments will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
