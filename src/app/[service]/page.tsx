import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Demo } from "@/components/demos";
import { Container, CtaBand, FaqList, SectionHead } from "@/components/blocks";
import { ContactButtons } from "@/components/contact-buttons";
import { IconArrow, IconCheck } from "@/components/icons";
import { ServiceIcon } from "@/components/service-icon";
import { LabelGallery } from "@/components/label-gallery";
import { CardBrands } from "@/components/card-brands";
import { OfferView } from "@/components/page-tracker";
import { SERVICES, getService } from "@/lib/services";
import { getGuide } from "@/lib/guides";
import { JsonLd, breadcrumbs, faqPage, service } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES, type SeoPage } from "@/lib/seo-pages";

export const dynamicParams = false;

/** Services with their own route folder (src/app/<slug>), not this template. */
const DEDICATED = new Set(["website-development", "wholesale"]);

/** Approved title and H1 for the services the search brief covers. */
const SEO: Record<string, SeoPage> = {
  "white-label": SEO_PAGES.privateLabel,
  fulfillment: SEO_PAGES.fulfillment,
  "factory-direct": SEO_PAGES.factoryDirect,
};

export function generateStaticParams() {
  return SERVICES.filter((s) => !DEDICATED.has(s.slug)).map((s) => ({ service: s.slug }));
}

export async function generateMetadata(props: PageProps<"/[service]">): Promise<Metadata> {
  const { service } = await props.params;
  const s = getService(service);
  if (!s) return {};
  const seo = SEO[s.slug];
  return pageMetadata({ path: `/${s.slug}`, title: seo?.title ?? s.name, description: seo?.description ?? s.answer });
}

export default async function ServicePage(props: PageProps<"/[service]">) {
  const { service: slug } = await props.params;
  const s = getService(slug);
  if (!s || DEDICATED.has(s.slug)) notFound();
  const seo = SEO[s.slug];
  const guides = s.guides.map(getGuide).filter((g) => g !== undefined);
  const others = SERVICES.filter((x) => x.slug !== s.slug);
  const supply = ["factory-direct", "white-label", "fulfillment"].includes(s.slug);

  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            {supply && (
              <>
                <Link href="/supply" className="hover:text-ink">Wholesale &amp; 3PL</Link>
                <span className="mx-2" aria-hidden="true">/</span>
              </>
            )}
            <span className="text-ink">{s.name}</span>
          </nav>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-[15px] font-medium text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-2"><ServiceIcon slug={s.slug} /></span>
                {s.name}
              </p>
              <h1 className="h-display mt-6 text-[40px] text-ink sm:text-[56px]">{seo?.h1 ?? s.title}</h1>
              {seo && <p className="mt-4 text-[21px] font-medium tracking-[-0.02em] text-ink">{s.title}</p>}
              <p className="mt-5 text-[18px] leading-[1.6] text-body">{s.answer}</p>
              {s.slug === "payment-processing" && <CardBrands className="mt-5" />}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/start/${s.slug}`} className="btn btn-dark h-12 px-6 text-[15px]">
                  {seo?.cta ?? "Get started"} <IconArrow />
                </Link>
                {supply && (
                  <Link href="/catalog" className="btn btn-light h-12 px-6 text-[15px]">See the catalog</Link>
                )}
              </div>
            </div>
            <div className="min-w-0">
              <Demo which={s.demo} />
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-28">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-7 sm:p-9">
            <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">Who it&rsquo;s for</h2>
            <p className="mt-3 text-[16.5px] leading-[1.6] text-body">{s.forWho}</p>
            <h2 className="mt-9 text-[22px] font-semibold tracking-[-0.025em] text-ink">How it works</h2>
            <ol className="mt-4 space-y-3">
              {s.steps.map((st, i) => (
                <li key={st} className="flex gap-3 text-[16px] text-body">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-white">{i + 1}</span>
                  {st}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-bg-2 p-7 sm:p-9">
            <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-ink">What you get</h2>
            <ul className="mt-4 space-y-3">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-[16px] text-ink">
                  <IconCheck className="mt-0.5 shrink-0 text-gold" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[14.5px] text-muted">Questions first? Talk to us.</p>
              <ContactButtons className="mt-3" message={`Hi Vanta Foundry, I have a question about ${s.name.toLowerCase()}.`} subject={`Question about ${s.name}`} />
            </div>
          </div>
        </Container>
      </section>

      {s.slug === "white-label" && (
        <section className="mt-28">
          <Container>
            <SectionHead label="Label styles" title="Make it look like yours." lede="Our own Vanta Labs label, and five other directions a brand can take. Every label carries the lot number and the research-use statement." />
            <div className="mt-10">
              <LabelGallery />
            </div>
          </Container>
        </section>
      )}

      {supply && (
        <section className="mt-24">
          <Container>
            <p className="max-w-2xl text-[16px] leading-[1.65] text-body">
              Supply starts from the{" "}
              <Link href="/catalog" className="text-ink underline underline-offset-2">wholesale peptide catalog</Link>. Each lot is documented: see{" "}
              <Link href="/wholesale/testing" className="text-ink underline underline-offset-2">batch testing documentation</Link> and{" "}
              <Link href="/wholesale/ordering" className="text-ink underline underline-offset-2">how wholesale ordering works</Link>.
            </p>
          </Container>
        </section>
      )}

      <section className="mt-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead label="FAQ" title={`${s.name}, answered.`} />
          <FaqList faqs={s.faqs} />
        </Container>
      </section>

      {guides.length > 0 && (
        <section className="mt-24">
          <Container>
            <p className="text-[14px] font-medium text-gold">Further reading</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {guides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-2xl border border-line p-6 transition-colors hover:border-line-2">
                  <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{g.title}</p>
                  <p className="mt-2 text-[15px] leading-[1.55] text-muted">{g.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="mt-24">
        <Container>
          <p className="text-[14px] font-medium text-gold">Other services</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} className="flex items-center gap-3 rounded-xl border border-line p-4 text-[15px] font-medium text-ink transition-colors hover:border-line-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-2"><ServiceIcon slug={o.slug} /></span>
                {o.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <OfferView id={s.slug} type={supply ? "wholesale" : "website"} label={s.name} />
      <JsonLd data={service({ name: seo?.h1 ?? s.name, description: s.answer, path: `/${s.slug}` })} />
      <JsonLd data={faqPage(s.faqs)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          ...(supply ? [{ name: "Wholesale & 3PL", path: "/supply" }] : []),
          { name: s.name, path: `/${s.slug}` },
        ])}
      />
    </>
  );
}
