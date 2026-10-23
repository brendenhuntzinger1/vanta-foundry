import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { IconArrow, IconWhatsApp } from "@/components/icons";
import { JsonLd, faqPage } from "@/lib/jsonld";
import { SITE, whatsappLink } from "@/lib/site";

/*
 * Two front doors (owner, 2026-10-23): website development for any business,
 * and wholesale & 3PL for research brands. Each opens its own premium page;
 * the homepage only helps a visitor pick the right one.
 */

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

export default function Home() {
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  return (
    <>
      <section className="pt-14 sm:pt-24">
        <Container>
          <div className="mx-auto max-w-[860px] text-center">
            <h1 className="h-display text-[44px] leading-[1] text-ink sm:text-[72px]">
              Build your brand.
              <span className="block text-muted">Or supply it.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[600px] text-[18px] leading-[1.6] text-body">
              Premium website development for any business, and peptide wholesale &amp; 3PL for research brands. Pick where to start.
            </p>
          </div>

          {/* The two front doors */}
          <div className="mx-auto mt-12 grid max-w-[1120px] gap-4 lg:grid-cols-2">
            <Door
              href="/website-development"
              dark
              eyebrow="For any business"
              title="Website development"
              body="Premium, custom-coded websites, live in 72 hours to a week, with payments, SEO and your own developer team on call 24/7."
              points={["Custom design", "SEO & AI search", "Payments", "Developer team 24/7"]}
              cta="Explore website development"
            >
              <div className="grid h-full grid-cols-2 gap-1 bg-ink p-1">
                {[
                  { src: "/showcase/genesis-desktop.webp", alt: "Genesis Biomapping website", top: true },
                  { src: "/showcase/vanta-labs-desktop.webp", alt: "Vanta Labs website", top: true },
                  { src: "/solenne/hero.webp", alt: "Solenne skincare website" },
                  { src: "/sites/halcyon-hero.webp", alt: "Halcyon coffee website" },
                ].map((x) => (
                  <div key={x.src} className="relative overflow-hidden rounded-[14px]">
                    <Image src={x.src} alt={x.alt} fill sizes="(min-width: 1024px) 280px, 50vw" className={`object-cover ${x.top ? "object-left-top" : ""}`} priority />
                  </div>
                ))}
              </div>
            </Door>
            <Door
              href="/supply"
              eyebrow="For research brands"
              title="Wholesale & 3PL"
              body="Research peptides wholesale or factory-direct with a COA for every wholesale lot, your label on every vial, stored and shipped as your brand."
              points={["Peptide wholesale", "White label", "Factory-direct", "3PL fulfillment"]}
              cta="Explore wholesale & 3PL"
            >
              <Image src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" priority />
            </Door>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
            <p className="text-[13px] text-muted">The team behind</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="text-[17px] font-semibold tracking-[-0.02em] text-ink/70">{b}</li>
              ))}
              <li className="text-[17px] tracking-[-0.02em] text-muted">and more</li>
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

function Door({ href, eyebrow, title, body, points, cta, dark, children }: { href: string; eyebrow: string; title: string; body: string; points: string[]; cta: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`group flex flex-col overflow-hidden rounded-[28px] border transition-shadow duration-300 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.5)] ${dark ? "border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
      <div className="relative aspect-[16/9] overflow-hidden">{children}</div>
      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <p className={`text-[13.5px] font-medium ${dark ? "text-gold-fill" : "text-gold"}`}>{eyebrow}</p>
        <p className="mt-2 text-[32px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[40px]">{title}</p>
        <p className={`mt-3 text-[16px] leading-[1.6] ${dark ? "text-white/70" : "text-body"}`}>{body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {points.map((p) => (
            <li key={p} className={`rounded-full px-3 py-1.5 text-[13px] ${dark ? "bg-white/10 text-white/85" : "bg-bg-2 text-body"}`}>{p}</li>
          ))}
        </ul>
        <span className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
          {cta} <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
