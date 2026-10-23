import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { ContactButtons } from "@/components/contact-buttons";
import { Demo } from "@/components/demos";
import { IconArrow, IconCheck } from "@/components/icons";
import { ServiceIcon } from "@/components/service-icon";
import { ServicePicker } from "@/components/service-picker";
import { Showcase } from "@/components/showcase";
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
    a: "No. Payment processing and website development are for any lawful business. Wholesale, factory-direct and white-label supply are research materials, for research use only.",
  },
  {
    q: "Do I have to use every service?",
    a: "No. Pick one or pick them all. Each service works on its own.",
  },
  {
    q: "Who is behind Vanta Foundry?",
    a: `${SITE.name} is run by ${SITE.parent}. The supply, payments and website setup we offer are the same ones we use ourselves.`,
  },
  {
    q: "How do I reach you?",
    a: SITE.whatsapp
      ? `On WhatsApp, using the green button on any page, or by email at ${SITE.email}.`
      : `By email at ${SITE.email}.`,
  },
];

const STEPS = [
  { title: "Pick your services", body: "Tap what you need. One service or all six." },
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
            <Link
              href={SITE.parentUrl}
              className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-body transition-colors hover:border-line-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-fill" aria-hidden="true" />
              From the team behind {SITE.parent}
            </Link>
            <h1 className="h-display mt-7 text-[44px] text-ink sm:text-[72px]">
              Payments, supply, shipping and websites.
              <span className="block text-muted">One team for all of it.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.6] text-body">
              Payment processing, wholesale and factory-direct supply, white label, 3PL fulfillment and website
              development. Pick what you need. We set it up.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="#services" className="btn btn-dark h-12 px-6 text-[15px]">
                Choose your services <IconArrow />
              </Link>
              <ContactButtons size="lg" single />
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-[1000px] sm:mt-20">
            <Showcase />
          </div>
        </Container>
      </section>

      {/* The picker: the main way in */}
      <section id="services" className="mt-28 scroll-mt-20">
        <Container>
          <SectionHead
            label="Services"
            title="What do you need?"
            lede="Six services. Use one, or use them together. Tap what you need and send it to us. It takes about ten seconds."
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
                Every product and size in the Vanta Labs catalog. Tap what you want and send us an inquiry. We reply with pricing on WhatsApp or by email.
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
