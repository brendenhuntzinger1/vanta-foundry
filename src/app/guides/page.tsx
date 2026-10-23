import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand } from "@/components/blocks";
import { IconArrow } from "@/components/icons";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/guides",
  title: "Guides",
  description: "Plain answers for online businesses: fulfillment models, certificates of analysis, white label, backup payment processing and research-use-only copy.",
});

export default function GuidesIndex() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Guides.</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">The questions we get asked most, answered in the first paragraph.</p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col justify-between rounded-2xl border border-line p-7 transition-colors hover:border-line-2">
                  <div>
                    <h2 className="text-[21px] font-semibold tracking-[-0.025em] text-ink">{g.title}</h2>
                    <p className="mt-3 text-[15.5px] leading-[1.6] text-muted">{g.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-ink">Read <IconArrow /></span>
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
