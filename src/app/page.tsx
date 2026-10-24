import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { FeaturedWork } from "@/components/featured-work";
import { SupplyBento, WebBento } from "@/components/service-bento";
import { SupplyShowcase } from "@/components/supply-showcase";
import { IconArrow, IconWhatsApp } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE, SITE, whatsappLink } from "@/lib/site";
import { CATALOG } from "@/lib/catalog";

/*
 * Vanta Foundry is the research-brand company (owner, 2026-10-24): wholesale
 * peptides, factory-direct supply, white label and 3PL, plus the website and
 * payment processing to sell them. Website development for every industry
 * moves to its own site; nothing here pitches to non-research businesses.
 */

export const metadata: Metadata = pageMetadata({ path: "/", title: SEO_PAGES.home.title, description: SEO_PAGES.home.description });

const FAQS = [
  {
    q: "What does Vanta Foundry do?",
    a: "Everything a research peptide brand needs, run by one team: wholesale peptides from our catalog with a COA for every lot, factory-direct supply, your label on every vial, 3PL storage and shipping, and the website and payment processing to sell it all.",
  },
  {
    q: "Can you get products that aren't in the catalog?",
    a: "Yes. The catalog is what we keep in stock. Tell us what you need on WhatsApp or by email and we source it, with documentation, and quote it in writing.",
  },
  {
    q: "Can I start a brand from nothing?",
    a: "Yes. Tell us what you want to sell and we plan it with you: products, label, the store, payments and fulfillment. Use one service or all of them.",
  },
  {
    q: "Do your peptides come with documentation?",
    a: "Yes. Every wholesale lot comes with a certificate of analysis, and every unit carries a lot number. All research supply is for research use only.",
  },
  {
    q: "How much does it cost?",
    a: "Everything is quoted for your brand, in writing. Tap Inquire on any product for wholesale pricing, or tell us what you need and we quote the rest.",
  },
];

