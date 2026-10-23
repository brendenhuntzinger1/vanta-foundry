import Link from "next/link";
import type { Metadata } from "next";
import { Container, CtaBand, FaqList } from "@/components/blocks";
import { IconMail, IconWhatsApp } from "@/components/icons";
import { OfferView } from "@/components/page-tracker";
import { TrackedLink } from "@/components/tracked-link";
import { QUANTITY_NOTE } from "@/lib/catalog";
import { JsonLd, breadcrumbs, faqPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";
import { SEO_PAGES } from "@/lib/seo-pages";
import { RUO_NOTICE, emailLink, whatsappLink } from "@/lib/site";

const P = SEO_PAGES.ordering;

export const metadata: Metadata = pageMetadata({ path: P.route, title: P.title, description: P.description });

const STEPS = [
  {
    h: "Prepare Inquiry",
    p: "Send what you need in one message. The catalog builds it for you: tap Add to list on each product, then send.",
    list: ["Each product, its vial size and the number of vials", "Your business name", "Where it ships (city, state or country)", "Labelling (white label) or storage and shipping (3PL), if you want them", "A standing or repeat requirement, if you have one"],
  },
  {
    h: "Receive Quote",
    p: "A person on our team replies with a written quote: pricing for your products, sizes and quantities, availability, and the timing. Before you approve it, make sure you have answers to these, and ask about anything the quote doesn't state:",
    list: ["The unit price for each product, size and quantity", "Whether everything is available, or what would be sourced factory-direct instead", "The lot you'll receive and its laboratory report", "Shipping method and lead time to your destination", "How long the price holds, and how and when payment is made"],
  },
  {
    h: "Confirm Details",
    p: "Check the quote against what you asked for: products, sizes, quantities, lot and destination. Ask about anything that's unclear before you confirm. An inquiry is not an order; nothing is ordered or charged until you approve a quote.",
  },
  {
    h: "Delivery",
    p: "We ship to you, or store the stock and ship each order as your brand from our warehouse. Orders from stock ship from Tampa Bay, Florida, to addresses in the United States; factory-direct orders can ship internationally, straight from the factory. Tracking is sent when it ships. When it arrives, check the lot numbers on the vials against the report named on your quote.",
  },
  {
    h: "Reorders",
    p: "Reply to your last quote to order the same again, or set up a standing order so you don't re-order by hand. You don't need to start a new inquiry for a repeat order.",
  },
];

const FAQS = [
  { q: "What is the minimum order quantity?", a: "No minimum order quantity (MOQ) is published. Minimums depend on the products and quantities; ask, and confirm it on your quote." },
  { q: "What are the payment terms?", a: "None are published. Ask how and when payment is made before you approve a quote, and get the answer in writing." },
  { q: "Is there tiered pricing?", a: "Yes. Wholesale pricing improves with quantity, and your quote shows the price for the quantities you ask about." },
  { q: "How long is a quote valid?", a: "Ask when you receive it, and confirm it in writing before you rely on the price. Pricing depends on current availability, so a quote isn't open-ended." },
  { q: "Where do you ship?", a: "Orders from our stock, including white label and 3PL orders, ship from Tampa Bay, Florida, to addresses in the United States only. Factory-direct orders can ship directly from the factory to other countries; your quote confirms the destination, method and lead time." },
  { q: "What determines lead time?", a: "The products, quantities, whether they're in stock or made to order (factory-direct), labelling, and the destination. The quote states the lead time before you commit." },
  { q: "Do I need an account to ask for pricing?", a: "No. Send your list on WhatsApp or by email; there's nothing to sign up for." },
  { q: "Which units are quantities in?", a: `Vials. ${QUANTITY_NOTE}` },
];

export default function OrderingPage() {
  const msg = "Hi Vanta Foundry, I'd like to start a wholesale inquiry.\n\nProducts and vial sizes: \nNumber of vials: \nBusiness name: \nShip to: ";
  const wa = whatsappLink(msg);
  const mail = emailLink("Wholesale inquiry", msg);
  return (
    <>
      <section className="pt-12 sm:pt-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href="/wholesale" className="hover:text-ink">Wholesale</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-ink">Ordering</span>
          </nav>
          <div className="mt-10 max-w-[820px]">
            <h1 className="h-display text-[40px] leading-[1.02] text-ink sm:text-[58px]">{P.h1}</h1>
            <p className="mt-6 text-[18px] leading-[1.65] text-body">
              A wholesale order starts with one message: the products, vial sizes and number of vials you need. We reply with a written
              quote. You confirm it, and we ship. No prices or minimums are published, because both depend on what you order.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn btn-dark h-12 px-6 text-[15px]">{P.cta}</Link>
              {wa && (
                <TrackedLink href={wa} target="_blank" rel="noopener noreferrer" props={{ channel: "whatsapp", form: "ordering_page" }} className="btn btn-light h-12 px-6 text-[15px]">
                  <IconWhatsApp className="text-wa" /> WhatsApp us
                </TrackedLink>
              )}
              <TrackedLink href={mail} props={{ channel: "email", form: "ordering_page" }} className="btn btn-light h-12 px-6 text-[15px]">
                <IconMail /> Email us
              </TrackedLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-20">
        <Container>
          <ol className="mx-auto max-w-[820px] divide-y divide-line border-y border-line">
            {STEPS.map((s) => (
              <li key={s.h} className="py-8">
                <h2 className="text-[24px] font-semibold tracking-[-0.025em] text-ink">{s.h}</h2>
                <p className="mt-3 text-[16.5px] leading-[1.65] text-body">{s.p}</p>
                {s.list && (
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[16px] leading-[1.6] text-body">
                    {s.list.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <h2 className="h-section text-[32px] text-ink sm:text-[44px]">Ordering questions</h2>
            <div className="mt-8">
              <FaqList faqs={FAQS} />
            </div>
            <p className="mt-8 text-[15px] leading-[1.6] text-body">
              Before you order: <Link href="/wholesale/testing" className="text-ink underline underline-offset-2">batch testing documentation</Link> and{" "}
              <Link href="/guides/prepare-wholesale-order" className="text-ink underline underline-offset-2">how to prepare a wholesale peptide order</Link>.
            </p>
            <p className="mt-8 text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          </div>
        </Container>
      </section>

      <CtaBand title="Start a wholesale inquiry." lede="Build your list in the catalog and send it on WhatsApp or by email." primary={{ href: "/catalog", label: "Open the catalog" }} />

      <OfferView id="wholesale-ordering" type="wholesale" label="Wholesale ordering" />
      <JsonLd data={faqPage(FAQS)} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Wholesale", path: "/wholesale" }, { name: "Ordering", path: P.route }])} />
    </>
  );
}
