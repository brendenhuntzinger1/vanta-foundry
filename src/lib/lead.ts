/**
 * The website-development inquiry, as sent by the guided form. Validated on
 * the server before it is emailed to the team; nothing is stored.
 */
export type Lead = {
  service: string;
  answers: { label: string; value: string }[];
  name: string;
  email: string;
  phone: string;
  business?: string;
  website?: string;
  details?: string;
  /** Honeypot: real visitors never see or fill it. */
  company_url?: string;
  /** Milliseconds the visitor spent in the form, for a bot check. */
  elapsed?: number;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

/** Returns a clean lead, or an error message a visitor can act on. */
export function parseLead(raw: unknown): { lead: Lead } | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Invalid request." };
  const r = raw as Record<string, unknown>;
  const lead: Lead = {
    service: clip(r.service, 80),
    answers: Array.isArray(r.answers)
      ? r.answers.slice(0, 20).map((a) => ({ label: clip((a as Record<string, unknown>)?.label, 80), value: clip((a as Record<string, unknown>)?.value, 400) }))
      : [],
    name: clip(r.name, 120),
    email: clip(r.email, 200),
    phone: clip(r.phone, 40),
    business: clip(r.business, 160),
    website: clip(r.website, 200),
    details: clip(r.details, 3000),
    company_url: clip(r.company_url, 200),
    elapsed: typeof r.elapsed === "number" ? r.elapsed : 0,
  };
  if (!lead.name) return { error: "Please add your name." };
  if (!EMAIL_RE.test(lead.email)) return { error: "Please add a valid email address." };
  if (lead.phone.replace(/\D/g, "").length < 10) return { error: "Please add a phone number." };
  return { lead };
}

/** Bots fill hidden fields and submit instantly. */
export function looksLikeBot(lead: Lead) {
  return Boolean(lead.company_url) || (lead.elapsed ?? 0) < 3000;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function leadEmail(lead: Lead) {
  const rows: [string, string][] = [
    ...lead.answers.map((a) => [a.label, a.value] as [string, string]),
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ...(lead.business ? [["Business", lead.business] as [string, string]] : []),
    ...(lead.website ? [["Current site", lead.website] as [string, string]] : []),
  ];
  const subject = `New ${lead.service.toLowerCase()} lead: ${lead.name}${lead.business ? ` (${lead.business})` : ""}`;
  const text = [`New ${lead.service} brief from vantafoundry.com`, "", ...rows.map(([k, v]) => `${k}: ${v}`), ...(lead.details ? ["", lead.details] : [])].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#0c0c0d">
<p style="font-size:18px;font-weight:600;margin:0 0 12px">New ${esc(lead.service)} brief</p>
<table style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#6b6b72;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`)
    .join("")}</table>
${lead.details ? `<p style="margin-top:16px;white-space:pre-wrap">${esc(lead.details)}</p>` : ""}
<p style="margin-top:20px;color:#6b6b72;font-size:13px">Reply to this email to answer ${esc(lead.name)} directly.</p></div>`;
  return { subject, text, html };
}
