import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand } from "@/components/blocks";
import { pageMetadata } from "@/lib/metadata";
import { RUO_NOTICE, SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/standards",
  title: "Our standards",
  description: `How ${SITE.name} documents supply: lot numbers on every unit, certificates of analysis matched per lot, and research-use-only labelling.`,
});

const RULES = [
  { t: "A lot number on every unit", b: "Every unit we supply or label carries its lot number, and every shipment records the lots inside it." },
  { t: "Reports matched to lots", b: "Each lot is matched to its certificate of analysis where one has been issued. A report covers the lot it names, never another." },
  { t: "No claims we can't show", b: "Purity figures, test dates and labs belong on the report for each lot, where you can check them, not in marketing copy." },
  { t: "Research use only, on everything", b: "Every label, page and message we produce for supplied materials says research use only. No usage, dosing or effect claims." },
  { t: "We say no when we should", b: "We don't supply businesses that market these materials for human or veterinary use." },
];

export default function StandardsPage() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Our standards.</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">
              Five rules for the research materials we supply. Short, so they can be kept.
            </p>
          </div>
          <ol className="mt-12 divide-y divide-line border-y border-line">
            {RULES.map((r, i) => (
              <li key={r.t} className="grid gap-3 py-8 md:grid-cols-[48px_1fr_1.4fr] md:gap-8">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-2 text-[14px] font-semibold text-ink">{i + 1}</span>
                <h2 className="text-[21px] font-semibold tracking-[-0.025em] text-ink">{r.t}</h2>
                <p className="text-[16.5px] leading-[1.6] text-body">{r.b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-[14px] leading-6 text-muted">{RUO_NOTICE}</p>
          <Link href="/guides/what-a-certificate-of-analysis-should-show" className="mt-6 inline-block text-[15px] font-medium text-ink underline underline-offset-4">
            What a good certificate of analysis shows
          </Link>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
