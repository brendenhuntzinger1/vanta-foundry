import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { CatalogBrowser } from "./catalog-browser";
import { pageMetadata } from "@/lib/metadata";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/catalog",
    title: "Catalog",
    description: "Everything you can order wholesale from the Vanta Labs research catalog. Pick products and send an inquiry on WhatsApp or by email for pricing.",
  }),
  // Product names stay out of search results; the page is for buyers who came
  // through the site. Remove this line to let search engines index it.
  robots: { index: false, follow: true },
};

export default function CatalogPage() {
  const sizes = CATALOG.reduce((n, p) => n + p.sizes.length, 0);
  return (
    <section className="pt-16 sm:pt-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Catalog.</h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-body">
            Everything you can order: {CATALOG.length} products in {sizes} sizes from the Vanta Labs catalog. Tap the sizes
            you want and send us an inquiry. We reply with wholesale pricing.
          </p>
        </div>
        <div className="mt-10">
          <CatalogBrowser />
        </div>
      </Container>
    </section>
  );
}
