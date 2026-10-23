"use client";

import { useState, type KeyboardEvent } from "react";
import { Demo } from "./demos";
import type { DemoKey } from "@/lib/services";
import { EXAMPLE_BRAND } from "./demos/frame";

const TABS: { key: DemoKey; label: string; nav: string }[] = [
  { key: "wholesale", label: "Wholesale", nav: "Quotes" },
  { key: "label", label: "White label", nav: "Labels" },
  { key: "fulfillment", label: "Fulfillment", nav: "Orders" },
  { key: "payments", label: "Payments", nav: "Checkout" },
  { key: "storefront", label: "Storefront", nav: "Storefront" },
];

/**
 * The partner console in the hero: one account, every service, switchable.
 * Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
 */
export function Console() {
  const [active, setActive] = useState(0);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    document.getElementById(`console-tab-${next}`)?.focus();
  }

  return (
    <div className="relative">
      <div className="glass overflow-hidden rounded-[22px] p-1.5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="grid overflow-hidden rounded-[17px] border border-line bg-[#0c0c0c] lg:grid-cols-[210px_1fr]">
          <aside className="hidden border-r border-line p-4 lg:block" aria-hidden="true">
            <div className="flex items-center gap-2.5 rounded-lg border border-line px-3 py-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] font-display text-[13px] text-gold">N</span>
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] text-white">{EXAMPLE_BRAND}</span>
                <span className="block text-[10.5px] text-faint">Partner account</span>
              </span>
            </div>
            <ul className="mt-5 space-y-0.5 text-[13px]">
              {["Overview", ...TABS.map((t) => t.nav), "Lots & COAs", "Settings"].map((n) => {
                const on = TABS[active].nav === n;
                return (
                  <li key={n} className={`rounded-md px-3 py-2 ${on ? "bg-white/[0.06] text-white" : "text-white/45"}`}>
                    {n}
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="min-w-0 p-3 sm:p-5">
            <div role="tablist" aria-label="Services" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-4 [scrollbar-width:none]">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  id={`console-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls="console-panel"
                  tabIndex={active === i ? 0 : -1}
                  onKeyDown={onKey}
                  onClick={() => setActive(i)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${
                    active === i ? "bg-white text-ink" : "text-white/55 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div id="console-panel" role="tabpanel" aria-labelledby={`console-tab-${active}`} key={active} className="fade-in">
              <Demo which={TABS[active].key} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
