"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Flow } from "@/lib/flows";
import { SERVICES } from "@/lib/services";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { IconArrow, IconCheck, IconMail, IconWhatsApp } from "./icons";

export type FlowSubject = { slug: string; name: string; title: string; includes: string[] };

/**
 * A guided path, one question per screen: what you get, then each question
 * as big tap targets (single answers move on by themselves), then name and
 * phone, then the inquiry opens in WhatsApp or email, already written.
 */
export function ServiceFlow({ subject, flow, learnMore }: { subject: FlowSubject; flow: Flow; learnMore?: string }) {
  const uid = useId();
  const Q = flow.questions.length;
  // Screens: 0 intro, 1..Q questions, Q+1 extras, Q+2 details, Q+3 send.
  const last = Q + 3;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [extra, setExtra] = useState<string[]>([]);
  const [f, setF] = useState({ name: "", phone: "", email: "", business: "", details: "" });
  const t = (k: keyof typeof f) => f[k].trim();

  const phoneOk = t("phone").replace(/\D/g, "").length >= 10;
  const detailsOk = t("name").length > 0 && phoneOk;
  const others = SERVICES.filter((s) => s.slug !== subject.slug);

  const message = [
    `Hi Vanta Foundry, I'd like to get started with ${subject.name.toLowerCase()}.`,
    "",
    ...flow.questions.map((q, i) => `${q.q} ${(answers[i] ?? []).join(", ") || "-"}`),
    ...(extra.length ? ["", `Also interested in: ${extra.join(", ")}`] : []),
    "",
    `Name: ${t("name")}`,
    `Phone: ${t("phone")}`,
    ...(t("email") ? [`Email: ${t("email")}`] : []),
    ...(t("business") ? [`Business: ${t("business")}`] : []),
    ...(t("details") ? ["", t("details")] : []),
  ].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Getting started: ${subject.name}`, message);

  const go = (n: number) => {
    setStep(Math.max(0, Math.min(last, n)));
    document.getElementById(`${uid}-top`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pick = (qi: number, o: string, multi?: boolean) => {
    setAnswers((a) => {
      const cur = a[qi] ?? [];
      const next = multi ? (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]) : [o];
      return { ...a, [qi]: next };
    });
    if (!multi) setTimeout(() => go(qi + 2), 180);
  };

  const q = step >= 1 && step <= Q ? flow.questions[step - 1] : null;
  const qi = step - 1;

  return (
    <div id={`${uid}-top`} className="scroll-mt-24">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-ink transition-[width] duration-300" style={{ width: `${(step / last) * 100}%` }} />
        </div>
        <span className="shrink-0 text-[12.5px] text-muted">
          {step === 0 ? "About a minute" : step <= Q ? `Question ${step} of ${Q}` : step === Q + 1 ? "Almost done" : step === Q + 2 ? "Your details" : "Send"}
        </span>
      </div>

      <div key={step} className="fade-in mt-10">
        {step === 0 && (
          <div>
            <h2 className="h-section text-[34px] text-ink sm:text-[44px]">{subject.title}</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-body">{flow.promise}</p>
            <button type="button" onClick={() => go(1)} className="btn btn-dark mt-8 h-14 w-full px-7 text-[16px] sm:w-auto">
              Start <IconArrow />
            </button>
            <div className="mt-12 rounded-2xl bg-bg-2 p-6">
              <p className="text-[14px] font-medium text-muted">What you get</p>
              <ul className="mt-4 space-y-2.5">
                {subject.includes.map((x) => (
                  <li key={x} className="flex gap-3 text-[15.5px] text-ink">
                    <IconCheck className="mt-0.5 shrink-0 text-gold" /> {x}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13.5px] text-muted">No prices to guess: we quote it after this, in writing.</p>
            </div>
          </div>
        )}

        {q && (
          <fieldset>
            <legend className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[36px]">{q.q}</legend>
            {q.hint && <p className="mt-2 text-[14.5px] text-muted">{q.hint}</p>}
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((o) => {
                const on = (answers[qi] ?? []).includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(qi, o, q.multi)}
                    className={`flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border px-5 py-3.5 text-left text-[16px] transition-colors ${on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"}`}
                  >
                    {o}
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${on ? "border-white bg-white text-ink" : "border-line-2"}`} aria-hidden="true">
                      {on && <IconCheck width={14} height={14} />}
                    </span>
                  </button>
                );
              })}
            </div>
            <Nav
              back={() => go(step - 1)}
              next={q.multi || (answers[qi] ?? []).length > 0 ? () => go(step + 1) : undefined}
              disabled={(answers[qi] ?? []).length === 0}
              hint={(answers[qi] ?? []).length === 0 ? (q.multi ? "Tap at least one." : "Tap an answer to continue.") : undefined}
            />
          </fieldset>
        )}

        {step === Q + 1 && (
          <fieldset>
            <legend className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[36px]">Anything else with it?</legend>
            <p className="mt-2 text-[14.5px] text-muted">Optional. One team handles all of it.</p>
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {others.map((o) => {
                const on = extra.includes(o.name);
                return (
                  <button
                    key={o.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setExtra((e) => (on ? e.filter((x) => x !== o.name) : [...e, o.name]))}
                    className={`flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-[15.5px] transition-colors ${on ? "border-ink bg-ink text-white" : "border-line bg-bg-2 text-ink hover:border-ink"}`}
                  >
                    {o.name}
                    {on && <IconCheck width={16} height={16} />}
                  </button>
                );
              })}
            </div>
            <Nav back={() => go(step - 1)} next={() => go(step + 1)} nextLabel={extra.length ? "Continue" : "Skip"} />
          </fieldset>
        )}

        {step === Q + 2 && (
          <div>
            <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[36px]">Where should we reply?</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Your name" required value={f.name} onChange={(v) => setF({ ...f, name: v })} autoComplete="name" />
              <Field id={`${uid}-phone`} label="Phone number" required type="tel" inputMode="tel" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} autoComplete="tel" />
              <Field id={`${uid}-email`} label="Email (optional)" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} autoComplete="email" />
              <Field id={`${uid}-business`} label="Business name (optional)" value={f.business} onChange={(v) => setF({ ...f, business: v })} autoComplete="organization" />
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-details`} className="text-[13px] text-muted">Anything else we should know? (optional)</label>
                <textarea id={`${uid}-details`} rows={3} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line-2 bg-white px-3.5 py-3 text-[16px] outline-none focus:border-ink" />
              </div>
            </div>
            <Nav back={() => go(step - 1)} next={() => go(step + 1)} nextLabel="Review and send" disabled={!detailsOk} hint={detailsOk ? undefined : "Add your name and a phone number to continue."} />
          </div>
        )}

        {step === last && (
          <div>
            <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[36px]">Send it. We reply with a quote.</h2>
            <p className="mt-2 text-[15.5px] text-body">Your message is written. Tap a button and it opens ready to send.</p>
            <pre className="mt-6 max-h-[260px] overflow-auto whitespace-pre-wrap rounded-2xl border border-line bg-bg-2 p-5 font-sans text-[13.5px] leading-[1.6] text-ink">{message}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-dark h-14 px-7 text-[16px]">
                  <IconWhatsApp className="text-wa" /> Send on WhatsApp
                </a>
              )}
              <a href={mail} className={`btn ${wa ? "btn-light" : "btn-dark"} h-14 px-7 text-[16px]`}>
                <IconMail /> Send by email
              </a>
            </div>
            <p className="mt-4 text-[13px] text-muted">A person on our team replies. Prefer to write yourself? {SITE.email}</p>
            <button type="button" onClick={() => go(step - 1)} className="mt-6 text-[14px] text-muted underline underline-offset-2 hover:text-ink">
              Back
            </button>
          </div>
        )}
      </div>

      {learnMore && (
        <p className="mt-14 border-t border-line pt-5 text-[13.5px] text-muted">
          Want to read more first?{" "}
          <Link href={learnMore} className="text-ink underline underline-offset-2">
            Everything about {subject.name.toLowerCase()}
          </Link>
        </p>
      )}
    </div>
  );
}

function Nav({ back, next, nextLabel = "Continue", disabled, hint }: { back?: () => void; next?: () => void; nextLabel?: string; disabled?: boolean; hint?: string }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3">
        {back && (
          <button type="button" onClick={back} className="btn btn-light h-12 px-5 text-[15px]">
            Back
          </button>
        )}
        {next !== undefined || disabled ? (
          <button type="button" onClick={next} disabled={disabled} className="btn btn-dark h-12 flex-1 px-6 text-[15px] disabled:opacity-40 sm:flex-none">
            {nextLabel} <IconArrow />
          </button>
        ) : null}
      </div>
      {hint && <p className="mt-3 text-[13px] text-muted">{hint}</p>}
    </div>
  );
}

function Field({ id, label, required, onChange, ...rest }: { id: string; label: string; required?: boolean; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
        {required && <span className="text-ink"> *</span>}
      </label>
      <input id={id} required={required} onChange={(e) => onChange(e.target.value)} {...rest} className="mt-1.5 h-12 w-full rounded-xl border border-line-2 bg-white px-3.5 text-[16px] outline-none focus:border-ink" />
    </div>
  );
}
