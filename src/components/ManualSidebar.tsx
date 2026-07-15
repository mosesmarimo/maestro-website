import Link from "next/link";
import { getManualChapters } from "@/lib/manual";

export default function ManualSidebar({ activeSlug }: { activeSlug: string }) {
  const chapters = getManualChapters();
  return (
    <aside className="docs-side">
      <div className="group">Manual</div>
      {chapters.map((c) => (
        <Link
          key={c.slug || "index"}
          href={c.slug ? `/docs/manual/${c.slug}` : "/docs/manual"}
          className={c.slug === activeSlug ? "active" : undefined}
        >
          {c.slug === "" ? "Overview" : c.title}
        </Link>
      ))}
      <div className="group">More</div>
      <Link href="/docs">All documentation</Link>
      <Link href="/how-to">How-to guides</Link>
      <Link href="/mrgd">MRGD, explained</Link>
    </aside>
  );
}
