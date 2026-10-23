import Link from "next/link";
import { Console } from "@/components/console";
import { Container, CtaBand, EmailStart, FaqList, SectionHead, ServiceGrid } from "@/components/blocks";
import { LabelDemo } from "@/components/demos/label-demo";
import { PaymentsDemo } from "@/components/demos/payments-demo";
import { FulfillmentDemo } from "@/components/demos/fulfillment-demo";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import type { ReactNode } from "react";

const HOME_FAQS = [
  {
    q: "What is Vanta Foundry?",
    a: `${SITE.name} is the business-to-business side of ${SITE.parent}: wholesale supply, white label, fulfillment, payments setup and storefront development for research-supply brands, from one team and one application.`,
  },
  {
    q: "Is Vanta Foundry part of Vanta Labs?",
    a: `Yes. ${SITE.name} is operated by ${SITE.parent} and runs on the same supply, documentation and storefront stack.`,
  },
  {
    q: "Why don't you publish prices or minimums?",
    a: "Both depend on what you order and how often. We quote each account from the volume and cadence in its application rather than publish a number we would then have to bend.",
  },
  {
    q: "Do you work with clinics or businesses selling for human use?",
    a: "No. We supply research-use-only materials and decline businesses that market them for human or veterinary use.",
  },
  {
    q: "Are you a payment processor?",
    a: "No. We build checkout that can run on a primary and a backup processor and make introductions. Approval and rates are each processor's decision.",
  },
  {
    q: "How do I start?",
    a: "Apply once, for any combination of services. A person reviews every application and replies with what we can supply and how we would set it up.",
  },
];

