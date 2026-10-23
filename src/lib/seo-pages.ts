/**
 * THE PAGE REGISTRY: the approved title, H1, primary phrase and main call to
 * action for every commercial page, and which page owns which search query.
 *
 * Pages read their title and H1 from here, and `npm run check:seo` checks the
 * built HTML against it, so a refactor can't quietly change approved wording.
 * Change copy here, on purpose, and bump `updated` (it feeds the sitemap).
 *
 * One page per query: /wholesale owns general supplier intent, /catalog owns
 * browsing, each /catalog/<slug> owns its compound's wholesale intent, and
 * /website-development/peptide-websites owns the niche development service.
 */

export type SeoPage = {
  route: string;
  /** The search phrase this page owns. */
  primaryPhrase: string;
  /** The <title>, exactly. */
  title: string;
  /** The page's one <h1>, exactly. */
  h1: string;
  description: string;
  /** Label of the main call to action, exactly. */
  cta: string;
  /** Supporting phrases the page keeps in its own sections. Not a stuffing list. */
  phrases: string[];
  /** Last real content revision (YYYY-MM-DD). */
  updated: string;
  /** Owner-locked wording that differs from the SEO brief (kept on purpose). */
  note?: string;
};

const T = (s: string) => `${s} | Vanta Foundry`;
const D = "2026-10-23";

