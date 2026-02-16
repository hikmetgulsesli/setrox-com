"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

/**
 * Card component with glassmorphism styling
 * 
 * Features:
 * - Glassmorphism background with backdrop blur
 * - Hover lift effect (transform only, no layout animation)
 * - Uses CSS custom properties for theming
 * - Optional click handler with cursor-pointer
 */
export function Card({
  children,
  className,
  hover = true,
  glass = true,
  onClick,
}: CardProps) {
  return (
    <motion.div
      className={cn(
        // Base styles
        "relative rounded-xl border p-6",
        "transition-transform duration-200 ease-out",
        // Theming via CSS custom properties
        "bg-[var(--card)]",
        "border-[var(--border)]",
        // Glassmorphism effect
        glass && [
          "backdrop-blur-md",
          "bg-[var(--card)]/80",
        ],
        // Hover lift effect
        hover && "hover:-translate-y-1",
        // Clickable cursor
        onClick && "cursor-pointer",
        className
      )}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * CardHeader - Header section of a Card
 */
export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

/**
 * CardTitle - Title text for a Card
 */
export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight",
        "text-[var(--foreground)]",
        className
      )}
    >
      {children}
    </h3>
  );
}

/**
 * CardDescription - Secondary text for a Card
 */
export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-1 text-sm",
        "text-[var(--muted-foreground)]",
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * CardContent - Main content area of a Card
 */
export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}

/**
 * CardFooter - Footer section of a Card
 */
export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 flex items-center gap-2", className)}>
      {children}
    </div>
  );
}
