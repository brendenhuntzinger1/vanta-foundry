# Organic growth build: launch record and 60-day plan

Built 2026-10-23 from the *Vanta Foundry: Organic Growth Master Plan*. This
file records what shipped, which page owns which search, what is still
blocked, and how the next 60 days are measured. Approved titles, H1s and
CTAs live in `src/lib/seo-pages.ts`; `npm run check:seo` enforces them.

## Where the plan and the owner's decisions differ

The owner's decisions in `CLAUDE.md` (same date) win where they conflict:

| Plan said | What shipped | Why |
|---|---|---|
| Homepage H1 "Website Development & Wholesale Peptides" | H1 stays "Build your brand. Or supply it."; the `<title>` carries the phrase | Owner restored the two-doors homepage and rejected later variants |
| `/wholesale/catalog/`, `/wholesale/products/{slug}/`, `/wholesale/private-label/` | `/catalog`, `/catalog/{slug}`, `/white-label` | Plan: keep existing valuable URLs; no redirects needed |
| `/website-development/...` with trailing slashes | No trailing slashes, as the live site already uses | One URL format, matching canonicals |
| WhatsApp on development pages | None | Owner: development pages use the on-page brief only |
| Prices on product pages | None | Owner: no prices; Inquire opens WhatsApp or email |

## Route inventory

**New pages (54)**

| Route | Owns the query | Primary CTA |
|---|---|---|
| `/website-development/peptide-websites` | peptide website development | Request a Website Quote |
| `/website-development/ecommerce` | ecommerce website development | Discuss Your Store |
| `/website-development/b2b-portals` | B2B ecommerce portal | Discuss Your Portal |
| `/website-development/redesign` | website redesign | Request a Website Review |
| `/website-development/integrations` | ecommerce integrations | Discuss an Integration |
| `/website-development/maintenance` | website maintenance | Discuss Support |
| `/wholesale` (now its own page) | wholesale peptides | Request Wholesale Pricing |
| `/wholesale/testing` | peptide testing, batch COA | View Available Documentation |
| `/wholesale/ordering` | wholesale peptide ordering, MOQ | Start a Wholesale Inquiry |
| `/catalog/{slug}` × 33 | "{compound} wholesale" | Add to inquiry / Request Product Pricing |
| `/work/vanta-labs` | website development case study | Discuss a Similar Project |
| `/guides/{slug}` × 12 new | one buyer question each | Related service |

New guides: choose-wholesale-peptide-supplier, read-peptide-coa,
peptide-website-features, retail-vs-wholesale-ordering,
private-label-vs-unbranded, prepare-wholesale-order, peptide-website-cost,
shopify-vs-custom-peptide-website, catalog-and-coa-library,
wholesale-business-launch-checklist, catalog-url-migration,
b2b-buyer-portal-features.

**Changed pages:** `/` (title and description only), `/website-development`
(H1 "Website development", links to the six service pages), `/catalog` (now
indexed; H1 "Wholesale Peptide Catalog"; multi-product inquiry),
`/white-label` (H1 "Private Label Peptides & White Label Supply"),
`/fulfillment` (H1 "Peptide Dropshipping & Order Fulfillment"),
`/factory-direct` (H1 "Factory-Direct Peptide Supply"), `/supply`, `/work`
(H1 "Website development portfolio"; concept stores labelled as concepts),
`/about` (H1 "About Vanta Foundry"), `/contact` (H1 "Contact Vanta Foundry";
separate website and wholesale paths). Every title now reads
"Subject | Vanta Foundry".

**Not built, on purpose**

| Plan item | Reason |
|---|---|
| Website cost estimator | No approved price model; an estimator would invent prices |
| Separate wholesale order planner page | The catalog's inquiry list is the planner; a second page would duplicate it |
| Launch support page | `/industries/research-peptide-brands` and `/start/ruo-brand` already cover it |
| Tampa and Florida location pages | No verified local facts (office, service area, local work) |
| Translations | Plan defers them until English pages and lead handling are proven |
| Research twins per compound | Plan: only with sourced, reviewed content |

## Product data and its source

`src/lib/product-facts.ts` was read from the Vanta Labs store's public
product pages and COA library on 2026-10-23: identity data (with the store's
PubChem / FDA GSRS citations) and 41 published laboratory reports, each
linked to the laboratory document. Facts for the owner to check:

- Every store report shows batch **Vanta184290**, across 30 products. That
  looks like a placeholder, so this site shows report numbers, not the batch.
