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
  const wa = whatsappLink("Hi Vanta Foundry, I'd like to talk about my research brand.");
  return (
    <>
      {/* Hero */}
      <section className="pt-10 sm:pt-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <h1 className="h-display text-[44px] leading-[1] text-ink sm:text-[76px]">
                Start and scale your <span className="accent">research brand.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-body sm:text-[19px]">
                Wholesale peptides with a COA for every lot, factory-direct supply, your label on every vial, 3PL fulfillment,
                and the website and payments to sell it. One team, from first order to full scale.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/catalog" className="btn btn-dark h-14 px-8 text-[16px]">
                  {SEO_PAGES.home.cta} <IconArrow />
                </Link>
                <Link href="/start/ruo-brand" className="btn btn-light h-14 px-8 text-[16px]">
                  Plan my brand
                </Link>
              </div>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[15px] text-body underline-offset-4 hover:text-ink hover:underline">
                  <IconWhatsApp className="text-wa" /> Or message us on WhatsApp
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" priority />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/supply/unboxing.webp" alt="A branded mailer with vials in a foam insert" fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/supply/warehouse.webp" alt="Racked stock in our warehouse" fill sizes="(min-width: 1024px) 280px, 50vw" className="object-cover" />
              </div>
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
              Everything your brand needs. <span className="accent">One team.</span>
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">Use one service or all of them. Tap any to start.</p>
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
                The store to sell it. <span className="accent">Built by us.</span>
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-body">Two live research-supply stores our team designed and coded.</p>
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

      <CtaBand title="Ready to build your brand?" lede="Tell us what you want to sell. A person on our team replies." primary={{ href: "/start/ruo-brand", label: "Plan my brand" }} />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}
