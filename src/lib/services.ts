/**
 * The six services, as data. Each service page, the home page, the sitemap,
 * the JSON-LD and llms.txt are rendered from this file.
 *
 * COPY RULES (from .claude/skills/vanta-creative-director/references/compliance.md):
 * no price, minimum, rate, turnaround or certification is stated anywhere,
 * because none is configured for this business yet; publishing one would be a
 * commitment nobody has priced. Every service is "quoted to you". Describe what
 * a thing is, never what it will do. Never imply human use.
 *
 * `answer` is written to be quotable on its own: it is the paragraph an AI
 * assistant or a search snippet should lift, so it names the service, says
 * what it is and says who it is for, in two or three sentences.
 */

export type DemoKey = "wholesale" | "label" | "fulfillment" | "payments" | "storefront" | "launch";

export type Service = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  card: string;
  answer: string;
  demo: DemoKey;
  includes: { title: string; body: string }[];
  boundaries: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  guides: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "wholesale",
    name: "Wholesale",
    eyebrow: "Wholesale supply",
    title: "Supply priced to your volume.",
    lede: "Research materials in quantity for brands, resellers and laboratories. Tell us what you order and how often, and we quote around it.",
    card: "Bulk supply quoted to your volume and reorder cadence.",
    answer:
      "Vanta Foundry wholesale is bulk supply of research-use-only materials to approved business accounts. Pricing is quoted per account from the volume and reorder cadence you give us, not from a public price sheet. Every lot we supply is matched to its certificate of analysis where one has been issued.",
    demo: "wholesale",
    includes: [
      { title: "Quotes to your volume", body: "You tell us quantities and cadence. The quote is built from those, not from a tier table." },
      { title: "Standing orders", body: "Agree a requirement once, then reorder without restating it." },
      { title: "Lot-matched documentation", body: "Each lot is matched to its published certificate of analysis where one has been issued." },
      { title: "A named contact", body: "One person at Vanta Foundry who knows your account, not a general queue." },
    ],
    boundaries: [
      "We don't publish minimums or prices. Both depend on what you order.",
      "Approval isn't automatic. We review every application.",
      "We don't open accounts for businesses that market these materials for human or veterinary use.",
    ],
    steps: [
      { title: "Apply", body: "Your business, what you need, how often." },
      { title: "Review", body: "We confirm fit and what we can supply." },
      { title: "Quote", body: "Pricing for the volume you asked about." },
      { title: "Order", body: "Approved accounts order directly." },
    ],
    faqs: [
      {
        q: "Is there a minimum order?",
        a: "Minimums are set per account during review. Put your expected volume in the application and the quote will reflect it.",
      },
      {
        q: "Can I see the catalogue before applying?",
        a: "The full catalogue opens once your account is approved. If you need to know whether we carry something specific, ask in your application.",
      },
      {
        q: "How is each lot documented?",
        a: "Each lot we supply is matched to its published certificate of analysis where one has been issued, and the lot number travels with the order.",
      },
      {
        q: "Who can open a wholesale account?",
        a: "Research-supply brands, resellers and laboratories that sell or use these materials for research. We decline businesses that market them for human or veterinary use.",
      },
    ],
    guides: ["dropship-vs-3pl-vs-inventory", "what-a-certificate-of-analysis-should-show"],
  },
  {
    slug: "white-label",
    name: "White label",
    eyebrow: "White & private label",
    title: "Your label. Our lot.",
    lede: "Sell under your own brand. We supply the material, produce the label to your design and keep every unit traceable to its lot.",
    card: "Your brand on the label, with lot traceability on every unit.",
    answer:
      "Vanta Foundry white label lets a research-supply brand sell materials we supply under its own name. We produce labels to your design, apply them to supplied units and keep every unit traceable to its lot and certificate of analysis. You approve a proof before anything is printed.",
    demo: "label",
    includes: [
      { title: "Your design, or ours", body: "Send finished artwork, or we design the label inside your brand." },
      { title: "Proof before print", body: "You approve a proof of every label before production starts." },
      { title: "Lot on every unit", body: "Each label carries its lot number, so any unit traces back to its report." },
      { title: "A compliant panel", body: "Every label carries the research-use-only statement. No usage, dosing or outcome claims." },
    ],
    boundaries: [
      "We won't print a label that makes a usage, dosing or outcome claim.",
      "Timelines and minimums are quoted per project, with your proposal.",
    ],
    steps: [
      { title: "Brief", body: "Your brand, the catalogue you want, quantities." },
      { title: "Proof", body: "We send a label proof for each unit." },
      { title: "Approve", body: "Nothing is printed until you sign off." },
      { title: "Produce", body: "Labelled, lot-recorded, ready to sell or ship." },
    ],
    faqs: [
      {
        q: "What is the difference between white label and private label?",
        a: "In this category the terms are used interchangeably: material supplied by one business, sold under another business's brand. We use both.",
      },
      {
        q: "How long does a white-label run take?",
        a: "It depends on the label, the quantities and current stock. Your proposal includes a timeline before you commit to anything.",
      },
      {
        q: "Can you design the label for us?",
        a: "Yes. We can work from your brand guidelines, or from a name and a direction if you are starting out.",
      },
      {
        q: "Can my customers look up the lot?",
        a: "Yes. The lot number is printed on every label, so the matching certificate of analysis can be found from the unit itself.",
      },
    ],
    guides: ["how-white-label-research-supply-works", "research-use-only-storefront-copy"],
  },
  {
    slug: "fulfillment",
    name: "Fulfillment",
    eyebrow: "Fulfillment · 3PL · Dropship",
    title: "We pack it. It ships as you.",
    lede: "Hold no inventory and we ship from ours, or store your inventory with us and we fulfill it. Either way the parcel carries your brand.",
    card: "Dropship or 3PL. Your packing slip, your tracking emails.",
    answer:
      "Vanta Foundry offers two fulfillment models for research-supply brands. With dropship, you sell and we ship from our stock under your brand, so you hold no inventory. With third-party logistics (3PL), you own the inventory and we store it and fulfill your orders. In both, the packing slip and shipping notifications carry your brand.",
    demo: "fulfillment",
    includes: [
      { title: "Dropship", body: "Sell without holding stock. Orders ship from ours, as you." },
      { title: "3PL", body: "Your inventory, stored and fulfilled by us." },
      { title: "Your brand on the parcel", body: "Packing slip and notifications carry your name." },
      { title: "Lots recorded per shipment", body: "Every shipment records the lots inside it, so any order question has an answer." },
    ],
    boundaries: [
      "Rates depend on volume and model and are quoted per account.",
      "Where we ship, and how fast, is confirmed with your proposal.",
    ],
    steps: [
      { title: "Choose a model", body: "Dropship, 3PL, or a mix of both." },
      { title: "Connect", body: "Orders flow in from your store; tracking flows back." },
      { title: "Brand", body: "Your packing slip and notification wording." },
      { title: "Ship", body: "We pick, pack and record the lots for every order." },
    ],
    faqs: [
      {
        q: "What is the difference between dropship and 3PL?",
        a: "Dropship ships from our stock, so you hold no inventory and pay for what you sell. 3PL ships from inventory you own and store with us. Our guide compares both with holding stock yourself.",
      },
      {
        q: "Will my customers see Vanta Foundry on the package?",
        a: "No. The packing slip and shipping notifications carry your brand.",
      },
      {
        q: "Can I use both models?",
        a: "Yes. Some brands hold their best sellers with us as 3PL and dropship the long tail.",
      },
    ],
    guides: ["dropship-vs-3pl-vs-inventory"],
  },
  {
    slug: "payments",
    name: "Payments",
    eyebrow: "Payments setup",
    title: "Checkout that stays up.",
    lede: "Research-supply merchants lose processors without warning. We set up checkout with a primary and a backup, so a switch is a setting, not a rebuild.",
    card: "A primary and a backup processor behind one checkout.",
    answer:
      "Vanta Foundry is not a payment processor. We build your checkout so it can run on more than one processor, introduce you to processors that work with research-supply merchants, and set up the consented texts and emails that follow up on declined and abandoned checkouts. Whether a processor approves your account is that processor's decision.",
    demo: "payments",
    includes: [
      { title: "Primary and backup", body: "Checkout knows two processors. If one stops, you switch to the other." },
      { title: "Switch, don't rebuild", body: "Changing processor is a setting in your dashboard, not a new site." },
      { title: "Introductions", body: "We introduce you to processors that work with this category." },
      { title: "Recovery texts and email", body: "Follow-up on declined and abandoned checkouts, with consent, STOP and quiet hours enforced." },
    ],
    boundaries: [
      "We don't process payments or hold your funds.",
      "We can't guarantee approval or rates. Those are between you and the processor.",
    ],
    steps: [
      { title: "Review", body: "Your current setup and where it is exposed." },
      { title: "Introduce", body: "Processors that work with research-supply merchants." },
      { title: "Build", body: "Checkout wired for a primary and a backup." },
      { title: "Recover", body: "Consented follow-up on declines and abandoned carts." },
    ],
    faqs: [
      {
        q: "Are you a payment processor?",
        a: "No. We build the checkout and make introductions. The processor underwrites your account, moves the money and sets the rates.",
      },
      {
        q: "Can you guarantee my account gets approved?",
        a: "No one honest can. Approval is the processor's decision. We prepare you for the review and introduce you to processors that work with this category.",
      },
      {
        q: "What happens if my processor closes my account?",
        a: "Your checkout already knows the backup, so you switch to it in your dashboard instead of rebuilding. Whether saved payment details carry over depends on how they were stored, which we explain during setup.",
      },
      {
        q: "Do recovery texts follow the rules?",
        a: "Yes. Texts go only to people who opted in, STOP works immediately, and nothing is sent during quiet hours in the recipient's time zone.",
      },
    ],
    guides: ["why-run-a-backup-payment-processor"],
  },
  {
    slug: "storefronts",
    name: "Storefronts",
    eyebrow: "Website development",
    title: "A storefront built like ours.",
    lede: "Storefronts and wholesale portals on the same foundations as Vanta Labs: fast pages, a gated catalogue, a public COA library and a checkout that can change processor.",
    card: "Custom storefronts and wholesale portals, built on our stack.",
    answer:
      "Vanta Foundry builds custom storefronts and wholesale portals for research-supply brands. Sites are built on Next.js and include what this category needs: a research-use attestation at entry, an account-gated catalogue, a searchable certificate-of-analysis library, consented email and SMS, and a checkout that can run on more than one processor.",
    demo: "storefront",
    includes: [
      { title: "Attestation at entry", body: "Visitors confirm research-use terms before they reach the catalogue." },
      { title: "Gated catalogue", body: "Products and pricing open to signed-in accounts." },
      { title: "COA library", body: "Reports searchable by product, batch or lot number." },
      { title: "Built to be found", body: "Crawlable pages, structured data and llms.txt, for search engines and AI assistants." },
      { title: "Consent-first messaging", body: "Email and SMS sign-up with consent records, STOP and quiet hours." },
      { title: "Multi-processor checkout", body: "The payments setup above, built in." },
    ],
    boundaries: [
      "No one can promise search rankings, and we won't.",
      "Scope, timeline and price are quoted per project.",
    ],
    steps: [
      { title: "Scope", body: "Storefront, wholesale portal, or both." },
      { title: "Design", body: "Your brand, in a layout built for this category." },
      { title: "Build", body: "Catalogue, COA library, checkout, messaging." },
      { title: "Launch", body: "Copy reviewed against research-use standards first." },
    ],
    faqs: [
      {
        q: "Can you rebuild my existing store?",
        a: "Yes. We can rebuild on our stack or work from what you have. The proposal recommends one and says why.",
      },
      {
        q: "Will my site show up in AI assistants like ChatGPT and Perplexity?",
        a: "No one can promise that. We build pages that answer the questions buyers ask, with the structured data and llms.txt file that search engines and AI assistants read.",
      },
      {
        q: "Can you build a wholesale portal for my own customers?",
        a: "Yes. Account approval, customer-specific pricing and reorders can sit behind the same sign-in as your storefront.",
      },
    ],
    guides: ["research-use-only-storefront-copy"],
  },
  {
    slug: "launch",
    name: "Launch",
    eyebrow: "Brand launch",
    title: "From name to first order.",
    lede: "For new brands: one plan for supply, label, storefront, payments and fulfillment, in the order they need to happen.",
    card: "Everything above, in sequence, for a new brand.",
    answer:
      "The Vanta Foundry launch program combines our services into one plan for a new research-supply brand: catalogue selection, white-label design, storefront build, processor introductions and fulfillment setup, delivered in sequence by one team, with the site's copy reviewed against research-use-only standards before launch.",
    demo: "launch",
    includes: [
      { title: "Catalogue plan", body: "What to carry first, and what to add later." },
      { title: "Brand and label", body: "Name, label system and packaging." },
      { title: "Storefront", body: "Built, stocked and connected to fulfillment." },
      { title: "Payments", body: "Primary and backup processor, recovery messaging." },
      { title: "Fulfillment", body: "Dropship from day one, 3PL when volume justifies it." },
      { title: "Copy review", body: "Every page checked against research-use-only standards." },
    ],
    boundaries: ["One plan, one team, quoted as a whole. Each part is also available on its own."],
    steps: [
      { title: "Plan", body: "Catalogue, brand, budget, sequence." },
      { title: "Build", body: "Label, storefront, checkout, fulfillment." },
      { title: "Review", body: "Copy and compliance, page by page." },
      { title: "Open", body: "First orders ship as you." },
    ],
    faqs: [
      {
        q: "Do I have to use every service?",
        a: "No. The launch program is the services combined. Each is available on its own.",
      },
      {
        q: "Do you review my marketing?",
        a: "We review your storefront copy against research-use-only standards before launch, and won't launch a site that makes usage or outcome claims.",
      },
    ],
    guides: ["how-white-label-research-supply-works", "research-use-only-storefront-copy"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
