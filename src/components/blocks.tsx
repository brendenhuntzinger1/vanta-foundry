import Link from "next/link";
import type { ReactNode } from "react";
import { ContactButtons } from "./contact-buttons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1160px] px-5 ${className}`}>{children}</div>;
}

export function SectionHead({ label, title, lede, center = false }: { label?: string; title: ReactNode; lede?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {label && <p className="text-[14px] font-medium text-gold">{label}</p>}
      <h2 className="h-section mt-2 text-[34px] text-ink sm:text-[46px]">{title}</h2>
      {lede && <p className="mt-4 text-[17px] leading-[1.6] text-body">{lede}</p>}
    </div>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16.5px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-2 text-[18px] leading-none text-body transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[16px] leading-[1.65] text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** The closing band: a black block, the one dark surface on the page. */
export function CtaBand({
  title = "Tell us what you need.",
  lede = "Pick your services and send them on WhatsApp or by email. A person on our team replies.",
  primary = { href: "/get-started", label: "Choose your services" },
  contact = true,
}: {
  title?: string;
  lede?: string;
  primary?: { href: string; label: string };
  /** Show the WhatsApp/email buttons. Off on website-development pages. */
  contact?: boolean;
}) {
  return (
    <section className="mt-28">
      <Container>
        <div className="rounded-[28px] bg-ink px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="h-section mx-auto max-w-2xl text-[34px] text-white sm:text-[50px]">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-[1.6] text-white/70">{lede}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn h-12 bg-white px-6 text-[15px] text-ink hover:bg-white/90">
              {primary.label}
            </Link>
            {contact && <ContactButtons className="justify-center [&_.btn-dark]:bg-white/10 [&_.btn-dark]:hover:bg-white/15 [&_.btn-light]:border-white/20 [&_.btn-light]:bg-transparent [&_.btn-light]:text-white" size="lg" />}
          </div>
        </div>
      </Container>
    </section>
  );
}
