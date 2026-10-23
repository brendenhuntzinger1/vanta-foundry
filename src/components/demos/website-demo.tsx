"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { SITES, SiteView } from "./example-sites";

/**
 * Slide through sites we build: the live Vanta Labs store first, then invented
 * brands in other industries, each coded in HTML to the same standard.
 */
export function WebsiteDemo() {
  const [i, setI] = useState(0);
  const s = SITES[i];
  const go = (d: number) => setI((n) => (n + d + SITES.length) % SITES.length);
  return (
    <div className="screen overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex min-w-0 items-center gap-2 rounded-full bg-bg-2 px-3 py-1.5 text-[12.5px] text-muted">
          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          <span className="truncate">{s.url}</span>
        </span>
        <div className="flex shrink-0 gap-1.5">
          <Arrow dir={-1} onClick={() => go(-1)} />
          <Arrow dir={1} onClick={() => go(1)} />
        </div>
      </div>
      <div className="bg-bg-2 px-4 pt-4 sm:px-5 sm:pt-5">
        <div key={s.key} className="fade-in overflow-hidden rounded-t-xl border border-b-0 border-line bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)]">
          {/* Phones show the desktop layout zoomed out, so it reads as a real site. */}
          <div className="max-sm:[zoom:0.62]">
            <SiteView which={s.key} />
          </div>
        </div>
      </div>
      <div className="border-t border-line bg-bg-2 px-4 py-3">
        <div role="group" aria-label="Choose a site" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none]">
          {SITES.map((x, n) => (
            <button
              key={x.key}
              type="button"
              aria-pressed={i === n}
              onClick={() => setI(n)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12.5px] transition-colors ${i === n ? "bg-ink text-white" : "bg-white text-body hover:text-ink"}`}
            >
              {x.name}
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-[11.5px] text-muted">
          {s.real ? (
            <>
              {s.industry}. Built and run by us.{" "}
              <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">Visit it</a>
            </>
          ) : (
            <>{s.industry}. An example brand, designed and coded to the standard we build for clients.</>
          )}
        </p>
      </div>
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next site" : "Previous site"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition-colors hover:border-ink"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: dir === -1 ? "scaleX(-1)" : undefined }}>
        <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
