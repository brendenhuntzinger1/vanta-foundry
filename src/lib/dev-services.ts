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
  proof: { title: string; body: string; href?: string; image?: { src: string; alt: string } };
  faqs: { q: string; a: string }[];
  guides: string[];
  /** Other pages to point to, in a sentence. */
  related: { href: string; label: string }[];
  /** "grow" for marketing services (ads, social, lead generation); builds otherwise. */
  group?: "grow";
};

export const DEV_SERVICES: DevService[] = [
  {
    slug: "peptide-websites",
    seo: SEO_PAGES.peptideWebsites,
    name: "Peptide websites",
    answer:
      "A peptide business website needs a clear catalog, testing documentation a buyer can find in one tap, and an ordering process that works. We start from the workflow your business runs, retail checkout, wholesale requests or both, then scope the peptide website design, development and integrations around it. It's what we built for Vanta Labs, our own research-supply store.",
    sections: [
      {
        h: "What Your Peptide Website Needs",
        list: [
          "**A product catalog buyers can search**, organised by category, with each size listed once and clearly.",
          "**A page per product** with its identity data: name, synonyms, sequence, CAS number, formula, molecular weight and supplied form, with the source cited.",
          "**Documentation next to the product**: the laboratory report for each vial size, one tap from the product page.",
          "**Research-use-only copy and an access gate**, so the site says what it sells accurately everywhere.",
          "**An ordering path that matches how you sell**: checkout, quantity pricing, a wholesale request form, or all three.",
          "**Search setup from day one.** A peptide SEO website starts with clean titles, structured data and a sitemap, built in rather than added later.",
        ],
      },
      {
        h: "Product Catalogs and COA Pages",
        p: [
          "On Vanta Labs, each product page lists its published laboratory reports: report number, vial size, laboratory, date and result, with a link to the laboratory's own PDF. A separate COA library lists every published report and can be searched by product, batch or lot number.",
          "We model products, sizes and documents as linked records, so a new report attaches to the right size and shows up on the product page and in the library at the same time. Nobody has to remember to update two places.",
        ],
      },
      {
        h: "Retail Checkout or B2B Ordering?",
        p: [
          "Retail checkout suits buyers who order a few units at a listed price. Wholesale buyers usually want quantity pricing, a quote before they commit, and reorders without starting over. Many research brands need both on one site.",
          "Research compound e-commerce has one more constraint: every listing, email and ad has to stay research use only. That's why our research compound website design starts from the copy rules, not from a theme.",
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
          "**Build.** Our developers hand-code it in Next.js and React, load the catalog and documents, and connect payments and email. You get a Next.js peptide website you own, not a rented theme.",
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
      { q: "Which platforms do you build on?", a: "Custom Next.js development: we hand-code sites in Next.js and React, the stack Vanta Labs and this site run on, rather than adapting a theme. When Shopify suits the business better, we build on Shopify instead. If you're set on WordPress or another hosted platform, tell us in the brief and we'll say honestly whether we're the right fit." },
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
          "Buyers download the report for the lot they received, and invoices and packing lists, from their account. For research supply this is often the thing wholesale buyers ask for first, and it's where B2B peptide portal development differs most from a general wholesale portal.",
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
  {
    slug: "shopify",
    seo: SEO_PAGES.shopify,
    name: "Shopify development",
    answer:
      "Shopify development means setting up and customizing a Shopify store around your products: the theme, products and collections, checkout and shipping settings, apps, and connections to email and your other tools. We build on Shopify when it fits the business, and say so when a custom-coded store would fit better. For any lawful business whose products Shopify accepts.",
    sections: [
      {
        h: "When Shopify Fits",
        p: [
          "Shopify suits a business that wants a hosted platform, with apps for most needs and hosting and updates handled for it. A custom-coded store suits a business that needs a specific catalog, ordering or documentation feature that would take several workarounds on a platform. Our guide on [Shopify vs. custom development](/guides/shopify-vs-custom-peptide-website) walks through the decision.",
        ],
      },
      {
        h: "Store Setup",
        list: [
          "**A theme designed for your brand**, or an existing theme customized properly rather than patched.",
          "**Products, variants and collections** organized the way your customers shop.",
          "**Checkout, shipping and tax settings**, tested with real orders before launch.",
          "**Apps chosen for what you need**, not installed by default, so the Shopify store stays fast.",
          "**Email, SMS, reviews and fulfillment** connected to the store.",
        ],
      },
      {
        h: "Shopify Migration",
        p: [
          "Moving to Shopify, or off it, means carrying over products, customers and the order history the platforms allow, and redirecting every old URL to its new page so search rankings aren't lost. We map that before launch, not after.",
        ],
      },
      {
        h: "Platform Rules",
        p: [
          "Shopify and Shopify Payments set their own rules about what can be sold, and those rules change. Some categories, including research chemicals and some supplements, may not be allowed. We check your products against the current policy before we start building.",
        ],
      },
    ],
    proof: {
      title: "See what we build",
      body: "Our published work includes two live research-supply stores and concept stores for skincare, coffee and apparel. A Shopify store is designed and tested to the same standard.",
      href: "/work",
      image: { src: "/showcase/halcyon-desktop.webp", alt: "Halcyon, a concept coffee store designed by our team" },
    },
    faqs: [
      { q: "Do you design custom Shopify themes?", a: "Yes. We design the theme for your brand, or customize an existing one properly. Your quote says which." },
      { q: "Can you move my store to Shopify, or off it?", a: "Yes, either way. We move products and customers, keep the order history the platforms allow, and redirect old URLs one-to-one." },
      { q: "Who owns the store?", a: "You do. The Shopify account is in your name, and so are the domain and content." },
      { q: "How much does a Shopify store cost?", a: "It depends on the design, the catalog and the apps and integrations it needs. Tell us in the brief and we quote it in writing." },
    ],
    guides: ["shopify-vs-custom-peptide-website", "catalog-url-migration", "choose-website-development-partner"],
    related: [
      { href: "/website-development/ecommerce", label: "custom ecommerce website development" },
      { href: "/website-development/integrations", label: "ecommerce integrations" },
    ],
  },
  {
    slug: "telehealth",
    seo: SEO_PAGES.telehealth,
    name: "Telehealth & medical websites",
    answer:
      "Telehealth website development covers the public site and the patient's path into care: service and condition pages, eligibility questions, online intake, booking, and payment for consultations or memberships. Where health information is collected, we connect HIPAA-ready intake, scheduling or EHR providers instead of storing it on the website. The same approach works for a medical practice website, a clinic or a med spa.",
    sections: [
      {
        h: "What the Build Covers",
        list: [
          "**Service and condition pages** in plain language, reviewed by your clinicians before launch.",
          "**Eligibility and patient intake** flows that hand off to your intake or EHR provider.",
          "**Booking** for consultations and follow-ups, connected to your scheduling system.",
          "**Payments** for consultations, packages and memberships.",
          "**A patient portal or video-visit integration** when your practice needs one, scoped in your proposal.",
        ],
      },
      {
        h: "Patient Data and HIPAA",
        p: [
          "Marketing pages don't need to hold patient data, and shouldn't. Forms that collect health information go to a provider that signs a Business Associate Agreement with your practice; we connect it and keep health information out of website analytics and notification emails.",
          "We don't certify HIPAA compliance. Your practice and its compliance adviser decide what's required, and we build to that.",
        ],
      },
      {
        h: "Payments",
        p: [
          "Consultation fees, packages and recurring memberships are set up with a processor that accepts medical and telehealth businesses. Every merchant account is subject to the provider's approval.",
        ],
      },
      {
        h: "Copy and Claims",
        p: [
          "Health copy is written plainly, without outcome promises, and every medical statement is approved by your clinicians before it goes live.",
        ],
      },
    ],
    proof: {
      title: "Clinic and telehealth sites",
      body: "See how we approach med spas, clinics and telehealth practices: treatment pages, intake, booking and memberships.",
      href: "/industries/med-spas-clinics",
      image: { src: "/showcase/solenne-desktop.webp", alt: "Solenne, a concept skincare store designed by our team" },
    },
    faqs: [
      { q: "Is the website HIPAA compliant?", a: "Marketing pages don't hold patient data. Where intake collects health information, we connect a HIPAA-ready intake or EHR provider rather than storing it on the website. Your compliance adviser signs off on what's required." },
      { q: "Can patients book and pay online?", a: "Yes. Booking connects to your scheduling system, and consultations, packages and memberships can be paid online." },
      { q: "Do you build the video-visit platform itself?", a: "Usually we integrate an existing HIPAA-ready video and EHR platform, which is faster and already reviewed. A custom patient portal can be scoped when you need one; your proposal says which." },
      { q: "Can you build for a medical practice that isn't telehealth?", a: "Yes. A medical practice website gets the same structure: service pages, intake, booking and payments, with patient data kept off the website." },
    ],
    guides: ["high-risk-vs-standard-merchant-account", "choose-website-development-partner"],
    related: [
      { href: "/industries/med-spas-clinics", label: "websites for med spas, clinics and telehealth" },
      { href: "/website-development/integrations", label: "intake, booking and payment integrations" },
    ],
  },
  {
    slug: "mobile-apps",
    seo: SEO_PAGES.mobileApps,
    name: "Mobile apps",
    answer:
      "Mobile app development means designing and building an app for iPhone and Android: the screens, accounts, ordering or booking, notifications, and the connection to your website, store or database. We recommend cross-platform or fully native based on what the app needs, then build it, test it and submit it to the App Store and Google Play.",
    sections: [
      {
        h: "Do You Need an App?",
        p: [
          "Many businesses are better served by a fast mobile website, which customers can use without installing anything. An app earns its place with repeat use: reorders, bookings, loyalty, notifications or a tool your team uses every day. If a mobile-first website does the job, we'll say so.",
        ],
      },
      {
        h: "What We Build",
        list: [
          "**Customer apps** for ordering, booking, accounts and loyalty.",
          "**Team apps** for orders, inventory, scheduling or field work.",
          "**Notifications** for orders, appointments and offers, sent only to people who opt in.",
          "**Connections** to your website, store, payments and database, so everything shows the same data.",
        ],
      },
      {
        h: "App Store Review",
        p: [
          "Apple and Google review every app against their own guidelines, and approval is their decision. We prepare the listing, screenshots and privacy details and handle review feedback. Health and research-supply apps get closer scrutiny, and we plan for that from the start.",
        ],
      },
      {
        h: "After Launch",
        p: [
          "Phones get new operating systems every year, so apps need updates to keep working. The monthly developer plan can cover that; your agreement lists what's included.",
        ],
      },
    ],
    proof: {
      title: "See what we build",
      body: "We haven't published an app case study yet. Our web work, including the live Vanta Labs store, shows the design and testing standard we build to.",
      href: "/work",
    },
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform suits most business apps, with one codebase for iOS and Android. Fully native makes sense for apps that lean heavily on the phone's hardware. We recommend one in your proposal and say why." },
      { q: "Who owns the app and the store listings?", a: "You do. The App Store and Google Play accounts are in your name, and so is the code." },
      { q: "How long does an app take?", a: "Longer than a website, and it depends on the features. Your quote states the timeline before you commit." },
      { q: "Can the app use my website's data?", a: "Yes. The app and the website can share the same products, accounts and orders." },
    ],
    guides: ["choose-website-development-partner"],
    related: [
      { href: "/website-development/ecommerce", label: "ecommerce website development" },
      { href: "/website-development/maintenance", label: "maintenance and support" },
    ],
  },
  {
    slug: "ai-solutions",
    seo: SEO_PAGES.aiSolutions,
    name: "AI solutions",
    answer:
      "AI solutions here means practical automation built around your business: an AI chatbot that answers customer questions from your own content, inquiry sorting and reply drafts, data pulled out of documents, and workflows that move information between your tools. We start with one task worth automating, build it so a person can review and override it, and check that it helps before adding more.",
    sections: [
      {
        h: "Where AI Helps",
        list: [
          "**Customer questions** answered from your own pages, policies and documents, with a hand-off to a person.",
          "**Inquiries** sorted, summarized and routed, with a draft reply ready for your team.",
          "**Documents** such as invoices, orders and forms read into your systems.",
          "**AI automation** between your website, email, CRM and spreadsheets, so nobody re-types data.",
        ],
      },
      {
        h: "Where It Doesn't",
        p: [
          "AI makes mistakes. We don't use it where a wrong answer can't be caught in time: medical, legal or financial advice, product claims, or decisions about a customer without a person involved.",
        ],
      },
      {
        h: "Your Data",
        p: [
          "Before we build, we agree in writing which data the AI can see, which provider processes it, and what is kept. Customer-facing answers are drawn from content you approve.",
        ],
      },
      {
        h: "Testing Before Launch",
        p: [
          "Each automation is tested on real examples from your business before it goes live, and you see what it gets wrong as well as what it gets right.",
        ],
      },
    ],
    proof: {
      title: "What you'll get in writing",
      body: "We haven't published an AI case study yet. Your proposal describes exactly what will be built, which data it uses and how it's tested before launch.",
    },
    faqs: [
      { q: "Will an AI chatbot replace my team?", a: "It handles the repetitive questions and hands the rest to a person. Most businesses use it to answer faster, not to remove people." },
      { q: "Which AI models do you use?", a: "We choose for the task and for the provider's data terms, and name the provider in your proposal." },
      { q: "Can it answer from my own documents?", a: "Yes. Answers come from content you approve, and it says when it doesn't know." },
      { q: "What does it cost to run?", a: "AI providers charge by usage. Your quote estimates the running cost alongside the build." },
    ],
    guides: ["seo-vs-geo", "choose-website-development-partner"],
    related: [
      { href: "/website-development/ai-lead-generation", label: "AI lead generation" },
      { href: "/website-development/integrations", label: "integrations with your tools" },
    ],
  },
  {
    slug: "cloud-infrastructure",
    seo: SEO_PAGES.cloud,
    name: "Cloud infrastructure",
    answer:
      "Cloud infrastructure and DevOps cover where your website, apps and data run, and how changes reach them safely: website hosting, databases, automated deployments with previews, backups, monitoring and alerts, and access control. We set it up in accounts you own, document it, and can run it for you on the monthly developer plan.",
    sections: [
      {
        h: "What We Set Up",
        list: [
          "**Hosting** for websites, apps and APIs, sized for your traffic.",
          "**Databases** with access rules, so customer data is readable only by the people and systems that need it.",
          "**Automated deployments**: every change builds a private preview before it reaches the live site.",
          "**Backups and recovery**, tested by actually restoring them.",
          "**Monitoring and alerts** for uptime, errors and slow pages.",
        ],
      },
      {
        h: "Costs and Access",
        p: [
          "Accounts are opened in your name, so you can see every bill and control who has access. We document what runs where, so another team could take it over.",
        ],
      },
      {
        h: "Migrations",
        p: [
          "Moving to new hosting is planned in advance: what moves, in what order, how it's tested, and how to roll back if something goes wrong.",
        ],
      },
    ],
    proof: {
      title: "How this site runs",
      body: "Vanta Foundry runs on the setup we'd give you: every change builds a private preview, live pages are checked for search settings before release, and inquiries are stored in a database no visitor can read.",
    },
    faqs: [
      { q: "Which cloud providers do you use?", a: "Managed platforms such as Vercel and Supabase for most websites, which is what this site runs on. We recommend others when a project needs them." },
      { q: "Can you move my site to new hosting?", a: "Yes, with a written plan for what moves, how it's tested and how to roll back." },
      { q: "Who owns the accounts?", a: "You do. They're opened in your name, and we're given access." },
      { q: "Is running it included in the monthly plan?", a: "It can be. Your agreement lists what the plan covers." },
    ],
    guides: ["why-nextjs-site-is-slow", "core-web-vitals-explained"],
    related: [
      { href: "/website-development/maintenance", label: "website maintenance and support" },
      { href: "/website-development/integrations", label: "integrations" },
    ],
  },
  {
    slug: "paid-ads",
    seo: SEO_PAGES.paidAds,
    group: "grow",
    name: "Paid ads",
    answer:
      "Performance marketing means paid ads judged by what they produce: sales, booked calls or qualified leads, not clicks. We set up tracking first, build landing pages that match each campaign, launch on the platforms where your buyers are, and adjust budget and creative from the results. Ad platforms restrict some categories, so we check yours before spending anything.",
    sections: [
      {
        h: "Tracking First",
        p: [
          "Before any budget goes out, conversion tracking is set up and tested, so every sale, booking or lead can be traced back to the campaign that produced it.",
        ],
      },
      {
        h: "Campaigns",
        list: [
          "**Google Ads**: search, shopping and remarketing.",
          "**Meta**: Facebook and Instagram ads.",
          "**TikTok** ads, where your buyers are.",
          "**Landing pages** built to match each campaign's offer and wording.",
        ],
      },
      {
        h: "Restricted Categories",
        p: [
          "Google, Meta and TikTok restrict or prohibit ads for some products, including many health, supplement and research-chemical categories. We check your products against each platform's current policy before launch, and we don't run ads that break those policies. When paid ads aren't an option, [SEO and AI search](/seo-ai-search) usually is.",
        ],
      },
      {
        h: "Reporting",
        p: [
          "You see spend, results and cost per lead or sale for each campaign. The ad accounts are in your name, so the history stays yours.",
        ],
      },
    ],
    proof: {
      title: "Your accounts, your data",
      body: "We haven't published an ad case study yet. Every ad account is opened in your name, so all spend and results stay visible to you.",
      image: { src: "/showcase/halcyon-desktop.webp", alt: "Halcyon, a concept coffee store designed by our team" },
    },
    faqs: [
      { q: "Can you run ads for peptides or research products?", a: "The major platforms restrict or prohibit most of these products. We check what's allowed before spending anything, and usually recommend search visibility instead." },
      { q: "Who owns the ad accounts?", a: "You do. They're opened in your name, and we're given access." },
      { q: "What budget do I need?", a: "There's no published minimum. Tell us about the business in the brief and we recommend a starting budget in writing." },
      { q: "Do you guarantee results?", a: "No one can honestly guarantee ad results. We report exactly what each campaign produces and change what isn't working." },
    ],
    guides: ["seo-vs-geo"],
    related: [
      { href: "/website-development/social-media", label: "social media and UGC content" },
      { href: "/seo-ai-search", label: "SEO and AI search" },
    ],
  },
  {
    slug: "social-media",
    seo: SEO_PAGES.socialMedia,
    group: "grow",
    name: "Social media & UGC",
    answer:
      "Social media management covers the plan, the posts and the day-to-day: a content calendar for your brand, posts written and designed for each platform, replies and community management, and a monthly review of what worked. UGC content is short, creator-style video and photography made for ads and organic posts. Both are planned around what you sell and the rules each platform sets for your category.",
    sections: [
      {
        h: "What's Managed",
        list: [
          "**A monthly content calendar**, approved by you before anything posts.",
          "**Posts** written, designed and scheduled for Instagram, TikTok, Facebook or LinkedIn, wherever your buyers are.",
          "**Replies and comments** handled in your brand's voice.",
          "**A monthly review** of what drove visits, inquiries and sales.",
        ],
      },
      {
        h: "UGC Content",
        p: [
          "Creators film your product the way a customer would, for ads and organic posts. Usage rights are agreed in writing, and paid partnerships are disclosed the way the FTC requires.",
        ],
      },
      {
        h: "Claims and Approvals",
        p: [
          "You approve every post. We don't publish health, outcome or usage claims, and research-use-only brands get research-use-only content.",
        ],
      },
    ],
    proof: {
      title: "Every post approved by you",
      body: "We haven't published a social media case study yet. Nothing posts without your approval, and the accounts stay in your name.",
      image: { src: "/showcase/solenne-desktop.webp", alt: "Solenne, a concept skincare store designed by our team" },
    },
    faqs: [
      { q: "Which platforms do you manage?", a: "Instagram, TikTok, Facebook and LinkedIn, chosen by where your buyers spend time." },
      { q: "Who owns the content?", a: "Your agreement sets the usage rights for every photo and video, including creator content." },
      { q: "Do creators disclose paid posts?", a: "Yes. Paid partnerships are disclosed the way the FTC requires." },
      { q: "Can you post for a research peptide brand?", a: "Carefully. Platforms restrict the category, and posts stay research use only, with no usage or outcome claims." },
    ],
    guides: ["research-use-only-storefront-copy"],
    related: [
      { href: "/website-development/paid-ads", label: "performance marketing and paid ads" },
      { href: "/seo-ai-search", label: "SEO and AI search" },
    ],
  },
  {
    slug: "ai-lead-generation",
    seo: SEO_PAGES.aiLeadGen,
    group: "grow",
    name: "AI lead generation",
    answer:
      "AI lead generation, done properly, is a system for capturing and following up with people who already show interest: forms and chat that ask the right qualifying questions, an instant first reply, routing to the right person, reminders so no inquiry goes cold, and tracking from first visit to sale. It runs on your own website and campaigns. We don't buy lists or send unsolicited bulk messages.",
    sections: [
      {
        h: "Lead Capture",
        list: [
          "**Forms and chat** on the pages people already visit, asking only what you need to know.",
          "**Lead qualification** questions you choose: need, timing, budget, location.",
          "**An instant first reply** by email or text, so a lead hears from you while they're still interested.",
        ],
      },
      {
        h: "Routing and Follow-Up",
        p: [
          "Each lead goes to the right person with a summary, and reminders go out when nobody has replied. Follow-up emails and texts go only to people who agreed to receive them, with the consent the law and the carriers require.",
        ],
      },
      {
        h: "Tracking",
        p: [
          "Every lead keeps where it came from: the landing page, the campaign and the last page viewed. You see which pages and campaigns produce leads that turn into sales, not just form fills.",
        ],
      },
    ],
    proof: {
      title: "How this site does it",
      body: "Vanta Foundry's own forms save every inquiry with a reference, notify the team once, and record the landing page and campaign, and saved inquiries are tracked separately from clicks.",
    },
    faqs: [
      { q: "Do you buy or scrape lead lists?", a: "No. The system works with people who come to you through your website and campaigns." },
      { q: "Will it work with my CRM?", a: "Yes. Leads can go straight into your CRM, email or a shared inbox." },
      { q: "How fast does a lead get a reply?", a: "The first reply can go out as soon as the form is sent. Your team follows up from there." },
      { q: "Can it qualify leads for us?", a: "Yes, with the questions you choose. Leads are scored and routed so your team calls the best ones first." },
    ],
    guides: ["choose-website-development-partner"],
    related: [
      { href: "/website-development/ai-solutions", label: "AI solutions and automation" },
      { href: "/website-development/paid-ads", label: "performance marketing and paid ads" },
    ],
  },
];

export function getDevService(slug: string) {
  return DEV_SERVICES.find((s) => s.slug === slug);
}
