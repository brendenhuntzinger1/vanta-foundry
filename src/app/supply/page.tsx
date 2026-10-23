import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { SupplyBento } from "@/components/service-bento";
import { CatalogBrowser } from "@/app/catalog/catalog-browser";
import { IconArrow, IconCheck, IconWhatsApp } from "@/components/icons";
import { CATALOG } from "@/lib/catalog";
import { getService } from "@/lib/services";
import { JsonLd, ORG_ID, breadcrumbs, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { RUO_NOTICE, SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/supply",
  title: "Peptide wholesale, white label & 3PL",
  description:
    "Research peptides wholesale or factory-direct with a COA for every wholesale lot, your own label on every vial, and storage, packing and shipping as your brand. Research use only.",
});

const STEPS = [
  { t: "Pick your products", b: "Browse the catalog below and tap Inquire, or send us your list." },
  { t: "Get a written quote", b: "Wholesale pricing, quantities and timing, in writing." },
  { t: "Label it (optional)", b: "Your brand on every vial. You approve the proof before anything prints." },
  { t: "We ship or store it", b: "Shipped to you, or stored, packed and shipped as your brand from our warehouse." },
];

const PROOF = [
  "A certificate of analysis with every wholesale lot",
  "Lot numbers on every unit",
  "Research-use-only labelling and copy",
  "The same supply our own store, Vanta Labs, runs on",
];

/**
 * /supply: the second front door. Everything for research-supply brands in
 * one premium page: wholesale (with the catalog right here), factory-direct,
 * white label, 3PL and RUO brand scaling. WhatsApp is the main way in here.
 */
export default function SupplyPage() {
  const wa = whatsappLink("Hi Vanta Foundry, I'd like wholesale pricing.");
  const faqs = ["wholesale", "factory-direct", "white-label", "fulfillment"]
    .map(getService)
    .flatMap((s) => (s ? s.faqs.slice(0, 2) : []));

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <Container className="pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-[14px] font-medium text-gold-fill">Wholesale &amp; 3PL · for research brands</p>
              <h1 className="h-display mt-5 text-[46px] leading-[0.98] sm:text-[76px]">
                Peptide supply,
                <span className="block text-white/45">done for you.</span>
              </h1>
              <p className="mt-7 max-w-[560px] text-[18px] leading-[1.6] text-white/70">
                Wholesale or factory-direct research peptides with a COA for every wholesale lot, your own label on every vial,
                and storage, packing and shipping as your brand.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="#catalog" className="btn h-14 bg-white px-8 text-[16px] text-ink hover:bg-white/90">
                  Browse the catalog <IconArrow />
                </Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn h-14 border border-white/20 px-8 text-[16px] text-white hover:bg-white/10">
                    <IconWhatsApp className="text-wa" /> Get wholesale pricing
                  </a>
                )}
              </div>
              <p className="mt-6 text-[13.5px] text-white/50">
                {CATALOG.length} products in stock · From the team behind {SITE.builtStores.slice(0, 2).join(" & ")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" priority />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/supply/factory-coa.webp" alt="A filling line with a certificate of analysis" fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/supply/warehouse.webp" alt="Racked stock in our warehouse" fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What we offer */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">Everything to run a research brand.</h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">Use one service or all four. Tap any to start.</p>
          </div>
          <div className="mt-12">
            <SupplyBento />
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="grid gap-10 rounded-[32px] border border-line bg-bg-2 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="h-section text-[32px] text-ink sm:text-[46px]">Documented, lot by lot.</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-body">
                Every wholesale lot comes with its certificate of analysis, matched by lot number to the units you receive.
              </p>
              <Link href="/standards" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
                Our standards <IconArrow />
              </Link>
            </div>
            <ul className="space-y-3">
              {PROOF.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-[16px] text-ink">
                  <IconCheck className="shrink-0 text-gold" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Catalog */}
      <section id="catalog" className="mt-24 scroll-mt-20 sm:mt-32">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">The catalog.</h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">
              Tap Inquire on any product and WhatsApp opens with it filled in. We reply with wholesale pricing.
            </p>
          </div>
          <div className="mt-12">
            <CatalogBrowser />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">How it works.</h2>
          </div>
          <ol className="mt-12 grid gap-3 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className={`rounded-2xl p-6 ${i === STEPS.length - 1 ? "bg-ink text-white" : "border border-line"}`}>
                <p className="text-[20px] font-semibold tracking-[-0.03em]">{s.t}</p>
                <p className={`mt-2 text-[14.5px] leading-[1.55] ${i === STEPS.length - 1 ? "text-white/70" : "text-body"}`}>{s.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* RUO scaling */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="grid gap-8 overflow-hidden rounded-[32px] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-[14px] font-medium text-gold-fill">RUO brand scaling</p>
              <h2 className="h-section mt-3 text-[32px] sm:text-[46px]">Launching or scaling a brand?</h2>
              <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-white/70">
                We can run the whole thing: product, label, warehouse and shipping, plus the website and payment processing to
                sell it. Answer a few questions and we&rsquo;ll plan it with you.
              </p>
              <Link href="/start/ruo-brand" className="btn mt-8 h-14 bg-white px-8 text-[16px] text-ink hover:bg-white/90">
                Plan my brand <IconArrow />
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src="/supply/unboxing.webp" alt="A branded mailer with vials in a foam insert" fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-center text-[36px] text-ink sm:text-[54px]">Questions.</h2>
            <div className="mt-10">
              <FaqList faqs={faqs} />
            </div>
            <p className="mt-10 text-center text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Get wholesale pricing."
        lede="Send us what you need on WhatsApp or by email. A person on our team replies with pricing."
        primary={{ href: "#catalog", label: "Browse the catalog" }}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Peptide wholesale, white label & 3PL", description: "Research peptides wholesale or factory-direct with COAs, white label and fulfillment. Research use only.", url: `${SITE.url}/supply`, provider: { "@id": ORG_ID } }} />
      <JsonLd data={faqPage(faqs)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Wholesale & 3PL", path: "/supply" }])} />
    </>
  );
}
