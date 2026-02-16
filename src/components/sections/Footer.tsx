"use client";

import { agentCount } from "@/data/agents";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className={cn(
        "py-6",
        "border-t",
        "border-[var(--border)]",
        "text-center"
      )}
      role="contentinfo"
      aria-label="Footer"
    >
      <p
        className={cn(
          "text-sm",
          "text-[var(--muted-foreground)]"
        )}
      >
        © 2026 Hikmet Gulsesli — All rights reserved · Built with OpenClaw · Powered by {agentCount} AI agents
      </p>
    </footer>
  );
}
