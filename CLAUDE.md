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
  or by email (`support@vantalabsresearch.com`). There's no form backend.
- The catalog lists the Vanta Labs products and sizes with NO prices.
  Customers tap what they want and send an inquiry on WhatsApp
  (+1 419-378-1139) or to the support email, and we reply with pricing.

## Verify in a browser

Run `npm run build && npm start` and drive it with Playwright. Check phone
width (390×844) for every layout change, because most traffic is mobile.
