import Image from "next/image";

const PRODUCTS = [
  { name: "Renewal Serum", note: "Bakuchiol + niacinamide", price: "$68", src: "/solenne/serum.webp" },
  { name: "Barrier Cream", note: "Squalane + ceramides", price: "$54", src: "/solenne/cream.webp" },
  { name: "Gentle Cleanser", note: "Oat + aloe", price: "$38", src: "/solenne/cleanser.webp" },
];

/**
 * Solenne: an invented skincare brand, built the way we build client sites,
 * to show the standard. Rendered as real HTML, not a screenshot.
 */
export function SolenneSite({ view = "desktop" }: { view?: "desktop" | "phone" }) {
  const phone = view === "phone";
  return (
    <div className="bg-[#f6f1ea] text-[#2a241e]" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="flex items-center justify-between border-b border-[#2a241e]/10 px-4 py-2.5">
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#2a241e]/60">{phone ? "Menu" : "Shop · Rituals · About"}</span>
        <span className="font-serif text-[17px] tracking-[0.28em]">SOLENNE</span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#2a241e]/60">Bag (2)</span>
      </div>
      <div className={`relative ${phone ? "aspect-[4/5]" : "aspect-[16/7]"}`}>
        <Image src="/solenne/hero.webp" alt="" fill sizes="600px" className={`object-cover ${phone ? "object-[70%_50%]" : ""}`} />
        <div className={`absolute inset-0 flex flex-col justify-center ${phone ? "items-start justify-end bg-gradient-to-t from-[#2a241e]/55 to-transparent p-4" : "w-1/2 px-6"}`}>
          <p className={`font-serif leading-[0.95] ${phone ? "text-[30px] text-white" : "text-[32px]"}`}>
            Skin, quietly
            <br />
            restored.
          </p>
          <p className={`mt-2 max-w-[200px] text-[9.5px] leading-snug ${phone ? "text-white/85" : "text-[#2a241e]/70"}`}>Botanical formulas for calm, strong skin. Made in small batches.</p>
          <span className={`mt-3 inline-flex rounded-full px-3.5 py-1.5 text-[9px] uppercase tracking-[0.16em] ${phone ? "bg-white text-[#2a241e]" : "bg-[#2a241e] text-[#f6f1ea]"}`}>Shop the ritual</span>
        </div>
      </div>
      <div className="px-4 pb-4 pt-4">
        <div className="flex items-baseline justify-between">
          <p className="font-serif text-[18px]">The essentials</p>
          <p className="text-[8.5px] uppercase tracking-[0.16em] text-[#2a241e]/60">View all</p>
        </div>
        <div className={`mt-2.5 grid gap-2.5 ${phone ? "grid-cols-2" : "grid-cols-3"}`}>
          {PRODUCTS.slice(0, phone ? 2 : 3).map((p) => (
            <div key={p.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#ece4d8]">
                <Image src={p.src} alt="" fill sizes="200px" className="object-cover" />
              </div>
              <div className="mt-1.5 flex items-baseline justify-between gap-2">
                <p className="font-serif text-[13px] leading-tight">{p.name}</p>
                <p className="text-[10px]">{p.price}</p>
              </div>
              <p className="text-[8.5px] text-[#2a241e]/55">{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
