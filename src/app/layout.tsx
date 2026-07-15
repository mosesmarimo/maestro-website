import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealEffects from "@/components/RevealEffects";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maestroide.com"),
  title: {
    default: "Maestro IDE — AI Agent Orchestration Studio & Agent Harness",
    template: "%s — Maestro IDE",
  },
  description:
    "Maestro IDE is a cross-platform AI agent orchestration platform and agent harness: compose multi-agent workflows on a visual canvas, route every modality through a model routing matrix, watch every agent live, and control output quality with multimodal reward-guided decoding (MRGD).",
  applicationName: "Maestro IDE",
  keywords: [
    "AI agent orchestration",
    "AI agent harness",
    "multimodal reward-guided decoding",
    "MRGD",
    "reward-guided decoding",
    "multi-agent systems",
    "agent workflow builder",
    "LLM orchestration",
    "model routing",
    "LLM routing matrix",
    "agent observability",
    "inference-time alignment",
    "best-of-n sampling",
    "reward models",
    "visual workflow canvas",
    "Hermes Agent alternative",
    "self-hosted AI agents",
    "MCP client",
    "AI IDE",
    "agent framework",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://maestroide.com",
    siteName: "Maestro IDE",
    title: "Maestro IDE — AI Agent Orchestration Studio & Agent Harness",
    description:
      "Compose multi-agent AI workflows on a canvas, route text, code, image, video and speech tasks to the models you choose, watch every agent live, and dial quality with MRGD reward-guided decoding.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestro IDE — AI Agent Orchestration Studio & Agent Harness",
    description:
      "Visual multi-agent orchestration, a model routing matrix for every modality, a live agent map, and MRGD reward-guided decoding — self-hosted, built in Rust.",
  },
  icons: { icon: "/img/logo.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
        <RevealEffects />
      </body>
    </html>
  );
}
