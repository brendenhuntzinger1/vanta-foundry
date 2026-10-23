"use client";

import type { AnchorHTMLAttributes } from "react";
import { track, type TrackEvent } from "@/lib/track";

/** An external link (WhatsApp, email, a report) that records a click event. */
export function TrackedLink({ event = "contact_click", props, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { event?: TrackEvent; props: Record<string, string | number> }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, props);
        onClick?.(e);
      }}
    />
  );
}
