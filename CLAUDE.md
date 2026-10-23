# Vanta Foundry: working agreements

The B2B site for Vanta Labs: payment processing, wholesale, factory-direct,
white label, 3PL and website development. It's a separate repository, Vercel
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

Website development and payment processing are offered to any lawful business.

## Owner decisions (2026-10-23)

- Light theme, premium and plain-spoken. It must not look AI-made: no glows,
  glass, gradient text, tracked eyebrow labels or numbered grids.
- Make it dummy-proof. Visitors pick services and send the request on WhatsApp
  or by email (`support@vantalabsresearch.com`).
- The homepage is two front doors: Website development (/website-development,
  for any business) and Wholesale & 3PL (/supply, for research brands). Keep
  them visibly separate so no one thinks they need a peptide brand to get a
  website.
- Website development is the exception: its pages are a premium, ad-ready
  funnel with no WhatsApp. The brief is submitted on the page to
  `/api/lead`, which emails it to the team through Resend
  (`RESEND_API_KEY` and `LEAD_FROM` in the Vercel project; `LEAD_TO`
  optional). Without them the form falls back to the visitor's email app.
  WhatsApp stays for wholesale and supply.
- The catalog shows the Vanta Labs products (photos from the store's image
  storage) with NO prices. Each product has an Inquire button that opens
  WhatsApp (+1 419-378-1139), or the support email, with the product filled
  in, and we reply with pricing.
- The homepage is the original two-doors version (owner, 2026-10-23: "It was
  honestly better before when you first built the 2 sections"): headline
  "Build your brand. Or supply it.", two big door cards (Website development
  with the Genesis / Vanta Labs / Solenne / Halcyon collage, and Wholesale &
  3PL), the brand row, FAQ and CTA. Later variants (the "Build it. Stock it.
  Ship it." hero, the catalog block and the dark websites block) were tried
  and rejected. The phone header keeps its Wholesale button.

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
