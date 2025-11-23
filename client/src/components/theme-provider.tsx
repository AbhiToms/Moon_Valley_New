import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeTransitionOverlay } from "./theme-transition-overlay";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "moon-valley-theme",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored) {
        setThemeState(stored);
      }
    } catch (e) {
      console.error("Failed to load theme:", e);
    }
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = document.documentElement;
    
    // Dispatch event to trigger overlay fade-in
    window.dispatchEvent(new Event("theme-transition-start"));
    
    // Wait for overlay to fade in, then change theme
    requestAnimationFrame(() => {
      setTimeout(() => {
        root.classList.remove("light", "dark");
        root.classList.add(theme);
      }, 130);
    });
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeTransitionOverlay />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
