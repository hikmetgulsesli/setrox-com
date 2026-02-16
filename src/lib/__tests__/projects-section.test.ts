import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Projects Section Tests
 * 
 * Tests for the Projects section component:
 * - Filter tabs (all, shipped, in-progress, archived)
 * - Project cards with badges, tags, links
 * - Responsive grid layout
 * - Hover effects and animations
 * - Accessibility attributes
 */

const componentPath = join(process.cwd(), "src/components/sections/Projects.tsx");
const dataPath = join(process.cwd(), "src/data/projects.ts");

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

describe("Projects Section", () => {
  const componentContent = readComponentFile();
  const dataContent = readDataFile();

  describe("Component Structure", () => {
    it("should have Projects section component file", () => {
      assert.ok(componentContent.length > 0, "Projects.tsx should exist and have content");
    });

    it("should export ProjectsSection component", () => {
      assert.ok(
        componentContent.includes("export function ProjectsSection") ||
        componentContent.includes("export const ProjectsSection"),
        "Should export ProjectsSection component"
      );
    });

    it("should be a client component with 'use client' directive", () => {
      assert.ok(
        componentContent.includes('"use client"') || componentContent.includes("'use client'"),
        "Should have 'use client' directive"
      );
    });
  });

  describe("Filter Tabs", () => {
    it("should have all required filter tabs defined", () => {
      const expectedTabs = ["all", "shipped", "in-progress", "archived"];
      for (const tab of expectedTabs) {
        assert.ok(
          componentContent.includes(tab),
          `Should have filter tab: ${tab}`
        );
      }
    });

    it("should have active tab filled background styling", () => {
      assert.ok(
        componentContent.includes("bg-[var(--primary)]") &&
        componentContent.includes("isActive"),
        "Should have active tab filled background"
      );
    });

    it("should have inactive tab outline styling", () => {
      assert.ok(
        componentContent.includes("border-[var(--border)]") &&
        componentContent.includes("!isActive"),
        "Should have inactive tab outline styling"
      );
    });

    it("should have tab role for accessibility", () => {
      assert.ok(
        componentContent.includes('role="tab"'),
        "Should have role=tab on filter buttons"
      );
      assert.ok(
        componentContent.includes('role="tablist"'),
        "Should have role=tablist on filter container"
      );
      assert.ok(
        componentContent.includes('role="tabpanel"'),
        "Should have role=tabpanel on projects grid"
      );
    });

    it("should have aria-selected for active tab state", () => {
      assert.ok(
        componentContent.includes("aria-selected"),
        "Should have aria-selected attribute"
      );
    });
  });

  describe("Project Cards", () => {
    it("should have year badge (top-left)", () => {
      assert.ok(
        componentContent.includes("project.year"),
        "Should display project year"
      );
    });

    it("should have status badge (top-right)", () => {
      assert.ok(
        componentContent.includes("project.status") &&
        componentContent.includes("Badge"),
        "Should display status badge"
      );
    });

    it("should have title as H3", () => {
      assert.ok(
        componentContent.includes("<h3") &&
        componentContent.includes("project.name"),
        "Should have H3 title with project name"
      );
    });

    it("should have description with 2 lines max", () => {
      assert.ok(
        componentContent.includes("project.description"),
        "Should display project description"
      );
      assert.ok(
        componentContent.includes("line-clamp-2"),
        "Should have line-clamp-2 for 2 lines max"
      );
    });

    it("should have tags as pills", () => {
      assert.ok(
        componentContent.includes("project.tags") &&
        componentContent.includes(".map"),
        "Should map through tags"
      );
      assert.ok(
        componentContent.includes("rounded-full"),
        "Tags should have rounded-full (pill shape)"
      );
    });

    it("should have live and source links", () => {
      assert.ok(
        componentContent.includes("liveUrl") || componentContent.includes("project.liveUrl"),
        "Should have live URL link"
      );
      assert.ok(
        componentContent.includes("sourceUrl") || componentContent.includes("project.sourceUrl"),
        "Should have source URL link"
      );
    });
  });

  describe("Responsive Grid", () => {
    it("should have 1 column on mobile", () => {
      assert.ok(
        componentContent.includes("grid-cols-1"),
        "Should have grid-cols-1 for mobile"
      );
    });

    it("should have 2 columns on tablet (sm)", () => {
      assert.ok(
        componentContent.includes("sm:grid-cols-2"),
        "Should have sm:grid-cols-2 for tablet"
      );
    });

    it("should have 3 columns on desktop (lg)", () => {
      assert.ok(
        componentContent.includes("lg:grid-cols-3"),
        "Should have lg:grid-cols-3 for desktop"
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

    it("should have border glow effect on hover", () => {
      assert.ok(
        componentContent.includes("hover:border-[var(--glow-color-strong)]"),
        "Should have hover border glow with accent color"
      );
    });

    it("should use transform-only animation (no width/height)", () => {
      const hasTransform = componentContent.includes("translate-y") || 
                           componentContent.includes("scale");
      const hasNoWidthHeight = !componentContent.includes("hover:w-") && 
                               !componentContent.includes("hover:h-");
      assert.ok(hasTransform, "Should use transform for animations");
      assert.ok(hasNoWidthHeight, "Should not animate width/height");
    });
  });

  describe("Filter Transitions", () => {
    it("should use AnimatePresence for filter transitions", () => {
      assert.ok(
        componentContent.includes("AnimatePresence"),
        "Should use AnimatePresence for transitions"
      );
    });

    it("should use motion components for animations", () => {
      assert.ok(
        componentContent.includes("motion.article") ||
        componentContent.includes("motion.div"),
        "Should use motion components for animations"
      );
    });

    it("should have exit animation for fade out", () => {
      assert.ok(
        componentContent.includes("exit=") ||
        componentContent.includes("exit={{"),
        "Should have exit animation"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on icon-only buttons", () => {
      assert.ok(
        componentContent.includes('aria-label="'),
        "Should have aria-label on icon buttons"
      );
    });

    it("should have aria-labelledby on section", () => {
      assert.ok(
        componentContent.includes('aria-labelledby="'),
        "Should have aria-labelledby on section"
      );
    });

    it("should have focus-visible ring on interactive elements", () => {
      assert.ok(
        componentContent.includes("focus-visible:ring-2"),
        "Should have focus-visible ring"
      );
    });

    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        componentContent.includes('aria-hidden="true"'),
        "Should have aria-hidden on decorative icons"
      );
    });
  });

  describe("Styling Standards", () => {
    it("should use cursor-pointer on clickable elements", () => {
      assert.ok(
        componentContent.includes("cursor-pointer"),
        "Should have cursor-pointer on clickable elements"
      );
    });

    it("should use CSS custom properties for theming", () => {
      assert.ok(
        componentContent.includes("var(--card)") &&
        componentContent.includes("var(--border)") &&
        componentContent.includes("var(--primary)"),
        "Should use CSS custom properties"
      );
    });

    it("should use Geist Mono for headings (font-mono)", () => {
      assert.ok(
        componentContent.includes("font-mono"),
        "Should use font-mono for monospace text"
      );
    });
  });

  describe("Icons", () => {
    it("should import from lucide-react", () => {
      assert.ok(
        componentContent.includes('from "lucide-react"') ||
        componentContent.includes("from 'lucide-react'"),
        "Should import from lucide-react"
      );
    });

    it("should use ExternalLink icon for live links", () => {
      assert.ok(
        componentContent.includes("ExternalLink"),
        "Should use ExternalLink icon"
      );
    });

    it("should use Github icon for source links", () => {
      assert.ok(
        componentContent.includes("Github"),
        "Should use Github icon"
      );
    });
  });

  describe("Data Integration", () => {
    it("should import projects data", () => {
      assert.ok(
        componentContent.includes('from "@/data/projects"') ||
        componentContent.includes("from '@/data/projects'"),
        "Should import from @/data/projects"
      );
    });

    it("should use projects.length for dynamic count", () => {
      assert.ok(
        componentContent.includes("projects.length"),
        "Should use projects.length for dynamic count"
      );
    });
  });

  describe("Section Header", () => {
    it("should have PROJECTS heading", () => {
      assert.ok(
        componentContent.includes("PROJECTS"),
        "Should have PROJECTS heading"
      );
    });

    it("should have section description", () => {
      assert.ok(
        componentContent.includes("Projects & Open Source"),
        "Should have 'Projects & Open Source' description"
      );
    });

    it("should use Space Grotesk for heading", () => {
      assert.ok(
        componentContent.includes("font-space-grotesk"),
        "Should use Space Grotesk font for heading"
      );
    });
  });
});

describe("Projects Data", () => {
  it("should have projects data file", () => {
    const content = readDataFile();
    assert.ok(content.length > 0, "projects.ts should exist");
  });

  it("should export ProjectStatus type", () => {
    const content = readDataFile();
    assert.ok(
      content.includes("export type ProjectStatus"),
      "Should export ProjectStatus type"
    );
  });

  it("should have all required status values", () => {
    const content = readDataFile();
    assert.ok(content.includes("'shipped'"), "Should have 'shipped' status");
    assert.ok(content.includes("'in-progress'"), "Should have 'in-progress' status");
    assert.ok(content.includes("'archived'"), "Should have 'archived' status");
  });
});
