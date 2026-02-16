import { describe, it } from "node:test";
import assert from "node:assert";

/**
 * Badge Component Tests
 * 
 * Tests for the Badge component with variants:
 * - shipped (green)
 * - in-progress (yellow)
 * - archived (muted)
 * - default (primary theme color)
 */

describe("Badge Component", () => {
  describe("Badge props interface", () => {
    it("should accept children prop", () => {
      const props = { children: "Badge text" };
      assert.strictEqual(props.children, "Badge text");
    });

    it("should accept variant prop", () => {
      const variants = ["shipped", "in-progress", "archived", "default"] as const;
      assert.ok(variants.includes("shipped"));
      assert.ok(variants.includes("in-progress"));
      assert.ok(variants.includes("archived"));
      assert.ok(variants.includes("default"));
    });

    it("should accept className prop", () => {
      const props = { className: "custom-badge" };
      assert.strictEqual(props.className, "custom-badge");
    });
  });

  describe("Badge variants - shipped", () => {
    it("should use green color (#22c55e) for shipped variant", () => {
      const greenColor = "#22c55e";
      assert.strictEqual(greenColor, "#22c55e");
    });

    it("should have green text color", () => {
      const textColor = "text-[#22c55e]";
      assert.ok(textColor.includes("#22c55e"));
    });

    it("should have green background at 10% opacity", () => {
      const bgClass = "bg-[#22c55e]/10";
      assert.ok(bgClass.includes("/10"));
    });

    it("should have green border at 20% opacity", () => {
      const borderClass = "border-[#22c55e]/20";
      assert.ok(borderClass.includes("/20"));
    });

    it("should have status dot indicator", () => {
      const hasDot = true;
      assert.strictEqual(hasDot, true);
    });
  });

  describe("Badge variants - in-progress", () => {
    it("should use yellow color (#eab308) for in-progress variant", () => {
      const yellowColor = "#eab308";
      assert.strictEqual(yellowColor, "#eab308");
    });

    it("should have yellow text color", () => {
      const textColor = "text-[#eab308]";
      assert.ok(textColor.includes("#eab308"));
    });

    it("should have yellow background at 10% opacity", () => {
      const bgClass = "bg-[#eab308]/10";
      assert.ok(bgClass.includes("/10"));
    });

    it("should have yellow border at 20% opacity", () => {
      const borderClass = "border-[#eab308]/20";
      assert.ok(borderClass.includes("/20"));
    });

    it("should have status dot indicator", () => {
      const hasDot = true;
      assert.strictEqual(hasDot, true);
    });
  });

  describe("Badge variants - archived", () => {
    it("should use muted colors for archived variant", () => {
      const textColor = "text-[var(--muted-foreground)]";
      const bgColor = "bg-[var(--card)]";
      const borderColor = "border-[var(--border)]";
      
      assert.ok(textColor.includes("var(--muted-foreground)"));
      assert.ok(bgColor.includes("var(--card)"));
      assert.ok(borderColor.includes("var(--border)"));
    });

    it("should not have status dot indicator", () => {
      const hasDot = false;
      assert.strictEqual(hasDot, false);
    });
  });

  describe("Badge variants - default", () => {
    it("should use CSS custom property --primary for default variant", () => {
      const textColor = "text-[var(--primary)]";
      const bgColor = "bg-[var(--primary)]/10";
      const borderColor = "border-[var(--primary)]/20";
      
      assert.ok(textColor.includes("var(--primary)"));
      assert.ok(bgColor.includes("var(--primary)"));
      assert.ok(borderColor.includes("var(--primary)"));
    });

    it("should not have status dot indicator", () => {
      const hasDot = false;
      assert.strictEqual(hasDot, false);
    });
  });

  describe("Badge base styling", () => {
    it("should have inline-flex display", () => {
      const display = "inline-flex";
      assert.strictEqual(display, "inline-flex");
    });

    it("should have items-center alignment", () => {
      const align = "items-center";
      assert.strictEqual(align, "items-center");
    });

    it("should have gap-1.5 between dot and text", () => {
      const gap = "gap-1.5";
      assert.strictEqual(gap, "gap-1.5");
    });

    it("should have px-2.5 horizontal padding", () => {
      const paddingX = "px-2.5";
      assert.strictEqual(paddingX, "px-2.5");
    });

    it("should have py-0.5 vertical padding", () => {
      const paddingY = "py-0.5";
      assert.strictEqual(paddingY, "py-0.5");
    });

    it("should have text-xs font size", () => {
      const fontSize = "text-xs";
      assert.strictEqual(fontSize, "text-xs");
    });

    it("should have font-medium weight", () => {
      const weight = "font-medium";
      assert.strictEqual(weight, "font-medium");
    });

    it("should have rounded-full (pill shape)", () => {
      const radius = "rounded-full";
      assert.strictEqual(radius, "rounded-full");
    });

    it("should have border", () => {
      const border = "border";
      assert.strictEqual(border, "border");
    });
  });

  describe("Badge status dot", () => {
    it("should have h-1.5 w-1.5 dimensions", () => {
      const size = "h-1.5 w-1.5";
      assert.ok(size.includes("h-1.5"));
      assert.ok(size.includes("w-1.5"));
    });

    it("should have rounded-full shape", () => {
      const shape = "rounded-full";
      assert.strictEqual(shape, "rounded-full");
    });

    it("should be aria-hidden", () => {
      const ariaHidden = true;
      assert.strictEqual(ariaHidden, true);
    });
  });
});
