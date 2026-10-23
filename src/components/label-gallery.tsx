import Image from "next/image";
import { CATALOG } from "@/lib/catalog";
import { Vial } from "./demos/vial";

/**
 * Label styles, side by side: the real Vanta Labs vial first, then three
 * example brands in other styles. The example brands are invented and
 * labelled as examples.
 */
export function LabelGallery() {
  const vanta = CATALOG.find((p) => p.slug === "ghk-cu");
  const examples = [
    { brand: "Halden Labs", product: "BPC-157", size: "10 mg", style: "noir" as const },
    { brand: "Meridian Supply", product: "NAD+", size: "500 mg", style: "clinical" as const },
    { brand: "Fernwood Research", product: "Semax", size: "10 mg", style: "bold" as const },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {vanta && (
        <li className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="relative aspect-[4/5] bg-bg-2">
            <Image src={vanta.image} alt="Vanta Labs vial with its own label" fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover" />
          </div>
          <div className="p-4">
            <p className="text-[15px] font-semibold text-ink">Vanta Labs</p>
            <p className="text-[13px] text-muted">Our own label, in production</p>
          </div>
        </li>
      )}
      {examples.map((e) => (
        <li key={e.brand} className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex aspect-[4/5] items-center justify-center bg-bg-2">
            <Vial brand={e.brand} product={e.product} size={e.size} style={e.style} width={140} />
          </div>
          <div className="p-4">
            <p className="text-[15px] font-semibold text-ink">{e.brand}</p>
            <p className="text-[13px] capitalize text-muted">{e.style} style · example brand</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
