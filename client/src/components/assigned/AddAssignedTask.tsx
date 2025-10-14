import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useActionData } from "react-router-dom";
type Props = {
  onClose?: () => void;
};
export default function AddAssignedTask({ onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  return (
    <form className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
      <div className="bg-white  rounded-xl  w-[90%] max-w-md p-6 relative ">
        <button
          className="absolute -top-2 -right-2 bg-violet-200 shadow-2xl rounded-full w-8.5 h-8.5 flex items-center justify-center text-violet-900 hover:bg-violet-300 cursor-pointer"
          onClick={onClose}
        >
          <X size={18} />
        </button>{" "}
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
                     focus:outline-none focus:ring-none"
        />
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
                     focus:outline-none focus:ring-none focus:ring-violet-500"
            rows={3}
          ></textarea>
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
            onClick={() => {
              setIsCalendarOpen((prev) => !prev);
            }}
            className={`w-full flex items-center justify-between px-3 py-2 border 
                       border-gray-300 rounded-lg bg-white 
                       ${selected ? "text-gray-700" : "text-gray-400"}
                        focus:ring-none focus:ring-violet-500`}
          >
            {selected ? formatDate(selected) : "Select a date"}

            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {isCalendarOpen && (
            <div
              className="absolute z-20 -top-32 bg-white border border-gray-200 
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
    </form>
  );
}
