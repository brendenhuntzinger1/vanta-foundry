import { FLOWS } from "@/lib/flows";
import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { CATALOG, productPath } from "@/lib/catalog";
import { DEV_SERVICES } from "@/lib/dev-services";
import { STORE_FACTS_READ_ON } from "@/lib/product-facts";
import { SEO_PAGES } from "@/lib/seo-pages";
import { SITE } from "@/lib/site";

/**
 * Canonical, public, indexable pages only. `lastModified` is the date of the
 * last real content revision where we know it (seo-pages.ts, guides, product
 * facts), never the build date; pages without a recorded date leave it out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  const registered = new Map<string, string>(Object.values(SEO_PAGES).map((p) => [p.route, p.updated]));
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: u(path),
    ...(registered.has(path) ? { lastModified: registered.get(path) } : {}),
    changeFrequency,
    priority,
  });
  const dedicated = new Set(["website-development", "wholesale"]);
  return [
    page("/", 1, "weekly"),
    page("/website-development", 0.95),
    ...DEV_SERVICES.map((d) => page(d.seo.route, 0.9)),
    page("/wholesale", 0.95),
    page("/catalog", 0.9, "weekly"),
    ...CATALOG.map((p) => ({ url: u(productPath(p.slug)), lastModified: STORE_FACTS_READ_ON, changeFrequency: "monthly" as const, priority: 0.8 })),
    page("/wholesale/testing", 0.85),
    page("/wholesale/ordering", 0.85),
    page("/supply", 0.9),
    ...SERVICES.filter((s) => !dedicated.has(s.slug)).map((s) => page(`/${s.slug}`, 0.85)),
    page("/work", 0.8),
    page("/work/vanta-labs", 0.75),
    ...Object.keys(FLOWS).map((k) => page(`/start/${k}`, 0.5, "yearly")),
    page("/get-started", 0.6, "yearly"),
    page("/guides", 0.7, "weekly"),
    ...GUIDES.map((g) => ({ url: u(`/guides/${g.slug}`), lastModified: g.updated, changeFrequency: "monthly" as const, priority: 0.7 })),
    page("/about", 0.6, "yearly"),
    page("/contact", 0.6, "yearly"),
    page("/standards", 0.5),
    page("/glossary", 0.5),
  ];
}
