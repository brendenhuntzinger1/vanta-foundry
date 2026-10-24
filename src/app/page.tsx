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
import { CATALOG, productPath } from "@/lib/catalog";

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
  const sourceWa = whatsappLink("Hi Vanta Foundry, I'm looking for a product that isn't in your catalog: ");
  const HERO = ["bpc-157", "ghk-cu", "tesamorelin"].map((slug) => CATALOG.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <h1 className="h-display text-[42px] leading-[1] text-ink sm:text-[60px] xl:text-[66px]">
                Wholesale research peptides.{" "}
                <span className="accent block">Your label. We ship it.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-body sm:text-[19px]">
                {CATALOG.length} peptides in stock with a COA for every lot. Need something we don&rsquo;t list? We source it.
                White label, 3PL fulfillment, and the website and payments to sell it.
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
            <div>
              <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {HERO.map((p) => (
                  <li key={p.slug}>
                    <Link href={productPath(p.slug)} className="group block overflow-hidden rounded-2xl border border-line bg-white">
                      <div className="relative aspect-[3/4] bg-bg-2">
                        <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 190px, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority />
                      </div>
                      <div className="px-3 py-2.5">
                        <p className="truncate text-[13.5px] font-semibold tracking-[-0.02em] text-ink sm:text-[15px]">{p.name}</p>
                        <p className="text-[11.5px] text-muted sm:text-[12.5px]">COA included</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <a href={sourceWa ?? "/contact"} target={sourceWa ? "_blank" : undefined} rel={sourceWa ? "noopener noreferrer" : undefined} className="group mt-2.5 flex items-center justify-between gap-4 rounded-2xl bg-ink px-5 py-4 text-white sm:mt-3">
                <span>
                  <span className="block text-[16px] font-semibold tracking-[-0.02em]">Not in the catalog?</span>
                  <span className="block text-[14px] text-white/65">Tell us what you need. We source it.</span>
                </span>
                <IconArrow className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
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
