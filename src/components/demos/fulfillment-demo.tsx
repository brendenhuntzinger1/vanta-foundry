"use client";

import { useEffect, useState } from "react";
import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

const STEPS = [
  { label: "Order received", detail: "From your storefront · #NR-1042" },
  { label: "Picked", detail: "Lot FD-2610-B recorded against the order" },
  { label: "Packed", detail: `Packing slip: ${EXAMPLE_BRAND}` },
  { label: "Shipped", detail: `Tracking sent as ${EXAMPLE_BRAND}` },
  { label: "Delivered", detail: "Confirmation in the same thread" },
];

export function FulfillmentDemo() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(() => setStep(STEPS.length - 1), 0);
      return () => clearTimeout(t);
    }
    const t = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          clearInterval(t);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => clearInterval(t);
  }, [run]);

  const done = step === STEPS.length - 1;

  return (
    <DemoFrame
      title="Order #NR-1042"
      subtitle="Dropship · ships from Foundry stock, as your brand"
      action={done ? <Pill tone="ok">Delivered</Pill> : <Pill>In progress</Pill>}
    >
      <ol className="relative space-y-0" aria-live="polite">
        {STEPS.map((s, i) => {
          const reached = i <= step;
          return (
            <li key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[7px] top-5 h-[calc(100%-12px)] w-px transition-colors duration-300 ${
                    i < step ? "bg-gold/60" : "bg-line-strong"
                  }`}
                />
              )}
              <span
                aria-hidden="true"
                className={`relative mt-1 h-[15px] w-[15px] shrink-0 rounded-full border transition-colors duration-300 ${
                  reached ? "border-gold bg-gold/20" : "border-line-strong bg-ink"
                }`}
              />
              <div className={`transition-opacity duration-300 ${reached ? "opacity-100" : "opacity-40"}`}>
                <p className="text-sm text-white">{s.label}</p>
                <p className="mt-0.5 text-[12.5px] text-faint">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="btn-ghost rounded-full px-4 py-2 text-[12.5px]"
          onClick={() => {
            setStep(0);
            setRun((r) => r + 1);
          }}
        >
          Replay
        </button>
      </div>
    </DemoFrame>
  );
}
