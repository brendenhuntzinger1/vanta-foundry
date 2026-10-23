import { INDUSTRIES } from "@/lib/industries";
import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  return [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    ...SERVICES.map((s) => ({ url: u(`/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...SERVICES.map((s) => ({ url: u(`/start/${s.slug}`), changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: u("/get-started"), changeFrequency: "yearly", priority: 0.8 },
    { url: u("/work"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/industries"), changeFrequency: "monthly", priority: 0.8 },
    ...INDUSTRIES.map((i) => ({ url: u(`/industries/${i.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/glossary"), changeFrequency: "monthly", priority: 0.6 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/standards"), changeFrequency: "monthly", priority: 0.6 },
    { url: u("/guides"), changeFrequency: "weekly", priority: 0.7 },
    ...GUIDES.map((g) => ({ url: u(`/guides/${g.slug}`), lastModified: g.updated, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
