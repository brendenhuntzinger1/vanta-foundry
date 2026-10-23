import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { IconArrow } from "./icons";
import { LABEL_LOOKS } from "@/lib/labels";
import { SiteRotator } from "./site-rotator";

/**
 * The first thing under the headline: every service as a tile with its own
 * picture, so a visitor knows what we offer before scrolling.
 */
export function ServiceBento() {
  const svc = (slug: string) => SERVICES.find((s) => s.slug === slug)!;
  const look = (key: string) => LABEL_LOOKS.find((l) => l.key === key)!.src;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Tile slug="website-development" title="Custom websites, any industry" body="Custom-coded and live in 72 hours to a week, with your own developer team on call.">
        <SiteRotator />
      </Tile>

      <Tile slug="payment-processing" title="Payment processing, any industry" body="Cards, Apple Pay and Google Pay, with a backup processor always ready.">
        <PayVisual />
      </Tile>

      <Tile slug="wholesale" title={svc("wholesale").name} body="Research products by the case, at wholesale prices that leave room for your margin.">
        <Photo src="/supply/bulk.webp" alt="Cartons of vials packed for a bulk order" chip="Bulk quantities · wholesale pricing" />
      </Tile>

      <Tile slug="factory-direct" title={svc("factory-direct").name} body="Made to order at the manufacturer. A certificate of analysis comes with every wholesale lot.">
        <Photo src="/supply/factory-coa.webp" alt="A vial filling line with a certificate of analysis on a clipboard" chip="COA included with wholesale" />
      </Tile>

      <Tile slug="white-label" title={svc("white-label").name} body="Your brand on every vial, in any look you want.">
        <div className="flex h-full items-end justify-center gap-2 bg-[#141416] px-4 pt-5">
          {["halo", "kinetic", "ember", "polar"].map((k, i) => (
            <div key={k} className={`relative w-[22%] overflow-hidden rounded-t-lg ${i % 2 ? "h-[150px]" : "h-[165px]"}`}>
              <Image src={look(k)} alt="" fill sizes="100px" className="object-cover" />
            </div>
          ))}
        </div>
      </Tile>

      <Tile slug="fulfillment" title={svc("fulfillment").name} body="We store your stock, pack every order and ship it as your brand.">
        <Photo src="/supply/warehouse.webp" alt="Aisles of racked, labelled stock in a clean warehouse" chip="Stored, packed & shipped as your brand" />
      </Tile>

      <SeoTile />
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

function Photo({ src, alt, chip }: { src: string; alt: string; chip: string }) {
  return (
    <>
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1.5 text-[12px] font-medium text-white">{chip}</span>
    </>
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
function PayVisual() {
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

/** Full-width tile: the brand on Google, and named in an AI answer. */
function SeoTile() {
  return (
    <li className="sm:col-span-2 lg:col-span-3">
      <Link href="/start/seo-ai-search" className="group grid overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-line-2 hover:shadow-[0_14px_36px_-20px_rgba(0,0,0,0.3)] lg:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-[13px] font-medium text-gold">New · SEO & AI search</p>
          <p className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[28px]">Found on Google. Recommended by AI.</p>
          <p className="mt-2 text-[15px] leading-[1.55] text-muted">
            SEO and GEO for any industry, so customers find you on Google, Maps, ChatGPT, Gemini and Perplexity. On its own or in a launch package.
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
            Get started <IconArrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
        <div className="grid gap-3 bg-[#141416] p-5 sm:grid-cols-2 sm:p-6" aria-hidden="true">
          <div className="rounded-xl bg-white p-4">
            <p className="text-[11px] text-muted">Google · &ldquo;best coffee subscription&rdquo;</p>
            <p className="mt-2 text-[11px] text-body">halcyoncoffee.com</p>
            <p className="text-[14px] font-medium leading-snug text-[#1a0dab]">Halcyon Coffee · Fresh-Roasted Subscriptions</p>
            <p className="mt-1 text-[12px] leading-[1.45] text-body">Small-lot beans roasted every Monday, shipped the same week.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1d1d20] p-4 text-white">
            <p className="text-[11px] text-white/55">AI answer</p>
            <p className="mt-2 text-[12.5px] leading-[1.5] text-white/85">
              For a fresh-roasted subscription, <span className="font-semibold text-white">Halcyon Coffee</span> roasts small lots weekly and ships the same week.
            </p>
            <p className="mt-2 inline-flex rounded-full border border-white/15 px-2 py-0.5 text-[10.5px] text-white/65">Source: halcyoncoffee.com</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
