"use client";

import { useId, useState } from "react";
import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

const LOTS: Record<string, string> = {
  "FD-2610-B": "Report on file · identity and purity",
  "FD-2609-A": "Report on file · identity and purity",
};

/** A storefront in miniature: attestation at entry, gated catalogue, lot lookup. */
export function StorefrontDemo() {
  const lotId = useId();
  const [entered, setEntered] = useState(false);
  const [lot, setLot] = useState("FD-2610-B");
  const key = lot.trim().toUpperCase();
  const hit = LOTS[key];

  return (
    <DemoFrame
      title="yourbrand.com"
      subtitle="Storefront built on the Foundry stack"
      action={<Pill tone="ok">Live</Pill>}
    >
      <div className="relative overflow-hidden rounded-xl border border-line bg-[#0d0d0d]">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-display text-[15px] text-white">{EXAMPLE_BRAND}</span>
          <span className="text-[11px] text-faint">Catalogue · COA library · Account</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 p-4">
          {["NR-0142", "NR-0177", "NR-0203"].map((sku) => (
            <div key={sku} className="rounded-lg border border-line bg-white/[0.02] p-3">
              <div className="mx-auto h-12 w-6 rounded-[5px] border border-white/15 bg-gradient-to-b from-white/10 to-transparent" />
              <p className="mt-3 font-mono text-[10.5px] text-white/70">{sku}</p>
              <p className="mt-1 text-[10px] text-faint">Sign in for pricing</p>
            </div>
          ))}
        </div>

        {!entered && (
          <div className="fade-in absolute inset-0 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm">
            <div className="max-w-[280px] text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold/80">Research use only</p>
              <p className="mt-2 text-[13px] leading-5 text-white/80">
                Confirm these materials are for laboratory research, not human or veterinary use.
              </p>
              <button type="button" className="btn-gold mt-4 rounded-full px-5 py-2 text-[12.5px]" onClick={() => setEntered(true)}>
                Confirm and enter
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-line p-4">
        <label htmlFor={lotId} className="text-[11px] uppercase tracking-[0.18em] text-faint">
          COA library · search a lot
        </label>
        <input
          id={lotId}
          value={lot}
          onChange={(e) => setLot(e.target.value)}
          className="mt-2 w-full rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-gold"
        />
        <p className="mt-2.5 text-[12.5px]" aria-live="polite">
          {hit ? (
            <span className="text-ok">{key} · {hit}</span>
          ) : (
            <span className="text-faint">No published report for that lot number.</span>
          )}
        </p>
      </div>
    </DemoFrame>
  );
}
