import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─── Theme Context ──────────────────────────────────────────────
// Provides `isDark` (boolean) and `toggle` (function) to the
// entire component tree.  Both the UI (ThemeToggle, CSS) and the
// 3D scene (Scene3D) read from this single source of truth.
// ─────────────────────────────────────────────────────────────────

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      return false;
    }
    return true;
  });

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
