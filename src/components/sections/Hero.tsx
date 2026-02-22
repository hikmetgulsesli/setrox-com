"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, FolderOpen, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { agents, agentCount } from "@/data/agents";
import { projects, projectCount } from "@/data/projects";

interface HeroProps {
  className?: string;
}

/**
 * TypingEffect Component
 * Animated typing effect for the tagline portion
 */
function TypingEffect({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="relative"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: 1.5 + index * 0.04,
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            times: [0, 0.4, 0.6, 1],
            delay: 1.5 + text.length * 0.04,
          }}
        />
      </motion.span>
    </span>
  );
}

/**
 * AsciiBox Component
 * Terminal-style ASCII art box with stats
 */
function AsciiBox({ 
  title, 
  stats 
}: { 
  title: string; 
  stats: { label: string; value: string }[];
}) {
  const maxLabelLength = Math.max(...stats.map(s => s.label.length));
  const maxValueLength = Math.max(...stats.map(s => s.value.length));
  const contentWidth = Math.max(title.length, maxLabelLength + maxValueLength + 3);
  
  const horizontalLine = "─".repeat(contentWidth + 2);
  const topBorder = `┌${horizontalLine}┐`;
  const bottomBorder = `└${horizontalLine}┘`;
  
  // Center the title
  const titlePadding = Math.floor((contentWidth - title.length) / 2);
  const titleLine = `│ ${" ".repeat(titlePadding)}${title}${" ".repeat(contentWidth - title.length - titlePadding)} │`;
  
  // Separator line
  const separator = `│${"─".repeat(contentWidth + 2)}│`;

  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed">
      <div className="text-primary/80">{topBorder}</div>
      <div className="text-primary/80">{titleLine}</div>
      <div className="text-primary/60">{separator}</div>
      {stats.map((stat, index) => {
        const padding = contentWidth - stat.label.length - stat.value.length - 1;
        return (
          <div key={index} className="text-muted-foreground">
            <span className="text-primary/60">│ </span>
            <span>{stat.label}</span>
            <span className="text-primary/40">{" ".repeat(padding)}</span>
            <span className="text-primary">{stat.value}</span>
            <span className="text-primary/60"> │</span>
          </div>
        );
      })}
      <div className="text-primary/80">{bottomBorder}</div>
    </div>
  );
}

/**
 * FancyAsciiBox Component
 * Decorative ASCII art box with border styling
 */
function FancyAsciiBox({ 
  title, 
  status,
  agents,
}: { 
  title: string; 
  status: string;
  agents: string;
}) {
  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed">
      <div className="text-primary/80">╔═══════════════════════╗</div>
      <div className="text-primary/80">║  <span className="text-primary font-bold tracking-wider">{title}</span>  ║</div>
      <div className="text-primary/60">╠═══════════════════════╣</div>
      <div className="text-muted-foreground">
        <span className="text-primary/60">║</span> status: <span className={cn(
          status === "running" ? "text-accent-green" : "text-accent-yellow"
        )}>{status}</span>{" ".repeat(11 - status.length)}<span className="text-primary/60">║</span>
      </div>
      <div className="text-muted-foreground">
        <span className="text-primary/60">║</span> agents: <span className="text-primary">{agents}</span>{" ".repeat(13 - agents.length)}<span className="text-primary/60">║</span>
      </div>
      <div className="text-primary/80">╚═══════════════════════╝</div>
    </div>
  );
}

/**
 * Hero Section Component
 * 
 * Features:
 * - Superscript label: DEVELOPER & AI ARCHITECT
 * - H1 with gradient text using var(--primary)
 * - Subtitle: — Founder of OpenClaw
 * - Tagline with typing animation
 * - Two ASCII art terminal boxes with OpenClaw stats
 * - CTA buttons: explore projects (filled) + meet the agents (outlined)
 * - Stats row with dynamic agent/project counts
 * - Fade-in-up entrance animation with Framer Motion
 */
export function Hero({ className }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // Spring feel
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="home" 
      className={cn(
        "relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-16 sm:py-24 lg:py-32",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Superscript Label */}
        <motion.div variants={itemVariants}>
          <span 
            className="inline-block text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Developer & AI Architect
          </span>
        </motion.div>

        {/* H1 with Gradient Text */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <span 
            className="bg-gradient-to-r from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent"
            style={{ textWrap: "balance" }}
          >
            Hikmet Gulsesli
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          — Founder of OpenClaw
        </motion.p>

        {/* Tagline with Typing Animation */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-foreground max-w-2xl leading-relaxed"
        >
          Building autonomous AI agent systems{" "}
          <TypingEffect text="that work while you sleep." />
        </motion.p>

        {/* ASCII Art Terminal Boxes */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8"
        >
          <AsciiBox 
            title="OPENCLAW"
            stats={[
              { label: "agents:", value: String(agentCount) },
              { label: "projects:", value: `${projectCount}+` },
              { label: "uptime:", value: "99.5%" },
              { label: "status:", value: "running" },
            ]}
          />
          <FancyAsciiBox 
            title="O P E N C L A W"
            status="running"
            agents={`${agentCount}/${agentCount} ✓`}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className={cn(
              "group inline-flex items-center justify-center gap-2 px-6 py-3",
              "bg-primary text-primary-foreground font-medium rounded-lg",
              "transition-all duration-200 ease-out",
              "hover:opacity-90 hover:scale-105",
              "active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "cursor-pointer"
            )}
            aria-label="Explore projects"
          >
            explore projects
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => scrollToSection("agents")}
            className={cn(
              "group inline-flex items-center justify-center gap-2 px-6 py-3",
              "bg-transparent border border-border text-foreground font-medium rounded-lg",
              "transition-all duration-200 ease-out",
              "hover:border-primary/50 hover:bg-primary/5",
              "active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "cursor-pointer"
            )}
            aria-label="Meet the agents"
          >
            meet the agents
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-medium text-foreground">{agentCount}</span>
            <span>Agents</span>
          </div>
          
          <span className="hidden sm:inline text-border">·</span>
          
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-medium text-foreground">{projectCount}+</span>
            <span>Projects</span>
          </div>
          
          <span className="hidden sm:inline text-border">·</span>
          
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-medium text-foreground">20GB</span>
            <span>Server</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
