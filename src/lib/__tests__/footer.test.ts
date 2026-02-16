import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Footer Component", () => {
  const footerPath = join(process.cwd(), "src/components/sections/Footer.tsx");
  const footerContent = readFileSync(footerPath, "utf-8");

  describe("Component Structure", () => {
    it("should have 'use client' directive", () => {
      assert.ok(footerContent.includes('"use client"'), "Missing 'use client' directive");
    });

    it("should import agentCount from @/data/agents", () => {
      assert.ok(
        footerContent.includes('import { agentCount } from "@/data/agents"'),
        "Missing agentCount import"
      );
    });

    it("should import cn utility from @/lib/utils", () => {
      assert.ok(
        footerContent.includes('import { cn } from "@/lib/utils"'),
        "Missing cn import"
      );
    });

    it("should export Footer function component", () => {
      assert.ok(
        footerContent.includes("export function Footer()"),
        "Missing Footer export"
      );
    });
  });

  describe("Footer Element", () => {
    it("should use footer semantic element", () => {
      assert.ok(footerContent.includes("<footer"), "Missing footer element");
    });

    it("should have role=contentinfo for accessibility", () => {
      assert.ok(
        footerContent.includes('role="contentinfo"'),
        "Missing role=contentinfo"
      );
    });

    it("should have aria-label for accessibility", () => {
      assert.ok(
        footerContent.includes('aria-label="Footer"'),
        "Missing aria-label"
      );
    });

    it("should have top border using var(--border)", () => {
      assert.ok(
        footerContent.includes('"border-t"') || footerContent.includes("border-t"),
        "Missing border-t class"
      );
      assert.ok(
        footerContent.includes('border-[var(--border)]'),
        "Missing border-[var(--border)]"
      );
    });

    it("should have centered text", () => {
      assert.ok(
        footerContent.includes('"text-center"') || footerContent.includes("text-center"),
        "Missing text-center class"
      );
    });

    it("should have py-6 padding", () => {
      assert.ok(
        footerContent.includes('"py-6"') || footerContent.includes("py-6"),
        "Missing py-6 padding"
      );
    });
  });

  describe("Copyright Text", () => {
    it("should contain copyright symbol", () => {
      assert.ok(footerContent.includes("©"), "Missing copyright symbol");
    });

    it("should contain year 2026", () => {
      assert.ok(footerContent.includes("2026"), "Missing year 2026");
    });

    it("should contain Hikmet Gulsesli", () => {
      assert.ok(
        footerContent.includes("Hikmet Gulsesli"),
        "Missing name Hikmet Gulsesli"
      );
    });

    it("should contain 'All rights reserved'", () => {
      assert.ok(
        footerContent.includes("All rights reserved"),
        "Missing 'All rights reserved'"
      );
    });
  });

  describe("Attribution Text", () => {
    it("should contain 'Built with OpenClaw'", () => {
      assert.ok(
        footerContent.includes("Built with OpenClaw"),
        "Missing 'Built with OpenClaw'"
      );
    });

    it("should contain 'Powered by' text", () => {
      assert.ok(
        footerContent.includes("Powered by"),
        "Missing 'Powered by'"
      );
    });

    it("should use dynamic agentCount variable", () => {
      assert.ok(
        footerContent.includes("{agentCount}"),
        "Missing dynamic agentCount"
      );
    });

    it("should contain 'AI agents' text", () => {
      assert.ok(
        footerContent.includes("AI agents"),
        "Missing 'AI agents'"
      );
    });
  });

  describe("Styling", () => {
    it("should use text-sm for small text", () => {
      assert.ok(
        footerContent.includes('"text-sm"') || footerContent.includes("text-sm"),
        "Missing text-sm class"
      );
    });

    it("should use --text-muted color via var(--muted-foreground)", () => {
      assert.ok(
        footerContent.includes('text-[var(--muted-foreground)]'),
        "Missing muted text color"
      );
    });
  });

  describe("Single Line Format", () => {
    it("should use single paragraph element", () => {
      const pCount = (footerContent.match(/<p/g) || []).length;
      assert.strictEqual(pCount, 1, "Should have exactly one paragraph element");
    });

    it("should use middle dot separator", () => {
      assert.ok(
        footerContent.includes("·"),
        "Missing middle dot separator"
      );
    });
  });
});

describe("Footer Page Integration", () => {
  const pagePath = join(process.cwd(), "src/app/page.tsx");
  const pageContent = readFileSync(pagePath, "utf-8");

  it("should import Footer component", () => {
    assert.ok(
      pageContent.includes('import { Footer } from "@/components/sections/Footer"'),
      "Missing Footer import in page.tsx"
    );
  });

  it("should use Footer component", () => {
    assert.ok(
      pageContent.includes("<Footer />"),
      "Missing Footer usage in page.tsx"
    );
  });

  it("should not have inline footer anymore", () => {
    assert.ok(
      !pageContent.includes('<footer className="pt-12 border-t'),
      "Should not have inline footer element"
    );
  });
});

describe("Footer UI Export", () => {
  const indexPath = join(process.cwd(), "src/components/ui/index.ts");
  const indexContent = readFileSync(indexPath, "utf-8");

  it("should export Footer from ui/index.ts", () => {
    assert.ok(
      indexContent.includes('export { Footer } from "../sections/Footer"'),
      "Missing Footer export in ui/index.ts"
    );
  });
});

describe("Agent Count Data", () => {
  const agentsPath = join(process.cwd(), "src/data/agents.ts");
  const agentsContent = readFileSync(agentsPath, "utf-8");

  it("should export agentCount constant", () => {
    assert.ok(
      agentsContent.includes("export const agentCount"),
      "Missing agentCount export"
    );
  });

  it("should calculate agentCount from agents array", () => {
    assert.ok(
      agentsContent.includes("agents.length"),
      "agentCount should use agents.length"
    );
  });
});
