import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
        {/* Hero Section */}
        <section id="home" className="pt-12 space-y-6">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Developer & AI Architect
          </p>
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hikmet Gulsesli
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Building autonomous AI agent systems with{" "}
            <span className="text-primary font-medium">OpenClaw</span>.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6">
          <h2 
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projects
          </h2>
          <p className="text-muted-foreground">
            Projects & Open Source — 12+ projects. 10 agents running across the ecosystem.
          </p>
        </section>

        {/* Agents Section */}
        <section id="agents" className="space-y-6">
          <h2 
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Agents
          </h2>
          <p className="text-muted-foreground">
            The OpenClaw Team — 10 autonomous AI agents, each with a specialized role.
          </p>
        </section>

        {/* Writing Section */}
        <section id="writing" className="space-y-6">
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
          <p>© 2026 Hikmet Gulsesli — Built with OpenClaw · Powered by {10} AI agents</p>
        </footer>
      </main>
    </div>
  );
}
