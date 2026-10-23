"use client";

import { useState } from "react";
import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

type Phase = "healthy" | "closed" | "switched";

/**
 * Primary closes, checkout switches to the backup. The point of the demo is
 * the shape of the recovery: one setting, not a rebuild. No processor is named
 * and no rate or approval figure is shown.
 */
export function PaymentsDemo() {
  const [phase, setPhase] = useState<Phase>("healthy");

  const primary =
    phase === "healthy"
      ? { tone: "ok" as const, status: "Active", share: 100 }
      : { tone: "warn" as const, status: phase === "closed" ? "Account closed" : "Closed", share: 0 };
  const backup =
    phase === "switched"
      ? { tone: "ok" as const, status: "Active", share: 100 }
      : { tone: "neutral" as const, status: "Standby · ready", share: 0 };

  return (
    <DemoFrame
      title="Checkout routing"
      subtitle={`${EXAMPLE_BRAND} · two processors behind one checkout`}
      action={
        phase === "closed" ? <Pill tone="warn">Action needed</Pill> : <Pill tone="ok">Taking payments</Pill>
      }
    >
      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line">
        <Rail name="Primary processor" {...primary} />
        <Rail name="Backup processor" {...backup} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12.5px] text-faint" aria-live="polite">
          {phase === "healthy" && "New charges go to the primary."}
          {phase === "closed" && "The primary stopped. The backup is already integrated."}
          {phase === "switched" && "Switched in one setting. Checkout never changed."}
        </p>
        {phase === "healthy" && (
          <button type="button" className="btn-ghost rounded-full px-4 py-2 text-[12.5px]" onClick={() => setPhase("closed")}>
            Simulate a closure
          </button>
        )}
        {phase === "closed" && (
          <button type="button" className="btn-gold rounded-full px-4 py-2 text-[12.5px]" onClick={() => setPhase("switched")}>
            Switch to backup
          </button>
        )}
        {phase === "switched" && (
          <button type="button" className="btn-ghost rounded-full px-4 py-2 text-[12.5px]" onClick={() => setPhase("healthy")}>
            Reset
          </button>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-line bg-white/[0.015] p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Recovery text · declined checkout</p>
        <div className="mt-3 max-w-[300px] rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3 text-[13px] leading-5 text-white/85">
          Hi, it&rsquo;s {EXAMPLE_BRAND}. Your checkout didn&rsquo;t go through earlier. Want a hand finishing it? Reply STOP to opt out.
        </div>
        <p className="mt-3 text-[11.5px] text-faint">Sent only with consent, never in quiet hours. STOP works immediately.</p>
      </div>
    </DemoFrame>
  );
}

function Rail({
  name,
  status,
  tone,
  share,
}: {
  name: string;
  status: string;
  tone: "ok" | "warn" | "neutral";
  share: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[1.2fr_1fr_auto]">
      <p className="text-[13px] text-white">{name}</p>
      <div className="hidden items-center gap-3 sm:flex">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${share}%` }} />
        </div>
        <span className="w-10 text-right font-mono text-[11px] text-faint">{share}%</span>
      </div>
      <Pill tone={tone}>{status}</Pill>
    </div>
  );
}
