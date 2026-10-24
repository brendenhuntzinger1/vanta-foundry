import Image from "next/image";
import type { ReactNode } from "react";
import { IconCheck } from "./icons";
import { CATALOG } from "@/lib/catalog";

/*
 * The homepage's product panels: one crisp, coded UI per service, sat in a soft
 * grey frame. They show how a thing works, never a number we can't stand
 * behind: no prices, lot numbers, purities or counts. Anything illustrative
 * carries an "example" tag.
 */

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-line bg-bg-2 p-5 sm:p-10 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white shadow-[0_24px_60px_-34px_rgba(0,0,0,0.35)] ${className}`}>{children}</div>;
}

function Example() {
  return <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10.5px] font-medium text-gold">example</span>;
}

function Check({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f6ee] px-2 py-0.5 text-[11px] font-medium text-[#1f7a46]">
      <IconCheck className="h-3 w-3" /> {children}
    </span>
  );
}

/** A laptop frame around any screen, drawn in CSS. */
export function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[980px]">
      <div className="rounded-t-[18px] border border-b-0 border-[#2a2a2e] bg-[#111113] p-[10px] sm:p-[14px]">
        <div className="overflow-hidden rounded-[6px] bg-white">{children}</div>
      </div>
      <div className="relative mx-[-4%] h-[14px] rounded-b-[14px] bg-gradient-to-b from-[#d9d9db] to-[#b9b9bd] sm:h-[18px]">
        <div className="absolute left-1/2 top-0 h-[6px] w-[16%] -translate-x-1/2 rounded-b-md bg-[#a9a9ad]" />
      </div>
    </div>
  );
}

/** Wholesale: an inquiry with real catalog products, each with its COA. */
export function WholesaleMock() {
  const items = ["bpc-157", "ghk-cu", "tesamorelin"].map((s) => CATALOG.find((p) => p.slug === s)).filter((p) => p !== undefined);
  return (
    <Card className="mx-auto max-w-[460px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">Wholesale inquiry</p>
        <Example />
      </div>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {items.map((p) => (
          <li key={p.slug} className="flex items-center gap-3 py-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bg-2">
              <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium text-ink">{p.name}</span>
              <span className="block text-[12px] text-muted">{p.sizes[0]} · by the case</span>
            </span>
            <Check>COA attached</Check>
          </li>
        ))}
        <li className="flex items-center gap-3 py-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-dashed border-line-2 text-[18px] text-muted">+</span>
          <span className="flex-1">
            <span className="block text-[14px] font-medium text-ink">Not in the catalog?</span>
            <span className="block text-[12px] text-muted">Tell us. We source it.</span>
          </span>
        </li>
      </ul>
      <p className="mt-4 flex items-center justify-between text-[12.5px] text-body">
        <span>Pricing for your quantities</span>
        <span className="font-medium text-ink">Sent on WhatsApp</span>
      </p>
    </Card>
  );
}

/** White label: a proof the client approves before anything prints. */
export function LabelMock() {
  return (
    <div className="mx-auto grid max-w-[520px] gap-3 sm:grid-cols-[1fr_200px]">
      <Card className="flex items-center justify-center p-6">
        <div className="w-full max-w-[220px] rounded-xl bg-ink px-5 py-6 text-white">
          <p className="text-[10px] tracking-[0.3em] text-white/60">YOUR BRAND</p>
          <p className="mt-3 font-serif text-[26px] italic leading-none">Your Brand</p>
          <div className="mt-3 h-px w-10 bg-gold-fill" />
          <p className="mt-4 text-[10px] leading-snug text-white/55">For laboratory research use only. Not for human use.</p>
          <p className="mt-3 text-[10px] text-white/45">Lot no. on every unit</p>
        </div>
      </Card>
      <Card className="flex flex-col p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">Label proof</p>
          <Example />
        </div>
        <ol className="mt-3 space-y-2 text-[12.5px]">
          <li className="flex items-center justify-between text-muted"><span>Proof 1</span><span>Changes asked</span></li>
          <li className="flex items-center justify-between text-ink"><span>Proof 2</span><Check>Approved</Check></li>
        </ol>
        <p className="mt-auto pt-4 text-[11.5px] leading-snug text-muted">Nothing prints until you approve it.</p>
      </Card>
    </div>
  );
}

/** 3PL: one order moving through the warehouse under the client's name. */
export function ShipMock() {
  const steps = ["Order received", "Picked from your stock", "Packed in your box", "Shipped from Your Brand"];
  return (
    <Card className="mx-auto max-w-[460px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-semibold tracking-[-0.02em] text-ink">Order · Your Brand</p>
        <Example />
      </div>
      <ol className="relative mt-5 space-y-4 pl-7">
        <span className="absolute bottom-2 left-[9px] top-2 w-px bg-line-2" aria-hidden="true" />
        {steps.map((s) => (
          <li key={s} className="relative text-[14px] text-ink">
            <span className="absolute -left-7 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-ink text-white">
              <IconCheck className="h-3 w-3" />
            </span>
            {s}
          </li>
        ))}
      </ol>
      <p className="mt-5 rounded-xl bg-bg-2 px-3 py-2.5 text-[12.5px] text-body">
        Ships from Tampa Bay, Florida. Tracking emails carry your brand, not ours.
      </p>
    </Card>
  );
}

/** Websites: the live store we built, with what comes with every build. */
export function WebsiteMock() {
  return (
    <div className="mx-auto max-w-[560px]">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-line bg-bg-2 px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="ml-2 truncate rounded-full bg-white px-2.5 py-0.5 text-[11px] text-muted">vantalabsresearch.com</span>
        </div>
        <Image src="/showcase/vanta-labs-desktop.webp" alt="The Vanta Labs store, built by our team" width={2160} height={1147} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />
      </Card>
      <ul className="mt-3 flex flex-wrap gap-2">
        {["Google SEO", "AEO", "GEO", "COA pages", "Wholesale ordering"].map((x) => (
          <li key={x} className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] text-ink">{x}</li>
        ))}
        <li className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f9e5b]" /> Developer on call 24/7
        </li>
      </ul>
    </div>
  );
}

/** Card processing: a checkout on the client's store, with the backup ready. */
export function CheckoutMock() {
  return (
    <div className="mx-auto max-w-[440px]">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-line bg-bg-2 px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="ml-2 truncate rounded-full bg-white px-2.5 py-0.5 text-[11px] text-muted">yourbrand.com/checkout</span>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
            <span>
              <span className="block text-[13.5px] font-medium text-ink">Your order</span>
              <span className="block text-[11.5px] text-muted">Research use only</span>
            </span>
            <Example />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-10 rounded-lg border border-line px-3 text-[12px] leading-10 text-muted">Card number</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg border border-line px-3 text-[12px] leading-10 text-muted">Expiry</div>
              <div className="h-10 rounded-lg border border-line px-3 text-[12px] leading-10 text-muted">CVC</div>
            </div>
          </div>
          <div className="mt-3 flex h-11 items-center justify-center rounded-lg bg-ink text-[14px] font-medium text-white">Pay now</div>
          <p className="mt-3 text-center text-[11.5px] text-muted">Visa · Mastercard · Amex · Discover · Apple Pay · Google Pay</p>
        </div>
      </Card>
      <Card className="mt-3 divide-y divide-line px-4 text-[13px]">
        <p className="flex items-center justify-between py-2.5">
          <span className="inline-flex items-center gap-2 text-ink"><span className="h-2 w-2 rounded-full bg-[#2f9e5b]" /> Primary processor</span>
          <span className="text-[#1f7a46]">Active</span>
        </p>
        <p className="flex items-center justify-between py-2.5">
          <span className="inline-flex items-center gap-2 text-ink"><span className="h-2 w-2 rounded-full bg-gold-fill" /> Backup processor</span>
          <span className="text-gold">Ready</span>
        </p>
      </Card>
    </div>
  );
}
