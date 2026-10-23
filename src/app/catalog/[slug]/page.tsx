import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { IconArrow, IconMail, IconWhatsApp } from "@/components/icons";
import { AddToInquiry } from "@/components/inquiry";
import { OfferView } from "@/components/page-tracker";
import { ReportList } from "@/components/report-list";
import { TrackedLink } from "@/components/tracked-link";
import { CATALOG, QUANTITY_NOTE, getProduct, productPath, relatedProducts, type CatalogProduct } from "@/lib/catalog";
import { PRODUCT_FACTS, STORE_FACTS_READ_ON, type ProductFacts } from "@/lib/product-facts";
import { JsonLd, breadcrumbs, faqPage, product } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { productSeo } from "@/lib/seo-pages";
import { RUO_NOTICE, SITE, emailLink, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/catalog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  const seo = productSeo(p.name);
  return {
    ...pageMetadata({ path: productPath(p.slug), title: seo.title, description: seo.description }),
    openGraph: { title: seo.title, description: seo.description, url: productPath(p.slug), siteName: SITE.name, type: "website", images: [{ url: p.image }] },
  };
}

const spec = (f: ProductFacts, label: string) => f.specs.find(([l]) => l === label)?.[1];

/** One plain sentence of what the product is, built only from published identity data. */
function intro(p: CatalogProduct, f: ProductFacts) {
  const desc = spec(f, "Description");
  const form = spec(f, "Supplied form");
  const sizes = p.sizes.join(", ");
  const what = desc ? (/^[A-Z][a-z]/.test(desc) ? `${desc.charAt(0).toLowerCase()}${desc.slice(1)}` : desc) : p.category.toLowerCase();
  // Skip what the description already says (blends name their form and total).
  const saysForm = desc && /lyophilized|solution|liquid|powder/i.test(desc);
  const saysSize = desc && /\d\s?(mg|mL|IU)\b.*total|\d+\s?mL\b/i.test(desc);
  return `${p.name}: ${what}${form && !saysForm ? `, supplied as ${form.toLowerCase()}` : ""}${saysSize ? "" : `, in ${p.sizes.length > 1 ? "vial sizes of " : "a "}${sizes}${p.sizes.length > 1 ? "" : " vial"}`}.`;
}

function productFaqs(p: CatalogProduct, f: ProductFacts) {
  const verified = f.reports.filter((r) => r.status === "product_match");
  const reference = f.reports.filter((r) => r.status === "reference");
  const list = (rs: typeof f.reports) => rs.map((r) => `${r.id}${r.size ? ` (${r.size})` : ""}, ${r.lab}, ${r.date}`).join("; ");
  return [
    {
      q: `What sizes is ${p.name} available in for wholesale?`,
      a: `${p.sizes.join(", ")}. ${QUANTITY_NOTE} Tell us how many vials of each size you need and we reply with pricing.`,
    },
    {
      q: `Is a certificate of analysis published for ${p.name}?`,
      a: verified.length
        ? `Yes. Vanta Labs publishes ${verified.length === 1 ? "a laboratory report that matches" : `${verified.length} laboratory reports that match`} this product and size: ${list(verified)}. That doesn't by itself confirm the batch you'd receive.${reference.length ? ` A further report is reference only: ${reference.map((r) => r.note).join(" ")}` : ""} Your quote names the lot you'll receive and its report.`
        : reference.length
          ? `Not for the size or lot sold. A reference report is published (${list(reference)}), but ${reference.map((r) => r.note?.replace(/^./, (c) => c.toLowerCase())).join(" ")} Ask for the report for your lot before you order.`
          : `Not yet. No laboratory report has been published for ${p.name}. Ask for the documentation for your lot before you order.`,
    },
    {
      q: `Can I add ${p.name} to one inquiry with other products?`,
      a: "Yes. Tap Add to inquiry on each product you want, choose the size and number of vials for each, then send the whole list on WhatsApp or by email.",
    },
    {
      q: `Is there a minimum order for ${p.name}?`,
      a: "No minimum is published. Minimums depend on the products and quantities, so tell us what you need and the quote confirms it.",
    },
    {
      q: `Is ${p.name} for human use?`,
      a: "No. It is supplied for laboratory research use only. Not for human or veterinary use, and not a drug, food, cosmetic or dietary supplement.",
    },
  ];
}

