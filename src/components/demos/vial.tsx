/**
 * A drawn vial with a label, in one of four label styles. Used to show what a
 * white-label run can look like; every style carries the lot and the
 * research-use statement.
 */
export type LabelStyle = "minimal" | "noir" | "clinical" | "bold";

export const LABEL_STYLES: { key: LabelStyle; name: string }[] = [
  { key: "minimal", name: "Minimal" },
  { key: "noir", name: "Noir" },
  { key: "clinical", name: "Clinical" },
  { key: "bold", name: "Bold" },
];

const THEMES: Record<LabelStyle, { label: string; brand: string; product: string; meta: string; rule: string; band?: string }> = {
  minimal: { label: "#fbfaf6", brand: "#0c0c0d", product: "#0c0c0d", meta: "#4a4a50", rule: "#d9d9d4" },
  noir: { label: "#111113", brand: "#c7ae5e", product: "#ffffff", meta: "#b9b9bf", rule: "#c7ae5e" },
  clinical: { label: "#ffffff", brand: "#ffffff", product: "#1f4fa3", meta: "#3b4b66", rule: "#c9d6ee", band: "#1f4fa3" },
  bold: { label: "#1d3b2f", brand: "#e9dfc6", product: "#ffffff", meta: "#cfe0d6", rule: "#5f8a75" },
};

export function Vial({
  brand,
  product = "GHK-Cu",
  size = "50 mg",
  lot = "Lot VL-2610-B",
  style,
  width = 150,
}: {
  brand: string;
  product?: string;
  size?: string;
  lot?: string;
  style: LabelStyle;
  width?: number;
}) {
  const t = THEMES[style];
  const scale = width / 150;
  return (
    <div style={{ width, height: 250 * scale }} className="relative mx-auto" aria-label={`${brand} ${product} vial, ${style} label`} role="img">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 150, height: 250 }} className="absolute left-0 top-0">
        {/* cap */}
        <div className="absolute left-[27px] top-0 h-[32px] w-[96px] rounded-[6px]" style={{ background: "linear-gradient(90deg,#9ea2a8,#e6e8eb 35%,#b9bdc3 70%,#8d9197)" }} />
        <div className="absolute left-[33px] top-[29px] h-[14px] w-[84px] rounded-b-[3px]" style={{ background: "linear-gradient(90deg,#8f949a,#d8dbdf 40%,#a7abb1)" }} />
        {/* glass */}
        <div
          className="absolute left-[20px] top-[42px] h-[202px] w-[110px] rounded-[14px] rounded-t-[26px]"
          style={{ background: "linear-gradient(90deg,rgba(210,214,220,.55),rgba(255,255,255,.9) 30%,rgba(235,238,242,.7) 70%,rgba(200,205,212,.55))", boxShadow: "inset 0 0 0 1px rgba(150,155,165,.35)" }}
        />
        {/* label */}
        <div
          className="absolute left-[20px] top-[94px] flex h-[120px] w-[110px] flex-col overflow-hidden px-[9px] pb-[7px]"
          style={{ background: t.label, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }}
        >
          <div className="-mx-[9px] mb-[6px] px-[9px] pt-[7px] pb-[4px]" style={{ background: t.band ?? "transparent" }}>
            <p className="truncate text-[7.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: t.brand }}>
              {brand || "Your Brand"}
            </p>
          </div>
          <p className="truncate text-[17px] font-bold leading-[1.05] tracking-[-0.02em]" style={{ color: t.product }}>
            {product}
          </p>
          <p className="text-[10px] leading-tight" style={{ color: t.meta }}>
            {size} · Lyophilized
          </p>
          <div className="my-[5px] h-px" style={{ background: t.rule }} />
          <p className="text-[7px] leading-[1.35]" style={{ color: t.meta }}>
            {lot}
            <br />
            Store at 2–8°C
          </p>
          <p className="mt-auto text-[6.5px] font-semibold uppercase leading-[1.3] tracking-[0.04em]" style={{ color: t.meta }}>
            For research use only. Not for human use.
          </p>
        </div>
        {/* shadow */}
        <div className="absolute bottom-0 left-[28px] h-[8px] w-[94px] rounded-[50%] bg-black/15 blur-[3px]" />
      </div>
    </div>
  );
}
