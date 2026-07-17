import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "How-to guides",
  description:
    "Step-by-step guides for Maestro Studio: getting started, building workflows, the routing matrix, MRGD tuning, agents on Telegram, and skills & memory.",
};

export default function HowToIndex() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Learn by doing</p>
          <h1>How-to guides</h1>
          <p className="lede">
            Short, honest, step-by-step. Every feature these guides cover ships in the current
            Alpha — unsigned and rough in places, but real. They describe exactly what the
            blueprint specifies.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="guide-cards">
            {GUIDES.map((g) => (
              <Link className="guide-card reveal" href={`/how-to/${g.slug}`} key={g.slug}>
                <span className="k">{g.card.k}</span>
                <h3>{g.title}</h3>
                <p>{g.card.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
