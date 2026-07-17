import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuide } from "@/lib/guides";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

const GROUPS: Array<{ name: string; slugs: string[] }> = [
  { name: "Start here", slugs: ["getting-started", "first-workflow"] },
  { name: "Core", slugs: ["routing-matrix", "mrgd-tuning"] },
  { name: "Agent platform", slugs: ["telegram-agent", "skills-memory"] },
];

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const guideJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: guide.title,
        description: guide.description,
        author: { "@type": "Organization", name: "Maestro Studio", url: "https://maestrostudio.dev" },
        publisher: { "@type": "Organization", name: "Maestro Studio", url: "https://maestrostudio.dev" },
        mainEntityOfPage: `https://maestrostudio.dev/how-to/${guide.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "How-to guides", item: "https://maestrostudio.dev/how-to" },
          { "@type": "ListItem", position: 2, name: guide.title, item: `https://maestrostudio.dev/how-to/${guide.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="wrap docs">
      <JsonLd data={guideJsonLd} />
      <aside className="docs-side">
        {GROUPS.map((group) => (
          <div key={group.name} style={{ display: "contents" }}>
            <div className="group">{group.name}</div>
            {group.slugs.map((s) => {
              const g = getGuide(s)!;
              return (
                <Link key={s} href={`/how-to/${s}`} className={s === slug ? "active" : undefined}>
                  {g.title === "Build your first real workflow" ? "Your first real workflow" : g.title}
                </Link>
              );
            })}
          </div>
        ))}
      </aside>
      <main className="docs-main" dangerouslySetInnerHTML={{ __html: guide.bodyHtml }} />
    </div>
  );
}
