import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { CheckoutMock, LabelMock, Laptop, Panel, ShipMock, WebsiteMock, WholesaleMock } from "@/components/home-showcase";
import { IconArrow, IconWhatsApp } from "@/components/icons";
import { CATALOG } from "@/lib/catalog";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE, SITE, whatsappLink } from "@/lib/site";

/*
 * Product-led, after the clean pattern of the best B2B sites (owner,
 * 2026-10-24): one service per section, each with a crisp coded panel.
 *
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
      <section className="relative overflow-hidden pt-14 sm:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-[920px] text-center">
            <h1 className="h-display text-[42px] leading-[1.02] text-ink sm:text-[72px]">
              Wholesale research peptides.{" "}
              <span className="accent block text-gold">Everything to scale your brand.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.6] text-body sm:text-[19px]">
              {CATALOG.length} peptides in stock with a COA for every lot, and anything else we source. Plus your label, 3PL,
              the website and card processing. One team.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/catalog" className="btn btn-dark h-13 px-7 text-[15.5px]">
                {SEO_PAGES.home.cta} <IconArrow />
              </Link>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-13 px-7 text-[15.5px]">
                  <IconWhatsApp className="text-wa" /> Get wholesale pricing
                </a>
              )}
            </div>
          </div>
          <div className="mt-14 sm:mt-16">
            <Laptop>
              <div className="flex items-center gap-2 border-b border-line bg-bg-2 px-3 py-2" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="ml-2 rounded-full bg-white px-3 py-0.5 text-[11px] text-muted">vantafoundry.com/catalog</span>
              </div>
              <Image src="/showcase/catalog-wide.webp" alt="Our wholesale catalog: products with COA badges and Inquire buttons" width={2336} height={1308} sizes="(min-width: 1024px) 950px, 100vw" className="h-auto w-full" priority />
            </Laptop>
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

      <Feature
        title={<>Wholesale, <span className="accent text-gold">documented.</span></>}
        body={`${CATALOG.length} research peptides in stock. Every wholesale lot ships with its certificate of analysis, and anything we don't list, we source.`}
        cta={{ href: "/catalog", label: "Browse the catalog" }}
        more={{ href: "/factory-direct", label: "Factory-direct supply" }}
      >
        <WholesaleMock />
      </Feature>

      <Feature
        flip
        title={<>Your label, <span className="accent text-gold">approved before print.</span></>}
        body="Your brand on every unit. You see a proof and sign it off before anything prints, and every unit stays traceable to its lot."
        cta={{ href: "/white-label", label: "White label" }}
      >
        <LabelMock />
      </Feature>

      <Feature
        title={<>Stored, packed, <span className="accent text-gold">shipped as your brand.</span></>}
        body="Keep your stock in our warehouse. We pick, pack and ship every order under your name, so your customers only ever see you."
        cta={{ href: "/fulfillment", label: "3PL fulfillment" }}
      >
        <ShipMock />
      </Feature>

      <Feature
        flip
        title={<>A store <span className="accent text-gold">built to sell.</span></>}
        body="A custom-coded store with your catalog, COA pages and wholesale ordering. Found on Google and in AI answers, live in 72 hours to a week, with developers on call 24/7."
        cta={{ href: "/website-development", label: "Websites" }}
        more={{ href: "/work", label: "See our work" }}
      >
        <WebsiteMock />
      </Feature>

      <Feature
        title={<>Card processing <span className="accent text-gold">that stays up.</span></>}
        body="Cards, Apple Pay and Google Pay on your store, with a backup processor connected so a closure doesn't stop your sales. Every account is subject to approval."
        cta={{ href: "/payment-processing", label: "Payment processing" }}
      >
        <CheckoutMock />
      </Feature>

      {/* Start from zero */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[56px]">
              Starting from zero? <span className="accent text-gold">We plan it with you.</span>
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">
              Products, label, store, payments and shipping. Answer a few questions and we map out your brand, in writing.
            </p>
            <Link href="/start/ruo-brand" className="btn btn-dark mt-8 h-13 px-7 text-[15.5px]">
              Plan my brand <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      <section id="faq" className="mt-28 scroll-mt-20 sm:mt-36">
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

function Feature({ title, body, cta, more, flip, children }: { title: ReactNode; body: string; cta: { href: string; label: string }; more?: { href: string; label: string }; flip?: boolean; children: ReactNode }) {
  return (
    <section className="mt-24 sm:mt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className={flip ? "lg:order-2" : ""}>
            <h2 className="h-section text-[34px] text-ink sm:text-[50px]">{title}</h2>
            <p className="mt-5 max-w-[460px] text-[17px] leading-[1.65] text-body">{body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={cta.href} className="btn btn-dark h-12 px-6 text-[15px]">
                {cta.label} <IconArrow />
              </Link>
              {more && (
                <Link href={more.href} className="text-[15px] font-medium text-ink underline underline-offset-4">
                  {more.label}
                </Link>
              )}
            </div>
          </div>
          <div className={flip ? "lg:order-1" : ""}>
            <Panel>{children}</Panel>
          </div>
        </div>
      </Container>
    </section>
  );
}
