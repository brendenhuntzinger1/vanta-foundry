import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconWhatsApp } from "./icons";
import { CATALOG } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

const FEATURED = ["glow", "bpc-157-tb-500", "ghk-cu", "tesamorelin", "glp-1", "cjc-1295-ipamorelin", "bpc-157", "klow"];

const LANES = [
  { href: "/wholesale", t: "Wholesale", b: "Stock from our catalog, with a COA for every lot.", src: "/supply/bulk.webp", alt: "Cartons of vials packed for a bulk order" },
  { href: "/factory-direct", t: "Factory-direct", b: "Larger runs straight from the manufacturer.", src: "/supply/factory-coa.webp", alt: "A filling line with a certificate of analysis" },
  { href: "/white-label", t: "White label", b: "Your brand on every vial. You approve the proof.", src: "/supply/unboxing.webp", alt: "A branded mailer with vials in a foam insert" },
  { href: "/fulfillment", t: "3PL fulfillment", b: "We store, pack and ship every order as your brand.", src: "/supply/warehouse.webp", alt: "Racked stock in our warehouse" },
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
            Wholesale &amp; 3PL, <span className="accent">ready to ship.</span>
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-body">
            {CATALOG.length} research peptides in stock with a COA for every wholesale lot. Buy wholesale, go factory-direct,
            put your label on it, and let us store and ship it for you.
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

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {LANES.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image src={l.src} alt={l.alt} fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="flex items-center gap-1.5 text-[18px] font-semibold tracking-[-0.02em] sm:text-[20px]">
                  {l.t} <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1 text-[13px] leading-snug text-white/75 sm:text-[14px]">{l.b}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[12.5px] text-muted">All research supply is for laboratory research use only.</p>
    </div>
  );
}
