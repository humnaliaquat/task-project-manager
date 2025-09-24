import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
type Props = { onClose?: () => void };
export default function AddNewTask({ onClose }: Props) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) {
      alert("Please select a status.");
      return;
    }
    if (!selected) {
      alert("Please select a due date.");
      return;
    }

    console.log({ status, selected });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-2 rounded-xl"
    >
      {/* Title */}
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          required
          type="text"
          name="title"
          id="title"
          placeholder="Enter task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-violet-500"
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
