import { useTheme } from "../../context/ThemeContext";

export default function Appearance() {
  const { theme, setTheme } = useTheme();
  const colors = [
    { name: "Violet", color: "bg-violet-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Green", color: "bg-green-500" },
  ];

  return (
    <div
      className="m-4 border border-[var(--border)] rounded-2xl p-6  space-y-8"
      style={{ backgroundColor: "var(--cards-bg)" }}
    >
      {/* Title */}
      <div className="">
        <p className="text-xl font-semibold ">Appearance</p>
        <p className="text-sm text-[var(--light-text)]">
          Customize how your dashboard looks and feels.
        </p>
      </div>

      {/* Accent Color Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:gap-16 lg:justify-start ">
        <div>
          <p className="text-lg font-medium text-[var(--text-primary)] ">
            Accent Color
          </p>
          <p className="text-sm text-[var(--light-text)]">
            Choose your favorite color for highlights and buttons.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              className="flex items-center gap-2 border border-[var(--border)] rounded-lg px-3 py-1.5 hover:bg-[var(--hover-bg)] transition cursor-pointer"
            >
              <span className={`w-4 h-4 rounded-full ${c.color}`}></span>
              <span className="text-sm ">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Preference */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:gap-16 lg:justify-start">
        <div>
          <p className="text-lg font-medium text-[var(--text-primary)]">
            Theme Preference
          </p>
          <p className="text-sm text-[var(--light-text)]">
            Choose between light and dark mode for your dashboard.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center border-2 cursor-pointer border-[var(--border)] rounded-xl p-4 w-32 hover:border-violet-500 transition">
            <button
              onClick={() => setTheme("light")}
              className={`w-full h-16 bg-gray-500 rounded-md mb-2 ${
                theme === "light" ? "ring-2 ring-[var(--violet-text)]" : ""
              }`}
            ></button>
            <span className="text-sm ">Light</span>
          </div>
          <div className="flex cursor-pointer flex-col items-center border-2 border-[var(--border)] rounded-xl p-4 w-32 bg-[var(--cards-bg)] hover:border-violet-500 transition">
            <button
              onClick={() => setTheme("dark")}
              className={`w-full h-16 bg-gray-500 rounded-md mb-2 ${
                theme === "dark" ? "ring-2 ring-[var(--violet-text)]" : ""
              }`}
            ></button>
            <span className="text-sm ">Dark</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2 flex justify-end gap-3">
        <button className="w-full sm:w-auto border border-[var(--border)] hover:bg-[var(--hover-bg)]  cursor-pointer px-6 py-2.5 rounded-lg font-medium transition">
          Cancel
        </button>
        <button className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white px-6 py-2 rounded-lg cursor-pointer font-medium transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
