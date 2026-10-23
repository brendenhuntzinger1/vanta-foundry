import { SITE } from "./site";

/** Renders one JSON-LD block. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ORG_ID = `${SITE.url}/#organization`;

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    ...(SITE.whatsapp ? { telephone: `+${SITE.whatsapp}` } : {}),
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, ...(SITE.whatsapp ? { telephone: `+${SITE.whatsapp}` } : {}), availableLanguage: "English" },
    knowsAbout: ["Website development", "Ecommerce website development", "B2B ecommerce portals", "Wholesale research peptides", "Certificates of analysis", "Private label research supply", "Third-party logistics", "Payment processing", "Search engine optimization"],
    areaServed: "US",
    parentOrganization: { "@type": "Organization", name: SITE.parent, url: SITE.parentUrl },
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export const WEBSITE_ID = `${SITE.url}/#website`;

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** A service we actually sell, provided by the organization. */
export function service({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}${path}#service`,
    name,
    description,
    url: `${SITE.url}${path}`,
    ...(serviceType ? { serviceType } : {}),
    provider: { "@id": ORG_ID },
  };
}

/**
 * A catalog product. No `offers`: prices are sent on inquiry, and markup must
 * match what the page shows, so none is invented here.
 */
export function product({ name, description, path, image, category, sizes }: { name: string; description: string; path: string; image: string; category: string; sizes: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.url}${path}#product`,
    name,
    description,
    url: `${SITE.url}${path}`,
    image,
    category,
    brand: { "@type": "Brand", name: SITE.parent },
    additionalProperty: sizes.map((s) => ({ "@type": "PropertyValue", name: "Vial size", value: s })),
  };
}

export function itemList(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${SITE.url}${it.path}` })),
  };
}
