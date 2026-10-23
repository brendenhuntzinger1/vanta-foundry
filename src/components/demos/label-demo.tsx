"use client";

import Image from "next/image";
import { useState } from "react";
import { Pill, Screen } from "./frame";
import { LABEL_LOOKS } from "@/lib/labels";

/** Pick a label look, see it on a real vial, approve the proof. */
export function LabelDemo() {
  const [i, setI] = useState(0);
  const [approved, setApproved] = useState(false);
  const l = LABEL_LOOKS[i];

  return (
    <Screen
      title={`Label proof · ${l.brand}`}
      subtitle={approved ? "Approved · sent to print" : "Waiting for approval"}
      status={approved ? <Pill tone="ok">Approved</Pill> : <Pill tone="warn">Proof</Pill>}
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_190px] sm:items-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-xl bg-bg-2">
          <Image key={l.key} src={l.src} alt={`${l.brand} vial with a ${l.look.toLowerCase()} label`} fill sizes="280px" className="fade-in object-cover" />
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-medium text-ink">Pick a look</p>
          <div role="group" aria-label="Label look" className="grid grid-cols-2 gap-1.5 sm:grid-cols-1">
            {LABEL_LOOKS.map((x, n) => (
              <button
                key={x.key}
                type="button"
                aria-pressed={i === n}
                onClick={() => {
                  setI(n);
                  setApproved(false);
                }}
                className={`h-10 rounded-lg border px-3 text-left text-[13px] transition-colors ${i === n ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"}`}
              >
                {x.look}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setApproved((v) => !v)} className={`btn h-11 w-full text-[14px] ${approved ? "btn-light" : "btn-dark"}`}>
            {approved ? "Undo" : "Approve proof"}
          </button>
          <p className="text-[12px] leading-5 text-muted">Your brand name goes on the label. Nothing prints until you approve.</p>
        </div>
      </div>
    </Screen>
  );
}
