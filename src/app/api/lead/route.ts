import { SITE } from "@/lib/site";
import { leadEmail, looksLikeBot, parseLead } from "@/lib/lead";

/**
 * Website-development inquiries arrive here and are emailed to the team
 * through Resend. Needs RESEND_API_KEY and LEAD_FROM (a verified sender, e.g.
 * "Vanta Foundry <leads@vantalabsresearch.com>") in the environment; without
 * them it answers 503 and the form falls back to the visitor's email app.
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

  // Pretend success to bots so they don't retry.
  if (looksLikeBot(lead)) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM ?? process.env.EMAIL_FROM;
  const to = process.env.LEAD_TO ?? SITE.email;
  if (!apiKey || !from) return Response.json({ ok: false, fallback: true }, { status: 503 });

  const { subject, text, html } = leadEmail(lead);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: lead.email, subject, text, html }),
    });
    if (!res.ok) return Response.json({ ok: false, fallback: true }, { status: 502 });
  } catch {
    return Response.json({ ok: false, fallback: true }, { status: 502 });
  }
  return Response.json({ ok: true });
}
