import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/db";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Maestro IDE: platforms, availability, models, MRGD, security, offline use, Phase 2, and more.",
};

// FAQ content lives in PostgreSQL (seeded on first use) and re-renders
// every 5 minutes; if the database is unreachable the bundled seed serves.
export const revalidate = 300;

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Questions, answered plainly</p>
          <h1>Frequently asked questions</h1>
          <p className="lede">
            If your question isn&rsquo;t here, the <Link href="/how-to">how-to guides</Link> go
            deeper on every feature.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details className="faq-item" key={f.question} open={i === 0}>
                <summary>{f.question}</summary>
                <div className="a" dangerouslySetInnerHTML={{ __html: f.answerHtml }} />
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
