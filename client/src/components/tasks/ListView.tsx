import { useState } from "react";
import { ChevronDown, ArrowUpRight, MoreHorizontal } from "lucide-react";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority?: "high" | "medium" | "low";
  status: "todo" | "inprogress" | "completed";
};

type ListViewProps = {
  tasks: Task[];
  loading: boolean;
};

type ColumnProps = {
  title: "To Do" | "In Progress" | "Completed";
  tasks: Task[];
};

function TaskColumn({ title, tasks }: ColumnProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Dot color based on column title
  const dotColor =
    title === "To Do"
      ? "bg-violet-500"
      : title === "In Progress"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="w-full flex flex-col gap-3 p-4 border border-gray-200 rounded-2xl ">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* Status Dot */}
          <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
          <button className="font-semibold">{title}</button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer transition-transform"
          >
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        </div>
        <button className="flex gap-1 items-center text-sm text-violet-600 hover:underline cursor-pointer">
          View All <ArrowUpRight size={14} />
        </button>
      </header>

      {/* Table (expand/collapse) */}
      {isOpen && (
        <main className="overflow-x-auto animate-fadeIn">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 text-center">
                  <input
                    type="checkbox"
                    className="accent-violet-600 cursor-pointer"
                  />
                </th>
                <th className="p-2 text-center">Task Name</th>
                <th className="p-2 text-center">Due Date</th>
                <th className="p-2 text-center">Priority</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr
                  key={task._id}
                  className={`text-center ${
                    i % 2 === 0 ? "bg-white" : "bg-violet-50"
                  } ${
                    i === tasks.length - 1 ? "" : "border-b border-gray-200"
                  }`}
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      className="accent-violet-600 cursor-pointer"
                    />
                  </td>
                  <td className="p-2">{task.title}</td>

                  <td className="p-2">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "No due date"}
                  </td>
                  <td
                    className={`p-2 font-medium ${
                      task.priority === "high"
                        ? "text-red-600"
                        : task.priority === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority
                      ? task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)
                      : "N/A"}
                  </td>

                  <td className="p-2">
                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </div>
  );
}

export default function ListView({ tasks, loading }: ListViewProps) {
  if (loading) return <p className="text-center">Loading tasks...</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <TaskColumn
          title="To Do"
          tasks={tasks.filter((t) => t.status === "todo")}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((t) => t.status === "inprogress")}
        />
        <TaskColumn
          title="Completed"
          tasks={tasks.filter((t) => t.status === "completed")}
        />
      </div>
    </div>
  );
}
