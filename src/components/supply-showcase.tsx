import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconWhatsApp } from "./icons";
import { CATALOG } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

const FEATURED = ["glow", "bpc-157-tb-500", "ghk-cu", "tesamorelin", "glp-1", "cjc-1295-ipamorelin", "bpc-157", "klow"];

const LANES = [
  { href: "/wholesale", t: "Wholesale" },
  { href: "/factory-direct", t: "Factory-direct" },
  { href: "/white-label", t: "White label" },
  { href: "/fulfillment", t: "3PL fulfillment" },
];

/**
 * Wholesale & 3PL on the homepage itself: real products from the catalog and
 * the four ways we supply, so a research brand never has to go looking.
 */
export function SupplyShowcase() {
  const wa = whatsappLink("Hi Vanta Foundry, I'd like wholesale pricing.");
  const products = FEATURED.map((s) => CATALOG.find((p) => p.slug === s)).filter((p) => p !== undefined);
  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[780px]">
          <p className="text-[14px] font-medium text-gold">For research brands</p>
          <h2 className="h-section mt-3 text-[38px] text-ink sm:text-[60px]">
            The catalog.
            <span className="accent block">COA with every lot.</span>
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-body">
            {CATALOG.length} research peptides in stock. Buy wholesale or factory-direct, put your label on it, and we store and
            ship it for you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/supply#catalog" className="btn btn-dark h-13 px-7 text-[15.5px]">
            See all {CATALOG.length} products <IconArrow />
          </Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-13 px-7 text-[15.5px]">
              <IconWhatsApp className="text-wa" /> Wholesale pricing
            </a>
          )}
        </div>
      </div>

      <ul className="-mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0">
        {products.map((p) => (
          <li key={p.slug} className="w-[44%] shrink-0 snap-start sm:w-auto">
            <Link href="/supply#catalog" className="group block overflow-hidden rounded-2xl border border-line bg-white">
              <div className="relative aspect-[4/5] bg-bg-2">
                <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-white">COA included</span>
                <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 270px, 44vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-3.5">
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">{p.name}</p>
                <p className="mt-0.5 font-mono text-[12px] text-muted">{p.sizes.join(" · ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6">
        {LANES.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-[16px] font-medium text-ink">
              {l.t} <IconArrow className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-muted">All research supply is for laboratory research use only.</p>
    </div>
  );
}
