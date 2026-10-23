import Link from "next/link";
import type { ReactNode } from "react";
import { SERVICES } from "@/lib/services";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1200px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-4 text-[34px] text-white sm:text-[46px]">{title}</h2>
      {lede && <p className="mt-5 text-[15.5px] leading-7 text-muted">{lede}</p>}
    </div>
  );
}

/**
 * Email field that hands off to /apply with the address prefilled. A plain GET
 * form: it works before hydration and without JavaScript.
 */
export function EmailStart({ id = "start-email", className = "", service }: { id?: string; className?: string; service?: string }) {
  return (
    <form action="/apply" method="get" className={`w-full max-w-[460px] ${className}`}>
      {service && <input type="hidden" name="service" value={service} />}
      <label htmlFor={id} className="sr-only">
        Work email
      </label>
      <div className="glass flex items-center gap-1.5 rounded-full p-1.5 pl-5">
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourbrand.com"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/35 outline-none"
        />
        <button type="submit" className="btn-gold shrink-0 rounded-full px-5 py-3 text-[14px]">
          Apply <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] text-white [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-white/50 transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[15px] leading-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ServiceGrid({ exclude }: { exclude?: string }) {
  const list = SERVICES.filter((s) => s.slug !== exclude);
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => (
        <Link
          key={s.slug}
          href={`/${s.slug}`}
          className="group flex min-h-[200px] flex-col justify-between bg-ink p-7 transition-colors hover:bg-[#101010]"
        >
          <div>
            <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="display mt-6 text-[26px] text-white">{s.name}</h3>
            <p className="mt-3 text-[14px] leading-6 text-muted">{s.card}</p>
          </div>
          <span className="mt-8 text-[13px] text-white/50 transition-colors group-hover:text-gold">
            Learn more <span aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function CtaBand({ title = "Tell us what you're building.", lede }: { title?: string; lede?: string }) {
  return (
    <section className="relative mt-32 overflow-hidden">
      <Container>
        <div className="glass halo relative overflow-hidden rounded-[28px] px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="display mx-auto max-w-2xl text-[36px] text-white sm:text-[52px]">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-7 text-muted">
            {lede ??
              "One application covers every service. We review each one and come back with what we can supply and how we would set it up."}
          </p>
          <div className="mt-9 flex justify-center">
            <EmailStart id="cta-email" />
          </div>
        </div>
      </Container>
    </section>
  );
}
