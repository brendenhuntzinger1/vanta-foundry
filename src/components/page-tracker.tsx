"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { notePageView, noteOffer } from "@/lib/attribution";
import { track } from "@/lib/track";

/** Records the landing page once per session, and `offer_view` on offer pages. */
export function PageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    notePageView(pathname, location.search);
  }, [pathname]);
  return null;
}

/** Drop into a server page to record that an offer (a product or service) was viewed. */
export function OfferView({ id, type, label }: { id: string; type: "website" | "wholesale"; label: string }) {
  useEffect(() => {
    noteOffer(label);
    track("offer_view", { page: id, offer: type });
  }, [id, type, label]);
  return null;
}
