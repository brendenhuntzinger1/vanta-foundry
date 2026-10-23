import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand } from "@/components/blocks";
import { IconArrow } from "@/components/icons";
import { INDUSTRIES } from "@/lib/industries";
import { JsonLd, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/industries",
  title: "Industries",
  description: "Custom websites, payment processing and SEO & AI search for skincare, med spas, supplements, coffee, apparel, gyms, restaurants, trades, real estate, salons, professional services and research peptide brands.",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Built for your industry.</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">
              Websites, payment processing and SEO & AI search for any lawful business. Pick yours to see what we build for it.
            </p>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-ink">
                  <span className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{i.name}</span>
                  <span className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-muted">{i.build.slice(0, 3).join(" · ")}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">See what we build <IconArrow className="transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[15px] text-body">
            Don&rsquo;t see yours? We build for any lawful business.{" "}
            <Link href="/start/website-development" className="text-ink underline underline-offset-2">Tell us about it</Link>.
          </p>
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
    </>
  );
}
