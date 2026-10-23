import { EXAMPLE_BRAND, Pill, Screen } from "./frame";

const STEPS = [
  { label: "Quote approved", note: "Quantities, price and lead time agreed", state: "done" },
  { label: "In production", note: "Made to order at the factory", state: "active" },
  { label: "Lot documented", note: "Lot numbers recorded; certificate of analysis included with wholesale", state: "next" },
  { label: "Shipped to you", note: "Or to our warehouse for 3PL", state: "next" },
] as const;

export function FactoryDemo() {
  return (
    <Screen image={{ src: "/supply/factory-coa.webp", alt: "Vial filling line with a certificate of analysis" }} title="Factory order #F-0412" subtitle={`${EXAMPLE_BRAND} · made to order`} status={<Pill tone="gold">In production</Pill>}>
      <ol className="space-y-3">
        {STEPS.map((s) => (
          <li key={s.label} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${s.state === "active" ? "border-gold-fill/50 bg-gold-tint" : "border-line"}`}>
            <span
              aria-hidden="true"
              className={`mt-1 h-3 w-3 shrink-0 rounded-full ${s.state === "done" ? "bg-ink" : s.state === "active" ? "bg-gold-fill" : "border border-line-2 bg-white"}`}
            />
            <div>
              <p className={`text-[14px] ${s.state === "next" ? "text-muted" : "text-ink"}`}>{s.label}</p>
              <p className="text-[12.5px] text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </Screen>
  );
}