export default async function ProductPage(props: PageProps<"/catalog/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();
  const f = PRODUCT_FACTS[p.slug] ?? { specs: [], reports: [] };
  const seo = productSeo(p.name);
  const faqs = productFaqs(p, f);
  const related = relatedProducts(p, 4);
  const msg = [`Hi Vanta Foundry, I'd like wholesale pricing for ${p.name} (${p.sizes.join(" / ")}).`, "", "Vial size: ", "Number of vials: ", "Business name: ", "Ship to: "].join("\n");
  const wa = whatsappLink(msg);
  const mail = emailLink(`Wholesale inquiry: ${p.name}`, msg);
  const specRows = f.specs.filter(([l]) => l !== "Name");

  return (
    <>
      <section className="pt-10 sm:pt-14">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/catalog" className="hover:text-ink">Wholesale catalog</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">{p.name}</span>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-bg-2">
              <Image src={p.image} alt={`${p.name} vial`} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" priority />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] text-muted">{p.category}</p>
              <h1 className="h-display mt-2 text-[38px] leading-[1.02] text-ink sm:text-[54px]">{seo.h1}</h1>
              <p className="mt-5 text-[17.5px] leading-[1.6] text-body">{intro(p, f)} Request wholesale pricing for the sizes and quantities you need.</p>
              <p className="mt-3 text-[14.5px] text-muted">{QUANTITY_NOTE}</p>
              <AddToInquiry slug={p.slug} sizes={p.sizes} className="mt-7" />
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14.5px]">
                <span className="text-muted">{seo.cta} on</span>
                {wa && (
                  <TrackedLink href={wa} target="_blank" rel="noopener noreferrer" props={{ channel: "whatsapp", form: "product_page", product: p.slug }} className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-2">
                    <IconWhatsApp className="text-wa" /> WhatsApp
                  </TrackedLink>
                )}
                <TrackedLink href={mail} props={{ channel: "email", form: "product_page", product: p.slug }} className="inline-flex items-center gap-1.5 font-medium text-ink underline underline-offset-2">
                  <IconMail width={17} height={17} /> Email
                </TrackedLink>
              </div>
              <p className="mt-7 rounded-2xl border border-line bg-bg-2 px-5 py-4 text-[13.5px] leading-[1.55] text-body">
                For laboratory research use only. Not for human or veterinary use. No prices are listed: we reply with pricing and current availability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="h-section text-[28px] text-ink sm:text-[36px]">Specifications</h2>
            {f.composition && (
              <div className="mt-6">
                <p className="text-[14px] font-medium text-ink">Composition, as labelled on the laboratory report</p>
                <dl className="mt-2 divide-y divide-line border-y border-line">
                  {f.composition.map(([c, amt]) => (
                    <div key={c} className="grid grid-cols-[1fr_auto] gap-4 py-3 text-[15px]">
                      <dt className="text-ink">{c}</dt>
                      <dd className="font-mono text-[13.5px] text-body">{amt}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                <dt className="text-[14px] text-muted">Catalog name</dt>
                <dd className="text-[15px] text-ink">{p.name}</dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                <dt className="text-[14px] text-muted">Category</dt>
                <dd className="text-[15px] text-ink">{p.category}</dd>
              </div>
              {specRows.map(([l, v]) => (
                <div key={l} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
                  <dt className="text-[14px] text-muted">{l === "Available sizes" ? "Vial sizes" : l}</dt>
                  <dd className={`min-w-0 break-words text-[15px] text-ink ${/formula|CAS|UNII|Sequence/.test(l) ? "font-mono text-[13.5px]" : ""}`}>{v}</dd>
                </div>
              ))}
            </dl>
            {f.notes?.map((n) => (
              <p key={n} className="mt-3 text-[13.5px] leading-[1.55] text-muted">{n}</p>
            ))}
            <p className="mt-4 text-[13px] leading-[1.6] text-muted">
              Identity data as published by Vanta Labs
              {f.sources?.length ? (
                <>
                  , citing{" "}
                  {f.sources.map(([label, url], i) => (
                    <span key={url}>
                      {i > 0 && " and "}
                      <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">{label}</a>
                    </span>
                  ))}
                </>
              ) : null}
              . Read {STORE_FACTS_READ_ON}.
            </p>
            {f.status?.length ? (
              <div className="mt-8">
                <h3 className="text-[16px] font-semibold text-ink">Regulatory status</h3>
                <ul className="mt-2 space-y-1.5 text-[14.5px] leading-[1.6] text-body">
                  {f.status.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="min-w-0">
            <h2 className="h-section text-[28px] text-ink sm:text-[36px]">Testing and documentation</h2>
            {f.reports.length ? (
              <>
                <p className="mt-4 text-[15.5px] leading-[1.65] text-body">
                  Laboratory reports Vanta Labs has published, with the size and batch exactly as printed on each. <strong className="font-semibold text-ink">Matches product and size</strong> means the report&rsquo;s product and labelled size match this listing; it doesn&rsquo;t confirm the batch in current wholesale stock. A <strong className="font-semibold text-ink">reference</strong> report doesn&rsquo;t match the size or lot we list, and says why. Your quote names the lot you&rsquo;ll receive and its report.
                </p>
                <div className="mt-5">
                  <ReportList reports={f.reports} />
                </div>
              </>
            ) : (
              <p className="mt-4 text-[15.5px] leading-[1.65] text-body">
                No laboratory report has been published for {p.name} yet. Ask for the documentation for your lot before you order; we&rsquo;ll tell you plainly whether one exists.
              </p>
            )}
            <p className="mt-5 text-[14.5px] leading-[1.6] text-body">
              What each test shows, and what it doesn&rsquo;t: <Link href="/wholesale/testing" className="text-ink underline underline-offset-2">peptide testing and batch COAs</Link>.
            </p>

            <h2 className="h-section mt-14 text-[28px] text-ink sm:text-[36px]">Pricing, availability and shipping</h2>
            <ul className="mt-5 space-y-3 text-[15.5px] leading-[1.6] text-body">
              <li><strong className="font-semibold text-ink">Pricing</strong> is quoted for your sizes and number of vials. Send the quantity you have in mind; the quote is in writing.</li>
              <li><strong className="font-semibold text-ink">Availability</strong> is confirmed on your quote. Selecting a product here reserves nothing.</li>
              <li><strong className="font-semibold text-ink">Shipping and lead time</strong> depend on the quantity and destination, and are stated on the quote before you commit. We can also store and ship it for you as your brand (<Link href="/fulfillment" className="text-ink underline underline-offset-2">3PL</Link>), or put your <Link href="/white-label" className="text-ink underline underline-offset-2">label</Link> on every vial.</li>
            </ul>
            <p className="mt-5 text-[14.5px] text-body">
              Step by step: <Link href="/wholesale/ordering" className="text-ink underline underline-offset-2">how wholesale ordering works</Link>.
            </p>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[28px] text-ink sm:text-[36px]">{p.name} wholesale questions</h2>
            <div className="mt-8">
              <FaqList faqs={faqs} />
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h-section text-[28px] text-ink sm:text-[36px]">Related products</h2>
            <Link href="/catalog" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline underline-offset-4">
              The full catalog <IconArrow />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={productPath(r.slug)} className="group block overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-[4/5] bg-bg-2">
                    <Image src={r.image} alt="" fill sizes="(min-width: 1024px) 270px, 50vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-[12px] text-muted">{r.category}</p>
                    <p className="mt-0.5 text-[15.5px] font-semibold tracking-[-0.02em] text-ink group-hover:underline">{r.name}</p>
                    <p className="mt-1 font-mono text-[12px] text-body">{r.sizes.join(" · ")}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-body">
            Ordering several products? Read <Link href="/guides/prepare-wholesale-order" className="text-ink underline underline-offset-2">how to prepare a wholesale peptide order</Link>.
          </p>
          <p className="mt-10 max-w-3xl text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
        </Container>
      </section>

      <CtaBand
        title={`Get ${p.name} wholesale pricing.`}
        lede="Add it to your inquiry, with anything else you need, and send it on WhatsApp or by email. A person on our team replies with pricing."
        primary={{ href: "/catalog", label: "Browse the catalog" }}
      />

      <OfferView id={`product:${p.slug}`} type="wholesale" label={`${p.name} (product page)`} />
      <JsonLd data={product({ name: p.name, description: intro(p, f), path: productPath(p.slug), image: p.image, category: p.category, sizes: p.sizes })} />
      <JsonLd data={faqPage(faqs)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Wholesale catalog", path: "/catalog" },
          { name: p.name, path: productPath(p.slug) },
        ])}
      />
    </>
  );
}
