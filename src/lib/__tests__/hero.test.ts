import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Hero Component Tests
 * 
 * Tests for US-007: Hero Section Component
 * - Superscript label
 * - Gradient text H1
 * - Subtitle
 * - Typing animation
 * - ASCII art terminal boxes
 * - CTA buttons
 * - Stats row with dynamic counts
 * - Fade-in-up animation
 */

const componentPath = join(process.cwd(), "src/components/sections/Hero.tsx");
const agentsDataPath = join(process.cwd(), "src/data/agents.ts");
const projectsDataPath = join(process.cwd(), "src/data/projects.ts");

function readComponentFile(): string {
  try {
    return readFileSync(componentPath, "utf-8");
  } catch {
    return "";
  }
}

function readAgentsDataFile(): string {
  try {
    return readFileSync(agentsDataPath, "utf-8");
  } catch {
    return "";
  }
}

function readProjectsDataFile(): string {
  try {
    return readFileSync(projectsDataPath, "utf-8");
  } catch {
    return "";
  }
}

describe("Hero Component", () => {
  const componentContent = readComponentFile();
  const agentsDataContent = readAgentsDataFile();
  const projectsDataContent = readProjectsDataFile();

  describe("Component Structure", () => {
    it("should have Hero component file", () => {
      assert.ok(componentContent.length > 0, "Hero.tsx should exist and have content");
    });

    it("should export Hero component", () => {
      assert.ok(
        componentContent.includes("export function Hero") ||
        componentContent.includes("export const Hero"),
        "Should export Hero component"
      );
    });

    it("should use 'use client' directive", () => {
      assert.ok(
        componentContent.includes('"use client"') ||
        componentContent.includes("'use client'"),
        "Should use 'use client' directive"
      );
    });
  });

  describe("AC-001: Superscript Label", () => {
    it("should have DEVELOPER & AI ARCHITECT label", () => {
      assert.ok(
        componentContent.includes("Developer & AI Architect") ||
        componentContent.includes("DEVELOPER & AI ARCHITECT"),
        "Should have Developer & AI Architect label"
      );
    });

    it("should use uppercase styling", () => {
      assert.ok(
        componentContent.includes("uppercase"),
        "Label should use uppercase styling"
      );
    });

    it("should use letter-spacing for the label", () => {
      assert.ok(
        componentContent.includes("tracking-") ||
        componentContent.includes("letter-spacing"),
        "Label should use letter-spacing"
      );
    });

    it("should use muted foreground color for label", () => {
      assert.ok(
        componentContent.includes("text-muted-foreground"),
        "Label should use muted foreground color"
      );
    });
  });

  describe("AC-002: H1 with Gradient Text", () => {
    it("should have Hikmet Gulsesli as H1", () => {
      assert.ok(
        componentContent.includes("Hikmet Gulsesli"),
        "Should have Hikmet Gulsesli as H1"
      );
    });

    it("should use h1 element", () => {
      assert.ok(
        componentContent.includes("<h1") || componentContent.includes("motion.h1"),
        "Should use h1 element"
      );
    });

    it("should use gradient text with primary color", () => {
      assert.ok(
        componentContent.includes("bg-gradient-to-r") &&
        componentContent.includes("from-primary"),
        "Should use gradient text with primary color"
      );
    });

    it("should use bg-clip-text for gradient effect", () => {
      assert.ok(
        componentContent.includes("bg-clip-text"),
        "Should use bg-clip-text"
      );
    });

    it("should use text-transparent for gradient effect", () => {
      assert.ok(
        componentContent.includes("text-transparent"),
        "Should use text-transparent"
      );
    });

    it("should use Space Grotesk font", () => {
      assert.ok(
        componentContent.includes("font-space-grotesk") ||
        componentContent.includes("Space Grotesk"),
        "Should use Space Grotesk font"
      );
    });
  });

  describe("AC-003: Subtitle", () => {
    it("should have Founder of OpenClaw subtitle", () => {
      assert.ok(
        componentContent.includes("Founder of OpenClaw"),
        "Should have Founder of OpenClaw subtitle"
      );
    });

    it("should use em-dash prefix", () => {
      assert.ok(
        componentContent.includes("—") || componentContent.includes("&mdash;"),
        "Subtitle should use em-dash prefix"
      );
    });
  });

  describe("AC-004: Tagline with Typing Animation", () => {
    it("should have tagline about autonomous AI agent systems", () => {
      assert.ok(
        componentContent.includes("Building autonomous AI agent systems"),
        "Should have tagline about autonomous AI agent systems"
      );
    });

    it("should include typing animation portion", () => {
      assert.ok(
        componentContent.includes("that work while you sleep"),
        "Should include typing animation portion"
      );
    });

    it("should have TypingEffect component", () => {
      assert.ok(
        componentContent.includes("function TypingEffect") ||
        componentContent.includes("const TypingEffect"),
        "Should have TypingEffect component"
      );
    });

    it("should use Framer Motion for typing animation", () => {
      assert.ok(
        componentContent.includes("framer-motion"),
        "Should import Framer Motion"
      );
    });

    it("should use motion.span for character animation", () => {
      assert.ok(
        componentContent.includes("motion.span"),
        "Should use motion.span for character animation"
      );
    });

    it("should have blinking cursor", () => {
      assert.ok(
        componentContent.includes("animate-pulse") ||
        componentContent.includes("repeat: Infinity"),
        "Should have blinking cursor animation"
      );
    });
  });

  describe("AC-005: ASCII Art Terminal Boxes", () => {
    it("should have AsciiBox component", () => {
      assert.ok(
        componentContent.includes("function AsciiBox") ||
        componentContent.includes("const AsciiBox"),
        "Should have AsciiBox component"
      );
    });

    it("should have FancyAsciiBox component", () => {
      assert.ok(
        componentContent.includes("function FancyAsciiBox") ||
        componentContent.includes("const FancyAsciiBox"),
        "Should have FancyAsciiBox component"
      );
    });

    it("should have two terminal boxes in grid", () => {
      assert.ok(
        componentContent.includes("AsciiBox") &&
        componentContent.includes("FancyAsciiBox"),
        "Should have both terminal box components"
      );
    });

    it("should use monospace font for terminal boxes", () => {
      assert.ok(
        componentContent.includes("font-mono"),
        "Terminal boxes should use monospace font"
      );
    });

    it("should use primary color for terminal borders", () => {
      assert.ok(
        componentContent.includes("text-primary"),
        "Terminal should use primary color"
      );
    });

    it("should display OPENCLAW title in boxes", () => {
      assert.ok(
        componentContent.includes("OPENCLAW"),
        "Should display OPENCLAW title"
      );
    });

    it("should display agents stat", () => {
      assert.ok(
        componentContent.includes('label: "agents:') ||
        componentContent.includes('agents:'),
        "Should display agents stat"
      );
    });

    it("should display projects stat", () => {
      assert.ok(
        componentContent.includes('label: "projects:') ||
        componentContent.includes('projects:'),
        "Should display projects stat"
      );
    });

    it("should display status stat", () => {
      assert.ok(
        componentContent.includes('label: "status:') ||
        componentContent.includes('status:'),
        "Should display status stat"
      );
    });

    it("should display uptime stat", () => {
      assert.ok(
        componentContent.includes('label: "uptime:') ||
        componentContent.includes('uptime:') ||
        componentContent.includes('99.5%'),
        "Should display uptime stat"
      );
    });
  });

  describe("AC-006: CTA Buttons", () => {
    it("should have explore projects button", () => {
      assert.ok(
        componentContent.includes("explore projects"),
        "Should have explore projects button"
      );
    });

    it("should have meet the agents button", () => {
      assert.ok(
        componentContent.includes("meet the agents"),
        "Should have meet the agents button"
      );
    });

    it("should have filled style for explore projects", () => {
      assert.ok(
        componentContent.includes("bg-primary") &&
        componentContent.includes("explore"),
        "Explore projects button should have filled style"
      );
    });

    it("should have outlined style for meet the agents", () => {
      assert.ok(
        componentContent.includes("border") &&
        componentContent.includes("meet the agents"),
        "Meet the agents button should have outlined style"
      );
    });

    it("should have cursor-pointer on buttons", () => {
      assert.ok(
        componentContent.includes("cursor-pointer"),
        "Buttons should have cursor-pointer"
      );
    });

    it("should have hover states on buttons", () => {
      assert.ok(
        componentContent.includes("hover:") ||
        componentContent.includes("whileHover"),
        "Buttons should have hover states"
      );
    });

    it("should have focus-visible rings on buttons", () => {
      assert.ok(
        componentContent.includes("focus-visible:ring"),
        "Buttons should have focus-visible rings"
      );
    });

    it("should scroll to projects section", () => {
      assert.ok(
        componentContent.includes('scrollToSection("projects")') ||
        componentContent.includes('getElementById("projects")') ||
        componentContent.includes('"projects"'),
        "Should scroll to projects section"
      );
    });

    it("should scroll to agents section", () => {
      assert.ok(
        componentContent.includes('scrollToSection("agents")') ||
        componentContent.includes('getElementById("agents")') ||
        componentContent.includes('"agents"'),
        "Should scroll to agents section"
      );
    });

    it("should have aria-label on buttons", () => {
      assert.ok(
        componentContent.includes('aria-label="Explore projects"') ||
        componentContent.includes('aria-label="Meet the agents"'),
        "Buttons should have aria-label"
      );
    });

    it("should use ArrowRight icon", () => {
      assert.ok(
        componentContent.includes("ArrowRight"),
        "Should use ArrowRight icon from Lucide"
      );
    });
  });

  describe("AC-007: Stats Row", () => {
    it("should display agent count from data", () => {
      assert.ok(
        agentsDataContent.includes("agentCount") &&
        agentsDataContent.includes("agents.length"),
        "Should derive agent count from data"
      );
    });

    it("should display project count from data", () => {
      assert.ok(
        projectsDataContent.includes("projectCount") &&
        projectsDataContent.includes("projects.length"),
        "Should derive project count from data"
      );
    });

    it("should import agentCount from data", () => {
      assert.ok(
        componentContent.includes("agentCount"),
        "Should import agentCount from data"
      );
    });

    it("should import projectCount from data", () => {
      assert.ok(
        componentContent.includes("projectCount"),
        "Should import projectCount from data"
      );
    });

    it("should display 20GB Server", () => {
      assert.ok(
        componentContent.includes("20GB"),
        "Should display 20GB Server"
      );
    });

    it("should use separator dots between stats", () => {
      assert.ok(
        componentContent.includes("·"),
        "Should use middle dot as separator"
      );
    });

    it("should use Users icon from Lucide", () => {
      assert.ok(
        componentContent.includes("Users"),
        "Should use Users icon"
      );
    });

    it("should use FolderOpen icon from Lucide", () => {
      assert.ok(
        componentContent.includes("FolderOpen"),
        "Should use FolderOpen icon"
      );
    });

    it("should use Server icon from Lucide", () => {
      assert.ok(
        componentContent.includes("Server"),
        "Should use Server icon"
      );
    });

    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        componentContent.includes('aria-hidden="true"'),
        "Decorative icons should have aria-hidden"
      );
    });
  });

  describe("AC-008: Fade-in-up Animation", () => {
    it("should import Framer Motion", () => {
      assert.ok(
        componentContent.includes("framer-motion"),
        "Should import Framer Motion"
      );
    });

    it("should use motion.div for container", () => {
      assert.ok(
        componentContent.includes("motion.div"),
        "Should use motion.div for container"
      );
    });

    it("should have container variants", () => {
      assert.ok(
        componentContent.includes("containerVariants") ||
        componentContent.includes("variants="),
        "Should have container variants"
      );
    });

    it("should have item variants", () => {
      assert.ok(
        componentContent.includes("itemVariants"),
        "Should have item variants"
      );
    });

    it("should have hidden state with opacity 0", () => {
      assert.ok(
        componentContent.includes('opacity: 0'),
        "Should have hidden state with opacity 0"
      );
    });

    it("should have visible state with opacity 1", () => {
      assert.ok(
        componentContent.includes('opacity: 1'),
        "Should have visible state with opacity 1"
      );
    });

    it("should have y offset for fade-in-up", () => {
      assert.ok(
        componentContent.includes('y: 20') ||
        componentContent.includes('y:20'),
        "Should have y offset for fade-in-up"
      );
    });

    it("should use spring easing", () => {
      assert.ok(
        componentContent.includes("0.16, 1, 0.3, 1") ||
        componentContent.includes("ease:"),
        "Should use spring easing"
      );
    });

    it("should have staggered children animation", () => {
      assert.ok(
        componentContent.includes("staggerChildren") ||
        componentContent.includes("delayChildren"),
        "Should have staggered children animation"
      );
    });
  });

  describe("AC-009: Accessibility", () => {
    it("should use semantic section element", () => {
      assert.ok(
        componentContent.includes("<section"),
        "Should use semantic section element"
      );
    });

    it("should have id for anchor navigation", () => {
      assert.ok(
        componentContent.includes('id="home"'),
        "Should have home id for anchor navigation"
      );
    });

    it("should have aria-label on buttons", () => {
      assert.ok(
        componentContent.includes("aria-label"),
        "Should have aria-label on interactive elements"
      );
    });
  });

  describe("AC-010: Responsive Design", () => {
    it("should have responsive text sizes", () => {
      assert.ok(
        componentContent.includes("text-4xl") &&
        componentContent.includes("sm:text-5xl"),
        "Should have responsive text sizes"
      );
    });

    it("should have lg breakpoint text size", () => {
      assert.ok(
        componentContent.includes("lg:text-6xl") ||
        componentContent.includes("lg:text-"),
        "Should have lg breakpoint text size"
      );
    });

    it("should stack terminal boxes on mobile", () => {
      assert.ok(
        componentContent.includes("grid-cols-1") &&
        componentContent.includes("sm:grid-cols-2"),
        "Should stack terminal boxes on mobile"
      );
    });

    it("should stack buttons on mobile", () => {
      assert.ok(
        componentContent.includes("flex-col") &&
        componentContent.includes("sm:flex-row"),
        "Should stack buttons on mobile"
      );
    });
  });

  describe("Data Integration", () => {
    it("should import from @/data/agents", () => {
      assert.ok(
        componentContent.includes('@/data/agents'),
        "Should import from @/data/agents"
      );
    });

    it("should import from @/data/projects", () => {
      assert.ok(
        componentContent.includes('@/data/projects'),
        "Should import from @/data/projects"
      );
    });

    it("should import agents array", () => {
      assert.ok(
        componentContent.includes('agents') &&
        componentContent.includes('@/data/agents'),
        "Should import agents array"
      );
    });

    it("should import projects array", () => {
      assert.ok(
        componentContent.includes('projects') &&
        componentContent.includes('@/data/projects'),
        "Should import projects array"
      );
    });
  });
});
