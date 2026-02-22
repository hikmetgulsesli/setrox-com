"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft, ImageIcon } from "lucide-react";
import { projects, type ProjectStatus } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const filterTabs: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "all", value: "all" },
  { label: "shipped", value: "shipped" },
  { label: "in-progress", value: "in-progress" },
  { label: "archived", value: "archived" },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.2, 
        ease: "easeOut",
        delay: index * 0.05 
      }}
      className={cn(
        "group relative rounded-xl border overflow-hidden",
        "bg-[var(--card)]/80 backdrop-blur-md",
        "border-[var(--border)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:border-[var(--glow-color-strong)]",
        "flex flex-col"
      )}
    >
      {/* Screenshot Placeholder Area */}
      <div className={cn(
        "relative w-full aspect-video",
        "bg-gradient-to-br from-[var(--muted)]/30 to-[var(--muted)]/10",
        "border-b border-[var(--border)]",
        "flex items-center justify-center"
      )}>
        <div className="text-center">
          <div className={cn(
            "inline-flex items-center justify-center",
            "w-16 h-16 rounded-2xl mb-3",
            "bg-[var(--card)] border border-[var(--border)]",
            "transition-transform duration-200 group-hover:scale-110"
          )}>
            <ImageIcon className="w-8 h-8 text-[var(--muted-foreground)]" aria-hidden="true" />
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">Screenshot coming soon</p>
        </div>

        {/* Year badge - overlay */}
        <span
          className={cn(
            "absolute top-3 left-3",
            "px-2 py-1 text-xs font-medium",
            "bg-[var(--card)]/90 backdrop-blur-sm",
            "border border-[var(--border)] rounded-lg",
            "text-[var(--muted-foreground)]",
            "font-mono"
          )}
        >
          {project.year}
        </span>

        {/* Status badge - overlay */}
        <div className="absolute top-3 right-3">
          <Badge variant={project.status}>
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          className={cn(
            "text-xl font-semibold tracking-tight mb-3",
            "text-[var(--foreground)]",
            "font-mono"
          )}
        >
          {project.name}
        </h3>

        {/* Description - more space for larger descriptions */}
        <p
          className={cn(
            "text-[var(--muted-foreground)]",
            "mb-4 flex-1",
            "leading-relaxed"
          )}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center",
                "px-2.5 py-1",
                "text-xs font-medium",
                "rounded-full",
                "bg-[var(--primary)]/10",
                "text-[var(--primary)]",
                "border border-[var(--primary)]/20"
              )}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.name}`}
              className={cn(
                "inline-flex items-center gap-2",
                "px-3 py-2 rounded-lg text-sm font-medium",
                "text-[var(--muted-foreground)]",
                "hover:text-[var(--primary)]",
                "hover:bg-[var(--primary)]/10",
                "transition-colors duration-150",
                "cursor-pointer",
                "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
              )}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>Live</span>
            </a>
          )}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code of ${project.name}`}
            className={cn(
              "inline-flex items-center gap-2",
              "px-3 py-2 rounded-lg text-sm font-medium",
              "text-[var(--muted-foreground)]",
              "hover:text-[var(--primary)]",
              "hover:bg-[var(--primary)]/10",
              "transition-colors duration-150",
              "cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            )}
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

interface FilterTabsProps {
  activeFilter: ProjectStatus | "all";
  onFilterChange: (filter: ProjectStatus | "all") => void;
}

function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter projects by status"
    >
      {filterTabs.map((tab) => {
        const isActive = activeFilter === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onFilterChange(tab.value)}
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            className={cn(
              // Base styles
              "px-4 py-2 text-sm font-medium rounded-lg",
              "transition-all duration-150 ease-out",
              "cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
              // Active: filled background
              isActive && [
                "bg-[var(--primary)]",
                "text-white",
                "border border-transparent",
              ],
              // Inactive: outline
              !isActive && [
                "bg-transparent",
                "text-[var(--muted-foreground)]",
                "border border-[var(--border)]",
                "hover:text-[var(--foreground)]",
                "hover:border-[var(--muted-foreground)]",
              ]
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  // Stats
  const stats = useMemo(() => ({
    total: projects.length,
    shipped: projects.filter(p => p.status === 'shipped').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    archived: projects.filter(p => p.status === 'archived').length,
  }), []);

  return (
    <div className="min-h-screen">
      {/* Header with back link */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]/50">
        <nav 
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          style={{
            backgroundColor: "oklch(from var(--card) l c h / 0.8)",
            backdropFilter: "blur(12px) saturate(1.5)",
          }}
          aria-label="Projects page navigation"
        >
          {/* Back to home link */}
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2",
              "text-sm font-medium",
              "text-[var(--muted-foreground)]",
              "hover:text-[var(--primary)]",
              "transition-colors duration-150",
              "cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-lg px-2 py-1"
            )}
            aria-label="Go back to homepage"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to home</span>
          </Link>

          {/* Page title */}
          <span 
            className="text-sm font-medium tracking-widest text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            ALL PROJECTS
          </span>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Page header */}
        <div className="mb-8 sm:mb-12">
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
              "text-[var(--foreground)]"
            )}
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            PROJECTS
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-4">
            Complete project catalog
          </p>
          
          {/* Stats row */}
          <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              {stats.total} total
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {stats.shipped} shipped
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
              {stats.inProgress} in progress
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500" aria-hidden="true" />
              {stats.archived} archived
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Projects grid - larger cards on detail page */}
        <motion.div
          id="projects-grid"
          role="tabpanel"
          layout
          className={cn(
            "grid gap-6",
            // 1 column mobile
            "grid-cols-1",
            // 2 columns tablet
            "md:grid-cols-2",
            // 2 columns desktop (larger cards)
            "lg:grid-cols-2"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[var(--muted-foreground)]">
              No projects found with status &quot;{activeFilter}&quot;
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            © 2026 Hikmet Gulsesli — All rights reserved · Built with OpenClaw
          </p>
        </div>
      </footer>
    </div>
  );
}
