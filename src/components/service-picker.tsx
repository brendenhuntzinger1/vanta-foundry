"use client";

import { useId, useState } from "react";
import { SERVICES } from "@/lib/services";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { ServiceIcon } from "./service-icon";
import { IconCheck, IconMail, IconWhatsApp } from "./icons";

/**
 * Step 1: tap the services you want. Step 2: send the list on WhatsApp or by
 * email, already written. No form to submit, no server to fail: the request
 * leaves in the visitor's own app, addressed to us.
 */
export function ServicePicker({ initial = [] }: { initial?: string[] }) {
  const nameId = useId();
  const bizId = useId();
  const [picked, setPicked] = useState<string[]>(initial.filter((s) => SERVICES.some((x) => x.slug === s)));
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const chosen = SERVICES.filter((s) => picked.includes(s.slug));

  const message = [
    "Hi Vanta Foundry.",
    ...(name.trim() || business.trim()
      ? [`This is ${[name.trim(), business.trim() && (name.trim() ? `from ${business.trim()}` : business.trim())].filter(Boolean).join(" ")}.`]
      : []),
    "",
    "I'm interested in:",
    ...chosen.map((s) => `- ${s.name}`),
    "",
    "Can you tell me how to get started?",
  ].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Getting started: ${chosen.map((s) => s.name).join(", ")}`, message);
  const ready = chosen.length > 0;

  return (
    <div>
      <p className="text-[14px] font-medium text-muted">Step 1 · Tap everything you need</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const on = picked.includes(s.slug);
          return (
            <button
              key={s.slug}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(s.slug)}
              className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-[border-color,box-shadow,background] duration-200 ${
                on ? "border-ink bg-white shadow-[0_0_0_1px_var(--ink)]" : "border-line bg-white hover:border-line-2 hover:shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)]"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${on ? "bg-ink text-white" : "bg-bg-2 text-ink"}`}>
                  <ServiceIcon slug={s.slug} />
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-transparent"}`}
                >
                  <IconCheck width={14} height={14} />
                </span>
              </span>
              <span className="mt-4 text-[16.5px] font-semibold tracking-[-0.02em] text-ink">{s.name}</span>
              <span className="mt-1.5 text-[14px] leading-[1.5] text-muted">{s.short}</span>
            </button>
          );
        })}
      </div>

      <div id="request" className="mt-8 rounded-2xl border border-line bg-bg-2 p-5 sm:p-7">
        <p className="text-[14px] font-medium text-muted">Step 2 · Send it to us</p>
        <div className="mt-3 min-h-[34px]" aria-live="polite">
          {ready ? (
            <ul className="flex flex-wrap gap-2">
              {chosen.map((s) => (
                <li key={s.slug} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13.5px] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  <IconCheck width={13} height={13} /> {s.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-body">Nothing picked yet. Tap the services you want above.</p>
          )}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={nameId} className="text-[13px] text-muted">Your name (optional)</label>
            <input id={nameId} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[15px] outline-none focus:border-ink" />
          </div>
          <div>
            <label htmlFor={bizId} className="text-[13px] text-muted">Business name (optional)</label>
            <input id={bizId} value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[15px] outline-none focus:border-ink" />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {wa && (
            <a
              href={ready ? wa : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!ready}
              onClick={(e) => !ready && e.preventDefault()}
              className={`btn btn-dark h-12 px-6 text-[15px] ${ready ? "" : "pointer-events-none opacity-40"}`}
            >
              <IconWhatsApp className="text-wa" /> Send on WhatsApp
            </a>
          )}
          <a
            href={ready ? mail : undefined}
            aria-disabled={!ready}
            onClick={(e) => !ready && e.preventDefault()}
            className={`btn ${wa ? "btn-light" : "btn-dark"} h-12 px-6 text-[15px] ${ready ? "" : "pointer-events-none opacity-40"}`}
          >
            <IconMail /> Send by email
          </a>
        </div>
        <p className="mt-4 text-[13px] text-muted">
          Your message opens {wa ? "in WhatsApp or your email app" : "in your email app"}, already written. Prefer to type it yourself? Email{" "}
          <a href={emailLink()} className="text-ink underline underline-offset-2">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
