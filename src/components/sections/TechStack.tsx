"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Server,
  Atom,
  Code2,
  Container,
  Database,
  Network,
  Cloud,
  BarChart3,
  Activity,
  MessageSquare,
  Workflow,
  Brain,
  FileCode,
  SquareStack,
} from "lucide-react";

// Tech stack data with icons
const technologies = [
  { name: "Node.js", icon: Server },
  { name: "React", icon: Atom },
  { name: "Python", icon: Code2 },
  { name: "Docker", icon: Container },
  { name: "PostgreSQL", icon: Database },
  { name: "Tailscale", icon: Network },
  { name: "Cloudflare", icon: Cloud },
  { name: "Grafana", icon: BarChart3 },
  { name: "Prometheus", icon: Activity },
  { name: "Discord.js", icon: MessageSquare },
  { name: "n8n", icon: Workflow },
  { name: "Ollama", icon: Brain },
  { name: "Next.js", icon: FileCode },
  { name: "Express", icon: SquareStack },
] as const;

interface TechBadgeProps {
  tech: (typeof technologies)[number];
  index: number;
}

function TechBadge({ tech, index }: TechBadgeProps) {
  const IconComponent = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn(
        // Glassmorphism style
        "flex items-center gap-2 px-4 py-2.5 rounded-lg",
        "bg-[var(--card)]/60 backdrop-blur-md",
        "border border-[var(--border)]",
        // Hover effects
        "transition-all duration-200 ease-out",
        "hover:scale-105 hover:border-[var(--primary)]/50",
        "cursor-default",
        // Prevent shrinking
        "flex-shrink-0"
      )}
    >
      {/* Icon */}
      <IconComponent
        className={cn(
          "w-4 h-4",
          "text-[var(--primary)]"
        )}
        aria-hidden="true"
      />
      
      {/* Name */}
      <span
        className={cn(
          "text-sm font-medium",
          "text-[var(--foreground)]",
          "whitespace-nowrap"
        )}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}

export function TechStackSection() {
  return (
    <section
      id="stack"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="stack-heading"
    >
      {/* Section header */}
      <div className="mb-8 sm:mb-12">
        <h2
          id="stack-heading"
          className={cn(
            "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
            "text-[var(--foreground)]"
          )}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          STACK
        </h2>
        <p className="text-lg text-[var(--muted-foreground)]">
          Built With
        </p>
      </div>

      {/* Horizontal scrollable container */}
      <div
        className={cn(
          // Container with horizontal scroll
          "flex gap-3 overflow-x-auto",
          // Padding for scrollbar clearance
          "pb-4",
          // Hide scrollbar but keep functionality
          "scrollbar-hide",
          // Smooth scroll behavior
          "scroll-smooth"
        )}
        style={{
          // Custom scrollbar hiding for cross-browser support
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {technologies.map((tech, index) => (
          <TechBadge key={tech.name} tech={tech} index={index} />
        ))}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
