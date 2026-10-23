import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, SectionHead } from "@/components/blocks";
import { pageMetadata } from "@/lib/metadata";
import { RUO_NOTICE, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/standards",
  title: "Standards",
  description: `How ${SITE.name} documents supply: lot numbers on every unit, certificates of analysis matched per lot, and research-use-only standards on every label and page.`,
});

const RULES = [
  {
    t: "A lot number on every unit",
    b: "Every unit we supply or label carries its lot number. Every shipment records the lots inside it.",
  },
  {
    t: "Reports matched per lot",
    b: "Each lot is matched to its published certificate of analysis where one has been issued. A report covers the lot it names, never a different one.",
  },
  {
    t: "Nothing we can't show",
    b: "We don't state purity figures, test dates, laboratories or certifications on this site. They belong on the report for each lot, where they can be checked.",
  },
  {
    t: "Research use only, everywhere",
    b: "On every label, page and message we produce for you. We don't print, build or send dosing, usage, preparation or outcome claims.",
  },
  {
    t: "Partners held to the same line",
    b: "We decline businesses that market these materials for human or veterinary use, and we review partner storefront copy before launch.",
  },
];

export default function StandardsPage() {
  return (
    <>
      <section className="halo grain relative pt-32 sm:pt-40">
        <Container className="relative">
          <p className="eyebrow">Standards</p>
          <h1 className="display mt-5 max-w-3xl text-[46px] text-white sm:text-[72px]">
            Documentation, <span className="text-white/50">not adjectives.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[16.5px] leading-8 text-muted">
            The rules we hold our own supply to, and the ones we hold partners to. Short, so they can be kept.
          </p>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <ol className="divide-y divide-line border-y border-line">
            {RULES.map((r, i) => (
              <li key={r.t} className="grid gap-4 py-10 md:grid-cols-[80px_1fr_1.3fr]">
                <span className="font-mono text-[12px] text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display text-[26px] text-white">{r.t}</h2>
                <p className="text-[15.5px] leading-7 text-muted">{r.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="mt-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHead
            eyebrow="Read a report"
            title="What a good COA shows."
            lede="Our guide walks through the fields a credible certificate of analysis carries and the warning signs in a weak one."
          />
          <div className="flex items-end lg:justify-end">
            <Link href="/guides/what-a-certificate-of-analysis-should-show" className="btn-ghost rounded-full px-6 py-3 text-[14px]">
              Read the guide <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <p className="max-w-3xl rounded-2xl border border-line p-7 text-[14px] leading-7 text-white/60">{RUO_NOTICE}</p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
