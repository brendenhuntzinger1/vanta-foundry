# Vanta Foundry: brief for the SEO / GEO team

Site: https://www.vantafoundry.com. Next.js on Vercel, deploys from `main`.
Leads arrive on WhatsApp (+1 419-378-1139) and support@vantalabsresearch.com;
website briefs are emailed from the on-page form. Approved titles and H1s:
`src/lib/seo-pages.ts`. Launch record and 60-day plan: `docs/LAUNCH-BASELINE.md`.

## What we sell (target customers)

1. **Any business, any industry:** custom websites, payment processing (incl. high-risk), SEO & AI search.
2. **Research-supply brands:** peptide wholesale, factory-direct, white label, 3PL.

## Pages already built for ranking

| Type | URLs | Notes |
|---|---|---|
| Services (7) | `/website-development`, `/payment-processing`, `/seo-ai-search`, `/wholesale`, `/factory-direct`, `/white-label`, `/fulfillment` | Service + FAQPage + Breadcrumb schema |
| Website development (6) | `/website-development/<peptide-websites, ecommerce, b2b-portals, redesign, integrations, maintenance>` | One query each; no WhatsApp |
| Wholesale | `/catalog`, `/catalog/<product>` (33), `/wholesale/testing`, `/wholesale/ordering` | Product + FAQPage; reports linked |
| Case study | `/work/vanta-labs` | Article |
| Industries (12) | `/industries/<slug>`, hub at `/industries` | Unique copy per industry, edit in `src/lib/industries.ts` |
| Guides (22) | `/guides/<slug>` | Answer-first articles, edit in `src/lib/guides.ts` |
| Glossary | `/glossary` | DefinedTermSet schema |
| Lead flows (7) | `/start/<service>` | One-minute guided inquiry; link campaigns here |
| Company | `/about`, `/contact`, `/standards` | Organization schema with contact point |
| AI files | `/llms.txt`, `/sitemap.xml`, `/robots.txt` | AI crawlers are allowed |

## Rules (do not break)

- **Research use only.** No human use, dosing, health or outcome claims about peptides, anywhere, including backlinks, guest posts and directory listings.
- **No invented facts:** no fake reviews, stats, client logos, certifications, prices, rates, minimums or lead times. No "guaranteed rankings" or "guaranteed approval".
- Payment approvals are always "subject to approval".
- Websites and payments are for any lawful business.

## Suggested next steps

1. Verify the domain in Google Search Console and Bing Webmaster Tools, and submit `/sitemap.xml`.
2. Add more industry pages for industries that convert (one per real niche, with unique copy, never city-name swaps).
3. Write guides that answer real searches: comparison ("X vs Y"), "how to", "what to do when…" and switching pages. Each opens with a two-to-three sentence answer.
4. Get real mentions: directories (Clutch, GoodFirms, UpCity), industry publications, and partner sites. Keep the business name, contact and description identical everywhere.
5. Collect real reviews from real clients, and only then add them to the site.
6. Add case studies when clients agree to be named.
7. Track AI visibility monthly: ask ChatGPT, Gemini, Perplexity and Google AI Overviews the questions customers ask, and record whether we are mentioned.
