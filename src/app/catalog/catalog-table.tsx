"use client";

import { useId, useMemo, useState } from "react";
import { CATALOG, PRICE_TIERS, hasAnyWholesalePrice, money, tierPrice, type CatalogProduct, type CatalogSize } from "@/lib/catalog";
import { emailLink, whatsappLink } from "@/lib/site";
import { IconMail, IconMinus, IconPlus, IconWhatsApp } from "@/components/icons";

const key = (p: CatalogProduct, s: CatalogSize) => `${p.slug}:${s.size}`;

/**
 * Step 1: confirm research use. Step 2: enter quantities. Step 3: send the
 * list. Prices shown are what is configured in lib/catalog.ts; anything not
 * configured says "Ask us" rather than guessing.
 */
export function CatalogTable() {
  const searchId = useId();
  const [confirmed, setConfirmed] = useState(false);
  const [query, setQuery] = useState("");
  const [qty, setQty] = useState<Record<string, number>>({});
  const priced = hasAnyWholesalePrice();
  const tiers = priced ? PRICE_TIERS : [];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? CATALOG.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : CATALOG;
    const byCat = new Map<string, CatalogProduct[]>();
    for (const p of list) byCat.set(p.category, [...(byCat.get(p.category) ?? []), p]);
    return [...byCat.entries()];
  }, [query]);

  const lines = CATALOG.flatMap((p) => p.sizes.filter((s) => (qty[key(p, s)] ?? 0) > 0).map((s) => ({ p, s, n: qty[key(p, s)] })));
  const units = lines.reduce((n, l) => n + l.n, 0);
  const message = [
    "Hi Vanta Foundry, I'd like wholesale pricing for this order:",
    "",
    ...lines.map((l) => `- ${l.p.name} ${l.s.size} x ${l.n}`),
    "",
    `Total: ${units} units`,
  ].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Wholesale order request (${units} units)`, message);

  const set = (k: string, n: number) => setQty((q) => ({ ...q, [k]: Math.max(0, Math.min(99999, Math.floor(n) || 0)) }));

  if (!confirmed) {
    return (
      <div className="max-w-xl rounded-2xl border border-line bg-bg-2 p-7">
        <p className="text-[17px] font-semibold text-ink">Before you look: research use only</p>
        <p className="mt-2 text-[15.5px] leading-[1.6] text-body">
          These products are laboratory research materials. They are not for human or veterinary use. Please confirm that
          you are buying for research purposes.
        </p>
        <button type="button" onClick={() => setConfirmed(true)} className="btn btn-dark mt-6 h-12 px-6 text-[15px]">
          I confirm. Show the catalog
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor={searchId} className="text-[13px] text-muted">Search the catalog</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Product or category"
            className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[15px] outline-none focus:border-ink"
          />
        </div>
        <p className="text-[13.5px] text-muted">
          {priced ? "Wholesale price per unit, by quantity." : "Wholesale prices are confirmed when you send your list."}
        </p>
      </div>

      <div className="mt-6 space-y-10 pb-28">
        {groups.length === 0 && <p className="text-[15px] text-body">Nothing matches &ldquo;{query}&rdquo;.</p>}
        {groups.map(([cat, products]) => (
          <div key={cat}>
            <h2 className="text-[15px] font-semibold text-ink">{cat}</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-line">
              <div className="hidden grid-cols-[minmax(0,1.6fr)_90px_100px_var(--tiers)_150px] gap-4 border-b border-line bg-bg-2 px-5 py-3 text-[12.5px] font-medium text-muted md:grid" style={{ ["--tiers" as string]: tiers.length ? `repeat(${tiers.length}, 100px)` : "120px" }}>
                <span>Product</span>
                <span>Size</span>
                <span className="text-right">Retail</span>
                {tiers.length ? tiers.map((t) => <span key={t.label} className="text-right">{t.label}</span>) : <span className="text-right">Wholesale</span>}
                <span className="text-right">Quantity</span>
              </div>
              {products.flatMap((p) =>
                p.sizes.map((s) => {
                  const k = key(p, s);
                  const n = qty[k] ?? 0;
                  return (
                    <div
                      key={k}
                      className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[minmax(0,1.6fr)_90px_100px_var(--tiers)_150px] ${n > 0 ? "bg-gold-tint/60" : ""}`}
                      style={{ ["--tiers" as string]: tiers.length ? `repeat(${tiers.length}, 100px)` : "120px" }}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-medium text-ink">{p.name}</p>
                        <p className="text-[13px] text-muted md:hidden">
                          {s.size} · Retail {money(s.retail)}
                          {tiers.length ? ` · ${tiers.map((t, i) => { const v = tierPrice(s, i); return `${t.label} ${v != null ? money(v) : "ask"}`; }).join(" · ")}` : " · Wholesale price: ask us"}
                        </p>
                      </div>
                      <span className="hidden font-mono text-[13.5px] text-ink md:block">{s.size}</span>
                      <span className="hidden text-right font-mono text-[13.5px] text-muted md:block">{money(s.retail)}</span>
                      {tiers.length ? (
                        tiers.map((t, i) => {
                          const v = tierPrice(s, i);
                          return (
                            <span key={t.label} className="hidden text-right font-mono text-[13.5px] text-ink md:block">
                              {v != null ? money(v) : <span className="font-sans text-muted">Ask us</span>}
                            </span>
                          );
                        })
                      ) : (
                        <span className="hidden text-right text-[13.5px] text-muted md:block">Ask us</span>
                      )}
                      <div className="flex items-center justify-end gap-1.5">
                        <button type="button" aria-label={`Fewer ${p.name} ${s.size}`} onClick={() => set(k, n - 10)} disabled={n === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 text-ink disabled:opacity-30">
                          <IconMinus />
                        </button>
                        <input
                          inputMode="numeric"
                          aria-label={`Quantity of ${p.name} ${s.size}`}
                          value={n || ""}
                          placeholder="0"
                          onChange={(e) => set(k, Number(e.target.value.replace(/\D/g, "")))}
                          className="h-9 w-14 rounded-lg border border-line-2 bg-white text-center font-mono text-[14px] outline-none focus:border-ink"
                        />
                        <button type="button" aria-label={`More ${p.name} ${s.size}`} onClick={() => set(k, n + 10)} className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 text-ink">
                          <IconPlus />
                        </button>
                      </div>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        ))}
        <p className="text-[13px] text-muted">The + and − buttons change quantities by 10. Type any number in the box.</p>
      </div>

      {/* The order bar: always visible, so the next step is never hidden. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14.5px] text-ink" aria-live="polite">
            {units > 0 ? (
              <>
                <span className="font-semibold">{units} units</span> · {lines.length} {lines.length === 1 ? "item" : "items"}
              </>
            ) : (
              <span className="text-muted">Add quantities, then send your list.</span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:flex">
            {wa && (
              <a href={units ? wa : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!units} onClick={(e) => !units && e.preventDefault()} className={`btn btn-dark h-11 px-4 text-[14.5px] sm:px-5 ${units ? "" : "pointer-events-none opacity-40"}`}>
                <IconWhatsApp className="text-wa" /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Send on WhatsApp</span>
              </a>
            )}
            <a href={units ? mail : undefined} aria-disabled={!units} onClick={(e) => !units && e.preventDefault()} className={`btn ${wa ? "btn-light" : "btn-dark col-span-2"} h-11 px-4 text-[14.5px] sm:px-5 ${units ? "" : "pointer-events-none opacity-40"}`}>
              <IconMail /> <span className="sm:hidden">Email</span><span className="hidden sm:inline">Send by email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
