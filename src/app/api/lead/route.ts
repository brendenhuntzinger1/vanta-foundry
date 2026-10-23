import { SITE } from "@/lib/site";
import { leadEmail, leadRef, looksLikeBot, parseLead, type Lead } from "@/lib/lead";
import { markNotified, saveLead } from "@/lib/lead-store";

/**
 * Inquiries arrive here.
 *
 * 1. Validate (422 with a message the visitor can act on).
 * 2. Save once to foundry.leads (lead-store.ts). A retry with the same id
 *    returns the saved row instead of making a second one.
 * 3. Website briefs: email the team through Resend (RESEND_API_KEY and
 *    LEAD_FROM, optional LEAD_TO), with the id as Resend's Idempotency-Key,
 *    then record on the row whether the email went out. A brief that was
 *    saved but not emailed is still a success for the visitor: the team finds
 *    it in the table (notified_at is empty) and a retry re-sends the email.
 * 4. If the brief could be neither saved nor emailed, answer `fallback` and
 *    the form opens the visitor's email app with everything written in.
 *
 * Wholesale handoffs (the catalog list, as WhatsApp or email opens) are only
 * saved: the message itself is the notification, and it isn't a lead until
 * it arrives.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseLead(body);
  if ("error" in parsed) return Response.json({ ok: false, error: parsed.error }, { status: 422 });
  const { lead } = parsed;

  if (lead.kind === "wholesale_handoff") {
    const saved = await saveLead(lead);
    return Response.json({ ok: Boolean(saved), saved: Boolean(saved), ref: saved?.ref ?? leadRef(lead) }, { status: saved ? 200 : 503 });
  }

  // Pretend success to bots so they don't retry.
  if (looksLikeBot(lead)) return Response.json({ ok: true, ref: leadRef(lead) });

  const saved = await saveLead(lead);
  const ref = saved?.ref ?? leadRef(lead);
  if (saved?.notified) return Response.json({ ok: true, ref, saved: true, notified: true });

  const sent = await notify(lead);
  if (saved) await markNotified(lead.id, sent.ok, sent.error);
  // Shows in the Vercel logs; the row (notified_at empty) is the record to work from.
  if (saved && !sent.ok) console.error("lead saved but not emailed", ref, sent.error);

  if (saved || sent.ok) return Response.json({ ok: true, ref, saved: Boolean(saved), notified: sent.ok });
  return Response.json({ ok: false, fallback: true }, { status: sent.error === "not configured" ? 503 : 502 });
}

async function notify(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM ?? process.env.EMAIL_FROM;
  const to = process.env.LEAD_TO ?? SITE.email;
  if (!apiKey || !from) return { ok: false, error: "not configured" };
  const { subject, text, html } = leadEmail(lead);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `lead-${lead.id}` },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, text, html }),
    });
    if (!res.ok) {
      console.error("lead email failed", res.status, leadRef(lead));
      return { ok: false, error: `resend ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("lead email error", leadRef(lead), err instanceof Error ? err.message : "unknown");
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
