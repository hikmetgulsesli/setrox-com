/**
 * Homepage Assembly Tests - US-014
 * Tests for layout.tsx and page.tsx integration
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const srcDir = join(process.cwd(), "src");
const appDir = join(srcDir, "app");
const componentsDir = join(srcDir, "components");

describe("Homepage Assembly - US-014", () => {
  describe("layout.tsx", () => {
    const layoutContent = readFileSync(join(appDir, "layout.tsx"), "utf-8");

    it("should import Space Grotesk font", () => {
      assert.ok(layoutContent.includes('import { Space_Grotesk'), "Should import Space_Grotesk");
    });

    it("should import DM Sans font", () => {
      assert.ok(layoutContent.includes('DM_Sans'), "Should import DM_Sans");
    });

    it("should configure Space Grotesk with correct weights", () => {
      assert.ok(layoutContent.includes('weight: ["500", "600", "700"]'), "Should have correct font weights");
    });

    it("should configure DM Sans with correct weights", () => {
      assert.ok(layoutContent.includes('weight: ["400", "500", "700"]'), "Should have correct font weights");
    });

    it("should export viewport metadata", () => {
      assert.ok(layoutContent.includes('export const viewport'), "Should export viewport");
    });

    it("should have Viewport type import", () => {
      assert.ok(layoutContent.includes('Viewport'), "Should import Viewport type");
    });

    it("should configure theme-color for dark mode", () => {
      assert.ok(layoutContent.includes('prefers-color-scheme: dark'), "Should have dark theme-color");
    });

    it("should configure theme-color for light mode", () => {
      assert.ok(layoutContent.includes('prefers-color-scheme: light'), "Should have light theme-color");
    });

    it("should have colorScheme light dark", () => {
      assert.ok(layoutContent.includes('colorScheme: "light dark"'), "Should have colorScheme");
    });

    it("should import Providers from @/lib/providers", () => {
      assert.ok(layoutContent.includes('import { Providers } from "@/lib/providers"'), "Should import Providers");
    });

    it("should wrap children with Providers", () => {
      assert.ok(layoutContent.includes('<Providers>'), "Should have Providers opening tag");
      assert.ok(layoutContent.includes('</Providers>'), "Should have Providers closing tag");
    });

    it("should include CursorGlow component", () => {
      assert.ok(layoutContent.includes('<CursorGlow />'), "Should include CursorGlow");
    });

    it("should have suppressHydrationWarning on html", () => {
      assert.ok(layoutContent.includes('suppressHydrationWarning'), "Should have suppressHydrationWarning");
    });

    it("should have scroll-smooth class on html", () => {
      assert.ok(layoutContent.includes('scroll-smooth'), "Should have scroll-smooth class");
    });

    it("should have lang=en on html", () => {
      assert.ok(layoutContent.includes('lang="en"'), "Should have lang=en");
    });

    it("should have proper metadata title", () => {
      assert.ok(layoutContent.includes('Hikmet Gulsesli'), "Should have name in title");
    });

    it("should have proper metadata description", () => {
      assert.ok(layoutContent.includes('Building autonomous AI agent systems'), "Should have description");
    });

    it("should have OpenGraph metadata", () => {
      assert.ok(layoutContent.includes('openGraph:'), "Should have OpenGraph config");
    });

    it("should have keywords metadata", () => {
      assert.ok(layoutContent.includes('keywords:'), "Should have keywords");
    });

    it("should have authors metadata", () => {
      assert.ok(layoutContent.includes('authors:'), "Should have authors");
    });
  });

  describe("page.tsx", () => {
    const pageContent = readFileSync(join(appDir, "page.tsx"), "utf-8");

    it("should have use client directive", () => {
      assert.ok(pageContent.includes('"use client"'), "Should have use client directive");
    });

    it("should import framer-motion", () => {
      assert.ok(pageContent.includes('from "framer-motion"'), "Should import framer-motion");
    });

    it("should import Navbar", () => {
      assert.ok(pageContent.includes('import { Navbar }'), "Should import Navbar");
    });

    it("should import Hero", () => {
      assert.ok(pageContent.includes('import { Hero }'), "Should import Hero");
    });

    it("should import ProjectsSection", () => {
      assert.ok(pageContent.includes('import { ProjectsSection }'), "Should import ProjectsSection");
    });

    it("should import AgentsSection", () => {
      assert.ok(pageContent.includes('import { AgentsSection }'), "Should import AgentsSection");
    });

    it("should import TerminalSection", () => {
      assert.ok(pageContent.includes('import { TerminalSection }'), "Should import TerminalSection");
    });

    it("should import TechStackSection", () => {
      assert.ok(pageContent.includes('import { TechStackSection }'), "Should import TechStackSection");
    });

    it("should import ContactSection", () => {
      assert.ok(pageContent.includes('import { ContactSection }'), "Should import ContactSection");
    });

    it("should import Footer", () => {
      assert.ok(pageContent.includes('import { Footer }'), "Should import Footer");
    });

    it("should have sectionVariants for animations", () => {
      assert.ok(pageContent.includes('sectionVariants'), "Should have sectionVariants");
    });

    it("should have hidden state in variants", () => {
      assert.ok(pageContent.includes('hidden:'), "Should have hidden state");
    });

    it("should have visible state in variants", () => {
      assert.ok(pageContent.includes('visible:'), "Should have visible state");
    });

    it("should have opacity animation", () => {
      assert.ok(pageContent.includes('opacity:'), "Should animate opacity");
    });

    it("should have y transform animation", () => {
      assert.ok(pageContent.includes('y:'), "Should animate y position");
    });

    it("should use custom easing cubic-bezier", () => {
      assert.ok(pageContent.includes('0.16, 1, 0.3, 1'), "Should use custom easing");
    });

    it("should have staggerChildren in container", () => {
      assert.ok(pageContent.includes('staggerChildren'), "Should have staggerChildren");
    });

    it("should render Navbar component", () => {
      assert.ok(pageContent.includes('<Navbar />'), "Should render Navbar");
    });

    it("should render Hero section", () => {
      assert.ok(pageContent.includes('<Hero />'), "Should render Hero");
    });

    it("should render ProjectsSection", () => {
      assert.ok(pageContent.includes('<ProjectsSection />'), "Should render ProjectsSection");
    });

    it("should render AgentsSection", () => {
      assert.ok(pageContent.includes('<AgentsSection />'), "Should render AgentsSection");
    });

    it("should render TerminalSection", () => {
      assert.ok(pageContent.includes('<TerminalSection />'), "Should render TerminalSection");
    });

    it("should render TechStackSection", () => {
      assert.ok(pageContent.includes('<TechStackSection />'), "Should render TechStackSection");
    });

    it("should render ContactSection", () => {
      assert.ok(pageContent.includes('<ContactSection />'), "Should render ContactSection");
    });

    it("should render Footer", () => {
      assert.ok(pageContent.includes('<Footer />'), "Should render Footer");
    });

    it("should have motion.section for Projects", () => {
      assert.ok(pageContent.includes('motion.section') && pageContent.includes('id="projects"'), "Should have motion.section for projects");
    });

    it("should have motion.section for Agents", () => {
      assert.ok(pageContent.includes('id="agents"'), "Should have agents section id");
    });

    it("should have motion.section for Terminal", () => {
      assert.ok(pageContent.includes('id="terminal"'), "Should have terminal section id");
    });

    it("should have motion.section for TechStack", () => {
      assert.ok(pageContent.includes('id="stack"'), "Should have stack section id");
    });

    it("should have motion.section for Contact", () => {
      assert.ok(pageContent.includes('id="contact"'), "Should have contact section id");
    });

    it("should use initial=hidden for scroll animations", () => {
      assert.ok(pageContent.includes('initial="hidden"'), "Should use initial=hidden");
    });

    it("should use whileInView=visible for scroll animations", () => {
      assert.ok(pageContent.includes('whileInView="visible"'), "Should use whileInView");
    });

    it("should have viewport with once=true", () => {
      assert.ok(pageContent.includes('once: true'), "Should have once: true");
    });

    it("should have viewport margin", () => {
      assert.ok(pageContent.includes('margin:'), "Should have viewport margin");
    });

    it("should have -100px viewport margin", () => {
      assert.ok(pageContent.includes('"-100px"'), "Should have -100px margin");
    });

    it("should apply sectionVariants to motion sections", () => {
      assert.ok(pageContent.includes('variants={sectionVariants}'), "Should apply sectionVariants");
    });

    it("should have correct section order: Hero, Projects, Agents, Terminal, TechStack, Contact", () => {
      const heroIndex = pageContent.indexOf('<Hero />');
      const projectsIndex = pageContent.indexOf('id="projects"');
      const agentsIndex = pageContent.indexOf('id="agents"');
      const terminalIndex = pageContent.indexOf('id="terminal"');
      const stackIndex = pageContent.indexOf('id="stack"');
      const contactIndex = pageContent.indexOf('id="contact"');

      assert.ok(heroIndex < projectsIndex, "Hero should come before Projects");
      assert.ok(projectsIndex < agentsIndex, "Projects should come before Agents");
      assert.ok(agentsIndex < terminalIndex, "Agents should come before Terminal");
      assert.ok(terminalIndex < stackIndex, "Terminal should come before TechStack");
      assert.ok(stackIndex < contactIndex, "TechStack should come before Contact");
    });

    it("should have max-w-[1200px] container", () => {
      assert.ok(pageContent.includes('max-w-[1200px]'), "Should have max-w-[1200px]");
    });

    it("should have mx-auto for centering", () => {
      assert.ok(pageContent.includes('mx-auto'), "Should have mx-auto");
    });

    it("should have responsive padding", () => {
      assert.ok(pageContent.includes('px-4'), "Should have px-4");
      assert.ok(pageContent.includes('sm:px-6'), "Should have sm:px-6");
      assert.ok(pageContent.includes('lg:px-8'), "Should have lg:px-8");
    });
  });

  describe("globals.css", () => {
    const cssContent = readFileSync(join(appDir, "globals.css"), "utf-8");

    it("should have scroll-behavior: smooth on html", () => {
      assert.ok(cssContent.includes('scroll-behavior: smooth'), "Should have smooth scroll");
    });

    it("should have reduced motion media query", () => {
      assert.ok(cssContent.includes('prefers-reduced-motion: reduce'), "Should have reduced motion");
    });

    it("should disable animations for reduced motion", () => {
      assert.ok(cssContent.includes('animation-duration: 0.01ms'), "Should disable animations");
    });
  });

  describe("Footer Component", () => {
    const footerContent = readFileSync(join(componentsDir, "sections/Footer.tsx"), "utf-8");

    it("should export Footer function", () => {
      assert.ok(footerContent.includes('export function Footer'), "Should export Footer");
    });

    it("should have semantic footer element", () => {
      assert.ok(footerContent.includes('<footer'), "Should have footer element");
    });

    it("should have role=contentinfo", () => {
      assert.ok(footerContent.includes('role="contentinfo"'), "Should have contentinfo role");
    });

    it("should have aria-label", () => {
      assert.ok(footerContent.includes('aria-label="Footer"'), "Should have aria-label");
    });

    it("should import agentCount from data", () => {
      assert.ok(footerContent.includes('import { agentCount } from "@/data/agents"'), "Should import agentCount");
    });

    it("should display dynamic agent count", () => {
      assert.ok(footerContent.includes('{agentCount}'), "Should display agentCount");
    });

    it("should have copyright text", () => {
      assert.ok(footerContent.includes('©'), "Should have copyright symbol");
    });

    it("should have OpenClaw attribution", () => {
      assert.ok(footerContent.includes('Built with OpenClaw'), "Should have OpenClaw attribution");
    });
  });

  describe("Theme Context Integration", () => {
    const providersContent = readFileSync(join(srcDir, "lib/providers.tsx"), "utf-8");

    it("should import NextThemesProvider", () => {
      assert.ok(providersContent.includes('ThemeProvider as NextThemesProvider'), "Should import NextThemesProvider");
    });

    it("should import AccentThemeProvider", () => {
      assert.ok(providersContent.includes('import { ThemeProvider as AccentThemeProvider }'), "Should import AccentThemeProvider");
    });

    it("should wrap with NextThemesProvider", () => {
      assert.ok(providersContent.includes('<NextThemesProvider'), "Should have NextThemesProvider");
    });

    it("should wrap with AccentThemeProvider", () => {
      assert.ok(providersContent.includes('<AccentThemeProvider'), "Should have AccentThemeProvider");
    });

    it("should have attribute=class for next-themes", () => {
      assert.ok(providersContent.includes('attribute="class"'), "Should have attribute=class");
    });

    it("should have defaultTheme=dark", () => {
      assert.ok(providersContent.includes('defaultTheme="dark"'), "Should have defaultTheme=dark");
    });
  });
});
