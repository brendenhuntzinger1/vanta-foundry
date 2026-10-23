# Vanta Foundry

The B2B site for Vanta Labs. It covers:

- payment processing
- wholesale supply
- factory-direct supply
- white label
- 3PL and fulfillment
- website development, for any business

It's a standalone Next.js app with its own repository, Vercel project and domain, separate from the Vanta Labs store.

## The things you'll change

| What | Where |
| --- | --- |
| WhatsApp number | `src/lib/site.ts`, `whatsapp` (now +1 419-378-1139). The Vercel env `NEXT_PUBLIC_WHATSAPP_NUMBER` overrides it. |
| Contact email | `src/lib/site.ts`, `email` (now `support@vantalabsresearch.com`) |
| Catalog products and sizes | `src/lib/catalog.ts`. Read from the live store on 2026-10-23; update when the store changes. No prices are shown: customers send an inquiry. |
| Service wording | `src/lib/services.ts` |
| Site name | `src/lib/site.ts`. "Vanta Foundry" is a working name. |

## How a customer gets in touch

There's no form and no backend. A visitor taps the services they want, or the product sizes they want in the catalog, then presses **Send on WhatsApp** or **Send by email**. The message opens in their own app, already written and addressed to us. Nothing can get lost on a server.

## Run

    npm install
    npm run build && npm start      # check against a production build, not `next dev`
    npm run lint && npm run typecheck

## Deploy

1. Import this repository into Vercel as a new project (framework: Next.js, root directory: the repository root).
2. Set `NEXT_PUBLIC_SITE_URL` to `https://www.vantafoundry.com`.
3. Add the domain.

## Search and AI search

- Each service page and guide opens with a self-contained answer paragraph.
- JSON-LD covers Organization, Service, FAQPage, Article and BreadcrumbList.
- There's an `/llms.txt`, and `robots.txt` lets AI crawlers in.
- The catalog page is `noindex`, to keep product names out of search results. Delete the `robots` line in `src/app/catalog/page.tsx` to change that.

## Copy rules

Research-supply copy follows [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md):

- Research use only.
- No usage, dosing or outcome claims.
- No invented prices, rates, minimums or lead times.

The catalog asks visitors to confirm research use before it shows any products.
