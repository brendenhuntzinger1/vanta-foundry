# Vanta Foundry

The B2B site for Vanta Labs: wholesale, white label, fulfillment (dropship and 3PL), payments setup, storefront development and brand launch. It's a separate Next.js app meant to deploy as its own Vercel project on its own domain.

"Vanta Foundry" is a working name. To rename it, change `src/lib/site.ts`. Every page, the metadata, the JSON-LD and `llms.txt` read the name from there.

## Run

    npm install
    npm run build && npm start      # verify against a production build, not `next dev`
    npm run lint && npm run typecheck

## Deploy

1. Create a Vercel project with **Root Directory** set to `foundry`.
2. Set these environment variables:
   - `NEXT_PUBLIC_SITE_URL`: the canonical origin, e.g. `https://www.vantafoundry.com`
   - `NEXT_PUBLIC_CONTACT_EMAIL`: the public contact address. Defaults to the Vanta Labs support inbox.
   - Application delivery, at least one of:
     - `RESEND_API_KEY` + `APPLY_TO_EMAIL` (+ optional `APPLY_FROM_EMAIL`, which needs a sender domain verified in Resend), or
     - `APPLY_WEBHOOK_URL`, which receives the application as a JSON POST (Zapier, Slack, a CRM)
3. Add the domain.

Until a delivery route is set, `/api/apply` answers 503. The form then tells the applicant it wasn't sent and offers a prefilled email instead. It never claims success for an application it didn't deliver.

## Search and AI search

- Each service page and guide opens with a self-contained answer paragraph. That's the passage search snippets and AI assistants quote.
- JSON-LD covers Organization, Service, FAQPage, Article and BreadcrumbList.
- `/llms.txt` gives a plain-text map of the site, with every service and guide alongside its answer.
- `robots.txt` lets AI crawlers in, because the marketing plan is organic.
- To add a guide, add an entry to `src/lib/guides.ts`. Its page, sitemap entry, `llms.txt` line and schema follow automatically.

City and state landing pages are deliberately left out. They only help when each page has real local facts. Pages that only swap the state name are what Google's spam policy calls doorway pages.

## Copy rules

Copy follows `.claude/skills/vanta-creative-director/references/compliance.md`:

- Research use only, everywhere.
- No dosing, usage or outcome claims.
- No product names in public.
- No prices, minimums, rates, turnaround times or certifications. None of these is configured for this business yet, so the site says "quoted to you" until they are.
- Every product demo is marked "Example" and uses SKU codes and an invented partner brand.
