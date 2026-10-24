import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { RUO_NOTICE, SITE } from "@/lib/site";
import { CATALOG, productPath } from "@/lib/catalog";
import { DEV_SERVICES } from "@/lib/dev-services";
import { SEO_PAGES } from "@/lib/seo-pages";

export const dynamic = "force-static";

/**
 * llms.txt (https://llmstxt.org): a plain-text map of the site for AI
 * assistants. Each service and guide appears with its quotable answer, so an
 * assistant can describe the business accurately without guessing.
 */
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.name} is operated by ${SITE.parent} (${SITE.parentUrl}). The wholesale catalog is at ${SITE.url}/catalog, with a page per product; pricing is sent on inquiry, and everything else is quoted. Website projects start at ${SITE.url}/start/website-development (a brief sent from the page). Wholesale inquiries go on WhatsApp or to ${SITE.email}.`,
    "",
    RUO_NOTICE,
    "",
    "## Wholesale peptides (research use only)",
    "",
    ...[SEO_PAGES.wholesale, SEO_PAGES.catalog, SEO_PAGES.testing, SEO_PAGES.ordering].map((p) => `- [${p.h1}](${SITE.url}${p.route}): ${p.description}`),
    `- Products: ${CATALOG.map((p) => `[${p.name}](${SITE.url}${productPath(p.slug)})`).join(", ")}`,
    "",
    "## Supply, fulfillment and payments for research brands",
    "",
    ...SERVICES.filter((s) => !["website-development", "wholesale"].includes(s.slug)).map((s) => `- [${s.name}](${SITE.url}/${s.slug}): ${s.answer}`),
    "",
    "## Websites for research brands",
    "",
    `- [${SEO_PAGES.websiteDevelopment.h1}](${SITE.url}/website-development): ${SEO_PAGES.websiteDevelopment.description}`,
    ...DEV_SERVICES.map((d) => `- [${d.seo.h1}](${SITE.url}${d.seo.route}): ${d.seo.description}`),
    "",
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${SITE.url}/guides/${g.slug}): ${g.answer}`),
    "",
    "## Company",
    "",
    `- [Standards](${SITE.url}/standards): How supply is documented, and the research-use-only line partners are held to.`,
    `- [Get started](${SITE.url}/get-started): Pick services and send the request on WhatsApp or by email.`,
    `- [Wholesale & 3PL](${SITE.url}/supply): Research peptides wholesale or factory-direct with a COA for every wholesale lot, white label and 3PL fulfillment. Research use only.`,
    `- [Our work](${SITE.url}/work): Research-supply stores our team designed and coded: Vanta Labs and Genesis Biomapping, both live.`,
    `- [Vanta Labs case study](${SITE.url}/work/vanta-labs): ${SEO_PAGES.caseVantaLabs.description}`,
    `- [Glossary](${SITE.url}/glossary): Plain-English definitions of payments, SEO/GEO and supply terms.`,
    `- [About](${SITE.url}/about): The team behind ${SITE.builtStores.join(", ")} and more.`,
    `- [Contact](${SITE.url}/contact): WhatsApp +${SITE.whatsapp} or ${SITE.email}.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
