import type { Metadata } from "next";
import { WebsiteLanding } from "@/components/website-landing";
import { OfferView } from "@/components/page-tracker";
import { getService } from "@/lib/services";
import { JsonLd, breadcrumbs, faqPage, service } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";

const P = SEO_PAGES.websiteDevelopment;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

/** /website-development: the premium, ad-ready landing page (owner, 2026-10-23). */
export default function WebsiteDevelopmentPage() {
  const s = getService("website-development")!;
  return (
    <>
      <WebsiteLanding s={s} />
      <OfferView id="website-development" type="website" label="Website development" />
      <JsonLd data={service({ name: "Website development", description: s.answer, path: P.route, serviceType: "Website development" })} />
      <JsonLd data={faqPage(s.faqs)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Website development", path: P.route }])} />
    </>
  );
}
