import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// The manual pages carry ~30 screenshots; lazy-load and async-decode them so
// only above-the-fold images block first paint.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const t = title ? ` title="${title}"` : "";
      return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async" />`;
    },
  },
});

// Loads the product manual from content/manual/*.md (synced from the
// maestro-studio repo's docs/manual). Pages are fully static: files are read
// at build time via generateStaticParams + force-static pages.

export type ManualChapter = {
  slug: string; // "" for index.md (the manual landing page)
  title: string;
  description: string;
  position: number;
  bodyHtml: string;
};

const MANUAL_DIR = path.join(process.cwd(), "content", "manual");

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: raw.slice(match[0].length) };
}

function rewriteLinks(markdown: string): string {
  return markdown
    // Markdown media links → public assets.
    .replace(/\]\(media\//g, "](/manual-media/")
    // Raw HTML media attributes (video sources and posters) → public assets.
    .replace(/\b(src|poster)="media\//g, '$1="/manual-media/')
    // cross-chapter links: index.md → /docs/manual, foo.md#a → /docs/manual/foo#a
    .replace(/\]\(index\.md(#[^)]*)?\)/g, "](/docs/manual$1)")
    .replace(/\]\(([a-z0-9-]+)\.md(#[^)]*)?\)/g, "](/docs/manual/$1$2)");
}

let cache: ManualChapter[] | null = null;

export function getManualChapters(): ManualChapter[] {
  if (cache) return cache;
  const chapters = fs
    .readdirSync(MANUAL_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(MANUAL_DIR, file), "utf8");
      const { meta, body } = parseFrontMatter(raw);
      return {
        slug: file === "index.md" ? "" : file.replace(/\.md$/, ""),
        title: meta.title ?? file,
        description: meta.description ?? "",
        position: Number(meta.sidebar_position ?? 99),
        bodyHtml: marked.parse(rewriteLinks(body)) as string,
      };
    })
    .sort((a, b) => a.position - b.position);
  cache = chapters;
  return chapters;
}

export function getManualChapter(slug: string): ManualChapter | undefined {
  return getManualChapters().find((c) => c.slug === slug);
}
