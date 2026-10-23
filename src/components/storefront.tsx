import Image from "next/image";
import type { Showcase } from "@/lib/showcase";

/**
 * A full-size storefront, rendered as real HTML in a browser frame: nav, hero,
 * products, a story band and a footer. Responsive like the real thing.
 */
export function Storefront({ s }: { s: Showcase }) {
  const t = s.theme;
  const display = t.type === "serif" ? "font-serif font-normal" : t.type === "bold" ? "font-black uppercase italic tracking-[-0.02em]" : "font-semibold tracking-[-0.03em]";
  const label = "text-[11px] uppercase tracking-[0.16em]";
  const soft = { color: t.ink, opacity: 0.62 };
  const btn = t.type === "bold" ? "rounded-none font-bold" : "rounded-full";

  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-bg-2 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        </span>
        <span className="ml-2 truncate rounded-full bg-white px-3 py-1 text-[12px] text-muted">{s.brand} · {s.industry}</span>
      </div>

      <div style={{ background: t.bg, color: t.ink }}>
        {/* Nav */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-8" style={{ borderBottom: `1px solid ${t.ink}1a` }}>
          <span className={`hidden gap-6 sm:flex ${label}`} style={soft}>
            {s.nav.map((n) => <span key={n}>{n}</span>)}
          </span>
          <span className={`text-[22px] ${t.type === "serif" ? "font-serif tracking-[0.3em]" : "font-black italic tracking-[0.06em]"}`}>{s.brand.toUpperCase()}</span>
          <span className={label} style={soft}>Cart (0)</span>
        </div>

        {/* Hero */}
        <div className="relative aspect-[4/5] sm:aspect-[16/7]">
          <Image src={s.hero.src} alt={`${s.brand} storefront hero`} fill sizes="(min-width: 1160px) 1120px, 100vw" className="object-cover" />
          {(t.dark || t.type === "bold") && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent sm:hidden" aria-hidden="true" />}
          <div className={`absolute inset-0 flex flex-col justify-end p-6 sm:w-1/2 sm:justify-center sm:p-12 ${t.dark || t.type === "bold" ? "text-white" : ""}`} style={t.dark || t.type === "bold" ? undefined : { color: t.ink }}>
            <p className={label} style={{ opacity: 0.75 }}>{s.hero.eyebrow}</p>
            <p className={`mt-3 text-[40px] leading-[0.95] sm:text-[58px] ${display}`}>
              {s.hero.title[0]}
              <br />
              {s.hero.title[1]}
            </p>
            <p className="mt-4 max-w-[340px] text-[15px] leading-[1.55]" style={{ opacity: 0.8 }}>{s.hero.body}</p>
            <span className={`mt-6 inline-flex w-fit px-6 py-3 text-[12px] uppercase tracking-[0.14em] ${btn}`} style={{ background: t.accent, color: t.accentInk }}>
              {s.hero.cta}
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex items-baseline justify-between">
            <p className={`text-[26px] sm:text-[32px] ${display}`}>{t.type === "bold" ? "Best sellers" : "The essentials"}</p>
            <p className={label} style={soft}>View all</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {s.products.map((p, i) => (
              <div key={p.name} className={i === 2 ? "hidden sm:block" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: `${t.ink}0d`, borderRadius: t.type === "bold" ? 0 : 6 }}>
                  <Image src={p.src} alt={p.name} fill sizes="(min-width: 640px) 360px, 50vw" className="object-cover" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className={`text-[16px] leading-tight sm:text-[18px] ${t.type === "serif" ? "font-serif" : "font-semibold"}`}>{p.name}</p>
                  <p className="text-[14px]">{p.price}</p>
                </div>
                <p className="mt-0.5 text-[13px]" style={soft}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story band */}
        <div className="grid sm:grid-cols-2" style={{ borderTop: `1px solid ${t.ink}1a` }}>
          <div className="relative aspect-[16/10] sm:aspect-auto">
            <Image src={s.story.src} alt="" fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-16">
            <p className={`text-[30px] leading-[1.05] sm:text-[38px] ${display}`}>{s.story.title}</p>
            <p className="mt-4 max-w-[380px] text-[15px] leading-[1.6]" style={soft}>{s.story.body}</p>
            <span className={`mt-6 inline-flex w-fit border px-6 py-3 text-[12px] uppercase tracking-[0.14em] ${btn}`} style={{ borderColor: t.ink }}>
              Learn more
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ borderTop: `1px solid ${t.ink}1a` }}>
          <span className={`text-[18px] ${t.type === "serif" ? "font-serif tracking-[0.3em]" : "font-black italic tracking-[0.06em]"}`}>{s.brand.toUpperCase()}</span>
          <span className="flex flex-wrap items-center gap-2">
            <span className={label} style={soft}>Join the list</span>
            <span className="h-9 w-44 rounded-full border px-4 text-[12px] leading-9" style={{ borderColor: `${t.ink}33`, ...soft }}>Email address</span>
          </span>
        </div>
      </div>
    </div>
  );
}
