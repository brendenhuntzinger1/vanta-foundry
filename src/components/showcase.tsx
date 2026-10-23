"use client";

import { useState, type KeyboardEvent } from "react";
import { Demo } from "./demos";
import type { DemoKey } from "@/lib/services";

const TABS: { key: DemoKey; label: string }[] = [
  { key: "payments", label: "Payments" },
  { key: "fulfillment", label: "Orders & shipping" },
  { key: "label", label: "Your label" },
  { key: "website", label: "Your website" },
];

/** The hero product shot: a device frame with the services as live screens. */
export function Showcase() {
  const [active, setActive] = useState(0);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length;
    setActive(next);
    document.getElementById(`show-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div className="rounded-[26px] bg-[#111113] p-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.45)] sm:p-3">
        <div className="rounded-[18px] bg-bg-2 p-3 sm:p-8">
          <div className="mx-auto max-w-[720px]" id="show-panel" role="tabpanel" aria-labelledby={`show-tab-${active}`}>
            <div key={active} className="fade-in">
              <Demo which={TABS[active].key} />
            </div>
          </div>
        </div>
      </div>
      <div role="tablist" aria-label="See it working" className="mt-6 flex flex-wrap justify-center gap-2">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            id={`show-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="show-panel"
            tabIndex={active === i ? 0 : -1}
            onKeyDown={onKey}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-[14px] transition-colors ${active === i ? "bg-ink text-white" : "bg-bg-2 text-body hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
