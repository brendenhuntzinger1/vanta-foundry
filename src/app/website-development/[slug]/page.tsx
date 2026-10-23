import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { IconArrow, IconCheck } from "@/components/icons";
import { OfferView } from "@/components/page-tracker";
import { DEV_SERVICES, getDevService } from "@/lib/dev-services";
import { getGuide } from "@/lib/guides";
import { JsonLd, breadcrumbs, faqPage, service } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { Rich } from "@/lib/rich";

export const dynamicParams = false;

export function generateStaticParams() {
  return DEV_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/website-development/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getDevService(slug);
  if (!s) return {};
  return pageMetadata({ path: s.seo.route, title: s.seo.title, description: s.seo.description });
}

const START = "/start/website-development";

/**
 * One website-development service. Same funnel rules as /website-development:
 * every call to action opens the on-page brief, and there is no WhatsApp.
 */
export default async function DevServicePage(props: PageProps<"/website-development/[slug]">) {
  const { slug } = await props.params;
  const s = getDevService(slug);
  if (!s) notFound();
  const guides = s.guides.map(getGuide).filter((g) => g !== undefined);
  const others = DEV_SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/website-development" className="hover:text-ink">Website development</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{s.name}</span>
          </nav>
          <div className="mt-10 max-w-[820px]">
            <h1 className="h-display text-[40px] leading-[1.02] text-ink sm:text-[60px]">{s.seo.h1}</h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-body">{s.answer}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={START} className="btn btn-dark h-12 px-6 text-[15px]">
                {s.seo.cta} <IconArrow />
              </Link>
              <Link href="/work" className="btn btn-light h-12 px-6 text-[15px]">See our work</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-20 sm:mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div className="prose-foundry min-w-0 max-w-[720px]">
              {s.sections.map((sec) => (
                <section key={sec.h}>
                  <h2>{sec.h}</h2>
                  {sec.p?.map((p) => (
                    <p key={p}>
                      <Rich text={p} />
                    </p>
                  ))}
                  {sec.list && (
                    <ul>
                      {sec.list.map((li) => (
                        <li key={li}>
                          <Rich text={li} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
              <Link href={s.proof.href ?? "/work"} className="group block overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[16/10] bg-bg-2">
                  <Image src="/showcase/vanta-labs-desktop.webp" alt="The Vanta Labs store, built by our team" fill sizes="340px" className="object-cover object-left-top" />
                </div>
                <div className="p-5">
                  <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{s.proof.title}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-body">{s.proof.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">See the work <IconArrow className="transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
              <div className="rounded-2xl bg-ink p-6 text-white">
                <p className="text-[17px] font-semibold tracking-[-0.02em]">Tell us what you need</p>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-white/70">About a minute. A project lead replies with a written quote and timeline.</p>
                <Link href={START} className="btn mt-5 h-11 w-full bg-white text-[14.5px] text-ink hover:bg-white/90">{s.seo.cta}</Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {s.scope && (
        <section className="mt-24">
          <Container className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-bg-2 p-7 sm:p-9">
              <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">Website Development Scope</h2>
              <p className="mt-2 text-[15px] text-muted">Usually in the build</p>
              <ul className="mt-4 space-y-3">
                {s.scope.included.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] text-ink"><IconCheck className="mt-0.5 shrink-0 text-gold" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line p-7 sm:p-9">
              <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">Quoted or handled separately</h2>
              <p className="mt-2 text-[15px] text-muted">Your proposal lists each one</p>
              <ul className="mt-4 space-y-3">
                {s.scope.separate.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] text-body"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-line-2" />{x}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[32px] text-ink sm:text-[44px]">{s.seo.h1} FAQs</h2>
            <div className="mt-8">
              <FaqList faqs={s.faqs} />
            </div>
            <p className="mt-8 text-[16px] leading-[1.65] text-body">
              Related:{" "}
              {s.related.map((r, i) => (
                <span key={r.href}>
                  {i > 0 && (i === s.related.length - 1 ? " and " : ", ")}
                  <Link href={r.href} className="text-ink underline underline-offset-2">{r.label}</Link>
                </span>
              ))}
              .
            </p>
          </div>
        </Container>
      </section>

      {guides.length > 0 && (
        <section className="mt-20">
          <Container>
            <p className="text-[14px] font-medium text-gold">Guides</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="rounded-2xl border border-line p-6 transition-colors hover:border-line-2">
                  <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{g.title}</p>
                  <p className="mt-2 text-[15px] leading-[1.55] text-muted">{g.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="mt-20">
        <Container>
          <p className="text-[14px] font-medium text-gold">More website development</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={o.seo.route} className="inline-flex h-11 items-center rounded-full border border-line-2 px-5 text-[14.5px] text-ink transition-colors hover:border-ink">
                  {o.seo.h1}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Let's build yours."
        lede="Tell us about your project in about a minute. A project lead replies with a quote and a timeline, in writing."
        primary={{ href: START, label: s.seo.cta }}
        contact={false}
      />

      <OfferView id={s.slug} type="website" label={s.seo.h1} />
      <JsonLd data={service({ name: s.seo.h1, description: s.answer, path: s.seo.route, serviceType: "Website development" })} />
      <JsonLd data={faqPage(s.faqs)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Website development", path: "/website-development" },
          { name: s.name, path: s.seo.route },
        ])}
      />
    </>
  );
}
