import React from "react";

export default function AddAssignedTask() {
  return (
    <form>
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
    </form>
  );
}
