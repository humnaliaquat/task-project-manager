import React, { useEffect, useRef } from "react";

type DropdownProps = {
  items: { label: string; onClick?: () => void }[];
};

export default function Dropdown({ items }: DropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-44 z-40 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-2">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="block w-full text-left px-2 py-2 cursor-pointer text-sm text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-900/40 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
