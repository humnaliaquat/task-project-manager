import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

type DropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right"; // default is right
  className?: string;
  children: ReactNode;
};

export default function NotificationsDropdown({
  isOpen,
  onClose,
  position = "right",
  className = "",
  children,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full mt-2 z-50 w-80 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden
        ${position === "right" ? "right-0" : "left-0"} ${className}`}
    >
      {children}
    </div>
  );
}
