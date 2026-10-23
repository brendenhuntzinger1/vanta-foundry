"use client";

/**
 * Where a visitor came from, kept for the session so an inquiry can carry it:
 * the first page they landed on, the referring site, any utm_* tags, and the
 * last offer page they looked at (a product, a service). Stored in
 * sessionStorage only; nothing personal, and nothing leaves the browser until
 * the visitor sends an inquiry.
 */
const KEY = "vf-attribution";

export type Attribution = { landing?: string; referrer?: string; utm?: string; lastOffer?: string };

function read(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

function write(a: Attribution) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // Private mode or blocked storage: inquiries still work without it.
  }
}

/** Called on every page view; records the landing page only once per session. */
export function notePageView(pathname: string, search: string) {
  const a = read();
  if (!a.landing) {
    const params = new URLSearchParams(search);
    const utm = [...params.entries()].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => `${k}=${v}`).join("&");
    let referrer = "";
    try {
      referrer = document.referrer ? new URL(document.referrer).host : "";
    } catch {
      referrer = "";
    }
    write({ ...a, landing: pathname, referrer: referrer && referrer !== location.host ? referrer : "", utm });
  }
}

export function noteOffer(label: string) {
  write({ ...read(), lastOffer: label });
}

export function getAttribution(): Attribution {
  return read();
}

/** Rows for an inquiry, in the order the team reads them. */
export function attributionRows(): { label: string; value: string }[] {
  const a = read();
  return [
    { label: "Landing page", value: a.landing ?? "" },
    { label: "Referrer", value: a.referrer ?? "" },
    { label: "Campaign", value: a.utm ?? "" },
    { label: "Last page viewed", value: a.lastOffer ?? "" },
  ].filter((r) => r.value);
}
