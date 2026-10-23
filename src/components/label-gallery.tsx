import Image from "next/image";
import { CATALOG } from "@/lib/catalog";
import { LABEL_LOOKS } from "@/lib/labels";

/** Our Vanta Labs vial first, then other label directions we have designed. */
export function LabelGallery() {
  const vanta = CATALOG.find((p) => p.slug === "ghk-cu");
  const items = [
    ...(vanta ? [{ key: "vanta", brand: "Vanta Labs", note: "Our own label, in production", src: vanta.image }] : []),
    ...LABEL_LOOKS.map((l) => ({ key: l.key, brand: l.brand, note: `${l.look} · label design`, src: l.src })),
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((x) => (
        <li key={x.key} className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="relative aspect-[4/5] bg-bg-2">
            <Image src={x.src} alt={`${x.brand} vial label`} fill sizes="(min-width: 1024px) 190px, 50vw" className="object-cover" />
          </div>
          <div className="p-3.5">
            <p className="text-[14.5px] font-semibold text-ink">{x.brand}</p>
            <p className="text-[12.5px] text-muted">{x.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
