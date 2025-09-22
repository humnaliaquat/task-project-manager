type Task = {
  name: string;
  start: string;
  due: string;
  status: "Low" | "Medium" | "High";
};

export default function TasksCreatedToday() {
  const tasks: Task[] = [
    { name: "Complete task", start: "12 May", due: "20 May", status: "Low" },
    { name: "Fix UI bugs", start: "14 May", due: "22 May", status: "Medium" },
    { name: "Write docs", start: "15 May", due: "23 May", status: "High" },
    { name: "Deploy app", start: "16 May", due: "25 May", status: "Low" },
  ];

  const statusColors: Record<Task["status"], string> = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex flex-col justify-between p-4 border border-gray-200 rounded-2xl min-h-[261px] w-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-xl font-medium text-slate-800">Recent Tasks</p>
        <button className="px-3 py-1 text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-700 cursor-pointer">
          + Add Task
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-300">
              <th className="py-2">Task Name</th>
              <th className="py-2">Start Date</th>
              <th className="py-2">Due Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={index}
                className="text-sm text-gray-700 odd:bg-white even:bg-violet-100 hover:bg-violet-200 "
              >
                <td className="py-2">{task.name}</td>
                <td>{task.start}</td>
                <td>{task.due}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-3">
        <button className="text-sm text-violet-600 hover:underline cursor-pointer">
          See all tasks →
        </button>
      </div>
    </div>
  );
}
