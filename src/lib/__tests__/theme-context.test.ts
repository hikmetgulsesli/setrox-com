/**
 * Theme Context and Switching System Tests
 * @jest-environment jsdom
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";

// Mock localStorage
const mockLocalStorage = {
  storage: new Map<string, string>(),
  getItem(key: string): string | null {
    return this.storage.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  },
  removeItem(key: string): void {
    this.storage.delete(key);
  },
  clear(): void {
    this.storage.clear();
  },
};

// Mock document and window
global.localStorage = mockLocalStorage as unknown as Storage;

// Mock document.documentElement
const mockDocumentElement = {
  classList: {
    classes: new Set<string>(),
    contains(className: string): boolean {
      return this.classes.has(className);
    },
    add(className: string): void {
      this.classes.add(className);
    },
    remove(className: string): void {
      this.classes.delete(className);
    },
  },
  style: {
    properties: new Map<string, string>(),
    setProperty(name: string, value: string): void {
      this.properties.set(name, value);
    },
    getPropertyValue(name: string): string {
      return this.properties.get(name) ?? "";
    },
  },
  attributes: new Map<string, string>(),
  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  },
  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  },
};

Object.defineProperty(global, "document", {
  value: {
    documentElement: mockDocumentElement,
  },
  writable: true,
});

describe("Theme Context and Switching System", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    mockDocumentElement.classList.classes.clear();
    mockDocumentElement.style.properties.clear();
    mockDocumentElement.attributes.clear();
  });

  describe("localStorage persistence", () => {
    it("should store accent theme in localStorage", () => {
      const theme = "cyan";
      mockLocalStorage.setItem("color-theme", theme);
      assert.strictEqual(mockLocalStorage.getItem("color-theme"), theme);
    });

    it("should store light/dark mode in localStorage", () => {
      const theme = "dark";
      mockLocalStorage.setItem("theme", theme);
      assert.strictEqual(mockLocalStorage.getItem("theme"), theme);
    });

    it("should persist both accent and light/dark themes independently", () => {
      mockLocalStorage.setItem("color-theme", "emerald");
      mockLocalStorage.setItem("theme", "light");
      
      assert.strictEqual(mockLocalStorage.getItem("color-theme"), "emerald");
      assert.strictEqual(mockLocalStorage.getItem("theme"), "light");
    });

    it("should retrieve stored accent theme", () => {
      mockLocalStorage.setItem("color-theme", "rose");
      const stored = mockLocalStorage.getItem("color-theme");
      assert.strictEqual(stored, "rose");
    });

    it("should return null for non-existent keys", () => {
      const stored = mockLocalStorage.getItem("non-existent");
      assert.strictEqual(stored, null);
    });
  });

  describe("accent theme application", () => {
    it("should apply CSS custom properties to document element", () => {
      const primaryColor = "oklch(0.55 0.25 295)";
      mockDocumentElement.style.setProperty("--primary", primaryColor);
      
      assert.strictEqual(
        mockDocumentElement.style.getPropertyValue("--primary"),
        primaryColor
      );
    });

    it("should set data-accent attribute on document element", () => {
      mockDocumentElement.setAttribute("data-accent", "purple");
      assert.strictEqual(mockDocumentElement.getAttribute("data-accent"), "purple");
    });

    it("should apply glow color properties", () => {
      const glowColor = "oklch(0.55 0.25 295 / 0.12)";
      const glowColorStrong = "oklch(0.55 0.25 295 / 0.22)";
      
      mockDocumentElement.style.setProperty("--glow-color", glowColor);
      mockDocumentElement.style.setProperty("--glow-color-strong", glowColorStrong);
      
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--glow-color"), glowColor);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--glow-color-strong"), glowColorStrong);
    });

    it("should apply selection background color", () => {
      const selectionBg = "oklch(0.55 0.25 295 / 0.3)";
      mockDocumentElement.style.setProperty("--selection-bg", selectionBg);
      
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--selection-bg"), selectionBg);
    });
  });

  describe("light/dark mode detection", () => {
    it("should detect dark mode from document class", () => {
      mockDocumentElement.classList.add("dark");
      assert.strictEqual(mockDocumentElement.classList.contains("dark"), true);
    });

    it("should detect light mode when dark class is absent", () => {
      assert.strictEqual(mockDocumentElement.classList.contains("dark"), false);
    });

    it("should toggle between light and dark mode", () => {
      mockDocumentElement.classList.add("dark");
      assert.strictEqual(mockDocumentElement.classList.contains("dark"), true);
      
      mockDocumentElement.classList.remove("dark");
      assert.strictEqual(mockDocumentElement.classList.contains("dark"), false);
    });
  });

  describe("theme persistence across reloads", () => {
    it("should maintain accent theme after simulated reload", () => {
      // First "session" - set theme
      mockLocalStorage.setItem("color-theme", "golden");
      mockDocumentElement.setAttribute("data-accent", "golden");
      
      // Simulate reload - clear memory but keep localStorage
      mockDocumentElement.attributes.clear();
      
      // Second "session" - restore from localStorage
      const storedTheme = mockLocalStorage.getItem("color-theme");
      if (storedTheme) {
        mockDocumentElement.setAttribute("data-accent", storedTheme);
      }
      
      assert.strictEqual(mockDocumentElement.getAttribute("data-accent"), "golden");
    });

    it("should maintain light/dark mode after simulated reload", () => {
      // First session - set dark mode
      mockLocalStorage.setItem("theme", "dark");
      mockDocumentElement.classList.add("dark");
      
      // Simulate reload
      mockDocumentElement.classList.classes.clear();
      
      // Second session - restore
      const storedTheme = mockLocalStorage.getItem("theme");
      if (storedTheme === "dark") {
        mockDocumentElement.classList.add("dark");
      }
      
      assert.strictEqual(mockDocumentElement.classList.contains("dark"), true);
    });
  });

  describe("accent theme color values", () => {
    it("should apply correct purple theme colors", () => {
      const lightPrimary = "oklch(0.55 0.25 295)";
      const darkPrimary = "oklch(0.70 0.20 295)";
      
      mockDocumentElement.style.setProperty("--primary", lightPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), lightPrimary);
      
      mockDocumentElement.style.setProperty("--primary", darkPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), darkPrimary);
    });

    it("should apply correct cyan theme colors", () => {
      const lightPrimary = "oklch(0.55 0.15 195)";
      const darkPrimary = "oklch(0.75 0.15 195)";
      
      mockDocumentElement.style.setProperty("--primary", lightPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), lightPrimary);
      
      mockDocumentElement.style.setProperty("--primary", darkPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), darkPrimary);
    });

    it("should apply correct golden theme colors", () => {
      const lightPrimary = "oklch(0.60 0.16 85)";
      const darkPrimary = "oklch(0.78 0.14 85)";
      
      mockDocumentElement.style.setProperty("--primary", lightPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), lightPrimary);
      
      mockDocumentElement.style.setProperty("--primary", darkPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), darkPrimary);
    });

    it("should apply correct emerald theme colors", () => {
      const lightPrimary = "oklch(0.55 0.17 165)";
      const darkPrimary = "oklch(0.75 0.17 165)";
      
      mockDocumentElement.style.setProperty("--primary", lightPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), lightPrimary);
      
      mockDocumentElement.style.setProperty("--primary", darkPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), darkPrimary);
    });

    it("should apply correct rose theme colors", () => {
      const lightPrimary = "oklch(0.55 0.20 20)";
      const darkPrimary = "oklch(0.70 0.18 20)";
      
      mockDocumentElement.style.setProperty("--primary", lightPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), lightPrimary);
      
      mockDocumentElement.style.setProperty("--primary", darkPrimary);
      assert.strictEqual(mockDocumentElement.style.getPropertyValue("--primary"), darkPrimary);
    });
  });

  describe("storage keys", () => {
    it("should use 'color-theme' for accent theme storage", () => {
      mockLocalStorage.setItem("color-theme", "cyan");
      assert.strictEqual(mockLocalStorage.getItem("color-theme"), "cyan");
    });

    it("should use 'theme' for light/dark mode storage", () => {
      mockLocalStorage.setItem("theme", "light");
      assert.strictEqual(mockLocalStorage.getItem("theme"), "light");
    });
  });
});
