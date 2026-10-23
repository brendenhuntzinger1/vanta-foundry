import { BUYER_GUIDES } from "./guides-buyer";

/**
 * Guides: the site's search and AI-search surface.
 *
 * Each guide opens with `answer`, a self-contained two-to-three sentence
 * answer to the question in its title, because that is the passage search
 * snippets and AI assistants quote. The sections then earn the answer.
 *
 * Rules as for services.ts: no figures we cannot source, no human-use framing,
 * nothing that reads as legal advice.
 */

export type Guide = {
  slug: string;
  title: string;
  question: string;
  description: string;
  answer: string;
  updated: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
  services: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "payment-processor-shut-down-what-to-do",
    title: "Stripe, PayPal or Square shut down your account? What to do next",
    question: "What should a business do when Stripe, PayPal or Square closes its account?",
    description: "The first 48 hours after a payment processor closes your account: what happens to your money, how to keep selling, and how to avoid it next time.",
    answer:
      "Stop the bleeding first: move checkout to a processor that accepts your business type, so you can take orders again. Then deal with the old account: find out whether funds are held in a reserve and when they release, and download your transaction history. Long term, run a second processor already connected, so the next closure is a switch, not a shutdown.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Why it happens",
        p: [
          "Payment aggregators like Stripe, PayPal and Square approve accounts instantly and review them later. When a later review finds a business type outside their rules, a jump in volume, or a high refund or chargeback rate, they can close the account with little warning.",
          "Some categories are reviewed more often than others: supplements, research supply, telehealth, subscriptions and anything with a long delivery time.",
        ],
      },
      {
        h: "The first 48 hours",
        list: [
          "**Take payments again.** Apply with a processor that accepts your business type and connect it to your checkout. This is the step that stops lost sales.",
          "**Read the closure email.** It usually says whether funds are held, for how long, and why.",
          "**Download your data.** Transaction history, customer receipts and dispute records, before access is limited.",
          "**Answer open disputes.** Unanswered chargebacks are lost by default and count against you with the next processor.",
        ],
      },
      {
        h: "Held funds and reserves",
        p: [
          "A processor that closes an account often holds part of the balance as a reserve, to cover refunds and chargebacks that arrive later. The hold period is set in the processor's terms. Keep records of every order so you can answer anything that comes up while the reserve runs.",
        ],
      },
      {
        h: "How to not be here again",
        list: [
          "Apply with a processor that approves your business type up front, rather than one that reviews it after the fact.",
          "Keep a second processor connected to your checkout, so switching is a setting, not a rebuild.",
          "Watch refunds and chargebacks, and make cancellation and support easy to find.",
          "Describe what you sell accurately on your application and your website.",
        ],
      },
    ],
    services: ["payment-processing", "website-development"],
  },
  {
    slug: "high-risk-vs-standard-merchant-account",
    title: "High-risk vs standard merchant accounts",
    question: "What is the difference between a high-risk and a standard merchant account?",
    description: "Why some businesses are classed as high-risk by payment processors, what changes in a high-risk merchant account, and how to tell which one you need.",
    answer:
      "A high-risk merchant account is a card-processing account for business types that processors expect to have more chargebacks, refunds or regulatory questions. It usually comes with a closer review, rolling reserves and different rates. A standard account suits low-risk businesses; if you sell in a reviewed category, applying for the right account up front is what keeps you from being shut down later.",
    updated: "2026-10-23",
    sections: [
      {
        h: "What makes a business high-risk",
        list: [
          "The category: supplements, research supply, telehealth, CBD, travel, subscriptions and similar.",
          "Long delivery times or pre-orders, which raise the chance of disputes.",
          "Recurring billing.",
          "A history of chargebacks or a past account closure.",
          "High average order values or fast-growing volume.",
        ],
      },
      {
        h: "What changes in a high-risk account",
        list: [
          "**Underwriting.** More documents up front: business details, website review, processing history.",
          "**Reserves.** A share of sales may be held for a period to cover future chargebacks.",
          "**Rates.** Pricing reflects the risk; it is quoted for your business.",
          "**Stability.** The upside: the processor approved your business type knowingly, so it is less likely to close the account for being what it is.",
        ],
      },
      {
        h: "Which one do you need?",
        p: [
          "If a mainstream aggregator's rules exclude your category, or you have been closed before, apply for a high-risk account. If you are unsure, describe exactly what you sell to the processor before you apply and ask.",
        ],
      },
    ],
    services: ["payment-processing"],
  },
  {
    slug: "seo-vs-geo",
    title: "SEO vs GEO: what's the difference?",
    question: "What is the difference between SEO and GEO (generative engine optimisation)?",
    description: "SEO gets your pages ranked in search results; GEO gets your business named in AI answers from ChatGPT, Gemini, Perplexity and Google AI Overviews. How they differ and why you need both.",
    answer:
      "SEO (search engine optimisation) is the work that gets your pages ranked in Google's results. GEO (generative engine optimisation) is the work that gets your business understood and named in AI answers from tools like ChatGPT, Gemini, Perplexity and Google's AI Overviews. GEO builds on SEO: AI tools read the same web, so a fast, well-structured site with clear answers helps both.",
    updated: "2026-10-23",
    sections: [
      {
        h: "What SEO covers",
        list: [
          "Technical health: speed, mobile, indexing, structured data.",
          "Pages that match what people search for.",
          "Links and mentions from other sites.",
          "For local businesses, a complete Google Business Profile and reviews.",
        ],
      },
      {
        h: "What GEO adds",
        list: [
          "Clear, quotable answers near the top of each page.",
          "Consistent facts about your business everywhere it appears: name, services, location, contact.",
          "Mentions on the sites, directories and reviews AI tools draw from.",
          "Machine-readable summaries such as structured data and an llms.txt file.",
        ],
      },
      {
        h: "Can anyone guarantee AI mentions?",
        p: [
          "No. AI tools decide what to say, and their answers change. Anyone promising a guaranteed spot in ChatGPT is overselling. What you can do is make your business the easiest one to understand and the best-documented answer to the question.",
        ],
      },
    ],
    services: ["seo-ai-search", "website-development"],
  },
  {
    slug: "white-label-vs-private-label-vs-factory-direct",
    title: "White label vs private label vs factory-direct",
    question: "What is the difference between white label, private label and factory-direct supply?",
    description: "Three ways to sell research products under your own name: white label, private label and factory-direct, compared on cost, control and time to launch.",
    answer:
      "White label puts your brand on an existing, already-made product, so it is the fastest way to launch. Private label means the product is made for you to your specification, with more control and a longer lead time. Factory-direct means ordering straight from the manufacturer in larger quantities, for the lowest unit cost. All three are for research use only when the product is a research material.",
    updated: "2026-10-23",
    sections: [
      {
        h: "White label",
        p: ["An existing product, relabelled with your brand. You choose the label design; the product and its documentation are the supplier's. Best for launching quickly and testing what sells."],
      },
      {
        h: "Private label",
        p: ["A product made for your brand to an agreed specification. More control over the product itself, usually with larger order sizes and a longer lead time than white label."],
      },
      {
        h: "Factory-direct",
        p: ["Ordering directly from the manufacturer, typically in large planned quantities. It gives the lowest unit cost, and documentation such as a certificate of analysis should come with each lot."],
      },
      {
        h: "Which to choose",
        list: [
          "Launching or testing: white label.",
          "Proven demand and a specific product in mind: private label.",
          "Steady, high volume: factory-direct.",
        ],
      },
    ],
    services: ["white-label", "factory-direct", "wholesale"],
  },
  {
    slug: "dropship-vs-3pl-vs-inventory",
    title: "Dropship, 3PL or your own inventory",
    question: "Should a research-supply brand dropship, use a 3PL, or hold its own inventory?",
    description:
      "How dropshipping, third-party logistics and self-fulfillment compare for research-supply brands, in cash, control and risk.",
    answer:
      "Dropship when you are proving demand: you hold no stock and pay only for what sells. Move to a 3PL once you know your best sellers and want a lower unit cost and control of your inventory. Self-fulfill only if you want to run a warehouse, because packing, lot records and returns become your job.",
    updated: "2026-10-23",
    sections: [
      {
        h: "The three models",
        list: [
          "**Dropship.** You sell; your supplier ships from its stock under your brand. You never own the inventory.",
          "**Third-party logistics (3PL).** You buy inventory and store it with a fulfillment partner, who picks, packs and ships your orders.",
          "**Self-fulfillment.** You buy inventory, store it and ship it yourself.",
        ],
      },
      {
        h: "Cash",
        p: [
          "Dropship needs the least cash up front, because you pay for units as they sell. 3PL and self-fulfillment both tie cash up in stock before the first order arrives.",
          "The trade is the unit cost. Buying in quantity usually lowers what you pay per unit, so the models that need more cash up front tend to cost less per order once volume is steady.",
        ],
      },
      {
        h: "Control",
        p: [
          "With your own inventory you decide what to hold and when to reorder. With dropship you depend on your supplier's stock levels, so ask how out-of-stock items are handled before you list them.",
          "In research supply, control also means documentation. Whichever model you choose, every shipment should record the lots inside it, so that you can answer a customer's question about an order with the matching certificate of analysis.",
        ],
      },
      {
        h: "Risk",
        p: [
          "Dropship moves stock risk to the supplier. You can't be left holding units that don't sell. 3PL and self-fulfillment keep that risk with you, along with storage conditions and expiry dates.",
          "Self-fulfillment adds operational risk: packing errors, missed lot records and delays when the person packing is unavailable.",
        ],
      },
      {
        h: "A sensible sequence",
        list: [
          "Start on dropship while you learn what sells.",
          "Move your consistent sellers to 3PL once their volume is predictable.",
          "Keep dropshipping the long tail, so the catalogue stays wide without tying up cash.",
        ],
      },
    ],
    services: ["fulfillment", "wholesale"],
  },
  {
    slug: "what-a-certificate-of-analysis-should-show",
    title: "What a certificate of analysis should show",
    question: "What should a certificate of analysis (COA) for a research material include?",
    description:
      "The fields a credible certificate of analysis carries, what each one tells you, and the warning signs in a weak one.",
    answer:
      "A credible certificate of analysis names the material and the lot it covers, the laboratory that ran the analysis and the date, the methods used to confirm identity and measure purity, and the results with their units. It should match a lot number you can find on the unit itself. A COA with no lot number, no date or no method is a marketing document, not a report.",
    updated: "2026-10-23",
    sections: [
      {
        h: "The fields that matter",
        list: [
          "**Material and lot number.** The report has to cover a specific production lot, and the same lot number should be printed on the unit.",
          "**Laboratory and date.** Who ran the analysis, and when.",
          "**Identity method.** How the material was confirmed to be what it claims to be, commonly by mass spectrometry.",
          "**Purity method and result.** How purity was measured, commonly by high-performance liquid chromatography (HPLC), and the result.",
          "**Raw data.** A chromatogram or spectrum, so the result can be read rather than just believed.",
        ],
      },
      {
        h: "Warning signs",
        list: [
          "One report reused across every lot of a product.",
          "No lot number, or a lot number that matches nothing on the label.",
          "A purity figure with no method beside it.",
          "No date, or a date years before the lot was made.",
          "A certificate that cannot be found again later, for example one sent only as an image in a chat.",
        ],
      },
      {
        h: "Why the lot link matters",
        p: [
          "A report proves something about one lot. Its value to your customer depends entirely on being able to connect the unit in front of them to that report. That is why lot numbers belong on labels, on packing records and in a searchable library, not only in an email thread.",
          "If you sell under your own brand, the lot on your label should resolve to the report for that lot, wherever your customer looks it up.",
        ],
      },
    ],
    services: ["wholesale", "white-label"],
  },
  {
    slug: "how-white-label-research-supply-works",
    title: "How white-label research supply works",
    question: "How does white-label (private-label) research supply work?",
    description:
      "The steps from brief to labelled stock, what you decide and what the supplier decides, and what belongs on a research-use label.",
    answer:
      "In white-label research supply, a supplier provides the material and you sell it under your own brand. You choose the catalogue and approve the label design. The supplier produces and applies the labels and keeps each unit traceable to its lot. A proof is approved before anything is printed, and the label carries the research-use-only statement and the lot number.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Step by step",
        list: [
          "**Brief.** Your brand, the materials you want to carry, and expected quantities.",
          "**Label design.** Your artwork, or a design produced within your brand guidelines.",
          "**Proof.** A proof of each label, checked for lot field, research-use statement and accuracy.",
          "**Approval.** Nothing is printed until you sign off.",
          "**Production.** Labels printed, applied and recorded against lots.",
          "**Selling.** Stock held for you, shipped as you, or delivered to you.",
        ],
      },
      {
        h: "What belongs on the label",
        list: [
          "Your brand name.",
          "The material and quantity as supplied.",
          "The lot number.",
          "A research-use-only statement: not for human or veterinary use.",
          "Optionally, a code that leads to the lot's certificate of analysis.",
        ],
        p: ["What does not belong: usage directions, dosing, preparation steps or any claim about effects."],
      },
      {
        h: "What to ask a supplier",
        list: [
          "Will I approve a proof before printing?",
          "Is the lot number printed on every unit?",
          "Can my customers find the report for that lot?",
          "What are the minimums and timeline for my quantities?",
          "Will you refuse a label that makes claims? A good supplier will.",
        ],
      },
    ],
    services: ["white-label", "factory-direct"],
  },
  {
    slug: "why-run-a-backup-payment-processor",
    title: "Why research-supply merchants run a backup processor",
    question: "Why should a research-supply merchant have a backup payment processor?",
    description:
      "Why processors close accounts in higher-risk categories, what a backup changes, and what it doesn't.",
    answer:
      "Payment processors can close accounts in higher-risk categories with little notice, and a store with one processor stops taking payments the moment that happens. A checkout built for two processors lets you switch to the backup from a dashboard instead of rebuilding checkout under pressure. A backup doesn't guarantee approval, and how saved payment details carry over depends on how they were stored.",
    updated: "2026-10-23",
    sections: [
      {
        h: "The risk",
        p: [
          "Processors set their own appetite for risk and can change it. Research supply sits in a category many treat as higher risk, so reviews, reserves and closures are part of operating in it.",
          "With a single processor, a closure means checkout stops. The rebuild that follows, with a new application, new integration and new testing, happens while sales are at zero.",
        ],
      },
      {
        h: "What a backup changes",
        list: [
          "**Time to recover.** Switching to a processor that is already approved and integrated takes minutes, not weeks.",
          "**Leverage.** Two relationships are better than one when terms change.",
          "**Planning.** You can move volume deliberately instead of in an emergency.",
        ],
      },
      {
        h: "What it doesn't change",
        list: [
          "Approval is still each processor's decision.",
          "Rates and reserves are set by each processor.",
          "Saved cards and subscriptions only carry over if they were stored in a way both processors can use. Ask before you rely on it.",
        ],
      },
      {
        h: "Recovering the sales you lose anyway",
        p: [
          "Declines and abandoned checkouts happen even when processing is healthy. Consented follow-up by text or email recovers a share of them, as long as it respects the rules: messages only to people who opted in, STOP honored immediately, and nothing during quiet hours.",
        ],
      },
    ],
    services: ["payment-processing", "website-development"],
  },
  {
    slug: "research-use-only-storefront-copy",
    title: "Writing storefront copy for research-use-only products",
    question: "How should a storefront describe research-use-only products?",
    description:
      "Practical copy rules for research-supply storefronts: what to say, what never to say, and why the disciplined version also reads better.",
    answer:
      "Describe what a research material is, never what it does. State identity, quantity, lot and documentation, and carry a clear research-use-only statement. Leave out dosing, usage, preparation, effects, before-and-after framing and testimonials about results. This is practical guidance, not legal advice; take your own advice for your business.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Say this",
        list: [
          "What the material is, and the quantity supplied.",
          "The lot number and where its certificate of analysis can be found.",
          "Storage and handling as a material, for example temperature.",
          "A plain research-use-only statement: not for human or veterinary use.",
        ],
      },
      {
        h: "Never say this",
        list: [
          "Doses, amounts, schedules, cycles, stacks or protocols.",
          "Mixing, reconstitution or preparation directions.",
          "Any claim about effects: health, weight, muscle, recovery, cognition, appearance, ageing or performance.",
          "Before-and-after framing, transformation stories or \"your results\".",
          "Testimonials or reviews that describe effects.",
        ],
      },
      {
        h: "Why the disciplined version reads better",
        p: [
          "Buyers in this category have seen every superlative. A lot number and a searchable report are concrete in a way \"premium\" is not. Copy that shows the document is both the compliant version and the more persuasive one.",
        ],
      },
      {
        h: "Consistency is the whole game",
        p: [
          "A research-use-only statement in the footer doesn't neutralise usage claims in a product description, an email or a text message. Reviewers read everything, so the rule has to hold on every page and in every message.",
        ],
      },
    ],
    services: ["website-development", "white-label"],
  },
];

GUIDES.unshift(...BUYER_GUIDES);

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
