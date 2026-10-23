import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { IconArrow, IconCheck, IconMail, IconWhatsApp } from "@/components/icons";
import { OfferView } from "@/components/page-tracker";
import { TrackedLink } from "@/components/tracked-link";
import { CATALOG, NO_PUBLISHED_REPORT, QUANTITY_NOTE, REFERENCE_REPORT_ONLY, productPath } from "@/lib/catalog";
import { allReports } from "@/lib/reports";
import { JsonLd, breadcrumbs, faqPage, service } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE, emailLink, whatsappLink } from "@/lib/site";

const P = SEO_PAGES.wholesale;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

const FAQS = [
  { q: "Which peptides are available wholesale?", a: `Everything in the wholesale catalog: ${CATALOG.length} products, each with its vial sizes listed. For anything else, ask about factory-direct supply.` },
  { q: "What is the minimum order quantity (MOQ)?", a: "No minimum is published. Minimums depend on the products and quantities, so tell us what you need and your quote confirms it." },
  { q: "Are quantities listed per vial or per kit?", a: `Per vial. ${QUANTITY_NOTE}` },
  { q: "Can I request multiple compounds in one quote?", a: "Yes. Add each product to one inquiry in the catalog, with a size and number of vials for each, and send the list at once." },
  { q: "Can I review documentation before ordering?", a: "Yes. Published laboratory reports are linked from each product page and listed together on the testing page. Your quote names the lot you'll receive and its report." },
  { q: "How is wholesale pricing determined?", a: "By the products, vial sizes and quantities, and whether you want labelling or fulfillment. Pricing improves with quantity and is quoted in writing." },
  { q: "Where does the order ship from, and how are lead times confirmed?", a: "Shipping origin, method and lead time are stated on your quote before you commit, because they depend on the products, quantity and destination." },
  { q: "What happens if a product is unavailable?", a: "We tell you on the quote, and where we can, offer to source it factory-direct." },
  { q: "How do repeat orders work?", a: "Reply to your last quote to reorder, or set up a standing order so you don't re-order by hand." },
  { q: "Who can buy wholesale?", a: "Businesses that sell or use these materials for research. We don't supply businesses that market them for human or veterinary use." },
];

/**
 * /wholesale: the page that owns "wholesale peptides". /supply stays the
 * front door for research brands (wholesale, white label and 3PL together).
 * WhatsApp is the main way in here (owner, 2026-10-23).
 */
