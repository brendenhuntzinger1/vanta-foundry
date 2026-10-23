"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CATALOG, QUANTITY_NOTE, productPath } from "@/lib/catalog";
import { inquiry, inquiryLinks, useInquiry } from "@/lib/inquiry";
import { track } from "@/lib/track";
import { SITE } from "@/lib/site";
import { IconCheck, IconMail, IconPlus, IconWhatsApp } from "./icons";

/** "Add to inquiry" for one product. With several sizes, the buyer picks one (or more) first. */
export function AddToInquiry({ slug, sizes, compact = false, className = "" }: { slug: string; sizes: string[]; compact?: boolean; className?: string }) {
  const items = useInquiry();
  const id = useId();
  const [size, setSize] = useState(sizes[0]);
  const added = items.some((i) => i.slug === slug && i.size === size);
  const add = () => {
    inquiry.add(slug, size);
    track("catalog_product_select", { product: slug, size });
  };

  if (compact) {
    const any = items.some((i) => i.slug === slug);
    return (
      <button
        type="button"
        onClick={() => (any ? undefined : add())}
        aria-pressed={any}
        className={`flex h-9 w-full items-center justify-center gap-1.5 rounded-full border text-[12.5px] font-medium transition-colors ${any ? "border-ink bg-bg-2 text-ink" : "border-line-2 text-ink hover:border-ink"} ${className}`}
      >
        {any ? <><IconCheck width={14} height={14} /> In your list</> : <><IconPlus width={14} height={14} /> Add to list</>}
      </button>
    );
  }

  return (
    <div className={className}>
      {sizes.length > 1 && (
        <div>
          <p id={id} className="text-[13px] text-muted">Vial size</p>
          <div role="radiogroup" aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize(s)}
                className={`h-10 rounded-full px-4 font-mono text-[13.5px] transition-colors ${size === s ? "bg-ink text-white" : "border border-line-2 text-ink hover:border-ink"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <button type="button" onClick={add} disabled={added} className={`btn h-12 w-full px-6 text-[15px] sm:w-auto ${added ? "btn-light" : "btn-dark"} ${sizes.length > 1 ? "mt-4" : ""}`}>
        {added ? <><IconCheck /> {size} is in your inquiry</> : <><IconPlus /> Add {sizes.length > 1 ? size : ""} to inquiry</>}
      </button>
    </div>
  );
}

/**
 * The inquiry list, pinned to the bottom of the screen once something is in
 * it. Opens into the full list: sizes, number of vials, business and
 * destination, then Send on WhatsApp or Send by email.
 */
export function InquiryBar() {
  const items = useInquiry();
  const [open, setOpen] = useState(false);
  const [business, setBusiness] = useState("");
  const [shipTo, setShipTo] = useState("");
  const uid = useId();

  useEffect(() => {
    document.body.dataset.inquiry = items.length ? "1" : "";
    return () => {
      document.body.dataset.inquiry = "";
    };
  }, [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!items.length) return null;
  const { whatsapp, email } = inquiryLinks(items, { business, shipTo });
  const sent = (channel: string) => track("contact_click", { channel, form: "wholesale_inquiry", products: items.length });

  return (
    <>
      {open && <button type="button" aria-label="Close inquiry" className="fixed inset-0 z-[55] bg-ink/30" onClick={() => setOpen(false)} />}
      <div className="fixed inset-x-3 bottom-3 z-[56] mx-auto max-w-[640px]">
        {open ? (
          <section role="dialog" aria-modal="true" aria-labelledby={`${uid}-h`} className="fade-in max-h-[82vh] overflow-y-auto rounded-[22px] border border-line bg-white p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={`${uid}-h`} className="text-[20px] font-semibold tracking-[-0.025em] text-ink">Your wholesale inquiry</h2>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-muted">{QUANTITY_NOTE} No prices here: we reply with pricing and availability.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="shrink-0 rounded-full border border-line-2 px-3 py-1.5 text-[13px] text-ink">Close</button>
            </div>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {items.map((it) => {
                const p = CATALOG.find((x) => x.slug === it.slug)!;
                return (
                  <li key={`${it.slug}-${it.size}`} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 py-3.5">
                    <Link href={productPath(p.slug)} onClick={() => setOpen(false)} className="text-[15px] font-medium text-ink underline-offset-2 hover:underline">{p.name}</Link>
                    <button type="button" onClick={() => inquiry.remove(it.slug, it.size)} className="text-[12.5px] text-muted underline underline-offset-2 hover:text-ink" aria-label={`Remove ${p.name} ${it.size}`}>Remove</button>
                    <div className="col-span-2 flex flex-wrap items-center gap-2">
                      <label className="sr-only" htmlFor={`${uid}-${it.slug}-${it.size}-s`}>Vial size for {p.name}</label>
                      <select
                        id={`${uid}-${it.slug}-${it.size}-s`}
                        value={it.size}
                        onChange={(e) => inquiry.update(it.slug, it.size, { size: e.target.value })}
                        className="h-10 rounded-xl border border-line-2 bg-white px-3 font-mono text-[13.5px] text-ink"
                      >
                        {p.sizes.map((s) => <option key={s} value={s}>{s} vials</option>)}
                      </select>
                      <label className="sr-only" htmlFor={`${uid}-${it.slug}-${it.size}-q`}>Number of vials of {p.name}</label>
                      <input
                        id={`${uid}-${it.slug}-${it.size}-q`}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="How many vials?"
                        value={it.qty}
                        onChange={(e) => inquiry.update(it.slug, it.size, { qty: e.target.value.replace(/[^0-9]/g, "").slice(0, 7) })}
                        className="h-10 w-[150px] rounded-xl border border-line-2 bg-white px-3 text-[15px] text-ink outline-none focus:border-ink"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-b`} className="text-[13px] text-muted">Business name (optional)</label>
                <input id={`${uid}-b`} value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" className="mt-1 h-11 w-full rounded-xl border border-line-2 bg-white px-3 text-[15px] outline-none focus:border-ink" />
              </div>
              <div>
                <label htmlFor={`${uid}-d`} className="text-[13px] text-muted">Ship to (optional)</label>
                <input id={`${uid}-d`} value={shipTo} onChange={(e) => setShipTo(e.target.value)} placeholder="City, state or country" className="mt-1 h-11 w-full rounded-xl border border-line-2 bg-white px-3 text-[15px] outline-none focus:border-ink" />
              </div>
            </div>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {whatsapp && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => sent("whatsapp")} className="btn btn-dark h-12 text-[15px]">
                  <IconWhatsApp className="text-wa" /> Send on WhatsApp
                </a>
              )}
              <a href={email} onClick={() => sent("email")} className={`btn h-12 text-[15px] ${whatsapp ? "btn-light" : "btn-dark"}`}>
                <IconMail /> Send by email
              </a>
            </div>
            <p className="mt-3 text-[12.5px] leading-5 text-muted">
              Your message opens in {whatsapp ? "WhatsApp or your email app" : "your email app"}, addressed to {SITE.email}{whatsapp ? " or our WhatsApp" : ""}. Selecting products reserves nothing. For laboratory research use only.
            </p>
            <button type="button" onClick={() => { inquiry.clear(); setOpen(false); }} className="mt-3 text-[12.5px] text-muted underline underline-offset-2 hover:text-ink">Clear the list</button>
          </section>
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="flex w-full items-center justify-between gap-3 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-left text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]">
            <span className="text-[14.5px]">
              <span className="font-semibold">{items.length} product{items.length === 1 ? "" : "s"}</span> in your inquiry
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-ink">Review &amp; send</span>
          </button>
        )}
      </div>
    </>
  );
}
