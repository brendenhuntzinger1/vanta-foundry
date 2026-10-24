"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { type Flow, type FlowOption, optLabel } from "@/lib/flows";
import { SITE, emailLink, whatsappLink } from "@/lib/site";
import { attributionRows } from "@/lib/attribution";
import { track } from "@/lib/track";
import { uuid } from "@/lib/uuid";
import { IconArrow, IconCheck, IconMail, IconWhatsApp } from "./icons";

/** Wall-clock time, read only in effects and event handlers. */
const now = () => Date.now();

export type FlowSubject = { slug: string; name: string; title: string; includes: string[] };

/**
 * A short guided path (owner, 2026-10-24: "people want simplicity"): one or
 * two taps, then one screen with the contact details and the send button.
 * Single answers move on by themselves.
 */
export function ServiceFlow({ subject, flow, learnMore }: { subject: FlowSubject; flow: Flow; learnMore?: string }) {
  const uid = useId();
  const Q = flow.questions.length;
  // Screens: 0..Q-1 questions, Q details and send.
  const last = Q;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [f, setF] = useState({ name: "", phone: "", email: "", business: "", website: "", details: "", company_url: "" });
  const t = (k: keyof typeof f) => f[k].trim();
  const form = flow.contact === "form";
  const [send, setSend] = useState<"idle" | "sending" | "sent" | "fallback" | "error">("idle");
  const [sendError, setSendError] = useState("");
  const started = useRef(0);
  // One reference per brief: a retry after a failure reuses it, so the team
  // never gets the same brief twice (the server passes it to Resend as an
  // idempotency key).
  const leadId = useRef("");
  const [ref, setRef] = useState("");
  useEffect(() => {
    started.current = now();
    leadId.current = uuid();
    track("inquiry_start", { form: subject.slug });
  }, [subject.slug]);

  const phoneOk = t("phone").replace(/\D/g, "").length >= 10;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t("email"));
  const detailsOk = t("name").length > 0 && phoneOk && (!form || emailOk);
  const summary = flow.questions.map((q, i) => ({ label: q.label ?? q.q, value: (answers[i] ?? []).join(", ") }));

  const message = [
    `Hi Vanta Foundry, I'd like to get started with ${subject.name.toLowerCase()}.`,
    "",
    ...flow.questions.map((q, i) => `${q.q} ${(answers[i] ?? []).join(", ") || "-"}`),
    "",
    `Name: ${t("name")}`,
    `Phone: ${t("phone")}`,
    ...(t("email") ? [`Email: ${t("email")}`] : []),
    ...(t("business") ? [`Business: ${t("business")}`] : []),
    ...(t("website") ? [`Current site: ${t("website")}`] : []),
    ...(t("details") ? ["", t("details")] : []),
  ].join("\n");

  const submit = async () => {
    setSend("sending");
    setSendError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId.current,
          kind: "website_brief",
          service: subject.name,
          answers: summary,
          source: attributionRows(),
          name: t("name"),
          email: t("email"),
          phone: t("phone"),
          business: t("business"),
          website: t("website"),
          details: t("details"),
          company_url: f.company_url,
          elapsed: now() - started.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: boolean; error?: string; ref?: string };
      if (data.ok) {
        setSend("sent");
        setRef(data.ref ?? "");
        track("inquiry_submitted", { form: subject.slug, ref: data.ref ?? "" });
      } else if (data.fallback) {
        setSend("fallback");
        track("inquiry_error", { form: subject.slug, code: `fallback_${res.status}` });
      } else {
        setSend("error");
        setSendError(data.error ?? "Something went wrong. Please try again.");
        track("inquiry_error", { form: subject.slug, code: `validation_${res.status}` });
      }
    } catch {
      setSend("fallback");
      track("inquiry_error", { form: subject.slug, code: "network" });
    }
  };
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
    if (!multi) setTimeout(() => go(qi + 1), 200);
  };

  const q = step < Q ? flow.questions[step] : null;
  const qi = step;
  const rich = (opts: FlowOption[]) => opts.some((o) => typeof o !== "string" && o.desc);

  return (
    <div id={`${uid}-top`} className="scroll-mt-24">
      <p className="mb-6 max-w-[620px] text-[16px] leading-[1.6] text-body">{flow.promise}</p>
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${((step + 1) / (last + 1)) * 100}%` }} />
        </div>
        <span className="shrink-0 text-[12.5px] tabular-nums text-muted">
          {step < Q ? `${step + 1} of ${Q + 1}` : "Last step"}
        </span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
        <div key={step} className="fade-in min-w-0">
          {q && (
            <fieldset>
              <legend className="text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[40px]">{q.q}</legend>
              {q.hint && <p className="mt-3 text-[15px] text-muted">{q.hint}</p>}
              <div className={`mt-8 grid gap-2.5 ${rich(q.options) && q.options.length <= 3 ? "" : "sm:grid-cols-2"}`}>
                {q.options.map((o) => {
                  const label = optLabel(o);
                  const desc = typeof o === "string" ? undefined : o.desc;
                  const tag = typeof o === "string" ? undefined : o.tag;
                  const on = (answers[qi] ?? []).includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => pick(qi, label, q.multi)}
                      className={`group flex items-center justify-between gap-4 rounded-2xl border px-5 text-left transition-[border-color,background,box-shadow] duration-150 ${desc ? "min-h-[84px] py-4" : "min-h-[62px] py-3.5"} ${
                        on ? "border-ink bg-ink text-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]" : "border-line-2 bg-white text-ink hover:border-ink hover:shadow-[0_8px_24px_-18px_rgba(0,0,0,0.4)]"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-[16.5px] font-medium tracking-[-0.01em]">
                          {label}
                          {tag && <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${on ? "bg-white/15 text-gold-fill" : "bg-gold-tint text-gold"}`}>{tag}</span>}
                        </span>
                        {desc && <span className={`mt-1 block text-[13.5px] leading-[1.45] ${on ? "text-white/70" : "text-muted"}`}>{desc}</span>}
                      </span>
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center ${q.multi ? "rounded-md" : "rounded-full"} border ${on ? "border-white bg-white text-ink" : "border-line-2 group-hover:border-ink"}`} aria-hidden="true">
                        {on && <IconCheck width={14} height={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <Nav
                back={step > 0 ? () => go(step - 1) : undefined}
                next={() => go(step + 1)}
                disabled={(answers[qi] ?? []).length === 0}
                hint={(answers[qi] ?? []).length === 0 ? (q.multi ? "Tap at least one." : "Tap an answer to continue.") : undefined}
              />
            </fieldset>
          )}

          {step === last && (
            <div>
              <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[40px]">{send === "sent" ? "Sent." : "Where should we reply?"}</h2>
              {send !== "sent" && (
                <>
              <p className="mt-3 text-[15px] text-muted">{form ? "A project lead replies with a quote and a timeline, in writing." : "A person on our team reads every request and replies with pricing."}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Field id={`${uid}-name`} label="Your name" required value={f.name} onChange={(v) => setF({ ...f, name: v })} autoComplete="name" />
                <Field id={`${uid}-email`} label={form ? "Email" : "Email (optional)"} required={form} type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} autoComplete="email" />
                <Field id={`${uid}-phone`} label="Phone number" required type="tel" inputMode="tel" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} autoComplete="tel" />
                {/* Honeypot: hidden from people, filled by bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor={`${uid}-cu`}>Company URL</label>
                  <input id={`${uid}-cu`} tabIndex={-1} autoComplete="off" value={f.company_url} onChange={(e) => setF({ ...f, company_url: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-details`} className="text-[13px] text-muted">Anything else? Your website, business name (optional)</label>
                  <textarea id={`${uid}-details`} rows={3} value={f.details} onChange={(e) => setF({ ...f, details: e.target.value })} className="mt-1.5 w-full rounded-xl border border-line-2 bg-white px-3.5 py-3 text-[16px] outline-none focus:border-ink" />
                </div>
              </div>
                </>
              )}
              {form ? (
                <div className="mt-6">
                  {send === "sent" ? (
                    <div className="rounded-2xl bg-ink p-6 text-white">
                      <p className="flex items-center gap-2 text-[18px] font-semibold"><IconCheck className="text-gold-fill" /> Brief received. Thank you, {t("name").split(" ")[0]}.</p>
                      <p className="mt-2 text-[14.5px] leading-[1.6] text-white/70">A project lead will review it and reach out at {t("email")} or {t("phone")} with next steps, a quote and a timeline.</p>
                      {ref && <p className="mt-2 text-[13px] text-white/50">Your reference: <span className="font-mono">{ref}</span></p>}
                      <Link href="/work" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-white underline underline-offset-4">While you wait, see our work <IconArrow /></Link>
                    </div>
                  ) : send === "fallback" ? (
                    <div className="rounded-2xl border border-line p-6">
                      <p className="text-[16px] font-semibold text-ink">One more tap.</p>
                      <p className="mt-1.5 text-[14.5px] text-body">Send your brief from your email app. It opens with everything written in.</p>
                      <a href={mail} onClick={() => track("contact_click", { channel: "email", form: `${subject.slug}_fallback` })} className="btn btn-dark mt-5 h-14 px-8 text-[16px]"><IconMail /> Send by email</a>
                    </div>
                  ) : (
                    <>
                      <button type="button" onClick={submit} disabled={send === "sending" || !detailsOk} className="btn btn-dark h-14 w-full px-8 text-[16px] disabled:opacity-60 sm:w-auto">
                        {send === "sending" ? "Sending…" : "Send my brief"} {send !== "sending" && <IconArrow />}
                      </button>
                      {!detailsOk && <p className="mt-3 text-[13px] text-muted">Add your name, email and phone number to send.</p>}
                      {send === "error" && <p className="mt-3 text-[13.5px] text-[#b42318]" role="alert">{sendError}</p>}
                      <p className="mt-4 text-[13px] text-muted">We use your details only to reply to this brief.</p>
                    </>
                  )}
                </div>
              ) : (
                <>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" aria-disabled={!detailsOk} className={`btn btn-dark h-14 px-8 text-[16px] ${detailsOk ? "" : "pointer-events-none opacity-40"}`}>
                      <IconWhatsApp className="text-wa" /> Send on WhatsApp
                    </a>
                  )}
                  <a href={mail} aria-disabled={!detailsOk} className={`btn ${wa ? "btn-light" : "btn-dark"} h-14 px-8 text-[16px] ${detailsOk ? "" : "pointer-events-none opacity-40"}`}>
                    <IconMail /> Send by email
                  </a>
                </div>
                <p className="mt-4 text-[13px] text-muted">{detailsOk ? "Opens with everything written in." : "Add your name and a phone number to send."} Prefer to write yourself? {SITE.email}</p>
                </>
              )}
              {send !== "sent" && (
                <button type="button" onClick={() => go(step - 1)} className="mt-6 text-[14px] text-muted underline underline-offset-2 hover:text-ink">
                  Back
                </button>
              )}
            </div>
          )}
        </div>

        {/* Live summary, desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="rounded-2xl border border-line p-5">
              <p className="text-[13px] font-medium text-muted">Your project</p>
              <p className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-ink">{subject.name}</p>
              <dl className="mt-4 space-y-2.5">
                {summary.map((r, i) => (
                  <div key={r.label} className="text-[13.5px]">
                    <dt className={i === step ? "font-medium text-ink" : "text-muted"}>{r.label}</dt>
                    <dd className={`mt-0.5 ${r.value ? "text-ink" : "text-line-2"}`}>{r.value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {subject.slug === "website-development" && (
              <div className="rounded-2xl bg-ink p-5 text-white">
                <p className="text-[15px] font-semibold">Your developer team</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-white/70">
                  After launch, a team stays on call 24/7 on a monthly plan. Message us on WhatsApp and it gets fixed, changed or built.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {learnMore && (
        <p className="mt-16 border-t border-line pt-5 text-[13.5px] text-muted">
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
    <div className="mt-9">
      <div className="flex items-center gap-3">
        {back && (
          <button type="button" onClick={back} className="btn btn-light h-12 px-5 text-[15px]">
            Back
          </button>
        )}
        {next && (
          <button type="button" onClick={next} disabled={disabled} className="btn btn-dark h-12 flex-1 px-6 text-[15px] disabled:opacity-40 sm:flex-none">
            {nextLabel} <IconArrow />
          </button>
        )}
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
