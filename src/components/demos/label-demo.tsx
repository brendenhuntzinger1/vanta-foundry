"use client";

import { useId, useState } from "react";
import { Pill, Screen } from "./frame";
import { LABEL_STYLES, Vial, type LabelStyle } from "./vial";

/** A label proof the visitor can put their own brand on, in four label styles. */
export function LabelDemo() {
  const inputId = useId();
  const [brand, setBrand] = useState("Your Brand");
  const [style, setStyle] = useState<LabelStyle>("noir");
  const [approved, setApproved] = useState(false);

  return (
    <Screen
      title="Label proof"
      subtitle={approved ? "Approved · sent to print" : "Waiting for your approval"}
      status={approved ? <Pill tone="ok">Approved</Pill> : <Pill tone="warn">Proof</Pill>}
    >
      <div className="grid gap-6 sm:grid-cols-[1fr_200px] sm:items-center">
        <div className="rounded-xl bg-bg-2 py-5">
          <Vial brand={brand.trim() || "Your Brand"} style={style} width={150} />
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor={inputId} className="block text-[13px] font-medium text-ink">
              Type your brand name
            </label>
            <input
              id={inputId}
              value={brand}
              maxLength={22}
              onChange={(e) => {
                setBrand(e.target.value);
                setApproved(false);
              }}
              className="mt-1.5 h-11 w-full rounded-lg border border-line-2 bg-white px-3 text-[15px] text-ink outline-none focus:border-ink"
            />
          </div>
          <div>
            <p className="text-[13px] font-medium text-ink">Pick a label style</p>
            <div role="group" aria-label="Label style" className="mt-1.5 grid grid-cols-2 gap-1.5">
              {LABEL_STYLES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={style === s.key}
                  onClick={() => {
                    setStyle(s.key);
                    setApproved(false);
                  }}
                  className={`h-9 rounded-lg border text-[13px] transition-colors ${style === s.key ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"}`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => setApproved((v) => !v)} className={`btn h-11 w-full text-[14px] ${approved ? "btn-light" : "btn-dark"}`}>
            {approved ? "Undo" : "Approve proof"}
          </button>
        </div>
      </div>
    </Screen>
  );
}
