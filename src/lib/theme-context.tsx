/**
 * Theme Context Provider for managing accent color theme
 * Integrates with next-themes for light/dark mode
 */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  type AccentTheme,
  accentThemes,
  defaultAccentTheme,
  getThemeConfig,
  isValidAccentTheme,
} from "./theme-config";

const ACCENT_THEME_STORAGE_KEY = "color-theme";

interface ThemeContextValue {
  /** Current accent theme (color palette) */
  accentTheme: AccentTheme;
  /** Set accent theme */
  setAccentTheme: (theme: AccentTheme) => void;
  /** All available accent themes */
  accentThemes: typeof accentThemes;
  /** Whether the theme has been hydrated from localStorage */
  isHydrated: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultAccent?: AccentTheme;
}

/**
 * Applies accent theme CSS variables to the document element
 * Uses inline style injection for immediate color changes
 */
function applyAccentTheme(theme: AccentTheme, isDark: boolean): void {
  const config = getThemeConfig(theme);
  const colors = isDark ? config.dark : config.light;

  const root = document.documentElement;

  // Apply CSS custom properties via inline style
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--accent", colors.primary);
  root.style.setProperty("--ring", colors.primary);

  // Derive glow colors from primary
  const glowColor = colors.primary.replace(")", " / 0.12)");
  const glowColorStrong = colors.primary.replace(")", " / 0.22)");
  const selectionBg = colors.primary.replace(")", " / 0.3)");

  root.style.setProperty("--glow-color", glowColor);
  root.style.setProperty("--glow-color-strong", glowColorStrong);
  root.style.setProperty("--selection-bg", selectionBg);

  // Set data-accent attribute for CSS selectors
  root.setAttribute("data-accent", theme);
}

/**
 * Gets the initial accent theme from localStorage or falls back to default
 * Safe to call during SSR (returns default)
 */
function getInitialAccentTheme(): AccentTheme {
  if (typeof window === "undefined") {
    return defaultAccentTheme;
  }

  try {
    const stored = localStorage.getItem(ACCENT_THEME_STORAGE_KEY);
    if (stored && isValidAccentTheme(stored)) {
      return stored;
    }
  } catch {
    // localStorage not available (e.g., private mode, SSR)
  }

  return defaultAccentTheme;
}

/**
 * Theme Provider for accent color management
 * Works alongside next-themes for light/dark mode
 */
export function ThemeProvider({
  children,
  defaultAccent = defaultAccentTheme,
}: ThemeProviderProps) {
  const [accentTheme, setAccentThemeState] = useState<AccentTheme>(defaultAccent);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const initialTheme = getInitialAccentTheme();
    setAccentThemeState(initialTheme);

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    // Apply the theme immediately
    applyAccentTheme(initialTheme, isDarkMode);
    setIsHydrated(true);
  }, []);

  // Listen for dark mode changes
  useEffect(() => {
    if (!isHydrated) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          const isDarkMode = document.documentElement.classList.contains("dark");
          setIsDark(isDarkMode);
          applyAccentTheme(accentTheme, isDarkMode);
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isHydrated, accentTheme]);

  // Update theme when accentTheme changes
  useEffect(() => {
    if (!isHydrated) return;
    applyAccentTheme(accentTheme, isDark);
  }, [accentTheme, isDark, isHydrated]);

  const setAccentTheme = useCallback((theme: AccentTheme) => {
    setAccentThemeState(theme);

    // Persist to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(ACCENT_THEME_STORAGE_KEY, theme);
      } catch {
        // localStorage not available
      }
    }
  }, []);

  const value: ThemeContextValue = {
    accentTheme,
    setAccentTheme,
    accentThemes,
    isHydrated,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the theme context
 * Must be used within a ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export type { AccentTheme, ThemeContextValue, ThemeProviderProps };
