import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { OfferView } from "@/components/page-tracker";
import { ReportList } from "@/components/report-list";
import { CATALOG, NO_PUBLISHED_REPORT, productPath } from "@/lib/catalog";
import { STORE_FACTS_READ_ON } from "@/lib/product-facts";
import { allReports } from "@/lib/reports";
import { JsonLd, breadcrumbs, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE, SITE } from "@/lib/site";

const P = SEO_PAGES.testing;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

const FAQS = [
  { q: "Who issued the reports?", a: "Named third-party laboratories. Each report shows the laboratory's name; the list above says which laboratory issued each one." },
  { q: "Does a report match the lot I'll receive?", a: "Not necessarily. Each report covers the batch printed on it, and that batch hasn't been confirmed as the one in current wholesale stock. Your quote names the lot you'll receive and its report. Check that the lot number on your vials matches the report." },
  { q: "What does an HPLC purity result cover?", a: "The share of the detected signal that belongs to the main compound, at the wavelength the method used. It doesn't measure net peptide content, sterility, endotoxin, residual solvents or heavy metals unless those tests appear on the report." },
  { q: "How can I check a report is genuine?", a: "With the laboratory. Kovera Labs reports can be checked at the laboratory's verify page with the report number and the access code shown on the Vanta Labs product page. Horizon Analytical reports can be searched by lot number on the laboratory's site." },
  { q: "Is every product tested?", a: "No, not yet. The products without a published report are listed on this page, and we'll say so on your quote." },
];

/**
 * /wholesale/testing: every published report in one place, with what each
 * test does and doesn't establish. Reports link to the laboratory documents
 * the Vanta Labs store publishes; nothing here is a summary we wrote of a
 * result that isn't on a report (docs/COMPLIANCE.md).
 */
export default function TestingPage() {
  const reports = allReports();
  const missing = CATALOG.filter((p) => NO_PUBLISHED_REPORT.includes(p.slug));
  const labs = [...new Set(reports.map((r) => r.lab))];

  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/wholesale" className="hover:text-ink">Wholesale</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">Testing</span>
          </nav>
          <div className="mt-10 max-w-[820px]">
            <h1 className="h-display text-[40px] leading-[1.02] text-ink sm:text-[58px]">{P.h1}</h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-body">
              A certificate of analysis (COA) is the laboratory&rsquo;s report on one batch. Below is every report published for the
              Vanta catalog: {reports.length} reports from {labs.join(" and ")}, each linked to the laboratory&rsquo;s own document. Your
              wholesale quote names the lot you&rsquo;ll receive and its report.
            </p>
            <a href="#reports" className="btn btn-dark mt-8 h-12 px-6 text-[15px]">{P.cta}</a>
          </div>
        </Container>
      </section>

      <section className="mt-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-foundry min-w-0">
            <section>
              <h2>Find Documentation</h2>
              <p>
                Every report here comes from third-party testing by a named laboratory, not an in-house test. Every product page in
                the <Link href="/catalog">wholesale catalog</Link> lists its published reports, one per vial size
                where the laboratory reports sizes separately. The full list is below. The same reports are published in the Vanta Labs{" "}
                <a href={`${SITE.parentUrl}/coa-library`} target="_blank" rel="noopener noreferrer">COA library</a>, which can be searched by
                product, batch or lot number.
              </p>
            </section>
            <section>
              <h2>Match the Batch</h2>
              <p>
                A report covers the batch it names, never another. Each Kovera Labs report has a report number (for example
                KVR-2026-6B1171) and prints the batch and labelled size it tested; Horizon Analytical reports are identified by lot.
                When your order arrives, check that the lot on the vials matches the report named on your quote.
              </p>
              <p>
                Below, <strong>matches product and size</strong> means the product and labelled size printed on the report match the
                listing. It doesn&rsquo;t confirm that the printed batch is the batch in current wholesale stock; that is confirmed on your
                quote, which names your lot. A <strong>reference</strong> report is published but doesn&rsquo;t match the size or lot we
                list: a partner&rsquo;s lot, a different labelled size, or no batch number. Each one says which.
              </p>
            </section>
            <section>
              <h2>Test Methods</h2>
              <ul>
                <li><strong>HPLC purity test.</strong> Reverse-phase HPLC separates the compounds in a sample; purity is the main peak&rsquo;s share of the detected signal, at a stated UV wavelength (214 nm for most peptides here, 260 nm for NAD+).</li>
                <li><strong>Identity by LC-MS mass spec.</strong> LC-MS (or UPLC/MS) confirms the compound&rsquo;s measured mass matches the expected one.</li>
                <li><strong>Identity screens.</strong> For multi-component solutions (B12, LIPO-C), the report lists the compounds detected in the vial, not their amounts.</li>
              </ul>
            </section>
          </div>
          <div className="prose-foundry min-w-0">
            <section>
              <h2>Report Limits</h2>
              <p>A purity result is one measurement. Unless the report includes a separate test for it, it does not establish:</p>
              <ul>
                <li>net peptide content (how much of the powder&rsquo;s weight is the peptide)</li>
                <li>sterility or endotoxin levels</li>
                <li>residual solvents or heavy metals</li>
                <li>anything about a different batch</li>
              </ul>
              <p>Read what a report covers before relying on it. Our guide explains each section: <Link href="/guides/read-peptide-coa">how to read a peptide certificate of analysis</Link>.</p>
            </section>
            <section>
              <h2>Verify with the Laboratory</h2>
              <p>
                Kovera Labs reports can be checked on the laboratory&rsquo;s verify page with the report number and access code; Horizon
                Analytical reports can be searched by lot number. The access codes are on each product page of the Vanta Labs store.
              </p>
            </section>
          </div>
        </Container>
      </section>

      <section id="reports" className="mt-20 scroll-mt-24">
        <Container>
          <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Published reports</h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-[1.6] text-body">
            As published by the Vanta Labs store, read {STORE_FACTS_READ_ON}. Each row shows the batch printed on the report. Results are quoted exactly as
            the store lists them.
          </p>
          <div className="mt-8">
            <ReportList reports={reports} showProduct />
          </div>
          {missing.length > 0 && (
            <p className="mt-6 text-[15px] leading-[1.6] text-body">
              No report published yet:{" "}
              {missing.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && ", "}
                  <Link href={productPath(p.slug)} className="text-ink underline underline-offset-2">{p.name}</Link>
                </span>
              ))}
              . Ask about documentation for your lot before ordering.
            </p>
          )}
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Testing questions</h2>
            <div className="mt-8">
              <FaqList faqs={FAQS} />
            </div>
            <p className="mt-8 text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand title="Ask for the report for your lot." lede="Send your product list and we reply with pricing and the documentation for the lot you'll receive." primary={{ href: "/catalog", label: "Build your list" }} />

      <OfferView id="wholesale-testing" type="wholesale" label="Testing and COAs" />
      <JsonLd data={faqPage(FAQS)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Wholesale", path: "/wholesale" }, { name: "Testing", path: P.route }])} />
    </>
  );
}
