import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { SupplyBento, WebBento } from "@/components/service-bento";
import { IconArrow, IconWhatsApp } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE, whatsappLink } from "@/lib/site";

/*
 * Website development leads. A visitor should read "they build advanced
 * websites, for any business" first, and only further down "they also offer
 * RUO scaling and resources" as a separate line of business, so no one
 * thinks they need a peptide brand to get a website (owner, 2026-10-23).
 */

const START = "/start/website-development";

const FAQS = [
  {
    q: "What do you do?",
    a: "We design and hand-code premium websites for any business, with payment processing and SEO, and keep them running with your own developer team. Separately, we also help research-use-only brands with supply, labels and shipping.",
  },
  {
    q: "Do I need to sell peptides to work with you?",
    a: "No. Most website projects have nothing to do with research supply. We build for skincare, clinics, food, apparel, trades, professional services and more. Research supply is a separate service for brands that want it.",
  },
  {
    q: "How fast is a website?",
    a: "Usually live in 72 hours to a week, depending on what it needs to do. You sign off on the design before we build.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is quoted for your business, in writing, before work starts. Tell us about it in about a minute and we reply with a price.",
  },
  {
    q: "What happens after launch?",
    a: "Your developer team stays on call 24/7 on a monthly plan: fixes, changes, updates and new pages. You own your site and your domain.",
  },
];

// Other industries first, so the work reads as "any business".
const WORK = [
  { brand: "Remade Clinic", industry: "Telehealth · live", src: "/showcase/remade-desktop.webp", top: true },
  { brand: "Solenne", industry: "Skincare", src: "/solenne/hero.webp" },
  { brand: "Halcyon", industry: "Coffee & food", src: "/sites/halcyon-hero.webp" },
  { brand: "Atlas", industry: "Athletic apparel", src: "/sites/atlas-hero.webp" },
  { brand: "Genesis Biomapping", industry: "Research supply · live", src: "/showcase/genesis-desktop.webp", top: true },
  { brand: "Vanta Labs", industry: "Research supply · live", src: "/showcase/vanta-labs-desktop.webp", top: true },
];

const PROCESS = [
  { when: "Day 1", t: "Brief", b: "Tell us about your business in about a minute." },
  { when: "Days 1–3", t: "Design", b: "You sign off on every page before we code it." },
  { when: "Days 2–6", t: "Build", b: "Hand-coded, with payments, SEO and GEO set up." },
  { when: "72 hours to a week", t: "Launch", b: "Live, tested on every device, then looked after 24/7." },
];

