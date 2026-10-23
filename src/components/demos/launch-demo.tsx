import { DemoFrame, EXAMPLE_BRAND, Pill } from "./frame";

const PLAN = [
  { name: "Catalogue plan", state: "done" },
  { name: "Brand and label", state: "done" },
  { name: "Storefront", state: "active" },
  { name: "Payments", state: "active" },
  { name: "Fulfillment", state: "next" },
  { name: "Copy review", state: "next" },
  { name: "Open", state: "next" },
] as const;

export function LaunchDemo() {
  return (
    <DemoFrame title="Launch plan" subtitle={`${EXAMPLE_BRAND} · one team, in sequence`} action={<Pill tone="gold">In build</Pill>}>
      <ol className="space-y-2.5">
        {PLAN.map((p, i) => (
          <li
            key={p.name}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
              p.state === "active" ? "border-gold/30 bg-gold/[0.05]" : "border-line"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className={`text-[13.5px] ${p.state === "next" ? "text-white/50" : "text-white"}`}>{p.name}</span>
            </span>
            {p.state === "done" && <Pill tone="ok">Done</Pill>}
            {p.state === "active" && <Pill tone="gold">In progress</Pill>}
            {p.state === "next" && <span className="text-[11.5px] text-faint">Queued</span>}
          </li>
        ))}
      </ol>
    </DemoFrame>
  );
}
