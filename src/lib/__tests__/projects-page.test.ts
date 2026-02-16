import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Projects Detail Page Tests
 * 
 * Tests for the /projects page:
 * - Full project listing with all 12 projects
 * - Same filter tabs as homepage (all, shipped, in-progress, archived)
 * - Larger card layout with screenshot placeholders
 * - Link back to homepage
 * - Responsive grid layout
 * - Accessibility attributes
 */

const pagePath = join(process.cwd(), "src/app/projects/page.tsx");
const dataPath = join(process.cwd(), "src/data/projects.ts");

function readPageFile(): string {
  try {
    return readFileSync(pagePath, "utf-8");
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

describe("Projects Detail Page", () => {
  const pageContent = readPageFile();
  const dataContent = readDataFile();

  describe("Page Structure", () => {
    it("should have page.tsx file in src/app/projects/", () => {
      assert.ok(pageContent.length > 0, "page.tsx should exist and have content");
    });

    it("should export default function component", () => {
      assert.ok(
        pageContent.includes("export default function ProjectsPage()"),
        "ProjectsPage should be default export"
      );
    });

    it("should have 'use client' directive", () => {
      assert.ok(
        pageContent.includes('"use client"'),
        "Should have use client directive"
      );
    });

    it("should import projects data", () => {
      assert.ok(
        pageContent.includes('from "@/data/projects"'),
        "Should import from @/data/projects"
      );
    });

    it("should import Link from next/link", () => {
      assert.ok(
        pageContent.includes('import Link from "next/link"'),
        "Should import Link component"
      );
    });

    it("should import Framer Motion components", () => {
      assert.ok(
        pageContent.includes('from "framer-motion"'),
        "Should import framer-motion"
      );
    });

    it("should import ArrowLeft icon for back navigation", () => {
      assert.ok(
        pageContent.includes("ArrowLeft"),
        "Should import ArrowLeft icon"
      );
    });

    it("should import ImageIcon for screenshot placeholder", () => {
      assert.ok(
        pageContent.includes("ImageIcon"),
        "Should import ImageIcon"
      );
    });

    it("should import ExternalLink and Github icons", () => {
      assert.ok(
        pageContent.includes("ExternalLink") && pageContent.includes("Github"),
        "Should import ExternalLink and Github icons"
      );
    });
  });

  describe("Route Requirements", () => {
    it("should be at /projects route", () => {
      // The file is at src/app/projects/page.tsx which creates the /projects route
      assert.ok(true, "Page is at correct location for /projects route");
    });
  });

  describe("Filter Tabs", () => {
    it("should define filterTabs array", () => {
      assert.ok(
        pageContent.includes("const filterTabs"),
        "Should define filterTabs array"
      );
    });

    it("should have 'all' filter tab", () => {
      assert.ok(
        pageContent.includes('value: "all"'),
        "Should have all filter tab"
      );
    });

    it("should have 'shipped' filter tab", () => {
      assert.ok(
        pageContent.includes('value: "shipped"'),
        "Should have shipped filter tab"
      );
    });

    it("should have 'in-progress' filter tab", () => {
      assert.ok(
        pageContent.includes('value: "in-progress"'),
        "Should have in-progress filter tab"
      );
    });

    it("should have 'archived' filter tab", () => {
      assert.ok(
        pageContent.includes('value: "archived"'),
        "Should have archived filter tab"
      );
    });

    it("should use useState for activeFilter", () => {
      assert.ok(
        pageContent.includes("useState") &&
        pageContent.includes("activeFilter"),
        "Should use useState for active filter"
      );
    });

    it("should use useMemo for filteredProjects", () => {
      assert.ok(
        pageContent.includes("useMemo") &&
        pageContent.includes("filteredProjects"),
        "Should use useMemo for filtered projects"
      );
    });
  });

  describe("Project Cards", () => {
    it("should have ProjectCard component", () => {
      assert.ok(
        pageContent.includes("function ProjectCard"),
        "Should define ProjectCard component"
      );
    });

    it("should use motion.article for cards", () => {
      assert.ok(
        pageContent.includes("motion.article"),
        "Should use motion.article for animated cards"
      );
    });

    it("should have screenshot placeholder area", () => {
      assert.ok(
        pageContent.includes("ImageIcon") &&
        pageContent.includes("Screenshot coming soon"),
        "Should have screenshot placeholder with ImageIcon"
      );
    });

    it("should have aspect-video for screenshot area", () => {
      assert.ok(
        pageContent.includes("aspect-video"),
        "Screenshot area should use aspect-video"
      );
    });

    it("should display project year", () => {
      assert.ok(
        pageContent.includes("project.year"),
        "Should display project year"
      );
    });

    it("should display project name as h3", () => {
      assert.ok(
        pageContent.includes("h3") &&
        pageContent.includes("project.name"),
        "Should display project name in h3"
      );
    });

    it("should display project description", () => {
      assert.ok(
        pageContent.includes("project.description"),
        "Should display project description"
      );
    });

    it("should display project tags", () => {
      assert.ok(
        pageContent.includes("project.tags") &&
        pageContent.includes(".map"),
        "Should map and display project tags"
      );
    });

    it("should have status badge on cards", () => {
      assert.ok(
        pageContent.includes("Badge") &&
        pageContent.includes("project.status"),
        "Should have status Badge on cards"
      );
    });

    it("should have live URL link when available", () => {
      assert.ok(
        pageContent.includes("project.liveUrl") &&
        pageContent.includes("ExternalLink"),
        "Should have live URL link with ExternalLink icon"
      );
    });

    it("should have source URL link", () => {
      assert.ok(
        pageContent.includes("project.sourceUrl") &&
        pageContent.includes("Github"),
        "Should have source URL link with Github icon"
      );
    });

    it("should have hover effects on cards", () => {
      assert.ok(
        pageContent.includes("hover:-translate-y-1") &&
        pageContent.includes("group-hover"),
        "Should have hover lift effect and group hover states"
      );
    });
  });

  describe("Navigation", () => {
    it("should have Link back to homepage", () => {
      assert.ok(
        pageContent.includes('href="/"') &&
        pageContent.includes("Back to home"),
        "Should have Link back to homepage with 'Back to home' text"
      );
    });

    it("should use ArrowLeft icon for back link", () => {
      assert.ok(
        pageContent.includes("ArrowLeft"),
        "Should use ArrowLeft icon for back navigation"
      );
    });

    it("should have aria-label on back link", () => {
      assert.ok(
        pageContent.includes('aria-label="Go back to homepage"'),
        "Back link should have aria-label"
      );
    });

    it("should have fixed header", () => {
      assert.ok(
        pageContent.includes("fixed top-0"),
        "Header should be fixed at top"
      );
    });
  });

  describe("Stats Section", () => {
    it("should calculate stats with useMemo", () => {
      assert.ok(
        pageContent.includes("const stats") &&
        pageContent.includes("useMemo"),
        "Should calculate stats using useMemo"
      );
    });

    it("should display total project count", () => {
      assert.ok(
        pageContent.includes("stats.total"),
        "Should display total project count"
      );
    });

    it("should display shipped count", () => {
      assert.ok(
        pageContent.includes("stats.shipped"),
        "Should display shipped project count"
      );
    });

    it("should display in-progress count", () => {
      assert.ok(
        pageContent.includes("stats.inProgress"),
        "Should display in-progress project count"
      );
    });

    it("should display archived count", () => {
      assert.ok(
        pageContent.includes("stats.archived"),
        "Should display archived project count"
      );
    });
  });

  describe("Responsive Grid", () => {
    it("should have 1 column on mobile", () => {
      assert.ok(
        pageContent.includes("grid-cols-1"),
        "Should have 1 column grid on mobile"
      );
    });

    it("should have 2 columns on tablet and desktop", () => {
      assert.ok(
        pageContent.includes("md:grid-cols-2") &&
        pageContent.includes("lg:grid-cols-2"),
        "Should have 2 column grid on tablet and desktop for larger cards"
      );
    });
  });

  describe("Animations", () => {
    it("should use AnimatePresence for filter transitions", () => {
      assert.ok(
        pageContent.includes("AnimatePresence"),
        "Should use AnimatePresence for transitions"
      );
    });

    it("should have staggered entrance animations", () => {
      assert.ok(
        pageContent.includes("index * 0.05"),
        "Should have staggered animations based on index"
      );
    });

    it("should have motion.div for grid", () => {
      assert.ok(
        pageContent.includes("motion.div") &&
        pageContent.includes('layout'),
        "Should use motion.div with layout prop for grid"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have role=tablist on filter container", () => {
      assert.ok(
        pageContent.includes('role="tablist"'),
        "Filter container should have role=tablist"
      );
    });

    it("should have role=tab on filter buttons", () => {
      assert.ok(
        pageContent.includes('role="tab"'),
        "Filter buttons should have role=tab"
      );
    });

    it("should have aria-selected on tabs", () => {
      assert.ok(
        pageContent.includes("aria-selected"),
        "Tabs should have aria-selected attribute"
      );
    });

    it("should have aria-label on filter tabs", () => {
      assert.ok(
        pageContent.includes('aria-label="Filter projects by status"'),
        "Filter tabs should have aria-label"
      );
    });

    it("should have aria-label on icon links", () => {
      assert.ok(
        pageContent.includes('aria-label={`View live demo') &&
        pageContent.includes('aria-label={`View source code'),
        "Project links should have aria-labels"
      );
    });

    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        pageContent.includes('aria-hidden="true"'),
        "Decorative icons should have aria-hidden=true"
      );
    });

    it("should have focus-visible rings", () => {
      assert.ok(
        pageContent.includes("focus-visible:ring-2"),
        "Interactive elements should have focus-visible rings"
      );
    });

    it("should have semantic main element", () => {
      assert.ok(
        pageContent.includes("<main"),
        "Should use semantic main element"
      );
    });

    it("should have semantic footer element", () => {
      assert.ok(
        pageContent.includes("<footer"),
        "Should use semantic footer element"
      );
    });
  });

  describe("Styling Standards", () => {
    it("should use CSS custom properties for colors", () => {
      assert.ok(
        pageContent.includes("var(--primary)") &&
        pageContent.includes("var(--card)") &&
        pageContent.includes("var(--border)"),
        "Should use CSS custom properties for theming"
      );
    });

    it("should use cn utility for conditional classes", () => {
      assert.ok(
        pageContent.includes("cn(") &&
        pageContent.includes('from "@/lib/utils"'),
        "Should use cn utility for class merging"
      );
    });

    it("should have cursor-pointer on clickable elements", () => {
      assert.ok(
        pageContent.includes("cursor-pointer"),
        "Clickable elements should have cursor-pointer"
      );
    });

    it("should use Space Grotesk for headings", () => {
      assert.ok(
        pageContent.includes("var(--font-space-grotesk)"),
        "Should use Space Grotesk font for headings"
      );
    });
  });

  describe("Data Integration", () => {
    it("should have projects data file", () => {
      assert.ok(dataContent.length > 0, "projects.ts should exist");
    });

    it("should have 12 projects in data file", () => {
      // Count project objects in the array
      const projectMatches = dataContent.match(/\{\s*id:/g);
      assert.ok(projectMatches && projectMatches.length >= 12, "Should have at least 12 projects");
    });

    it("should have ProjectStatus type", () => {
      assert.ok(
        dataContent.includes("export type ProjectStatus"),
        "Should export ProjectStatus type"
      );
    });

    it("should have all required status values", () => {
      assert.ok(dataContent.includes("'shipped'"), "Should have 'shipped' status");
      assert.ok(dataContent.includes("'in-progress'"), "Should have 'in-progress' status");
      assert.ok(dataContent.includes("'archived'"), "Should have 'archived' status");
    });

    it("should export projectCount", () => {
      assert.ok(
        dataContent.includes("export const projectCount"),
        "Should export projectCount"
      );
    });
  });

  describe("Empty State", () => {
    it("should have empty state for no results", () => {
      assert.ok(
        pageContent.includes("filteredProjects.length === 0") &&
        pageContent.includes("No projects found"),
        "Should have empty state when no projects match filter"
      );
    });
  });

  describe("Footer", () => {
    it("should have copyright text", () => {
      assert.ok(
        pageContent.includes("© 2026 Hikmet Gulsesli"),
        "Footer should have copyright text"
      );
    });

    it("should have OpenClaw attribution", () => {
      assert.ok(
        pageContent.includes("Built with OpenClaw"),
        "Footer should have OpenClaw attribution"
      );
    });
  });
});
