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
- Both front doors share the top, equal (owner, 2026-10-23): "put them both at
  the top ... look like what we offer is like a complete build." The homepage
  hero is "Build it. Stock it. Ship it." with Websites & SEO (incl. AEO/GEO)
  and Wholesale & 3PL side by side, two columns even on a phone. Never let
  one door push the other below the first screen.
- Calm, not cluttered (owner, 2026-10-23: "Not cluttered, people can see the
  wholesale"). Homepage: the two doors, the catalog (8 products, COA badges),
  websites + developer team "for any brand", three why-us points, FAQ. One
  idea per section; no long checklists in the doors.

## Verify in a browser

Run `npm run build && npm start` and drive it with Playwright. Check phone
width (390×844) for every layout change, because most traffic is mobile.
