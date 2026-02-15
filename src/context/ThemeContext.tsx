"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

/* ========================================
   THEME TYPES
   ======================================== */

export type AccentColor = "purple" | "cyan" | "golden" | "emerald" | "rose";
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  /** Current accent color theme */
  accentColor: AccentColor;
  /** Set the accent color theme */
  setAccentColor: (color: AccentColor) => void;
  /** Current theme mode (light/dark/system) */
  themeMode: ThemeMode;
  /** Set the theme mode */
  setThemeMode: (mode: ThemeMode) => void;
  /** Whether dark mode is currently active */
  isDark: boolean;
  /** Toggle between light and dark mode */
  toggleTheme: () => void;
  /** List of available accent colors */
  availableAccents: AccentColor[];
}

/* ========================================
   CONSTANTS
   ======================================== */

const ACCENT_COLORS: AccentColor[] = [
  "purple",
  "cyan",
  "golden",
  "emerald",
  "rose",
];

const STORAGE_KEY = "setrox-theme";

const DEFAULT_ACCENT: AccentColor = "purple";
const DEFAULT_MODE: ThemeMode = "dark";

/* ========================================
   CONTEXT
   ======================================== */

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ========================================
   HOOK
   ======================================== */

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/* ========================================
   PROVIDER
   ======================================== */

interface ThemeProviderProps {
  children: ReactNode;
  defaultAccent?: AccentColor;
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultAccent = DEFAULT_ACCENT,
  defaultMode = DEFAULT_MODE,
}: ThemeProviderProps) {
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultAccent);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences from localStorage - using useSyncExternalStore pattern
  // We initialize with defaults and update after mount to avoid hydration mismatch
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.accentColor && ACCENT_COLORS.includes(parsed.accentColor)) {
          setAccentColorState(parsed.accentColor);
        }
        if (parsed.themeMode && ["light", "dark", "system"].includes(parsed.themeMode)) {
          setThemeModeState(parsed.themeMode);
        }
      } catch {
        // Ignore localStorage errors
      }
    }
    setMounted(true);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accentColor, themeMode })
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [accentColor, themeMode, mounted]);

  // Apply accent color to document
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-accent", accentColor);
  }, [accentColor, mounted]);

  // Apply dark/light mode
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    const applyTheme = () => {
      if (themeMode === "system") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(systemDark);
        if (systemDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      } else {
        setIsDark(themeMode === "dark");
        if (themeMode === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    // Listen for system theme changes
    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [themeMode, mounted]);

  const setAccentColor = useCallback((color: AccentColor) => {
    if (ACCENT_COLORS.includes(color)) {
      setAccentColorState(color);
    }
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "light";
      // If system, switch to the opposite of current
      return isDark ? "light" : "dark";
    });
  }, [isDark]);

  const value: ThemeContextValue = {
    accentColor,
    setAccentColor,
    themeMode,
    setThemeMode,
    isDark,
    toggleTheme,
    availableAccents: ACCENT_COLORS,
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ========================================
   UTILITIES
   ======================================== */

/**
 * Get the display name for an accent color
 */
export function getAccentDisplayName(color: AccentColor): string {
  const names: Record<AccentColor, string> = {
    purple: "Purple",
    cyan: "Cyan",
    golden: "Golden",
    emerald: "Emerald",
    rose: "Rose",
  };
  return names[color];
}

/**
 * Get the CSS variable value for an accent color
 */
export function getAccentColorVariable(color: AccentColor, shade: number = 500): string {
  return `var(--accent-${shade})`;
}
