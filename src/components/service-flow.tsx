"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { Flow } from "@/lib/flows";
import { SERVICES, type Service } from "@/lib/services";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { IconArrow, IconCheck, IconMail, IconWhatsApp } from "./icons";
import { ServiceIcon } from "./service-icon";

const STEPS = ["What you get", "A few taps", "Your details", "Send"];

/**
 * One service, four short steps, then the inquiry leaves in WhatsApp or
 * email, already written. Built for a phone: every answer is a tap.
 */
export function ServiceFlow({ service, flow }: { service: Service; flow: Flow }) {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [extra, setExtra] = useState<string[]>([]);
  const [f, setF] = useState({ name: "", phone: "", email: "", business: "", details: "" });
  const t = (k: keyof typeof f) => f[k].trim();

  const answeredAll = flow.questions.every((_, i) => answers[i]);
  const phoneOk = t("phone").replace(/\D/g, "").length >= 10;
  const detailsOk = t("name").length > 0 && phoneOk;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const message = [
    `Hi Vanta Foundry, I'd like to get started with ${service.name.toLowerCase()}.`,
    "",
    ...flow.questions.map((q, i) => `${q.q} ${answers[i] ?? "-"}`),
    ...(extra.length ? ["", `Also interested in: ${extra.join(", ")}`] : []),
    "",
    `Name: ${t("name")}`,
    `Phone: ${t("phone")}`,
    ...(t("email") ? [`Email: ${t("email")}`] : []),
    ...(t("business") ? [`Business: ${t("business")}`] : []),
    ...(t("details") ? ["", t("details")] : []),
  ].join("\n");
  const wa = whatsappLink(message);
  const mail = emailLink(`Getting started: ${service.name}`, message);

  const go = (n: number) => {
    setStep(n);
    if (typeof window !== "undefined") document.getElementById(`${uid}-top`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id={`${uid}-top`} className="scroll-mt-24">
      {/* Progress */}
      <ol className="grid grid-cols-4 gap-1.5" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={`block h-1.5 rounded-full transition-colors ${i <= step ? "bg-ink" : "bg-line"}`} />
            <span className={`mt-2 hidden text-[12.5px] sm:block ${i === step ? "font-medium text-ink" : "text-muted"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[13px] text-muted sm:hidden">
        Step {step + 1} of 4 · {STEPS[step]}
      </p>

      <div key={step} className="fade-in mt-8">
        {step === 0 && (
          <div>
            <h2 className="h-section text-[30px] text-ink sm:text-[38px]">{service.title}</h2>
            <p className="mt-3 text-[17px] leading-[1.6] text-body">{flow.promise}</p>
            <Nav next={() => go(1)} nextLabel="Start, it takes a minute" />
            <p className="mt-10 text-[14px] font-medium text-muted">What you get</p>
            <ul className="mt-3 space-y-2.5">
              {service.includes.map((x) => (
                <li key={x} className="flex gap-3 text-[15.5px] text-ink">
                  <IconCheck className="mt-0.5 shrink-0 text-gold" /> {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-muted">No prices to guess: we quote it for you after this, in writing.</p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            {flow.questions.map((q, i) => (
              <fieldset key={q.q}>
                <legend className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{q.q}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o) => {
                    const on = answers[i] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setAnswers((a) => ({ ...a, [i]: o }))}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-left text-[14.5px] transition-colors ${on ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink"}`}
                      >
                        {on && <IconCheck width={15} height={15} />}
                        {o}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            <fieldset>
              <legend className="text-[17px] font-semibold tracking-[-0.02em] text-ink">Want anything else with it? <span className="font-normal text-muted">(optional)</span></legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => {
                  const on = extra.includes(o.name);
                  return (
                    <button
                      key={o.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setExtra((e) => (on ? e.filter((x) => x !== o.name) : [...e, o.name]))}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[14px] transition-colors ${on ? "border-ink bg-ink text-white" : "border-line bg-bg-2 text-body hover:border-ink"}`}
                    >
                      <ServiceIcon slug={o.slug} className="h-4 w-4" />
                      {o.name}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <Nav back={() => go(0)} next={() => go(2)} disabled={!answeredAll} hint={answeredAll ? undefined : "Tap one answer for each question."} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">Where should we reply?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Your name" required value={f.name} onChange={(v) => setF({ ...f, name: v })} autoComplete="name" />
              <Field id={`${uid}-phone`} label="Phone number" required type="tel" inputMode="tel" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} autoComplete="tel" />
              <Field id={`${uid}-email`} label="Email (optional)" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} autoComplete="email" />
              <Field id={`${uid}-business`} label="Business name (optional)" value={f.business} onChange={(v) => setF({ ...f, business: v })} autoComplete="organization" />
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-details`} className="text-[13px] text-muted">Anything else we should know? (optional)</label>
                <textarea id={`${uid}-details`} rows={3} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line-2 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-ink" />
              </div>
            </div>
            <Nav back={() => go(1)} next={() => go(3)} nextLabel="Review and send" disabled={!detailsOk} hint={detailsOk ? undefined : "Add your name and a phone number to continue."} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">Send it. We reply with a quote.</h2>
            <p className="mt-2 text-[15px] text-body">Your message is written. Tap a button and it opens ready to send.</p>
            <pre className="mt-5 max-h-[260px] overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-bg-2 p-4 font-sans text-[13.5px] leading-[1.6] text-ink">{message}</pre>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-dark h-12 px-6 text-[15px]">
                  <IconWhatsApp className="text-wa" /> Send on WhatsApp
                </a>
              )}
              <a href={mail} className={`btn ${wa ? "btn-light" : "btn-dark"} h-12 px-6 text-[15px]`}>
                <IconMail /> Send by email
              </a>
            </div>
            <p className="mt-4 text-[13px] text-muted">
              A person on our team replies. Prefer to write yourself? {SITE.email}
            </p>
            <button type="button" onClick={() => go(2)} className="mt-6 text-[14px] text-muted underline underline-offset-2 hover:text-ink">
              Back
            </button>
          </div>
        )}
      </div>

      <p className="mt-12 border-t border-line pt-5 text-[13.5px] text-muted">
        Want to read more first?{" "}
        <Link href={`/${service.slug}`} className="text-ink underline underline-offset-2">
          Everything about {service.name.toLowerCase()}
        </Link>
      </p>
    </div>
  );
}

function Nav({ back, next, nextLabel = "Continue", disabled, hint }: { back?: () => void; next: () => void; nextLabel?: string; disabled?: boolean; hint?: string }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3">
        {back && (
          <button type="button" onClick={back} className="btn btn-light h-12 px-5 text-[15px]">
            Back
          </button>
        )}
        <button type="button" onClick={next} disabled={disabled} className="btn btn-dark h-12 flex-1 px-6 text-[15px] disabled:opacity-40 sm:flex-none">
          {nextLabel} <IconArrow />
        </button>
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
