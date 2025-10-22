import React, { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export default function Notepad() {
  const [note, setNote] = useState("");
  const [format, setFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left" as "left" | "center" | "right",
  });

  //  Load saved note on mount
  useEffect(() => {
    const savedNote = localStorage.getItem("notepad");
    if (savedNote) setNote(savedNote);
  }, []);

  // Save note whenever it changes
  useEffect(() => {
    localStorage.setItem("notepad", note);
  }, [note]);

  // Compute text style
  const textStyle = {
    fontWeight: format.bold ? "bold" : "normal",
    fontStyle: format.italic ? "italic" : "normal",
    textDecoration: format.underline ? "underline" : "none",
    textAlign: format.align,
  } as React.CSSProperties;

  const AlignIcon =
    format.align === "left"
      ? AlignLeft
      : format.align === "center"
      ? AlignCenter
      : AlignRight;

  return (
    <div className="flex flex-col border border-[var(--border)]  bg-[var(--cards-bg)]  rounded-xl">
      {/* Header */}
      <header className="border-b border-[var(--border)] px-4 py-3">
        <p className="text-lg font-medium ">Private Notepad</p>
      </header>

      {/* Main Text Area */}
      <main>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes here..."
          className="w-full h-35 resize-none rounded-lg p-4 focus:outline-none bg-transparent "
          style={textStyle}
        />
      </main>

      {/* Footer Toolbar */}
      <footer className="flex gap-3 items-center px-4 py-3 border-t border-[var(--border)] ">
        <button
          onClick={() => setFormat((f) => ({ ...f, bold: !f.bold }))}
          className={`p-2 rounded-lg hover:bg-[var(--hover-bg)]  cursor-pointer ${
            format.bold ? "bg-[var(--inside-card-bg)] " : ""
          }`}
        >
          <Bold size={18} />
        </button>

        <button
          onClick={() => setFormat((f) => ({ ...f, italic: !f.italic }))}
          className={`p-2 rounded-lg hover:bg-[var(--hover-bg)] cursor-pointer  ${
            format.italic ? "bg-[var(--inside-card-bg)] " : ""
          }`}
        >
          <Italic size={18} />
        </button>

        <button
          onClick={() => setFormat((f) => ({ ...f, underline: !f.underline }))}
          className={`p-2 rounded-lg hover:bg-[var(--hover-bg)] cursor-pointer ${
            format.underline ? "bg-[var(--inside-card-bg)] " : ""
          }`}
        >
          <Underline size={18} />
        </button>

        <button
          onClick={() =>
            setFormat((f) => ({
              ...f,
              align:
                f.align === "left"
                  ? "center"
                  : f.align === "center"
                  ? "right"
                  : "left",
            }))
          }
          className="p-2 rounded-lg hover:bg-[var(--hover-bg)] cursor-pointer"
        >
          <AlignIcon size={18} />
        </button>
      </footer>
    </div>
  );
}
