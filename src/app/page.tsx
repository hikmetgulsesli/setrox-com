"use client";

import { useTheme, AccentColor, getAccentDisplayName } from "@/context";
import { Moon, Sun, Palette } from "lucide-react";

export default function Home() {
  const {
    accentColor,
    setAccentColor,
    themeMode,
    setThemeMode,
    isDark,
    toggleTheme,
    availableAccents,
  } = useTheme();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-display text-5xl font-bold mb-4 text-balance">
            <span className="gradient-text">Setrox</span> Portfolio
          </h1>
          <p className="text-text-secondary text-lg">
            Terminal-aesthetic developer portfolio with multi-theme support
          </p>
        </header>

        {/* Theme Controls */}
        <section className="space-y-8">
          {/* Dark Mode Toggle */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-accent-400" />
                ) : (
                  <Sun className="w-5 h-5 text-accent-500" />
                )}
                <h2 className="font-display text-xl font-medium">Theme Mode</h2>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-default border border-border-primary hover:bg-surface-hover transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-border-focus"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="terminal-text text-sm">
                  {isDark ? "Dark" : "Light"}
                </span>
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              {(["light", "dark", "system"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    themeMode === mode
                      ? "bg-accent-500 text-white"
                      : "bg-surface-default text-text-secondary hover:bg-surface-hover border border-border-primary"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Selector */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-accent-400" />
              <h2 className="font-display text-xl font-medium">Accent Color</h2>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {availableAccents.map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                    accentColor === color
                      ? "border-accent-500 bg-accent-500/10"
                      : "border-border-primary hover:border-accent-400 bg-surface-default"
                  }`}
                  aria-label={`Select ${getAccentDisplayName(color)} theme`}
                >
                  <div
                    className="w-8 h-8 rounded-full transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `var(--${color === "purple" ? "accent-500" : color === "cyan" ? "accent-500" : color === "golden" ? "accent-500" : color === "emerald" ? "accent-500" : "accent-500"})`,
                    }}
                  />
                  <span className="text-xs font-medium text-text-secondary">
                    {getAccentDisplayName(color)}
                  </span>
                  {accentColor === color && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-accent-500 ring-offset-2 ring-offset-bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color Preview */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium mb-4">Color Palette Preview</h2>
            <div className="space-y-3">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="flex items-center gap-4">
                  <div
                    className="w-16 h-8 rounded-md"
                    style={{ backgroundColor: `var(--accent-${shade})` }}
                  />
                  <span className="terminal-text text-sm text-text-secondary w-12">
                    {shade}
                  </span>
                  <span className="text-sm text-text-tertiary">
                    Accent {shade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Preview */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium mb-4">Typography</h2>
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold">
                Display Heading (Space Grotesk)
              </h1>
              <h2 className="font-display text-2xl font-medium">
                Section Heading
              </h2>
              <p className="font-body text-base text-text-secondary">
                Body text uses DM Sans for excellent readability. The quick brown fox jumps over the lazy dog.
              </p>
              <code className="terminal-text text-sm bg-bg-secondary px-2 py-1 rounded">
                Monospace code text
              </code>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium mb-4">Status Colors</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-status-success/10 text-status-success text-sm font-medium">
                Success
              </span>
              <span className="px-3 py-1 rounded-full bg-status-warning/10 text-status-warning text-sm font-medium">
                Warning
              </span>
              <span className="px-3 py-1 rounded-full bg-status-error/10 text-status-error text-sm font-medium">
                Error
              </span>
              <span className="px-3 py-1 rounded-full bg-status-info/10 text-status-info text-sm font-medium">
                Info
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
