import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { CatalogBrowser } from "./catalog-browser";
import { pageMetadata } from "@/lib/metadata";
import { CATALOG, NO_PUBLISHED_REPORT, QUANTITY_NOTE, REFERENCE_REPORT_ONLY, productPath } from "@/lib/catalog";
import { ContactButtons } from "@/components/contact-buttons";
import { OfferView } from "@/components/page-tracker";
import { JsonLd, breadcrumbs, faqPage, itemList } from "@/lib/jsonld";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE } from "@/lib/site";

const P = SEO_PAGES.catalog;

// Indexed since 2026-10-23 (organic growth plan): each product has its own
// page with specifications and published reports, and no prices are shown.
export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

const FAQS = [
  { q: "Is this everything you have?", a: "No. The catalog shows part of what we have. Ask us on WhatsApp or by email and we reply with availability and pricing, or source it factory-direct." },
  { q: "Are quantities per vial or per kit?", a: `Per vial. ${QUANTITY_NOTE}` },
  { q: "Can several products share one inquiry?", a: "Yes. Tap Add to list on each product, set the size and number of vials for each, then send the whole list on WhatsApp or by email from the bar at the bottom of the screen." },
  { q: "Where are the prices?", a: "We send them to you. Wholesale pricing depends on the products, sizes and quantities, so every inquiry gets a written quote." },
  { q: "Does selecting a product reserve stock?", a: "No. Availability is confirmed on your quote." },
];

export default function CatalogPage() {
  const sizes = CATALOG.reduce((n, p) => n + p.sizes.length, 0);
  const documented = CATALOG.filter((p) => !NO_PUBLISHED_REPORT.includes(p.slug) && !REFERENCE_REPORT_ONLY.includes(p.slug)).length;
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/wholesale" className="hover:text-ink">Wholesale</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">Catalog</span>
          </nav>
          <div className="mt-8 max-w-2xl">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">{P.h1}</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">
              {CATALOG.length} products in {sizes} vial sizes, ready for bulk peptide supply. {documented} have a published laboratory report
              whose product and labelled size match the listing. No prices are listed: tap <strong className="font-semibold text-ink">Inquire</strong> on any product, or add
              several to one list, and we reply with wholesale pricing.
            </p>
            <p className="mt-4 text-[15px] text-body">
              <Link href="/wholesale/testing" className="text-ink underline underline-offset-2">Batch testing documentation</Link>
              {" · "}
              <Link href="/wholesale/ordering" className="text-ink underline underline-offset-2">How ordering works</Link>
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-bg-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="max-w-xl">
              <p className="text-[17px] font-semibold text-ink">This isn&rsquo;t everything we have.</p>
              <p className="mt-1.5 text-[15.5px] leading-[1.6] text-body">
                We list part of our range online. If you don&rsquo;t see what you need, ask us: we have more than what&rsquo;s
                shown, and anything else we source factory-direct, label with your brand and store and ship for you (3PL).
              </p>
            </div>
            <ContactButtons
              single
              message="Hi Vanta Foundry, I'm looking for a product I don't see in your catalog:"
              subject="Product request"
              className="shrink-0"
            />
          </div>
          <div className="mt-10">
            <CatalogBrowser />
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Catalog questions</h2>
            <div className="mt-8">
              <FaqList faqs={FAQS} />
            </div>
            <p className="mt-10 text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand title="Get wholesale pricing." lede="Send your list on WhatsApp or by email. A person on our team replies with pricing." primary={{ href: "/wholesale/ordering", label: "How ordering works" }} />

      <OfferView id="catalog" type="wholesale" label="Wholesale catalog" />
      <JsonLd data={itemList("Wholesale peptide catalog", CATALOG.map((p) => ({ name: p.name, path: productPath(p.slug) })))} />
      <JsonLd data={faqPage(FAQS)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Wholesale", path: "/wholesale" }, { name: "Catalog", path: "/catalog" }])} />
    </>
  );
}
