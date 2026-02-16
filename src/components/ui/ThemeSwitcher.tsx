"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, type AccentTheme } from "@/lib/theme-context";
import { useTheme as useNextTheme } from "next-themes";
import { Palette, Sun, Moon } from "lucide-react";

/**
 * ThemeSwitcher Component
 * 
 * Features:
 * - 5 color circle buttons for accent theme selection
 * - Sun/Moon icon toggle for light/dark mode
 * - Dropdown palette for accent color selection
 * - Keyboard accessible (Escape to close dropdown)
 * - Persists selections to localStorage
 */
export function ThemeSwitcher() {
  const { accentTheme, setAccentTheme, accentThemes, isHydrated } = useTheme();
  const { theme, setTheme } = useNextTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }

    if (isPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPaletteOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPaletteOpen(false);
      }
    }

    if (isPaletteOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPaletteOpen]);

  const handleAccentChange = (themeName: AccentTheme) => {
    setAccentTheme(themeName);
    setIsPaletteOpen(false);
  };

  const toggleLightDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return (
      <div className="flex items-center gap-2" aria-hidden="true">
        <div className="h-8 w-8 rounded-lg bg-muted-foreground/20 animate-pulse" />
        <div className="h-8 w-8 rounded-lg bg-muted-foreground/20 animate-pulse" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      {/* Palette Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsPaletteOpen(!isPaletteOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
          aria-label="Select accent color"
          aria-expanded={isPaletteOpen}
          aria-haspopup="listbox"
        >
          <Palette className="h-4 w-4" />
        </button>

        {/* Dropdown Menu */}
        {isPaletteOpen && (
          <div
            className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
            role="listbox"
            aria-label="Accent color options"
          >
            <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Accent Color
            </p>
            <div className="flex flex-wrap gap-2">
              {accentThemes.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => handleAccentChange(t.name)}
                  className={`
                    group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer
                    ${accentTheme === t.name ? "ring-2 ring-offset-2" : "hover:scale-110"}
                  `}
                  style={{
                    backgroundColor: isDark ? t.dark.primary : t.light.primary,
                    ['--tw-ring-color' as string]: isDark ? t.dark.primary : t.light.primary,
                  }}
                  role="option"
                  aria-selected={accentTheme === t.name}
                  aria-label={`${t.label} theme`}
                  title={t.label}
                >
                  {accentTheme === t.name && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Current: <span className="font-medium text-foreground capitalize">{accentTheme}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Light/Dark Toggle */}
      <button
        type="button"
        onClick={toggleLightDark}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
