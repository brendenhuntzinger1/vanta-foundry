"use client";

import { useSyncExternalStore } from "react";
import { CATALOG } from "./catalog";
import { emailLink, whatsappLink } from "./site";
import { attributionRows } from "./attribution";
import { refFor } from "./uuid";

/**
 * The wholesale inquiry a buyer builds while browsing: products, a vial size
 * for each and a number of vials. Kept in localStorage so it survives moving
 * between the catalog and product pages. Selecting a product reserves nothing
 * and carries no price; the team replies with pricing and availability.
 */
export type InquiryItem = { slug: string; size: string; qty: string };

const KEY = "vf-inquiry";
const listeners = new Set<() => void>();
let cache: InquiryItem[] | null = null;
const EMPTY: InquiryItem[] = [];

function load(): InquiryItem[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as InquiryItem[];
    cache = Array.isArray(raw) ? raw.filter((i) => CATALOG.some((p) => p.slug === i.slug)) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function save(items: InquiryItem[]) {
  cache = items;
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage blocked: the inquiry still works for this page view.
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useInquiry() {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export const inquiry = {
  add(slug: string, size: string) {
    const items = load();
    if (items.some((i) => i.slug === slug && i.size === size)) return;
    save([...items, { slug, size, qty: "" }]);
  },
  remove(slug: string, size: string) {
    save(load().filter((i) => !(i.slug === slug && i.size === size)));
  },
  update(slug: string, size: string, patch: Partial<InquiryItem>) {
    const items = load();
    // Changing the size onto one already listed merges the two lines.
    if (patch.size && patch.size !== size && items.some((i) => i.slug === slug && i.size === patch.size)) {
      save(items.filter((i) => !(i.slug === slug && i.size === size)));
      return;
    }
    save(items.map((i) => (i.slug === slug && i.size === size ? { ...i, ...patch } : i)));
  },
  clear() {
    save([]);
  },
};

/** The message a buyer sends: one line per product, then the details we need to quote. */
type Extra = { business?: string; shipTo?: string; notes?: string; id?: string };

export function inquiryMessage(items: InquiryItem[], extra: Extra = {}) {
  const lines = items.map((i) => {
    const p = CATALOG.find((x) => x.slug === i.slug);
    const qty = i.qty.trim() ? `${i.qty.trim()} vials` : "quantity to confirm";
    return `- ${p?.name ?? i.slug}, ${i.size} vials: ${qty}`;
  });
  const source = attributionRows().map((r) => `${r.label}: ${r.value}`);
  return [
    "Hi Vanta Foundry, I'd like wholesale pricing for:",
    ...lines,
    "",
    `Business name: ${extra.business?.trim() ?? ""}`,
    `Ship to (city, state/country): ${extra.shipTo?.trim() ?? ""}`,
    ...(extra.notes?.trim() ? ["", extra.notes.trim()] : []),
    "",
    "For laboratory research use only.",
    ...(extra.id ? [`Reference: ${refFor(extra.id)}`] : []),
    ...(source.length ? ["", "(Sent from vantafoundry.com)", ...source] : []),
  ].join("\n");
}

/** One line per product, for the saved record of the handoff. */
export function inquiryRows(items: InquiryItem[]) {
  return items.map((i) => ({ label: CATALOG.find((x) => x.slug === i.slug)?.name ?? i.slug, value: `${i.size} vials: ${i.qty.trim() ? `${i.qty.trim()} vials` : "quantity to confirm"}` }));
}

/**
 * Logs the list as the visitor hands it to WhatsApp or their email app, so
 * the team can match the message by its reference. Uses sendBeacon so it
 * survives the page navigating away; failure never blocks the visitor.
 */
export function logHandoff(id: string, items: InquiryItem[], channel: string, extra: Extra = {}) {
  try {
    const payload = JSON.stringify({
      id,
      kind: "wholesale_handoff",
      service: `Wholesale inquiry (${channel})`,
      answers: inquiryRows(items),
      business: extra.business ?? "",
      details: extra.shipTo ? `Ship to: ${extra.shipTo}` : "",
      source: attributionRows(),
    });
    const blob = new Blob([payload], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/lead", blob)) {
      void fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true });
    }
  } catch {
    // Logging must never stop the inquiry.
  }
}

export function inquiryLinks(items: InquiryItem[], extra: Extra = {}) {
  const msg = inquiryMessage(items, extra);
  const subject = `Wholesale inquiry: ${items.length} product${items.length === 1 ? "" : "s"}`;
  return { whatsapp: whatsappLink(msg), email: emailLink(subject, msg) };
}
