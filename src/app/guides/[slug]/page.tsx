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
      <article className="pt-12 sm:pt-16">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
              <Link href="/guides" className="hover:text-ink">Guides</Link>
            </nav>
            <h1 className="h-display mt-6 text-[38px] text-ink sm:text-[54px]">{g.title}</h1>
            <p className="mt-4 text-[14px] text-muted">
              Updated <time dateTime={g.updated}>{updated}</time> · {SITE.name}
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-bg-2 p-6 sm:p-7">
              <p className="text-[14px] font-medium text-gold">Short answer</p>
              <p className="mt-1 text-[14px] text-muted">{g.question}</p>
              <p className="mt-3 text-[17.5px] leading-[1.65] text-ink">{g.answer}</p>
            </div>

            <div className="prose-foundry mt-4">
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
              <div className="mt-14 border-t border-line pt-8">
                <p className="text-[14px] font-medium text-gold">Related services</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/${s.slug}`} className="btn btn-light h-10 px-5 text-[14px]">
                      {s.name}
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
