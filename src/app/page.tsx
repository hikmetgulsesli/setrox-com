import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Developer & AI Architect
          </p>
          <h1 
            className="text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Hikmet Gulsesli
          </h1>
          <p className="text-xl text-muted-foreground">
            Building autonomous AI agent systems with{" "}
            <span className="text-primary font-medium">OpenClaw</span>.
          </p>
        </section>

        {/* Design Tokens Demo */}
        <section className="space-y-6">
          <h2 
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Design Tokens
          </h2>
          
          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div 
                className="h-20 rounded-lg border"
                style={{ backgroundColor: "var(--background)" }}
              />
              <p className="text-sm text-muted-foreground">Background</p>
            </div>
            <div className="space-y-2">
              <div 
                className="h-20 rounded-lg border"
                style={{ backgroundColor: "var(--card)" }}
              />
              <p className="text-sm text-muted-foreground">Card</p>
            </div>
            <div className="space-y-2">
              <div 
                className="h-20 rounded-lg"
                style={{ backgroundColor: "var(--primary)" }}
              />
              <p className="text-sm text-muted-foreground">Primary</p>
            </div>
            <div className="space-y-2">
              <div 
                className="h-20 rounded-lg border"
                style={{ backgroundColor: "var(--border)" }}
              />
              <p className="text-sm text-muted-foreground">Border</p>
            </div>
          </div>

          {/* Status Colors */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent-green" />
              <span className="text-sm text-muted-foreground">Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent-yellow" />
              <span className="text-sm text-muted-foreground">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent-red" />
              <span className="text-sm text-muted-foreground">Error</span>
            </div>
          </div>
        </section>

        {/* Typography Demo */}
        <section className="space-y-4">
          <h2 
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Typography
          </h2>
          <div className="space-y-2 p-6 rounded-xl border bg-card">
            <h3 
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Space Grotesk — Heading Font
            </h3>
            <p className="text-muted-foreground">
              DM Sans — Body font for readable paragraphs and UI text.
              This demonstrates the font pair working together.
            </p>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="space-y-4">
          <h2 
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Interactive Elements
          </h2>
          <div className="flex flex-wrap gap-4">
            <button 
              className="px-6 py-3 rounded-lg font-medium text-white cursor-pointer transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: "var(--primary)" }}
            >
              Primary Button
            </button>
            
            <button 
              className="px-6 py-3 rounded-lg font-medium border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ 
                borderColor: "var(--border)",
                backgroundColor: "var(--card)"
              }}
            >
              Secondary Button
            </button>
            
            <Link 
              href="/"
              className="px-6 py-3 rounded-lg font-medium text-primary underline-offset-4 hover:underline cursor-pointer"
            >
              Text Link
            </Link>
          </div>
        </section>

        {/* Accent Themes */}
        <section className="space-y-4">
          <h2 
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Accent Themes (5 variants)
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { name: "Purple", hue: 295, color: "oklch(0.55 0.25 295)" },
              { name: "Cyan", hue: 195, color: "oklch(0.55 0.15 195)" },
              { name: "Golden", hue: 85, color: "oklch(0.60 0.16 85)" },
              { name: "Emerald", hue: 165, color: "oklch(0.55 0.17 165)" },
              { name: "Rose", hue: 20, color: "oklch(0.55 0.20 20)" },
            ].map((theme) => (
              <div key={theme.name} className="text-center space-y-2">
                <div 
                  className="w-full aspect-square rounded-full border-2"
                  style={{ 
                    backgroundColor: theme.color,
                    borderColor: "var(--border)"
                  }}
                />
                <p className="text-sm font-medium">{theme.name}</p>
                <p className="text-xs text-muted-foreground">H{theme.hue}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 Hikmet Gulsesli — Built with OpenClaw</p>
        </footer>
      </main>
    </div>
  );
}
