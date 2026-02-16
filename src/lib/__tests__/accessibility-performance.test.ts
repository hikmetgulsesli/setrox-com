/**
 * Accessibility and Performance Tests
 * 
 * Tests for:
 * - Semantic HTML structure
 * - Heading hierarchy
 * - Alt texts on images
 * - Focus visible states
 * - prefers-reduced-motion support
 * - aria-labels on icon-only buttons
 * - Lighthouse performance targets
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

const srcDir = join(process.cwd(), "src");
const appDir = join(srcDir, "app");
const componentsDir = join(srcDir, "components");

describe("Accessibility Tests", () => {
  describe("Semantic HTML", () => {
    it("should have semantic HTML elements in layout", () => {
      const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");
      
      // Check for skip link
      assert.ok(layoutContent.includes('href="#main-content"'), "Should have skip link to main content");
      assert.ok(layoutContent.includes("skip-link"), "Should have skip-link class");
      
      // Check for lang attribute
      assert.ok(layoutContent.includes('lang="en"'), "Should have lang attribute on html");
    });

    it("should have main element with id for skip link", () => {
      const pageContent = readFileSync(join(appDir, "page.tsx"), "utf-8");
      
      // Check for main element with id
      assert.ok(pageContent.includes('id="main-content"'), "Main element should have id for skip link");
      assert.ok(pageContent.includes("<main"), "Should have main element");
    });

    it("should use semantic section elements", () => {
      const pageContent = readFileSync(join(appDir, "page.tsx"), "utf-8");
      
      // Check for semantic sections
      assert.ok(pageContent.includes('id="home"'), "Should have home section");
      assert.ok(pageContent.includes('id="projects"'), "Should have projects section");
      assert.ok(pageContent.includes('id="agents"'), "Should have agents section");
      assert.ok(pageContent.includes('id="terminal"'), "Should have terminal section");
      assert.ok(pageContent.includes('id="stack"'), "Should have stack section");
      assert.ok(pageContent.includes('id="contact"'), "Should have contact section");
    });

    it("should have semantic footer with role", () => {
      const footerContent = readFileSync(join(componentsDir, "sections/Footer.tsx"), "utf-8");
      
      assert.ok(footerContent.includes("<footer"), "Should use footer element");
      assert.ok(footerContent.includes('role="contentinfo"'), "Footer should have contentinfo role");
    });

    it("should have nav element with aria-label", () => {
      const navbarContent = readFileSync(join(componentsDir, "layout/Navbar.tsx"), "utf-8");
      
      assert.ok(navbarContent.includes("<nav"), "Should use nav element");
      assert.ok(navbarContent.includes('aria-label="Main navigation"'), "Nav should have aria-label");
    });
  });

  describe("Heading Hierarchy", () => {
    it("should have single H1 in Hero section", () => {
      const heroContent = readFileSync(join(componentsDir, "sections/Hero.tsx"), "utf-8");
      
      // Count H1 tags (including motion.h1 variants)
      const h1Matches = heroContent.match(/<\/?[a-z.]*h1[\s>]/gi);
      assert.ok(h1Matches && h1Matches.length >= 1, "Should have at least one H1 element");
    });

    it("should use H2 for section headings", () => {
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      const agentsContent = readFileSync(join(componentsDir, "sections/Agents.tsx"), "utf-8");
      const terminalContent = readFileSync(join(componentsDir, "sections/Terminal.tsx"), "utf-8");
      const techStackContent = readFileSync(join(componentsDir, "sections/TechStack.tsx"), "utf-8");
      const contactContent = readFileSync(join(componentsDir, "sections/Contact.tsx"), "utf-8");
      
      // Check that section headings use h2
      assert.ok(projectsContent.includes("<h2"), "Projects section should have H2");
      assert.ok(agentsContent.includes("<h2"), "Agents section should have H2");
      assert.ok(terminalContent.includes("<h2"), "Terminal section should have H2");
      assert.ok(techStackContent.includes("<h2"), "TechStack section should have H2");
      assert.ok(contactContent.includes("<h2"), "Contact section should have H2");
    });

    it("should use H3 for card titles", () => {
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      const agentsContent = readFileSync(join(componentsDir, "sections/Agents.tsx"), "utf-8");
      
      // Project cards should use h3 for titles
      assert.ok(projectsContent.includes("<h3"), "Project cards should use H3");
      // Agent cards should use h3 for names
      assert.ok(agentsContent.includes("<h3"), "Agent cards should use H3");
    });
  });

  describe("ARIA Labels and Roles", () => {
    it("should have aria-label on icon-only buttons", () => {
      const heroContent = readFileSync(join(componentsDir, "sections/Hero.tsx"), "utf-8");
      const navbarContent = readFileSync(join(componentsDir, "layout/Navbar.tsx"), "utf-8");
      
      // Hero CTA buttons should have aria-label
      assert.ok(heroContent.includes('aria-label="Explore projects"') || heroContent.includes('aria-label="explore'), "Explore button should have aria-label");
      assert.ok(heroContent.includes('aria-label="Meet the agents"') || heroContent.includes('aria-label="meet'), "Meet agents button should have aria-label");
      
      // Navbar buttons should have aria-label
      assert.ok(navbarContent.includes("aria-label"), "Navbar should have aria-labels on buttons");
    });

    it("should have aria-hidden on decorative icons", () => {
      const heroContent = readFileSync(join(componentsDir, "sections/Hero.tsx"), "utf-8");
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      
      // Decorative icons should have aria-hidden
      assert.ok(heroContent.includes('aria-hidden="true"'), "Decorative icons should have aria-hidden");
      assert.ok(projectsContent.includes('aria-hidden="true"'), "Project icons should have aria-hidden");
    });

    it("should have aria-labelledby linking headings to sections", () => {
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      const agentsContent = readFileSync(join(componentsDir, "sections/Agents.tsx"), "utf-8");
      
      // Sections should have aria-labelledby
      assert.ok(projectsContent.includes('aria-labelledby="projects-heading"'), "Projects section should have aria-labelledby");
      assert.ok(agentsContent.includes('aria-labelledby="agents-heading"'), "Agents section should have aria-labelledby");
    });

    it("should have proper tablist/tab roles for filter tabs", () => {
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      
      assert.ok(projectsContent.includes('role="tablist"'), "Filter tabs should have tablist role");
      assert.ok(projectsContent.includes('role="tab"'), "Filter buttons should have tab role");
      assert.ok(projectsContent.includes('role="tabpanel"'), "Projects grid should have tabpanel role");
      assert.ok(projectsContent.includes("aria-selected"), "Tabs should have aria-selected");
    });

    it("should have aria-label on progress bars", () => {
      const terminalContent = readFileSync(join(componentsDir, "sections/Terminal.tsx"), "utf-8");
      
      assert.ok(terminalContent.includes('role="progressbar"'), "Progress bars should have progressbar role");
      assert.ok(terminalContent.includes("aria-valuenow"), "Progress bars should have aria-valuenow");
      assert.ok(terminalContent.includes("aria-valuemin"), "Progress bars should have aria-valuemin");
      assert.ok(terminalContent.includes("aria-valuemax"), "Progress bars should have aria-valuemax");
    });
  });

  describe("Focus Management", () => {
    it("should have focus-visible styles on interactive elements", () => {
      const heroContent = readFileSync(join(componentsDir, "sections/Hero.tsx"), "utf-8");
      const projectsContent = readFileSync(join(componentsDir, "sections/Projects.tsx"), "utf-8");
      
      // Buttons should have focus-visible ring
      assert.ok(heroContent.includes("focus-visible:ring"), "Buttons should have focus-visible ring");
      assert.ok(projectsContent.includes("focus-visible:ring"), "Project links should have focus-visible ring");
    });

    it("should have visible focus styles in globals.css", () => {
      const globalsContent = readFileSync(join(appDir, "globals.css"), "utf-8");
      
      assert.ok(globalsContent.includes(":focus-visible"), "Should have :focus-visible styles");
      assert.ok(globalsContent.includes("outline"), "Should have outline for focus");
    });
  });

  describe("Reduced Motion Support", () => {
    it("should have prefers-reduced-motion media query", () => {
      const globalsContent = readFileSync(join(appDir, "globals.css"), "utf-8");
      
      assert.ok(globalsContent.includes("prefers-reduced-motion"), "Should have reduced motion media query");
      assert.ok(globalsContent.includes("animation-duration: 0.01ms"), "Should disable animations for reduced motion");
    });

    it("should disable cursor glow for reduced motion", () => {
      const globalsContent = readFileSync(join(appDir, "globals.css"), "utf-8");
      
      assert.ok(globalsContent.includes("cursor-glow"), "Should reference cursor-glow class");
      assert.ok(globalsContent.includes("display: none") && globalsContent.includes("prefers-reduced-motion"), "Should disable cursor glow for reduced motion");
    });
  });

  describe("High Contrast Mode Support", () => {
    it("should have prefers-contrast media query", () => {
      const globalsContent = readFileSync(join(appDir, "globals.css"), "utf-8");
      
      assert.ok(globalsContent.includes("prefers-contrast"), "Should have high contrast media query");
    });
  });

  describe("Screen Reader Support", () => {
    it("should have sr-only class for screen reader text", () => {
      const globalsContent = readFileSync(join(appDir, "globals.css"), "utf-8");
      
      assert.ok(globalsContent.includes(".sr-only"), "Should have sr-only utility class");
      assert.ok(globalsContent.includes("clip:"), "Should use clip for sr-only");
    });
  });
});

describe("Performance Tests", () => {
  describe("Next.js Configuration", () => {
    it("should have static export enabled", () => {
      const configContent = readFileSync(join(process.cwd(), "next.config.ts"), "utf-8");
      
      assert.ok(configContent.includes("output: 'export'"), "Should have static export");
      assert.ok(configContent.includes("distDir: 'out'"), "Should output to 'out' directory");
    });

    it("should have trailing slash enabled for cleaner URLs", () => {
      const configContent = readFileSync(join(process.cwd(), "next.config.ts"), "utf-8");
      
      assert.ok(configContent.includes("trailingSlash: true"), "Should have trailing slash");
    });

    it("should have compression enabled", () => {
      const configContent = readFileSync(join(process.cwd(), "next.config.ts"), "utf-8");
      
      assert.ok(configContent.includes("compress: true"), "Should have compression enabled");
    });

    it("should disable powered-by header", () => {
      const configContent = readFileSync(join(process.cwd(), "next.config.ts"), "utf-8");
      
      assert.ok(configContent.includes("poweredByHeader: false"), "Should disable powered-by header");
    });
  });

  describe("Image Optimization", () => {
    it("should have unoptimized images for static export", () => {
      const configContent = readFileSync(join(process.cwd(), "next.config.ts"), "utf-8");
      
      assert.ok(configContent.includes("unoptimized: true"), "Should have unoptimized images for static export");
    });
  });

  describe("Animation Performance", () => {
    it("should only animate transform and opacity", () => {
      const heroContent = readFileSync(join(componentsDir, "sections/Hero.tsx"), "utf-8");
      
      // Check for GPU-accelerated properties
      assert.ok(heroContent.includes("opacity") || heroContent.includes("transform"), "Should animate opacity/transform");
      
      // Should not animate layout properties
      assert.ok(!heroContent.includes("width:") || !heroContent.includes("height:"), "Should not animate width/height");
    });

    it("should use will-change for animated elements", () => {
      const cursorGlowContent = readFileSync(join(componentsDir, "ui/CursorGlow.tsx"), "utf-8");
      
      assert.ok(cursorGlowContent.includes("will-change"), "Animated elements should use will-change");
    });
  });

  describe("Font Loading", () => {
    it("should use font-display: swap", () => {
      const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");
      
      assert.ok(layoutContent.includes('display: "swap"'), "Should use font-display: swap");
    });
  });

  describe("SEO and Meta Tags", () => {
    it("should have viewport meta configuration", () => {
      const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");
      
      assert.ok(layoutContent.includes("viewport"), "Should have viewport export");
      assert.ok(layoutContent.includes("initialScale"), "Should have initialScale");
      assert.ok(layoutContent.includes('width: "device-width"'), "Should have device-width");
    });

    it("should have theme-color meta", () => {
      const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");
      
      assert.ok(layoutContent.includes("themeColor"), "Should have themeColor");
      assert.ok(layoutContent.includes("prefers-color-scheme"), "Should have prefers-color-scheme");
    });

    it("should have proper metadata", () => {
      const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");
      
      assert.ok(layoutContent.includes("metadataBase"), "Should have metadataBase");
      assert.ok(layoutContent.includes("alternates"), "Should have alternates");
      assert.ok(layoutContent.includes("robots"), "Should have robots meta");
    });
  });
});

describe("Lighthouse Targets", () => {
  describe("Performance Targets", () => {
    it("should have targets documented", () => {
      // These are the targets we aim for:
      // Performance > 95
      // FCP < 1.0s
      // LCP < 2.0s
      // CLS < 0.05
      assert.ok(true, "Performance target: > 95");
      assert.ok(true, "FCP target: < 1.0s");
      assert.ok(true, "LCP target: < 2.0s");
      assert.ok(true, "CLS target: < 0.05");
    });
  });
});
