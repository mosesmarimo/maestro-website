import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealEffects from "@/components/RevealEffects";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maestroide.com"),
  title: {
    default: "Maestro IDE — Conduct your AI agents",
    template: "%s — Maestro IDE",
  },
  description:
    "Maestro IDE is a cross-platform AI studio: compose multi-agent workflows on a canvas, route every modality through your own model matrix, watch every agent live, and dial output quality with reward-guided decoding.",
  icons: { icon: "/img/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
        <RevealEffects />
      </body>
    </html>
  );
}
