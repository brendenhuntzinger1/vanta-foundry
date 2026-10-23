"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";

const VIEWS = {
  desktop: { src: "/showcase/vanta-labs-desktop.webp", w: 2160, h: 1147, label: "Desktop" },
  phone: { src: "/showcase/vanta-labs-phone.webp", w: 780, h: 1688, label: "Phone" },
  entry: { src: "/showcase/vanta-labs-entry.webp", w: 1440, h: 900, label: "Age check" },
} as const;

type View = keyof typeof VIEWS;

/**
 * Work we have built, not a mock-up: the Vanta Labs storefront, captured from
 * the live site (2026-10-23). Desktop, phone, and the age and research-use
 * check visitors pass on the way in.
 */
export function WebsiteDemo() {
  const [view, setView] = useState<View>("desktop");
  const v = VIEWS[view];
  return (
    <div className="screen overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <a
          href={SITE.parentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center gap-2 rounded-full bg-bg-2 px-3 py-1.5 text-[12.5px] text-muted hover:text-ink"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          <span className="truncate">vantalabsresearch.com</span>
        </a>
        <div role="group" aria-label="Preview" className="flex shrink-0 rounded-full bg-bg-2 p-0.5 text-[12px]">
          {(Object.keys(VIEWS) as View[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={view === k}
              onClick={() => setView(k)}
              className={`rounded-full px-2.5 py-1 transition-colors sm:px-3 ${view === k ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted"}`}
            >
              {VIEWS[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className={`flex items-start justify-center overflow-hidden bg-bg-2 px-4 pt-4 sm:px-5 sm:pt-5 ${view === "phone" ? "h-[300px] sm:h-[360px]" : ""}`}>
        <div
          key={view}
          className={`fade-in overflow-hidden rounded-t-xl border border-b-0 border-line bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)] ${view === "phone" ? "w-[180px] sm:w-[200px]" : "w-full"}`}
        >
          <Image src={v.src} alt={`Vanta Labs website, ${v.label.toLowerCase()} view`} width={v.w} height={v.h} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />
        </div>
      </div>
      <p className="border-t border-line bg-bg-2 px-5 py-2 text-[11px] text-muted">
        Built by our team: the live Vanta Labs store.{" "}
        <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
          Visit it
        </a>
      </p>
    </div>
  );
}
