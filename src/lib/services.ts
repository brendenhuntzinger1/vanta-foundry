/**
 * The six services. The home page, the service pages, the "choose your
 * services" picker, the sitemap, JSON-LD and llms.txt all read from here.
 *
 * WRITE FOR SOMEONE IN A HURRY. Every service answers three questions in plain
 * words: what is it, is it for me, what do I get. No prices, rates, minimums
 * or lead times are stated, because none has been set; each is quoted.
 * Research-supply copy follows docs/COMPLIANCE.md (research use only, no
 * usage or outcome claims).
 */

export type DemoKey = "payments" | "wholesale" | "factory" | "label" | "fulfillment" | "website";

export type Service = {
  slug: string;
  name: string;
  /** One line, used on cards and the picker. */
  short: string;
  /** Page headline. */
  title: string;
  /** The quotable answer: what it is, in two or three sentences. */
  answer: string;
  /** Who it is for, one sentence. */
  forWho: string;
  includes: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
  demo: DemoKey;
  guides: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "payment-processing",
    name: "Payment processing",
    short: "Processing that keeps you taking payments: cards, Apple Pay and Google Pay, with a backup ready.",
    title: "Processing that keeps you taking payments.",
    answer:
      "Vanta Foundry sets up payment processing for online businesses: a merchant account to accept card payments, connected to your checkout, with a second processor on standby so a closure or outage doesn't stop your sales. Declined and abandoned checkouts get a follow-up text or email.",
    forWho: "Businesses in any industry, including the ones mainstream processors are quick to turn down.",
    includes: [
      "Accept Visa, Mastercard, Amex, Discover, Apple Pay and Google Pay",
      "A backup processor connected and ready",
      "Switching processors is a setting, not a new website",
      "Follow-up texts and emails for declined and abandoned checkouts",
    ],
    steps: ["Tell us what you sell and roughly how much", "We set up your account and connect it to your checkout", "You start taking payments"],
    faqs: [
      { q: "What will it cost?", a: "Rates depend on your business and volume, so we quote them for you. There is no published rate card." },
      { q: "Can anyone get approved?", a: "Every merchant account is subject to approval. Tell us what you sell up front and we will tell you honestly whether we can help." },
      { q: "What happens if a processor closes my account?", a: "Your checkout already has a backup connected, so you switch to it instead of rebuilding. Sales keep going." },
      { q: "Do I need a website from you to use this?", a: "No. We can connect payments to the website you already have." },
    ],
    demo: "payments",
    guides: ["why-run-a-backup-payment-processor"],
  },
  {
    slug: "wholesale",
    name: "Wholesale supply",
    short: "Buy our in-stock products in bulk, at wholesale prices.",
    title: "The Vanta catalog, at wholesale prices.",
    answer:
      "Vanta Foundry wholesale is bulk supply of our in-stock research catalog at wholesale prices, for research-supply brands, resellers and laboratories. Each lot is matched to its certificate of analysis where one has been issued. Browse the catalog, send an inquiry on WhatsApp or by email, and we reply with pricing.",
    forWho: "Research-supply brands, resellers and laboratories that buy in quantity.",
    includes: [
      "Our full in-stock catalog, with photos",
      "Wholesale pricing that improves with quantity",
      "Lot numbers and certificates of analysis",
      "Standing orders, so you don't re-order by hand",
    ],
    steps: ["Find a product in the catalog", "Tap Inquire: WhatsApp opens with it filled in", "We reply with pricing, then ship"],
    faqs: [
      { q: "Where are the prices?", a: "We send them to you. Tap Inquire on any product in the catalog and we reply on WhatsApp with wholesale pricing for your quantities." },
      { q: "Is there a minimum order?", a: "Ask us. Minimums depend on the products and quantities." },
      { q: "Who can buy wholesale?", a: "Businesses that sell or use these materials for research. We don't supply businesses that market them for human or veterinary use." },
    ],
    demo: "wholesale",
    guides: ["what-a-certificate-of-analysis-should-show"],
  },
  {
    slug: "factory-direct",
    name: "Factory-direct supply",
    short: "Large orders straight from the manufacturer, at the lowest unit price.",
    title: "Straight from the factory.",
    answer:
      "Factory-direct supply means your order is produced and shipped straight from the manufacturer instead of from our stock. It is for large orders: the unit price is the lowest we offer, and lead times are longer than wholesale. We quote each order.",
    forWho: "Brands placing large, planned orders who want the lowest unit cost.",
    includes: [
      "The lowest unit price we offer",
      "Produced to order for your quantities",
      "Lot documentation for every batch",
      "Can be labelled with your brand (see white label)",
    ],
    steps: ["Tell us the products and quantities", "We send a quote with the lead time", "Your order is produced and shipped"],
    faqs: [
      { q: "What's the difference from wholesale?", a: "Wholesale ships from our stock, fast. Factory-direct is made to order for larger quantities: a lower price, a longer wait." },
      { q: "How long does it take?", a: "It depends on the products and quantities. Your quote states the lead time before you commit." },
    ],
    demo: "factory",
    guides: ["dropship-vs-3pl-vs-inventory"],
  },
  {
    slug: "white-label",
    name: "White label",
    short: "Sell under your own brand. We put your label on every unit.",
    title: "Your brand on every label.",
    answer:
      "White label (also called private label) means you sell our products under your own brand. We print labels to your design, apply them, and keep every unit traceable to its lot. You approve a proof before anything is printed.",
    forWho: "Anyone starting or growing their own brand without making the product themselves.",
    includes: [
      "Labels designed to your brand, or by us",
      "A proof to approve before printing",
      "Lot number on every unit",
      "Research-use-only statement on every label",
    ],
    steps: ["Send your logo and the products you want", "Approve the label proof", "We label and ship, or store it for you"],
    faqs: [
      { q: "Can you design the label?", a: "Yes. Send us your logo and colours, or just a name, and we will design it." },
      { q: "Can I put my own claims on the label?", a: "Labels carry what the product is, the lot and the research-use statement. We don't print usage, dosing or effect claims." },
    ],
    demo: "label",
    guides: ["how-white-label-research-supply-works"],
  },
  {
    slug: "fulfillment",
    name: "3PL & fulfillment",
    short: "We store your stock, pack every order and ship it as your brand.",
    title: "We pack and ship. Your name on the box.",
    answer:
      "Vanta Foundry fulfillment (3PL) means we store your inventory and pick, pack and ship each order for you. Your packing slip and shipping emails carry your brand. Or dropship from our stock and hold no inventory at all.",
    forWho: "Online sellers who would rather not pack boxes or rent storage.",
    includes: [
      "Storage for your inventory",
      "Every order picked, packed and shipped",
      "Your brand on the slip and the tracking emails",
      "Dropship option: sell from our stock, hold none yourself",
    ],
    steps: ["Send us your stock, or dropship from ours", "Connect your store so orders come to us", "We pick, pack and ship every order"],
    faqs: [
      { q: "Dropship or 3PL: which do I need?", a: "Dropship if you don't want to buy stock up front. 3PL if you already own inventory and want someone to store and ship it." },
      { q: "Will customers see your name?", a: "No. The slip and the tracking emails carry your brand." },
    ],
    demo: "fulfillment",
    guides: ["dropship-vs-3pl-vs-inventory"],
  },
  {
    slug: "website-development",
    name: "Website development",
    short: "Premium custom-coded sites for any industry, live in 72 hours to a week, with your own developer team.",
    title: "A custom website, with its own developer team.",
    answer:
      "Vanta Foundry designs and hand-codes custom websites and online stores for any kind of business: no page-builder templates, no AI-generated filler. Most sites are fully built and live within 72 hours to a week, and our developer team handles any specific request. We design it, build it, connect payments and launch it. Then keep your own developer team on a monthly plan, on call 24/7, so you never touch the maintenance.",
    forWho: "Any business in any industry that needs a new website or a better one: skincare, coffee, apparel, services, supplements, research supply and more.",
    includes: [
      "Live in 72 hours to a week, built by our developer team",
      "Custom design, built from scratch for your brand",
      "Hand-written code: fast, secure and yours",
      "Online store, booking site or company site, with payments connected",
      "Set up to be found on Google and in AI search",
      "Optional monthly developer team, on call 24/7",
    ],
    steps: ["Tell us what the site needs to do", "We design it and you sign off", "We build it, test it and launch it"],
    faqs: [
      { q: "Do you only build for peptide or research companies?", a: "No. We build websites for every industry and any lawful business. Research supply is one of the things we also offer." },
      { q: "How fast can my site be live?", a: "Most sites are fully built and live within 72 hours to a week, depending on what it needs to do. Any specific request, feature or integration is handled by our developer team." },
      { q: "Can you redo my current site?", a: "Yes. We can rebuild it or improve what you have, whichever makes more sense." },
      { q: "How much is a website?", a: "It depends on what the site needs to do. Tell us and we'll quote it." },
      { q: "What is the monthly developer team?", a: "A monthly plan that gives you a development team on call 24/7. Anything breaks, needs changing or needs adding, you message us and it gets fixed. It covers sites we build and, after a review, sites you already have." },
    ],
    demo: "website",
    guides: ["research-use-only-storefront-copy"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
