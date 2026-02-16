import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const techStackPath = join(process.cwd(), "src/components/sections/TechStack.tsx");
const techStackContent = readFileSync(techStackPath, "utf-8");

describe("TechStack Section", () => {
  describe("Component Structure", () => {
    it("should export TechStackSection function", () => {
      assert.ok(
        techStackContent.includes("export function TechStackSection()"),
        "Should export TechStackSection function"
      );
    });

    it("should have 'use client' directive", () => {
      assert.ok(
        techStackContent.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });

    it("should import motion from framer-motion", () => {
      assert.ok(
        techStackContent.includes('import { motion } from "framer-motion"'),
        "Should import motion from framer-motion"
      );
    });

    it("should import cn utility", () => {
      assert.ok(
        techStackContent.includes('import { cn } from "@/lib/utils"'),
        "Should import cn utility"
      );
    });
  });

  describe("Section Header", () => {
    it("should have section element with id='stack'", () => {
      assert.ok(
        techStackContent.includes('id="stack"'),
        "Should have section with id='stack'"
      );
    });

    it("should have h2 with 'STACK' heading", () => {
      assert.ok(
        techStackContent.includes(">STACK</h2>"),
        "Should have h2 heading 'STACK'"
      );
    });

    it("should have aria-labelledby attribute", () => {
      assert.ok(
        techStackContent.includes('aria-labelledby="stack-heading"'),
        "Should have aria-labelledby attribute"
      );
    });

    it("should have 'Built With' subtitle", () => {
      assert.ok(
        techStackContent.includes(">Built With</p>"),
        "Should have 'Built With' subtitle"
      );
    });

    it("should use Space Grotesk font for heading", () => {
      assert.ok(
        techStackContent.includes('fontFamily: "var(--font-space-grotesk)"'),
        "Should use Space Grotesk font for heading"
      );
    });
  });

  describe("Technology Badges", () => {
    const expectedTechnologies = [
      "Node.js",
      "React",
      "Python",
      "Docker",
      "PostgreSQL",
      "Tailscale",
      "Cloudflare",
      "Grafana",
      "Prometheus",
      "Discord.js",
      "n8n",
      "Ollama",
      "Next.js",
      "Express",
    ];

    it("should have all 14 technologies defined", () => {
      assert.ok(
        techStackContent.includes("const technologies ="),
        "Should have technologies array"
      );

      for (const tech of expectedTechnologies) {
        assert.ok(
          techStackContent.includes(`name: "${tech}"`),
          `Should include ${tech}`
        );
      }
    });

    it("should have exactly 14 technologies", () => {
      const nameMatches = techStackContent.match(/name: "[^"]+"/g);
      assert.ok(
        nameMatches && nameMatches.length === 14,
        `Should have exactly 14 technologies, found ${nameMatches?.length || 0}`
      );
    });

    it("should have TechBadge component", () => {
      assert.ok(
        techStackContent.includes("function TechBadge"),
        "Should have TechBadge component"
      );
    });
  });

  describe("Icons", () => {
    const expectedIcons = [
      "Server",
      "Atom",
      "Code2",
      "Container",
      "Database",
      "Network",
      "Cloud",
      "BarChart3",
      "Activity",
      "MessageSquare",
      "Workflow",
      "Brain",
      "FileCode",
      "SquareStack",
    ];

    it("should import all required Lucide icons", () => {
      for (const icon of expectedIcons) {
        assert.ok(
          techStackContent.includes(icon),
          `Should import ${icon} icon`
        );
      }
    });

    it("should map icons to technologies", () => {
      assert.ok(
        techStackContent.includes("icon: Server"),
        "Should map Server icon to Node.js"
      );
      assert.ok(
        techStackContent.includes("icon: Atom"),
        "Should map Atom icon to React"
      );
      assert.ok(
        techStackContent.includes("icon: Brain"),
        "Should map Brain icon to Ollama"
      );
    });
  });

  describe("Glassmorphism Styling", () => {
    it("should use backdrop-blur for glassmorphism", () => {
      assert.ok(
        techStackContent.includes("backdrop-blur-md"),
        "Should use backdrop-blur-md for glassmorphism"
      );
    });

    it("should use semi-transparent background", () => {
      assert.ok(
        techStackContent.includes("bg-[var(--card)]/60"),
        "Should use semi-transparent card background"
      );
    });

    it("should use border with CSS variable", () => {
      assert.ok(
        techStackContent.includes("border-[var(--border)]"),
        "Should use border with CSS variable"
      );
    });
  });

  describe("Horizontal Scroll Container", () => {
    it("should have overflow-x-auto for horizontal scroll", () => {
      assert.ok(
        techStackContent.includes("overflow-x-auto"),
        "Should have overflow-x-auto for horizontal scroll"
      );
    });

    it("should have flex display for horizontal layout", () => {
      assert.ok(
        techStackContent.includes("flex gap-3"),
        "Should use flex with gap for horizontal layout"
      );
    });

    it("should hide scrollbar", () => {
      assert.ok(
        techStackContent.includes("scrollbar-hide") ||
        techStackContent.includes("::-webkit-scrollbar"),
        "Should hide scrollbar"
      );
    });
  });

  describe("Hover Effects", () => {
    it("should have hover scale effect", () => {
      assert.ok(
        techStackContent.includes("hover:scale-105"),
        "Should have hover:scale-105 effect"
      );
    });

    it("should have hover border color change", () => {
      assert.ok(
        techStackContent.includes("hover:border-[var(--primary)]/50"),
        "Should have hover border color change"
      );
    });

    it("should have transition for hover effects", () => {
      assert.ok(
        techStackContent.includes("transition-all duration-200"),
        "Should have transition for hover effects"
      );
    });
  });

  describe("Animations", () => {
    it("should use motion.div for animations", () => {
      assert.ok(
        techStackContent.includes("<motion.div"),
        "Should use motion.div for animations"
      );
    });

    it("should have staggered entrance animations", () => {
      assert.ok(
        techStackContent.includes("delay: index * 0.03"),
        "Should have staggered entrance animations based on index"
      );
    });

    it("should use custom easing for animations", () => {
      assert.ok(
        techStackContent.includes("ease: [0.16, 1, 0.3, 1]"),
        "Should use custom easing (cubic-bezier) for animations"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        techStackContent.includes('aria-hidden="true"'),
        "Should have aria-hidden on decorative icons"
      );
    });

    it("should use semantic section element", () => {
      assert.ok(
        techStackContent.includes("<section"),
        "Should use semantic section element"
      );
    });

    it("should have proper heading hierarchy with h2", () => {
      assert.ok(
        techStackContent.match(/<h2[\s\S]*?>STACK<\/h2>/),
        "Should have h2 heading for section"
      );
    });
  });

  describe("Visual Display", () => {
    it("should have cursor-default (no links)", () => {
      assert.ok(
        techStackContent.includes("cursor-default"),
        "Should have cursor-default since badges are not links"
      );
    });

    it("should use primary color for icons", () => {
      assert.ok(
        techStackContent.includes('text-[var(--primary)]'),
        "Should use primary color for icons"
      );
    });

    it("should have flex-shrink-0 to prevent badge squishing", () => {
      assert.ok(
        techStackContent.includes("flex-shrink-0"),
        "Should have flex-shrink-0 to prevent badge squishing"
      );
    });

    it("should have whitespace-nowrap for text", () => {
      assert.ok(
        techStackContent.includes("whitespace-nowrap"),
        "Should have whitespace-nowrap for tech names"
      );
    });
  });

  describe("Responsive Design", () => {
    it("should have section padding for different screen sizes", () => {
      assert.ok(
        techStackContent.includes("py-16 sm:py-20 lg:py-24"),
        "Should have responsive section padding"
      );
    });

    it("should have responsive heading sizes", () => {
      assert.ok(
        techStackContent.includes("text-3xl sm:text-4xl"),
        "Should have responsive heading sizes"
      );
    });
  });
});

describe("TechStack Section - Data Validation", () => {
  it("should have technologies as const assertion", () => {
    assert.ok(
      techStackContent.includes("as const"),
      "Should use 'as const' for type safety"
    );
  });

  it("should map all technologies with icons", () => {
    // Check that each technology has an icon property
    const techPattern = /{ name: "([^"]+)", icon: ([A-Za-z0-9]+) }/g;
    const matches = [...techStackContent.matchAll(techPattern)];
    assert.strictEqual(
      matches.length,
      14,
      "Should have 14 technology entries with name and icon"
    );
  });
});
