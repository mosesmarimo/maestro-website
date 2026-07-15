import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

const BASE = "https://maestroide.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/download`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/mrgd`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/compare/hermes-agent`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/how-to`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${BASE}/how-to/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
