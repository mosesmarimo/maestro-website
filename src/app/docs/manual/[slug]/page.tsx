import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getManualChapter, getManualChapters } from "@/lib/manual";
import ManualSidebar from "@/components/ManualSidebar";
import JsonLd from "@/components/JsonLd";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getManualChapters()
    .filter((c) => c.slug !== "")
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getManualChapter(slug);
  if (!chapter) return {};
  return {
    title: `${chapter.title} — User manual`,
    description: chapter.description,
    alternates: { canonical: `/docs/manual/${slug}` },
  };
}

export default async function ManualChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getManualChapter(slug);
  if (!chapter) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: chapter.title,
        description: chapter.description,
        author: { "@type": "Organization", name: "Maestro Studio", url: "https://maestroide.com" },
        mainEntityOfPage: `https://maestroide.com/docs/manual/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Documentation", item: "https://maestroide.com/docs" },
          { "@type": "ListItem", position: 2, name: "User manual", item: "https://maestroide.com/docs/manual" },
          { "@type": "ListItem", position: 3, name: chapter.title, item: `https://maestroide.com/docs/manual/${slug}` },
        ],
      },
    ],
  };

  return (
    <div className="wrap docs">
      <JsonLd data={jsonLd} />
      <ManualSidebar activeSlug={slug} />
      <main className="docs-main manual" dangerouslySetInnerHTML={{ __html: chapter.bodyHtml }} />
    </div>
  );
}
