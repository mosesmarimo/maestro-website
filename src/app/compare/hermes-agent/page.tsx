import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Maestro IDE and Hermes Agent — how they relate and differ",
  description:
    "An honest comparison of Maestro IDE with Hermes Agent (Nous Research) and Hermes Studio: shared capabilities like memory, skills, and messaging gateways — and where Maestro differs with a visual canvas, live agent map, model routing matrix, and MRGD decoding.",
  keywords: [
    "Hermes Agent",
    "Hermes Agent alternative",
    "Hermes Studio",
    "Nous Research Hermes",
    "Maestro IDE vs Hermes Agent",
    "AI agent orchestration",
    "AI agent harness",
    "self-hosted AI agent",
    "agent skills SKILL.md",
    "agent memory",
  ],
  alternates: { canonical: "/compare/hermes-agent" },
  openGraph: {
    title: "Maestro IDE and Hermes Agent — how they relate and differ",
    description:
      "Shared DNA, different instruments: what Maestro IDE openly adopts from Hermes Agent's capability set, and what it adds — visual orchestration, a live agent map, a routing matrix, and MRGD.",
    url: "https://maestroide.com/compare/hermes-agent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Maestro IDE and Hermes Agent — how they relate and differ",
  description:
    "A factual comparison of Maestro IDE with Hermes Agent (Nous Research) and Hermes Studio (EKKOLearnAI): shared capabilities, deliberate deviations, and the differences in interface, architecture, and availability.",
  author: { "@type": "Organization", name: "Maestro IDE", url: "https://maestroide.com" },
  publisher: { "@type": "Organization", name: "Maestro IDE", url: "https://maestroide.com" },
  mainEntityOfPage: "https://maestroide.com/compare/hermes-agent",
};

const ROWS: { dim: string; hermes: string; maestro: string }[] = [
  { dim: "What it is", hermes: "A self-hosted autonomous agent that lives on your server — CLI and messaging first", maestro: "A desktop AI studio: visual orchestration IDE plus (Phase 2) an always-on agent service" },
  { dim: "Interface", hermes: "Terminal TUI, messaging platforms; Hermes Studio adds a web console", maestro: "Drag-and-drop workflow canvas, live agent map, dependency graphs — plus chat, CLI, and web console" },
  { dim: "Language / runtime", hermes: "Python (with a TypeScript console)", maestro: "Rust core with a typed IPC boundary; native installers for Windows, macOS, Linux" },
  { dim: "Model access", hermes: "Nous Portal, OpenRouter, custom OpenAI-compatible endpoints, local vLLM", maestro: "Unlimited registry across Anthropic, OpenAI-compatible, Gemini, Ollama, media providers, plus a generic HTTP adapter" },
  { dim: "Task routing", hermes: "Model switching per conversation (/model)", maestro: "A routing matrix: per-task-type rules with conditions, cost tiers, and ordered fallback chains — covering image, video, and speech generation too" },
  { dim: "Output quality control", hermes: "Model choice and prompting", maestro: "MRGD reward-guided decoding (ICCV 2025): k candidates scored by weighted reward models, tunable at run time" },
  { dim: "Memory", hermes: "Agent-curated persistent memory, session search, user modeling", maestro: "Same capability class, planned with a user-visible, editable memory panel and journaled curation" },
  { dim: "Skills", hermes: "40+ built-in, autonomous skill creation, agentskills.io SKILL.md standard", maestro: "Same open standard — with a mandatory human approval gate before any self-drafted skill activates" },
  { dim: "Messaging", hermes: "Telegram, Discord, Slack, WhatsApp, Signal from one gateway", maestro: "Same platform set planned, with pairing codes and per-channel tool permissions" },
  { dim: "Observability", hermes: "Session logs; Studio adds usage analytics", maestro: "Replayable append-only event log per run, Gantt timelines, live agent positions, cost dashboards, budgets that pause runs" },
  { dim: "Availability", hermes: "Shipping today; MIT licensed; large community", maestro: "Staged development against a public blueprint; foundations implemented, Phase 1 in build" },
];

export default function HermesComparePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Comparison · written to be fair</p>
          <h1>Maestro IDE and Hermes Agent</h1>
          <p className="lede">
            People searching for an AI agent harness usually meet both names. Here is the honest
            picture: what the two share, where they differ, and why Maestro&rsquo;s blueprint openly
            credits Hermes.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <h2 style={{ marginBottom: 14 }}>The short version</h2>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            <a href="https://hermes-agent.org">Hermes Agent</a> (Nous Research) is a self-hosted,
            MIT-licensed autonomous agent with persistent memory, self-authored skills, a
            multi-platform messaging gateway, scheduled automations, and sandboxed execution
            backends — CLI-first, shipping today, with a large community.{" "}
            <a href="https://github.com/EKKOLearnAI/hermes-studio">Hermes Studio</a> (EKKOLearnAI)
            adds a desktop and web console on top of it.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 12 }}>
            <Link href="/">Maestro IDE</Link> is an AI agent orchestration studio built in Rust. Its
            Phase-2 blueprint deliberately adopts the capability set Hermes proved people want —
            memory, skills, gateway, schedules, backends — and its public capability map traces
            every such feature to its source. The implementation is original; no code is shared.
            What Maestro adds is the orchestration layer Hermes doesn&rsquo;t aim at: a visual
            workflow canvas, a live map of where every agent is working, a model routing matrix
            covering every modality, replayable run logs, and{" "}
            <Link href="/mrgd">MRGD reward-guided decoding</Link> as a per-node quality dial.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>
            Two deliberate deviations are worth knowing: in Maestro, agent-drafted skills require
            human approval before they can activate, and the service ships with no default
            credentials. If you want a battle-tested CLI agent today, Hermes is excellent. If you
            want to see, route, and measure multi-agent systems — and steer generation quality at
            run time — that is the gap Maestro is built to fill.
          </p>

          <h2 style={{ marginBottom: 14 }}>Side by side</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.93rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--accent)", color: "var(--ivory)" }}>Dimension</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--accent)", color: "var(--ivory)" }}>Hermes Agent (+ Studio)</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", borderBottom: "2px solid var(--accent)", color: "var(--ivory)" }}>Maestro IDE</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.dim}>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", color: "var(--ivory)", fontWeight: 600, whiteSpace: "nowrap" }}>{r.dim}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>{r.hermes}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>{r.maestro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: "var(--faint)", fontSize: "0.85rem", marginTop: 18 }}>
            Hermes Agent and Hermes Studio are projects of Nous Research and EKKOLearnAI
            respectively; details reflect their public documentation as of mid-2026. Corrections
            welcome via the website repository.
          </p>

          <div className="hero-cta" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/features">Explore Maestro&rsquo;s features</Link>
            <Link className="btn btn-ghost" href="/faq">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
