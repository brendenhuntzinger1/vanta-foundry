import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand } from "@/components/blocks";
import { IconArrow, IconArrowUpRight } from "@/components/icons";
import { JsonLd, ORG_ID, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { SITE } from "@/lib/site";

const P = SEO_PAGES.caseVantaLabs;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

/*
 * Everything below was checked against the live store on 2026-10-23. Vanta
 * Labs is our own store (common ownership is stated on the page). No traffic,
 * conversion or revenue figures are published here, because none has been
 * approved for publication.
 */
const SECTIONS: { h: string; p: string[]; list?: string[] }[] = [
  {
    h: "Starting Point",
    p: [
      "Vanta Labs is our own research-supply store; Vanta Foundry is operated by Vanta Labs. It needed what every research-supply business needs and few sites get right: a catalog buyers can trust, documentation they can check themselves, and an ordering path for both single units and wholesale quantities, all written to a strict research-use-only standard.",
    ],
  },
  {
    h: "Scope",
    p: ["Our team designed and hand-coded the store and runs it. The build covers:"],
    list: [
      "Design and front end, mobile-first",
      "Catalog, product pages and specification data",
      "Laboratory reports per vial size, and a searchable COA library",
      "Checkout with quantity pricing, and a wholesale request form",
      "Research-use and 21+ access gate, accounts and order tracking",
      "A library of research and documentation guides",
    ],
  },
  {
    h: "Catalog",
    p: [
      "Products are organised by category, each size listed once. Every product page carries the compound's identity data where it applies: synonyms and codes, description, available sizes, supplied form, CAS number, molecular formula and weight, and sequence, with the source (PubChem or FDA GSRS) and the date it was read. Blends list each component as labelled on the laboratory report.",
    ],
  },
  {
    h: "Documentation",
    p: [
      "Each product lists its published laboratory reports: report number, vial size, method, result, laboratory and date, with a link to the laboratory's own PDF and the access code for checking it with the laboratory. A COA library lists every published report and can be searched by product, compound, batch or lot number. Where no report is published, the page says so instead of hiding it.",
      "We use the same reports on this site: see peptide testing and batch COAs.",
    ],
  },
  {
    h: "Order Workflow",
    p: [
      "Buyers pick a size, see quantity pricing for single units and larger quantities, and check out. Wholesale buyers use a separate request form: compounds, estimated volume and cadence, reviewed before pricing is issued, with nothing ordered or charged on submission. Visitors confirm they are 21 or older and that products are for research use before entering.",
    ],
  },
  {
    h: "Results and Limits",
    p: [
      "This page describes what was built and is live today; you can check every part of it on the store. We don't publish Vanta Labs' traffic, conversion or revenue figures here, and we haven't approved any for publication. Because it's our own store, it's proof of what our team builds and runs, not a client testimonial.",
    ],
  },
];

export default function VantaLabsCaseStudy() {
  return (
    <>
      <article className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/work" className="hover:text-ink">Our work</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">Vanta Labs</span>
          </nav>
          <div className="mt-10 max-w-[860px]">
            <h1 className="h-display text-[38px] leading-[1.03] text-ink sm:text-[56px]">{P.h1}</h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-body">
              A research-supply store with a specification page per product, laboratory reports per vial size, a searchable COA
              library, quantity pricing and wholesale requests. Built and run by our team, for our own brand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start/website-development" className="btn btn-dark h-12 px-6 text-[15px]">{P.cta} <IconArrow /></Link>
              <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light h-12 px-6 text-[15px]">
                Visit vantalabsresearch.com <IconArrowUpRight />
              </a>
            </div>
          </div>
          <div className="mt-14 overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
            <Image src="/showcase/vanta-labs-desktop.webp" alt="The Vanta Labs store homepage" width={2160} height={1148} sizes="(min-width: 1160px) 1120px, 100vw" className="hidden h-auto w-full sm:block" priority />
            <div className="max-h-[620px] overflow-hidden sm:hidden">
              <Image src="/showcase/vanta-labs-phone.webp" alt="The Vanta Labs store on a phone" width={780} height={1688} sizes="100vw" className="h-auto w-full" priority />
            </div>
          </div>

          <div className="prose-foundry mx-auto mt-16 max-w-[720px]">
            {SECTIONS.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((p) => (
                  <p key={p}>
                    {p.includes("peptide testing and batch COAs") ? (
                      <>
                        We use the same reports on this site: see <Link href="/wholesale/testing">peptide testing and batch COAs</Link>.
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => <li key={li}>{li}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <section>
              <h2>Building something similar?</h2>
              <p>
                See <Link href="/website-development/peptide-websites">peptide website development</Link> for how we scope a store like
                this, or <Link href="/website-development/integrations">ecommerce integrations</Link> for the systems behind it.
              </p>
            </section>
          </div>
        </Container>
      </article>

      <CtaBand
        title="Want one like it?"
        lede="Tell us about your project in about a minute. A project lead replies with a quote and a timeline, in writing."
        primary={{ href: "/start/website-development", label: P.cta }}
        contact={false}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: P.h1,
          description: P.description,
          datePublished: P.updated,
          dateModified: P.updated,
          mainEntityOfPage: `${SITE.url}${P.route}`,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          about: { "@type": "WebSite", name: SITE.parent, url: SITE.parentUrl },
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Our work", path: "/work" }, { name: "Vanta Labs", path: P.route }])} />
    </>
  );
}
