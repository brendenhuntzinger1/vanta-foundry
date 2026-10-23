import type { Lead } from "./lead";

/**
 * Durable lead storage: the `foundry.leads` table in the Vanta Labs Supabase
 * project (supabase/foundry_leads.sql), written through two database
 * functions with the project's publishable key. That key is public by design
 * and can't read leads; the functions validate input, ignore retries of the
 * same id and brake floods. LEADS_SUPABASE_URL / LEADS_SUPABASE_KEY override
 * the defaults; set LEADS_SUPABASE_URL to "" to turn storage off.
 */
const URL_ = process.env.LEADS_SUPABASE_URL ?? "https://mlpimwgkwuqpsvsrlpqv.supabase.co";
const KEY = process.env.LEADS_SUPABASE_KEY ?? "sb_publishable_ce7MbWp2UROBThI9c8CXLQ_iU9ZCsVT";

async function rpc<T>(fn: string, body: object): Promise<T> {
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, {
    method: "POST",
    signal: AbortSignal.timeout(6_000),
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export type Saved = { ref: string; created: boolean; notified: boolean };

/** Saves the lead once. Returns null when storage is off or unreachable, so the caller still notifies. */
export async function saveLead(lead: Lead): Promise<Saved | null> {
  if (!URL_ || !KEY) return null;
  try {
    return await rpc<Saved>("foundry_save_lead", {
      p: {
        id: lead.id,
        kind: lead.kind,
        service: lead.service,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        business: lead.business,
        website: lead.website,
        details: lead.details,
        answers: lead.answers,
        source: lead.source,
      },
    });
  } catch (err) {
    console.error("lead save failed", lead.id, err instanceof Error ? err.message : "unknown");
    return null;
  }
}

/** Records whether the team email went out; failures here never fail the request. */
export async function markNotified(id: string, ok: boolean, error?: string) {
  if (!URL_ || !KEY) return;
  try {
    await rpc("foundry_lead_notified", { p_id: id, p_ok: ok, p_error: error ?? null });
  } catch (err) {
    console.error("lead notify mark failed", id, err instanceof Error ? err.message : "unknown");
  }
}
