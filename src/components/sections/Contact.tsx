"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github } from "lucide-react";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

// X (Twitter) icon component since Lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Map social icons to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: XIcon,
  github: Github,
};

interface SocialCardProps {
  social: (typeof socials)[0];
  index: number;
}

function SocialCard({ social, index }: SocialCardProps) {
  const IconComponent = iconMap[social.icon];

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.3 + index * 0.05,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={cn(
        "group flex items-center gap-4",
        "rounded-xl border p-5",
        "bg-[var(--card)]/80 backdrop-blur-md",
        "border-[var(--border)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1",
        "hover:border-[var(--primary)]/50",
        "cursor-pointer"
      )}
      aria-label={`${social.name} - ${social.handle}`}
    >
      {/* Icon - scales on hover */}
      <div
        className={cn(
          "flex items-center justify-center",
          "w-10 h-10 rounded-lg",
          "bg-[var(--primary)]/10",
          "text-[var(--primary)]",
          "transition-transform duration-200 ease-out",
          "group-hover:scale-110"
        )}
        aria-hidden="true"
      >
        {IconComponent && <IconComponent className="w-5 h-5" />}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className={cn(
            "text-base font-semibold",
            "text-[var(--foreground)]"
          )}
        >
          {social.name}
        </h3>
        <p
          className={cn(
            "text-sm text-[var(--muted-foreground)]"
          )}
        >
          {social.handle}
        </p>
      </div>
    </motion.a>
  );
}

export function ContactSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24"
      aria-labelledby="contact-heading"
    >
      {/* Section header with gradient heading */}
      <div className="text-center mb-10 sm:mb-12">
        <h2
          id="contact-heading"
          className={cn(
            "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
            "bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/60",
            "bg-clip-text text-transparent"
          )}
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Let&apos;s build autonomous systems together
        </h2>
      </div>

      {/* Newsletter subscription form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="max-w-md mx-auto mb-4"
      >
        <div className="flex gap-2">
          {/* Email input - dark styled */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            className={cn(
              "flex-1",
              "px-4 py-3",
              "rounded-lg border",
              "bg-[var(--card)]",
              "border-[var(--border)]",
              "text-[var(--foreground)]",
              "placeholder:text-[var(--muted-foreground)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50",
              "focus:border-[var(--primary)]",
              "transition-colors duration-200"
            )}
            aria-label="Email address for newsletter subscription"
          />
          {/* Subscribe button - accent colored */}
          <button
            type="submit"
            className={cn(
              "px-5 py-3",
              "rounded-lg",
              "bg-[var(--primary)]",
              "text-white font-medium",
              "hover:bg-[var(--primary)]/90",
              "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50",
              "focus:ring-offset-2 focus:ring-offset-[var(--background)]",
              "active:scale-[0.98]",
              "transition-all duration-200",
              "cursor-pointer"
            )}
          >
            Subscribe →
          </button>
        </div>
      </motion.form>

      {/* Reassurance text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={cn(
          "text-center text-sm",
          "text-[var(--muted-foreground)]",
          "mb-12"
        )}
      >
        No spam · Unsubscribe anytime · Monthly insights
      </motion.p>

      {/* Social cards */}
      <div
        className={cn(
          "grid gap-4",
          // 1 column mobile
          "grid-cols-1",
          // 3 columns desktop
          "sm:grid-cols-3"
        )}
      >
        {socials.map((social, index) => (
          <SocialCard key={social.id} social={social} index={index} />
        ))}
      </div>
    </section>
  );
}
