# Vanta Foundry

The B2B site for Vanta Labs. It covers:

- payment processing
- wholesale supply
- factory-direct supply
- white label
- 3PL and fulfillment
- website development, for any business

It's a separate Next.js app, deployed as its own Vercel project on its own domain.

## The things you'll change

| What | Where |
| --- | --- |
| WhatsApp number | Vercel env `NEXT_PUBLIC_WHATSAPP_NUMBER`, digits only with country code, e.g. `18135550123`. Rebuild after setting it. Until it's set, every WhatsApp button is hidden and email is used instead. |
| Contact email | `src/lib/site.ts`, `email` (now `support@vantalabsresearch.com`) |
| Wholesale prices | `src/lib/catalog.ts`. Set a % off retail per quantity tier (`PRICE_TIERS`), or an exact `wholesale` price on any size. Anything left `null` shows "Ask us". |
| Catalog products and retail prices | `src/lib/catalog.ts`. Read from the live store on 2026-10-23; update when the store changes. |
| Service wording | `src/lib/services.ts` |
| Site name | `src/lib/site.ts`. "Vanta Foundry" is a working name. |

## How a customer gets in touch

There's no form and no backend. A visitor taps the services they want, or enters quantities in the catalog, then presses **Send on WhatsApp** or **Send by email**. The message opens in their own app, already written and addressed to us. Nothing can get lost on a server.

## Run

    npm install
    npm run build && npm start      # check against a production build, not `next dev`
    npm run lint && npm run typecheck

## Deploy

1. Create a Vercel project with **Root Directory** set to `foundry`.
2. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.vantafoundry.com`) and `NEXT_PUBLIC_WHATSAPP_NUMBER`.
3. Add the domain.

## Search and AI search

- Each service page and guide opens with a self-contained answer paragraph.
- JSON-LD covers Organization, Service, FAQPage, Article and BreadcrumbList.
- There's an `/llms.txt`, and `robots.txt` lets AI crawlers in.
- The catalog page is `noindex`, to keep product names out of search results. Delete the `robots` line in `src/app/catalog/page.tsx` to change that.

## Copy rules

Research-supply copy follows `.claude/skills/vanta-creative-director/references/compliance.md`:

- Research use only.
- No usage, dosing or outcome claims.
- No invented prices, rates, minimums or lead times.

The catalog asks visitors to confirm research use before it shows any products.
