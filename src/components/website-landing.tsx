import Image from "next/image";
import Link from "next/link";
import { Container, CtaBand, FaqList } from "./blocks";
import { FeaturedWork, StackRow } from "./featured-work";
import { IconArrow, IconCheck } from "./icons";
import type { Service } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import { SITE } from "@/lib/site";

const START = "/start/website-development";

const PILLARS = [
  { t: "Designed for your brand", b: "Every site is designed from scratch around your brand and your customers. No themes, no templates, no AI filler." },
  { t: "Hand-coded to perform", b: "Modern, hand-written code that loads fast on every phone, stays secure and is yours to keep." },
  { t: "Found on Google and AI", b: "SEO and GEO built in from day one, so customers, Google and AI assistants can find and recommend you." },
  { t: "Checkout that converts", b: "Cards, Apple Pay and Google Pay, connected to processing with a backup ready, if you sell online." },
];

const PROCESS = [
  { when: "Day 1", t: "Brief", b: "You tell us about your business in about a minute. A project lead calls to plan the build." },
  { when: "Days 1–3", t: "Design", b: "We design your site and you sign off on every page before we code it." },
  { when: "Days 2–6", t: "Build", b: "Our developers hand-code it, connect payments and set up SEO and GEO." },
  { when: "72 hours to a week", t: "Launch", b: "Tested on every device and launched. Any change you ask for gets made." },
];

const TEAM = [
  "On call 24/7 for fixes and changes",
  "New pages, features and integrations",
  "Speed, security and uptime looked after",
  "Monthly SEO and AI-search improvements",
  "One thread to reach the team, not a ticket queue",
];

/**
 * /website-development: a premium landing page, ready for paid traffic. One
 * idea per section, real work up front, and every call to action leads into
 * the guided brief (submitted on the page, no WhatsApp).
 */
export function WebsiteLanding({ s }: { s: Service }) {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white">
        <Container className="pb-0 pt-20 sm:pt-28">
          <div className="mx-auto max-w-[980px] text-center">
            <p className="text-[14px] font-medium text-gold-fill">Website development</p>
            <h1 className="h-display mt-5 text-[50px] leading-[0.98] sm:text-[92px]">
              Websites that <span className="accent">sell.</span>
              <span className="block text-white/45">Built in days.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-[620px] text-[18px] leading-[1.6] text-white/70 sm:text-[19px]">
              Premium, custom-coded websites for any industry. Live in 72 hours to a week, then looked after by your own
              developer team, 24/7.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href={START} className="btn h-14 bg-white px-8 text-[16px] text-ink hover:bg-white/90">
                Start your project <IconArrow />
              </Link>
              <Link href="/work" className="btn h-14 border border-white/20 px-8 text-[16px] text-white hover:bg-white/10">
                See our work
              </Link>
            </div>
            <p className="mt-6 text-[13.5px] text-white/50">The team behind {SITE.builtStores.join(" · ")} and more</p>
            <p className="mt-2 text-[13.5px] text-white/50">
              Looking for peptide wholesale?{" "}
              <Link href="/supply#catalog" className="text-white/80 underline underline-offset-4 hover:text-white">
                See our catalog
              </Link>
            </p>
          </div>
          <div className="relative mx-auto mt-16 max-w-[1080px] translate-y-px overflow-hidden rounded-t-2xl border border-b-0 border-white/10 shadow-[0_-20px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#1b1b1e] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </span>
              <span className="ml-2 rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/60">genesisbiomapping.co</span>
            </div>
            <Image src="/showcase/genesis-desktop.webp" alt="The Genesis Biomapping website, built by our team" width={2160} height={1148} sizes="(min-width: 1080px) 1080px, 100vw" className="h-auto w-full" priority />
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">
              Premium is the <span className="accent">standard.</span>
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">What every site we build includes, whatever your industry.</p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
            {PILLARS.map((p) => (
              <li key={p.t} className="bg-white p-8 sm:p-10">
                <p className="text-[22px] font-semibold tracking-[-0.03em] text-ink">{p.t}</p>
                <p className="mt-3 text-[16px] leading-[1.65] text-body">{p.b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Work */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="h-section text-[36px] text-ink sm:text-[54px]">
                Look what we <span className="accent">built.</span>
              </h2>
              <p className="mt-3 text-[18px] text-body">Live stores taking real orders, and brands in other industries.</p>
            </div>
            <Link href="/work" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              See every site <IconArrow />
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

      {/* Process */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">
              Live in 72 hours to a <span className="accent">week.</span>
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">A clear process, with you signing off at every step.</p>
          </div>
          <ol className="mt-14 grid gap-4 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.t} className={`rounded-2xl p-7 ${i === PROCESS.length - 1 ? "bg-ink text-white" : "border border-line"}`}>
                <p className={`text-[13px] font-medium ${i === PROCESS.length - 1 ? "text-gold-fill" : "text-gold"}`}>{p.when}</p>
                <p className="mt-2 text-[22px] font-semibold tracking-[-0.03em]">{p.t}</p>
                <p className={`mt-2 text-[15px] leading-[1.6] ${i === PROCESS.length - 1 ? "text-white/70" : "text-body"}`}>{p.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Developer team */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="grid gap-10 overflow-hidden rounded-[32px] bg-ink p-8 text-white sm:p-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="text-[14px] font-medium text-gold-fill">After launch</p>
              <h2 className="h-section mt-3 text-[36px] sm:text-[54px]">
                Your own developer team, <span className="accent">on call 24/7.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-white/70">
                A monthly plan gives you a team that knows your site. Something breaks, needs changing or needs building: tell us
                and it gets done. You never touch maintenance.
              </p>
              <Link href={START} className="btn mt-9 h-14 bg-white px-8 text-[16px] text-ink hover:bg-white/90">
                Start your project <IconArrow />
              </Link>
            </div>
            <ul className="space-y-3">
              {TEAM.map((x) => (
                <li key={x} className="flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 text-[16px]">
                  <IconCheck className="shrink-0 text-gold-fill" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="h-section text-[36px] text-ink sm:text-[54px]">
              For <span className="accent">any</span> industry.
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-body">See what we build for yours.</p>
          </div>
          <ul className="mx-auto mt-12 flex max-w-[960px] flex-wrap justify-center gap-2.5">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="inline-flex h-12 items-center rounded-full border border-line-2 px-5 text-[15px] text-ink transition-colors hover:border-ink">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The other front door: wholesale & 3PL */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <Link href="/supply" className="group grid overflow-hidden rounded-[32px] border border-line bg-bg-2 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-[14px] font-medium text-gold">Also from our team · for research brands</p>
              <h2 className="h-section mt-3 text-[32px] text-ink sm:text-[46px]">
                Peptide wholesale <span className="accent">&amp; 3PL.</span>
              </h2>
              <p className="mt-4 max-w-[480px] text-[17px] leading-[1.6] text-body">
                Browse our full catalog with a COA for every wholesale lot. Factory-direct supply, white label, and storage,
                packing and shipping as your brand.
              </p>
              <span className="btn mt-8 h-14 w-fit bg-ink px-8 text-[16px] text-white">
                See the catalog &amp; wholesale <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
            <div className="relative min-h-[260px]">
              <Image src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" fill sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
          </Link>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-28 sm:mt-36">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-center text-[36px] text-ink sm:text-[54px]">Questions.</h2>
            <div className="mt-10">
              <FaqList faqs={s.faqs} />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's build yours."
        lede="Tell us about your project in about a minute. A project lead replies with a quote and a timeline, in writing."
        primary={{ href: START, label: "Start your project" }}
        contact={false}
      />
    </>
  );
}
