"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { inProgressProjects } from "@/data/projects";

// Terminal project data with progress percentages
const terminalProjects = [
  { name: "mission-control", progress: 92, description: "AI-powered agent dashboard" },
  { name: "antfarm-workflows", progress: 100, description: "Workflow automation engine" },
  { name: "restmenu", progress: 68, description: "Digital restaurant menu system" },
  { name: "agent-viz", progress: 95, description: "Interactive agent visualization" },
  { name: "logpulse", progress: 100, description: "Real-time log viewer with SSE" },
];

// Commands to type at the bottom
const commands = [
  "git status",
  "npm run dev",
  "openclaw deploy",
];

/**
 * Get color based on progress percentage
 * 100%: Green, 75-99%: Cyan, 50-74%: Yellow, <50%: Red
 */
function getProgressColor(progress: number): string {
  if (progress >= 100) return "#22c55e"; // Green
  if (progress >= 75) return "#06b6d4"; // Cyan
  if (progress >= 50) return "#eab308"; // Yellow
  return "#ef4444"; // Red
}

interface ProjectRowProps {
  project: typeof terminalProjects[0];
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const color = getProgressColor(project.progress);

  useEffect(() => {
    // Animate progress from 0 to target
    const timer = setTimeout(() => {
      setAnimatedProgress(project.progress);
    }, 100 + index * 150); // Staggered start

    return () => clearTimeout(timer);
  }, [project.progress, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="flex items-center gap-4 py-2"
    >
      {/* Project name */}
      <div className="w-32 sm:w-40 flex-shrink-0">
        <span className="text-sm text-[var(--foreground)] font-mono">
          {project.name}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-0">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"
          role="progressbar"
          aria-valuenow={project.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${project.name} progress: ${project.progress}%`}
        >
          {/* Progress fill */}
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            style={{ backgroundColor: color }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 animate-shimmer"
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
      </div>

      {/* Percentage */}
      <div className="w-12 text-right flex-shrink-0">
        <span
          className="text-sm font-mono tabular-nums"
          style={{ color }}
        >
          {project.progress}%
        </span>
      </div>
    </motion.div>
  );
}

interface TypingCommandProps {
  command: string;
  delay: number;
}

function TypingCommand({ command, delay }: TypingCommandProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start typing after delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedText(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Hide cursor after a delay
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 50 + Math.random() * 50); // Random typing speed for realism

    return () => clearInterval(typeInterval);
  }, [isTyping, command]);

  // Blink cursor when not typing
  useEffect(() => {
    if (isTyping && displayedText.length < command.length) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [isTyping, displayedText, command]);

  return (
    <div className="flex items-center gap-2 text-sm font-mono">
      <span className="text-[var(--primary)]">$</span>
      <span className="text-[var(--foreground)]">
        {displayedText}
        {showCursor && (
          <span className="inline-block w-2 h-4 bg-[var(--primary)] ml-0.5 animate-pulse" />
        )}
      </span>
    </div>
  );
}

export function TerminalSection() {
  return (
    <section
      id="terminal"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="terminal-heading"
    >
      {/* Section header */}
      <div className="mb-8 sm:mb-12">
        <h2
          id="terminal-heading"
          className={cn(
            "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
            "text-[var(--foreground)]"
          )}
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          TERMINAL
        </h2>
        <p className="text-lg text-[var(--muted-foreground)]">
          Active project pipeline — live progress tracking
        </p>
      </div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className={cn(
          "rounded-xl border overflow-hidden",
          "bg-[#0d0d14]",
          "border-[var(--border)]"
        )}
      >
        {/* macOS-style window chrome */}
        <div
          className={cn(
            "flex items-center gap-2 px-4 py-3",
            "border-b border-[var(--border)]",
            "bg-[var(--card)]/50"
          )}
        >
          {/* Window control dots */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-[#ff5f56]"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#ffbd2e]"
              aria-hidden="true"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#27c93f]"
              aria-hidden="true"
            />
          </div>

          {/* File path */}
          <div className="flex-1 text-center">
            <span className="text-xs text-[var(--muted-foreground)] font-mono">
              ~/projects/setrox-com — zsh
            </span>
          </div>

          {/* Spacer to balance the dots */}
          <div className="w-14" aria-hidden="true" />
        </div>

        {/* Terminal content */}
        <div className="p-4 sm:p-6 font-mono">
          {/* Header row */}
          <div className="flex items-center gap-4 pb-3 mb-3 border-b border-[var(--border)]/50">
            <span className="w-32 sm:w-40 flex-shrink-0 text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
              Project
            </span>
            <span className="flex-1 text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
              Progress
            </span>
            <span className="w-12 text-right text-xs text-[var(--muted-foreground)] uppercase tracking-wider">
              %
            </span>
          </div>

          {/* Project rows */}
          <div className="space-y-1">
            {terminalProjects.map((project, index) => (
              <ProjectRow key={project.name} project={project} index={index} />
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[var(--border)]/50" />

          {/* Typing commands */}
          <div className="space-y-2">
            {commands.map((command, index) => (
              <TypingCommand
                key={command}
                command={command}
                delay={1500 + index * 800}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
