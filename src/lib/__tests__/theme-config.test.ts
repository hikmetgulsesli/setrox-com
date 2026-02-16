/**
 * Theme configuration tests
 * @jest-environment node
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import {
  accentThemes,
  defaultAccentTheme,
  neutralColors,
  statusColors,
  isValidAccentTheme,
  getThemeConfig,
  type AccentTheme,
} from "../theme-config.ts";

describe("Theme Configuration", () => {
  describe("accentThemes", () => {
    it("should have exactly 5 accent themes", () => {
      assert.strictEqual(accentThemes.length, 5);
    });

    it("should include all required themes", () => {
      const themeNames = accentThemes.map((t) => t.name);
      assert(themeNames.includes("purple"));
      assert(themeNames.includes("cyan"));
      assert(themeNames.includes("golden"));
      assert(themeNames.includes("emerald"));
      assert(themeNames.includes("rose"));
    });

    it("each theme should have required properties", () => {
      for (const theme of accentThemes) {
        assert(theme.name !== undefined);
        assert(theme.label !== undefined);
        assert(theme.hue !== undefined);
        assert(theme.light !== undefined);
        assert(theme.dark !== undefined);
        assert(theme.light.primary !== undefined);
        assert(theme.dark.primary !== undefined);
      }
    });

    it("each theme should have oklch-based primary colors", () => {
      for (const theme of accentThemes) {
        assert(theme.light.primary.startsWith("oklch("));
        assert(theme.dark.primary.startsWith("oklch("));
      }
    });

    it("should have correct hue values per PRD", () => {
      const purple = accentThemes.find((t) => t.name === "purple");
      const cyan = accentThemes.find((t) => t.name === "cyan");
      const golden = accentThemes.find((t) => t.name === "golden");
      const emerald = accentThemes.find((t) => t.name === "emerald");
      const rose = accentThemes.find((t) => t.name === "rose");

      assert.strictEqual(purple?.hue, 295);
      assert.strictEqual(cyan?.hue, 195);
      assert.strictEqual(golden?.hue, 85);
      assert.strictEqual(emerald?.hue, 165);
      assert.strictEqual(rose?.hue, 20);
    });
  });

  describe("defaultAccentTheme", () => {
    it("should default to purple", () => {
      assert.strictEqual(defaultAccentTheme, "purple");
    });
  });

  describe("neutralColors", () => {
    it("should have light and dark mode colors", () => {
      assert(neutralColors.light !== undefined);
      assert(neutralColors.dark !== undefined);
    });

    it("light mode should have required tokens", () => {
      assert(neutralColors.light.background !== undefined);
      assert(neutralColors.light.card !== undefined);
      assert(neutralColors.light.border !== undefined);
      assert(neutralColors.light.foreground !== undefined);
      assert(neutralColors.light.mutedForeground !== undefined);
    });

    it("dark mode should have required tokens", () => {
      assert(neutralColors.dark.background !== undefined);
      assert(neutralColors.dark.card !== undefined);
      assert(neutralColors.dark.border !== undefined);
      assert(neutralColors.dark.foreground !== undefined);
      assert(neutralColors.dark.mutedForeground !== undefined);
    });

    it("should use oklch color space", () => {
      assert(neutralColors.light.background.startsWith("oklch("));
      assert(neutralColors.dark.background.startsWith("oklch("));
    });

    it("should match PRD values for light mode", () => {
      assert.strictEqual(neutralColors.light.background, "oklch(0.985 0.002 260)");
      assert.strictEqual(neutralColors.light.card, "oklch(1 0 0)");
      assert.strictEqual(neutralColors.light.border, "oklch(0.92 0.008 260)");
      assert.strictEqual(neutralColors.light.foreground, "oklch(0.12 0.015 260)");
      assert.strictEqual(neutralColors.light.mutedForeground, "oklch(0.48 0.01 260)");
    });

    it("should match PRD values for dark mode", () => {
      assert.strictEqual(neutralColors.dark.background, "oklch(0.06 0.015 260)");
      assert.strictEqual(neutralColors.dark.card, "oklch(0.1 0.015 260)");
      assert.strictEqual(neutralColors.dark.border, "oklch(0.2 0.015 260)");
      assert.strictEqual(neutralColors.dark.foreground, "oklch(0.96 0 0)");
      assert.strictEqual(neutralColors.dark.mutedForeground, "oklch(0.58 0 0)");
    });
  });

  describe("statusColors", () => {
    it("should have green, yellow, and red status colors", () => {
      assert.strictEqual(statusColors.green, "#22c55e");
      assert.strictEqual(statusColors.yellow, "#eab308");
      assert.strictEqual(statusColors.red, "#ef4444");
    });
  });

  describe("isValidAccentTheme", () => {
    it("should return true for valid themes", () => {
      assert.strictEqual(isValidAccentTheme("purple"), true);
      assert.strictEqual(isValidAccentTheme("cyan"), true);
      assert.strictEqual(isValidAccentTheme("golden"), true);
      assert.strictEqual(isValidAccentTheme("emerald"), true);
      assert.strictEqual(isValidAccentTheme("rose"), true);
    });

    it("should return false for invalid themes", () => {
      assert.strictEqual(isValidAccentTheme("blue"), false);
      assert.strictEqual(isValidAccentTheme(""), false);
      assert.strictEqual(isValidAccentTheme("invalid"), false);
    });

    it("should be case sensitive", () => {
      assert.strictEqual(isValidAccentTheme("Purple"), false);
      assert.strictEqual(isValidAccentTheme("PURPLE"), false);
    });
  });

  describe("getThemeConfig", () => {
    it("should return theme config for valid theme", () => {
      const purple = getThemeConfig("purple");
      assert.strictEqual(purple.name, "purple");
      assert.strictEqual(purple.label, "Purple");
    });

    it("should throw error for invalid theme", () => {
      assert.throws(() => getThemeConfig("invalid" as AccentTheme), /Theme "invalid" not found/);
    });
  });
});
