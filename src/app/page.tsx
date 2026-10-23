import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { ContactButtons } from "@/components/contact-buttons";
import { Demo } from "@/components/demos";
import { IconArrow, IconCheck } from "@/components/icons";
import { ServiceIcon } from "@/components/service-icon";
import { ServicePicker } from "@/components/service-picker";
import { ServiceBento } from "@/components/service-bento";
import { LaunchTimeline } from "@/components/launch-timeline";
import { Agreements } from "@/components/agreements";
import { LaunchPackage } from "@/components/launch-package";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";

const FAQS = [
  {
    q: "How do I get started?",
    a: "Tap the services you want in the list above and press Send. Your request opens in WhatsApp or your email app, already written. A person on our team replies.",
  },
  {
    q: "How much does it cost?",
    a: "Each service is quoted for your business. For products, pick what you want in the catalog and send an inquiry; we reply with pricing. Everything else depends on what you need, so we quote it after a quick conversation.",
  },
  {
    q: "Do you only work with peptide or research companies?",
    a: "No. Websites and payment processing are for every industry and any lawful business. We also offer research supply: wholesale, factory-direct and white-label research materials, for research use only.",
  },
  {
    q: "How fast can I be up and running?",
    a: "A full launch (website, payments, product, labels and shipping) typically takes about eight days. A website on its own is usually live in 72 hours to a week. Processor approval can affect timing.",
  },
  {
    q: "Do I have to use every service?",
    a: "No. Pick one or pick them all. Each service works on its own.",
  },
  {
    q: "Can we sign an agreement before we start?",
    a: "Yes. We put the scope, timeline and pricing in a written agreement that both parties sign, and we sign an NDA when you need one. Ask for it in your first message.",
  },
  {
    q: "Who is behind Vanta Foundry?",
    a: `${SITE.name} is run by the team behind several brands, including ${SITE.builtStores.slice(0, -1).join(", ")} and ${SITE.builtStores.at(-1)}. The supply, payments and website setup we offer are the same ones we use ourselves.`,
  },
  {
    q: "How do I reach you?",
    a: SITE.whatsapp
      ? `On WhatsApp, using the green button on any page, or by email at ${SITE.email}.`
      : `By email at ${SITE.email}.`,
  },
];

const WANTS = [
  { label: "A custom website", href: "/website-development" },
  { label: "Payment processing", href: "/payment-processing" },
  { label: "Wholesale research products", href: "/wholesale" },
  { label: "Products under my own label", href: "/white-label" },
  { label: "3PL & shipping", href: "/fulfillment" },
  { label: "To show up on Google & AI", href: "/seo-ai-search" },
  { label: "Factory-direct supply", href: "/factory-direct" },
];

const WHY = [
  { t: "We use everything we sell", b: "Our own store, Vanta Labs, runs on the same supply, payments and code we offer you." },
  { t: "Websites live in 72 hours to a week", b: "Designed for your brand and hand-coded for any industry. Never a template, never AI filler." },
  { t: "Payments that stay up, any industry", b: "A main and a backup processor. If one closes, you switch and keep selling." },
  { t: "Your own developer team", b: "A monthly plan with a team on call 24/7 for fixes, changes and updates." },
  { t: "Documented research products", b: "Lot numbers on every unit and certificates of analysis matched to each lot." },
  { t: "One team, one conversation", b: "Website, payments, supply and shipping, handled in one WhatsApp thread." },
];

