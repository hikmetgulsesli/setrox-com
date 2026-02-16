"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "shipped" | "in-progress" | "archived" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Badge component for status and tags
 * 
 * Variants:
 * - shipped: Green background, indicates completed/released items
 * - in-progress: Yellow background, indicates active work
 * - archived: Muted background, indicates inactive/archived items
 * - default: Uses primary color from theme
 * 
 * All variants use CSS custom properties for theming consistency
 */
export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    shipped: cn(
      "bg-[#22c55e]/10",
      "text-[#22c55e]",
      "border-[#22c55e]/20"
    ),
    "in-progress": cn(
      "bg-[#eab308]/10",
      "text-[#eab308]",
      "border-[#eab308]/20"
    ),
    archived: cn(
      "bg-[var(--card)]",
      "text-[var(--muted-foreground)]",
      "border-[var(--border)]"
    ),
    default: cn(
      "bg-[var(--primary)]/10",
      "text-[var(--primary)]",
      "border-[var(--primary)]/20"
    ),
  };

  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center gap-1.5",
        "px-2.5 py-0.5",
        "text-xs font-medium",
        "rounded-full",
        "border",
        // Variant-specific styles
        variantStyles[variant],
        className
      )}
    >
      {/* Status dot for shipped/in-progress variants */}
      {(variant === "shipped" || variant === "in-progress") && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "shipped" && "bg-[#22c55e]",
            variant === "in-progress" && "bg-[#eab308]"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
