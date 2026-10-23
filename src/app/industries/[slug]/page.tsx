import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { IconArrow, IconCheck, IconWhatsApp } from "@/components/icons";
import { ServiceIcon } from "@/components/service-icon";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { getService } from "@/lib/services";
import { JsonLd, ORG_ID, breadcrumbs, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SITE, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMetadata({ path: `/industries/${i.slug}`, title: i.title.replace(/\.$/, ""), description: i.answer });
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const services = i.services.map(getService).filter((s) => s !== undefined);
  const first = services[0]!;
  const others = INDUSTRIES.filter((x) => x.slug !== i.slug);
  const wa = whatsappLink(`Hi Vanta Foundry, I run a ${i.name.toLowerCase()} business and I'd like to talk.`);

  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/industries" className="hover:text-ink">Industries</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{i.name}</span>
          </nav>
          <div className="mt-10 max-w-[820px]">
            <h1 className="h-display text-[40px] text-ink sm:text-[58px]">{i.title}</h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-body">{i.answer}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/start/${first.slug}`} className="btn btn-dark h-12 px-6 text-[15px]">
                Get started <IconArrow />
              </Link>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-12 px-6 text-[15px]">
                  <IconWhatsApp className="text-wa" /> Ask on WhatsApp
                </a>
              )}
            </div>
            <p className="mt-6 text-[13.5px] text-muted">From the team behind {SITE.builtStores.join(", ")} and more.</p>
          </div>
        </Container>
      </section>

      <section className="mt-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-line p-6 sm:p-7">
              <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">Your website</p>
              <p className="mt-1 text-[14px] text-muted">Custom-coded, live in 72 hours to a week.</p>
              <ul className="mt-5 space-y-2.5">
                {i.build.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] text-ink">
                    <IconCheck className="mt-0.5 shrink-0 text-gold" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-6 sm:p-7">
              <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">Getting paid</p>
              <p className="mt-1 text-[14px] text-muted">Every account is subject to approval.</p>
              <p className="mt-5 text-[15.5px] leading-[1.6] text-body">{i.payments}</p>
            </div>
            <div className="rounded-2xl bg-ink p-6 text-white sm:p-7">
              <p className="text-[18px] font-semibold tracking-[-0.02em]">Getting found</p>
              <p className="mt-1 text-[14px] text-white/55">Google, Maps and AI search.</p>
              <p className="mt-5 text-[15.5px] leading-[1.6] text-white/80">{i.search}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <SectionHead title="Where to start." lede="Pick one. Each takes about a minute and opens your request in WhatsApp or email, already written." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/start/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line p-5 transition-colors hover:border-ink">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-2 text-ink"><ServiceIcon slug={s.slug} /></span>
                  <span className="mt-4 text-[16.5px] font-semibold tracking-[-0.02em] text-ink">{s.name}</span>
                  <span className="mt-1.5 flex-1 text-[14px] leading-[1.5] text-muted">{s.short}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink">Get started <IconArrow className="transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="mt-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead label="FAQ" title={`${i.name}, answered.`} />
          <FaqList faqs={i.faqs} />
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <p className="text-[14px] font-medium text-muted">Other industries we build for</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="inline-flex h-10 items-center rounded-full border border-line-2 px-4 text-[14px] text-ink transition-colors hover:border-ink">{o.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: i.title.replace(/\.$/, ""), serviceType: "Website development, payment processing and SEO", audience: { "@type": "BusinessAudience", name: i.name }, description: i.answer, url: `${SITE.url}/industries/${i.slug}`, provider: { "@id": ORG_ID } }} />
      <JsonLd data={faqPage(i.faqs)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: i.name, path: `/industries/${i.slug}` }])} />
    </>
  );
}
