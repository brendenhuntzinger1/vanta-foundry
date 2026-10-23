import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { FeaturedWork, StackRow } from "@/components/featured-work";
import { SupplyShowcase } from "@/components/supply-showcase";
import { IconArrow, IconCheck, IconWhatsApp } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE, whatsappLink } from "@/lib/site";

/*
 * Two front doors (owner, 2026-10-23): website development for any business,
 * and wholesale & 3PL for research brands, side by side and equal at the top
 * of the page (owner: "put them both at the top"), plus the complete build.
 */

const BUILD = ["Website", "SEO, AEO & GEO", "Payments", "Product & label", "Warehouse & shipping"];

const FAQS = [
  {
    q: "What do you do?",
    a: "Two things, run by one team. We design and hand-code premium websites for any business, with payments, SEO and a 24/7 developer team. And for research brands, we supply peptides wholesale or factory-direct, label them with your brand and store and ship them for you.",
  },
  {
    q: "Do I need to sell peptides to get a website from you?",
    a: "No. Website development is for any business: clinics, skincare, food, apparel, trades, professional services and more. Research supply is a separate service.",
  },
  {
    q: "Do your peptides come with documentation?",
    a: "Yes. Every wholesale lot comes with a certificate of analysis, and every unit carries a lot number. All research supply is for research use only.",
  },
  {
    q: "How much does it cost?",
    a: "Everything is quoted for your business, in writing. Websites: tell us about your project. Wholesale: tap Inquire on any product and we reply with pricing.",
  },
];

const WHY = [
  { t: "Hand-coded, never templated", b: "Every site is designed for your brand and written by our developers. No page builders, no themes." },
  { t: "Yours to keep", b: "You own the website, the code and the domain. No lock-in." },
  { t: "Everything in writing", b: "Your quote, timeline and agreement are written down and signed by both sides before work starts." },
  { t: "One team, start to finish", b: "Design, development, payments, SEO and, for research brands, supply and fulfillment. One thread to reach us." },
  { t: "Operated by Vanta Labs", b: "The same team runs its own live store, so we build what we know works." },
];

export default function Home() {
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  return (
    <>
      {/* Hero: both front doors, side by side and equal, on every screen size. */}
      <section className="pt-8 sm:pt-16">
        <Container>
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="h-display text-[36px] leading-[1.05] text-ink sm:text-[76px]">
              Build it. Stock it. <span className="accent whitespace-nowrap">Ship it.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[640px] text-[15.5px] leading-[1.55] text-body sm:mt-6 sm:text-[18px]">
              The complete build: your website and search presence, your product, and the shipping. Pick one, or let one team
              do it all.
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-[1160px] grid-cols-2 gap-2.5 sm:mt-12 sm:gap-5">
            <Door
              href="/website-development"
              dark
              eyebrow="For any business"
              title="Websites & SEO"
              items={["Custom website", "Google SEO", "AEO & GEO (AI search)", "Payments", "24/7 developer team"]}
              cta="Start a website"
              image={{ src: "/showcase/genesis-desktop.webp", alt: "The Genesis Biomapping website, built by our team", top: true }}
            />
            <Door
              href="/supply"
              eyebrow="For research brands"
              title="Wholesale & 3PL"
              items={["Peptide wholesale", "COA with every lot", "Factory-direct", "White label", "3PL fulfillment"]}
              cta="See the catalog"
              image={{ src: "/supply/bulk.webp", alt: "Cartons of vials packed for a bulk order" }}
            />
          </div>

          {/* The complete build, end to end */}
          <div className="mx-auto mt-5 max-w-[1160px] rounded-[20px] border border-line bg-bg-2 px-4 py-4 sm:mt-6 sm:rounded-[24px] sm:px-8 sm:py-6">
            <p className="text-center text-[13px] text-muted sm:text-left">Or the whole thing, from one team</p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:justify-start">
              {BUILD.map((b, i) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="rounded-full border border-line-2 bg-white px-3 py-1.5 text-[13px] text-ink sm:px-4 sm:py-2 sm:text-[14.5px]">{b}</span>
                  {i < BUILD.length - 1 && <IconArrow className="hidden text-muted sm:block" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 flex max-w-[1160px] flex-col items-center gap-3 border-y border-line py-6 sm:flex-row sm:justify-between">
            <p className="text-[13.5px] text-muted">The team behind</p>
            <ul className="flex flex-wrap justify-center gap-x-9 gap-y-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="text-[18px] font-semibold tracking-[-0.025em] text-ink/75">{b}</li>
              ))}
              <li className="text-[18px] tracking-[-0.025em] text-muted">and more</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Wholesale & 3PL */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <SupplyShowcase />
        </Container>
      </section>

      {/* Work */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[640px]">
              <h2 className="h-section text-[38px] text-ink sm:text-[60px]">
                Work that&rsquo;s <span className="accent">live.</span>
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-body">Real stores, taking real orders. Visit them yourself.</p>
            </div>
            <Link href="/work" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              See all our work <IconArrow />
            </Link>
          </div>
          <div className="mt-12">
            <FeaturedWork />
          </div>
          <div className="mt-14">
            <StackRow />
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <h2 className="h-section text-[38px] text-ink sm:text-[56px]">
              A real team,
              <span className="block">
                <span className="accent">in writing.</span>
              </span>
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {WHY.map((w) => (
                <li key={w.t} className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{w.t}</p>
                  <p className="text-[16px] leading-[1.6] text-body">{w.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="faq" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <SectionHead center title="Questions." />
            <div className="mt-10">
              <FaqList faqs={FAQS} />
            </div>
            {wa && (
              <p className="mt-8 text-center text-[15px] text-body">
                Still have a question?{" "}
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-4">
                  <IconWhatsApp className="text-wa" /> Chat on WhatsApp
                </a>
              </p>
            )}
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure where to start?" lede="Tell us what you need. A person on our team replies." />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}

function Door({ href, eyebrow, title, items, cta, dark, image }: { href: string; eyebrow: string; title: string; items: string[]; cta: string; dark?: boolean; image: { src: string; alt: string; top?: boolean } }) {
  return (
    <Link href={href} className={`group flex flex-col overflow-hidden rounded-[20px] border transition-shadow duration-300 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.5)] sm:rounded-[28px] ${dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[2/1]">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1160px) 570px, 50vw" className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${image.top ? "object-left-top" : ""}`} priority />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-9">
        <p className={`text-[11.5px] font-medium sm:text-[13.5px] ${dark ? "text-gold-fill" : "text-gold"}`}>{eyebrow}</p>
        <p className="mt-1 text-[19px] font-semibold leading-[1.05] tracking-[-0.03em] sm:mt-2 sm:text-[40px]">{title}</p>
        <ul className={`mt-2.5 space-y-1 text-[12.5px] leading-snug sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 sm:space-y-0 sm:text-[15px] ${dark ? "text-white/80" : "text-body"}`}>
          {items.map((x) => (
            <li key={x} className="flex items-start gap-1.5 sm:gap-2">
              <IconCheck className={`mt-px h-3.5 w-3.5 shrink-0 sm:h-[18px] sm:w-[18px] ${dark ? "text-gold-fill" : "text-gold"}`} /> {x}
            </li>
          ))}
        </ul>
        <span className={`mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-[13px] font-medium sm:mt-8 sm:h-14 sm:w-fit sm:px-7 sm:text-[15.5px] ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
          {cta} <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