- The L-Carnitine report is listed at **10 mg**; the product is sold as
  6,000 mg. Shown without a size.
- The CJC-1295 no DAC report covers a **5 mg** vial; the product is sold as
  10 mg. Shown as published.
- HCG and Recon water have **no published report**; their pages say so.
- Existing copy says "every wholesale lot comes with a COA". Product pages
  add that the published reports cover the store's current batch, and that a
  quote names the buyer's lot.

## Inquiry paths

| Path | How it works | Counted as |
|---|---|---|
| Website brief (`/start/website-development`) | Validated on the server, emailed through Resend with a reference (VF-XXXXXXXX), the visitor's landing page, referrer, campaign and last page viewed | `inquiry_submitted` only after the server confirms |
| Duplicates | One id per brief, sent to Resend as `Idempotency-Key` | One email per brief |
| Email failure | Visitor gets the email-app fallback with the brief written in | `inquiry_error` |
| Wholesale list (catalog, product pages) | Products, vial size and number of vials kept across pages; sent on WhatsApp or by email with business, destination and attribution | `catalog_product_select`, then `contact_click` |

**Blocker: no lead database.** The email and Resend's log are the only record
of a brief. The plan asks for a saved lead; that needs a store chosen by the
owner (for example a table in a new Supabase project, not the store's
production database). Wholesale inquiries are WhatsApp/email by owner
decision, so they are never stored by the site.

## Analytics

Events go to Vercel Web Analytics (`@vercel/analytics`): `offer_view`,
`catalog_product_select`, `inquiry_start`, `inquiry_error`,
`inquiry_submitted`, `contact_click`. **Action needed:** enable Web Analytics
in the Vercel project (custom events need a plan that includes them). Until
then the script answers 404 and nothing is recorded. No names, emails or
phone numbers are sent.

`lead_qualified`, `quote_sent`, `sale_won` and `repeat_order` happen outside
the site; log them in a sheet keyed by the VF- reference or WhatsApp thread.

## Technical SEO

- Sitemap: 100 canonical URLs, `lastModified` only where a real revision date
  is recorded (never the build date).
- `robots.txt` allows everything except `/api/`, including `/_next` assets.
  Preview deployments (`VERCEL_ENV=preview`) disallow all and send
  `X-Robots-Tag: noindex`.
- Structured data: Organization, WebSite, Service, Product (no offers, since
  no prices), ItemList, FAQPage (matching visible FAQs), Article, BreadcrumbList.
- `npm run check:seo` (against `npm start`) checks every registry page,
  product, guide and sitemap URL: 200, indexable, one H1, approved title/H1,
  self-canonical, CTA present, report numbers present, no broken internal
  links, no orphans. Passed on this build: 102 URLs, 0 problems.

## Indexing status

| Step | Status |
|---|---|
| Sitemap submitted to Google Search Console / Bing | **Not done**: no webmaster access from this workspace |
| Crawlable | Yes, on the build checked (robots, status, canonicals) |
| Confirmed indexed | Unknown; check in Search Console after release |

After release: verify `https://www.vantafoundry.com` in Search Console and
Bing Webmaster Tools, submit `/sitemap.xml`, and inspect `/wholesale`,
`/catalog`, `/website-development/peptide-websites` and two product pages.

## 60-day measurement plan

**Day 0 baseline (record at release):** indexed pages and impressions in
Search Console (zero if the property is new), briefs received, wholesale
threads opened. No pre-launch organic data exists in this workspace, so
pre/post comparisons start from release.

**Weekly (15 minutes):** impressions and clicks by landing page, split
website vs wholesale; briefs submitted (`inquiry_submitted`) vs contact
clicks; form errors; pages excluded from the index and why; new queries.

| Checkpoint | Look at | If it's weak |
|---|---|---|
| Day 7 | Real briefs arrive; no 404s or crawl errors; reports open | Fix delivery and broken links first |
| Day 30 | Pages indexed vs submitted; first queries; inquiry vs click ratio | Discovery problem → links and Search Console; demand problem → query research |
| Day 45 | Which pages draw impressions without inquiries; sales questions | Rewrite those pages' openings and FAQs |
| Day 60 | Qualified leads, quotes and wins per offer | Adjust offers and follow-up, not page count |

AI visibility: once a month, ask ChatGPT, Gemini, Perplexity and Google AI
Overviews the same ten buyer questions; record date, whether we're cited and
which URL.

No lead or revenue forecast is made: there is no baseline to make one from.
