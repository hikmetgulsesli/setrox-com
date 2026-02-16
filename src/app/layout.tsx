import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Providers } from "@/lib/providers";
import { CursorGlow } from "@/components/ui/CursorGlow";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hikmet Gulsesli — Developer & AI Architect | setrox.com",
  description: "Building autonomous AI agent systems with OpenClaw. 10 agents, 12+ projects, one developer.",
  keywords: ["AI", "agents", "OpenClaw", "developer", "portfolio", "Hikmet Gulsesli"],
  authors: [{ name: "Hikmet Gulsesli" }],
  creator: "Hikmet Gulsesli",
  publisher: "Hikmet Gulsesli",
  metadataBase: new URL("https://setrox.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hikmet Gulsesli — setrox.com",
    description: "Building autonomous AI agent systems with OpenClaw",
    type: "website",
    locale: "en_US",
    siteName: "setrox.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hikmet Gulsesli — setrox.com",
    description: "Building autonomous AI agent systems with OpenClaw",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <CursorGlow />
          {children}
        </Providers>
      </body>
    </html>
  );
}
