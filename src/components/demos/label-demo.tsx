"use client";

import { useId, useState } from "react";
import { Pill, Screen } from "./frame";

/** A label proof the visitor can put their own brand name on. */
export function LabelDemo() {
  const inputId = useId();
  const [brand, setBrand] = useState("Your Brand");
  const [approved, setApproved] = useState(false);
  const shown = brand.trim() || "Your Brand";

  return (
    <Screen
      title="Label proof"
      subtitle={approved ? "Approved · sent to print" : "Waiting for your approval"}
      status={approved ? <Pill tone="ok">Approved</Pill> : <Pill tone="warn">Proof</Pill>}
    >
      <div className="grid gap-6 sm:grid-cols-[1fr_190px] sm:items-center">
        <div className="mx-auto w-full max-w-[320px] rounded-xl border border-line-2 bg-[#fbfaf6] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <p className="break-words text-[20px] font-semibold leading-tight tracking-[-0.03em] text-ink">{shown}</p>
          <div className="mt-3 h-px bg-line-2" />
          <dl className="mt-3 grid grid-cols-2 gap-y-1.5 font-mono text-[11px] uppercase text-ink">
            <dt className="text-muted">Item</dt>
            <dd>SKU 0142</dd>
            <dt className="text-muted">Lot</dt>
            <dd>VL-2610-B</dd>
            <dt className="text-muted">Size</dt>
            <dd>10 mg</dd>
          </dl>
          <p className="mt-3 border-t border-line-2 pt-2.5 text-[9.5px] font-semibold uppercase leading-snug tracking-wide text-ink">
            For research use only. Not for human or veterinary use.
          </p>
        </div>
        <div className="space-y-3">
          <label htmlFor={inputId} className="block text-[13px] font-medium text-ink">
            Type your brand name
          </label>
          <input
            id={inputId}
            value={brand}
            maxLength={26}
            onChange={(e) => {
              setBrand(e.target.value);
              setApproved(false);
            }}
            className="h-11 w-full rounded-lg border border-line-2 bg-white px-3 text-[15px] text-ink outline-none focus:border-ink"
          />
          <button type="button" onClick={() => setApproved((v) => !v)} className={`btn h-11 w-full text-[14px] ${approved ? "btn-light" : "btn-dark"}`}>
            {approved ? "Undo" : "Approve proof"}
          </button>
        </div>
      </div>
    </Screen>
  );
}
