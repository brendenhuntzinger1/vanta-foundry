import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { ServiceBento } from "@/components/service-bento";
import { DAYS } from "@/components/launch-timeline";
import { IconArrow } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

/*
 * The homepage does one job: say what we do, show it, and get the visitor
 * into a one-minute start flow. One idea per section, short copy, lots of
 * space. The detail lives on the service, industry, work and about pages.
 */

const FAQS = [
  {
    q: "What do you do?",
    a: "We build custom websites, set up payment processing and get businesses found on Google and in AI search, for any industry. For research-supply brands we also supply peptides wholesale or factory-direct, label them with your brand and ship them for you.",
  },
  {
    q: "How fast is it?",
    a: "A website is usually live in 72 hours to a week. A full launch (site, payments, product, labels and shipping) takes about eight days. Processor approval can affect timing.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is quoted for your business, in writing, before work starts. Tell us what you need and we reply with a price.",
  },
  {
    q: "What happens after launch?",
    a: "Your developer team stays on call 24/7 on a monthly plan: fixes, changes, updates and new pages. You own your site and your domain.",
  },
];

const WORK = [
  { brand: "Vanta Labs", industry: "Research supply · live", src: "/showcase/vanta-labs-desktop.webp", top: true },
  { brand: "Genesis Biomapping", industry: "Research supply · live", src: "/showcase/genesis-desktop.webp", top: true },
  { brand: "Solenne", industry: "Skincare", src: "/solenne/hero.webp" },
  { brand: "Halcyon", industry: "Coffee & food", src: "/sites/halcyon-hero.webp" },
  { brand: "Atlas", industry: "Athletic apparel", src: "/sites/atlas-hero.webp" },
];

export default function Home() {
  return (
    <>
      {/* Hero: one line, one action */}
      <section className="pt-20 sm:pt-32">
        <Container>
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="h-display text-[52px] leading-[0.98] text-ink sm:text-[96px]">
              Build. Get paid.
              <span className="block text-muted">Get found.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[600px] text-[18px] leading-[1.6] text-body sm:text-[20px]">
              Custom websites, payment processing and SEO for any business. Plus peptide supply, labels and shipping. One team.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/get-started" className="btn btn-dark h-12 px-7 text-[15px]">
                Start a project <IconArrow />
              </Link>
              <Link href="/work" className="btn btn-light h-12 px-7 text-[15px]">
                See our work
              </Link>
            </div>
          </div>
          <div className="mt-20 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
            <p className="text-[13px] text-muted">The team behind</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="text-[17px] font-semibold tracking-[-0.02em] text-ink/70">{b}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="mt-32 scroll-mt-20 sm:mt-40">
        <Container>
          <SectionHead center title="What we do." lede="Tap one. It takes about a minute to start." />
          <div className="mt-12">
            <ServiceBento />
          </div>
        </Container>
      </section>

      {/* Work */}
      <section id="work" className="mt-32 scroll-mt-20 sm:mt-40">
        <Container>
          <SectionHead center title="Look what we built." lede="Designed and hand-coded by our team." />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {WORK.map((w) => (
              <li key={w.brand}>
                <Link href="/work" className="group block overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-2">
                    <Image src={w.src} alt={`${w.brand} storefront`} fill sizes="(min-width: 1024px) 230px, (min-width: 640px) 50vw, 100vw" className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${w.top ? "object-left-top" : ""}`} />
                  </div>
                  <div className="p-4">
                    <p className="text-[15.5px] font-semibold tracking-[-0.02em] text-ink">{w.brand}</p>
                    <p className="text-[13px] text-muted">{w.industry}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              See every store <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      {/* Eight days */}
      <section id="timeline" className="mt-32 scroll-mt-20 sm:mt-40">
        <Container>
          <SectionHead center title="Nothing to selling in eight days." lede="Website, payments, labels and shipping, done at the same time by one team." />
          <ol className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {DAYS.map((d, i) => (
              <li key={d.d} className={`p-5 ${i === DAYS.length - 1 ? "bg-ink text-white" : "bg-white"}`}>
                <p className={`text-[12.5px] font-medium ${i === DAYS.length - 1 ? "text-gold-fill" : "text-gold"}`}>{d.d}</p>
                <p className="mt-1 text-[15.5px] font-semibold leading-snug tracking-[-0.02em]">{d.t}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-32 scroll-mt-20 sm:mt-40">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <SectionHead center title="Questions." />
            <div className="mt-10">
              <FaqList faqs={FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}
