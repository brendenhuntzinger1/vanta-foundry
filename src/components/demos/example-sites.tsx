import Image from "next/image";
import { SolenneSite } from "./solenne-site";

/**
 * Halcyon (coffee) and Atlas (apparel): brands our team designed and built as
 * real HTML. Together with Solenne they show that we build for
 * any industry, not only research supply.
 */
export function HalcyonSite() {
  return (
    <div className="bg-[#14201b] text-[#efe9dd]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/55">Shop · Subscribe · Visit</span>
        <span className="font-serif text-[17px] tracking-[0.3em]">HALCYON</span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/55">Cart (1)</span>
      </div>
      <div className="relative aspect-[16/7]">
        <Image src="/sites/halcyon-hero.webp" alt="" fill sizes="600px" className="object-cover" />
        <div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-center px-6">
          <p className="font-serif text-[32px] leading-[0.95]">
            Coffee worth
            <br />
            waking up for.
          </p>
          <p className="mt-2 max-w-[200px] text-[9.5px] leading-snug text-white/70">Small-lot beans, roasted every Monday and shipped the same week.</p>
          <span className="mt-3 inline-flex w-fit rounded-full bg-[#efe9dd] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#14201b]">Shop coffee</span>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.4fr] gap-4 px-4 py-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#efe9dd]">
          <Image src="/sites/halcyon-bag.webp" alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[8.5px] uppercase tracking-[0.16em] text-white/55">Roast of the month</p>
          <p className="mt-1 font-serif text-[20px] leading-tight">Ethiopia Guji</p>
          <p className="mt-1 text-[9.5px] leading-snug text-white/70">Peach, jasmine, black tea. Light roast.</p>
          <div className="mt-3 flex gap-1.5 text-[8.5px]">
            <span className="rounded-full border border-white/25 px-2.5 py-1">Whole bean</span>
            <span className="rounded-full border border-white/25 px-2.5 py-1">Ground</span>
          </div>
          <span className="mt-3 inline-flex w-fit rounded-full bg-[#c9a66b] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#14201b]">Subscribe &amp; save</span>
        </div>
      </div>
    </div>
  );
}

export function AtlasSite() {
  return (
    <div className="bg-[#f2f3f5] text-[#0f1114]">
      <div className="flex items-center justify-between bg-[#0f1114] px-4 py-2.5 text-white">
        <span className="text-[13px] font-black italic tracking-[0.08em]">ATLAS</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">Men · Women · Run · Train</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70">Bag</span>
      </div>
      <div className="relative aspect-[16/7]">
        <Image src="/sites/atlas-hero.webp" alt="" fill sizes="600px" className="object-cover" />
        <div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-center px-6 text-white">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">New season</p>
          <p className="mt-1 text-[30px] font-black uppercase italic leading-[0.9] tracking-[-0.02em]">
            Built for
            <br />
            the early miles.
          </p>
          <span className="mt-3 inline-flex w-fit bg-white px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0f1114]">Shop run</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 px-4 py-4">
        {[
          { t: "Run", c: "bg-[#0f1114] text-white" },
          { t: "Train", c: "bg-[#d7dbe0]" },
          { t: "Recover", c: "bg-[#c8ff3d]" },
        ].map((x) => (
          <div key={x.t} className={`flex aspect-[4/3] items-end rounded-sm p-2.5 ${x.c}`}>
            <span className="text-[12px] font-black uppercase italic">{x.t} →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SITES = [
  { key: "vanta", name: "Vanta Labs", industry: "Research supply · live store", url: "vantalabsresearch.com", real: true },
  { key: "solenne", name: "Solenne", industry: "Skincare", url: "Solenne · Skincare", real: false },
  { key: "halcyon", name: "Halcyon", industry: "Specialty coffee", url: "Halcyon · Coffee", real: false },
  { key: "atlas", name: "Atlas", industry: "Athletic apparel", url: "Atlas · Apparel", real: false },
] as const;

export type SiteKey = (typeof SITES)[number]["key"];

export function SiteView({ which }: { which: SiteKey }) {
  if (which === "vanta")
    return <Image src="/showcase/vanta-labs-desktop.webp" alt="The live Vanta Labs store" width={2160} height={1147} sizes="(min-width: 1024px) 560px, 92vw" className="h-auto w-full" />;
  if (which === "solenne") return <SolenneSite />;
  if (which === "halcyon") return <HalcyonSite />;
  return <AtlasSite />;
}
