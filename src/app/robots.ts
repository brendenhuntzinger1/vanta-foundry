import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Open to search engines AND to AI crawlers. The marketing plan is organic and
 * AI-search visibility instead of ads, so blocking GPTBot, ClaudeBot,
 * PerplexityBot and the rest would defeat the point. Only the API is closed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
