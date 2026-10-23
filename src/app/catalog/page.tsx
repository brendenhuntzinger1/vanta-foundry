import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { CatalogTable } from "./catalog-table";
import { pageMetadata } from "@/lib/metadata";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/catalog",
    title: "Catalog & wholesale pricing",
    description: "The Vanta Labs research catalog with wholesale pricing. Add quantities and send your order request on WhatsApp or by email.",
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
          <h1 className="h-display text-[42px] text-ink sm:text-[60px]">Catalog & pricing.</h1>
          <p className="mt-5 text-[18px] leading-[1.6] text-body">
            The full Vanta Labs catalog: {CATALOG.length} products in {sizes} sizes. Enter how many you want, then send the
            list to us. We confirm the final price before you pay.
          </p>
        </div>
        <div className="mt-10">
          <CatalogTable />
        </div>
      </Container>
    </section>
  );
}
