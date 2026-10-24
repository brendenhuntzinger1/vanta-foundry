import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, SectionHead } from "@/components/blocks";
import { Agreements } from "@/components/agreements";
import { LaunchTimeline } from "@/components/launch-timeline";
import { LaunchPackage } from "@/components/launch-package";
import { IconCheck } from "@/components/icons";
import { JsonLd, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ path: "/about", title: SEO_PAGES.about.title, description: SEO_PAGES.about.description });

const HOW = [
  { t: "We run our own brands first", b: "Every service we sell, we use on our own stores every day. If it doesn't work for us, we don't sell it to you." },
  { t: "One team, one conversation", b: "Website, payments, search, supply and shipping in one WhatsApp thread, not five vendors pointing at each other." },
  { t: "Everything in writing", b: "Scope, timeline and price in a signed agreement before work starts, and an NDA when you want one." },
  { t: "Plain answers", b: "If we can't help, or a processor won't approve your business, we tell you up front." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-[820px]">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">{SEO_PAGES.about.h1}</h1>
            <p className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-ink">The team behind the brands.</p>
            <p className="mt-6 text-[18px] leading-[1.65] text-body">
              {SITE.name} is run by the people who build and operate {SITE.builtStores.join(", ")} and
              more. We started by building what our own brands needed: a supply chain for research products,
              labels, a warehouse, custom websites and payment processing that stays up. {SITE.name} offers the same setup to
              research brands, from the first order to full scale.
            </p>
          </div>
          <div className="mt-10">
            <p className="text-[14px] font-medium text-muted">A few of the brands we&rsquo;re behind</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SITE.builtStores.map((b) => (
                <li key={b} className="rounded-full border border-line-2 px-4 py-2 text-[15px] text-ink">{b}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <SectionHead title="What we do." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link href="/wholesale" className="rounded-2xl border border-line p-7 transition-colors hover:border-ink">
              <p className="text-[21px] font-semibold tracking-[-0.025em] text-ink">Supply, label and ship</p>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-body">Our research catalog wholesale or factory-direct, your label on every vial, and 3PL fulfillment. Research use only.</p>
            </Link>
            <Link href="/website-development" className="rounded-2xl border border-line p-7 transition-colors hover:border-ink">
              <p className="text-[21px] font-semibold tracking-[-0.025em] text-ink">Sell it: websites and payments</p>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-body">A custom-coded store with COA pages and wholesale ordering, payment processing with a backup, and a developer team after launch.</p>
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <SectionHead title="How we work." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {HOW.map((h) => (
              <li key={h.t} className="rounded-2xl border border-line p-6">
                <IconCheck className="text-gold" />
                <p className="mt-4 text-[18px] font-semibold tracking-[-0.02em] text-ink">{h.t}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-body">{h.b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-body">
            How we document research supply:{" "}
            <Link href="/standards" className="text-ink underline underline-offset-2">our standards</Link>.
          </p>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <SectionHead title="How a launch runs." lede="From nothing to selling in about eight days, when one team handles the site, payments, product, labels and shipping." />
          <div className="mt-10">
            <LaunchTimeline />
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <LaunchPackage />
        </Container>
      </section>

      <Agreements />
      <CtaBand title="Talk to the team." primary={{ href: "/contact", label: SEO_PAGES.about.cta }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
    </>
  );
}
