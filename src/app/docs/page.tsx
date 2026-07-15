import type { Metadata } from "next";
import Link from "next/link";
import { getManualChapters } from "@/lib/manual";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Maestro Studio documentation: the full user manual, step-by-step how-to guides, and the MRGD reward-guided decoding explainer.",
  alternates: { canonical: "/docs" },
};

export const dynamic = "force-static";

export default function DocsPage() {
  const chapters = getManualChapters();
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Documentation</p>
          <h1>Everything, written down.</h1>
          <p className="lede">
            The user manual covers the whole product screen by screen; the how-to guides walk
            single tasks end to end; the MRGD explainer covers the research behind the quality dial.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.6rem" }}>User manual</h2>
          </div>
          <div className="guide-cards">
            {chapters.map((c, i) => (
              <Link
                className="guide-card reveal"
                href={c.slug ? `/docs/manual/${c.slug}` : "/docs/manual"}
                key={c.slug || "index"}
              >
                <span className="k">Manual · chapter {i + 1}</span>
                <h3>{c.slug === "" ? "Overview" : c.title}</h3>
                <p>{c.description}</p>
              </Link>
            ))}
          </div>

          <div className="section-head" style={{ margin: "48px 0 24px" }}>
            <h2 style={{ fontSize: "1.6rem" }}>How-to guides</h2>
          </div>
          <div className="guide-cards">
            {GUIDES.map((g) => (
              <Link className="guide-card reveal" href={`/how-to/${g.slug}`} key={g.slug}>
                <span className="k">{g.card.k}</span>
                <h3>{g.title}</h3>
                <p>{g.card.blurb}</p>
              </Link>
            ))}
          </div>

          <div className="section-head" style={{ margin: "48px 0 24px" }}>
            <h2 style={{ fontSize: "1.6rem" }}>Concepts</h2>
          </div>
          <div className="guide-cards">
            <Link className="guide-card reveal" href="/mrgd">
              <span className="k">Concept · ICCV 2025</span>
              <h3>Multimodal Reward-Guided Decoding</h3>
              <p>What MRGD is, how the algorithm works, what the paper measured, and how Maestro implements it.</p>
            </Link>
            <Link className="guide-card reveal" href="/faq">
              <span className="k">Answers</span>
              <h3>FAQ</h3>
              <p>Platforms, availability, security, offline use, budgets, and pricing status — answered plainly.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
