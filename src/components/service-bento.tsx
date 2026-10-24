import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { IconArrow, IconCheck } from "./icons";
import { CATALOG } from "@/lib/catalog";
import { LABEL_LOOKS } from "@/lib/labels";
import { SiteRotator } from "./site-rotator";

/**
 * What we offer research brands, as two rows of tiles: supply, label and ship;
 * and the website, payments and search to sell it. Each tile opens its
 * one-minute start flow.
 */
export function WebBento() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Tile slug="website-development" title="Custom websites" body="Custom-coded and live in 72 hours to a week, with your own developer team on call.">
        <SiteRotator />
      </Tile>
      <Tile slug="payment-processing" title="Payment processing" body="Cards, Apple Pay and Google Pay, with a backup processor always ready.">
        <PayVisual />
      </Tile>
      <Tile slug="seo-ai-search" title="SEO & AI search" body="Found on Google and Maps, and recommended by ChatGPT, Gemini and Perplexity.">
        <SeoVisual />
      </Tile>
    </ul>
  );
}

export function SupplyBento() {
  const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Tile slug="wholesale" title={svc("wholesale").name} body="Our catalog by the case, COA with every lot. Anything else, we source.">
        <CatalogVisual />
      </Tile>
      <Tile slug="factory-direct" title={svc("factory-direct").name} body="Made to order at the manufacturer, for the lowest unit cost.">
        <CoaVisual />
      </Tile>
      <Tile slug="white-label" title={svc("white-label").name} body="Your brand on every vial, in any look you want.">
        <VialRow />
      </Tile>
      <Tile slug="fulfillment" title={svc("fulfillment").name} body="We store, pack and ship every order as your brand.">
        <ShipVisual />
      </Tile>
    </ul>
  );
}

function Tile({ slug, title, body, children }: { slug: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={`/start/${slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-line-2 hover:shadow-[0_14px_36px_-20px_rgba(0,0,0,0.3)]">
        <div className="relative h-[200px] overflow-hidden bg-[#141416]" aria-hidden="true">{children}</div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{title}</p>
          <p className="mt-1 text-[14.5px] leading-[1.5] text-muted">{body}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
            Get started <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </li>
  );
}


function ApplePay({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 20" className={className} aria-hidden="true">
      <path d="M10.6 5.2c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.9-2.5.6-.7 1.6-1.2 2.4-1.2.1.9-.3 1.8-.9 2.6Zm.9 1.4c-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.2 1 8.3.7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7 1.2 0 1.6.7 2.7.6 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.2-3.3 0-2.1 1.7-3 1.8-3.1-1-1.4-2.5-1.6-3-1.7Z" fill="currentColor" />
      <text x="17" y="15" fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif" fontWeight="600" fontSize="12" fill="currentColor">Pay</text>
    </svg>
  );
}

/** A dark checkout sheet: Apple Pay front and centre, cards and backup below. */
export function PayVisual() {
  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className="w-full max-w-[260px] rounded-2xl border border-white/10 bg-[#1d1d20] p-4 text-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between text-[11.5px] text-white/60">
          <span>Checkout</span>
          <span className="inline-flex items-center gap-1.5 text-[#5fd08f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5fd08f]" /> Processor active
          </span>
        </div>
        <div className="mt-3 flex h-11 items-center justify-center rounded-xl bg-white text-black">
          <ApplePay className="h-[22px]" />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {["VISA", "MC", "AMEX", "G Pay"].map((b) => (
            <span key={b} className="flex h-7 items-center justify-center rounded-md border border-white/12 text-[10px] font-semibold tracking-wide text-white/80">
              {b}
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-white/55">
          <span>Backup processor</span>
          <span className="text-white/80">Ready</span>
        </p>
      </div>
    </div>
  );
}

/** The brand on Google, and named in an AI answer. */
function SeoVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-5">
      <div className="rounded-xl bg-white p-3.5">
        <p className="text-[10.5px] text-muted">Google · &ldquo;bpc-157 coa&rdquo;</p>
        <p className="mt-1 text-[13px] font-medium leading-snug text-[#1a0dab]">Your Brand · BPC-157 · Lab Reports</p>
        <p className="text-[11px] text-body">Every lot with its certificate of analysis. Research use only.</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#1d1d20] p-3.5 text-white">
        <p className="text-[10.5px] text-white/55">AI answer</p>
        <p className="mt-1 text-[12px] leading-[1.45] text-white/85">
          <span className="font-semibold text-white">Your Brand</span> publishes a COA for every lot.
        </p>
      </div>
    </div>
  );
}

/** Four label looks side by side, on dark. */
export function VialRow() {
  const look = (key: string) => LABEL_LOOKS.find((l) => l.key === key)!.src;
  return (
    <div className="flex h-full items-end justify-center gap-2 bg-[#141416] px-4 pt-5">
      {["halo", "kinetic", "ember", "polar"].map((k, i) => (
        <div key={k} className={`relative w-[22%] max-w-[110px] overflow-hidden rounded-t-lg ${i % 2 ? "h-[78%]" : "h-[86%]"}`}>
          <Image src={look(k)} alt="" fill sizes="110px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/** Four real catalog products, as a wholesale price list would show them. */
export function CatalogVisual() {
  const items = ["bpc-157", "ghk-cu", "tesamorelin", "glow"].map((slug) => CATALOG.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-5">
      {items.map((p) => (
        <div key={p.slug} className="flex items-center gap-3 rounded-xl bg-[#1d1d20] p-1.5 pr-3 text-white">
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white">
            <Image src={p.image} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="flex-1 truncate text-[12.5px] font-medium">{p.name}</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/75">COA</span>
        </div>
      ))}
    </div>
  );
}

/** A certificate of analysis, as a buyer receives it: what it covers, no figures. */
function CoaVisual() {
  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className="w-full max-w-[250px] rounded-xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]">
        <p className="text-[10.5px] text-muted">Certificate of analysis</p>
        <p className="mt-0.5 text-[14px] font-semibold tracking-[-0.02em] text-ink">Third-party tested</p>
        <ul className="mt-3 space-y-1.5 border-t border-line pt-2.5 text-[11.5px] text-body">
          {["Identity", "Purity", "Lot number", "Testing lab"].map((x) => (
            <li key={x} className="flex items-center justify-between">
              {x}
              <IconCheck className="h-3.5 w-3.5 text-[#2f9e5b]" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** An order moving through our warehouse under the client's brand. */
function ShipVisual() {
  return (
    <div className="flex h-full items-center justify-center px-5">
      <div className="w-full max-w-[260px] rounded-2xl border border-white/10 bg-[#1d1d20] p-4 text-white">
        <div className="flex items-center justify-between text-[11.5px] text-white/60">
          <span>Order · Your Brand</span>
          <span className="text-[#5fd08f]">Shipped</span>
        </div>
        <ol className="mt-3 space-y-2">
          {["Picked from stock", "Packed in your box", "Labelled and shipped"].map((x) => (
            <li key={x} className="flex items-center gap-2.5 text-[12px] text-white/85">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5fd08f] text-[#0f1a14]">
                <IconCheck className="h-2.5 w-2.5" />
              </span>
              {x}
            </li>
          ))}
        </ol>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full rounded-full bg-[#5fd08f]" />
        </div>
      </div>
    </div>
  );
}
