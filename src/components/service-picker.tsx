"use client";

import { useId, useState } from "react";
import { SERVICES } from "@/lib/services";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { ServiceIcon } from "./service-icon";
import { IconCheck, IconMail, IconWhatsApp } from "./icons";
import { CardBrands } from "./card-brands";

/**
 * Step 1: tap the services you want. Step 2: send the list on WhatsApp or by
 * email, already written. No form to submit, no server to fail: the request
 * leaves in the visitor's own app, addressed to us.
 */
export function ServicePicker({ initial = [] }: { initial?: string[] }) {
  const uid = useId();
  const [picked, setPicked] = useState<string[]>(initial.filter((s) => SERVICES.some((x) => x.slug === s)));
  const [f, setF] = useState({ name: "", phone: "", email: "", business: "", website: "", details: "" });
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));
  const chosen = SERVICES.filter((s) => picked.includes(s.slug));

  const t = (k: keyof typeof f) => f[k].trim();
  const message = [
    "Hi Vanta Foundry, I'd like to get started.",
    "",
    "I'm interested in:",
    ...chosen.map((s) => `- ${s.name}`),
    "",
    `Name: ${t("name")}`,
    `Phone: ${t("phone")}`,
    ...(t("email") ? [`Email: ${t("email")}`] : []),
    ...(t("business") ? [`Business: ${t("business")}`] : []),
    ...(t("website") ? [`Website: ${t("website")}`] : []),
    ...(t("details") ? ["", t("details")] : []),
  ].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Getting started: ${chosen.map((s) => s.name).join(", ")}`, message);
  const phoneOk = t("phone").replace(/\D/g, "").length >= 10;
  const ready = chosen.length > 0 && t("name").length > 0 && phoneOk;
  const missing = [
    chosen.length === 0 && "pick at least one service",
    !t("name") && "add your name",
    !phoneOk && "add a phone number",
  ].filter(Boolean) as string[];

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
              {s.slug === "payment-processing" && <CardBrands size="sm" className="mt-3" />}
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
          <Field id={`${uid}-name`} label="Your name" required value={f.name} onChange={set("name")} autoComplete="name" />
          <Field id={`${uid}-phone`} label="Phone number" required type="tel" inputMode="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" />
          <Field id={`${uid}-email`} label="Email (optional)" type="email" value={f.email} onChange={set("email")} autoComplete="email" />
          <Field id={`${uid}-business`} label="Business name (optional)" value={f.business} onChange={set("business")} autoComplete="organization" />
          <Field id={`${uid}-website`} label="Current website (optional)" type="url" inputMode="url" value={f.website} onChange={set("website")} />
          <div className="sm:col-span-2">
            <label htmlFor={`${uid}-details`} className="text-[13px] text-muted">Anything else? Volume, timeline, what you sell (optional)</label>
            <textarea id={`${uid}-details`} rows={3} value={f.details} onChange={set("details")} className="mt-1.5 w-full rounded-xl border border-line-2 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-ink" />
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
          {!ready && missing.length > 0 && <span className="block pb-1 font-medium text-ink">To send, {missing.join(", ")}.</span>}
          Your message opens {wa ? "in WhatsApp or your email app" : "in your email app"}, already written. Prefer to type it yourself? Email{" "}
          <a href={emailLink()} className="text-ink underline underline-offset-2">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}

function Field({ id, label, required, ...rest }: { id: string; label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
        {required && <span className="text-ink"> *</span>}
      </label>
      <input id={id} required={required} {...rest} className="mt-1.5 h-11 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[15px] outline-none focus:border-ink" />
    </div>
  );
}
