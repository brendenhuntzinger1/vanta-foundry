/**
 * Buyer guides: the questions wholesale buyers and research-supply brands ask
 * before they order, label or build a website. Same contract as guides.ts:
 * answer first, no figures we cannot source, no human-use framing, nothing
 * that reads as legal advice. Every price, minimum and lead time is quoted.
 */

import type { Guide } from "./guides";

export const BUYER_GUIDES: Guide[] = [
  {
    slug: "choose-wholesale-peptide-supplier",
    title: "How to Choose a Wholesale Peptide Supplier",
    question: "How do you choose a wholesale peptide supplier?",
    description:
      "What to check before buying research peptides wholesale: lot documentation, supply facts, quantities and how to compare quotes fairly.",
    answer:
      "Choose a wholesale peptide supplier on evidence you can check: a certificate of analysis for each lot, the same lot number printed on every unit, and written answers on minimums, lead times and shipping. Compare quotes line by line for the same products, sizes and documents, not on unit price alone. Work with a supplier that sells for research use only and refuses usage claims.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Documentation",
        p: [
          "Start with the paperwork, because it is the part you can verify before any money moves. A supplier should be able to show a certificate of analysis (COA) for the lot it intends to ship, not a sample report from an older batch.",
          "Check that the report names a laboratory, a date, a method and a lot number, and that the lot number will be printed on the units you receive. If the laboratory offers a way to verify its reports, use it.",
        ],
        list: [
          "A COA per lot, issued by a named laboratory.",
          "The same lot number on the report and on every unit.",
          "Reports you can find again later, not only images sent in a chat.",
          "A clear research-use-only statement on labels and listings.",
        ],
      },
      {
        h: "Supply Facts",
        p: [
          "Ask how the supplier actually holds and ships product. The answers shape how reliable your own catalog will be.",
        ],
        list: [
          "**Stock or made to order.** In-stock items ship from inventory; made-to-order items carry a lead time that should be written on the quote.",
          "**Lot records.** Does every shipment record which lots are inside it?",
          "**Out-of-stock handling.** Are you told before an order is confirmed, or after?",
          "**Shipping.** Where it ships from, where it can ship to, and how tracking is shared.",
          "**Policy.** Does the supplier refuse buyers who market products for human or veterinary use? A careful one does.",
        ],
      },
      {
        h: "Quantities",
        p: [
          "Minimum order quantities and price breaks vary by product, size and supplier. Do not assume one supplier's terms apply to another.",
          "Ask for the minimum per product and per size, not just per order, and whether you can mix lots or sizes to reach it. If a supplier offers both wholesale stock and factory-direct production, ask which one your quantities fall into, because the lead time and price structure usually differ.",
        ],
      },
      {
        h: "Quote Comparison",
        p: [
          "Two quotes are only comparable when they cover the same thing. Put them side by side and check each line.",
        ],
        list: [
          "Same product names, vial sizes and quantities.",
          "Same documents: a COA per lot, from a named laboratory.",
          "Shipping, packaging and any labelling stated, not left to later.",
          "Lead time written on the quote.",
          "How long the quoted price holds.",
          "Payment terms and accepted methods.",
        ],
      },
      {
        h: "Questions to Ask",
        list: [
          "Can I see the COA for the lot you would ship me?",
          "Is the lot number printed on every unit?",
          "Can the report be verified with the laboratory that issued it?",
          "What is the minimum for each product and size I want?",
          "What lead time applies to this order, and is it on the quote?",
          "How do you handle an item that goes out of stock after I order?",
          "Do you sell for research use only, and do you refuse usage claims?",
        ],
        p: [
          "Vanta Foundry is operated by Vanta Labs, which runs its own research-supply store and publishes a COA library with per-batch reports from named third-party laboratories. Wholesale prices, minimums and lead times are not published; each is quoted per inquiry on WhatsApp or by email.",
        ],
      },
    ],
    services: ["wholesale", "factory-direct"],
  },
  {
    slug: "read-peptide-coa",
    title: "How to Read a Peptide Certificate of Analysis",
    question: "How do you read a certificate of analysis (COA) for a research peptide?",
    description:
      "How to read a peptide COA: report and lot numbers, HPLC purity, mass spectrometry identity, identity screens, and what a purity result does not cover.",
    answer:
      "Read a peptide certificate of analysis in three passes: confirm the identifiers (report number, lot number, laboratory, dates), then the methods (HPLC for purity, mass spectrometry for identity), then the results and what they cover. Match the lot on the report to the lot on the unit, and verify the report with the laboratory that issued it. A purity figure says nothing about content, sterility, endotoxin, solvents or metals unless those tests are on the report.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Identifiers",
        p: [
          "A COA carries two different numbers, and they do different jobs. The **report number** identifies the document. The **lot or batch number** identifies the material that was tested. One lot can have more than one report, for example a purity test and a later retest. A single report should point to one lot.",
          "Alongside those, look for the laboratory's name and contact details, the sample description (the material and the size as submitted), and the dates the sample was received and reported. A report missing the lot number or the laboratory is hard to rely on, however clean the numbers look.",
        ],
      },
      {
        h: "Methods",
        p: [
          "**Purity by HPLC.** High-performance liquid chromatography separates the sample into its components, and a detector reads ultraviolet absorbance as they elute. Peptides are commonly read at 214 nm, where peptide bonds absorb. Purity is reported as area %: the main peak's area as a share of all the peaks detected at that wavelength.",
          "That makes HPLC purity a relative measure. Anything that does not absorb at the chosen wavelength, or does not elute under the method's conditions, is not counted.",
          "**Identity by mass spectrometry.** LC-MS or UPLC-MS measures the mass of the main component. The report should list the observed mass next to the expected mass for the sequence. Agreement within the method's tolerance supports that the material is what the label says. HPLC alone does not confirm identity, so look for both.",
        ],
      },
      {
        h: "Results",
        list: [
          "**Purity.** A figure with its method and wavelength beside it. A number with no method is a claim, not a result.",
          "**Identity.** Observed and expected mass, and a conclusion such as conforms or consistent with.",
          "**Raw data.** A chromatogram and a mass spectrum, so the result can be read rather than taken on trust.",
          "**Identity screens.** Some reports for multi-component solutions are identity screens: they list the compounds detected but not how much of each is present. Read them as a check of what is there, not a measure of amounts.",
          "**Sign-off.** The analyst or reviewer, and the date the report was issued.",
        ],
      },
      {
        h: "Batch Matching",
        p: [
          "A report only covers the units that came from the lot it names. Check that the lot number on the vial or label matches the report exactly, and that the product name and size match too. A report for a different size, a single compound when you hold a blend, or a lot made years earlier does not cover the units in front of you.",
          "Then verify the report with the issuing laboratory, not just the copy you were sent. Some laboratories run a verification page where you enter the report number and an access code; others let you search by lot number; otherwise, contact the laboratory directly.",
          "The Vanta Labs COA library works this way. Reports from Kovera Labs use HPLC purity with LC-MS identity and can be checked on the lab's verify page with the report number and access code. Reports from Horizon Analytical can be searched by lot number.",
        ],
      },
      {
        h: "Limits",
        p: [
          "A purity result answers one question: what share of the detected signal is the main component. It does not establish any of the following unless that test appears on the report:",
        ],
        list: [
          "Peptide content or net peptide weight, which accounts for counter-ions and moisture in the material.",
          "Sterility.",
          "Endotoxin.",
          "Residual solvents.",
          "Heavy metals.",
          "If a test matters to your research, ask whether it was run on the lot you are buying, and ask for the report that shows it. Do not infer it from a high purity figure; each report covers the sample tested, at the time it was tested.",
        ],
      },
    ],
    services: ["wholesale", "white-label"],
  },
  {
    slug: "peptide-website-features",
    title: "Peptide Website Development: Features to Include",
    question: "What features should a peptide or research-supply website include?",
    description:
      "The features a research-supply website needs: a clear catalog, lot-linked documentation, the right ordering flow, integrations and upkeep.",
    answer:
      "A research-supply website needs a catalog that states what each material is and its size, documentation that links every lot to its certificate of analysis, and an ordering flow that fits how you sell: retail checkout, wholesale inquiry or both. Behind that sit integrations for payments, shipping and inventory, and a plan for keeping the catalog and reports current. Research-use-only wording belongs on every page, not only the footer.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Catalog",
        list: [
          "A product page per material, with each available size as a variant.",
          "Plain descriptions of what the material is, never what it does.",
          "Real product photos with the label and lot field visible.",
          "Categories and filters that match how buyers search.",
          "A research-use-only statement on each product page.",
          "Stock status that reflects your actual inventory.",
        ],
      },
      {
        h: "Documentation",
        p: [
          "In this category, documentation is the strongest thing a site can show. Plan it as a feature, not an attachment.",
        ],
        list: [
          "A COA library searchable by lot number and product.",
          "A link from each product page to the reports for the lots in stock.",
          "The laboratory name, report number and date on each entry.",
          "A link to the laboratory's verification page where one exists.",
          "Downloadable report files that stay at the same address.",
        ],
      },
      {
        h: "Ordering",
        p: [
          "Decide how orders arrive before anything is designed. A retail store needs a cart, checkout and order emails. A wholesale business may need only an inquiry flow that sends the buyer's list to your team for a quote. Many research-supply brands run both.",
          "Whatever the flow, order confirmations should record the lots shipped, so a buyer's question can be answered with the matching report.",
        ],
      },
      {
        h: "Integrations",
        list: [
          "**Payments.** A processor that has approved your business type. Whether a provider approves you is its decision, not your website's.",
          "**Shipping.** Labels, tracking numbers and tracking emails.",
          "**Inventory.** Stock levels that update the site, so you do not sell what you do not hold.",
          "**Email.** Order, shipping and inquiry messages that carry your brand.",
          "**Fulfillment.** If a 3PL ships for you, orders need to reach it without manual re-entry.",
        ],
      },
      {
        h: "Maintenance",
        p: [
          "Research-supply catalogs change often: new lots, new reports, sizes added or retired. Someone has to update the site each time, check that report links still work, and keep the copy free of usage or outcome claims as pages are added.",
          "Agree who does that work before launch, whether it is your team or a developer on an ongoing plan.",
        ],
      },
      {
        h: "Scope Checklist",
        list: [
          "Number of products and sizes at launch.",
          "Retail checkout, wholesale inquiry, or both.",
          "COA library: how reports are added and how buyers search them.",
          "Payment processor, shipping and inventory tools to connect.",
          "Pages beyond the catalog: about, contact, policies, guides.",
          "Who updates products and reports after launch.",
        ],
        p: [
          "Vanta Foundry builds custom-coded websites for any lawful business, including research-supply brands. Describe what the site needs in the brief form on the website development page, and the project is quoted in writing.",
        ],
      },
    ],
    services: ["website-development"],
  },
  {
    slug: "retail-vs-wholesale-ordering",
    title: "Retail Checkout vs. B2B Wholesale Ordering",
    question: "What is the difference between retail checkout and B2B wholesale ordering?",
    description:
      "How retail checkout and wholesale ordering differ in buyers, pricing, quantities, quotes and reorders, and how to pick the right workflow.",
    answer:
      "Retail checkout sells single orders at published prices: the buyer adds items to a cart and pays at once. B2B wholesale ordering sells larger quantities at prices set per buyer and per order, usually through an inquiry and a written quote before payment. Many businesses run both, with retail for individual research buyers and a quote-based flow for brands, resellers and laboratories.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Buyer Types",
        p: [
          "A retail buyer orders for their own work, in small quantities, and expects to pay at checkout. A wholesale buyer is usually a business: a research-supply brand, a reseller or a laboratory buying in quantity, often on a schedule.",
          "Wholesale buyers also ask different questions. They want minimums, lead times, lot documentation and shipping terms in writing before they commit.",
          "In research supply, both kinds of buyer should meet the same research-use-only terms. A wholesale supplier should also ask what a business does with the products, and decline buyers who market them for human or veterinary use.",
        ],
      },
      {
        h: "Pricing",
        p: [
          "Retail prices are published and the same for everyone. Wholesale prices depend on the products, sizes and quantities in the order, so they are usually quoted rather than listed.",
          "That is why many wholesale catalogs show products without prices. The buyer sends a list, and the supplier replies with pricing for that order.",
        ],
      },
      {
        h: "Quantities",
        list: [
          "Retail: single units or a few, chosen in a cart.",
          "Wholesale: larger quantities per product and size, sometimes across several lots.",
          "Wholesale minimums are set per product or per order and confirmed on the quote.",
          "Large planned orders may move from stock to made-to-order, with a different lead time.",
        ],
      },
      {
        h: "Quotes",
        p: [
          "A wholesale quote is the agreement in writing. It should state each product, size and quantity, the price, any minimum, the lead time, shipping, the documents that come with the order, and how long the price holds. Payment follows acceptance of the quote rather than happening at a cart.",
        ],
      },
      {
        h: "Reorders",
        p: [
          "Retail reorders start from scratch, or from an order history in the buyer's account. Wholesale reorders are usually repeats of an earlier quote, sometimes with changed quantities. Keeping the earlier quote and its lot records makes the next one faster to confirm.",
        ],
      },
      {
        h: "Choosing a Workflow",
        list: [
          "If most buyers order small amounts and pay at once, use retail checkout.",
          "If buyers order in quantity and need pricing per order, use an inquiry and quote flow.",
          "If you serve both, keep them separate so retail buyers never see wholesale terms and wholesale buyers are not forced through a cart.",
          "If your prices change with quantity or stock, quote rather than publish.",
        ],
        p: [
          "Vanta Labs runs its own research-supply store. Vanta Foundry handles wholesale separately: browse the catalog, send an inquiry on WhatsApp or by email, and pricing for your quantities comes back as a quote.",
        ],
      },
    ],
    services: ["wholesale", "website-development"],
  },
  {
    slug: "private-label-vs-unbranded",
    title: "Private Label vs. Unbranded Wholesale Peptides",
    question: "What is the difference between private label and unbranded wholesale peptides?",
    description:
      "Private label puts your brand on the unit; unbranded wholesale does not. How they compare on branding, quantities, documentation and cost.",
    answer:
      "Private label means the units you buy carry your brand on the label, with your name, the material, the lot number and a research-use-only statement. Unbranded wholesale means you buy the units without your brand on them. Private label adds design, proofing and printing to the order; unbranded is simpler and is often how buyers test demand before committing to a label.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Definitions",
        p: [
          "The terms are used loosely across the industry, so confirm what a supplier means before you compare quotes. In this guide, **private label** means a product supplied with your brand on the label. Vanta Foundry calls this service white label. **Unbranded wholesale** means you buy units that do not carry your brand.",
          "What an unbranded unit does carry varies by supplier. Ask what is printed on it, and make sure the lot number is.",
        ],
      },
      {
        h: "Branding",
        p: [
          "With private label, you decide how the label looks within the rules. A proof should be approved before anything is printed, and the label should carry your brand, the material, the quantity, the lot number and a research-use-only statement. Usage, dosing and effect claims do not belong on it, and a careful supplier will refuse them.",
          "With unbranded units, your brand lives on your website and packaging instead. If you plan to relabel units yourself, you take on the job of keeping each relabelled unit traceable to its original lot.",
        ],
      },
      {
        h: "Quantities",
        p: [
          "Labels add a print run to the order, so private label minimums are often set differently from unbranded minimums. Neither is fixed across suppliers. Ask for both on the same quote if you are deciding between them.",
          "Think about reorders as well as the first order. Once a label is approved, later runs can usually reuse it, so the setup work is mostly at the start. Ask how a change to the label, such as a new size, is handled.",
        ],
      },
      {
        h: "Documentation",
        p: [
          "Either way, every unit needs a lot number that leads to a certificate of analysis. With private label, check that the lot printed on your label is the same lot named on the report, so a buyer who looks it up finds the right document.",
        ],
      },
      {
        h: "Costs",
        list: [
          "**Private label** adds label design (unless you supply artwork), proofing, printing and application.",
          "**Unbranded** skips those steps, so there is less to pay for and less to approve.",
          "Storage and shipping apply to both and depend on whether you hold stock, use a 3PL or dropship.",
          "Every figure is confirmed on the quote for your products and quantities.",
        ],
      },
      {
        h: "Choosing",
        list: [
          "Testing which products sell: start unbranded.",
          "Building a brand buyers recognise: private label.",
          "Selling under your own name on a website or marketplace: private label, so the unit matches the listing.",
          "Unsure: ask for both options on one quote and compare.",
        ],
      },
    ],
    services: ["white-label", "wholesale"],
  },
  {
    slug: "prepare-wholesale-order",
    title: "How to Prepare a Wholesale Peptide Order",
    question: "How do you prepare a wholesale order for research peptides?",
    description:
      "What to put in a wholesale peptide inquiry so the quote comes back complete: products, sizes, quantities, destination and documents.",
    answer:
      "Prepare a wholesale peptide order as a written list: each product with its vial size and number of vials, the destination, your business name and the documents you need with the shipment. A complete inquiry gets a complete quote, with pricing, minimums and lead time for exactly what you asked for. Review the quote line by line before you accept it.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Product List",
        p: [
          "Write down every product by its catalog name. Where a product comes in more than one size, name the size too. A list with names alone leaves the supplier to guess, and a guessed quote has to be redone.",
          "Keep blends and single compounds as separate lines, since they are separate products with separate reports. Here is a sample inquiry with everything a supplier needs to quote it. It has no prices, because those come back in the reply.",
        ],
        list: [
          "Business: Example Research Supply LLC, contact name and email.",
          "BPC-157, 10mg vials: 100 vials.",
          "GHK-Cu, 50mg vials: 50 vials.",
          "Epithalon, 10mg vials: 50 vials.",
          "NAD+, 500mg vials: 25 vials.",
          "Ship to: one business address in Columbus, Ohio, United States.",
          "Please include: a COA per lot, lot numbers on the invoice, unbranded units, and the lead time.",
        ],
      },
      {
        h: "Formats",
        p: [
          "Check the sizes each product is actually offered in. If you need a size that is not listed, ask whether it can be supplied and expect it to be quoted separately, possibly as a made-to-order item with its own lead time.",
          "If you want the units under your own brand, say so in the first message. A white-label order adds a label proof and printing, which changes the quote.",
        ],
      },
      {
        h: "Quantities",
        p: [
          "Give a number of vials for each line, not a budget. If you are flexible, give a range or say you would like price breaks shown, so the quote can tell you where the minimums and breaks fall.",
        ],
      },
      {
        h: "Destination",
        p: [
          "State the country, region and type of address the order ships to, and whether it is one destination or several. Shipping options, cost and what can be shipped all depend on it. You are responsible for knowing what your destination requires; the supplier will tell you where it can and cannot ship.",
        ],
      },
      {
        h: "Documents",
        list: [
          "A certificate of analysis for each lot in the shipment.",
          "Lot numbers recorded against each line of the order.",
          "An invoice in your business name.",
          "For white label, the approved label proof.",
        ],
      },
      {
        h: "Quote Review",
        list: [
          "Every line matches your list: product, size and quantity.",
          "Price per line and total, with shipping shown.",
          "Minimums stated, and whether your order meets them.",
          "Lead time written down.",
          "Documents listed: a COA per lot.",
          "How long the quote holds, and how payment works.",
        ],
        p: [
          "On Vanta Foundry, tap Inquire on any catalog product and WhatsApp or email opens with it filled in. Add the rest of your list and send it; pricing comes back as a quote.",
        ],
      },
    ],
    services: ["wholesale"],
  },
  {
    slug: "peptide-website-cost",
    title: "How Much Does a Peptide Website Cost?",
    question: "How much does it cost to build a peptide or research-supply website?",
    description:
      "What drives the cost of a research-supply website: scope, catalog size, integrations, content and upkeep, and what a written quote should cover.",
    answer:
      "The cost of a peptide website depends on what it has to do: how many products and sizes it carries, whether it takes retail orders, wholesale inquiries or both, which payment, shipping and inventory tools it connects to, and who writes and maintains the content. There is no honest single price. Vanta Foundry quotes each project in writing after reading a brief of what the site needs.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Scope Drivers",
        list: [
          "**What the site does.** A catalog with an inquiry form is less work than a full store with accounts and checkout.",
          "**Design.** A custom design built for your brand takes more work than adapting an existing layout.",
          "**Catalog size.** More products and sizes mean more pages, images and data to set up.",
          "**Integrations.** Each connected system adds build and testing time.",
          "**Content.** Whether you supply the copy and photos or they are written and produced for you.",
          "**Upkeep.** Whether someone maintains the site after launch, and how often things change.",
        ],
      },
      {
        h: "Catalog",
        p: [
          "A research-supply catalog carries more than names and photos. Each product needs its sizes, lot handling and a link to its reports. A COA library that buyers can search by lot number is its own piece of work, separate from the product pages.",
          "Ask whether products will be entered for you or by your team, and how new lots and reports are added later.",
        ],
      },
      {
        h: "Integrations",
        p: [
          "Payments, shipping, inventory, email and fulfillment can each be a separate connection. Some are simple; some need custom work. List the tools you already use in your brief, so the quote reflects them.",
          "A payment integration is only useful once a processor has approved your business. That approval is the processor's decision and sits outside the website quote.",
        ],
      },
      {
        h: "Content",
        p: [
          "Copy for research-use-only products has to describe what each material is, never what it does. Writing it carefully takes time, and so does rewriting copy carried over from an older site. Say in your brief whether you will supply copy, product photos and documents, or need them produced.",
        ],
      },
      {
        h: "Maintenance",
        p: [
          "A site with a changing catalog needs regular updates: new products, retired sizes, new reports, security updates. Decide whether your team handles that or a developer does. If you want ongoing work covered, ask for it to be quoted separately from the build, so each is clear.",
        ],
      },
      {
        h: "Quote Checklist",
        list: [
          "Every page and feature in scope, written down.",
          "What is out of scope, written down too.",
          "Integrations listed by name.",
          "Who supplies content, photos and documents.",
          "Number of revision rounds, and what counts as a change.",
          "Who owns the domain, code and content at the end.",
          "Ongoing maintenance, if any, quoted separately.",
        ],
        p: [
          "To get a quote from Vanta Foundry, describe the site in the brief form on the website development page. Each project is quoted in writing before work starts.",
        ],
      },
    ],
    services: ["website-development"],
  },
  {
    slug: "shopify-vs-custom-peptide-website",
    title: "Shopify vs. Custom Development for a Peptide Website",
    question: "Should a peptide or research-supply business use Shopify or a custom-built website?",
    description:
      "A balanced comparison of a hosted platform and a custom-coded site for research supply: eligibility, customization, ownership and upkeep.",
    answer:
      "A hosted platform such as Shopify suits many businesses: it is quick to start and the platform handles hosting and updates. A custom-coded site suits businesses that need specific catalog, documentation or ordering features, or want full control of the code. For research supply, check eligibility first: read the platform's current acceptable use policy and your payment provider's restricted-business list, because custom code does not change whether a payment provider approves your business.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Requirements",
        p: [
          "Start from what the site has to do, not from the tool. Write down your catalog, how orders arrive (retail checkout, wholesale inquiry or both), how certificates of analysis are shown and searched, and which systems need to connect.",
          "If a hosted platform does all of that out of the box or with available extensions, it may be the simpler choice. If several items need workarounds, custom development starts to make sense.",
        ],
      },
      {
        h: "Provider Eligibility",
        p: [
          "Platforms and payment providers each set their own rules about which businesses they accept, and those rules change. Do not rely on what someone else says a platform allows, including this guide.",
        ],
        list: [
          "Read the platform's current acceptable use policy, and check it against exactly what you sell.",
          "Read your payment provider's restricted or prohibited business list.",
          "Describe your business accurately on every application.",
          "Custom code does not change whether a payment provider approves your business. Approval is the provider's decision either way.",
        ],
      },
      {
        h: "Customization",
        p: [
          "Hosted platforms offer themes and extensions, and they cover common store needs well. The limits show up when you need something specific: a COA library searchable by lot, a wholesale inquiry flow with no prices shown, or product pages structured around lots and sizes.",
          "A custom-coded site is built to your requirements, so those features are part of the design rather than added on. The trade is that each one has to be specified, built and tested.",
        ],
      },
      {
        h: "Ownership",
        p: [
          "On a hosted platform you own your content and data, while the platform owns the software and sets the terms you run under. Check how you would export products, customers and orders if you ever moved.",
          "With custom development, ownership of the code depends on your agreement. Make sure it states that the domain, code and content are yours.",
        ],
      },
      {
        h: "Maintenance",
        p: [
          "A hosted platform handles hosting, security patches and core updates for you; you maintain your theme, extensions and content. A custom site needs someone to keep dependencies, hosting and security current, either your team or a developer on an ongoing arrangement.",
        ],
      },
      {
        h: "Decision Table",
        list: [
          "If you need to launch with a standard store and your category fits the platform's policy, lean hosted platform.",
          "If you have no developer and want the platform to handle updates, lean hosted platform.",
          "If lot-linked documentation and a searchable COA library are central to your site, lean custom.",
          "If you run retail checkout and a separate wholesale inquiry flow, lean custom.",
          "If you want full control of the code and how the site is hosted, lean custom.",
          "If you are unsure whether you are eligible on a platform or with a processor, check their policies before choosing either.",
        ],
        p: [
          "Vanta Foundry builds custom-coded websites for any lawful business. If custom is the right fit, describe the site in the brief form on the website development page.",
        ],
      },
    ],
    services: ["website-development", "payment-processing"],
  },
  {
    slug: "catalog-and-coa-library",
    title: "Planning a Product Catalog and COA Library",
    question: "How should a research-supply business plan its product catalog and COA library?",
    description:
      "How to structure products, sizes, lots and certificates of analysis so buyers can find the right report for the unit they hold.",
    answer:
      "Plan the catalog and the COA library around three separate identifiers: a product and size (the SKU), a production lot, and a report number. Each product page links to the reports for the lots on sale, and the library lets anyone search by lot number to find the report for the unit in their hands. Keep the two in step every time a lot is added or retired.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Identifiers",
        list: [
          "**SKU.** One per product and size. It identifies what is sold.",
          "**Lot number.** One per production batch. It identifies the material in the unit and is printed on the label.",
          "**Report number.** One per laboratory report. It identifies the document.",
          "Keep the three separate. One SKU can have many lots over time, and one lot can have more than one report.",
        ],
      },
      {
        h: "Product Pages",
        p: [
          "A product page states what the material is, the sizes offered and the research-use-only statement. It should also show the lots currently in stock, each with a link to its report.",
          "Avoid putting a single purity figure in the product description. It belongs to one lot, and it goes out of date the moment a new lot arrives. Link to the report instead.",
        ],
      },
      {
        h: "Batch Documents",
        list: [
          "The report file itself, stored at an address that does not change.",
          "Product, size, lot number, report number, laboratory and report date as data, not only inside the file.",
          "A link to the laboratory's own verification page where one exists.",
          "A note of which tests the report covers, so buyers do not assume more.",
        ],
        p: [
          "The Vanta Labs COA library follows this pattern: per-batch reports from named third-party laboratories, with Kovera Labs reports checkable on the lab's verify page and Horizon Analytical reports searchable by lot number.",
        ],
      },
      {
        h: "Updates",
        p: [
          "When a new lot arrives, add its report before the lot goes on sale. When a lot sells out, keep its report in the library, because buyers holding units from that lot still need to find it.",
          "Decide who makes these updates and write the steps down. A library that falls behind the stock is worse than none, because it points buyers to the wrong document.",
        ],
      },
      {
        h: "Search",
        list: [
          "Search by lot number, with exact matches shown first.",
          "Accept lot numbers typed with different case, spaces or dashes.",
          "Search by product name and by report number too.",
          "Show results with product, size, lot, laboratory and date on one line.",
          "Make the search work well on a phone, where most lookups happen.",
        ],
      },
      {
        h: "Quality Checks",
        list: [
          "Every lot on sale has a report in the library.",
          "Every report link opens the right file.",
          "The lot on the label, the page and the report match exactly.",
          "No purity figure appears anywhere it cannot be traced to a published report.",
          "Retired lots stay searchable.",
        ],
      },
    ],
    services: ["website-development", "wholesale"],
  },
  {
    slug: "wholesale-business-launch-checklist",
    title: "Wholesale Business Website Launch Checklist",
    question: "What should a wholesale business check before launching its website?",
    description:
      "A launch checklist for a wholesale website: offers, catalog, documentation, ordering, testing, launch day and follow-up.",
    answer:
      "Before a wholesale website launches, confirm that every offer is described accurately, the catalog matches what you can actually supply, documentation is linked and current, and the ordering or inquiry flow reaches your team. Test every form, link and message on a phone and a desktop. After launch, watch inquiries and fix what buyers trip over.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Offers",
        list: [
          "Each service or offer described in plain words: what it is, who it is for, what the buyer gets.",
          "No prices, minimums or lead times stated unless they are set and current.",
          "Where terms vary, say they are confirmed on the quote.",
          "No certifications or claims you cannot document.",
        ],
        p: [
          "Keep separate offers visibly separate. A buyer looking for wholesale supply and a buyer looking for a website should each find their own path from the homepage without reading about the other.",
        ],
      },
      {
        h: "Catalog",
        list: [
          "Every product and size listed is one you can supply.",
          "Names and sizes match your labels and invoices.",
          "Photos are of the real product.",
          "A research-use-only statement on each product page, where it applies.",
          "Copy describes what each product is, never what it does.",
        ],
      },
      {
        h: "Documentation",
        list: [
          "A certificate of analysis linked for each lot on sale.",
          "Lot numbers on the site match the labels.",
          "Report links open the right file.",
          "Policies published: shipping, returns, privacy, terms.",
        ],
      },
      {
        h: "Ordering",
        list: [
          "The inquiry or order flow says clearly what happens next.",
          "Every inquiry reaches a monitored inbox or number.",
          "Inquire buttons carry the product name into the message.",
          "If there is a checkout, payments are connected to an approved processor.",
          "Confirmation messages carry your brand and contact details.",
        ],
      },
      {
        h: "Testing",
        list: [
          "Send a test inquiry through every form and button, and confirm it arrives.",
          "Check every page at phone width.",
          "Click every link, including report links and policy pages.",
          "Check page titles and descriptions for each page.",
          "Have someone outside the business try to place an inquiry without help.",
        ],
        p: [
          "Fix anything that person stalls on before launch. If they cannot tell how to ask for pricing, neither can a buyer arriving from a search result on a phone.",
        ],
      },
      {
        h: "Launch",
        list: [
          "Point the domain and confirm the secure connection works.",
          "Submit the sitemap to search engines.",
          "If replacing an old site, put redirects in place from old addresses.",
          "Keep someone available to answer the first inquiries quickly.",
        ],
      },
      {
        h: "Follow-Up",
        list: [
          "Read every early inquiry for questions the site should have answered.",
          "Add those answers to the relevant pages or an FAQ.",
          "Keep the catalog and reports current as lots change.",
          "Recheck links and forms after every significant update.",
        ],
        p: [
          "Vanta Foundry builds custom-coded websites for any lawful business. Send a brief through the form on the website development page and the project is quoted in writing.",
        ],
      },
    ],
    services: ["website-development", "wholesale"],
  },
  {
    slug: "catalog-url-migration",
    title: "How to Migrate a Product Catalog Without Losing URLs",
    question: "How do you move a product catalog to a new website without losing URLs?",
    description:
      "How to move a catalog to a new site and keep its URLs working: inventory, URL mapping, one-hop 301 redirects, content, testing and monitoring.",
    answer:
      "To migrate a product catalog without losing URLs, list every address the old site serves, map each one to its closest page on the new site, and set a single-hop 301 redirect for every address that changes. Update internal links and the sitemap to the new addresses, return 404 or 410 for items that are genuinely gone, and never send everything to the homepage. Then test every redirect and watch for errors after launch.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Inventory",
        p: [
          "Before anything moves, list every URL the old site serves. Include product pages, category pages, size or variant pages, report files, guides, images that are linked from elsewhere, and old addresses that already redirect.",
          "Pull the list from several sources: the current sitemap, a crawl of the site, your analytics and your search console data. Each one catches pages the others miss.",
        ],
      },
      {
        h: "URL Mapping",
        p: [
          "Build a redirect map: one row per old URL, with the new URL it should go to. Keep the map as a file you can edit and review, not only as server rules.",
        ],
        list: [
          "Where a page keeps its address, mark it as unchanged.",
          "Where it moves, map it to the closest equivalent: a product to the same product, a category to the same category.",
          "Where a product is discontinued but a close replacement exists, map it there.",
          "Where nothing equivalent exists, mark it as removed.",
        ],
      },
      {
        h: "Redirects",
        list: [
          "Use permanent 301 redirects for pages that have moved.",
          "Redirect in one hop. If an old address already redirected, point it straight to the final page, not through a chain.",
          "Do not redirect everything to the homepage. Search engines can treat that as a missing page, and visitors lose what they came for.",
          "Return 404 or 410 for items that are genuinely gone with no replacement.",
          "Keep the redirects in place long term, not just for the launch.",
        ],
      },
      {
        h: "Content",
        p: [
          "Carry the content across, not only the address. Product names, sizes, descriptions, images and report links should arrive intact. Page titles and descriptions that were working should stay unless there is a reason to change them.",
          "Update internal links on the new site to point at new addresses directly, rather than relying on redirects. Update canonical tags, and publish a sitemap that lists only the new, live URLs.",
        ],
      },
      {
        h: "Testing",
        list: [
          "Run every old URL from the inventory against the new site before launch.",
          "Confirm each returns a single 301 to the mapped page, or 404/410 if removed.",
          "Check that no redirect lands on another redirect.",
          "Click through the main navigation and product pages for broken links.",
          "Confirm report files still open from their links.",
        ],
      },
      {
        h: "Monitoring",
        p: [
          "After launch, watch for 404 errors in server logs and in your search console. Each one is either an address the map missed or a link elsewhere that needs a redirect added.",
          "Submit the new sitemap, check that new pages are being indexed, and keep the redirect map as the record of what moved where. It will be needed again the next time the site changes.",
        ],
      },
    ],
    services: ["website-development", "seo-ai-search"],
  },
  {
    slug: "b2b-buyer-portal-features",
    title: "What Should a B2B Buyer Portal Include?",
    question: "What features should a B2B buyer portal include?",
    description:
      "The features a B2B buyer portal needs: buyer accounts, pricing per buyer, quotes, documents, reorders and integrations.",
    answer:
      "A B2B buyer portal should give each business buyer an account where they see their own pricing, request and accept quotes, download the documents for their orders, and reorder without starting over. Behind it, the portal connects to the systems that hold inventory, orders and invoices. Start with the features your buyers ask for most, rather than building every one at once.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Accounts",
        list: [
          "An account per buyer business, with more than one user where needed.",
          "Approval before an account can see pricing or order.",
          "Saved shipping and billing addresses.",
          "Order history with status and tracking.",
          "Roles where useful: one person requests, another approves.",
        ],
        p: [
          "Approval matters more in research supply than in most categories. Checking who a buyer is before they can order lets you keep to research-use-only terms and decline businesses that market products for human or veterinary use.",
        ],
      },
      {
        h: "Pricing",
        p: [
          "B2B prices are usually set per buyer, per product or per quantity, so the portal should show each buyer their own prices once they are signed in, and nothing to visitors who are not.",
          "If prices change often or depend on the full order, a portal can show products without prices and route the buyer to a quote instead.",
        ],
      },
      {
        h: "Quotes",
        list: [
          "A way to build a request: products, sizes, quantities, destination.",
          "Quotes returned inside the portal, with each line, total, lead time and validity.",
          "Accepting a quote turns it into an order without re-entry.",
          "Past quotes kept for reference.",
        ],
      },
      {
        h: "Documents",
        list: [
          "Invoices and packing slips per order.",
          "For research supply, the certificate of analysis for each lot shipped, linked from the order.",
          "Lot numbers recorded on each order line.",
          "Policies and terms that apply to the buyer.",
        ],
        p: [
          "Documents should stay available after the order closes. A buyer who needs a report months later should find it on the order, not have to ask for it again.",
        ],
      },
      {
        h: "Reorders",
        p: [
          "Most B2B buying is repeat buying. Let buyers reorder a past order or quote in one step and change quantities before sending it. If stock or pricing has changed since, the reorder should go back as a fresh quote rather than assume old terms.",
        ],
      },
      {
        h: "Integrations",
        list: [
          "Inventory, so buyers see what can actually ship.",
          "Order management or fulfillment, so accepted orders reach whoever ships them.",
          "Accounting, so invoices are not keyed in twice.",
          "Email or messaging, for quote and shipping notifications.",
          "Payments, where buyers pay online, through a processor that has approved the business.",
        ],
        p: [
          "Vanta Foundry builds custom-coded websites for any lawful business. If a buyer portal is part of what you need, describe it in the brief form on the website development page and it will be scoped and quoted in writing.",
        ],
      },
    ],
    services: ["website-development", "wholesale"],
  },
  {
    slug: "start-a-research-peptide-business",
    title: "How to Start a Research Peptide Business",
    question: "What do you need to start a research peptide business?",
    description: "The parts of a research-use-only peptide business, in order: catalog, documented supply, labels, website, payments and fulfillment.",
    answer:
      "A research peptide business needs six things working together: a catalog you can document, a supplier that gives you a laboratory report for every lot, labels and copy that stay research use only, a website buyers can trust, payment processing that accepts the category, and a way to ship. Get advice from your own lawyer on how the rules apply to you; this guide covers the operating parts, not legal questions.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Decide What You'll Sell",
        p: [
          "Start with a short catalog you can document well rather than a long one you can't. For each product, know its identity data (name, sequence where it applies, CAS number, formula), the vial sizes you'll offer and whether a laboratory report exists for the lot you'll sell.",
          "Research-use-only means exactly that. Every page, label, email and social post describes what a material is, never what it does or how a person might use it.",
        ],
      },
      {
        h: "Supply and Documentation",
        list: [
          "A supplier who names the lot you'll receive and gives you its certificate of analysis before you pay.",
          "Reports from a named laboratory that state the method, the result and the batch, and that you can verify with the laboratory.",
          "Clear quantities: the amount in one vial, and how many vials you're buying.",
          "Written terms for minimums, lead time and payment, confirmed on the quote.",
        ],
        p: [
          "Our [wholesale peptide catalog](/catalog) lists sizes and the reports already published, and the [testing page](/wholesale/testing) explains what each report does and doesn't show.",
        ],
      },
      {
        h: "Brand and Labels",
        p: [
          "Selling under your own name is private label (we call it white label). Each label should carry the material, the quantity, the lot number and a research-use-only statement, and you should approve a printed proof first. Labels never carry usage, dosing or effect claims. See [private label peptides](/white-label).",
        ],
      },
      {
        h: "Website and Copy",
        p: [
          "Buyers judge a research supplier by its documentation. Plan a page per product with its identity data, the report for each size one tap away, a research-use access gate, and an ordering path that suits your buyers: checkout, a wholesale request form, or both.",
          "Read [peptide website development](/website-development/peptide-websites) for what the build covers, and [how much a peptide website costs](/guides/peptide-website-cost) for what drives the price.",
        ],
      },
      {
        h: "Payments",
        p: [
          "Research supply is a category many payment processors review closely or decline. Apply with a provider that accepts the category, describe what you sell accurately, and keep a second processor ready. Every merchant account is subject to the provider's approval; no website or agency can promise it.",
        ],
      },
      {
        h: "Fulfillment",
        p: [
          "Decide who stores stock and ships orders: you, a 3PL, or a supplier that dropships. Whoever ships needs your packing slip, tracking emails and a way to handle damaged or missing items. See [dropshipping and 3PL](/fulfillment).",
        ],
      },
      {
        h: "Launch Checklist",
        p: [
          "Before you take the first order, run through the [wholesale business website launch checklist](/guides/wholesale-business-launch-checklist). You can buy each part from us separately; website and supply are quoted separately even when you buy both.",
        ],
      },
    ],
    services: ["wholesale", "white-label", "website-development", "fulfillment"],
  },
  {
    slug: "core-web-vitals-explained",
    title: "Core Web Vitals Explained for Business Owners",
    question: "What are Core Web Vitals, and do they matter for my website?",
    description: "The three Core Web Vitals in plain words: what LCP, INP and CLS measure, Google's thresholds, and what usually fixes each one.",
    answer:
      "Core Web Vitals are three measurements Google uses to describe how a page feels to real visitors: Largest Contentful Paint (how fast the main content appears), Interaction to Next Paint (how fast the page responds to a tap or click) and Cumulative Layout Shift (how much the page jumps while loading). Google's guidance at web.dev calls a page good at 2.5 seconds or less for LCP, 200 milliseconds or less for INP and 0.1 or less for CLS, measured at the 75th percentile of visits on mobile and desktop separately.",
    updated: "2026-10-23",
    sections: [
      {
        h: "The Three Measurements",
        list: [
          "**Largest Contentful Paint (LCP):** the time until the biggest image or block of text in view has loaded. Good is 2.5 seconds or less.",
          "**Interaction to Next Paint (INP):** how long the page takes to visibly respond after a tap, click or key press, across the visit. Good is 200 milliseconds or less. INP replaced First Input Delay as a Core Web Vital in 2024.",
          "**Cumulative Layout Shift (CLS):** how much content moves around unexpectedly while the page loads, such as a button jumping as an image arrives. Good is 0.1 or less.",
        ],
        p: [
          "Each is judged at the 75th percentile: at least three in four visits should meet the threshold, counted separately for phones and computers. These definitions are Google's, published at web.dev.",
        ],
      },
      {
        h: "Lab Scores and Real Visitors",
        p: [
          "A lab test such as Lighthouse loads the page once on a simulated device. It is useful for finding problems, but it isn't what Google reports for your site. The field data in Search Console and PageSpeed Insights comes from real Chrome visitors over the previous 28 days, and a page with little traffic may have no field data at all.",
          "So a perfect lab score doesn't guarantee good field numbers, and a weak lab score on a fast connection may still pass in the field. Check both, and trust the field data when you have it.",
        ],
      },
      {
        h: "What Usually Fixes Each One",
        list: [
          "**Slow LCP:** an oversized hero image, a slow server response, or text waiting on a web font. Serve correctly sized, modern-format images, cache pages close to visitors, and load the main image first.",
          "**Slow INP:** too much JavaScript running when someone taps. Ship less script to the browser, break up long tasks, and load chat widgets and trackers after the page is usable.",
          "**High CLS:** images, embeds or banners without reserved space. Give every image and embed its dimensions, and don't insert content above what the visitor is reading.",
        ],
      },
      {
        h: "How Much They Matter",
        p: [
          "Core Web Vitals are one of many signals Google uses; relevant, useful content matters more. Their bigger effect is on people: a page that appears quickly and doesn't jump keeps more visitors reading and buying. Nobody can promise a ranking from better scores.",
        ],
      },
      {
        h: "Checking Your Own Site",
        list: [
          "Search Console, Core Web Vitals report: field data grouped by page type.",
          "PageSpeed Insights: field data for one URL plus a lab test with suggestions.",
          "Test on a real mid-range phone on mobile data, not only on a fast laptop.",
        ],
        p: [
          "Every site we build is tested for speed before launch: see [website development](/website-development). If an existing site is slow, a [redesign or migration](/website-development/redesign) may fix it, or a targeted repair may be enough.",
        ],
      },
    ],
    services: ["website-development", "seo-ai-search"],
  },
  {
    slug: "why-nextjs-site-is-slow",
    title: "Why Is My Next.js Site Slow?",
    question: "What usually makes a Next.js website slow, and how is it fixed?",
    description: "The common reasons a Next.js site loads or responds slowly, how to find which one you have, and what fixes it.",
    answer:
      "A Next.js site is usually slow for one of a few reasons: pages rendered on every request that could be static or cached, large images served without optimisation, too much JavaScript sent to the browser, slow data fetching that blocks the page, or third-party scripts loading first. Measure before changing anything: field data in Search Console shows which pages are slow for real visitors, and the browser's performance tools show why.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Rendering Every Request",
        p: [
          "Next.js can build a page once and serve it from a cache, or render it on the server for every visitor. Product, service and article pages rarely need fresh rendering each time. Pages that read cookies, headers or uncached data are rendered per request, often by accident. Make content pages static or cache them with a sensible revalidation interval, and keep per-request rendering for pages that genuinely change per visitor.",
        ],
      },
      {
        h: "Images",
        p: [
          "Large photos are the most common cause of a slow first paint. Use the framework's image component with real width and height, the right sizes for each screen, and priority only for the main image in view. Reserve space for every image so the layout doesn't shift.",
        ],
      },
      {
        h: "Too Much JavaScript",
        p: [
          "Marking whole pages or layouts as client components ships their code to every visitor. Keep components on the server unless they need state or event handlers, push interactivity down to the small parts that need it, and check the size of every library you add. A long task in the browser is what makes taps feel slow.",
        ],
      },
      {
        h: "Slow Data and Blocking Requests",
        p: [
          "A page waits for its slowest data request. Fetch in parallel instead of one after another, cache results that don't change per visitor, and stream slower sections in after the main content so visitors see the page sooner.",
        ],
      },
      {
        h: "Third-Party Scripts",
        p: [
          "Chat widgets, tag managers, heatmaps and ad pixels often cost more than the site's own code. Load them after the page is interactive, remove the ones nobody uses, and test with them switched off to see their real cost.",
        ],
      },
      {
        h: "How We Approach It",
        p: [
          "We build in Next.js and React, and test speed on phones before launch. For an existing site, we measure first, fix the largest cause, and measure again. See [ecommerce website development](/website-development/ecommerce) or [website maintenance and support](/website-development/maintenance), and [Core Web Vitals explained](/guides/core-web-vitals-explained) for the measurements themselves.",
        ],
      },
    ],
    services: ["website-development"],
  },
  {
    slug: "choose-website-development-partner",
    title: "How to Choose a Website Development Partner",
    question: "How do you choose a company to build your website?",
    description: "What to check before you hire a website developer: real work, ownership, scope, testing, support and how the quote is written.",
    answer:
      "Choose a website development partner on evidence: live sites they built that you can use yourself, a written scope that says what's included and what isn't, clear ownership of your domain, code and content, a testing and launch plan, and a support arrangement in writing. Compare proposals line by line for the same scope, not on price alone.",
    updated: "2026-10-23",
    sections: [
      {
        h: "Look at Real Work",
        p: [
          "Open the sites they say they built, on your phone. Check that they load quickly, that the checkout or forms work, and that the work is labelled honestly: a live client site, the company's own store, or a concept design are different kinds of proof. Ask what part of each project they actually did.",
        ],
      },
      {
        h: "Ownership",
        list: [
          "Your domain is registered in your name.",
          "You own the code, content and design, and can take them elsewhere.",
          "You have admin access to the hosting, analytics and payment accounts.",
          "What happens to all of it if you stop a monthly plan is written down.",
        ],
      },
      {
        h: "Scope and Price",
        p: [
          "A good proposal lists the pages, features and integrations, who writes the content, how many rounds of changes are included and what costs extra. Vague scopes are where projects run late. If two quotes differ a lot, the difference is usually in what's included.",
        ],
      },
      {
        h: "Testing and Launch",
        p: [
          "Ask how the site is tested before launch: on which phones and browsers, with test orders through each payment method, and with every form and email checked. For a redesign, ask how existing URLs and search visibility are kept. See [website redesign and migration](/website-development/redesign).",
        ],
      },
      {
        h: "After Launch",
        p: [
          "Sites need fixes, updates and changes. Find out who does them, how you ask, and what's included, before you sign. See how our [maintenance and support plan](/website-development/maintenance) works.",
        ],
      },
      {
        h: "Questions to Ask",
        list: [
          "Which of these live sites did you build, and what was your role?",
          "What exactly is included, and what would cost extra?",
          "Who owns the code, domain and content?",
          "How is the site tested before launch?",
          "What happens after launch, and what does it cost?",
        ],
        p: [
          "Ready to compare? Send us your brief from [website development](/website-development) and we'll reply with a written scope and quote.",
        ],
      },
    ],
    services: ["website-development"],
  },
];
