import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Terminal Section Tests
 * 
 * Tests for the Terminal section component:
 * - macOS-style window chrome with red/yellow/green dots
 * - File path header
 * - Monospace text with primary color for commands
 * - 5 project rows with animated progress bars
 * - Progress bar color coding (green/cyan/yellow/red)
 * - Shimmer animation on progress bars
 * - Typing animation for bottom commands
 * - Accessibility attributes
 */

const componentPath = join(process.cwd(), "src/components/sections/Terminal.tsx");

function readComponentFile(): string {
  try {
    return readFileSync(componentPath, "utf-8");
  } catch {
    return "";
  }
}

describe("Terminal Section", () => {
  const componentContent = readComponentFile();

  describe("Component Structure", () => {
    it("should have Terminal section component file", () => {
      assert.ok(componentContent.length > 0, "Terminal.tsx should exist and have content");
    });

    it("should export TerminalSection component", () => {
      assert.ok(
        componentContent.includes("export function TerminalSection"),
        "Should export TerminalSection component"
      );
    });

    it("should be a client component with 'use client' directive", () => {
      assert.ok(
        componentContent.includes('"use client"') || componentContent.includes("'use client'"),
        "Should have 'use client' directive"
      );
    });
  });

  describe("Section Header", () => {
    it("should have TERMINAL heading", () => {
      assert.ok(
        componentContent.includes("TERMINAL"),
        "Should have TERMINAL heading"
      );
    });

    it("should have section description", () => {
      assert.ok(
        componentContent.includes("Active project pipeline") ||
        componentContent.includes("live progress"),
        "Should have section description about active projects"
      );
    });

    it("should use Space Grotesk for heading", () => {
      assert.ok(
        componentContent.includes("font-space-grotesk"),
        "Should use Space Grotesk font for heading"
      );
    });

    it("should have aria-labelledby on section", () => {
      assert.ok(
        componentContent.includes('aria-labelledby="terminal-heading"'),
        "Should have aria-labelledby on section"
      );
    });

    it("should have id='terminal' for anchor navigation", () => {
      assert.ok(
        componentContent.includes('id="terminal"'),
        "Should have id='terminal' for anchor navigation"
      );
    });
  });

  describe("macOS Window Chrome", () => {
    it("should have red window dot (#ff5f56)", () => {
      assert.ok(
        componentContent.includes("#ff5f56") || componentContent.includes("bg-[#ff5f56]"),
        "Should have red window dot (#ff5f56)"
      );
    });

    it("should have yellow window dot (#ffbd2e)", () => {
      assert.ok(
        componentContent.includes("#ffbd2e") || componentContent.includes("bg-[#ffbd2e]"),
        "Should have yellow window dot (#ffbd2e)"
      );
    });

    it("should have green window dot (#27c93f)", () => {
      assert.ok(
        componentContent.includes("#27c93f") || componentContent.includes("bg-[#27c93f]"),
        "Should have green window dot (#27c93f)"
      );
    });

    it("should have window control dots in a flex container", () => {
      assert.ok(
        componentContent.includes("flex items-center gap-2") ||
        componentContent.includes("rounded-full"),
        "Should have window dots styled as circles"
      );
    });

    it("should have file path header", () => {
      assert.ok(
        componentContent.includes("~/projects") ||
        componentContent.includes("zsh") ||
        componentContent.includes("setrox-com"),
        "Should have file path in header"
      );
    });
  });

  describe("Terminal Background", () => {
    it("should have slightly lighter background (#0d0d14)", () => {
      assert.ok(
        componentContent.includes("#0d0d14") || componentContent.includes("bg-[#0d0d14]"),
        "Should have terminal background #0d0d14"
      );
    });
  });

  describe("Terminal Border", () => {
    it("should have 1px solid border using var(--border)", () => {
      assert.ok(
        componentContent.includes("border-[var(--border)]") ||
        componentContent.includes("border var(--border)"),
        "Should use var(--border) for border"
      );
    });

    it("should have rounded-xl border radius", () => {
      assert.ok(
        componentContent.includes("rounded-xl"),
        "Should have rounded-xl border radius"
      );
    });
  });

  describe("Monospace Text", () => {
    it("should use font-mono for terminal content", () => {
      assert.ok(
        componentContent.includes("font-mono"),
        "Should use font-mono for monospace text"
      );
    });

    it("should use var(--primary) for command prompts", () => {
      assert.ok(
        componentContent.includes('text-[var(--primary)]') ||
        componentContent.includes('className="text-[var(--primary)]"'),
        "Should use var(--primary) for command prompts"
      );
    });
  });

  describe("Project Rows", () => {
    it("should have 5 project rows", () => {
      // Count terminalProjects array entries
      const projectMatches = componentContent.match(/name:\s*"[^"]+"/g);
      assert.ok(
        projectMatches && projectMatches.length >= 5,
        "Should have at least 5 projects defined"
      );
    });

    it("should have ProjectRow component", () => {
      assert.ok(
        componentContent.includes("function ProjectRow"),
        "Should have ProjectRow component"
      );
    });

    it("should map through terminalProjects", () => {
      assert.ok(
        componentContent.includes("terminalProjects.map"),
        "Should map through terminalProjects array"
      );
    });

    it("should display project names", () => {
      assert.ok(
        componentContent.includes("project.name"),
        "Should display project.name"
      );
    });

    it("should display project progress", () => {
      assert.ok(
        componentContent.includes("project.progress"),
        "Should display project.progress"
      );
    });
  });

  describe("Progress Bar Colors", () => {
    it("should have getProgressColor function", () => {
      assert.ok(
        componentContent.includes("function getProgressColor"),
        "Should have getProgressColor function"
      );
    });

    it("should use green (#22c55e) for 100% progress", () => {
      assert.ok(
        componentContent.includes('#22c55e'),
        "Should use green (#22c55e) for 100% progress"
      );
    });

    it("should use cyan (#06b6d4) for 75-99% progress", () => {
      assert.ok(
        componentContent.includes('#06b6d4'),
        "Should use cyan (#06b6d4) for 75-99% progress"
      );
    });

    it("should use yellow (#eab308) for 50-74% progress", () => {
      assert.ok(
        componentContent.includes('#eab308'),
        "Should use yellow (#eab308) for 50-74% progress"
      );
    });

    it("should use red (#ef4444) for <50% progress", () => {
      assert.ok(
        componentContent.includes('#ef4444'),
        "Should use red (#ef4444) for <50% progress"
      );
    });

    it("should have correct color thresholds", () => {
      assert.ok(
        componentContent.includes(">= 100") || componentContent.includes(">=100"),
        "Should check for 100% threshold"
      );
      assert.ok(
        componentContent.includes(">= 75") || componentContent.includes(">=75"),
        "Should check for 75% threshold"
      );
      assert.ok(
        componentContent.includes(">= 50") || componentContent.includes(">=50"),
        "Should check for 50% threshold"
      );
    });
  });

  describe("Progress Bar Animation", () => {
    it("should animate progress from 0 to target", () => {
      assert.ok(
        componentContent.includes("animatedProgress") ||
        componentContent.includes("setAnimatedProgress"),
        "Should animate progress with state"
      );
    });

    it("should use Framer Motion for progress animation", () => {
      assert.ok(
        componentContent.includes("motion.div") ||
        componentContent.includes("framer-motion"),
        "Should use Framer Motion for animations"
      );
    });

    it("should have initial width of 0", () => {
      assert.ok(
        componentContent.includes('initial={{ width: 0 }}') ||
        componentContent.includes('initial: { width: 0 }'),
        "Should start progress bar at width 0"
      );
    });
  });

  describe("Shimmer Animation", () => {
    it("should have shimmer effect on progress bars", () => {
      assert.ok(
        componentContent.includes("animate-shimmer") ||
        componentContent.includes("shimmer"),
        "Should have shimmer animation on progress bars"
      );
    });

    it("should use gradient for shimmer effect", () => {
      assert.ok(
        componentContent.includes("linear-gradient"),
        "Should use linear-gradient for shimmer"
      );
    });
  });

  describe("Typing Animation", () => {
    it("should have TypingCommand component", () => {
      assert.ok(
        componentContent.includes("function TypingCommand"),
        "Should have TypingCommand component"
      );
    });

    it("should have commands array", () => {
      assert.ok(
        componentContent.includes("const commands") ||
        componentContent.includes("git status"),
        "Should have commands array"
      );
    });

    it("should type commands character by character", () => {
      assert.ok(
        componentContent.includes("displayedText") ||
        componentContent.includes("setDisplayedText"),
        "Should type commands character by character"
      );
    });

    it("should have cursor blink effect", () => {
      assert.ok(
        componentContent.includes("showCursor") ||
        componentContent.includes("animate-pulse"),
        "Should have cursor blink effect"
      );
    });

    it("should show command prompt ($)", () => {
      assert.ok(
        componentContent.includes('"$"') || componentContent.includes("$") && componentContent.includes("command"),
        "Should show $ command prompt"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have role=progressbar on progress bars", () => {
      assert.ok(
        componentContent.includes('role="progressbar"'),
        "Should have role=progressbar on progress bars"
      );
    });

    it("should have aria-valuenow on progress bars", () => {
      assert.ok(
        componentContent.includes("aria-valuenow"),
        "Should have aria-valuenow on progress bars"
      );
    });

    it("should have aria-valuemin on progress bars", () => {
      assert.ok(
        componentContent.includes("aria-valuemin"),
        "Should have aria-valuemin on progress bars"
      );
    });

    it("should have aria-valuemax on progress bars", () => {
      assert.ok(
        componentContent.includes("aria-valuemax"),
        "Should have aria-valuemax on progress bars"
      );
    });

    it("should have aria-label on progress bars", () => {
      assert.ok(
        componentContent.includes('aria-label='),
        "Should have aria-label on progress bars"
      );
    });

    it("should have aria-hidden on decorative elements", () => {
      assert.ok(
        componentContent.includes('aria-hidden="true"'),
        "Should have aria-hidden on decorative elements"
      );
    });
  });

  describe("Styling Standards", () => {
    it("should use CSS custom properties for theming", () => {
      assert.ok(
        componentContent.includes("var(--card)") &&
        componentContent.includes("var(--border)") &&
        componentContent.includes("var(--primary)"),
        "Should use CSS custom properties"
      );
    });

    it("should use tabular-nums for percentage numbers", () => {
      assert.ok(
        componentContent.includes("tabular-nums"),
        "Should use tabular-nums for numeric alignment"
      );
    });

    it("should use GPU-accelerated animations (transform/opacity)", () => {
      const hasTransform = componentContent.includes("translate") ||
                          componentContent.includes("scale") ||
                          componentContent.includes("width");
      const hasOpacity = componentContent.includes("opacity");
      assert.ok(
        hasTransform || hasOpacity,
        "Should use GPU-accelerated animations"
      );
    });
  });

  describe("Animation Standards", () => {
    it("should use cubic-bezier easing for entrances", () => {
      assert.ok(
        componentContent.includes("0.16, 1, 0.3, 1"),
        "Should use cubic-bezier(0.16, 1, 0.3, 1) for entrance animations"
      );
    });

    it("should have staggered entrance animations", () => {
      assert.ok(
        componentContent.includes("index * 0.1") ||
        componentContent.includes("index * 150"),
        "Should have staggered entrance animations"
      );
    });
  });
});
