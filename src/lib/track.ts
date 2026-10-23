"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * The measurement events (see docs/LAUNCH-BASELINE.md). A contact click is not
 * a lead: `inquiry_submitted` fires only after the server confirms the brief
 * was sent, so the two are counted separately. Never pass names, emails or
 * phone numbers here.
 */
export type TrackEvent =
  | "offer_view"
  | "catalog_product_select"
  | "inquiry_start"
  | "inquiry_error"
  | "inquiry_submitted"
  | "contact_click";

export function track(event: TrackEvent, props: Record<string, string | number | boolean | null> = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break a page.
  }
}
