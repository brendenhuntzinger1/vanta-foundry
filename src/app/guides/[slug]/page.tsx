import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, CtaBand } from "@/components/blocks";
import { GUIDES, getGuide } from "@/lib/guides";
import { getService } from "@/lib/services";
import { JsonLd, ORG_ID, breadcrumbs } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { Rich } from "@/lib/rich";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMetadata({ path: `/guides/${g.slug}`, title: g.title, description: g.description });
}

export default async function GuidePage(props: PageProps<"/guides/[slug]">) {
  const { slug } = await props.params;
  const g = getGuide(slug);
  if (!g) notFound();
  const services = g.services.map(getService).filter((s) => s !== undefined);
  const updated = new Date(`${g.updated}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <article className="halo grain relative pt-32 sm:pt-40">
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-faint">
            <Link href="/guides" className="hover:text-white">
              Guides
            </Link>
          </nav>
          <div className="mx-auto max-w-[720px]">
            <h1 className="display mt-8 text-[40px] text-white sm:text-[58px]">{g.title}</h1>
            <p className="mt-5 text-[13px] text-faint">
              Updated <time dateTime={g.updated}>{updated}</time> · {SITE.name}
            </p>

            <div className="mt-12 rounded-2xl border border-gold/25 bg-gold/[0.04] p-7">
              <p className="text-[12px] uppercase tracking-[0.18em] text-gold/80">Short answer</p>
              <p className="mt-2 text-[13.5px] text-white/50">{g.question}</p>
              <p className="mt-4 text-[17px] leading-8 text-white/90">{g.answer}</p>
            </div>

            <div className="prose-foundry mt-6">
              {g.sections.map((sec) => (
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

            {services.length > 0 && (
              <div className="mt-16 border-t border-line pt-10">
                <p className="eyebrow">Related services</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} className="btn-ghost rounded-full px-5 py-2.5 text-[13.5px]">
                      {s.name} <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </article>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          dateModified: g.updated,
          datePublished: g.updated,
          mainEntityOfPage: `${SITE.url}/guides/${g.slug}`,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{ "@type": "Question", name: g.question, acceptedAnswer: { "@type": "Answer", text: g.answer } }],
        }}
      />
      <JsonLd
        data={breadcrumbs([
          { name: "Guides", path: "/guides" },
          { name: g.title, path: `/guides/${g.slug}` },
        ])}
      />
    </>
  );
}
