"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

/**
 * ProgressBar component with animated fill and shimmer effect
 * 
 * Features:
 * - Animated width from 0% to target value
 * - Color coding based on percentage:
 *   - 100%: Green (#22c55e)
 *   - 75-99%: Cyan (#06b6d4)
 *   - 50-74%: Yellow (#eab308)
 *   - <50%: Red (#ef4444)
 * - Shimmer animation using background-position
 * - Uses CSS custom properties for theming
 */
export function ProgressBar({
  value,
  max = 100,
  className,
  showValue = false,
  size = "md",
  animated = true,
}: ProgressBarProps) {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Determine color based on percentage
  const getColor = (pct: number): string => {
    if (pct >= 100) return "#22c55e"; // Green
    if (pct >= 75) return "#06b6d4"; // Cyan
    if (pct >= 50) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  const color = getColor(percentage);

  // Size variants
  const sizeStyles = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Progress track */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          "bg-[var(--border)]",
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        {/* Progress fill */}
        <motion.div
          className={cn(
            "h-full rounded-full",
            "relative overflow-hidden"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: [0.16, 1, 0.3, 1], // Spring-like easing
          }}
          style={{ backgroundColor: color }}
        >
          {/* Shimmer effect */}
          <div
            className={cn(
              "absolute inset-0",
              "animate-shimmer"
            )}
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.3) 50%,
                transparent 100%
              )`,
              backgroundSize: "200% 100%",
            }}
          />
        </motion.div>
      </div>

      {/* Value label */}
      {showValue && (
        <div className="mt-1.5 flex justify-between text-xs text-[var(--muted-foreground)]">
          <span>{Math.round(percentage)}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
    </div>
  );
}
