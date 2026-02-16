"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme, type AccentTheme } from "@/lib/theme-context";
import { useTheme as useNextTheme } from "next-themes";
import { agents, agentCount } from "@/data/agents";
import { socials } from "@/data/socials";
import { 
  Palette, 
  Sun, 
  Moon, 
  Linkedin, 
  Github, 
  Menu,
  X,
} from "lucide-react";

// X (Twitter) icon component since Lucide doesn't have it
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

const navLinks = [
  { id: "home", label: ">HOME", href: "#home" },
  { id: "projects", label: "PROJECTS", href: "#projects" },
  { id: "agents", label: "AGENTS", href: "#agents" },
  { id: "writing", label: "WRITING", href: "#writing" },
];

/**
 * Navbar Component
 * 
 * Features:
 * - Sticky top with glassmorphism effect
 * - Logo: HG circle monogram + Setrox wordmark
 * - Nav links: HOME, PROJECTS, AGENTS, WRITING in uppercase Geist Mono style
 * - Theme controls: palette icon dropdown + sun/moon toggle
 * - Social icons: LinkedIn, X, GitHub using Lucide icons
 * - Status badge: green pulsing dot + {agents.length} agents live
 * - Mobile: hamburger menu with slide-out drawer
 * - Smooth scroll to sections via anchor links
 */
export function Navbar() {
  const { accentTheme, setAccentTheme, accentThemes, isHydrated } = useTheme();
  const { theme, setTheme } = useNextTheme();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close palette dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }

    if (isPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPaletteOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsPaletteOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleAccentChange = (themeName: AccentTheme) => {
    setAccentTheme(themeName);
    setIsPaletteOpen(false);
  };

  const toggleLightDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Get social icon component
  const getSocialIcon = (iconName: string) => {
    const iconClass = "h-4 w-4 transition-transform duration-200 group-hover:scale-110";
    switch (iconName) {
      case "linkedin":
        return <Linkedin className={iconClass} />;
      case "twitter":
        return <XIcon className={iconClass} />;
      case "github":
        return <Github className={iconClass} />;
      default:
        return null;
    }
  };

  // Prevent hydration mismatch
  if (!isHydrated) {
    return (
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "oklch(from var(--card) l c h / 0.6)",
          backdropFilter: "blur(12px) saturate(1.5)",
        }}
      >
        <nav className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-muted-foreground/20 animate-pulse" />
              <div className="h-5 w-20 rounded bg-muted-foreground/20 animate-pulse" />
            </div>
            {/* Nav Skeleton */}
            <div className="hidden md:flex items-center gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-4 w-16 rounded bg-muted-foreground/20 animate-pulse" />
              ))}
            </div>
            {/* Controls Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-muted-foreground/20 animate-pulse" />
              <div className="h-9 w-9 rounded-lg bg-muted-foreground/20 animate-pulse" />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  const isDark = theme === "dark";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "border-b border-border/50" : ""
        }`}
        style={{
          backgroundColor: "oklch(from var(--card) l c h / 0.6)",
          backdropFilter: "blur(12px) saturate(1.5)",
        }}
      >
        <nav className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={(e) => handleNavClick(e, "#home")}
            >
              <div 
                className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-sm transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: "var(--primary)" }}
              >
                HG
              </div>
              <span 
                className="font-bold text-lg tracking-wide text-foreground transition-colors duration-200 group-hover:text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Setrox
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-sm font-medium tracking-widest transition-colors duration-200 cursor-pointer ${
                    activeSection === link.id 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side: Status Badge + Theme Controls + Social Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Status Badge - Desktop */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50">
                <span className="relative flex h-2 w-2">
                  <span 
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: "var(--accent-green)" }}
                  />
                  <span 
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: "var(--accent-green)" }}
                  />
                </span>
                <span 
                  className="text-xs font-medium text-muted-foreground"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {agentCount} agents live
                </span>
              </div>

              {/* Social Icons - Desktop */}
              <div className="hidden lg:flex items-center gap-1">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-primary/10 cursor-pointer"
                    aria-label={`Visit ${social.name} profile`}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-border" />

              {/* Theme Controls */}
              <div className="flex items-center gap-1">
                {/* Palette Dropdown */}
                <div className="relative" ref={paletteRef}>
                  <button
                    type="button"
                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                    aria-label="Select accent color"
                    aria-expanded={isPaletteOpen}
                    aria-haspopup="listbox"
                  >
                    <Palette className="h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {isPaletteOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 z-50 min-w-[180px] rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md"
                      role="listbox"
                      aria-label="Accent color options"
                      style={{
                        animation: "fadeIn 0.2s ease-out",
                      }}
                    >
                      <p 
                        className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        Accent Color
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {accentThemes.map((t) => (
                          <button
                            key={t.name}
                            type="button"
                            onClick={() => handleAccentChange(t.name)}
                            className={`
                              group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200
                              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer
                              ${accentTheme === t.name ? "ring-2 ring-offset-2" : "hover:scale-110"}
                            `}
                            style={{
                              backgroundColor: isDark ? t.dark.primary : t.light.primary,
                              ['--tw-ring-color' as string]: isDark ? t.dark.primary : t.light.primary,
                            }}
                            role="option"
                            aria-selected={accentTheme === t.name}
                            aria-label={`${t.label} theme`}
                            title={t.label}
                          >
                            {accentTheme === t.name && (
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Light/Dark Toggle */}
                <button
                  type="button"
                  onClick={toggleLightDark}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-16 right-0 bottom-0 w-full max-w-sm z-40 lg:hidden transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "oklch(from var(--card) l c h / 0.95)",
          backdropFilter: "blur(20px) saturate(1.8)",
        }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Mobile Status Badge */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card/50 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: "var(--accent-green)" }}
              />
              <span 
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: "var(--accent-green)" }}
              />
            </span>
            <span 
              className="text-sm font-medium text-muted-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {agentCount} agents live
            </span>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2 mb-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 rounded-xl text-base font-medium tracking-wider transition-all duration-200 cursor-pointer ${
                  activeSection === link.id 
                    ? "text-primary bg-primary/10 border border-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-card border border-transparent"
                }`}
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Social Links */}
          <div className="mt-auto">
            <p 
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-card cursor-pointer"
                  aria-label={`Visit ${social.name} profile`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border group-hover:border-primary/30 transition-colors duration-200">
                    {getSocialIcon(social.icon)}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{social.name}</p>
                    <p className="text-sm text-muted-foreground">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
