import { applicationText, validateApplication } from "@/lib/application";

/**
 * Receives an application and delivers it. Two delivery routes, configured by
 * environment, tried in order:
 *
 *   RESEND_API_KEY + APPLY_TO_EMAIL (+ APPLY_FROM_EMAIL)   an email to the team
 *   APPLY_WEBHOOK_URL                                       a JSON POST (Zapier, Slack, CRM)
 *
 * With neither configured the route answers 503 and the form offers email
 * instead. It never reports success for an application it did not deliver: a
 * silently dropped lead is worse than an honest error.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a field no person sees. Answer as if accepted so bots learn nothing.
  if (body && typeof body === "object" && (body as Record<string, unknown>).fax) {
    return Response.json({ ok: true });
  }

  const result = validateApplication(body);
  if (!result.ok) return Response.json({ error: "invalid", errors: result.errors }, { status: 422 });
  const app = result.value;

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLY_TO_EMAIL;
  const webhook = process.env.APPLY_WEBHOOK_URL;

  try {
    if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.APPLY_FROM_EMAIL ?? "Vanta Foundry <onboarding@resend.dev>",
          to: [to],
          reply_to: app.email,
          subject: `Application: ${app.company} (${app.services.join(", ")})`,
          text: applicationText(app),
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
      return Response.json({ ok: true });
    }
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "foundry.application", receivedAt: new Date().toISOString(), application: app }),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return Response.json({ ok: true });
    }
  } catch (err) {
    console.error("[apply] delivery failed", err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  console.error("[apply] no delivery route configured; set RESEND_API_KEY + APPLY_TO_EMAIL or APPLY_WEBHOOK_URL");
  return Response.json({ error: "not_configured" }, { status: 503 });
}
