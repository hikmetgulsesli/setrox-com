"use client";

import { motion } from "framer-motion";
import { agents, agentCount } from "@/data/agents";
import { cn } from "@/lib/utils";
import {
  Bot,
  Zap,
  Globe,
  Search,
  Shield,
  Code,
  PenTool,
  RefreshCw,
  Palette,
} from "lucide-react";

// Map agent icons to Lucide icons
const iconMap: Record<string, React.ComponentType<{ className?: string; color?: string; [key: string]: unknown }>> = {
  lobster: Bot, // Using Bot as fallback for lobster emoji
  bot: Bot,
  zap: Zap,
  globe: Globe,
  search: Search,
  shield: Shield,
  code: Code,
  "pen-tool": PenTool,
  "refresh-cw": RefreshCw,
  palette: Palette,
};

interface AgentCardProps {
  agent: (typeof agents)[0];
  index: number;
}

function AgentCard({ agent, index }: AgentCardProps) {
  const IconComponent = iconMap[agent.icon] || Bot;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn(
        "group relative rounded-xl border p-5",
        "bg-[var(--card)]/80 backdrop-blur-md",
        "border-[var(--border)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1",
        "flex flex-col"
      )}
      style={{
        ["--agent-hover-color" as string]: agent.color,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = agent.color;
        e.currentTarget.style.boxShadow = `0 0 20px ${agent.color}33`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >

      {/* Header: Emoji icon and status dot */}
      <div className="flex items-start justify-between mb-3">
        {/* Emoji icon - scales on hover */}
        <div
          className={cn(
            "w-8 h-8 flex items-center justify-center",
            "text-2xl transition-transform duration-200 ease-out",
            "group-hover:scale-125 group-hover:animate-bounce"
          )}
          aria-hidden="true"
        >
          <IconComponent 
            className="w-7 h-7" 
            color={agent.color}
            aria-hidden="true"
          />
        </div>

        {/* Status dot - green pulsing */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "relative flex h-2.5 w-2.5",
              "animate-pulse"
            )}
            aria-label="Online"
          >
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
              style={{ animationDuration: "2s" }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Name */}
        <h3
          className={cn(
            "text-lg font-semibold tracking-tight mb-1",
            "text-[var(--foreground)]",
            "font-mono"
          )}
        >
          {agent.name}
        </h3>

        {/* Role */}
        <p
          className={cn(
            "text-sm text-[var(--muted-foreground)]",
            "mb-3"
          )}
        >
          {agent.role}
        </p>

        {/* Model badge */}
        <div className="mb-3">
          <span
            className={cn(
              "inline-flex items-center",
              "px-2 py-0.5",
              "text-xs font-medium",
              "rounded-full",
              "bg-[var(--primary)]/10",
              "text-[var(--primary)]",
              "border border-[var(--primary)]/20"
            )}
          >
            {agent.model}
          </span>
        </div>

        {/* Description - 1-2 lines */}
        <p
          className={cn(
            "text-sm text-[var(--muted-foreground)]",
            "line-clamp-2"
          )}
        >
          {agent.description}
        </p>
      </div>
    </motion.article>
  );
}

export function AgentsSection() {
  return (
    <section
      id="agents"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="agents-heading"
    >
      {/* Section header */}
      <div className="mb-8 sm:mb-12">
        <h2
          id="agents-heading"
          className={cn(
            "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
            "text-[var(--foreground)]"
          )}
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          AGENTS
        </h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-2">
          The OpenClaw Team
        </p>
        <p className="text-[var(--muted-foreground)]">
          {agentCount} autonomous AI agents, each with a specialized role.
        </p>
      </div>

      {/* Agents grid */}
      <div
        className={cn(
          "grid gap-6",
          // 2 columns mobile
          "grid-cols-2",
          // 4 columns desktop
          "lg:grid-cols-4"
        )}
      >
        {agents.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} />
        ))}
      </div>
    </section>
  );
}
