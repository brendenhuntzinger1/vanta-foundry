import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand } from "@/components/blocks";
import { Storefront } from "@/components/storefront";
import { IconArrow } from "@/components/icons";
import { SHOWCASE } from "@/lib/showcase";
import { JsonLd, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

const LIVE = [
  {
    brand: "Vanta Labs",
    industry: "Research supply · live",
    summary: "Our own research-supply store: catalogue, lot documents, checkout and fulfillment, live today.",
    features: ["Live store", "COA per lot", "Backup processor", "Mobile-first checkout"],
    domain: "vantalabsresearch.com",
    href: SITE.parentUrl,
    desktop: "/showcase/vanta-labs-desktop.webp",
    phone: "/showcase/vanta-labs-phone.webp",
  },
  {
    brand: "Genesis Biomapping",
    industry: "Research supply · live",
    summary: "A research-compound store with stacks, a COA library, an affiliate program and a research-access gate. Built by us, live today.",
    features: ["Live store", "COA library", "Affiliate program", "Research-access gate"],
    domain: "genesisbiomapping.co",
    href: "https://genesisbiomapping.co",
    desktop: "/showcase/genesis-desktop.webp",
    phone: "/showcase/genesis-phone.webp",
  },
];

export const metadata: Metadata = pageMetadata({
  path: "/work",
  title: "Our work",
  description: "Storefronts designed and hand-coded by the Vanta Foundry team: Vanta Labs, Genesis Biomapping, skincare, coffee and athletic apparel. Custom websites for any industry.",
});

export default function WorkPage() {
  return (
    <>
      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="max-w-[760px]">
            <h1 className="h-display text-[44px] text-ink sm:text-[68px]">Look what we built.</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">
              Every store here is designed and hand-coded by our team. No templates, no page builders. Different industries,
              one standard.
            </p>
            <Link href="/start/website-development" className="btn btn-dark mt-8 h-12 px-6 text-[15px]">
              Build mine <IconArrow />
            </Link>
          </div>
        </Container>
      </section>

      {LIVE.map((l) => (
        <section key={l.brand} className="mt-20">
          <Container>
            <Head industry={l.industry} brand={l.brand} summary={l.summary} features={l.features} />
            <div className="mt-6 overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 border-b border-line bg-bg-2 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                </span>
                <span className="ml-2 truncate rounded-full bg-white px-3 py-1 text-[12px] text-muted">{l.domain}</span>
              </div>
              <Image src={l.desktop} alt={`The ${l.brand} store homepage`} width={2160} height={1148} sizes="(min-width: 1160px) 1120px, 100vw" className="hidden h-auto w-full sm:block" />
              <div className="max-h-[620px] overflow-hidden sm:hidden">
                <Image src={l.phone} alt={`The ${l.brand} store on a phone`} width={780} height={1688} sizes="100vw" className="h-auto w-full" />
              </div>
            </div>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline underline-offset-2">
              Visit {l.domain} <IconArrow />
            </a>
          </Container>
        </section>
      ))}

      {SHOWCASE.map((s) => (
        <section key={s.key} className="mt-24">
          <Container>
            <Head industry={s.industry} brand={s.brand} summary={s.summary} features={s.features} />
            <div className="mt-6">
              <Storefront s={s} />
            </div>
          </Container>
        </section>
      ))}

      <CtaBand />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Our work", path: "/work" }])} />
    </>
  );
}

function Head({ industry, brand, summary, features }: { industry: string; brand: string; summary: string; features: string[] }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-[620px]">
        <p className="text-[14px] font-medium text-gold">{industry}</p>
        <h2 className="h-section mt-1 text-[32px] text-ink sm:text-[40px]">{brand}</h2>
        <p className="mt-2 text-[16px] leading-[1.6] text-body">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {features.map((f) => (
            <li key={f} className="rounded-full bg-bg-2 px-3 py-1.5 text-[13px] text-body">{f}</li>
          ))}
        </ul>
      </div>
      <Link href="/start/website-development" className="btn btn-light h-11 shrink-0 px-5 text-[14.5px]">
        Build one like this <IconArrow />
      </Link>
    </div>
  );
}
