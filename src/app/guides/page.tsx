import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand } from "@/components/blocks";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/guides",
  title: "Guides",
  description:
    "Plain answers for research-supply businesses: fulfillment models, certificates of analysis, white label, backup payment processing and research-use-only copy.",
});

export default function GuidesIndex() {
  return (
    <>
      <section className="halo grain relative pt-32 sm:pt-40">
        <Container className="relative">
          <p className="eyebrow">Guides</p>
          <h1 className="display mt-5 max-w-3xl text-[46px] text-white sm:text-[68px]">Plain answers.</h1>
          <p className="mt-6 max-w-xl text-[16.5px] leading-8 text-muted">
            What research-supply businesses ask us most, answered in the first paragraph and explained after it.
          </p>
        </Container>
      </section>
      <section className="mt-20">
        <Container>
          <ul className="divide-y divide-line border-y border-line">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group grid gap-3 py-9 md:grid-cols-[1fr_1.2fr_auto] md:items-center md:gap-10">
                  <h2 className="display text-[26px] text-white transition-colors group-hover:text-gold-hi">{g.title}</h2>
                  <p className="text-[14.5px] leading-6 text-muted">{g.description}</p>
                  <span className="text-[13px] text-white/40 group-hover:text-gold" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
