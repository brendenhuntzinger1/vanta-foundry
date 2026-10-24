# Vanta Foundry: working agreements

The research-brand company behind Vanta Labs: wholesale peptides,
factory-direct supply, white label and 3PL, plus the website and payment
processing to sell them. It's a separate repository, Vercel
project and domain from the Vanta Labs store (`brendenhuntzinger1/vanta-labs`).

## Next.js

This runs Next.js 16, which is newer than most models' training data. See
`AGENTS.md`, and read `node_modules/next/dist/docs/` before writing against an
unfamiliar API.

## Copy

Research-supply copy follows `docs/COMPLIANCE.md`, a copy of the store's rules:

- research use only
- no usage, dosing or outcome claims
- no invented prices, rates, minimums, lead times or certifications

Websites and payment processing are offered to research-supply brands only (owner, 2026-10-24).

## Owner decisions

- **Research brands only (owner, 2026-10-24).** "We're going to make Vanta
  Foundry our main wholesale 3PL and research peptide company, complete
  startup. We provide them payment processing and website development."
  Website development for every industry moves to a separate, more premium
  site. Nothing here pitches to non-research businesses: no industries pages
  (they redirect home), no skincare/coffee/apparel concept stores, no "any
  business" copy.
- Homepage, direct (owner, 2026-10-24: "more direct"): "Wholesale research
  peptides. Everything to scale your brand." Wholesale is the biggest thing,
  but we're a full startup partner, not just 3PL (owner rejected "Your label.
  We ship it." for implying 3PL only). With Browse the catalog and WhatsApp
  "Get wholesale pricing". No stock photos anywhere on the homepage (owner
  rejected them twice).
- Homepage layout (owner approved 2026-10-24, "crisp, premium" like Amino
  Engine, minus any email/SMS pitch): centered hero, then our real catalog
  page in a laptop frame, the brand row, then one section per service
  (wholesale, white label, 3PL, websites with SEO/AEO/GEO and developers
  24/7, card processing), each with a coded panel from
  `src/components/home-showcase.tsx`: no prices, illustrative items tagged
  "example". Then "Starting from zero?", FAQ and the CTA band.
- We source beyond the catalog (owner: "if they need anything else we can
  get it"): say so in the hero, the catalog preview, the catalog page, the
  wholesale tile and the FAQ.
- WhatsApp shows on every page now, the website pages included; their brief
  form to `/api/lead` stays (Resend: `RESEND_API_KEY`, `LEAD_FROM`,
  optional `LEAD_TO`).
- Light theme, premium and plain-spoken. It must not look AI-made: no glows,
  glass, gradient text, tracked eyebrow labels or numbered grids.
- Make it dummy-proof. Visitors send requests on WhatsApp or by email
  (`support@vantalabsresearch.com`).
- The catalog shows the Vanta Labs products (photos from the store's image
  storage) with NO prices. Each product has an Inquire button that opens
  WhatsApp (+1 419-378-1139), or the support email, with the product filled
  in, and we reply with pricing.
- The phone header keeps its Wholesale button.

## Search pages (2026-10-23)

- Approved titles, H1s and CTAs are in `src/lib/seo-pages.ts`; change them
  there on purpose, never as a side effect. `npm run check:seo` (with
  `npm start` running) must pass before release.
- Product specs and report numbers come from the Vanta Labs store
  (`src/lib/product-facts.ts`); never type a purity, lab or date by hand.
- See `docs/LAUNCH-BASELINE.md` for what shipped and what's blocked.

## Verify in a browser

Run `npm run build && npm start` and drive it with Playwright. Check phone
width (390×844) for every layout change, because most traffic is mobile.
