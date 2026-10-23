/**
 * Industry landing pages: /industries/<slug>. One page per kind of business,
 * each saying in that industry's words what we build, how payments work for
 * it and what its customers search for. Written to rank and to be quoted by
 * AI search, so every page has its own copy, not a template with a word
 * swapped. No invented stats, prices or guarantees.
 */

export type Industry = {
  slug: string;
  /** Short label, used in lists and the breadcrumb. */
  name: string;
  /** Page headline. */
  title: string;
  /** The quotable answer: what we do for this industry, two sentences. */
  answer: string;
  /** What the website needs to do for this kind of business. */
  build: string[];
  /** How payments work for it. */
  payments: string;
  /** What customers search for, and what we set up to be found. */
  search: string;
  faqs: { q: string; a: string }[];
  /** Services to suggest first, by slug. */
  services: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "skincare-beauty",
    name: "Skincare & beauty",
    title: "Websites, payments and SEO for skincare and beauty brands.",
    answer:
      "We design and code online stores for skincare and beauty brands that look as considered as the product: editorial photography, ingredient pages, routines and subscriptions. Checkout takes cards, Apple Pay and Google Pay, and every product page is built to be found on Google and recommended in AI answers.",
    build: ["Editorial product pages with ingredients and how-to-use", "Routine and bundle builders", "Subscribe-and-save", "Reviews and before-you-buy FAQs", "Shade or skin-type finders"],
    payments: "Card, Apple Pay and Google Pay checkout with subscriptions, plus a backup processor so a hold on one account doesn't stop orders.",
    search: "People search by concern and ingredient (\"niacinamide serum\", \"best moisturiser for dry skin\"). We build a page for each one your products answer, with structured data so Google and AI tools can read it.",
    faqs: [
      { q: "Can you build a Shopify-style store without Shopify?", a: "Yes. We hand-code the store, with a product catalogue, cart, checkout and subscriptions you manage yourself. We can also work with Shopify if you prefer it." },
      { q: "Can you make product claims for us?", a: "We write clear, compliant copy and avoid medical claims. You approve every word before it goes live." },
    ],
    services: ["website-development", "payment-processing", "seo-ai-search"],
  },
  {
    slug: "med-spas-clinics",
    name: "Med spas, clinics & telehealth",
    title: "Websites, payments and SEO for med spas, clinics and telehealth.",
    answer:
      "We build websites for med spas, clinics and telehealth practices that turn searches into booked consultations: treatment pages, online intake, booking and memberships. It's the same team behind Remade Clinic, so we know how medical-adjacent sites get approved, paid and found.",
    build: ["A page for every treatment, written in plain language", "Online booking and consultation requests", "Intake and assessment flows", "Membership and package plans", "Before-and-after galleries with consent"],
    payments: "Processing for consultations, packages and recurring memberships, set up with a provider that accepts medical and wellness businesses, with a backup ready.",
    search: "Patients search by treatment and city (\"Botox near me\", \"medical weight loss Tampa\"). We set up your Google Business Profile, a page per treatment and per service area, and answers AI tools can quote.",
    faqs: [
      { q: "Is the site HIPAA compliant?", a: "Marketing pages don't hold patient data. Where intake collects health information, we connect a HIPAA-ready intake or EHR provider rather than storing it on the website." },
      { q: "Can you handle memberships?", a: "Yes. Recurring memberships and packages are built into checkout, with the processor set up for them." },
    ],
    services: ["website-development", "seo-ai-search", "payment-processing"],
  },
  {
    slug: "supplements-wellness",
    name: "Supplements & wellness",
    title: "Websites, payments and SEO for supplement and wellness brands.",
    answer:
      "We build supplement and wellness stores with the things that sell in this category: subscriptions, bundles, lab-result pages and FAQs that answer objections. Processing is set up with providers that accept the category, with a backup processor, because supplement merchants are the ones that get shut down.",
    build: ["Subscriptions and bundle discounts", "Ingredient and lab-result pages", "Quiz-led product finders", "Compliant, claim-safe product copy", "Wholesale portal for retailers"],
    payments: "Card, Apple Pay and Google Pay with recurring billing, placed with a processor that accepts supplements, and a second one on standby.",
    search: "Buyers search by goal and ingredient, and increasingly ask AI tools for recommendations. We publish clear ingredient pages and comparisons that both can quote.",
    faqs: [
      { q: "Why do supplement brands need a backup processor?", a: "Mainstream processors often review and close supplement accounts without warning. A second processor already connected means you switch and keep selling." },
      { q: "Do you write the product claims?", a: "We write structure-function safe copy and avoid disease claims. You approve every word." },
    ],
    services: ["payment-processing", "website-development", "seo-ai-search"],
  },
  {
    slug: "research-peptide-brands",
    name: "Research peptide brands",
    title: "Everything to launch a research peptide brand.",
    answer:
      "We supply research peptides wholesale or factory-direct, put your label on every vial, store and ship your orders, and build the website and payment setup to sell them. It's how we run Vanta Labs, our own research-supply store. Research use only.",
    build: ["Catalogue with lot numbers and COA per product", "Research-use-only gate and compliant copy", "Wholesale price requests", "Order tracking and account pages", "Fast, mobile-first checkout"],
    payments: "Processing set up for research-supply merchants, with a backup processor connected, because this category is the first to be reviewed.",
    search: "Researchers search by compound and documentation. We build compound pages, COA libraries and guides written to the research-use-only standard.",
    faqs: [
      { q: "Can you supply the product too?", a: "Yes. Wholesale from our in-stock catalogue, or factory-direct for larger orders, with a certificate of analysis for wholesale lots. For research use only." },
      { q: "Do you make usage or dosing claims?", a: "No. Copy follows a strict research-use-only standard: no human use, dosing or outcome claims." },
    ],
    services: ["wholesale", "white-label", "fulfillment", "website-development", "payment-processing"],
  },
  {
    slug: "coffee-food-beverage",
    name: "Coffee, food & beverage",
    title: "Websites, payments and SEO for coffee, food and beverage brands.",
    answer:
      "We build online stores for roasters, food and beverage brands with subscriptions, gift options and wholesale ordering for cafés and retailers. Checkout is fast on a phone, and every product and origin page is built to be found.",
    build: ["Subscriptions with skip and pause", "Gift cards and gift boxes", "Wholesale ordering for cafés and shops", "Origin, flavour and brewing pages", "Local pickup and delivery zones"],
    payments: "Cards, Apple Pay and Google Pay with recurring billing for subscriptions, and invoicing for wholesale accounts.",
    search: "People search by taste and place (\"single origin coffee subscription\", \"coffee roaster near me\"). We build those pages and your Google Business Profile.",
    faqs: [
      { q: "Can wholesale customers order on the same site?", a: "Yes. A separate login with wholesale pricing and invoicing, on the same store." },
      { q: "Can you ship our products for us?", a: "Yes. Our 3PL can store, pack and ship orders under your brand." },
    ],
    services: ["website-development", "seo-ai-search", "fulfillment"],
  },
  {
    slug: "apparel-fashion",
    name: "Apparel & fashion",
    title: "Websites, payments and SEO for apparel and fashion brands.",
    answer:
      "We build fashion stores that feel like the brand: editorial lookbooks, fast filtering by size and colour, drops and pre-orders. Checkout takes cards, Apple Pay and Google Pay, and we can store and ship your inventory.",
    build: ["Lookbooks and campaign pages", "Size, colour and fit filters", "Drops, waitlists and pre-orders", "Size guides and easy returns", "Collections that rank on Google"],
    payments: "Fast mobile checkout with Apple Pay and Google Pay, and buy-now-pay-later where your processor supports it.",
    search: "Shoppers search by item and style (\"black technical running jacket\"). We build collection pages and product data that rank and show in shopping results.",
    faqs: [
      { q: "Can you handle limited drops?", a: "Yes. Countdown pages, waitlists and stock limits per customer." },
      { q: "Do you store and ship clothing?", a: "Yes. Our 3PL stores your stock and ships each order as your brand." },
    ],
    services: ["website-development", "fulfillment", "seo-ai-search"],
  },
  {
    slug: "fitness-gyms",
    name: "Gyms, fitness & coaching",
    title: "Websites, payments and SEO for gyms, studios and coaches.",
    answer:
      "We build websites for gyms, studios and online coaches that sell memberships and programmes directly: class schedules, trial offers, booking and recurring billing. Then we make you the first result when someone nearby searches for a gym.",
    build: ["Memberships and free-trial sign-up", "Class schedules and booking", "Online programmes and coaching plans", "Coach and trainer profiles", "Member log-in area"],
    payments: "Recurring memberships and one-off packages, with failed-payment follow-ups so lapsed cards don't become lost members.",
    search: "People search locally (\"gym near me\", \"pilates studio Brandon FL\"). We set up your Google Business Profile, class and location pages.",
    faqs: [
      { q: "Can members book classes on the site?", a: "Yes, with your schedule built in or connected to the booking software you use." },
      { q: "Do you sell online coaching?", a: "Yes. Programmes, check-ins and recurring billing in one place." },
    ],
    services: ["website-development", "seo-ai-search", "payment-processing"],
  },
  {
    slug: "restaurants-cafes",
    name: "Restaurants & cafés",
    title: "Websites and SEO for restaurants, cafés and bars.",
    answer:
      "We build restaurant websites that do the three things guests need, fast on a phone: see the menu, book a table, order. Then we set up Google so you show in Maps and in AI answers when people nearby ask where to eat.",
    build: ["Mobile menu that's quick to update", "Reservations and online ordering", "Private events and catering enquiries", "Gift cards", "Location and hours, correct everywhere"],
    payments: "Online ordering and gift cards with cards, Apple Pay and Google Pay, connected to the systems you already use where possible.",
    search: "Diners search \"near me\" and ask AI tools for recommendations. We keep your Google Business Profile, menu and hours accurate across the listings those tools read.",
    faqs: [
      { q: "Can I update the menu myself?", a: "Yes, in a simple editor. Or message your developer team and it's done." },
      { q: "Can you connect online ordering?", a: "Yes. We build it in or connect your current ordering provider." },
    ],
    services: ["website-development", "seo-ai-search"],
  },
  {
    slug: "home-services",
    name: "Home services & trades",
    title: "Websites and SEO for home services and trades.",
    answer:
      "We build websites for plumbers, roofers, cleaners, HVAC and other trades that turn local searches into calls and quote requests. Every service and service area gets its own page, and your Google Business Profile is set up to win the map results.",
    build: ["Click-to-call and quote requests on every page", "A page per service and per area you cover", "Reviews and recent jobs", "Online booking and deposits", "Financing and payment links"],
    payments: "Deposits, invoices and payment links your customers can pay by card, Apple Pay or Google Pay.",
    search: "Customers search with urgency and a place (\"emergency plumber near me\"). We build service-area pages and keep your listings consistent so you show in the map pack and AI answers.",
    faqs: [
      { q: "Can customers pay deposits online?", a: "Yes. Deposits and invoices with card and wallet payments." },
      { q: "Do I need a page for every town?", a: "For the towns you actually serve, yes. Each gets useful, specific content, not copies." },
    ],
    services: ["website-development", "seo-ai-search", "payment-processing"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    title: "Websites and SEO for real estate agents and brokerages.",
    answer:
      "We build real estate websites with listing search, neighbourhood guides and lead capture that sends every enquiry to you. Neighbourhood and buyer guides are written to rank and to be quoted when people ask AI where to live.",
    build: ["Listing search connected to your MLS feed", "Neighbourhood and community guides", "Home valuation requests", "Agent profiles and reviews", "Lead routing to your phone and CRM"],
    payments: "Payment links for deposits, application fees and services, where they apply.",
    search: "Buyers and sellers search by area (\"homes for sale in Riverview\", \"what's my home worth\"). We build those pages and your local listings.",
    faqs: [
      { q: "Can you connect my MLS listings?", a: "Yes, through your MLS's IDX feed or provider." },
      { q: "Where do leads go?", a: "To your phone, email or CRM, instantly." },
    ],
    services: ["website-development", "seo-ai-search"],
  },
  {
    slug: "salons-barbers",
    name: "Salons & barbers",
    title: "Websites and SEO for salons, barbers and studios.",
    answer:
      "We build salon and barber websites that show your work and get chairs booked: portfolio galleries, online booking, prices and gift cards. Then we set up Google so you're the shop people find when they search nearby.",
    build: ["Online booking by stylist and service", "Portfolio and Instagram galleries", "Service menu and gift cards", "Deposits and no-show protection", "Products shop"],
    payments: "Booking deposits, gift cards and retail product sales with cards, Apple Pay and Google Pay.",
    search: "Clients search by service and place (\"balayage near me\", \"best barber in Brandon\"). We build those pages and keep your profile current.",
    faqs: [
      { q: "Can clients book a specific stylist?", a: "Yes, by stylist, service and time, or connected to your current booking app." },
      { q: "Can we take deposits?", a: "Yes, to cut no-shows." },
    ],
    services: ["website-development", "seo-ai-search"],
  },
  {
    slug: "professional-services",
    name: "Law, finance & professional services",
    title: "Websites and SEO for law firms, accountants and consultants.",
    answer:
      "We build websites for firms that sell expertise: clear practice-area pages, credible team profiles and consultation booking. Content is written to answer the questions clients search and ask AI, so you're the firm that gets quoted.",
    build: ["A page per practice area or service", "Team and credentials pages", "Consultation booking and intake", "Client portal links and secure uploads", "Insights and guides that rank"],
    payments: "Retainers, invoices and consultation fees by card, Apple Pay and Google Pay.",
    search: "Clients search their problem (\"how to form an LLC in Florida\"). We publish expert answers that rank and that AI tools cite.",
    faqs: [
      { q: "Can clients pay invoices online?", a: "Yes, with payment links and card or wallet checkout." },
      { q: "Who writes the content?", a: "We draft it from your expertise and you approve it. Nothing goes live without your sign-off." },
    ],
    services: ["website-development", "seo-ai-search", "payment-processing"],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
