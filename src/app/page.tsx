import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { AgentsSection } from "@/components/sections/Agents";
import { TechStackSection } from "@/components/sections/TechStack";
import { TerminalSection } from "@/components/sections/Terminal";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

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

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
