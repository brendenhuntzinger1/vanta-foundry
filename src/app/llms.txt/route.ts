import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";
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
    `${SITE.name} is operated by ${SITE.parent} (${SITE.parentUrl}). Pricing, minimums and timelines are quoted per account after an application at ${SITE.url}/apply; none are published.`,
    "",
    RUO_NOTICE,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.name}](${SITE.url}/${s.slug}): ${s.answer}`),
    "",
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${SITE.url}/guides/${g.slug}): ${g.answer}`),
    "",
    "## Company",
    "",
    `- [Standards](${SITE.url}/standards): How supply is documented, and the research-use-only line partners are held to.`,
    `- [Apply](${SITE.url}/apply): One application for any combination of services, reviewed by a person.`,
    `- Contact: ${SITE.email}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
