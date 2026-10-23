/**
 * The website-development service pages under /website-development/<slug>.
 * Titles, H1s and CTA labels come from seo-pages.ts.
 *
 * WRITE FROM WHAT WE HAVE BUILT. Proof points name real, live work (Vanta Labs
 * and Genesis Biomapping) or say plainly that a build is a concept. No prices,
 * no outcome promises; every project is quoted and scoped in writing. These
 * pages take briefs through the on-page form, never WhatsApp (owner,
 * 2026-10-23).
 */
import { SEO_PAGES } from "./seo-pages";

export type DevService = {
  slug: string;
  seo: (typeof SEO_PAGES)[keyof typeof SEO_PAGES];
  /** Short name for links and breadcrumbs. */
  name: string;
  /** The opening paragraph: what it is and who it's for, quotable on its own. */
  answer: string;
  /** H2 sections, in order. */
  sections: { h: string; p?: string[]; list?: string[] }[];
  /** What the build includes and what is quoted separately. */
  scope?: { included: string[]; separate: string[] };
  proof: { title: string; body: string; href?: string };
  faqs: { q: string; a: string }[];
  guides: string[];
  /** Other pages to point to, in a sentence. */
  related: { href: string; label: string }[];
};

export const DEV_SERVICES: DevService[] = [
  {
    slug: "peptide-websites",
    seo: SEO_PAGES.peptideWebsites,
    name: "Peptide websites",
    answer:
      "A peptide website needs a clear catalog, testing documentation a buyer can find in one tap, and an ordering process that works. We start from the workflow your business runs, retail checkout, wholesale requests or both, then scope the peptide website design, development and integrations around it. It's what we built for Vanta Labs, our own research-supply store.",
    sections: [
      {
        h: "What Your Peptide Website Needs",
        list: [
          "**A product catalog buyers can search**, organised by category, with each size listed once and clearly.",
          "**A page per product** with its identity data: name, synonyms, sequence, CAS number, formula, molecular weight and supplied form, with the source cited.",
          "**Documentation next to the product**: the laboratory report for each vial size, one tap from the product page.",
          "**Research-use-only copy and an access gate**, so the site says what it sells accurately everywhere.",
          "**An ordering path that matches how you sell**: checkout, quantity pricing, a wholesale request form, or all three.",
        ],
      },
      {
        h: "Product Catalogs and COA Pages",
        p: [
          "On Vanta Labs, each product page lists the reports published for the batch it currently supplies: report number, vial size, laboratory, date and result, with a link to the laboratory's own PDF. A separate COA library lists every published report and can be searched by product, batch or lot number.",
          "We model products, sizes and documents as linked records, so a new report attaches to the right size and shows up on the product page and in the library at the same time. Nobody has to remember to update two places.",
        ],
      },
      {
        h: "Retail Checkout or B2B Ordering?",
        p: [
          "Retail checkout suits buyers who order a few units at a listed price. Wholesale buyers usually want quantity pricing, a quote before they commit, and reorders without starting over. Many research brands need both on one site.",
          "We'll recommend the simplest setup that fits: a wholesale request form beside a retail store, quantity pricing tiers, or a full buyer portal with accounts. See [B2B ecommerce portal development](/website-development/b2b-portals) for the larger build.",
        ],
      },
      {
        h: "Payment, Shipping, and Email Integrations",
        p: [
          "We connect checkout to payment processing with a backup processor ready, so a closure or outage is a switch, not a shutdown. Processing is integrated with an account you're approved for; every merchant account is subject to the provider's approval, and custom code doesn't change that.",
          "Order confirmations, shipping notifications, tracking and follow-ups for declined or abandoned checkouts are part of the build when you sell online. If we also fulfil your orders, the store connects to our 3PL so orders arrive with us automatically.",
        ],
      },
      {
        h: "Our Development Process",
        list: [
          "**Brief.** You tell us about the business in about a minute; a project lead follows up to plan the build.",
          "**Design.** We design the site and you sign off on every page before it's coded.",
          "**Build.** Our developers hand-code it in Next.js and React, load the catalog and documents, and connect payments and email.",
          "**Test and launch.** Every page, form and checkout path is tested on phones and desktop before it goes live.",
        ],
      },
      {
        h: "Pricing and Project Timelines",
        p: [
          "Every project is quoted in writing after the brief, because cost depends on the catalog size, the ordering workflow, the integrations and how much content we write. Most sites are fully built and live within 72 hours to a week; a large catalog or a buyer portal takes longer, and your quote says how long before you commit.",
        ],
      },
    ],
    scope: {
      included: ["Custom design and hand-written code", "Catalog, product pages and documentation pages", "Checkout or wholesale request flow", "Research-use-only copy and access gate", "Search setup: titles, structured data, sitemap", "Testing on phones and desktop before launch"],
      separate: ["Payment processing approval (by the provider)", "Product photography", "Laboratory testing and the reports themselves", "The monthly developer plan, if you want it"],
    },
    proof: {
      title: "Built and run by us: Vanta Labs",
      body: "Our own research-supply store: catalog by category, a specification page per product, per-size laboratory reports, a searchable COA library, quantity pricing and a wholesale request form. Read what we built and why.",
      href: "/work/vanta-labs",
    },
    faqs: [
      { q: "Can buyers find the COA from the product page?", a: "Yes. Each size can link to its own report, and a COA library lists every published report, searchable by product, batch or lot number. That's how Vanta Labs works." },
      { q: "Can you migrate my existing peptide site?", a: "Yes. We move products, sizes and documents, keep the URLs that already rank where we can, and redirect the rest one-to-one before launch. See website redesign and migration." },
      { q: "Can one site support retail and wholesale buyers?", a: "Yes. A retail store with listed prices can sit beside wholesale quantity pricing or a request form, and a buyer portal can be added when wholesale grows." },
      { q: "Can you also supply the products?", a: "We can. Vanta Foundry supplies research peptides wholesale, factory-direct and under your own label. It's a separate service, quoted separately, and you don't need one to buy the other." },
      { q: "Do you write the product copy?", a: "We can, to a strict research-use-only standard: identity and documentation, no usage, dosing or outcome claims. You approve every word." },
      { q: "Who owns the website?", a: "You do. Your domain, content and site are yours, and that's written into your agreement before we start." },
    ],
    guides: ["peptide-website-features", "peptide-website-cost", "catalog-and-coa-library", "shopify-vs-custom-peptide-website"],
    related: [
      { href: "/wholesale", label: "wholesale peptides for your catalog" },
      { href: "/industries/research-peptide-brands", label: "launching a research peptide brand" },
    ],
  },
  {
    slug: "ecommerce",
    seo: SEO_PAGES.ecommerce,
    name: "Ecommerce websites",
    answer:
      "Ecommerce website development means building a custom ecommerce website around your products: the catalog, product pages, cart and checkout, shipping and order emails, and the admin you use to run it. We design it for your brand, hand-code it, connect payments and test every path before launch. For any business, in any industry.",
    sections: [
      {
        h: "Catalog",
        p: [
          "Products, variants and categories set up the way your customers shop: by size, colour, roast or routine. Filters and search where the catalog is big enough to need them, and product pages that answer the questions your customers ask before they buy.",
        ],
      },
      {
        h: "Checkout",
        p: [
          "A short, mobile-first checkout with cards, Apple Pay and Google Pay, connected to payment processing with a backup processor ready. Subscriptions, bundles, discount codes and quantity pricing are built in when the store needs them.",
        ],
      },
      {
        h: "Shipping and Notifications",
        p: [
          "Shipping rates and rules, order confirmations, shipping and tracking emails, and follow-ups for declined or abandoned checkouts. If we fulfil your orders as well, the store sends them straight to our 3PL.",
        ],
      },
      {
        h: "Management",
        p: [
          "You can add products, change prices and edit pages after launch without calling a developer. Anything bigger, a new feature or integration, is what the monthly developer plan is for.",
        ],
      },
      {
        h: "Launch Testing",
        list: [
          "Every page on phones, tablets and desktop browsers",
          "Test orders through each payment method and shipping rule",
          "Every email the store sends",
          "Speed, titles, structured data and the sitemap",
          "Forms, redirects and error pages",
        ],
      },
    ],
    proof: {
      title: "Stores we've built",
      body: "Two live research-supply stores, Vanta Labs and Genesis Biomapping, plus concept stores for skincare, coffee and athletic apparel built to the same standard.",
      href: "/work",
    },
    faqs: [
      { q: "Which platforms do you build on?", a: "We hand-code sites in Next.js and React, the stack Vanta Labs and this site run on, rather than adapting a theme. If you're set on WordPress, Shopify or another hosted platform, tell us in the brief and we'll say honestly whether we're the right fit." },
      { q: "Who supplies the content?", a: "You supply product details and photos, or we write the copy and plan the photography with you. Your quote says which." },
      { q: "What is tested before launch?", a: "Every page on phones and desktop, test orders through each payment method, every email the store sends, speed and search setup. Nothing goes live untested." },
      { q: "How long does it take?", a: "Most sites are fully built and live within 72 hours to a week. Larger catalogs and custom features take longer; your quote states the timeline." },
    ],
    guides: ["retail-vs-wholesale-ordering", "wholesale-business-launch-checklist", "why-nextjs-site-is-slow", "core-web-vitals-explained"],
    related: [
      { href: "/website-development/peptide-websites", label: "peptide website development" },
      { href: "/website-development/integrations", label: "ecommerce integrations" },
    ],
  },
  {
    slug: "b2b-portals",
    seo: SEO_PAGES.b2bPortals,
    name: "B2B buyer portals",
    answer:
      "Wholesale buyers need more than a retail cart. A B2B ecommerce portal is a wholesale ordering system: it gives approved buyers an account with their own pricing, quantity tiers, quote requests and one-tap reorders, and gives your team a queue to approve accounts and answer quotes. We scope it around how your buyers already order, then build only what that needs.",
    sections: [
      {
        h: "Account Access and Buyer Approval",
        p: [
          "Buyers apply, you approve, and only approved accounts see wholesale pricing. Applications can ask for business details and, for research supply, a research-use confirmation. Your team sees each application in one place.",
        ],
      },
      {
        h: "Account Pricing and Quantity Tiers",
        p: [
          "Price lists per account or per group, tiers that change with quantity, and minimums where you set them. The same product can show a retail price to the public and a wholesale price to a signed-in buyer.",
        ],
      },
      {
        h: "Quotes and Repeat Orders",
        p: [
          "For orders that need a person, a buyer builds a list and requests a quote instead of checking out. Accepted quotes become orders. Past orders can be repeated in one tap, and standing orders can be scheduled so nobody re-types them.",
        ],
      },
      {
        h: "Documentation",
        p: [
          "Buyers download the report for the lot they received, and invoices and packing lists, from their account. For research supply this is often the thing wholesale buyers ask for first.",
        ],
      },
      {
        h: "Inventory and Fulfillment Integrations",
        p: [
          "Portal orders can go to your fulfillment partner or our 3PL automatically, with stock levels shown to buyers where you want them. See [ecommerce integration development](/website-development/integrations).",
        ],
      },
      {
        h: "Build Scope and Handover",
        p: [
          "A portal can start small: a request form and a price list for approved buyers, then accounts, quotes and reorders as volume grows. Your proposal lists what's in the first build and what's quoted later, and you own the code and data.",
          "We haven't published a portal case study yet. The Halcyon concept store on our work page shows a café wholesale portal design; it's a concept build, not a client result.",
        ],
      },
    ],
    proof: {
      title: "A wholesale request flow, live today",
      body: "Vanta Labs takes wholesale requests beside its retail store: compounds, volume and cadence in one form, reviewed before pricing is issued. The Halcyon concept store shows a café wholesale portal design.",
      href: "/work/vanta-labs",
    },
    faqs: [
      { q: "Can buyers have their own pricing?", a: "Yes. Pricing can be set per account or per group, with quantity tiers, and only approved accounts see it." },
      { q: "How do reorders work?", a: "A buyer repeats a past order in one tap, or sets up a standing order that's placed on a schedule. Both are part of the scope when you need them." },
      { q: "Can the portal connect to inventory and shipping?", a: "Yes. Orders can flow to your fulfillment partner or our 3PL, and stock can be shown to buyers. We agree which system holds the truth for each record before we build." },
      { q: "Do I need a portal to start selling wholesale?", a: "Often not. A wholesale request form and a price list for approved buyers is enough to start. We'll tell you when a portal is worth building." },
    ],
    guides: ["b2b-buyer-portal-features", "retail-vs-wholesale-ordering"],
    related: [
      { href: "/website-development", label: "website development" },
      { href: "/wholesale", label: "wholesale peptide supply" },
    ],
  },
  {
    slug: "redesign",
    seo: SEO_PAGES.redesign,
    name: "Redesign and migration",
    answer:
      "Website redesign and migration means replacing or improving your current site without losing what already works: your products and customers, the URLs search engines know, and the orders coming in. We review the current site first, then rebuild it or improve what's there, whichever makes more sense, and move everything with a redirect map tested before launch.",
    sections: [
      {
        h: "Current-Site Review",
        p: [
          "We look at how the site performs today: speed on phones, how the catalog and checkout work, which pages bring visitors from search, and what's broken. You get a plain recommendation: rebuild, or improve what you have.",
        ],
      },
      {
        h: "Migration Scope",
        p: [
          "A website migration moves products, variants, categories, customer accounts, orders and documents, page content and images. The proposal lists what moves, what's rebuilt and what's retired, so nothing is decided by accident.",
        ],
      },
      {
        h: "URL Preservation",
        p: [
          "Pages that already rank keep their URL wherever possible. Every URL that has to change gets a one-hop permanent redirect to its real equivalent, never a blanket redirect to the homepage. The redirect map is a document you keep.",
        ],
      },
      {
        h: "Data Migration",
        p: [
          "Data is exported, cleaned and imported in a test copy first, then checked against the old site: product counts, sizes, prices, documents. The live switch uses a final export so nothing placed in between is lost.",
        ],
      },
      {
        h: "Launch Plan",
        list: [
          "Test every redirect before launch, and again after",
          "Switch at a quiet time, with the old site kept ready",
          "Submit the new sitemap and watch for crawl errors",
          "Check orders, forms and emails within the first hour",
        ],
      },
    ],
    proof: {
      title: "See what we build",
      body: "Live stores and concept builds by our team, each one hand-coded.",
      href: "/work",
    },
    faqs: [
      { q: "Will my URLs change?", a: "Only where they have to. Pages that rank keep their URL where possible, and every changed URL is redirected one-to-one to its new page." },
      { q: "Can my products and customers move?", a: "Yes. Products, sizes, documents and, where your current platform allows an export, customer accounts and order history." },
      { q: "Will the site go down?", a: "We build and test the new site separately, then switch at a quiet time with the old one kept ready. Any downtime is planned and kept short." },
      { q: "Can you improve my site instead of rebuilding it?", a: "Yes. If what you have is sound, we fix and improve it. The review tells you which makes more sense." },
    ],
    guides: ["catalog-url-migration", "core-web-vitals-explained", "choose-website-development-partner"],
    related: [
      { href: "/website-development/ecommerce", label: "ecommerce website development" },
      { href: "/contact", label: "talk to us" },
    ],
  },
  {
    slug: "integrations",
    seo: SEO_PAGES.integrations,
    name: "Integrations",
    answer:
      "Ecommerce integrations connect your store to the systems that run the business: payment processing, shipping, fulfillment, email and text messages, and inventory. For each connection we agree which system holds the truth, what happens when it fails, and how we'll know, then build and test it before it carries real orders.",
    sections: [
      {
        h: "Systems to Connect",
        list: [
          "**Payments:** card, Apple Pay and Google Pay processing, with a backup processor connected",
          "**Shipping integration:** rates, labels and tracking",
          "**Fulfillment:** orders sent to your warehouse, a 3PL or ours",
          "**Email and SMS:** order emails, tracking messages, and follow-ups for declined or abandoned checkouts",
          "**Inventory integration:** stock levels kept in step between the store and where stock is held",
        ],
      },
      {
        h: "Data Ownership",
        p: [
          "Every record has one source of truth: stock lives in one place, customers in another, orders flow one way. We write it down before building, so two systems never argue about the same number.",
        ],
      },
      {
        h: "Error Recovery",
        p: [
          "Connections fail: a provider times out, a key expires. Orders are saved before anything is sent onward, failed sends are retried safely, and anything that still fails is flagged to your team instead of disappearing.",
        ],
      },
      {
        h: "Integration Testing",
        p: [
          "Each integration is tested with test orders and the provider's test mode where it has one, including the failure cases, before it handles a live order.",
        ],
      },
      {
        h: "Support",
        p: [
          "Providers change their systems. On the monthly developer plan, our team keeps your integrations working and handles changes; without it, we quote changes as they come up.",
        ],
      },
    ],
    proof: {
      title: "Running on our own stores",
      body: "Vanta Labs runs checkout with a backup processor, order and tracking messages, and fulfillment from our own warehouse.",
      href: "/work/vanta-labs",
    },
    faqs: [
      { q: "Which system is authoritative?", a: "We decide that together for each record, stock, customers, orders, and write it down before we build, so there's never a conflict." },
      { q: "What happens when an integration fails?", a: "The order is saved first, the send is retried, and anything that still fails is flagged to your team. Nothing is silently dropped." },
      { q: "What access do you need?", a: "Admin or API access to the services being connected, set up with our own login where the provider allows it, so you can remove it any time." },
      { q: "Can you connect my existing store?", a: "Usually, yes. Tell us what you use in the brief and we'll confirm what's possible." },
    ],
    guides: ["b2b-buyer-portal-features"],
    related: [
      { href: "/website-development/b2b-portals", label: "B2B ecommerce portals" },
      { href: "/website-development/ecommerce", label: "ecommerce website development" },
      { href: "/fulfillment", label: "our 3PL" },
    ],
  },
  {
    slug: "maintenance",
    seo: SEO_PAGES.maintenance,
    name: "Maintenance and support",
    answer:
      "Website maintenance and support is a monthly plan that gives you a developer team on call 24/7 for your site: fixes, changes, updates, new pages and features, plus speed, security and uptime. You message the team and it gets done. It covers sites we build and, after a review, sites you already have. What's included is listed in your agreement.",
    sections: [
      {
        h: "Included Work",
        list: [
          "Fixes when something breaks",
          "Changes to pages, products and content",
          "New pages, features and integrations",
          "Updates to keep the site secure",
          "Monthly search and AI-search improvements",
        ],
      },
      {
        h: "Monitoring",
        p: [
          "Speed, security and uptime are watched, so most problems are found and fixed before a customer notices.",
        ],
      },
      {
        h: "Requests",
        p: [
          "Website support runs through one thread to the team, not a ticket queue. Tell us what you need in plain words; we confirm what will change and when.",
        ],
      },
      {
        h: "Plan Scope",
        p: [
          "Your agreement lists what the plan covers and what would be quoted separately, such as a large new build. If you stop the plan, your site, domain and content stay yours.",
        ],
      },
    ],
    proof: {
      title: "We run our own store this way",
      body: "Vanta Labs, our own research-supply store, is looked after by the same team that would look after yours.",
      href: "/work/vanta-labs",
    },
    faqs: [
      { q: "What counts as maintenance?", a: "Fixes, changes, updates, new pages and features, speed, security and uptime. The exact list is in your agreement." },
      { q: "Are new features included?", a: "New pages, features and integrations are part of the plan. Something the size of a new build is quoted separately; the agreement says where that line is." },
      { q: "What are the support hours?", a: "The team is on call 24/7." },
      { q: "Can you look after a site you didn't build?", a: "Yes, after a review of the site, so we know what we're taking on." },
    ],
    guides: ["why-nextjs-site-is-slow", "core-web-vitals-explained"],
    related: [
      { href: "/website-development", label: "website development" },
      { href: "/contact", label: "contact the team" },
    ],
  },
];

export function getDevService(slug: string) {
  return DEV_SERVICES.find((s) => s.slug === slug);
}
