import { useState } from "react";
import { ChevronDown, ArrowUpRight, MoreHorizontal } from "lucide-react";

type Task = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
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
                <th className="p-2 text-center">Description</th>
                <th className="p-2 text-center">Due Date</th>
                <th className="p-2 text-center">Priority</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr
                  key={task.id}
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
                  <td className="p-2">{task.name}</td>
                  <td className="p-2 text-gray-500">{task.description}</td>
                  <td className="p-2">{task.dueDate}</td>
                  <td
                    className={`p-2 font-medium ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
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

export default function ListView() {
  const tasks: Task[] = [
    {
      id: 1,
      name: "Task 1",
      description: "Lorem ipsum dolor...",
      dueDate: "12 June",
      priority: "High",
    },
    {
      id: 2,
      name: "Task 2",
      description: "Consectetur adipiscing...",
      dueDate: "15 June",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Task 3",
      description: "Sed do eiusmod...",
      dueDate: "20 June",
      priority: "Low",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <TaskColumn title="To Do" tasks={tasks} />
      <TaskColumn title="In Progress" tasks={tasks} />
      <TaskColumn title="Completed" tasks={tasks} />
    </div>
  );
}
