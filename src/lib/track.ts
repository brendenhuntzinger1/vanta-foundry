"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * The measurement events (see docs/LAUNCH-BASELINE.md), counted separately:
 * - inquiry_submitted: a website brief the server confirmed saved or emailed
 *   (the only event that is a lead);
 * - wholesale_handoff: a wholesale list handed to WhatsApp or email, with its
 *   reference (the visitor still has to press send there);
 * - contact_click: any WhatsApp/email link opened.
 * Never pass names, emails or phone numbers here.
 */
export type TrackEvent =
  | "offer_view"
  | "catalog_product_select"
  | "inquiry_start"
  | "inquiry_error"
  | "inquiry_submitted"
  | "contact_click"
  | "wholesale_handoff";

export function track(event: TrackEvent, props: Record<string, string | number | boolean | null> = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    // Analytics must never break a page.
  }
}
