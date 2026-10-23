import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { isPreview } from "@/lib/env";

/**
 * Open to search engines AND to AI crawlers. The marketing plan is organic and
 * AI-search visibility instead of ads, so blocking OAI-SearchBot, ClaudeBot,
 * PerplexityBot and the rest would defeat the point. Only the API is closed,
 * and framework assets under /_next stay crawlable so pages render.
 *
 * Preview deployments disallow everything and also send `X-Robots-Tag:
 * noindex` (next.config.ts), so a preview URL is never an index target.
 */
export default function robots(): MetadataRoute.Robots {
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
