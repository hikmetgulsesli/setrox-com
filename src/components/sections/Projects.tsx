"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
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
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group relative rounded-xl border p-6",
        "bg-[var(--card)]/80 backdrop-blur-md",
        "border-[var(--border)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1 hover:border-[var(--glow-color-strong)]",
        "flex flex-col h-full"
      )}
    >
      {/* Header with badges */}
      <div className="flex items-start justify-between mb-4">
        {/* Year badge - top left */}
        <span
          className={cn(
            "text-xs font-medium",
            "text-[var(--muted-foreground)]",
            "font-mono"
          )}
        >
          {project.year}
        </span>

        {/* Status badge - top right */}
        <Badge variant={project.status}>
          {project.status}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h3
          className={cn(
            "text-lg font-semibold tracking-tight mb-2",
            "text-[var(--foreground)]",
            "font-mono"
          )}
        >
          {project.name}
        </h3>

        {/* Description - 2 lines max */}
        <p
          className={cn(
            "text-sm text-[var(--muted-foreground)]",
            "line-clamp-2 mb-4"
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
                "px-2 py-0.5",
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
      </div>

      {/* Links - bottom right */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.name}`}
            className={cn(
              "p-2 rounded-lg",
              "text-[var(--muted-foreground)]",
              "hover:text-[var(--primary)]",
              "hover:bg-[var(--primary)]/10",
              "transition-colors duration-150",
              "cursor-pointer",
              "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            )}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
        <a
          href={project.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View source code of ${project.name}`}
          className={cn(
            "p-2 rounded-lg",
            "text-[var(--muted-foreground)]",
            "hover:text-[var(--primary)]",
            "hover:bg-[var(--primary)]/10",
            "transition-colors duration-150",
            "cursor-pointer",
            "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
          )}
        >
          <Github className="w-4 h-4" aria-hidden="true" />
        </a>
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

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div className="mb-8 sm:mb-12">
        <h2
          id="projects-heading"
          className={cn(
            "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
            "text-[var(--foreground)]"
          )}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          PROJECTS
        </h2>
        <p className="text-lg text-[var(--muted-foreground)] mb-2">
          Projects & Open Source
        </p>
        <p className="text-[var(--muted-foreground)]">
          {projects.length}+ projects. {projects.filter(p => p.status === 'shipped').length} shipped. {projects.filter(p => p.status === 'in-progress').length} in progress.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-8">
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Projects grid */}
      <motion.div
        id="projects-grid"
        role="tabpanel"
        layout
        className={cn(
          "grid gap-6",
          // 1 column mobile
          "grid-cols-1",
          // 2 columns tablet
          "sm:grid-cols-2",
          // 3 columns desktop
          "lg:grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
    </section>
  );
}
