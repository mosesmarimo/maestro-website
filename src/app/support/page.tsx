import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Maestro Studio: contact the support team through the form or email support@maestroide.com. Installation problems, bug reports, models and routing, MRGD questions.",
  alternates: { canonical: "/support" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Maestro Studio",
  url: "https://maestroide.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@maestroide.com",
    url: "https://maestroide.com/support",
    availableLanguage: "English",
  },
};

export default function SupportPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">We read everything</p>
          <h1>Support</h1>
          <p className="lede">
            Stuck on an install, found a bug, or unsure how to route something? Send a message —
            we reply to the email you provide. Prefer your own mail client? Write to{" "}
            <a href="mailto:support@maestroide.com">support@maestroide.com</a>.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            <ContactForm />
            <div>
              <h3 style={{ marginBottom: 12 }}>Before you write</h3>
              <ul style={{ color: "var(--muted)", margin: "0 0 22px 20px", lineHeight: 1.7 }}>
                <li>The <Link href="/faq">FAQ</Link> answers the most common questions — keys, offline use, budgets, platforms.</li>
                <li>The <Link href="/how-to">how-to guides</Link> cover setup, routing, workflows, and MRGD step by step.</li>
                <li>For install issues, include your OS version and the installer you used — it halves the round-trips.</li>
              </ul>
              <div className="callout tip">
                <strong>Email:</strong> <a href="mailto:support@maestroide.com">support@maestroide.com</a>
                <br />
                We usually reply within two business days.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
