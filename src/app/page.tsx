import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { AgentsSection } from "@/components/sections/Agents";
import { TechStackSection } from "@/components/sections/TechStack";
import { TerminalSection } from "@/components/sections/Terminal";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Agents Section */}
        <AgentsSection />

        {/* Terminal Section */}
        <TerminalSection />

        {/* Tech Stack Section */}
        <TechStackSection />

        {/* Writing Section */}
        <section id="writing" className="space-y-6 py-24">
          <h2 
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Writing
          </h2>
          <p className="text-muted-foreground">
            Thoughts on AI, development, and building autonomous systems.
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 Hikmet Gulsesli — Built with OpenClaw · Powered by 10 AI agents</p>
        </footer>
      </main>
    </div>
  );
}
