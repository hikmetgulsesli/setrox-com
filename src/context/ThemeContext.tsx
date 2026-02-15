/* eslint-disable react-hooks/set-state-in-effect */
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
  // Use defaults for SSR - actual values loaded after mount
  const [accentColor, setAccentColorState] = useState<AccentColor>(defaultAccent);
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState<boolean>(defaultMode === "dark" || defaultMode === "system");
  const [mounted, setMounted] = useState(false);

  // Load saved preferences from localStorage after mount.
  // We initialize with defaults on first render and then update post-mount to avoid hydration mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // We intentionally call setState here to sync with external system (localStorage)
        // This is the recommended pattern for initializing from storage
        if (parsed.accentColor && ACCENT_COLORS.includes(parsed.accentColor)) {
          setAccentColorState(parsed.accentColor);
        }
        if (parsed.themeMode && ["light", "dark", "system"].includes(parsed.themeMode)) {
          setThemeModeState(parsed.themeMode);
        }
      }
    } catch {
      // Ignore localStorage errors
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

    const applyDarkClass = (isDarkValue: boolean) => {
      setIsDark(isDarkValue);
      root.classList.toggle("dark", isDarkValue);
    };

    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyDarkClass(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => applyDarkClass(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyDarkClass(themeMode === "dark");
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

  // Always provide context value - don't hide children during SSR
  // This ensures the context is available during prerendering
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
