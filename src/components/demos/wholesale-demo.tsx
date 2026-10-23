"use client";

import { useState } from "react";
import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

const LINES = [
  { sku: "NR-0142", qty: 200, cadence: "Every 4 weeks", lot: "FD-2610-B" },
  { sku: "NR-0177", qty: 120, cadence: "Every 8 weeks", lot: "FD-2609-A" },
  { sku: "NR-0203", qty: 60, cadence: "One-off", lot: "FD-2610-C" },
];

/** A quote built from quantities and cadence. No price is shown: none is published. */
export function WholesaleDemo() {
  const [standing, setStanding] = useState(true);

  return (
    <DemoFrame
      title="Quote Q-3318"
      subtitle={`${EXAMPLE_BRAND} · built from your volume and cadence`}
      action={<Pill tone="gold">Quoted</Pill>}
    >
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5 text-[10.5px] uppercase tracking-[0.16em] text-faint sm:grid-cols-[1fr_auto_1fr_auto]">
          <span>SKU</span>
          <span className="text-right">Units</span>
          <span className="hidden sm:block">Cadence</span>
          <span className="text-right">Lot · COA</span>
        </div>
        {LINES.map((l) => (
          <div
            key={l.sku}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_auto_1fr_auto]"
          >
            <span className="font-mono text-[12.5px] text-white">{l.sku}</span>
            <span className="text-right font-mono text-[12.5px] text-white/80">{l.qty}</span>
            <span className="hidden text-[12.5px] text-white/60 sm:block">{l.cadence}</span>
            <span className="text-right font-mono text-[11.5px] text-gold/90">{l.lot}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={standing}
          onClick={() => setStanding((v) => !v)}
          className="group inline-flex items-center gap-3 text-[13px] text-white/80"
        >
          <span
            className={`relative h-5 w-9 rounded-full border transition-colors ${
              standing ? "border-gold/50 bg-gold/25" : "border-line-strong bg-white/[0.04]"
            }`}
          >
            <span
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-[left,background] duration-200 ${
                standing ? "left-[18px] bg-gold" : "left-[3px] bg-white/50"
              }`}
            />
          </span>
          Standing order
        </button>
        <p className="text-[12px] text-faint">
          {standing ? "Reorders on cadence. Nothing to restate." : "Each order placed by hand."}
        </p>
      </div>
    </DemoFrame>
  );
}
