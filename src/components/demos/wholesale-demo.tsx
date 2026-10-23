import { EXAMPLE_BRAND, Pill, Screen } from "./frame";

const LINES = [
  { item: "Catalog item A · 10mg", qty: 200, lot: "VL-2610-B" },
  { item: "Catalog item B · 5mg", qty: 120, lot: "VL-2609-A" },
  { item: "Catalog item C · 10mL", qty: 60, lot: "VL-2610-C" },
];

/** A wholesale order request: items, quantities, lots. No prices: they are confirmed per order. */
export function WholesaleDemo() {
  return (
    <Screen image={{ src: "/supply/bulk.webp", alt: "Cartons of vials for a bulk order" }} title="Wholesale order #W-3318" subtitle={`${EXAMPLE_BRAND} · sent on WhatsApp`} status={<Pill tone="ok">Confirmed</Pill>}>
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line bg-bg-2 px-4 py-2.5 text-[12px] font-medium text-muted">
          <span>Item</span>
          <span className="text-right">Units</span>
          <span className="text-right">Lot</span>
        </div>
        {LINES.map((l) => (
          <div key={l.item} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-4 py-3 last:border-b-0">
            <span className="truncate text-[13.5px] text-ink">{l.item}</span>
            <span className="text-right font-mono text-[13px] text-ink">{l.qty}</span>
            <span className="text-right font-mono text-[12px] text-gold">{l.lot}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[13px]">
        <span className="text-muted">Repeat every 4 weeks</span>
        <Pill tone="gold">Standing order</Pill>
      </div>
    </Screen>
  );
}
