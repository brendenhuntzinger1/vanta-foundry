import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { IconArrow, IconMail, IconWhatsApp } from "@/components/icons";
import { SERVICES } from "@/lib/services";
import { JsonLd, ORG_ID, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SITE, emailLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description: `Talk to ${SITE.name} on WhatsApp or by email at ${SITE.email}. A person on our team replies.`,
});

export default function ContactPage() {
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  const phone = SITE.whatsapp ? `+${SITE.whatsapp.slice(0, 1)} (${SITE.whatsapp.slice(1, 4)}) ${SITE.whatsapp.slice(4, 7)}-${SITE.whatsapp.slice(7)}` : null;
  return (
    <section className="pt-16 sm:pt-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Talk to us.</h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-body">Message us on WhatsApp or send an email. A person on our team replies, not a bot.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="group rounded-2xl bg-ink p-7 text-white">
              <IconWhatsApp className="text-wa" width={28} height={28} />
              <p className="mt-5 text-[22px] font-semibold tracking-[-0.02em]">WhatsApp</p>
              <p className="mt-1 text-[16px] text-white/70">{phone}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium">Open WhatsApp <IconArrow /></span>
            </a>
          )}
          <a href={emailLink()} className="group rounded-2xl border border-line p-7">
            <IconMail width={28} height={28} className="text-ink" />
            <p className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink">Email</p>
            <p className="mt-1 text-[16px] text-body">{SITE.email}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">Write to us <IconArrow /></span>
          </a>
        </div>
        <div className="mt-14">
          <p className="text-[14px] font-medium text-muted">Know what you need? Start there, it takes a minute.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/start/${s.slug}`} className="inline-flex h-10 items-center rounded-full border border-line-2 px-4 text-[14px] text-ink transition-colors hover:border-ink">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${SITE.url}/contact`, about: { "@id": ORG_ID } }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </section>
  );
}
