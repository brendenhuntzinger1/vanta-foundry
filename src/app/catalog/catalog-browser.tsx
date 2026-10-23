"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { CATALOG, type CatalogProduct } from "@/lib/catalog";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { IconMail, IconWhatsApp } from "@/components/icons";

const ALL = "All";

function inquiry(p: CatalogProduct) {
  return [
    `Hi Vanta Foundry, I'd like wholesale pricing for ${p.name} (${p.sizes.join(" / ")}).`,
    "",
    "Size: ",
    "Approximate quantity: ",
    "Business name: ",
  ].join("\n");
}

/**
 * Find a product and tap Inquire, which opens WhatsApp (or email) with that
 * product already written in. Shown straight away, no click-through
 * (owner, 2026-10-23), with the research-use notice above the grid. No prices
 * are shown; we reply with them. Wholesale lots come with a COA.
 */
export function CatalogBrowser() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(CATALOG.map((p) => p.category))], []);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((p) => (category === ALL || p.category === category) && (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  }, [query, category]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-line bg-bg-2 px-5 py-4 text-[14px] leading-[1.55] text-body sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-ink">Every wholesale lot comes with a certificate of analysis (COA).</span> Lot numbers on every unit.
        </p>
        <p className="text-[13px] text-muted sm:text-right">For laboratory research use only. Not for human or veterinary use.</p>
      </div>
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

      {shown.length === 0 ? (
        <p className="mt-8 text-[15px] text-body">Nothing matches &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shown.map((p) => {
            const wa = whatsappLink(inquiry(p));
            const mail = emailLink(`Wholesale inquiry: ${p.name}`, inquiry(p));
            return (
              <li key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-[4/5] bg-bg-2">
                  <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-white">COA included</span>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <p className="text-[12px] text-muted">{p.category}</p>
                  <p className="mt-0.5 text-[15.5px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[16.5px]">{p.name}</p>
                  <p className="mt-1.5 font-mono text-[12px] text-body">{p.sizes.join(" · ")}</p>
                  <div className="mt-auto pt-4">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-dark h-10 w-full text-[13.5px]">
                        <IconWhatsApp className="text-wa" /> Inquire
                      </a>
                    ) : (
                      <a href={mail} className="btn btn-dark h-10 w-full text-[13.5px]">
                        <IconMail /> Inquire
                      </a>
                    )}
                    {wa && (
                      <a href={mail} className="mt-2 block text-center text-[12.5px] text-muted underline-offset-2 hover:text-ink hover:underline">
                        or email
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-10 text-[13.5px] text-muted">
        Want several products? Message us the list on{" "}
        {SITE.whatsapp ? (
          <a href={whatsappLink("Hi Vanta Foundry, I'd like wholesale pricing for these products:\n\n") ?? undefined} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">
            WhatsApp
          </a>
        ) : null}
        {SITE.whatsapp ? " or " : ""}
        <a href={emailLink("Wholesale inquiry")} className="text-ink underline underline-offset-2">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
