/**
 * Theme configuration for setrox.com
 * Defines accent themes and their oklch color values
 */

export type AccentTheme = "purple" | "cyan" | "golden" | "emerald" | "rose";

export interface ThemeConfig {
  name: AccentTheme;
  label: string;
  hue: number;
  light: {
    primary: string;
  };
  dark: {
    primary: string;
  };
}

export const accentThemes: ThemeConfig[] = [
  {
    name: "purple",
    label: "Purple",
    hue: 295,
    light: {
      primary: "oklch(0.55 0.25 295)",
    },
    dark: {
      primary: "oklch(0.70 0.20 295)",
    },
  },
  {
    name: "cyan",
    label: "Cyan",
    hue: 195,
    light: {
      primary: "oklch(0.55 0.15 195)",
    },
    dark: {
      primary: "oklch(0.75 0.15 195)",
    },
  },
  {
    name: "golden",
    label: "Golden",
    hue: 85,
    light: {
      primary: "oklch(0.60 0.16 85)",
    },
    dark: {
      primary: "oklch(0.78 0.14 85)",
    },
  },
  {
    name: "emerald",
    label: "Emerald",
    hue: 165,
    light: {
      primary: "oklch(0.55 0.17 165)",
    },
    dark: {
      primary: "oklch(0.75 0.17 165)",
    },
  },
  {
    name: "rose",
    label: "Rose",
    hue: 20,
    light: {
      primary: "oklch(0.55 0.20 20)",
    },
    dark: {
      primary: "oklch(0.70 0.18 20)",
    },
  },
];

export const defaultAccentTheme: AccentTheme = "purple";

export const neutralColors = {
  light: {
    background: "oklch(0.985 0.002 260)",
    card: "oklch(1 0 0)",
    border: "oklch(0.92 0.008 260)",
    foreground: "oklch(0.12 0.015 260)",
    mutedForeground: "oklch(0.48 0.01 260)",
  },
  dark: {
    background: "oklch(0.06 0.015 260)",
    card: "oklch(0.1 0.015 260)",
    border: "oklch(0.2 0.015 260)",
    foreground: "oklch(0.96 0 0)",
    mutedForeground: "oklch(0.58 0 0)",
  },
};

export const statusColors = {
  green: "#22c55e",
  yellow: "#eab308",
  red: "#ef4444",
};

/**
 * Validates if a string is a valid accent theme
 */
export function isValidAccentTheme(theme: string): theme is AccentTheme {
  return accentThemes.some((t) => t.name === theme);
}

/**
 * Gets theme configuration by name
 */
export function getThemeConfig(name: AccentTheme): ThemeConfig {
  const theme = accentThemes.find((t) => t.name === name);
  if (!theme) {
    throw new Error(`Theme "${name}" not found`);
  }
  return theme;
}
