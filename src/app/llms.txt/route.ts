import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
import { INDUSTRIES } from "@/lib/industries";
import { RUO_NOTICE, SITE } from "@/lib/site";

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
    `${SITE.name} is operated by ${SITE.parent} (${SITE.parentUrl}). The product catalog is at ${SITE.url}/catalog; pricing is sent on inquiry, and everything else is quoted. To start, choose a service at ${SITE.url}/get-started (each has a one-minute guided flow at ${SITE.url}/start/<service>) and send the request on WhatsApp or to ${SITE.email}.`,
    "",
    RUO_NOTICE,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${SITE.url}/${s.slug}): ${s.answer}`),
    "",
    "## Industries",
    "",
    ...INDUSTRIES.map((i) => `- [${i.name}](${SITE.url}/industries/${i.slug}): ${i.answer}`),
    "",
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${SITE.url}/guides/${g.slug}): ${g.answer}`),
    "",
    "## Company",
    "",
    `- [Standards](${SITE.url}/standards): How supply is documented, and the research-use-only line partners are held to.`,
    `- [Get started](${SITE.url}/get-started): Pick services and send the request on WhatsApp or by email.`,
    `- [Our work](${SITE.url}/work): Storefronts our team designed and coded: research supply (Vanta Labs, live), skincare, coffee and athletic apparel.`,
    `- [Glossary](${SITE.url}/glossary): Plain-English definitions of payments, SEO/GEO and supply terms.`,
    `- [About](${SITE.url}/about): The team behind ${SITE.builtStores.join(", ")}.`,
    `- [Contact](${SITE.url}/contact): WhatsApp +${SITE.whatsapp} or ${SITE.email}.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