export default function WholesalePage() {
  const msg = "Hi Vanta Foundry, I'd like wholesale pricing.\n\nProducts and vial sizes: \nNumber of vials: \nBusiness name: \nShip to: ";
  const wa = whatsappLink(msg);
  const mail = emailLink("Wholesale pricing request", msg);
  const categories = [...new Set(CATALOG.map((p) => p.category))];
  const reports = allReports();
  const documented = CATALOG.filter((p) => !NO_PUBLISHED_REPORT.includes(p.slug) && !REFERENCE_REPORT_ONLY.includes(p.slug)).length;

  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/supply" className="hover:text-ink">Wholesale &amp; 3PL</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">Wholesale</span>
          </nav>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <h1 className="h-display text-[40px] leading-[1.02] text-ink sm:text-[58px]">{P.h1}</h1>
              <p className="mt-6 text-[18px] leading-[1.6] text-body">
                Looking for wholesale peptides for your business? Send the compounds, vial sizes and quantities you need. We reply
                with pricing, current availability and the laboratory report for your lot, before you confirm anything.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {wa ? (
                  <TrackedLink href={wa} target="_blank" rel="noopener noreferrer" props={{ channel: "whatsapp", form: "wholesale_hub" }} className="btn btn-dark h-12 px-6 text-[15px]">
                    <IconWhatsApp className="text-wa" /> {P.cta}
                  </TrackedLink>
                ) : (
                  <TrackedLink href={mail} props={{ channel: "email", form: "wholesale_hub" }} className="btn btn-dark h-12 px-6 text-[15px]">
                    <IconMail /> {P.cta}
                  </TrackedLink>
                )}
                <Link href="/catalog" className="btn btn-light h-12 px-6 text-[15px]">Browse the catalog</Link>
              </div>
              {wa && (
                <p className="mt-4 text-[14px] text-muted">
                  Or email:{" "}
                  <TrackedLink href={mail} props={{ channel: "email", form: "wholesale_hub" }} className="text-ink underline underline-offset-2">support@vantalabsresearch.com</TrackedLink>
                </p>
              )}
              <p className="mt-6 text-[13.5px] text-muted">For laboratory research use only. Not for human or veterinary use.</p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
              <Image src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" priority />
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Wholesale Peptide Catalog</h2>
              <p className="mt-3 text-[17px] leading-[1.6] text-body">{CATALOG.length} wholesale research peptides and related research materials. Each one has its own page with vial sizes, specifications and published reports.</p>
            </div>
            <Link href="/catalog" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              View the wholesale catalog <IconArrow />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c}>
                <h3 className="text-[15px] font-semibold text-ink">{c}</h3>
                <ul className="mt-3 space-y-2">
                  {CATALOG.filter((p) => p.category === c).map((p) => (
                    <li key={p.slug} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 text-[15px]">
                      <Link href={productPath(p.slug)} className="text-ink underline-offset-2 hover:underline">{p.name}</Link>
                      <span className="shrink-0 font-mono text-[12px] text-muted">{p.sizes.join(" · ")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-7 sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Available Formats and Quantities</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-body">
              Most products are supplied as lyophilized powder in single vials; a few are solutions. Each product page lists its vial
              sizes. {QUANTITY_NOTE} Blends list each component&rsquo;s amount as labelled on its laboratory report.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-bg-2 p-7 sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Testing and Batch Documentation</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-body">
              {documented} of {CATALOG.length} products have a published report from a named third-party laboratory whose product and labelled
              size match the listing; {REFERENCE_REPORT_ONLY.length} have a reference report only, and {NO_PUBLISHED_REPORT.length} have none yet ({reports.length} reports
              in all). Every wholesale lot comes with its certificate of analysis, matched by lot number.
            </p>
            <Link href="/wholesale/testing" className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              View available documentation <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="h-section text-[30px] text-ink sm:text-[40px]">How Wholesale Pricing Works</h2>
            <ul className="mt-6 space-y-3">
              {[
                "Quoted for your products, vial sizes and number of vials",
                "Tiered pricing: the unit price improves with quantity",
                "Labelling (white label) and fulfillment (3PL) quoted alongside, if you want them",
                "Large planned orders of bulk research peptides can be made factory-direct, at our lowest unit price",
                "In writing, before you commit",
              ].map((x) => (
                <li key={x} className="flex gap-3 text-[16px] text-ink"><IconCheck className="mt-0.5 shrink-0 text-gold" />{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-section text-[30px] text-ink sm:text-[40px]">How to Request a Wholesale Order</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Build your list", "Add products in the catalog, with a size and number of vials for each."],
                ["Send it", "On WhatsApp or by email, already written. Add your business name and where it ships."],
                ["Get your quote", "Pricing, availability, the lot's report and timing, in writing."],
                ["Confirm", "Approve the quote and we ship it, or store it and ship it as your brand."],
              ].map(([t, b]) => (
                <li key={t} className="border-l-2 border-line pl-4">
                  <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{t}</p>
                  <p className="mt-1 text-[15px] leading-[1.6] text-body">{b}</p>
                </li>
              ))}
            </ol>
            <Link href="/wholesale/ordering" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              Wholesale peptide ordering, in detail <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-7 sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Shipping and Lead Times</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-body">
              Shipping origin, method and lead time depend on the products, quantity and destination, so each one is stated on your
              quote before you commit. We don&rsquo;t publish delivery promises we can&rsquo;t check against your order. We can also store your
              stock and ship each order as your brand: <Link href="/fulfillment" className="text-ink underline underline-offset-2">dropshipping and 3PL</Link>.
            </p>
          </div>
          <div className="rounded-2xl border border-line p-7 sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Private Label Options</h2>
            <p className="mt-3 text-[16px] leading-[1.65] text-body">
              Sell under your own brand. We print labels to your design, you approve a proof before anything prints, and every unit
              carries its lot number and the research-use statement.
            </p>
            <Link href="/white-label" className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              Private label peptides <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Wholesale Peptide FAQs</h2>
            <div className="mt-8">
              <FaqList faqs={FAQS} />
            </div>
            <p className="mt-8 text-[15px] text-body">
              Comparing suppliers? Read <Link href="/guides/choose-wholesale-peptide-supplier" className="text-ink underline underline-offset-2">how to choose a wholesale peptide supplier</Link>.
              Need a website to sell it on? See <Link href="/website-development/peptide-websites" className="text-ink underline underline-offset-2">peptide website development</Link>.
            </p>
            <p className="mt-8 text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand title="Request wholesale pricing." lede="Send your list on WhatsApp or by email. A person on our team replies with pricing." primary={{ href: "/catalog", label: "Build your list" }} />

      <OfferView id="wholesale" type="wholesale" label="Wholesale peptides" />
      <JsonLd data={service({ name: "Wholesale Peptides & Bulk Supply", description: "Bulk supply of the Vanta research catalog at wholesale prices, quoted per inquiry. Research use only.", path: P.route, serviceType: "Wholesale supply" })} />
      <JsonLd data={faqPage(FAQS)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Wholesale & 3PL", path: "/supply" }, { name: "Wholesale", path: P.route }])} />
    </>
  );
}
