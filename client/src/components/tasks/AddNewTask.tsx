import { useEffect, useState, type ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import axios from "axios";
import "react-day-picker/dist/style.css";
import { handleError } from "../../utils/utils";
type Task = {
  title: string;
  description: string;
  project: string;
  dueDate: number;
  priority: string;
  status: string;
};
type Props = {
  onClose?: () => void;
  onTaskAdded?: (task: any) => void;
};
type Project = {
  _id: string;
  title: string;
};
export default function AddNewTask({ onClose, onTaskAdded }: Props) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [priority, setPriority] = useState<string | null>(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);

  const [projectSelected, setProjectSelected] =
    useState<string>("Select Project");
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    dueDate: 12,
    status: "to do",
    priority: "low",
    project: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!status) {
      alert("Please select a status.");
      return;
    }
    if (!selected) {
      alert("Please select a due date.");
      return;
    }

    try {
      const payload = {
        title: task.title,
        description: task.description,
        status: status.toLowerCase(),
        dueDate: selected,
        project: task.project,
        priority: priority?.toLowerCase(),
        userId: "66f4f6a2e31a8e3a0cd8b1c7",
      };

      const res = await axios.post("http://localhost:3000/tasks", payload);

      console.log("✅ Task created:", res.data);
      if (onTaskAdded) onTaskAdded(res.data);

      // Reset form
      setTask({
        title: "",
        description: "",
        project: "",
        dueDate: 0,
        status: "to do",
        priority: "",
      });
      setSelected(null);
      setStatus(null);

      if (onClose) onClose();
    } catch (err: any) {
      handleError(err.message || "failed to create task");
      alert(err.response?.data?.error || "Something went wrong");
    }
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = await axios.get("http://localhost:3000/projects");
        setProjects(url.data);
      } catch (err: any) {
        handleError("Failed to fetch projects");
      }
    };
    fetchProjects();
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-2 rounded-xl"
    >
      {/* Title */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="project" className="text-sm font-medium text-gray-700">
          Project
        </label>

        <div className="relative">
          {/* Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center w-full border border-gray-200 p-2.5 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">
              {projectSelected}
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <li
                      key={project._id}
                      className="px-4 py-2 text-sm hover:bg-violet-50 cursor-pointer"
                      onClick={() => {
                        setProjectSelected(project.title); // show project name
                        setTask((prev) => ({
                          ...prev,
                          project: project._id, // save project ID
                        }));
                        setIsOpen(false);
                      }}
                    >
                      {project.title}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-400">
                    No projects found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          required
          type="text"
          name="title"
          onChange={handleChange}
          id="title"
          placeholder="Enter task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-none"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter task details..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none 
                     focus:outline-none focus:ring-2 focus:ring-violet-500"
          rows={3}
        ></textarea>
      </div>

      {/* Details */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Status Dropdown */}
        <div className="flex flex-col gap-1 w-full relative">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <button
            id="status"
            type="button"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 border 
                       border-gray-300 rounded-lg bg-white 
                       ${status ? "text-gray-700" : "text-gray-400"}
                       hover:border-violet-500 focus:ring-2 focus:ring-violet-500`}
          >
            {status || "Select status"}
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isStatusOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              {["To Do", "In Progress", "Completed"].map((s) => (
                <div
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setIsStatusOpen(false);
                  }}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-violet-50 cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Due Date Picker */}
        <div className="flex flex-col gap-1 w-full relative">
          <label
            htmlFor="dueDate"
            className="text-sm font-medium text-gray-700"
          >
            Due Date <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 border 
                       border-gray-300 rounded-lg bg-white 
                       ${selected ? "text-gray-700" : "text-gray-400"}
                       hover:border-violet-500 focus:ring-2 focus:ring-violet-500`}
          >
            {selected ? formatDate(selected) : "Select a date"}

            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isCalendarOpen && (
            <div
              className="absolute z-20 -top-15 bg-white border border-gray-200 
                            rounded-xl shadow-lg p-3 min-w-[280px] overflow-hidden"
            >
              <DayPicker
                mode="single"
                selected={selected || undefined}
                onSelect={(date) => {
                  setSelected(date || null);
                  setIsCalendarOpen(false);
                }}
                disabled={{ before: new Date() }}
                classNames={{
                  day_selected: "bg-[#8b5cf6] text-white rounded-full",
                  nav_button: "text-[#8b5cf6] hover:bg-[#f3e8ff] rounded p-1",
                  nav_button_next:
                    "text-[#8b5cf6] hover:bg-[#f3e8ff] rounded p-1",
                  nav_button_previous:
                    "text-[#8b5cf6] hover:bg-[#f3e8ff] rounded p-1",
                }}
                className="rdp-weekdays-none"
              />
            </div>
          )}
        </div>
      </div>
      {/* Priority Dropdown */}
      <div className="flex flex-col gap-1 w-full relative">
        <label htmlFor="priority" className="text-sm font-medium text-gray-700">
          Priority <span className="text-red-500">*</span>
        </label>
        <button
          id="priority"
          type="button"
          onClick={() => setIsPriorityOpen(!isPriorityOpen)}
          className={`w-full flex items-center justify-between px-3 py-2 border 
                border-gray-300 rounded-lg bg-white 
                ${priority ? "text-gray-700" : "text-gray-400"}
                hover:border-violet-500 focus:ring-2 focus:ring-violet-500`}
        >
          {priority || "Select priority"}
          <ChevronDown size={16} className="text-gray-500" />
        </button>
        {isPriorityOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            {["Low", "Medium", "High"].map((p) => (
              <div
                key={p}
                onClick={() => {
                  setPriority(p);
                  setIsPriorityOpen(false);
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-violet-50 cursor-pointer"
              >
                {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100 cursor-pointer"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm bg-violet-600 text-white hover:bg-violet-700 shadow cursor-pointer"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
