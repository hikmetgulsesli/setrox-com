"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as AccentThemeProvider } from "@/lib/theme-context";
import { type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Combined providers for theme management
 * Wraps next-themes (light/dark) with accent theme provider
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
    >
      <AccentThemeProvider>
        {children}
      </AccentThemeProvider>
    </NextThemesProvider>
  );
}