export default function Home() {
  const wa = whatsappLink("Hi Vanta Foundry, I'd like wholesale pricing.");
  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <h1 className="h-display text-[42px] leading-[1] text-ink sm:text-[60px] xl:text-[66px]">
                Wholesale research peptides.{" "}
                <span className="accent block">Everything to scale your brand.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-body sm:text-[19px]">
                {CATALOG.length} peptides in stock with a COA for every lot, and anything else we source. Plus the website,
                payment processing, white label and 3PL to launch and scale your peptide company. One team.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/catalog" className="btn btn-dark h-14 px-8 text-[16px]">
                  {SEO_PAGES.home.cta} <IconArrow />
                </Link>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-14 px-8 text-[16px]">
                    <IconWhatsApp className="text-wa" /> Get wholesale pricing
                  </a>
                )}
              </div>
              <Link href="/start/ruo-brand" className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-body underline-offset-4 hover:text-ink hover:underline">
                Starting a brand from scratch? Plan it with us <IconArrow />
              </Link>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              <HeroCard href="/website-development" title="Website development" note="SEO, AEO & GEO · your own developer team 24/7" wide>
                <div className="absolute inset-x-4 top-4 overflow-hidden rounded-t-lg border border-b-0 border-white/10 sm:inset-x-6 sm:top-6">
                  <div className="flex items-center gap-1 bg-[#1d1d20] px-2.5 py-1.5" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="ml-2 text-[9.5px] text-white/50">vantalabsresearch.com</span>
                  </div>
                  <Image src="/showcase/vanta-labs-desktop.webp" alt="The Vanta Labs store, built by our team" width={2160} height={1147} sizes="(min-width: 1024px) 520px, 90vw" className="h-auto w-full" priority />
                </div>
                <ul className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 sm:bottom-4 sm:left-6">
                  {["Google SEO", "AEO", "GEO", "Developer team 24/7"].map((x) => (
                    <li key={x} className="rounded-full bg-ink/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.6)] sm:text-[12px]">{x}</li>
                  ))}
                </ul>
              </HeroCard>
              <HeroCard href="/catalog" title="Wholesale catalog" note={`${CATALOG.length} in stock · we source the rest`}>
                <div className="absolute inset-x-3 top-3 overflow-hidden rounded-t-lg border border-b-0 border-white/10 bg-white">
                  <div className="flex items-center gap-1 bg-[#1d1d20] px-2.5 py-1.5" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span className="ml-1.5 truncate text-[9px] text-white/50">vantafoundry.com/catalog</span>
                  </div>
                  <Image src="/showcase/catalog-desktop.webp" alt="Our wholesale catalog: products with COA badges and Inquire buttons" width={1179} height={1308} sizes="(min-width: 1024px) 260px, 90vw" className="h-auto w-full" />
                </div>
              </HeroCard>
              <HeroCard href="/payment-processing" title="Payment processing" note="Cards, Apple Pay, Google Pay · backup ready">
                <CheckoutPhone />
              </HeroCard>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-3 border-y border-line py-6 sm:flex-row sm:justify-between">
            <p className="text-[13.5px] text-muted">The team behind</p>
            <ul className="flex flex-wrap justify-center gap-x-9 gap-y-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="text-[17px] font-semibold tracking-[-0.02em] text-ink/70">{b}</li>
              ))}
              <li className="text-[17px] tracking-[-0.02em] text-muted">and more</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Everything to launch */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="max-w-[760px]">
            <h2 className="h-section text-[38px] text-ink sm:text-[58px]">
              What we <span className="accent">do.</span>
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">Use one or all of it. Tap any to start.</p>
          </div>
          <p className="mt-12 text-[15px] font-medium text-ink">Supply, label and ship</p>
          <div className="mt-4">
            <SupplyBento />
          </div>
          <p className="mt-10 text-[15px] font-medium text-ink">Sell it</p>
          <div className="mt-4">
            <WebBento />
          </div>
        </Container>
      </section>

      {/* The catalog */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <SupplyShowcase />
        </Container>
      </section>

      {/* Stores we built */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[680px]">
              <h2 className="h-section text-[38px] text-ink sm:text-[58px]">
                Stores we <span className="accent">built.</span>
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-body">Two live research-supply stores. We can build yours.</p>
            </div>
            <Link href="/website-development" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              Websites &amp; payments <IconArrow />
            </Link>
          </div>
          <div className="mt-12">
            <FeaturedWork />
          </div>
        </Container>
      </section>

      <section id="faq" className="mt-24 scroll-mt-20 sm:mt-32">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-center text-[36px] text-ink sm:text-[52px]">Questions.</h2>
            <div className="mt-10">
              <FaqList faqs={FAQS} />
            </div>
            <p className="mt-10 text-center text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand title="Get wholesale pricing." lede="Tell us what you need, in the catalog or not. A person on our team replies." primary={{ href: "/catalog", label: "Browse the catalog" }} />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}

function HeroCard({ href, title, note, wide, children }: { href: string; title: string; note: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`group flex flex-col overflow-hidden rounded-2xl bg-[#141416] ${wide ? "sm:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${wide ? "h-[170px] sm:h-[230px]" : "h-[190px] sm:h-[210px]"}`} aria-hidden="true">
        {children}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-white">
        <span>
          <span className="block text-[14px] font-semibold tracking-[-0.02em] sm:text-[15px]">{title}</span>
          <span className="block text-[11.5px] text-white/55 sm:text-[12.5px]">{note}</span>
        </span>
        <IconArrow className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

/** A phone checkout, as a buyer on a store we build sees it. No prices: those are quoted. */
function CheckoutPhone() {
  const vial = CATALOG.find((p) => p.slug === "bpc-157");
  return (
    <div className="absolute inset-0 flex justify-center bg-gradient-to-b from-[#1f1f23] to-[#141416] pt-5">
      <div className="w-[190px] rounded-t-[30px] border-[6px] border-b-0 border-[#2b2b30] bg-white px-3.5 pt-3 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.6)]">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-[#e7e7e4]" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-ink">Checkout</span>
          <span className="flex items-center gap-1 text-[9px] text-[#2f9e5b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2f9e5b]" /> Secure
          </span>
        </div>
        {vial && (
          <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-line p-1.5">
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-bg-2">
              <Image src={vial.image} alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[10.5px] font-medium text-ink">{vial.name}</span>
              <span className="block text-[9px] text-muted">Wholesale order</span>
            </span>
          </div>
        )}
        <div className="mt-2.5 flex h-8 items-center justify-center gap-1 rounded-lg bg-black text-[11px] font-semibold text-white">
          <svg width="10" height="12" viewBox="0 0 14 17" aria-hidden="true"><path fill="currentColor" d="M11.6 9c0-2 1.6-2.9 1.7-3-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7C3.4 4.5 2.1 5.3 1.4 6.6c-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2s1.4-.6 2.6-.6 1.5.6 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2-.8-2-3.3ZM9.7 3.1c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1Z" /></svg>
          Pay
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {["Card", "G Pay", "Link"].map((x) => (
            <span key={x} className="flex h-6 items-center justify-center rounded-md border border-line text-[9px] font-medium text-body">{x}</span>
          ))}
        </div>
        <div className="mt-2.5 rounded-lg bg-bg-2 px-2 py-1.5 text-[9px] text-body">
          <span className="flex justify-between"><span>Processor</span><span className="font-medium text-ink">Active</span></span>
          <span className="mt-0.5 flex justify-between"><span>Backup</span><span className="font-medium text-ink">Ready</span></span>
        </div>
      </div>
    </div>
  );
}