export default function Home() {
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  return (
    <>
      {/* Hero: websites first */}
      <section className="pt-16 sm:pt-28">
        <Container>
          <div className="mx-auto max-w-[1000px] text-center">
            <h1 className="h-display text-[48px] leading-[0.98] text-ink sm:text-[72px] lg:text-[88px]">
              Advanced websites,
              <span className="block text-muted">built in days.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[640px] text-[18px] leading-[1.6] text-body sm:text-[19px]">
              Premium, custom-coded websites for any business, with payment processing, SEO and your own developer team on call
              24/7.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href={START} className="btn btn-dark h-14 px-8 text-[16px]">
                Start your project <IconArrow />
              </Link>
              <Link href="/work" className="btn btn-light h-14 px-8 text-[16px]">
                See our work
              </Link>
            </div>
            <p className="mt-6 text-[13.5px] text-muted">The team behind {SITE.builtStores.join(" · ")}</p>

            {/* Second line of business, visible above the fold */}
            <div className="mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-4 rounded-2xl border border-line bg-bg-2 p-4 text-left sm:flex-row sm:p-3 sm:pr-4">
              <div className="flex shrink-0 -space-x-3" aria-hidden="true">
                {["/labels/halo.webp", "/labels/kinetic.webp", "/labels/ember.webp"].map((v) => (
                  <span key={v} className="relative h-14 w-11 overflow-hidden rounded-lg border-2 border-white">
                    <Image src={v} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="flex-1 text-center text-[14.5px] leading-[1.45] text-body sm:text-left">
                <span className="font-semibold text-ink">Selling research products?</span> Peptide wholesale with COAs, white label,
                factory-direct and 3PL.
              </p>
              <div className="flex shrink-0 gap-2">
                <Link href="/wholesale#catalog" className="btn btn-dark h-10 px-4 text-[13.5px]">Catalog</Link>
                <Link href="/start/ruo-brand" className="btn btn-light h-10 px-4 text-[13.5px]">RUO scaling</Link>
              </div>
            </div>
          </div>

          {/* A real site we built, front and centre */}
          <div className="mx-auto mt-14 max-w-[1080px] overflow-hidden rounded-2xl border border-line shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 border-b border-line bg-bg-2 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
              </span>
              <span className="ml-2 truncate rounded-full bg-white px-3 py-1 text-[12px] text-muted">remadeclinic.com</span>
              <span className="ml-auto hidden text-[12px] text-muted sm:block">Built by us · live</span>
            </div>
            <Image src="/showcase/remade-desktop.webp" alt="The Remade Clinic website, built by our team" width={2160} height={1148} sizes="(min-width: 1080px) 1080px, 100vw" className="h-auto w-full" priority />
          </div>
        </Container>
      </section>

      {/* Everything to sell online */}
      <section id="websites" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <SectionHead center title="Everything to sell online." lede="Your website, how you get paid and how you get found. For any industry, from one team." />
          <div className="mt-12">
            <WebBento />
          </div>
        </Container>
      </section>

      {/* Separate line of business: RUO scaling & resources */}
      <section id="research" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <div className="rounded-[32px] bg-ink p-6 text-white sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[640px]">
                <p className="text-[14px] font-medium text-gold-fill">Also from our team · for research brands</p>
                <h2 className="h-section mt-2 text-[34px] sm:text-[50px]">Peptide wholesale &amp; RUO scaling.</h2>
                <p className="mt-4 text-[17px] leading-[1.6] text-white/70">
                  For research-use-only brands: wholesale and factory-direct supply with a COA for every wholesale lot, your own
                  label, and fulfillment. A separate service. You don&rsquo;t need a research brand to work with us on a website.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/wholesale#catalog" className="btn h-12 bg-white px-6 text-[15px] text-ink hover:bg-white/90">
                  Browse the catalog <IconArrow />
                </Link>
                <Link href="/start/ruo-brand" className="btn h-12 border border-white/20 px-6 text-[15px] text-white hover:bg-white/10">
                  Scale an RUO brand
                </Link>
              </div>
            </div>
            <div className="mt-10">
              <SupplyBento />
            </div>
          </div>
        </Container>
      </section>

      {/* Work */}
      <section id="work" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <SectionHead center title="Look what we built." lede="Designed and hand-coded by our team, across industries." />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w) => (
              <li key={w.brand}>
                <Link href="/work" className="group block overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-2">
                    <Image src={w.src} alt={`${w.brand} website`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${w.top ? "object-left-top" : ""}`} />
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
              See every site <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="mt-28 scroll-mt-20 sm:mt-36">
        <Container>
          <SectionHead center title="Live in 72 hours to a week." lede="A clear process, then a developer team that stays with you." />
          <ol className="mx-auto mt-12 grid max-w-[1080px] gap-3 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.t} className={`rounded-2xl p-6 ${i === PROCESS.length - 1 ? "bg-ink text-white" : "border border-line"}`}>
                <p className={`text-[12.5px] font-medium ${i === PROCESS.length - 1 ? "text-gold-fill" : "text-gold"}`}>{p.when}</p>
                <p className="mt-1.5 text-[20px] font-semibold tracking-[-0.03em]">{p.t}</p>
                <p className={`mt-1.5 text-[14.5px] leading-[1.55] ${i === PROCESS.length - 1 ? "text-white/70" : "text-body"}`}>{p.b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link href={START} className="btn btn-dark h-14 px-8 text-[16px]">
              Start your project <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
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

      <CtaBand
        title="Let's build yours."
        lede="Tell us about your project in about a minute. We reply with a quote and a timeline, in writing."
        primary={{ href: START, label: "Start your project" }}
      />
      <JsonLd data={faqPage(FAQS)} />
    </>
  );
}
