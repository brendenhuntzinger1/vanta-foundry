import type { Metadata } from "next";
import { Container } from "@/components/blocks";
import { CatalogBrowser } from "./catalog-browser";
import { pageMetadata } from "@/lib/metadata";
import { CATALOG } from "@/lib/catalog";
import { ContactButtons } from "@/components/contact-buttons";

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/catalog",
    title: "Catalog",
    description: "Products we supply in bulk, plus factory-direct sourcing, white label and 3PL for anything else. Tap Inquire for wholesale pricing on WhatsApp.",
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
            {CATALOG.length} products in {sizes} sizes, ready to supply in bulk. No prices are listed: tap{" "}
            <strong className="font-semibold text-ink">Inquire</strong> on any product and we reply on WhatsApp with wholesale
            pricing.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-bg-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <p className="text-[17px] font-semibold text-ink">Don&rsquo;t see what you need?</p>
            <p className="mt-1.5 text-[15.5px] leading-[1.6] text-body">
              This is what we have ready to go. For anything else, we source it factory-direct, label it with your brand and
              store and ship it for you (3PL).
            </p>
          </div>
          <ContactButtons
            single
            message="Hi Vanta Foundry, I'm looking for a product that isn't in your catalog:"
            subject="Product request"
            className="shrink-0"
          />
        </div>
        <div className="mt-10">
          <CatalogBrowser />
        </div>
      </Container>
    </section>
  );
}
