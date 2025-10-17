import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type ThemeContextValue = {
  theme: Theme;
  setTheme: (v: Theme) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemPrefersDark(): boolean {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function applyClass(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme-pref") as Theme | null;
    return saved ?? "system";
  });

  // Keep class in sync with theme
  useEffect(() => {
    const isDark =
      theme === "dark" || (theme === "system" && getSystemPrefersDark());
    console.log("[Theme] Applied theme:", theme, "Dark mode active:", isDark);
    applyClass(isDark);
    localStorage.setItem("theme-pref", theme);
  }, [theme]);

  // React to OS changes when on "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyClass(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const isDark =
      theme === "dark" || (theme === "system" && getSystemPrefersDark());
    return { theme, setTheme, isDark };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
