import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Demo } from "@/components/demos";
import { Container, CtaBand, EmailStart, FaqList, SectionHead, ServiceGrid } from "@/components/blocks";
import { SERVICES, getService } from "@/lib/services";
import { getGuide } from "@/lib/guides";
import { JsonLd, ORG_ID, breadcrumbs, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

// Only the six services exist at the root; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export async function generateMetadata(props: PageProps<"/[service]">): Promise<Metadata> {
  const { service } = await props.params;
  const s = getService(service);
  if (!s) return {};
  return pageMetadata({ path: `/${s.slug}`, title: `${s.name} — ${s.title}`, description: s.answer });
}

export default async function ServicePage(props: PageProps<"/[service]">) {
  const { service } = await props.params;
  const s = getService(service);
  if (!s) notFound();

  const guides = s.guides.map(getGuide).filter((g) => g !== undefined);

  return (
    <>
      <section className="halo grain relative pt-32 sm:pt-40">
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-faint">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-white/60">{s.name}</span>
          </nav>
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <p className="eyebrow">{s.eyebrow}</p>
              <h1 className="display mt-5 text-[46px] text-white sm:text-[66px]">{s.title}</h1>
              <p className="mt-6 max-w-lg text-[16.5px] leading-8 text-muted">{s.lede}</p>
              <EmailStart id={`${s.slug}-email`} service={s.slug} className="mt-10" />
            </div>
            <div className="min-w-0">
              <Demo which={s.demo} />
            </div>
          </div>
        </Container>
      </section>

      {/* The quotable answer: a self-contained definition of the service. */}
      <section className="mt-28">
        <Container>
          <div className="mx-auto max-w-3xl border-l border-gold/40 pl-6 sm:pl-8">
            <p className="eyebrow">In short</p>
            <p className="mt-4 font-display text-[22px] leading-[1.5] text-white/90 sm:text-[26px]">{s.answer}</p>
          </div>
        </Container>
      </section>

      <section className="mt-32">
        <Container>
          <SectionHead eyebrow="What's included" title={`${s.name}, specifically.`} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {s.includes.map((it, i) => (
              <div key={it.title} className="bg-ink p-7 sm:p-8">
                <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[18px] text-white">{it.title}</h3>
                <p className="mt-2 text-[14.5px] leading-6 text-muted">{it.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-32">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="How it works" title="In order." />
            <ol className="mt-10 space-y-6">
              {s.steps.map((st, i) => (
                <li key={st.title} className="flex gap-5">
                  <span className="font-mono text-[12px] leading-7 text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[17px] text-white">{st.title}</p>
                    <p className="mt-1 text-[14.5px] leading-6 text-muted">{st.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line p-8 lg:self-start">
            <p className="eyebrow">Plainly</p>
            <ul className="mt-6 space-y-4">
              {s.boundaries.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] leading-7 text-white/75">
                  <span className="mt-[13px] h-px w-3 shrink-0 bg-white/30" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="mt-32">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title={`About ${s.name.toLowerCase()}.`} />
          <FaqList faqs={s.faqs} />
        </Container>
      </section>

      {guides.length > 0 && (
        <section className="mt-32">
          <Container>
            <p className="eyebrow">Related guides</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="glass group rounded-2xl p-7 transition-colors hover:border-line-strong">
                  <p className="display text-[22px] text-white">{g.title}</p>
                  <p className="mt-3 text-[14px] leading-6 text-muted">{g.description}</p>
                  <span className="mt-5 inline-block text-[13px] text-white/50 group-hover:text-gold">
                    Read <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="mt-32">
        <Container>
          <SectionHead eyebrow="Also from Foundry" title="Pair it with." />
          <div className="mt-12">
            <ServiceGrid exclude={s.slug} />
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${SITE.name} ${s.name}`,
          serviceType: s.eyebrow,
          description: s.answer,
          url: `${SITE.url}/${s.slug}`,
          provider: { "@id": ORG_ID },
        }}
      />
      <JsonLd data={faqPage(s.faqs)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: s.name, path: `/${s.slug}` }])} />
    </>
  );
}
