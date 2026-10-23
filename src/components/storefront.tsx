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
        {t.layout === "split" ? (
          <SplitTop s={s} />
        ) : t.layout === "immersive" ? (
          <ImmersiveTop s={s} />
        ) : (
          <>
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
          </>
        )}

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
          {t.layout === "split" ? (
            <span className="font-serif text-[24px] italic">{s.brand}</span>
          ) : t.layout === "immersive" ? (
            <span className="text-[15px] font-semibold tracking-[0.22em]">{s.brand.toUpperCase()}</span>
          ) : (
            <span className={`text-[18px] ${t.type === "serif" ? "font-serif tracking-[0.3em]" : "font-black italic tracking-[0.06em]"}`}>{s.brand.toUpperCase()}</span>
          )}
          <span className="flex flex-wrap items-center gap-2">
            <span className={label} style={soft}>Join the list</span>
            <span className="h-9 w-44 rounded-full border px-4 text-[12px] leading-9" style={{ borderColor: `${t.ink}33`, ...soft }}>Email address</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Editorial skincare: serif logo left, centered links, text beside an arched photo. */
function SplitTop({ s }: { s: Showcase }) {
  const t = s.theme;
  const line = `1px solid ${t.ink}1a`;
  return (
    <>
      <div className="px-5 py-2 text-center text-[11px] tracking-[0.08em]" style={{ background: t.ink, color: t.bg }}>
        Complimentary samples with every ritual
      </div>
      <div className="grid grid-cols-[1fr_auto] items-center px-5 py-5 sm:grid-cols-[1fr_auto_1fr] sm:px-10" style={{ borderBottom: line }}>
        <span className="font-serif text-[28px] italic leading-none">Solenne</span>
        <span className="hidden gap-8 text-[13px] sm:flex" style={{ opacity: 0.75 }}>
          {s.nav.map((n) => <span key={n}>{n}</span>)}
        </span>
        <span className="justify-self-end text-[13px]" style={{ opacity: 0.75 }}>Search&nbsp;&nbsp;·&nbsp;&nbsp;Bag (0)</span>
      </div>
      <div className="grid items-center gap-8 px-5 py-10 sm:grid-cols-[1.3fr_1fr] sm:gap-14 sm:px-10 sm:py-10">
        <div className="order-2 sm:order-1">
          <p className="text-[12px] tracking-[0.08em]" style={{ opacity: 0.6 }}>{s.hero.eyebrow}</p>
          <p className="mt-4 font-serif text-[46px] font-normal leading-[0.98] tracking-[-0.01em] sm:text-[72px]">
            Skin, <em>quietly</em>
            <br />
            restored.
          </p>
          <p className="mt-5 max-w-[360px] text-[15.5px] leading-[1.6]" style={{ opacity: 0.72 }}>{s.hero.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="inline-flex px-7 py-3.5 text-[13px] tracking-[0.04em]" style={{ background: t.accent, color: t.accentInk }}>{s.hero.cta}</span>
            <span className="text-[13px] underline underline-offset-4" style={{ opacity: 0.8 }}>Find your routine</span>
          </div>
          <div className="mt-10 flex gap-6 text-[12px]" style={{ opacity: 0.6, borderTop: line, paddingTop: 16 }}>
            <span>Bakuchiol</span>
            <span>Niacinamide</span>
            <span>Squalane</span>
            <span>Ceramides</span>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-t-[999px] sm:order-2 sm:aspect-square">
          <Image src={s.hero.src} alt={`${s.brand} storefront hero`} fill sizes="(min-width: 1160px) 520px, 100vw" className="object-cover object-[60%_50%]" />
        </div>
      </div>
    </>
  );
}

/** Roaster: full-bleed photo under a transparent nav, this week's roasts along the bottom. */
function ImmersiveTop({ s }: { s: Showcase }) {
  const t = s.theme;
  return (
    <div className="relative aspect-[4/5] text-white sm:aspect-[16/8]">
      <Image src={s.hero.src} alt={`${s.brand} storefront hero`} fill sizes="(min-width: 1160px) 1120px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-10">
        <span className="text-[17px] font-semibold tracking-[0.22em]">HALCYON</span>
        <span className="hidden gap-7 text-[13px] text-white/80 sm:flex">
          {s.nav.map((n) => <span key={n}>{n}</span>)}
        </span>
        <span className="rounded-full border border-white/35 px-3.5 py-1.5 font-mono text-[11px]">Cart 0</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10 sm:pb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: t.accent }}>{s.hero.eyebrow}</p>
        <p className="mt-3 max-w-[640px] text-[40px] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[64px]">
          {s.hero.title[0]}
          <br />
          <span className="text-white/60">{s.hero.title[1]}</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex rounded-full px-6 py-3 text-[13px] font-medium" style={{ background: t.accent, color: t.accentInk }}>{s.hero.cta}</span>
          <span className="text-[13px] text-white/80">Subscribe and save</span>
        </div>
        <div className="mt-8 hidden grid-cols-3 border-t border-white/20 pt-4 sm:grid">
          {s.products.map((p) => (
            <div key={p.name} className="flex items-baseline justify-between pr-8">
              <span className="text-[14px] font-medium">{p.name}</span>
              <span className="font-mono text-[11px] text-white/60">{p.note.split(" · ")[1] ?? ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
