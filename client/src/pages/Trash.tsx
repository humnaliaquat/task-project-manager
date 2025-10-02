import { useState, useEffect, useRef } from "react";
import { RotateCcw, XCircle, Trash2 } from "lucide-react";
import DashboardHeader from "../components/layout/DashboardHeader";

type TrashTask = {
  id: number;
  name: string;
  deletedOn: string;
  originalStatus: "To Do" | "In Progress" | "Completed";
};

type TrashProject = {
  id: number;
  name: string;
  deletedOn: string;
  originalStatus: "Active" | "Completed" | "On Hold";
};

export default function Trash() {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects">("tasks");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const trashTasks: TrashTask[] = [
    {
      id: 1,
      name: "Fix navbar bug",
      deletedOn: "21 Sept",
      originalStatus: "To Do",
    },
    {
      id: 2,
      name: "Write docs",
      deletedOn: "19 Sept",
      originalStatus: "Completed",
    },
  ];

  const trashProjects: TrashProject[] = [
    {
      id: 1,
      name: "E-commerce App",
      deletedOn: "18 Sept",
      originalStatus: "Active",
    },
    {
      id: 2,
      name: "Portfolio Site",
      deletedOn: "10 Sept",
      originalStatus: "Completed",
    },
  ];

  const currentData = activeTab === "tasks" ? trashTasks : trashProjects;
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedItems.length > 0 && selectedItems.length < currentData.length;
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems, currentData.length]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedItems(currentData.map((item) => item.id));
    else setSelectedItems([]);
  };

  const handleSelectOne = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="Trash"
        subtitle="View, restore, or permanently delete items."
      />

      {/* Tabs */}
      <div className="flex justify-between items-center border-b border-gray-200 px-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-2 font-medium cursor-pointer ${
              activeTab === "tasks"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-2 font-medium cursor-pointer ${
              activeTab === "projects"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Projects
          </button>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1 cursor-pointer">
            <Trash2 size={16} /> Empty Trash
          </button>
          <button className="px-3 py-1.5 text-sm bg-violet-600 text-white hover:bg-violet-700 rounded-lg cursor-pointer">
            Restore All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm m-4">
        {currentData.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Trash2 size={40} className="mx-auto mb-3 text-gray-400" />
            No {activeTab} in Trash
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="p-3 text-left w-12">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="accent-violet-600 cursor-pointer"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedItems.length === currentData.length &&
                      currentData.length > 0
                    }
                  />
                </th>
                <th className="p-3 text-left">
                  {activeTab === "tasks" ? "Task Name" : "Project Name"}
                </th>
                <th className="p-3 text-left">Deleted On</th>
                <th className="p-3 text-left">Original Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, i) => (
                <tr
                  key={item.id}
                  className={`hover:bg-violet-50 transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="accent-violet-600 cursor-pointer"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                  </td>
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3 text-gray-500">{item.deletedOn}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.originalStatus === "Completed" ||
                        item.originalStatus === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.originalStatus === "In Progress" ||
                            item.originalStatus === "On Hold"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.originalStatus}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      title="Restore"
                      className="p-1.5 rounded-md hover:bg-green-50 text-green-600"
                    >
                      <RotateCcw size={18} />
                    </button>
                    <button
                      title="Delete Permanently"
                      className="p-1.5 rounded-md hover:bg-red-50 text-red-600"
                    >
                      <XCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Selected action bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border shadow-md px-6 py-3 rounded-xl flex gap-4 items-center">
          <p className="text-sm text-gray-600">
            {selectedItems.length} selected
          </p>
          <button className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
            Restore Selected
          </button>
          <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
