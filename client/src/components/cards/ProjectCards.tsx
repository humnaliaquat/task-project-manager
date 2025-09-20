import React, { useState } from "react";
import {
  Search,
  List,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CardsModeProjects from "./CardsModeProjects";

export default function ProjectCards() {
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const [viewMode, setViewMode] = useState<"cards" | "list">(
    (params.get("view") as "cards" | "list") || "cards"
  );

  const handleViewChange = (mode: "cards" | "list") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", mode);
      window.history.pushState({}, "", url);
    }
  };

  return (
    <div className="p-4 rounded-2xl flex flex-col w-full bg-white border border-gray-200">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search project..."
            className="border border-gray-300 pl-10 pr-3 py-2 rounded-xl w-full focus:ring-2 focus:ring-violet-400 outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("list")}
              className={`flex items-center gap-2 px-4 py-2  cursor-pointer border rounded-xl text-sm ${
                viewMode === "list"
                  ? "bg-violet-100 border-violet-400 text-violet-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>

            <button
              onClick={() => handleViewChange("cards")}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm cursor-pointer ${
                viewMode === "cards"
                  ? "bg-violet-100 border-violet-400 text-violet-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Cards
            </button>
          </div>

          {/* Add Project Button */}
          <button className="bg-violet-500 hover:bg-violet-600 px-5 py-2 rounded-full text-white text-sm shadow cursor-pointer">
            + Add Project
          </button>
        </div>
      </header>

      {/* Project Cards / List Mode */}
      {viewMode === "cards" ? (
        <CardsModeProjects />
      ) : (
        <div>{/* List View Component (to be added later) */}</div>
      )}

      {/* Pagination Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center mt-6 px-2 text-sm text-slate-600">
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`px-3 py-1.5 rounded-lg border cursor-pointer ${
                num === 1
                  ? "bg-violet-500 text-white border-violet-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer">
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Info */}
        <p className="mt-3 sm:mt-0 text-gray-500">Showing 3 of 20 projects</p>
      </footer>
    </div>
  );
}
