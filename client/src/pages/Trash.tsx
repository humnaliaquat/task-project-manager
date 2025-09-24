import { useState, useEffect, useRef } from "react";
import { RotateCcw, XCircle } from "lucide-react";

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

  // ✅ Ref for top checkbox
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      const isIndeterminate =
        selectedItems.length > 0 && selectedItems.length < currentData.length;
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [selectedItems, currentData.length]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(currentData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 pt-2 pb-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ">
        <div>
          <p className="text-2xl font-medium flex items-center gap-2">Trash</p>
          <p className="text-sm text-gray-500">
            View, restore, or delete items permanently.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
            Empty Trash
          </button>
          <button className="px-3 py-1.5 text-sm bg-violet-600 text-white hover:bg-violet-700 rounded-lg cursor-pointer">
            Restore All
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-300">
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
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "projects"
              ? "text-violet-600 border-b-2 border-violet-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Projects
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="p-3 text-left">
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
            {currentData.map((item, i, arr) => (
              <tr
                key={item.id}
                className={`${i % 2 === 0 ? "bg-white" : "bg-violet-50"} ${
                  i === arr.length - 1 ? "" : "border-b border-gray-300"
                }`}
              >
                <td className="p-3 text-left">
                  <input
                    type="checkbox"
                    className="accent-violet-600 cursor-pointer"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectOne(item.id)}
                  />
                </td>
                <td className="p-3 font-medium text-left">{item.name}</td>
                <td className="p-3 text-gray-500 text-left">
                  {item.deletedOn}
                </td>
                <td className="p-3 text-left">{item.originalStatus}</td>
                <td className="p-3 flex justify-start gap-2 text-left">
                  <button className="text-green-600 hover:text-green-800 cursor-pointer">
                    <RotateCcw size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer">
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