const STEPS = [
  { n: "01", title: "Apply", body: "One application for any combination of services." },
  { n: "02", title: "Review", body: "A person reads it and confirms fit and supply." },
  { n: "03", title: "Proposal", body: "Scope, quote and timeline, before you commit." },
  { n: "04", title: "Launch", body: "We set it up. Orders ship as you." },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="halo grain relative pt-32 sm:pt-40">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[12px] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              From the team behind {SITE.parent}
            </p>
            <h1 className="display mt-8 text-[48px] text-white sm:text-[76px] lg:text-[88px]">
              Everything behind
              <br />
              the <span className="italic text-gold">label.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-[16.5px] leading-8 text-muted">
              Wholesale supply, white label, fulfillment, payments and storefronts for research-supply brands. One
              application. One team.
            </p>
            <div className="mt-10 flex justify-center">
              <EmailStart id="hero-email" />
            </div>
            <p className="mt-4 text-[12.5px] text-faint">
              Every application is read by a person ·{" "}
              <Link href="#services" className="text-white/60 underline-offset-4 hover:underline">
                See the services
              </Link>
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-[1080px]">
            <Console />
          </div>
        </Container>
      </section>

      {/* ── CAPABILITY STRIP ── */}
      <Container className="mt-20">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.22em] text-white/35">
          {["Wholesale", "White label", "Dropship", "3PL", "Payments", "Storefronts", "Launch"].map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </Container>

      {/* ── SERVICES ── */}
      <section id="services" className="mt-32 scroll-mt-24">
        <Container>
          <SectionHead
            eyebrow="One partner"
            title="The whole stack, or the part you need."
            lede="Each service stands on its own. Together they are a research-supply brand, from first lot to first order."
          />
          <div className="mt-14">
            <ServiceGrid />
          </div>
        </Container>
      </section>

      {/* ── FEATURE ROWS ── */}
      <Feature
        eyebrow="White label"
        title="Your label. Our lot."
        body="Sell under your own brand. We produce the label to your design, apply it, and keep every unit traceable to its lot. Type your brand into the proof."
        points={["Proof approved before print", "Lot number on every unit", "Research-use statement on every label"]}
        href="/white-label"
        demo={<LabelDemo />}
      />
      <Feature
        flip
        eyebrow="Payments"
        title="Checkout that stays up."
        body="Processors close accounts in this category without much warning. Your checkout knows a backup, so a closure is a setting to change, not a site to rebuild."
        points={["Primary and backup processor", "Processor introductions", "Consented recovery texts and email"]}
        href="/payments"
        demo={<PaymentsDemo />}
      />
      <Feature
        eyebrow="Fulfillment"
        title="We pack it. It ships as you."
        body="Dropship from our stock with no inventory of your own, or store yours with us. The parcel, slip and tracking carry your brand."
        points={["Dropship or 3PL, or both", "Your packing slip and notifications", "Lots recorded for every shipment"]}
        href="/fulfillment"
        demo={<FulfillmentDemo />}
      />

      {/* ── STANDARDS ── */}
      <section className="mt-36">
        <Container>
          <div className="hairline-gold" />
          <div className="grid gap-14 pt-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">Standards</p>
              <h2 className="display mt-4 text-[40px] text-white sm:text-[56px]">
                Documentation,
                <br />
                <span className="text-white/50">not adjectives.</span>
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-7 text-muted">
                Most of this category asks to be trusted. We would rather hand you the report. Every lot we supply is
                matched to its certificate of analysis where one has been issued, and the lot number travels with every
                unit.
              </p>
              <Link href="/standards" className="mt-8 inline-block text-[14px] text-gold hover:text-gold-hi">
                How we document supply <span aria-hidden="true">→</span>
              </Link>
            </div>
            <dl className="grid gap-px self-start overflow-hidden rounded-2xl border border-line bg-line">
              {[
                ["Lot on every unit", "Printed on the label, recorded against every shipment."],
                ["Report per lot", "Matched to the lot it covers, not reused across lots."],
                ["Research use only", "On every label, every page, every message. No exceptions."],
              ].map(([t, b]) => (
                <div key={t} className="bg-ink p-7">
                  <dt className="text-[15px] text-white">{t}</dt>
                  <dd className="mt-2 text-[14px] leading-6 text-muted">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ── WHO ── */}
      <section className="mt-36">
        <Container>
          <SectionHead eyebrow="Who we work with" title="Built for research supply." center />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="glass rounded-2xl p-8">
              <p className="text-[13px] uppercase tracking-[0.18em] text-gold/80">We work with</p>
              <ul className="mt-6 space-y-4 text-[15px] text-white/85">
                {["Research-supply brands, new and established", "Resellers and distributors", "Laboratories ordering in quantity"].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-8">
              <p className="text-[13px] uppercase tracking-[0.18em] text-faint">We don&rsquo;t</p>
              <ul className="mt-6 space-y-4 text-[15px] text-white/55">
                {[
                  "Businesses that market for human or veterinary use",
                  "Brands that make dosing, usage or outcome claims",
                  "Anyone asking us to label around the rules",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-white/25" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── PROCESS ── */}
      <section className="mt-36">
        <Container>
          <SectionHead eyebrow="How it works" title="Four steps, one team." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="bg-ink p-7">
                <span className="font-mono text-[12px] text-gold/80">{s.n}</span>
                <p className="display mt-8 text-[24px] text-white">{s.title}</p>
                <p className="mt-2 text-[14px] leading-6 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="mt-36">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title="Asked often." />
          <FaqList faqs={HOME_FAQS} />
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={faqPage(HOME_FAQS)} />
    </>
  );
}

function Feature({
  eyebrow,
  title,
  body,
  points,
  href,
  demo,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  demo: ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="mt-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display mt-4 text-[36px] text-white sm:text-[50px]">{title}</h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-7 text-muted">{body}</p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-[14.5px] text-white/80">
                  <span className="mt-[10px] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href={href} className="mt-9 inline-block text-[14px] text-gold hover:text-gold-hi">
              {eyebrow} in detail <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>{demo}</div>
        </div>
      </Container>
    </section>
  );
}
