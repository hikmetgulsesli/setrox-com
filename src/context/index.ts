// Re-export from ThemeContext for cleaner imports
export {
  ThemeProvider,
  useTheme,
  getAccentDisplayName,
  getAccentColorVariable,
} from "./ThemeContext";

export type {
  AccentColor,
  ThemeMode,
  ThemeContextValue,
} from "./ThemeContext";
