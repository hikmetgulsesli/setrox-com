"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { AgentsSection } from "@/components/sections/Agents";
import { TechStackSection } from "@/components/sections/TechStack";
import { TerminalSection } from "@/components/sections/Terminal";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Staggered section entrance animation variants
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Container variants for staggered children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Homepage with all sections assembled
 * Features scroll-triggered entrance animations with staggered delays
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - No scroll animation (above fold) */}
        <section id="home">
          <Hero />
        </section>

        {/* Projects Section with scroll-triggered animation */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ProjectsSection />
        </motion.section>

        {/* Agents Section with scroll-triggered animation */}
        <motion.section
          id="agents"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <AgentsSection />
        </motion.section>

        {/* Terminal Section with scroll-triggered animation */}
        <motion.section
          id="terminal"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <TerminalSection />
        </motion.section>

        {/* Tech Stack Section with scroll-triggered animation */}
        <motion.section
          id="stack"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <TechStackSection />
        </motion.section>

        {/* Contact Section with scroll-triggered animation */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ContactSection />
        </motion.section>
      </main>

      {/* Footer - Outside main for full width border */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <Footer />
      </div>
    </div>
  );
}
