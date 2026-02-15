import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/context";
import "@/styles/globals.css";

/* ========================================
   FONT CONFIGURATION
   ======================================== */

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/* ========================================
   METADATA
   ======================================== */

export const metadata: Metadata = {
  title: "Setrox – Developer Portfolio",
  description:
    "Setrox.com is the personal portfolio of Setrox, showcasing projects, skills, and professional experience in software development.",
  keywords: ["developer", "portfolio", "software", "web development", "Setrox"],
  authors: [{ name: "Setrox" }],
  openGraph: {
    title: "Setrox – Developer Portfolio",
    description: "Personal portfolio showcasing projects and skills",
    type: "website",
  },
};

/* ========================================
   ROOT LAYOUT
   ======================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-accent="purple"
      className="dark"
    >
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider defaultAccent="purple" defaultMode="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
