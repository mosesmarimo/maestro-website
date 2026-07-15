import type { Metadata } from "next";
import { getManualChapter } from "@/lib/manual";
import ManualSidebar from "@/components/ManualSidebar";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const chapter = getManualChapter("");
  return {
    title: chapter?.title ?? "User manual",
    description: chapter?.description,
    alternates: { canonical: "/docs/manual" },
  };
}

export default function ManualIndexPage() {
  const chapter = getManualChapter("")!;
  return (
    <div className="wrap docs">
      <ManualSidebar activeSlug="" />
      <main className="docs-main manual" dangerouslySetInnerHTML={{ __html: chapter.bodyHtml }} />
    </div>
  );
}
