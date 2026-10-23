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
| Catalog products, sizes and photos | `src/lib/catalog.ts`. Read from the live store on 2026-10-23 (photos load from the store's public image storage); update when the store changes. No prices are shown: each product has an Inquire button that opens WhatsApp. |
| Product specs and lab reports | `src/lib/product-facts.ts`, read from the store's product pages and COA library. Refresh when reports change. |
| Approved page titles, H1s and CTAs | `src/lib/seo-pages.ts`. `npm run check:seo` checks the built site against it. |
| Website-development service pages | `src/lib/dev-services.ts` |
| Service wording | `src/lib/services.ts` |
| Site name | `src/lib/site.ts`. "Vanta Foundry" is a working name. |

## How a customer gets in touch

- **Wholesale:** tap **Inquire** on a product, or **Add to list** on several (the list follows the buyer between catalog and product pages), then **Send on WhatsApp** or **Send by email**. The message opens in their own app, already written, with sizes, number of vials and where they found us.
- **Website projects:** the brief at `/start/website-development` is sent from the page to `/api/lead`, which saves it to `foundry.leads` (Vanta Labs Supabase project, `supabase/foundry_leads.sql`) and emails it through Resend with a reference number (`RESEND_API_KEY`, `LEAD_FROM`, optional `LEAD_TO`). If it can be neither saved nor emailed, the visitor gets their email app with the brief written in.
- Wholesale lists are logged to the same table as `wholesale_handoff` rows, with the reference that appears in the message.

## Run

    npm install
    npm run build && npm start      # check against a production build, not `next dev`
    npm run lint && npm run typecheck
    npm run check:seo               # with `npm start` running: titles, H1s, canonicals, phrases, sitemap, links
    npm run check:reports           # the same, plus every lab report link (needs internet)
    python3 scripts/keyword-coverage.py docs/research/keyword-audit-records.json   # rebuilds docs/KEYWORD-COVERAGE.md

## Deploy

1. Import this repository into Vercel as a new project (framework: Next.js, root directory: the repository root).
2. Set `NEXT_PUBLIC_SITE_URL` to `https://www.vantafoundry.com`.
3. Add the domain.

## Search and AI search

- Each service page and guide opens with a self-contained answer paragraph.
- JSON-LD covers Organization, Service, FAQPage, Article and BreadcrumbList.
- There's an `/llms.txt`, and `robots.txt` lets AI crawlers in.
- The catalog and every product page are indexed (since 2026-10-23), with specifications and published reports and no prices.
- Preview deployments are never indexed (`robots.txt` and `X-Robots-Tag`).
- What shipped, what's blocked and the 60-day measurement plan: [`docs/LAUNCH-BASELINE.md`](docs/LAUNCH-BASELINE.md).

## Copy rules

Research-supply copy follows [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md):

- Research use only.
- No usage, dosing or outcome claims.
- No invented prices, rates, minimums or lead times.

The catalog asks visitors to confirm research use before it shows any products.
