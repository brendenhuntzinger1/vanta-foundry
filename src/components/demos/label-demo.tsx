"use client";

import { useId, useState } from "react";
import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

/**
 * A label proof the visitor can put their own brand name on. No product is
 * named: the unit is identified by SKU and lot, which is also how the real
 * labels trace back to a certificate of analysis.
 */
export function LabelDemo() {
  const inputId = useId();
  const [brand, setBrand] = useState(EXAMPLE_BRAND);
  const [approved, setApproved] = useState(false);
  const shown = brand.trim() || EXAMPLE_BRAND;

  return (
    <DemoFrame
      title="Label proof · SKU NR-0142"
      subtitle={approved ? "Approved · in production" : "Proof v2 · awaiting your approval"}
      action={approved ? <Pill tone="ok">Approved</Pill> : <Pill tone="warn">Proof</Pill>}
    >
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="relative mx-auto w-full max-w-[340px]">
          <div className="relative rounded-xl border border-line-strong bg-[#f3f1ea] p-4 text-[#111]">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-[20px] leading-tight tracking-[-0.02em] break-words">{shown}</p>
              <QrMark />
            </div>
            <div className="mt-3 h-px bg-[#111]/15" />
            <dl className="mt-3 grid grid-cols-2 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-wide">
              <dt className="text-[#111]/50">SKU</dt>
              <dd>NR-0142</dd>
              <dt className="text-[#111]/50">Lot</dt>
              <dd>FD-2610-B</dd>
              <dt className="text-[#111]/50">Quantity</dt>
              <dd>10 mg</dd>
            </dl>
            <p className="mt-3 border-t border-[#111]/15 pt-2.5 text-[9.5px] font-semibold uppercase leading-snug tracking-wide">
              For research use only. Not for human or veterinary use.
            </p>
          </div>
        </div>
        <div className="space-y-3 sm:w-[200px]">
          <label htmlFor={inputId} className="block text-[11px] uppercase tracking-[0.18em] text-faint">
            Try your brand
          </label>
          <input
            id={inputId}
            value={brand}
            maxLength={28}
            onChange={(e) => {
              setBrand(e.target.value);
              setApproved(false);
            }}
            className="w-full rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-gold"
          />
          <button
            type="button"
            onClick={() => setApproved((v) => !v)}
            className={`w-full rounded-lg px-3 py-2.5 text-sm transition-colors ${
              approved ? "btn-ghost" : "btn-gold"
            }`}
          >
            {approved ? "Undo approval" : "Approve proof"}
          </button>
          <p className="text-[11.5px] leading-5 text-faint">Nothing is printed until a proof is approved.</p>
        </div>
      </div>
    </DemoFrame>
  );
}

/** A decorative, fixed pattern standing in for the lot-lookup code. */
function QrMark() {
  const cells = "1110111100101110101100011101011010111000111101011".split("");
  return (
    <svg width="42" height="42" viewBox="0 0 7 7" aria-hidden="true" className="shrink-0">
      {cells.map((c, i) =>
        c === "1" ? <rect key={i} x={i % 7} y={Math.floor(i / 7)} width="1" height="1" fill="#111" /> : null,
      )}
    </svg>
  );
}
