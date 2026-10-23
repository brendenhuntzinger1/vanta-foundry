"use client";

import { useId, useMemo, useState } from "react";
import { CATALOG } from "@/lib/catalog";
import { emailLink, whatsappLink } from "@/lib/site";
import { IconCheck, IconMail, IconWhatsApp } from "@/components/icons";

const ALL = "All";

/**
 * Step 1: confirm research use. Step 2: tap the sizes you want. Step 3: send
 * the inquiry on WhatsApp or by email. No prices are shown (owner,
 * 2026-10-23); we reply with them.
 */
export function CatalogBrowser() {
  const searchId = useId();
  const [confirmed, setConfirmed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [picked, setPicked] = useState<string[]>([]);

  const categories = useMemo(() => [ALL, ...new Set(CATALOG.map((p) => p.category))], []);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((p) => (category === ALL || p.category === category) && (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  }, [query, category]);

  const keyOf = (slug: string, size: string) => `${slug}|${size}`;
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const lines = picked.map((k) => {
    const [slug, size] = k.split("|");
    return `- ${CATALOG.find((p) => p.slug === slug)?.name ?? slug} (${size})`;
  });
  const message = ["Hi Vanta Foundry, I'd like wholesale pricing for:", "", ...lines, "", "Approximate quantities: ", "Business name: "].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Wholesale inquiry (${picked.length} ${picked.length === 1 ? "item" : "items"})`, message);
  const ready = picked.length > 0;

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
    <div className="fade-in pb-32">
      <div className="flex flex-col gap-5">
        <div className="w-full sm:max-w-sm">
          <label htmlFor={searchId} className="text-[13px] text-muted">Search</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Product name"
            className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[15px] outline-none focus:border-ink"
          />
        </div>
        <div role="group" aria-label="Category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-[14px] transition-colors ${category === c ? "bg-ink text-white" : "bg-bg-2 text-body hover:text-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[14px] text-muted">Tap a size to add it to your inquiry. Tap again to remove it.</p>

      {shown.length === 0 ? (
        <p className="mt-6 text-[15px] text-body">Nothing matches &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => {
            const any = p.sizes.some((s) => picked.includes(keyOf(p.slug, s)));
            return (
              <li key={p.slug} className={`rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] duration-200 ${any ? "border-ink shadow-[0_0_0_1px_var(--ink)]" : "border-line"}`}>
                <p className="text-[12.5px] text-muted">{p.category}</p>
                <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-ink">{p.name}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.sizes.map((s) => {
                    const k = keyOf(p.slug, s);
                    const on = picked.includes(k);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        aria-label={`${p.name} ${s}`}
                        onClick={() => toggle(k)}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 font-mono text-[13px] transition-colors ${
                          on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"
                        }`}
                      >
                        {on && <IconCheck width={13} height={13} />}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* The inquiry bar: always visible, so the next step is never hidden. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14.5px] text-ink" aria-live="polite">
            {ready ? (
              <>
                <span className="font-semibold">{picked.length} selected</span>
                <button type="button" onClick={() => setPicked([])} className="ml-3 text-[13.5px] text-muted underline underline-offset-2 hover:text-ink">
                  Clear
                </button>
              </>
            ) : (
              <span className="text-muted">Tap sizes above, then send your inquiry for pricing.</span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:flex">
            {wa && (
              <a href={ready ? wa : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!ready} onClick={(e) => !ready && e.preventDefault()} className={`btn btn-dark h-11 px-4 text-[14.5px] sm:px-5 ${ready ? "" : "pointer-events-none opacity-40"}`}>
                <IconWhatsApp className="text-wa" /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">Send inquiry on WhatsApp</span>
              </a>
            )}
            <a href={ready ? mail : undefined} aria-disabled={!ready} onClick={(e) => !ready && e.preventDefault()} className={`btn ${wa ? "btn-light" : "btn-dark col-span-2"} h-11 px-4 text-[14.5px] sm:px-5 ${ready ? "" : "pointer-events-none opacity-40"}`}>
              <IconMail /> <span className="sm:hidden">Email</span><span className="hidden sm:inline">Send by email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
