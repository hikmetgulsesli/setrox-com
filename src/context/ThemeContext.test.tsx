import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme, getAccentDisplayName, AccentColor } from "./ThemeContext";

describe("ThemeContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-accent");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("useTheme", () => {
    it("should throw error when used outside ThemeProvider", () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useTheme());
      }).toThrow("useTheme must be used within a ThemeProvider");
      
      consoleSpy.mockRestore();
    });

    it("should provide default values", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.accentColor).toBe("purple");
        expect(result.current.themeMode).toBe("dark");
        expect(result.current.isDark).toBe(true);
        expect(result.current.availableAccents).toEqual([
          "purple",
          "cyan",
          "golden",
          "emerald",
          "rose",
        ]);
      });
    });

    it("should accept custom default values", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultAccent="cyan" defaultMode="light">
          {children}
        </ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.accentColor).toBe("cyan");
        expect(result.current.themeMode).toBe("light");
        expect(result.current.isDark).toBe(false);
      });
    });
  });

  describe("setAccentColor", () => {
    it("should update accent color", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.accentColor).toBe("purple"));

      act(() => {
        result.current.setAccentColor("cyan");
      });

      expect(result.current.accentColor).toBe("cyan");
    });

    it("should set data-accent attribute on document", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.accentColor).toBe("purple"));

      act(() => {
        result.current.setAccentColor("emerald");
      });

      await waitFor(() => {
        expect(document.documentElement.getAttribute("data-accent")).toBe("emerald");
      });
    });

    it("should ignore invalid accent colors", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.accentColor).toBe("purple"));

      act(() => {
        // @ts-expect-error Testing invalid value
        result.current.setAccentColor("invalid");
      });

      expect(result.current.accentColor).toBe("purple");
    });
  });

  describe("setThemeMode", () => {
    it("should update theme mode", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultMode="light">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.themeMode).toBe("light"));

      act(() => {
        result.current.setThemeMode("dark");
      });

      expect(result.current.themeMode).toBe("dark");
      expect(result.current.isDark).toBe(true);
    });

    it("should add dark class when switching to dark mode", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultMode="light">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.themeMode).toBe("light"));

      act(() => {
        result.current.setThemeMode("dark");
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains("dark")).toBe(true);
      });
    });

    it("should remove dark class when switching to light mode", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultMode="dark">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.themeMode).toBe("dark"));

      act(() => {
        result.current.setThemeMode("light");
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains("dark")).toBe(false);
      });
    });
  });

  describe("toggleTheme", () => {
    it("should toggle from light to dark", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultMode="light">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.themeMode).toBe("light"));

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.themeMode).toBe("dark");
      expect(result.current.isDark).toBe(true);
    });

    it("should toggle from dark to light", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider defaultMode="dark">{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.themeMode).toBe("dark"));

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.themeMode).toBe("light");
      expect(result.current.isDark).toBe(false);
    });
  });

  describe("localStorage persistence", () => {
    it("should load saved preferences from localStorage", async () => {
      const localStorageMock = {
        getItem: vi.fn().mockReturnValue(
          JSON.stringify({ accentColor: "golden", themeMode: "light" })
        ),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
        writable: true,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.accentColor).toBe("golden");
        expect(result.current.themeMode).toBe("light");
      });
    });

    it("should save preferences to localStorage when changed", async () => {
      const setItemMock = vi.fn();
      const localStorageMock = {
        getItem: vi.fn().mockReturnValue(null),
        setItem: setItemMock,
        removeItem: vi.fn(),
        clear: vi.fn(),
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
        writable: true,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => expect(result.current.accentColor).toBe("purple"));

      act(() => {
        result.current.setAccentColor("rose");
      });

      await waitFor(() => {
        expect(setItemMock).toHaveBeenCalledWith(
          "setrox-theme",
          JSON.stringify({ accentColor: "rose", themeMode: "dark" })
        );
      });
    });

    it("should handle localStorage errors gracefully", async () => {
      const localStorageMock = {
        getItem: vi.fn().mockImplementation(() => {
          throw new Error("Storage error");
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
        writable: true,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ThemeProvider>{children}</ThemeProvider>
      );

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        // Should still work with defaults
        expect(result.current.accentColor).toBe("purple");
      });
    });
  });
});

describe("getAccentDisplayName", () => {
  const testCases: [AccentColor, string][] = [
    ["purple", "Purple"],
    ["cyan", "Cyan"],
    ["golden", "Golden"],
    ["emerald", "Emerald"],
    ["rose", "Rose"],
  ];

  testCases.forEach(([color, expected]) => {
    it(`should return "${expected}" for ${color}`, () => {
      expect(getAccentDisplayName(color)).toBe(expected);
    });
  });
});
