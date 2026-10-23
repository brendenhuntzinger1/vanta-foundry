"use client";

import { useEffect, useState } from "react";
import { EXAMPLE_BRAND, Pill, Screen } from "./frame";

const STEPS = [
  { label: "Order received", note: "From your store, automatically" },
  { label: "Picked and packed", note: `Packing slip says ${EXAMPLE_BRAND}` },
  { label: "Shipped", note: `Tracking email sent as ${EXAMPLE_BRAND}` },
  { label: "Delivered", note: "Your customer never sees our name" },
];

export function FulfillmentDemo() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setStep(STEPS.length - 1), 0);
      return () => clearTimeout(t);
    }
    const t = setInterval(() => setStep((s) => (s >= STEPS.length - 1 ? s : s + 1)), 1100);
    return () => clearInterval(t);
  }, [run]);

  const done = step === STEPS.length - 1;
  return (
    <Screen image={{ src: "/supply/unboxing.webp", alt: "A premium branded mailer opened to show vials in a foam insert" }} title="Order #1042" subtitle={`${EXAMPLE_BRAND} · shipped by us`} status={done ? <Pill tone="ok">Delivered</Pill> : <Pill>On its way</Pill>}>
      <ol aria-live="polite">
        {STEPS.map((s, i) => (
          <li key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className={`absolute left-[6px] top-5 h-[calc(100%-14px)] w-px ${i < step ? "bg-ink" : "bg-line-2"}`} />
            )}
            <span aria-hidden="true" className={`relative mt-1 h-[13px] w-[13px] shrink-0 rounded-full transition-colors duration-300 ${i <= step ? "bg-ink" : "border border-line-2 bg-white"}`} />
            <div className={`transition-opacity duration-300 ${i <= step ? "opacity-100" : "opacity-45"}`}>
              <p className="text-[14px] text-ink">{s.label}</p>
              <p className="text-[12.5px] text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex justify-end">
        <button type="button" className="btn btn-light h-9 px-4 text-[13px]" onClick={() => { setStep(0); setRun((r) => r + 1); }}>
          Replay
        </button>
      </div>
    </Screen>
  );
}
