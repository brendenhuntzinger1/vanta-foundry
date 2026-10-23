"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { CATALOG, QUANTITY_NOTE, productPath, reportBadge, type CatalogProduct } from "@/lib/catalog";
import { emailLink, whatsappLink } from "@/lib/site";
import { track } from "@/lib/track";
import { IconMail, IconWhatsApp } from "@/components/icons";
import { AddToInquiry } from "@/components/inquiry";

const ALL = "All";

function inquiry(p: CatalogProduct) {
  return [
    `Hi Vanta Foundry, I'd like wholesale pricing for ${p.name} (${p.sizes.join(" / ")}).`,
    "",
    "Vial size: ",
    "Number of vials: ",
    "Business name: ",
    "Ship to: ",
  ].join("\n");
}

/**
 * Find a product and tap Inquire, which opens WhatsApp (or email) with that
 * product already written in. Shown straight away, no click-through
 * (owner, 2026-10-23), with the research-use notice above the grid. No prices
 * are shown; we reply with them. Wholesale lots come with a COA.
 *
 * For several products, "Add to list" builds one inquiry (the bar at the
 * bottom of the screen). Each name opens the product's own page.
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
          <span className="font-semibold text-ink">Every wholesale lot comes with a certificate of analysis (COA).</span> Each product page shows the reports already published.
        </p>
        <p className="text-[13px] text-muted sm:text-right">{QUANTITY_NOTE} For laboratory research use only.</p>
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
                <Link href={productPath(p.slug)} className="relative block aspect-[4/5] bg-bg-2" tabIndex={-1} aria-hidden="true">
                  {reportBadge(p.slug) && (
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-white">{reportBadge(p.slug)}</span>
                  )}
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                  <p className="text-[12px] text-muted">{p.category}</p>
                  <Link href={productPath(p.slug)} className="mt-0.5 text-[15.5px] font-semibold leading-snug tracking-[-0.02em] text-ink underline-offset-2 hover:underline sm:text-[16.5px]">{p.name}</Link>
                  <p className="mt-1.5 font-mono text-[12px] text-body">{p.sizes.join(" · ")}</p>
                  <div className="mt-auto pt-4">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("contact_click", { channel: "whatsapp", form: "product_card", product: p.slug })} className="btn btn-dark h-10 w-full text-[13.5px]">
                        <IconWhatsApp className="text-wa" /> Inquire
                      </a>
                    ) : (
                      <a href={mail} onClick={() => track("contact_click", { channel: "email", form: "product_card", product: p.slug })} className="btn btn-dark h-10 w-full text-[13.5px]">
                        <IconMail /> Inquire
                      </a>
                    )}
                    <AddToInquiry slug={p.slug} sizes={p.sizes} compact className="mt-2" />
                    {wa && (
                      <a href={mail} onClick={() => track("contact_click", { channel: "email", form: "product_card", product: p.slug })} className="mt-2 block text-center text-[12.5px] text-muted underline-offset-2 hover:text-ink hover:underline">
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
        Want several products? Tap <span className="font-medium text-ink">Add to list</span> on each one, then send the whole
        list at once from the bar at the bottom of the screen.
      </p>
    </div>
  );
}
