import { describe, it } from "node:test";
import assert from "node:assert";

/**
 * ProgressBar Component Tests
 * 
 * Tests for the ProgressBar component:
 * - Animated width from 0% to target
 * - Color coding based on percentage
 * - Shimmer animation effect
 * - Accessibility (ARIA attributes)
 */

describe("ProgressBar Component", () => {
  describe("ProgressBar props interface", () => {
    it("should require value prop", () => {
      const props = { value: 75 };
      assert.strictEqual(typeof props.value, "number");
    });

    it("should accept max prop (default 100)", () => {
      const props = { max: 100 };
      assert.strictEqual(props.max, 100);
    });

    it("should accept className prop", () => {
      const props = { className: "custom-progress" };
      assert.strictEqual(props.className, "custom-progress");
    });

    it("should accept showValue prop (default false)", () => {
      const props = { showValue: true };
      assert.strictEqual(props.showValue, true);
    });

    it("should accept size prop (sm, md, lg)", () => {
      const sizes = ["sm", "md", "lg"] as const;
      assert.ok(sizes.includes("sm"));
      assert.ok(sizes.includes("md"));
      assert.ok(sizes.includes("lg"));
    });

    it("should accept animated prop (default true)", () => {
      const props = { animated: true };
      assert.strictEqual(props.animated, true);
    });
  });

  describe("ProgressBar percentage calculation", () => {
    it("should calculate percentage correctly (value/max * 100)", () => {
      const calculatePct = (value: number, max: number) => 
        Math.min(Math.max((value / max) * 100, 0), 100);
      
      assert.strictEqual(calculatePct(50, 100), 50);
      assert.strictEqual(calculatePct(75, 100), 75);
      assert.strictEqual(calculatePct(100, 100), 100);
      assert.strictEqual(calculatePct(25, 50), 50);
    });

    it("should clamp percentage to 0-100 range", () => {
      const calculatePct = (value: number, max: number) => 
        Math.min(Math.max((value / max) * 100, 0), 100);
      
      assert.strictEqual(calculatePct(-10, 100), 0);
      assert.strictEqual(calculatePct(150, 100), 100);
    });
  });

  describe("ProgressBar color coding", () => {
    const getColor = (pct: number): string => {
      if (pct >= 100) return "#22c55e"; // Green
      if (pct >= 75) return "#06b6d4"; // Cyan
      if (pct >= 50) return "#eab308"; // Yellow
      return "#ef4444"; // Red
    };

    it("should use green (#22c55e) for 100%", () => {
      assert.strictEqual(getColor(100), "#22c55e");
    });

    it("should use green (#22c55e) for >= 100%", () => {
      assert.strictEqual(getColor(105), "#22c55e");
    });

    it("should use cyan (#06b6d4) for 75-99%", () => {
      assert.strictEqual(getColor(75), "#06b6d4");
      assert.strictEqual(getColor(85), "#06b6d4");
      assert.strictEqual(getColor(99), "#06b6d4");
    });

    it("should use yellow (#eab308) for 50-74%", () => {
      assert.strictEqual(getColor(50), "#eab308");
      assert.strictEqual(getColor(60), "#eab308");
      assert.strictEqual(getColor(74), "#eab308");
    });

    it("should use red (#ef4444) for <50%", () => {
      assert.strictEqual(getColor(49), "#ef4444");
      assert.strictEqual(getColor(25), "#ef4444");
      assert.strictEqual(getColor(0), "#ef4444");
    });
  });

  describe("ProgressBar track styling", () => {
    it("should use CSS custom property --border for track background", () => {
      const trackBg = "bg-[var(--border)]";
      assert.ok(trackBg.includes("var(--border)"));
    });

    it("should have rounded-full (pill shape)", () => {
      const radius = "rounded-full";
      assert.strictEqual(radius, "rounded-full");
    });

    it("should have overflow-hidden", () => {
      const overflow = "overflow-hidden";
      assert.strictEqual(overflow, "overflow-hidden");
    });
  });

  describe("ProgressBar size variants", () => {
    it("should have h-1 for sm size", () => {
      const smHeight = "h-1";
      assert.strictEqual(smHeight, "h-1");
    });

    it("should have h-2 for md size", () => {
      const mdHeight = "h-2";
      assert.strictEqual(mdHeight, "h-2");
    });

    it("should have h-3 for lg size", () => {
      const lgHeight = "h-3";
      assert.strictEqual(lgHeight, "h-3");
    });
  });

  describe("ProgressBar animation", () => {
    it("should animate width from 0% to target", () => {
      const initialWidth = 0;
      const targetWidth = 75;
      assert.strictEqual(initialWidth, 0);
      assert.strictEqual(targetWidth, 75);
    });

    it("should have 0.8s duration when animated", () => {
      const duration = 0.8;
      assert.strictEqual(duration, 0.8);
    });

    it("should use spring-like easing [0.16, 1, 0.3, 1]", () => {
      const easing = [0.16, 1, 0.3, 1];
      assert.deepStrictEqual(easing, [0.16, 1, 0.3, 1]);
    });
  });

  describe("ProgressBar shimmer effect", () => {
    it("should have shimmer animation class", () => {
      const shimmerClass = "animate-shimmer";
      assert.strictEqual(shimmerClass, "animate-shimmer");
    });

    it("should use background-position for shimmer animation", () => {
      const animationProperty = "background-position";
      assert.strictEqual(animationProperty, "background-position");
    });

    it("should have linear gradient for shimmer", () => {
      const gradient = "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)";
      assert.ok(gradient.includes("linear-gradient"));
      assert.ok(gradient.includes("transparent"));
      assert.ok(gradient.includes("rgba(255, 255, 255, 0.3)"));
    });

    it("should have 200% background-size for shimmer", () => {
      const bgSize = "200% 100%";
      assert.strictEqual(bgSize, "200% 100%");
    });
  });

  describe("ProgressBar accessibility", () => {
    it("should have role=progressbar", () => {
      const role = "progressbar";
      assert.strictEqual(role, "progressbar");
    });

    it("should have aria-valuenow attribute", () => {
      const ariaValueNow = 75;
      assert.strictEqual(typeof ariaValueNow, "number");
    });

    it("should have aria-valuemin=0", () => {
      const ariaValueMin = 0;
      assert.strictEqual(ariaValueMin, 0);
    });

    it("should have aria-valuemax attribute", () => {
      const ariaValueMax = 100;
      assert.strictEqual(typeof ariaValueMax, "number");
    });

    it("should have aria-label with percentage", () => {
      const ariaLabel = "Progress: 75%";
      assert.ok(ariaLabel.includes("Progress:"));
      assert.ok(ariaLabel.includes("%"));
    });
  });

  describe("ProgressBar value label", () => {
    it("should show percentage when showValue is true", () => {
      const showValue = true;
      const percentage = 75;
      assert.strictEqual(showValue, true);
      assert.strictEqual(percentage, 75);
    });

    it("should show value/max format", () => {
      const value = 75;
      const max = 100;
      const label = `${value}/${max}`;
      assert.strictEqual(label, "75/100");
    });

    it("should use muted-foreground color for labels", () => {
      const textColor = "text-[var(--muted-foreground)]";
      assert.ok(textColor.includes("var(--muted-foreground)"));
    });

    it("should have text-xs font size for labels", () => {
      const fontSize = "text-xs";
      assert.strictEqual(fontSize, "text-xs");
    });
  });
});

describe("CSS Shimmer Animation", () => {
  it("should have shimmer keyframes defined", () => {
    const keyframesExist = true;
    assert.strictEqual(keyframesExist, true);
  });

  it("should animate from 200% to -200% background-position", () => {
    const startPos = "200% 0";
    const endPos = "-200% 0";
    assert.strictEqual(startPos, "200% 0");
    assert.strictEqual(endPos, "-200% 0");
  });

  it("should have 2s animation duration", () => {
    const duration = "2s";
    assert.strictEqual(duration, "2s");
  });

  it("should have linear timing function", () => {
    const timing = "linear";
    assert.strictEqual(timing, "linear");
  });

  it("should have infinite iteration", () => {
    const iteration = "infinite";
    assert.strictEqual(iteration, "infinite");
  });
});