const STEPS = [
  { title: "Pick your services", body: "Tap what you need. One service or all of them." },
  { title: "Send it to us", body: "Your request opens in WhatsApp or email, already written." },
  { title: "We set it up", body: "We confirm the details and the price, then get you running." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 sm:pt-24">
        <Container>
          <div className="mx-auto max-w-[860px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[12.5px] text-body sm:text-[13.5px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-fill" aria-hidden="true" />
              A few of the brands we&rsquo;re behind: {SITE.builtStores.join(" · ")}
            </p>
            <h1 className="h-display mt-7 text-[44px] text-ink sm:text-[72px]">
              Everything your brand needs to sell online.
              <span className="block text-muted">Built properly, by one team.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-[18px] leading-[1.6] text-body">
              Custom-coded websites and payment processing for any industry, live in days, with your own developer team.
              And if you sell research products: wholesale or factory-direct supply, your own label, stored and shipped for you.
            </p>
            <div className="mx-auto mt-9 max-w-[760px]">
              <p className="text-[14px] font-medium text-muted">I want…</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {WANTS.map((w) => (
                  <li key={w.href}>
                    <Link href={w.href} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line-2 bg-white px-4 text-[14.5px] text-ink transition-colors hover:border-ink">
                      {w.label} <IconArrow className="text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="#services" className="btn btn-dark h-12 px-6 text-[15px]">
                Choose your services <IconArrow />
              </Link>
              <ContactButtons size="lg" single />
            </div>
          </div>
          <div className="mt-14 sm:mt-16">
            <ServiceBento />
          </div>
        </Container>
      </section>

      {/* Launch package */}
      <section id="package" className="mt-28 scroll-mt-20">
        <Container>
          <LaunchPackage />
        </Container>
      </section>

      {/* Launch timeline */}
      <section id="timeline" className="mt-28 scroll-mt-20">
        <Container>
          <SectionHead
            label="Launch in 8 days"
            title="From nothing to selling in eight days."
            lede="Website, payments, product, labels and shipping, handled by one team at the same time. This is how a full launch runs."
          />
          <div className="mt-12">
            <LaunchTimeline />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="mt-28">
        <Container>
          <SectionHead label="Why Vanta Foundry" title="We run it ourselves first." lede="Everything we sell, we use on our own store, Vanta Labs. That's why it works." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <li key={w.t} className="rounded-2xl border border-line p-6">
                <IconCheck className="text-gold" />
                <p className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-ink">{w.t}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-body">{w.b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Agreements />

      {/* The picker: the main way in */}
      <section id="services" className="mt-28 scroll-mt-20">
        <Container>
          <SectionHead
            label="Services"
            title="What do you need?"
            lede="Seven services. Use one, or use them together. Tap what you need and send it to us. It takes about ten seconds."
          />
          <div className="mt-10">
            <ServicePicker />
          </div>
        </Container>
      </section>

      {/* Each service, explained */}
      <section className="mt-32">
        <Container>
          <SectionHead label="In detail" title="What each service is." lede="Plain answers: what it is, who it's for, what you get." />
        </Container>
        <div className="mt-14 space-y-24 sm:space-y-32">
          {SERVICES.map((s, i) => (
            <Container key={s.slug}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`min-w-0 ${i % 2 ? "lg:order-2" : ""}`}>
                  <p className="inline-flex items-center gap-2 text-[14.5px] font-medium text-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-2">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    {s.name}
                  </p>
                  <h3 className="h-section mt-5 text-[32px] text-ink sm:text-[40px]">{s.title}</h3>
                  <p className="mt-4 text-[17px] leading-[1.6] text-body">{s.answer}</p>
                  <p className="mt-4 text-[15px] text-muted">
                    <span className="font-medium text-ink">Good for:</span> {s.forWho}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.includes.map((x) => (
                      <li key={x} className="flex gap-3 text-[15.5px] text-ink">
                        <IconCheck className="mt-0.5 shrink-0 text-gold" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/get-started?services=${s.slug}`} className="btn btn-dark h-11 px-5 text-[14.5px]">
                      Get started with {s.name.toLowerCase()}
                    </Link>
                    <Link href={`/${s.slug}`} className="btn btn-light h-11 px-5 text-[14.5px]">
                      Learn more
                    </Link>
                  </div>
                </div>
                <div className={`min-w-0 ${i % 2 ? "lg:order-1" : ""}`}>
                  <Demo which={s.demo} />
                </div>
              </div>
            </Container>
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section className="mt-32">
        <Container>
          <div className="grid items-center gap-8 rounded-[28px] border border-line bg-bg-2 p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[14px] font-medium text-gold">Catalog</p>
              <h2 className="h-section mt-2 text-[32px] text-ink sm:text-[42px]">See everything you can order.</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-body">
                Products ready to supply in bulk, plus factory-direct sourcing for anything else. Tap Inquire and WhatsApp opens with the product filled in. We reply with pricing.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Link href="/catalog" className="btn btn-dark h-12 px-6 text-[15px]">
                Open the catalog <IconArrow />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-32 scroll-mt-20">
        <Container>
          <SectionHead label="How it works" title="Three steps." />
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((st, i) => (
              <li key={st.title} className="rounded-2xl border border-line p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[14px] font-semibold text-white">{i + 1}</span>
                <p className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-ink">{st.title}</p>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-body">{st.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-32 scroll-mt-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead label="FAQ" title="Questions, answered." />
          <FaqList faqs={FAQS} />
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}
