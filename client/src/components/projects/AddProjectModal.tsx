import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { handleError } from "../../utils/utils";
import axios from "axios";
type Project = {
  _id: string;
  title: string;
  description: string;
  inChargeName: string;
  role: string;
  priority: string;
  status: string;
  dueDate: string;
};
type Props = {
  onClose?: () => void;
  onProjectAdded?: (project: Project) => void;
  initialProject?: Partial<Project>;
};

export default function AddProjectModal({
  onClose,
  onProjectAdded,
  initialProject = {},
}: Props) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [priority, setPriority] = useState<string | null>(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);
  const [project, setProject] = useState<Project>({
    _id: initialProject._id || "",
    title: initialProject.title || "",
    description: initialProject.description || "",
    dueDate: initialProject.dueDate || "",
    status: initialProject.status || "To Do",
    inChargeName: initialProject.inChargeName || "",
    role: initialProject.role || "",
    priority: initialProject.priority || "Low",
  });
  useEffect(() => {
    if (initialProject) {
      if (initialProject.status) setStatus(initialProject.status);
      if (initialProject.priority) setPriority(initialProject.priority);
      if (initialProject.dueDate) setSelected(new Date(initialProject.dueDate));
    }
  }, [initialProject]);

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) return handleError("Please select a status.");
    if (!selected) return handleError("Please select a due date.");
    if (!priority) return handleError("Please select priority.");
    try {
      const payload = {
        title: project.title,
        description: project.description,
        dueDate: selected ? selected.toISOString() : null,
        role: project.role,
        status: status || project.status,
        inChargeName: project.inChargeName,
        priority: priority || project.priority,
        userId: "66f4f6a2e31a8e3a0cd8b1c7",
      };

      let res;
      if (project._id) {
        // Update
        res = await axios.put(
          `http://localhost:3000/projects/${project._id}`,
          payload
        );
      } else {
        // Create
        res = await axios.post("http://localhost:3000/projects", payload);
      }

      onProjectAdded?.(res.data);

      if (!project._id) {
        setProject({
          _id: "",
          title: "",
          description: "",
          dueDate: "",
          status: "To Do",
          inChargeName: "",
          role: "",
          priority: "Low",
        });
        setStatus(null);
        setPriority(null);
        setSelected(null);
      }
      console.log(res.data);
    } catch (error: any) {
      handleError(error.message || "Failed to create project");
    }
    console.log({ status, selected });

    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md  rounded-xl bg-white"
    >
      {/* Title */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Project Title
        </label>
        <input
          required
          type="text"
          id="title"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          placeholder="Enter project title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-none focus:ring-violet-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700"
        >
          Project Description
        </label>
        <textarea
          id="description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="Enter project details..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-none focus:ring-violet-500"
          rows={3}
        />
      </div>

      {/* Incharge Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="incharge"
            className="text-sm font-medium text-gray-700"
          >
            Incharge Name
          </label>
          <input
            required
            type="text"
            id="incharge"
            value={project.inChargeName}
            onChange={(e) =>
              setProject({ ...project, inChargeName: e.target.value })
            }
            placeholder="Enter incharge name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-none focus:ring-violet-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Incharge Role
          </label>
          <input
            required
            type="text"
            id="role"
            value={project.role}
            onChange={(e) => setProject({ ...project, role: e.target.value })}
            placeholder="Enter incharge role"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-none focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Status & Due Date */}
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
            className={`w-full flex items-center justify-between px-3 py-2 border cursor-pointer border-gray-300 rounded-lg bg-white ${
              status ? "text-gray-700" : "text-gray-400"
            }  focus:ring-none focus:ring-violet-500`}
            aria-label="Select status"
          >
            {status || "Select status"}
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isStatusOpen && (
            <div className="absolute z-20 top-16 right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
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
            className={`w-full flex items-center justify-between  cursor-pointer px-3 py-2 border border-gray-300 rounded-lg bg-white ${
              selected ? "text-gray-700" : "text-gray-400"
            }  focus:ring-none focus:ring-violet-500`}
            aria-label="Select due date"
          >
            {selected ? formatDate(selected) : "Select a date"}
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isCalendarOpen && (
            <div className="absolute z-30 -top-34  bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[280px]">
              <DayPicker
                mode="single"
                selected={selected || undefined}
                onSelect={(date) => {
                  setSelected(date || null);
                  setIsCalendarOpen(false);
                }}
                disabled={{ before: new Date() }}
                classNames={{
                  day_selected: "bg-violet-600 text-white rounded-full",
                  nav_button: "text-violet-600 hover:bg-violet-100 rounded p-1",
                  nav_button_next:
                    "text-violet-600 hover:bg-violet-100 rounded p-1",
                  nav_button_previous:
                    "text-violet-600 hover:bg-violet-100 rounded p-1",
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
          className={`w-full flex items-center cursor-pointer justify-between px-3 py-2 border 
                border-gray-300 rounded-lg bg-white 
                ${priority ? "text-gray-700" : "text-gray-400"}
                 focus:ring-none focus:ring-violet-500`}
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
                className="px-3 py-2 text-sm text-gray-700  cursor-pointer"
              >
                {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
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
          {project._id ? "Update Project" : "Add Project"}
        </button>
      </div>
    </form>
  );
}