export const SEO_PAGES = {
  home: {
    route: "/",
    primaryPhrase: "wholesale peptides",
    title: T("Website Development & Wholesale Peptides"),
    h1: "Build your brand. Or supply it.",
    description: "Website development for any business, and wholesale peptide supply for research brands. Discuss a website project or request pricing for your wholesale order.",
    cta: "Explore website development",
    phrases: ["website development", "wholesale peptides"],
    updated: D,
    note: "H1 is the owner's two-doors headline (2026-10-23); the title carries the primary phrase.",
  },
  websiteDevelopment: {
    route: "/website-development",
    primaryPhrase: "website development",
    title: T("Website Development"),
    h1: "Website development",
    description: "Custom-coded websites and online stores for any business, designed for your brand, live in 72 hours to a week, with your own developer team after launch.",
    cta: "Start your project",
    phrases: ["custom web development"],
    updated: D,
  },
  peptideWebsites: {
    route: "/website-development/peptide-websites",
    primaryPhrase: "peptide website development",
    title: T("Peptide Website Development"),
    h1: "Peptide Website Development",
    description: "Plan a peptide website with a clear product catalog, testing documentation and an ordering workflow that works. Built by the team behind Vanta Labs.",
    cta: "Request a Website Quote",
    phrases: ["peptide website design", "product catalog", "COA pages", "B2B ecommerce portal"],
    updated: D,
  },
  ecommerce: {
    route: "/website-development/ecommerce",
    primaryPhrase: "ecommerce website development",
    title: T("Ecommerce Website Development"),
    h1: "Ecommerce Website Development",
    description: "A custom online store: catalog, checkout, shipping and order emails, built for your products and tested on every device before launch.",
    cta: "Discuss Your Store",
    phrases: ["custom ecommerce website"],
    updated: D,
  },
  b2bPortals: {
    route: "/website-development/b2b-portals",
    primaryPhrase: "B2B ecommerce portal",
    title: T("B2B Ecommerce Portal Development"),
    h1: "B2B Ecommerce Portal Development",
    description: "Plan a B2B ecommerce portal around buyer accounts, quantity pricing, quote requests and repeat orders. Scoped to the workflow your wholesale buyers use.",
    cta: "Discuss Your Portal",
    phrases: ["wholesale ordering system", "B2B buyer portal"],
    updated: D,
  },
  redesign: {
    route: "/website-development/redesign",
    primaryPhrase: "website redesign",
    title: T("Website Redesign & Migration"),
    h1: "Website Redesign & Migration",
    description: "Rebuild or improve your current website without losing what works: product data, URLs and search visibility, moved with a redirect map and tested before launch.",
    cta: "Request a Website Review",
    phrases: ["website migration"],
    updated: D,
  },
  integrations: {
    route: "/website-development/integrations",
    primaryPhrase: "ecommerce integrations",
    title: T("Ecommerce Integration Development"),
    h1: "Ecommerce Integration Development",
    description: "Connect your store to payments, shipping, fulfillment, email and SMS, with a clear source of truth for each record and a plan for when a connection fails.",
    cta: "Discuss an Integration",
    phrases: ["shipping integration", "inventory integration"],
    updated: D,
  },
  maintenance: {
    route: "/website-development/maintenance",
    primaryPhrase: "website maintenance",
    title: T("Website Maintenance & Support"),
    h1: "Website Maintenance & Support",
    description: "A monthly plan with a developer team on call 24/7 for fixes, changes, new pages and features, speed, security and uptime. What's included is in your agreement.",
    cta: "Discuss Support",
    phrases: ["website support"],
    updated: D,
  },
  wholesale: {
    route: "/wholesale",
    primaryPhrase: "wholesale peptides",
    title: T("Wholesale Peptides & Bulk Supply"),
    h1: "Wholesale Peptides & Bulk Supply",
    description: "Wholesale research peptides from the Vanta catalog. Send the compounds, vial sizes and quantities you need and we reply with pricing, availability and the lot's report.",
    cta: "Request Wholesale Pricing",
    phrases: ["wholesale research peptides", "bulk research peptides", "wholesale peptide supplier"],
    updated: D,
  },
  catalog: {
    route: "/catalog",
    primaryPhrase: "wholesale peptide catalog",
    title: T("Wholesale Peptide Catalog"),
    h1: "Wholesale Peptide Catalog",
    description: "Every product we supply wholesale, with vial sizes, specifications and published laboratory reports. Build one inquiry for several products; we reply with pricing.",
    cta: "Inquire",
    phrases: ["bulk peptide supply", "certificate of analysis"],
    updated: D,
  },
  testing: {
    route: "/wholesale/testing",
    primaryPhrase: "peptide testing",
    title: T("Peptide Testing & Batch COAs"),
    h1: "Peptide Testing & Batch COAs",
    description: "Every laboratory report published for the Vanta catalog: report number, vial size, laboratory, date and result, with what each test does and doesn't show.",
    cta: "View Available Documentation",
    phrases: ["certificate of analysis", "batch COA", "third-party testing", "HPLC"],
    updated: D,
  },
  ordering: {
    route: "/wholesale/ordering",
    primaryPhrase: "wholesale peptide ordering",
    title: T("Wholesale Peptide Ordering"),
    h1: "Wholesale Peptide Ordering",
    description: "How a wholesale peptide order works: what to send, what your written quote covers, how minimum order quantity and lead time are confirmed, and how reorders run.",
    cta: "Start a Wholesale Inquiry",
    phrases: ["minimum order quantity", "MOQ", "wholesale pricing", "tiered pricing"],
    updated: D,
  },
  privateLabel: {
    route: "/white-label",
    primaryPhrase: "private label peptides",
    title: T("Private Label Peptides & White Label Supply"),
    h1: "Private Label Peptides & White Label Supply",
    description: "Sell research peptides under your own brand. We print labels to your design, you approve a proof before anything prints, and every unit stays traceable to its lot.",
    cta: "Discuss Private Label",
    phrases: ["white label research compounds", "custom branded peptides"],
    updated: D,
  },
  fulfillment: {
    route: "/fulfillment",
    primaryPhrase: "peptide dropshipping",
    title: T("Peptide Dropshipping & Order Fulfillment"),
    h1: "Peptide Dropshipping & Order Fulfillment",
    description: "We store your stock and pick, pack and ship every order as your brand (3PL), or dropship from our stock so you hold no inventory.",
    cta: "Discuss Fulfillment",
    phrases: ["order fulfillment", "3PL"],
    updated: D,
  },
  factoryDirect: {
    route: "/factory-direct",
    primaryPhrase: "factory-direct peptide supply",
    title: T("Factory-Direct Peptide Supply"),
    h1: "Factory-Direct Peptide Supply",
    description: "Large research-peptide orders produced and shipped straight from the manufacturer, at our lowest unit price, with lot documentation. Quoted per order.",
    cta: "Get started",
    phrases: ["lot documentation"],
    updated: D,
  },
  supply: {
    route: "/supply",
    primaryPhrase: "white label",
    title: T("Wholesale, White Label & 3PL for Research Brands"),
    h1: "Peptide supply, done for you.",
    description: "Research peptides wholesale or factory-direct with a COA for every wholesale lot, your own label on every vial, and storage, packing and shipping as your brand. Research use only.",
    cta: "Browse the catalog",
    phrases: ["white label", "3PL"],
    updated: D,
    note: "H1 is the owner's front-door headline; /wholesale owns 'wholesale peptides'.",
  },
  work: {
    route: "/work",
    primaryPhrase: "website development portfolio",
    title: T("Website Development Portfolio"),
    h1: "Website development portfolio",
    description: "Websites designed and hand-coded by the Vanta Foundry team: two live research-supply stores, and concept stores for skincare, coffee and athletic apparel.",
    cta: "Start your project",
    phrases: [],
    updated: D,
  },
  caseVantaLabs: {
    route: "/work/vanta-labs",
    primaryPhrase: "website development case study",
    title: T("Vanta Labs Website Development Case Study"),
    h1: "Vanta Labs Website Development Case Study",
    description: "What our team built for Vanta Labs, our own research-supply store: catalog, specification pages, a searchable COA library, quantity pricing and wholesale requests.",
    cta: "Discuss a Similar Project",
    phrases: ["COA library"],
    updated: D,
  },
  about: {
    route: "/about",
    primaryPhrase: "Vanta Foundry",
    title: T("About Vanta Foundry"),
    h1: "About Vanta Foundry",
    description: "Vanta Foundry is the team behind Vanta Labs, Genesis Biomapping and Remade Clinic. We build websites for any business and supply research brands wholesale.",
    cta: "Contact the Team",
    phrases: [],
    updated: D,
  },
  contact: {
    route: "/contact",
    primaryPhrase: "Vanta Foundry contact",
    title: T("Contact Vanta Foundry"),
    h1: "Contact Vanta Foundry",
    description: "Send a website brief on the site, or a wholesale inquiry on WhatsApp or by email to support@vantalabsresearch.com. A person on our team replies.",
    cta: "Send a website brief",
    phrases: ["wholesale inquiry"],
    updated: D,
  },
} satisfies Record<string, SeoPage>;

/** Product pages follow one pattern; the check script verifies every one. */
export const productSeo = (name: string) => ({
  title: T(`${name} Wholesale`),
  h1: `${name} Wholesale`,
  description: `Request wholesale pricing for ${name}. Review vial sizes, specifications, published laboratory reports and ordering details with Vanta Foundry.`,
  cta: "Request Product Pricing",
});
