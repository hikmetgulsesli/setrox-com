import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Contact Section Tests
 * 
 * Tests for the Contact/Newsletter section component:
 * - Gradient heading "Let's build autonomous systems together"
 * - Email input with dark styling and accent subscribe button
 * - Reassurance text: No spam · Unsubscribe anytime · Monthly insights
 * - 3 social cards: LinkedIn, X, GitHub
 * - Each card: icon, platform name, handle (/setrox, @setrox, @hikmet)
 * - Cards lift on hover with icon scale
 * - Accessibility attributes
 */

const componentPath = join(process.cwd(), "src/components/sections/Contact.tsx");
const dataPath = join(process.cwd(), "src/data/socials.ts");
const pagePath = join(process.cwd(), "src/app/page.tsx");

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

function readPageFile(): string {
  try {
    return readFileSync(pagePath, "utf-8");
  } catch {
    return "";
  }
}

describe("Contact Section", () => {
  const componentContent = readComponentFile();
  const dataContent = readDataFile();
  const pageContent = readPageFile();

  describe("Component Structure", () => {
    it("should have Contact section component file", () => {
      assert.ok(componentContent.length > 0, "Contact.tsx should exist and have content");
    });

    it("should export ContactSection component", () => {
      assert.ok(
        componentContent.includes("export function ContactSection") ||
        componentContent.includes("export const ContactSection"),
        "Should export ContactSection component"
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
    it("should have gradient heading with 'Let's build autonomous systems together'", () => {
      assert.ok(
        componentContent.includes("Let") && componentContent.includes("build autonomous systems together"),
        "Should have 'Let's build autonomous systems together' heading"
      );
    });

    it("should use gradient text styling", () => {
      assert.ok(
        componentContent.includes("bg-gradient-to-r") &&
        componentContent.includes("bg-clip-text") &&
        componentContent.includes("text-transparent"),
        "Should use gradient text styling"
      );
    });

    it("should use primary color for gradient", () => {
      assert.ok(
        componentContent.includes("from-[var(--primary)]"),
        "Should use --primary for gradient"
      );
    });

    it("should have aria-labelledby on section", () => {
      assert.ok(
        componentContent.includes('aria-labelledby="contact-heading"'),
        "Should have aria-labelledby on section"
      );
    });

    it("should have id='contact' for anchor navigation", () => {
      assert.ok(
        componentContent.includes('id="contact"'),
        "Should have id='contact' for anchor navigation"
      );
    });
  });

  describe("Email Input and Subscribe Button", () => {
    it("should have email input field", () => {
      assert.ok(
        componentContent.includes('type="email"'),
        "Should have email input field"
      );
    });

    it("should have dark styled input background", () => {
      assert.ok(
        componentContent.includes("bg-[var(--card)]"),
        "Should use --card for input background"
      );
    });

    it("should have placeholder text for email", () => {
      assert.ok(
        componentContent.includes("your@email.com") || componentContent.includes("placeholder"),
        "Should have email placeholder"
      );
    });

    it("should have autocomplete attribute for email", () => {
      assert.ok(
        componentContent.includes('autoComplete="email"') || componentContent.includes('autocomplete="email"'),
        "Should have autocomplete='email'"
      );
    });

    it("should have subscribe button", () => {
      assert.ok(
        componentContent.includes("Subscribe") || componentContent.includes("subscribe"),
        "Should have subscribe button"
      );
    });

    it("should use primary color for subscribe button", () => {
      assert.ok(
        componentContent.includes("bg-[var(--primary)]"),
        "Should use --primary for subscribe button background"
      );
    });

    it("should have form element with onSubmit handler", () => {
      assert.ok(
        componentContent.includes("onSubmit") && 
        (componentContent.includes("<form") || componentContent.includes("motion.form")),
        "Should have form with onSubmit handler"
      );
    });
  });

  describe("Reassurance Text", () => {
    it("should have 'No spam' text", () => {
      assert.ok(
        componentContent.includes("No spam"),
        "Should have 'No spam' reassurance text"
      );
    });

    it("should have 'Unsubscribe anytime' text", () => {
      assert.ok(
        componentContent.includes("Unsubscribe anytime"),
        "Should have 'Unsubscribe anytime' reassurance text"
      );
    });

    it("should have 'Monthly insights' text", () => {
      assert.ok(
        componentContent.includes("Monthly insights"),
        "Should have 'Monthly insights' reassurance text"
      );
    });
  });

  describe("Social Cards", () => {
    it("should import socials data", () => {
      assert.ok(
        componentContent.includes('from "@/data/socials"') ||
        componentContent.includes("from '@/data/socials'"),
        "Should import from @/data/socials"
      );
    });

    it("should map through socials array", () => {
      assert.ok(
        componentContent.includes("socials.map"),
        "Should map through socials array"
      );
    });

    it("should have 3 social cards", () => {
      // Check data file has 3 social links
      const linkedinCount = (dataContent.match(/linkedin/g) || []).length;
      const githubCount = (dataContent.match(/github/g) || []).length;
      assert.ok(
        linkedinCount > 0 && githubCount > 0,
        "Should have LinkedIn and GitHub in socials data"
      );
    });

    it("should have LinkedIn card", () => {
      assert.ok(
        dataContent.includes("LinkedIn") && dataContent.includes("/setrox"),
        "Should have LinkedIn with /setrox handle"
      );
    });

    it("should have X/Twitter card", () => {
      assert.ok(
        dataContent.includes("X") && dataContent.includes("@setrox"),
        "Should have X with @setrox handle"
      );
    });

    it("should have GitHub card", () => {
      assert.ok(
        dataContent.includes("GitHub") && 
        (dataContent.includes("@hikmet") || dataContent.includes("hikmetgulsesli")),
        "Should have GitHub with @hikmet handle"
      );
    });

    it("should display social platform name", () => {
      assert.ok(
        componentContent.includes("social.name"),
        "Should display social platform name"
      );
    });

    it("should display social handle", () => {
      assert.ok(
        componentContent.includes("social.handle"),
        "Should display social handle"
      );
    });

    it("should have social card icons", () => {
      assert.ok(
        componentContent.includes("Linkedin") || componentContent.includes("iconMap"),
        "Should have LinkedIn icon"
      );
    });
  });

  describe("Card Hover Effects", () => {
    it("should have card lift effect on hover", () => {
      assert.ok(
        componentContent.includes("hover:-translate-y-1"),
        "Should have hover:-translate-y-1 for lift effect"
      );
    });

    it("should have icon scale on hover", () => {
      assert.ok(
        componentContent.includes("group-hover:scale-110"),
        "Should scale icon on hover with group-hover:scale-110"
      );
    });

    it("should use group class for hover effects", () => {
      assert.ok(
        componentContent.includes("group ") || componentContent.includes('className="group'),
        "Should use group class for hover effects"
      );
    });
  });

  describe("Social Card Links", () => {
    it("should have external links with target='_blank'", () => {
      assert.ok(
        componentContent.includes('target="_blank"'),
        "Should open social links in new tab"
      );
    });

    it("should have rel='noopener noreferrer' for security", () => {
      assert.ok(
        componentContent.includes('rel="noopener noreferrer"'),
        "Should have rel='noopener noreferrer' for security"
      );
    });

    it("should use social.url for link href", () => {
      assert.ok(
        componentContent.includes("social.url"),
        "Should use social.url for link href"
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

    it("should have 3 columns on desktop", () => {
      assert.ok(
        componentContent.includes("sm:grid-cols-3") || componentContent.includes("lg:grid-cols-3"),
        "Should have 3 columns on larger screens"
      );
    });
  });

  describe("Animation", () => {
    it("should use Framer Motion for entrance animations", () => {
      assert.ok(
        componentContent.includes("motion.") ||
        componentContent.includes("motion.form") ||
        componentContent.includes("motion.a"),
        "Should use motion components for animations"
      );
    });

    it("should have staggered entrance animation for social cards", () => {
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

    it("should have cursor-pointer on clickable elements", () => {
      assert.ok(
        componentContent.includes("cursor-pointer"),
        "Should have cursor-pointer on clickable elements"
      );
    });

    it("should have glassmorphism styling", () => {
      assert.ok(
        componentContent.includes("backdrop-blur"),
        "Should have glassmorphism with backdrop-blur"
      );
    });

    it("should have focus-visible ring on interactive elements", () => {
      assert.ok(
        componentContent.includes("focus:ring-2") || componentContent.includes("focus-visible"),
        "Should have focus ring on interactive elements"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on social links", () => {
      assert.ok(
        componentContent.includes('aria-label="') && componentContent.includes("social.name"),
        "Should have aria-label on social links"
      );
    });

    it("should have aria-label on email input", () => {
      assert.ok(
        componentContent.includes('aria-label="') && componentContent.includes("email"),
        "Should have aria-label on email input"
      );
    });

    it("should have aria-hidden on decorative icons", () => {
      assert.ok(
        componentContent.includes('aria-hidden="true"'),
        "Should have aria-hidden on decorative icons"
      );
    });

    it("should use semantic section element", () => {
      assert.ok(
        componentContent.includes("<section"),
        "Should use semantic section element"
      );
    });

    it("should have proper heading hierarchy with h2", () => {
      assert.ok(
        componentContent.includes("<h2"),
        "Should have h2 for section heading"
      );
    });
  });

  describe("Page Integration", () => {
    it("should be imported in page.tsx", () => {
      assert.ok(
        pageContent.includes("ContactSection") || pageContent.includes("from \"@/components/sections/Contact\""),
        "Should import ContactSection in page.tsx"
      );
    });

    it("should be used in page.tsx", () => {
      assert.ok(
        pageContent.includes("<ContactSection") || pageContent.includes("<ContactSection />"),
        "Should use ContactSection component in page.tsx"
      );
    });
  });
});

describe("Socials Data", () => {
  const dataContent = readDataFile();

  it("should have socials data file", () => {
    assert.ok(dataContent.length > 0, "socials.ts should exist");
  });

  it("should export SocialLink type", () => {
    assert.ok(
      dataContent.includes("export interface SocialLink"),
      "Should export SocialLink interface"
    );
  });

  it("should export socials array", () => {
    assert.ok(
      dataContent.includes("export const socials"),
      "Should export socials array"
    );
  });

  it("should export socialCount", () => {
    assert.ok(
      dataContent.includes("export const socialCount"),
      "Should export socialCount"
    );
  });

  it("should have all 3 social links", () => {
    const names = ["LinkedIn", "X", "GitHub"];
    for (const name of names) {
      assert.ok(
        dataContent.includes(name),
        `Should have social link: ${name}`
      );
    }
  });

  it("should have correct handles", () => {
    assert.ok(
      dataContent.includes("/setrox"),
      "Should have LinkedIn handle /setrox"
    );
    assert.ok(
      dataContent.includes("@setrox"),
      "Should have X handle @setrox"
    );
    assert.ok(
      dataContent.includes("@hikmet") || dataContent.includes("hikmetgulsesli"),
      "Should have GitHub handle @hikmet"
    );
  });

  it("should have URLs for all social links", () => {
    assert.ok(
      dataContent.includes("linkedin.com/in/setrox"),
      "Should have LinkedIn URL"
    );
    assert.ok(
      dataContent.includes("x.com/setrox"),
      "Should have X URL"
    );
    assert.ok(
      dataContent.includes("github.com/hikmetgulsesli"),
      "Should have GitHub URL"
    );
  });
});
