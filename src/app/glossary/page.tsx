import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand } from "@/components/blocks";
import { JsonLd, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/glossary",
  title: "Glossary",
  description: "Plain-English definitions of payment processing, SEO and AI search, fulfillment and research-supply terms: chargeback, reserve, MATCH list, GEO, llms.txt, 3PL, MOQ, COA, HPLC and more.",
});

type Term = { t: string; d: string; href?: string };

const GROUPS: { name: string; terms: Term[] }[] = [
  {
    name: "Payments",
    terms: [
      { t: "Merchant account", d: "An account that lets a business accept card payments, held with a payment processor and its sponsor bank.", href: "/payment-processing" },
      { t: "Payment aggregator", d: "A provider such as Stripe, PayPal or Square that approves accounts instantly under one master account, and reviews them afterwards.", href: "/guides/payment-processor-shut-down-what-to-do" },
      { t: "High-risk merchant account", d: "A merchant account for business types processors expect to have more chargebacks or regulatory questions, usually with closer underwriting and reserves.", href: "/guides/high-risk-vs-standard-merchant-account" },
      { t: "Chargeback", d: "A payment reversed by the cardholder's bank after a customer disputes it. Too many put a merchant account at risk." },
      { t: "Chargeback ratio", d: "Chargebacks as a share of transactions in a period. Processors set limits, and going over them can lead to fines or closure." },
      { t: "Reserve", d: "Part of a merchant's sales held back by the processor for a period, to cover future refunds and chargebacks." },
      { t: "MATCH list", d: "A list card networks keep of merchants whose accounts were closed for specific reasons. Being on it makes a new account harder to get." },
      { t: "Backup processor", d: "A second processor already connected to your checkout, so a closure or outage at the first one becomes a switch instead of a shutdown.", href: "/guides/why-run-a-backup-payment-processor" },
      { t: "Underwriting", d: "The processor's review of a business before approving a merchant account: what it sells, its website and its processing history." },
    ],
  },
  {
    name: "Search & AI",
    terms: [
      { t: "SEO", d: "Search engine optimisation: the work that gets a website's pages ranked in Google and other search engines.", href: "/seo-ai-search" },
      { t: "GEO", d: "Generative engine optimisation: making a business easy for AI tools such as ChatGPT, Gemini and Perplexity to understand, cite and recommend.", href: "/guides/seo-vs-geo" },
      { t: "AI Overviews", d: "Google's AI-written summaries shown above some search results, drawn from web pages it considers reliable." },
      { t: "Structured data", d: "Code on a page (schema.org) that tells search engines and AI tools exactly what the page is about: a business, a service, an FAQ, a product." },
      { t: "llms.txt", d: "A plain-text file at a site's root that summarises the site for AI assistants, with links to its key pages." },
      { t: "Google Business Profile", d: "A business's listing on Google Search and Maps, with its address, hours, reviews and photos. The core of local SEO." },
      { t: "Core Web Vitals", d: "Google's measures of how fast and stable a page feels to visitors. Part of how pages are ranked." },
    ],
  },
  {
    name: "Supply & fulfillment",
    terms: [
      { t: "3PL", d: "Third-party logistics: a partner that stores your stock, packs your orders and ships them for you.", href: "/fulfillment" },
      { t: "Dropshipping", d: "Selling products your supplier ships directly to your customer, so you hold no stock.", href: "/guides/dropship-vs-3pl-vs-inventory" },
      { t: "Kitting", d: "Assembling several items into one package or bundle before it ships." },
      { t: "White label", d: "An existing product sold under your brand, with your label on it.", href: "/white-label" },
      { t: "Private label", d: "A product made for your brand to an agreed specification.", href: "/guides/white-label-vs-private-label-vs-factory-direct" },
      { t: "Factory-direct", d: "Ordering straight from the manufacturer, usually in large quantities, for the lowest unit cost.", href: "/factory-direct" },
      { t: "MOQ", d: "Minimum order quantity: the smallest order a supplier will accept for a product." },
      { t: "Lot number", d: "The identifier for a batch made together. It links each unit to that batch's documentation." },
      { t: "COA", d: "Certificate of analysis: a lab document reporting test results for a specific lot.", href: "/guides/what-a-certificate-of-analysis-should-show" },
      { t: "HPLC", d: "High-performance liquid chromatography: a lab method commonly used to measure the purity of a sample, reported on many COAs." },
      { t: "Research use only (RUO)", d: "A label meaning a material is supplied for laboratory research, not for human or veterinary use.", href: "/standards" },
    ],
  },
];

export default function GlossaryPage() {
  const all = GROUPS.flatMap((g) => g.terms);
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Glossary.</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">The terms that come up in payments, search and supply, in plain English.</p>
          </div>
          <div className="mt-12 space-y-14">
            {GROUPS.map((g) => (
              <div key={g.name}>
                <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-ink">{g.name}</h2>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  {g.terms.map((x) => (
                    <div key={x.t} id={x.t.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                      <dt className="text-[16px] font-semibold text-ink">{x.t}</dt>
                      <dd className="text-[15.5px] leading-[1.6] text-body">
                        {x.d}
                        {x.href && (
                          <>
                            {" "}
                            <Link href={x.href} className="text-ink underline underline-offset-2">More</Link>
                          </>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: `${SITE.name} glossary`,
          url: `${SITE.url}/glossary`,
          hasDefinedTerm: all.map((x) => ({ "@type": "DefinedTerm", name: x.t, description: x.d })),
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Glossary", path: "/glossary" }])} />
    </>
  );
}
