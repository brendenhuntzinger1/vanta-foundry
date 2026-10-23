"use client";

import { useState } from "react";

/** A site we might build for any business, previewed on desktop or phone. */
export function WebsiteDemo() {
  const [view, setView] = useState<"desktop" | "phone">("desktop");
  return (
    <div className="screen overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2 rounded-full bg-bg-2 px-3 py-1.5 text-[12.5px] text-muted">
          <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          <span className="truncate">harborandpine.com</span>
        </div>
        <div role="group" aria-label="Preview size" className="flex shrink-0 rounded-full bg-bg-2 p-0.5 text-[12px]">
          {(["desktop", "phone"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1 capitalize transition-colors ${view === v ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-muted"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center bg-bg-2 p-5">
        <div className={`overflow-hidden rounded-xl border border-line bg-white transition-[width] duration-300 ${view === "phone" ? "w-[220px]" : "w-full"}`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink">Harbor &amp; Pine</span>
            <span className="text-[11px] text-muted">{view === "phone" ? "Menu" : "Shop · About · Cart (2)"}</span>
          </div>
          <div className="bg-[#efe9df] px-4 py-6">
            <p className="text-[18px] font-semibold leading-tight tracking-[-0.03em] text-ink">Furniture made to last.</p>
            <span className="mt-3 inline-flex rounded-full bg-ink px-3 py-1.5 text-[11px] text-white">Shop the collection</span>
          </div>
          <div className={`grid gap-2.5 p-4 ${view === "phone" ? "grid-cols-2" : "grid-cols-4"}`}>
            {["#d9cfc0", "#c9bba6", "#e4ddd2", "#bfae96"].slice(0, view === "phone" ? 2 : 4).map((c, i) => (
              <div key={c}>
                <div className="aspect-square rounded-md" style={{ background: c }} />
                <p className="mt-1.5 text-[10.5px] text-ink">{["Oak chair", "Side table", "Linen throw", "Floor lamp"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-line bg-bg-2 px-5 py-2 text-[11px] text-muted">Example site</p>
    </div>
  );
}
