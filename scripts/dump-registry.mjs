// Writes the approved page registry and catalog names to JSON for the keyword
// reports (scripts/keyword-*.py), so they read the same source as the site.
import { writeFileSync } from "node:fs";
import { SEO_PAGES } from "../src/lib/seo-pages.ts";
import { CATALOG } from "../src/lib/catalog.ts";

writeFileSync(
  "docs/research/seo-registry.json",
  JSON.stringify({ pages: Object.values(SEO_PAGES), catalog: CATALOG.map((p) => ({ slug: p.slug, name: p.name })) }, null, 1) + "\n",
);
