import React, { useState } from "react";
import { Bold, Italic, Underline, AlignLeft } from "lucide-react";

export default function Notepad() {
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl ">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <p className="text-xl font-medium text-slate-800 ">Private Notepad</p>
      </header>

      {/* Main Text Area */}
      <main className="">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-35 resize-none rounded-lg p-4   focus:outline-none focus:ring-none "
        />
      </main>

      {/* Footer Toolbar */}
      <footer className="flex gap-3 items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bold size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Italic size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Underline size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <AlignLeft size={18} />
        </button>
      </footer>
    </div>
  );
}
