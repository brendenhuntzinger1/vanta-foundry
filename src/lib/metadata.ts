import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Titles put the page's subject first and the brand once, after a bar:
 * "Peptide Website Development | Vanta Foundry". Approved titles live in
 * src/lib/seo-pages.ts and are checked by `npm run check:seo`.
 */
export function pageMetadata({ path, title, description, noindex }: { path: string; title?: string; description: string; noindex?: boolean }): Metadata {
  const fullTitle = title ? (title.endsWith(`| ${SITE.name}`) ? title : `${title} | ${SITE.name}`) : HOME_TITLE;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: SITE.name, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const HOME_TITLE = `Wholesale Peptides, White Label & 3PL for Research Brands | ${SITE.name}`;
