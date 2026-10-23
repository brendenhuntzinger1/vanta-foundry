import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMetadata({ path, title, description }: { path: string; title?: string; description: string }): Metadata {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name}: Advanced Custom Websites, Payments & SEO for Any Business`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: SITE.name, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
