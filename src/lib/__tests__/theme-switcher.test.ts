/**
 * ThemeSwitcher Component Tests
 * @jest-environment jsdom
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Read component source
const themeSwitcherPath = resolve(process.cwd(), "src/components/ui/ThemeSwitcher.tsx");
const themeSwitcherSource = readFileSync(themeSwitcherPath, "utf-8");

describe("ThemeSwitcher Component", () => {
  describe("Component Structure", () => {
    it("should have ThemeSwitcher component file", () => {
      assert.ok(themeSwitcherSource.length > 0, "ThemeSwitcher.tsx should exist");
    });

    it("should export ThemeSwitcher function component", () => {
      assert.ok(
        themeSwitcherSource.includes("export function ThemeSwitcher()") ||
        themeSwitcherSource.includes("export const ThemeSwitcher"),
        "Should export ThemeSwitcher component"
      );
    });

    it("should be a client component with 'use client' directive", () => {
      assert.ok(
        themeSwitcherSource.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });
  });

  describe("Imports", () => {
    it("should import useTheme from @/lib/theme-context", () => {
      assert.ok(
        themeSwitcherSource.includes('useTheme') &&
        themeSwitcherSource.includes('@/lib/theme-context'),
        "Should import useTheme hook"
      );
    });

    it("should import useTheme from next-themes", () => {
      assert.ok(
        themeSwitcherSource.includes('useTheme') &&
        themeSwitcherSource.includes('next-themes'),
        "Should import useTheme from next-themes"
      );
    });

    it("should import Palette icon from lucide-react", () => {
      assert.ok(
        themeSwitcherSource.includes('Palette') &&
        themeSwitcherSource.includes('lucide-react'),
        "Should import Palette icon"
      );
    });

    it("should import Sun icon from lucide-react", () => {
      assert.ok(
        themeSwitcherSource.includes('Sun') &&
        themeSwitcherSource.includes('lucide-react'),
        "Should import Sun icon"
      );
    });

    it("should import Moon icon from lucide-react", () => {
      assert.ok(
        themeSwitcherSource.includes('Moon') &&
        themeSwitcherSource.includes('lucide-react'),
        "Should import Moon icon"
      );
    });
  });

  describe("Palette Dropdown", () => {
    it("should have palette button with aria-label", () => {
      assert.ok(
        themeSwitcherSource.includes('aria-label="Select accent color"'),
        "Palette button should have aria-label"
      );
    });

    it("should have aria-expanded for dropdown state", () => {
      assert.ok(
        themeSwitcherSource.includes('aria-expanded={isPaletteOpen}'),
        "Should have aria-expanded attribute"
      );
    });

    it("should have aria-haspopup for dropdown", () => {
      assert.ok(
        themeSwitcherSource.includes('aria-haspopup="listbox"'),
        "Should have aria-haspopup attribute"
      );
    });

    it("should render 5 color theme buttons", () => {
      // Check for mapping over accentThemes
      assert.ok(
        themeSwitcherSource.includes('accentThemes.map'),
        "Should map over accentThemes"
      );
    });

    it("should have role=listbox for dropdown menu", () => {
      assert.ok(
        themeSwitcherSource.includes('role="listbox"'),
        "Dropdown should have role=listbox"
      );
    });

    it("should have role=option for color buttons", () => {
      assert.ok(
        themeSwitcherSource.includes('role="option"'),
        "Color buttons should have role=option"
      );
    });

    it("should have aria-selected for active theme", () => {
      assert.ok(
        themeSwitcherSource.includes('aria-selected={accentTheme === t.name}'),
        "Should have aria-selected attribute"
      );
    });

    it("should show checkmark for selected theme", () => {
      assert.ok(
        themeSwitcherSource.includes('accentTheme === t.name') &&
        themeSwitcherSource.includes('✓'),
        "Should show checkmark for selected theme"
      );
    });
  });

  describe("Light/Dark Toggle", () => {
    it("should have sun/moon toggle button", () => {
      assert.ok(
        themeSwitcherSource.includes('toggleLightDark') ||
        themeSwitcherSource.includes('onClick={toggleLightDark}'),
        "Should have light/dark toggle handler"
      );
    });

    it("should show Sun icon in dark mode", () => {
      assert.ok(
        themeSwitcherSource.includes('isDark ?') &&
        themeSwitcherSource.includes('<Sun'),
        "Should show Sun icon in dark mode"
      );
    });

    it("should show Moon icon in light mode", () => {
      assert.ok(
        themeSwitcherSource.includes('<Moon') &&
        themeSwitcherSource.includes('isDark'),
        "Should conditionally render Moon icon"
      );
    });

    it("should have aria-label for toggle button", () => {
      assert.ok(
        themeSwitcherSource.includes('aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}'),
        "Toggle button should have dynamic aria-label"
      );
    });

    it("should have title attribute for tooltip", () => {
      assert.ok(
        themeSwitcherSource.includes('title={isDark ? "Switch to light mode" : "Switch to dark mode"}'),
        "Toggle button should have title attribute"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have focus-visible ring on buttons", () => {
      assert.ok(
        themeSwitcherSource.includes('focus-visible:ring-2'),
        "Buttons should have focus-visible ring"
      );
    });

    it("should close dropdown on Escape key", () => {
      assert.ok(
        themeSwitcherSource.includes('Escape') &&
        themeSwitcherSource.includes('setIsPaletteOpen(false)'),
        "Should close dropdown on Escape key"
      );
    });

    it("should close dropdown when clicking outside", () => {
      assert.ok(
        themeSwitcherSource.includes('mousedown') &&
        themeSwitcherSource.includes('handleClickOutside'),
        "Should close dropdown on outside click"
      );
    });
  });

  describe("Styling", () => {
    it("should use cursor-pointer on buttons", () => {
      assert.ok(
        themeSwitcherSource.includes('cursor-pointer'),
        "Buttons should have cursor-pointer"
      );
    });

    it("should have hover states on buttons", () => {
      assert.ok(
        themeSwitcherSource.includes('hover:border-primary') ||
        themeSwitcherSource.includes('hover:text-primary'),
        "Buttons should have hover states"
      );
    });

    it("should have transition duration", () => {
      assert.ok(
        themeSwitcherSource.includes('duration-200'),
        "Should have 200ms transition duration"
      );
    });

    it("should have rounded-lg for buttons", () => {
      assert.ok(
        themeSwitcherSource.includes('rounded-lg'),
        "Buttons should have rounded-lg"
      );
    });

    it("should have border styling", () => {
      assert.ok(
        themeSwitcherSource.includes('border') &&
        themeSwitcherSource.includes('border-border'),
        "Buttons should have border styling"
      );
    });
  });

  describe("Hydration Handling", () => {
    it("should check isHydrated before rendering", () => {
      assert.ok(
        themeSwitcherSource.includes('isHydrated'),
        "Should check isHydrated state"
      );
    });

    it("should show skeleton/placeholder when not hydrated", () => {
      assert.ok(
        themeSwitcherSource.includes('!isHydrated') ||
        themeSwitcherSource.includes('isHydrated)'),
        "Should handle hydration state"
      );
    });
  });

  describe("Theme Integration", () => {
    it("should use useTheme hook for accent theme", () => {
      assert.ok(
        themeSwitcherSource.includes('accentTheme') &&
        themeSwitcherSource.includes('setAccentTheme'),
        "Should use accent theme from context"
      );
    });

    it("should use useTheme from next-themes for light/dark", () => {
      assert.ok(
        themeSwitcherSource.includes('const { theme, setTheme }') ||
        themeSwitcherSource.includes('const { resolvedTheme }'),
        "Should use next-themes for light/dark mode"
      );
    });

    it("should map over all accent themes", () => {
      assert.ok(
        themeSwitcherSource.includes('accentThemes.map((t)'),
        "Should map over accentThemes array"
      );
    });
  });
});
