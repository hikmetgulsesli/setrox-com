import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Agents Section Tests
 * 
 * Tests for the Agents section component:
 * - Section header with AGENTS heading
 * - Responsive grid (4-col desktop, 2-col mobile)
 * - Agent cards with emoji, name, role, model badge
 * - Green pulsing status dot
 * - Agent-specific hover colors
 * - Accessibility attributes
 */

const componentPath = join(process.cwd(), "src/components/sections/Agents.tsx");
const dataPath = join(process.cwd(), "src/data/agents.ts");

function readComponentFile(): string {
  try {
    return readFileSync(componentPath, "utf-8");
  } catch {
    return "";
  }
}

function readDataFile(): string {
  try {
    return readFileSync(dataPath, "utf-8");
  } catch {
    return "";
  }
}

describe("Agents Section", () => {
  const componentContent = readComponentFile();
  const dataContent = readDataFile();

  describe("Component Structure", () => {
    it("should have Agents section component file", () => {
      assert.ok(componentContent.length > 0, "Agents.tsx should exist and have content");
    });

    it("should export AgentsSection component", () => {
      assert.ok(
        componentContent.includes("export function AgentsSection") ||
        componentContent.includes("export const AgentsSection"),
        "Should export AgentsSection component"
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
    it("should have AGENTS heading", () => {
      assert.ok(
        componentContent.includes("AGENTS"),
        "Should have AGENTS heading"
      );
    });

    it("should have section description 'The OpenClaw Team'", () => {
      assert.ok(
        componentContent.includes("The OpenClaw Team"),
        "Should have 'The OpenClaw Team' description"
      );
    });

    it("should use agentCount for dynamic count in description", () => {
      assert.ok(
        componentContent.includes("agentCount"),
        "Should use agentCount for dynamic count"
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
        componentContent.includes('aria-labelledby="agents-heading"'),
        "Should have aria-labelledby on section"
      );
    });

    it("should have id='agents' for anchor navigation", () => {
      assert.ok(
        componentContent.includes('id="agents"'),
        "Should have id='agents' for anchor navigation"
      );
    });
  });

  describe("Responsive Grid", () => {
    it("should have 2 columns on mobile", () => {
      assert.ok(
        componentContent.includes("grid-cols-2"),
        "Should have grid-cols-2 for mobile"
      );
    });

    it("should have 4 columns on desktop (lg)", () => {
      assert.ok(
        componentContent.includes("lg:grid-cols-4"),
        "Should have lg:grid-cols-4 for desktop"
      );
    });
  });

  describe("Agent Card Structure", () => {
    it("should import agents data", () => {
      assert.ok(
        componentContent.includes('from "@/data/agents"') ||
        componentContent.includes("from '@/data/agents'"),
        "Should import from @/data/agents"
      );
    });

    it("should map through agents array", () => {
      assert.ok(
        componentContent.includes("agents.map"),
        "Should map through agents array"
      );
    });

    it("should have H3 for agent name", () => {
      assert.ok(
        componentContent.includes("<h3") && componentContent.includes("agent.name"),
        "Should have H3 for agent name"
      );
    });

    it("should display agent role", () => {
      assert.ok(
        componentContent.includes("agent.role"),
        "Should display agent role"
      );
    });

    it("should display agent model badge", () => {
      assert.ok(
        componentContent.includes("agent.model"),
        "Should display agent model"
      );
    });

    it("should display agent description with line-clamp", () => {
      assert.ok(
        componentContent.includes("agent.description"),
        "Should display agent description"
      );
      assert.ok(
        componentContent.includes("line-clamp-2"),
        "Should have line-clamp-2 for 1-2 lines"
      );
    });
  });

  describe("Status Dot", () => {
    it("should have green pulsing status dot", () => {
      assert.ok(
        componentContent.includes("bg-green-500"),
        "Should have green background for status dot"
      );
    });

    it("should have pulse animation", () => {
      assert.ok(
        componentContent.includes("animate-pulse") || componentContent.includes("animate-ping"),
        "Should have pulse animation for status dot"
      );
    });

    it("should have aria-label for status", () => {
      assert.ok(
        componentContent.includes('aria-label="Online"'),
        "Should have aria-label='Online' for status"
      );
    });
  });

  describe("Agent Icon", () => {
    it("should import Lucide icons", () => {
      assert.ok(
        componentContent.includes('from "lucide-react"') ||
        componentContent.includes("from 'lucide-react'"),
        "Should import from lucide-react"
      );
    });

    it("should have icon map for agent icons", () => {
      assert.ok(
        componentContent.includes("iconMap"),
        "Should have iconMap for agent icons"
      );
    });

    it("should scale icon on hover", () => {
      assert.ok(
        componentContent.includes("group-hover:scale-110"),
        "Should scale icon on hover with group-hover:scale-110"
      );
    });
  });

  describe("Agent-Specific Hover Colors", () => {
    it("should use agent.color for hover styling", () => {
      assert.ok(
        componentContent.includes("agent.color"),
        "Should use agent.color for hover styling"
      );
    });

    it("should set CSS custom property for hover color", () => {
      assert.ok(
        componentContent.includes("--agent-hover-color"),
        "Should set --agent-hover-color CSS custom property"
      );
    });

    it("should have hover border color change", () => {
      assert.ok(
        componentContent.includes("border-color") || componentContent.includes("hover:border"),
        "Should change border color on hover"
      );
    });
  });

  describe("Hover Effects", () => {
    it("should have card lift effect on hover", () => {
      assert.ok(
        componentContent.includes("hover:-translate-y-1"),
        "Should have hover:-translate-y-1 for lift effect"
      );
    });

    it("should use transform-only animation", () => {
      const hasTransform = componentContent.includes("translate-y") || 
                           componentContent.includes("scale");
      assert.ok(hasTransform, "Should use transform for animations");
    });
  });

  describe("Model Badge", () => {
    it("should show MiniMax M2.5 or Kimi K2.5", () => {
      assert.ok(
        componentContent.includes("MiniMax M2.5") || dataContent.includes("MiniMax M2.5"),
        "Should support MiniMax M2.5 model"
      );
      assert.ok(
        componentContent.includes("Kimi K2.5") || dataContent.includes("Kimi K2.5"),
        "Should support Kimi K2.5 model"
      );
    });

    it("should have pill-shaped badge", () => {
      assert.ok(
        componentContent.includes("rounded-full"),
        "Model badge should be pill-shaped (rounded-full)"
      );
    });
  });

  describe("Animation", () => {
    it("should use Framer Motion for entrance animations", () => {
      assert.ok(
        componentContent.includes("motion.article") ||
        componentContent.includes("motion.div"),
        "Should use motion components for animations"
      );
    });

    it("should have staggered entrance animation", () => {
      assert.ok(
        componentContent.includes("delay") && componentContent.includes("index"),
        "Should have staggered entrance animation based on index"
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

    it("should use cursor-pointer on clickable elements", () => {
      assert.ok(
        componentContent.includes("cursor-pointer") || !componentContent.includes("onClick"),
        "Should have cursor-pointer or no click handlers (cards are not clickable)"
      );
    });

    it("should use Geist Mono for headings (font-mono)", () => {
      assert.ok(
        componentContent.includes("font-mono"),
        "Should use font-mono for monospace text"
      );
    });

    it("should have glassmorphism styling", () => {
      assert.ok(
        componentContent.includes("backdrop-blur"),
        "Should have glassmorphism with backdrop-blur"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        componentContent.includes('aria-hidden="true"'),
        "Should have aria-hidden on decorative icons"
      );
    });
  });
});

describe("Agents Data", () => {
  it("should have agents data file", () => {
    const content = readDataFile();
    assert.ok(content.length > 0, "agents.ts should exist");
  });

  it("should export Agent type", () => {
    const content = readDataFile();
    assert.ok(
      content.includes("export interface Agent"),
      "Should export Agent interface"
    );
  });

  it("should export agents array", () => {
    const content = readDataFile();
    assert.ok(
      content.includes("export const agents"),
      "Should export agents array"
    );
  });

  it("should export agentCount", () => {
    const content = readDataFile();
    assert.ok(
      content.includes("export const agentCount"),
      "Should export agentCount"
    );
  });

  it("should have all 10 agents", () => {
    const content = readDataFile();
    // Check for agent names
    const agentNames = ["Arya", "Koda", "Kaan", "Atlas", "Defne", "Sinan", "Elif", "Deniz", "Onur", "Mert"];
    for (const name of agentNames) {
      assert.ok(
        content.includes(name),
        `Should have agent: ${name}`
      );
    }
  });

  it("should have AgentRole type with all roles", () => {
    const content = readDataFile();
    const roles = ["CEO", "Lead Dev", "Sr. FS", "Infra", "Research", "QA/CR", "Backend", "Content", "SRE", "Frontend"];
    for (const role of roles) {
      assert.ok(
        content.includes(role),
        `Should have role: ${role}`
      );
    }
  });

  it("should have AgentModel type with both models", () => {
    const content = readDataFile();
    assert.ok(
      content.includes("MiniMax M2.5"),
      "Should have MiniMax M2.5 model type"
    );
    assert.ok(
      content.includes("Kimi K2.5"),
      "Should have Kimi K2.5 model type"
    );
  });

  it("should have agent-specific colors", () => {
    const content = readDataFile();
    // Check for some agent colors from PRD section 3.4
    const colors = ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#a855f7"];
    for (const color of colors) {
      assert.ok(
        content.includes(color),
        `Should have color: ${color}`
      );
    }
  });
});
