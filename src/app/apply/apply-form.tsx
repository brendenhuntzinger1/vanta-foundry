"use client";

import { useState, type FormEvent } from "react";
import { BUSINESS_TYPES, SERVICE_OPTIONS, applicationText, validateApplication, type Application } from "@/lib/application";
import { SITE } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "fallback"; app: Application };

const FIELD =
  "mt-2 w-full rounded-xl border border-line-strong bg-white/[0.025] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold";

export function ApplyForm({ defaultEmail, defaultService }: { defaultEmail: string; defaultService?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company"),
      website: fd.get("website"),
      businessType: fd.get("businessType"),
      services: fd.getAll("services"),
      volume: fd.get("volume"),
      message: fd.get("message"),
      attest: fd.get("attest") === "on",
      fax: fd.get("fax"),
    };
    const check = validateApplication(payload);
    if (!check.ok) {
      setErrors(check.errors);
      document.getElementById(`f-${Object.keys(check.errors)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return setStatus({ kind: "sent" });
      setStatus({ kind: "fallback", app: check.value });
    } catch {
      setStatus({ kind: "fallback", app: check.value });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="glass fade-in rounded-2xl p-10 text-center" role="status">
        <p className="eyebrow text-gold/80">Received</p>
        <p className="display mt-4 text-[34px] text-white">Thank you.</p>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-muted">
          A person on our team will read your application and reply to the email you gave us.
        </p>
      </div>
    );
  }

  if (status.kind === "fallback") {
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Application: ${status.app.company}`)}&body=${encodeURIComponent(applicationText(status.app))}`;
    return (
      <div className="glass fade-in rounded-2xl p-10 text-center" role="alert">
        <p className="eyebrow text-warn">Not sent</p>
        <p className="display mt-4 text-[30px] text-white">Your application didn&rsquo;t go through.</p>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-7 text-muted">
          Nothing is lost. Send it by email instead. Everything you entered is already filled in.
        </p>
        <a href={mailto} className="btn-gold mt-7 inline-flex rounded-full px-6 py-3 text-[14px]">
          Email {SITE.email}
        </a>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-2 text-[13px] text-warn">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={err("name")}>
          <input id="f-name" name="name" autoComplete="name" className={FIELD} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
        </Field>
        <Field id="email" label="Work email" error={err("email")}>
          <input id="f-email" name="email" type="email" autoComplete="email" defaultValue={defaultEmail} className={FIELD} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
        </Field>
        <Field id="company" label="Company or brand" error={err("company")}>
          <input id="f-company" name="company" autoComplete="organization" className={FIELD} aria-invalid={!!errors.company} aria-describedby={errors.company ? "e-company" : undefined} />
        </Field>
        <Field id="website" label="Website (optional)">
          <input id="f-website" name="website" type="url" inputMode="url" placeholder="https://" className={FIELD} />
        </Field>
      </div>

      <Field id="businessType" label="Which describes you best?" error={err("businessType")}>
        <select id="f-businessType" name="businessType" defaultValue="" className={`${FIELD} appearance-none`} aria-invalid={!!errors.businessType} aria-describedby={errors.businessType ? "e-businessType" : undefined}>
          <option value="" disabled>
            Choose one
          </option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
      </Field>

      <fieldset aria-describedby={errors.services ? "e-services" : undefined}>
        <legend className="text-[13px] text-white/70">Services you&rsquo;re interested in</legend>
        <div id="f-services" tabIndex={-1} className="mt-3 flex flex-wrap gap-2 outline-none">
          {SERVICE_OPTIONS.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="checkbox" name="services" value={s} defaultChecked={s === defaultService} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-line-strong px-4 py-2 text-[13.5px] text-white/65 transition-colors peer-checked:border-gold/60 peer-checked:bg-gold/10 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-gold">
                {s}
              </span>
            </label>
          ))}
        </div>
        {err("services")}
      </fieldset>

      <Field id="volume" label="Expected volume and how often you'd order (optional)">
        <textarea id="f-volume" name="volume" rows={2} placeholder="For example: a few hundred units a month, reordered monthly" className={FIELD} />
      </Field>

      <Field id="message" label="Anything else we should know (optional)">
        <textarea id="f-message" name="message" rows={4} className={FIELD} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Fax <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer gap-3 rounded-xl border border-line p-4">
          <input id="f-attest" name="attest" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#c7ae5e]" aria-describedby={errors.attest ? "e-attest" : undefined} />
          <span className="text-[14px] leading-6 text-white/75">
            My business sells or uses these materials for research use only, not for human or veterinary use, and does not
            make dosing, usage or outcome claims.
          </span>
        </label>
        {err("attest")}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="btn-gold rounded-full px-8 py-3.5 text-[15px] disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Submit application"}
        </button>
        <p className="text-[12.5px] text-faint">
          We use these details only to review and reply to your application.{" "}
          <a href={SITE.privacyUrl} className="underline underline-offset-4 hover:text-white/70">
            Privacy
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="text-[13px] text-white/70">
        {label}
      </label>
      {children}
      {error}
    </div>
  );
}
