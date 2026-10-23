"use client";

import { useState } from "react";
import { EXAMPLE_BRAND, Pill, Screen } from "./frame";
import { CardBrands } from "../card-brands";

type Phase = "healthy" | "closed" | "switched";

/** One processor stops; the backup takes over with one setting. */
export function PaymentsDemo() {
  const [phase, setPhase] = useState<Phase>("healthy");
  const primary = phase === "healthy" ? { tone: "ok" as const, label: "Active", share: 100 } : { tone: "warn" as const, label: "Closed", share: 0 };
  const backup = phase === "switched" ? { tone: "ok" as const, label: "Active", share: 100 } : { tone: "neutral" as const, label: "Standby", share: 0 };

  return (
    <Screen
      title="Payments"
      subtitle={`${EXAMPLE_BRAND} · checkout`}
      status={phase === "closed" ? <Pill tone="warn">Action needed</Pill> : <Pill tone="ok">Taking payments</Pill>}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[12.5px] font-medium text-muted">Accepts</p>
        <CardBrands size="sm" />
      </div>
      <div className="divide-y divide-line rounded-xl border border-line">
        <Row name="Main processor" {...primary} />
        <Row name="Backup processor" {...backup} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-muted" aria-live="polite">
          {phase === "healthy" && "Payments go through the main processor."}
          {phase === "closed" && "The main processor stopped. The backup is ready."}
          {phase === "switched" && "Switched. The checkout didn't change."}
        </p>
        {phase === "healthy" && (
          <button type="button" className="btn btn-light h-9 px-4 text-[13px]" onClick={() => setPhase("closed")}>
            What if it closes?
          </button>
        )}
        {phase === "closed" && (
          <button type="button" className="btn btn-dark h-9 px-4 text-[13px]" onClick={() => setPhase("switched")}>
            Switch to backup
          </button>
        )}
        {phase === "switched" && (
          <button type="button" className="btn btn-light h-9 px-4 text-[13px]" onClick={() => setPhase("healthy")}>
            Reset
          </button>
        )}
      </div>
      <div className="mt-5 rounded-xl bg-bg-2 p-4">
        <p className="text-[12px] font-medium text-muted">Text sent after a declined card</p>
        <p className="mt-2.5 max-w-[310px] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[13.5px] leading-5 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          Hi, it&rsquo;s {EXAMPLE_BRAND}. Your payment didn&rsquo;t go through. Want a hand finishing your order? Reply STOP to opt out.
        </p>
      </div>
    </Screen>
  );
}

function Row({ name, label, tone, share }: { name: string; label: string; tone: "ok" | "warn" | "neutral"; share: number }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[1.1fr_1fr_auto]">
      <p className="text-[14px] text-ink">{name}</p>
      <div className="hidden items-center gap-3 sm:flex">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-2">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${share}%` }} />
        </div>
        <span className="w-9 text-right font-mono text-[11.5px] text-muted">{share}%</span>
      </div>
      <Pill tone={tone}>{label}</Pill>
    </div>
  );
}
