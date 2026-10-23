import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { PayVisual, SupplyBento, VialRow, WebBento } from "@/components/service-bento";
import { DAYS } from "@/components/launch-timeline";
import { IconArrow, IconWhatsApp } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE, whatsappLink } from "@/lib/site";

/*
 * The homepage does one job: say what we do, show it, and get the visitor
 * into a one-minute start flow. One idea per section, short copy, lots of
 * space. The detail lives on the service, industry, work and about pages.
 */

const FAQS = [
  {
    q: "What do you do?",
    a: "Two things. For any business: custom websites, payment processing and SEO. For research brands: peptide supply, wholesale or factory-direct, under your own label, stored and shipped for you, with a COA for every wholesale lot.",
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
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  return (
    <>
      {/* Hero: what we sell, in one line */}
      <section className="pt-16 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-[1080px] text-center">
            <h1 className="h-display text-[46px] leading-[1] text-ink sm:text-[64px] lg:text-[80px]">
              Websites &amp; peptide supply.
              <span className="block text-muted">Built by one team.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[640px] text-[18px] leading-[1.6] text-body">
              Custom websites, payments and SEO for any business. Wholesale, white-label and factory-direct peptides with COAs,
              stored and shipped for you.
            </p>
          </div>

          {/* Four doors: pick one, get walked through it */}
          <p className="mt-14 text-center text-[14px] font-medium text-muted">Where do you want to start?</p>
          <div className="mx-auto mt-4 grid max-w-[1040px] gap-3 md:grid-cols-2">
            <Door
              href="/start/website-development"
              eyebrow="Any industry"
              title="Premium websites"
              items={["Custom design", "SEO & AI search", "Developer team 24/7"]}
              src="/showcase/genesis-desktop.webp"
              top
              dark
            />
            <Door
              href="/start/payment-processing"
              eyebrow="Any business, including high-risk"
              title="Payment processing"
              items={["Cards & Apple Pay", "Backup processor", "Subscriptions"]}
              visual={<PayVisual />}
            />
            <Door
              href="/start/ruo-brand"
              eyebrow="Research brands"
              title="RUO brand scaling"
              items={["Your label", "Factory-direct", "3PL", "Website & payments"]}
              visual={<VialRow />}
            />
            <Door
              href="/wholesale#catalog"
              eyebrow="In stock now"
              title="Wholesale catalog"
              items={["Browse every product", "COA with every lot", "Inquire for pricing"]}
              src="/supply/bulk.webp"
              cta="Browse the catalog"
            />
          </div>

          {wa && (
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <p className="text-[15px] text-body">Questions first? Talk to a person.</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-11 px-5 text-[14.5px]">
                <IconWhatsApp className="text-wa" /> Chat on WhatsApp
              </a>
            </div>
          )}

          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
            <p className="text-[13px] text-muted">The team behind</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="text-[17px] font-semibold tracking-[-0.02em] text-ink/70">{b}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Lane 1 */}
      <section id="websites" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <SectionHead center label="For any business" title="Websites, payments & SEO." lede="Everything to sell online and get found, in any industry. Tap one to start." />
          <div className="mt-12">
            <WebBento />
          </div>
        </Container>
      </section>

      {/* Work */}
      <section id="work" className="mt-28 scroll-mt-20 sm:mt-36">
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

      {/* Lane 2 */}
      <section id="peptides" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <SectionHead center label="For research brands" title="Peptide supply." lede="Buy wholesale, go factory-direct, put your label on it and let us ship it. A COA with every wholesale lot. Research use only." />
          <div className="mt-12">
            <SupplyBento />
          </div>
          <div className="mt-8 text-center">
            <Link href="/wholesale#catalog" className="btn btn-dark h-12 px-6 text-[15px]">
              Browse the catalog <IconArrow />
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

function Door({ href, eyebrow, title, items, src, visual, top, dark, cta = "Start" }: { href: string; eyebrow: string; title: string; items: string[]; src?: string; visual?: React.ReactNode; top?: boolean; dark?: boolean; cta?: string }) {
  return (
    <Link href={href} className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition-shadow duration-200 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] ${dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
      <div className="relative h-[190px] overflow-hidden bg-[#141416] sm:h-[220px]">
        {src ? <Image src={src} alt="" fill sizes="(min-width: 768px) 520px, 100vw" className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${top ? "object-left-top" : ""}`} /> : visual}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className={`text-[13px] font-medium ${dark ? "text-gold-fill" : "text-gold"}`}>{eyebrow}</p>
        <p className="mt-1 text-[26px] font-semibold tracking-[-0.03em]">{title}</p>
        <p className={`mt-2 text-[14.5px] ${dark ? "text-white/65" : "text-muted"}`}>{items.join(" · ")}</p>
        <span className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] font-medium ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
          {cta} <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

