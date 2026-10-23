import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { IconArrow, IconMail, IconWhatsApp } from "@/components/icons";
import { TrackedLink } from "@/components/tracked-link";
import { JsonLd, ORG_ID, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { SITE, emailLink, whatsappLink } from "@/lib/site";

const P = SEO_PAGES.contact;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

/**
 * Two separate ways in, so nobody fills in the wrong one: website projects
 * use the brief on the site (no WhatsApp, owner 2026-10-23); wholesale uses
 * WhatsApp or email.
 */
export default function ContactPage() {
  const wa = whatsappLink("Hi Vanta Foundry, I'd like wholesale pricing.");
  const phone = SITE.whatsapp ? `+${SITE.whatsapp.slice(0, 1)} (${SITE.whatsapp.slice(1, 4)}) ${SITE.whatsapp.slice(4, 7)}-${SITE.whatsapp.slice(7)}` : null;
  return (
    <section className="pt-16 sm:pt-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="h-display text-[42px] text-ink sm:text-[60px]">{P.h1}</h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-body">Pick the one that fits. A person on our team replies, not a bot.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl bg-ink p-7 text-white sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em]">Website Inquiry</h2>
            <p className="mt-2 text-[16px] leading-[1.6] text-white/70">
              A new website, a redesign, a store or a buyer portal, for any business. Answer a few quick questions and send your brief
              from the page. A project lead replies with a written quote and timeline.
            </p>
            <Link href="/start/website-development" className="btn mt-7 h-12 w-fit bg-white px-6 text-[15px] text-ink hover:bg-white/90">
              {P.cta} <IconArrow />
            </Link>
          </div>
          <div className="flex flex-col rounded-2xl border border-line p-7 sm:p-9">
            <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">Wholesale Inquiry</h2>
            <p className="mt-2 text-[16px] leading-[1.6] text-body">
              Research peptides wholesale, factory-direct, white label or 3PL. Build your list in the catalog, or message us the
              products, vial sizes and number of vials. We reply with pricing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn btn-dark h-12 px-6 text-[15px]">Open the catalog</Link>
              {wa && (
                <TrackedLink href={wa} target="_blank" rel="noopener noreferrer" props={{ channel: "whatsapp", form: "contact_page" }} className="btn btn-light h-12 px-6 text-[15px]">
                  <IconWhatsApp className="text-wa" /> WhatsApp
                </TrackedLink>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-2xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">Contact Options</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line text-[15.5px]">
            <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]">
              <dt className="text-muted">Email</dt>
              <dd>
                <TrackedLink href={emailLink()} props={{ channel: "email", form: "contact_page" }} className="inline-flex items-center gap-2 text-ink underline underline-offset-2">
                  <IconMail width={17} height={17} /> {SITE.email}
                </TrackedLink>
              </dd>
            </div>
            {wa && phone && (
              <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]">
                <dt className="text-muted">WhatsApp (wholesale)</dt>
                <dd>
                  <TrackedLink href={wa} target="_blank" rel="noopener noreferrer" props={{ channel: "whatsapp", form: "contact_page" }} className="text-ink underline underline-offset-2">{phone}</TrackedLink>
                </dd>
              </div>
            )}
            <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr]">
              <dt className="text-muted">What happens next</dt>
              <dd className="text-body">We read every inquiry and reply with a written quote, or with questions if we need more detail. Nothing is ordered or charged until you approve a quote.</dd>
            </div>
          </dl>
          <p className="mt-6 text-[14.5px] text-body">
            Other services: <Link href="/payment-processing" className="text-ink underline underline-offset-2">payment processing</Link> and{" "}
            <Link href="/seo-ai-search" className="text-ink underline underline-offset-2">SEO &amp; AI search</Link>, each with a one-minute start.
          </p>
        </div>
      </Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${SITE.url}/contact`, about: { "@id": ORG_ID } }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
    </section>
  );
}
