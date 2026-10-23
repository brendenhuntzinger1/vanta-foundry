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

**New pages (55)**

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
| `/guides/{slug}` × 13 new | one buyer question each | Related service |

New guides: choose-wholesale-peptide-supplier, read-peptide-coa,
peptide-website-features, retail-vs-wholesale-ordering,
private-label-vs-unbranded, prepare-wholesale-order, peptide-website-cost,
shopify-vs-custom-peptide-website, catalog-and-coa-library,
wholesale-business-launch-checklist, catalog-url-migration,
b2b-buyer-portal-features, start-a-research-peptide-business.

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
| Paid launch-support service | Not sold; a launch guide (`/guides/start-a-research-peptide-business`) and `/industries/research-peptide-brands` cover the intent |
| Tampa and Florida location pages | No verified local facts (office, service area, local work) |
| Translations | Plan defers them until English pages and lead handling are proven |
| Research twins per compound | Plan: only with sourced, reviewed content |

## Report verification (2026-10-23, second pass)

Every report the site links was downloaded and read: the 38 Kovera Labs PDFs
(`pdftotext`) and the store's 3 Horizon Analytical lot pages. Each row in
`src/lib/product-facts.ts` now carries the **labelled size and batch exactly
as printed on the report**, and a status the pages show:

| Status | Count | Meaning |
|---|---|---|
| Batch report | 36 | Product, labelled size and client (Vanta Labs Research) match what we supply |
| Reference only | 5 | Published, but doesn't document the size or lot sold; the reason is shown on the page |
| No report | 2 products | HCG and Recon water; their pages say so |

The five reference reports:

- **L-Carnitine (KVR-2026-C2C983):** the report is labelled 10 mg (liquid); the
  product is sold as 6,000 mg.
- **KLOW (KVR-2026-E355F5):** the report prints `Batch: N/A`.
- **CJC-1295 no DAC (Lot GB-5583809-P):** a Horizon report for a batch shared
  with Genesis Biomapping (it names Genesis as the client and carries their
  lot number), covering a 5 mg vial, with an identity result only. The product
  is sold as 10 mg.
- **MOTS-c (Lot GB-7058391-P)** and **Tesamorelin (Lot GB-1700427-P):** Genesis
  Biomapping partner lots, as above. No report covers Tesamorelin 5 mg.

Other things the documents show, for the owner:

- All 37 other Kovera reports print batch **Vanta184290**, across about 30
  different compounds. It is on the lab documents, so the site shows it, but
  one batch number for many compounds is worth confirming with the lab.
- The VLP-1 (SM), VLP-2 (TR) and VLP-3 (RT) reports name the compound by its
  research name. The site keeps the store's coded names and doesn't print the
  drug names; whether to target those names is an owner decision.
- Thymosin Alpha-1 (KVR-2026-4D316E) reports **12.91 mg net content against a
  5 mg label**. Shown on the page as a note.
- All 41 report links answer 200: 38 PDFs and 3 Horizon lot pages (the CJC-1295
  no DAC link was the store product page before; it now opens its lot page).
  `npm run check:reports` re-checks them.

## Inquiry storage and delivery

Leads are saved in the **Vanta Labs Supabase project** (`mlpimwgkwuqpsvsrlpqv`),
in a separate `foundry` schema the API doesn't expose: migrations
`foundry_leads` and `foundry_leads_ref_not_unique`, kept in
`supabase/foundry_leads.sql`. No store table, checkout or payment object was
touched. The site writes through two database functions using the project's
publishable key, which can't read leads (checked: reading `foundry.leads`
over the API is refused).

| Path | What happens | Counted as |
|---|---|---|
| Website brief | Validated → saved (`status = new`) → emailed through Resend → `notified_at` recorded | `inquiry_submitted` only after the server confirms it was saved or emailed |
| Same brief sent twice / double tap | Same id: one row; Resend gets the same Idempotency-Key | One lead |
| Email fails after saving | Row kept with `notify_error`; the visitor still sees "Brief received" with the reference | Lead (in the table, un-notified) |
| Storage unreachable, email works | Emailed; the email is the record | Lead |
| Both fail | Visitor gets the email-app fallback with the brief written in | `inquiry_error` |
| Wholesale list sent | Logged as `kind = wholesale_handoff`, `status = handoff`, with the same reference that appears in the WhatsApp/email message | `contact_click`; not a lead until the message arrives |

Tested 2026-10-23 against the real table and a local production build:

- Save, retry with the same id, three concurrent submits of one id (one row,
  three attempts), and an email provider rejection (`resend 401` recorded,
  brief kept).
- Storage unreachable plus no email (fallback). Invalid payloads rejected
  (422/400). A handoff saved. Browser run of the brief at 390×844
  (attribution carried; fallback opens with the full brief).
- **Not tested:** a real successful Resend send, because the Resend key lives
  in the Vercel project.

**Six test rows remain in `foundry.leads`.** The database connector holds
deletes for your approval. Remove them with:
`delete from foundry.leads where name = 'Claude test' or service like 'TEST%';`

Working the leads: open Supabase → Table editor → schema `foundry` → `leads`.
Move `status` through new → acknowledged → qualified → quoted → won/lost, and
fill `lost_reason`, `quote_value` and `sale_value`. Find briefs whose email
failed with `where notified_at is null and kind = 'website_brief'`.

## Analytics

Application events (implemented, sent with `@vercel/analytics`):
`offer_view`, `catalog_product_select`, `inquiry_start`, `inquiry_error`,
`inquiry_submitted` (only after the server confirms), `contact_click`
(WhatsApp/email opened: never counted as a lead). No names, emails or phone
numbers are sent; the lead reference is.

What enabling **Vercel Web Analytics** gives: page views, referrers and
countries from the script, plus the custom events above if the plan includes
custom events. Until it's enabled, `/_vercel/insights/script.js` answers 404
and nothing is recorded.

Qualification, quotes, sales and repeat orders aren't site events. They are
the `status`, `quote_value` and `sale_value` columns on `foundry.leads`.

## Technical SEO

- Sitemap: 101 canonical URLs, `lastModified` only where a real revision date
  is recorded (never the build date).
- `robots.txt` allows everything except `/api/`, including `/_next` assets.
  Preview deployments (`VERCEL_ENV=preview`) disallow all and send
  `X-Robots-Tag: noindex` (confirmed on the PR preview's response headers).
- Structured data: Organization, WebSite, Service, Product (no offers, since
  no prices), ItemList, FAQPage (matching visible FAQs), Article, BreadcrumbList.
- `npm run check:seo` (against `npm start`) checks every registry page,
  product, guide and sitemap URL. It requires a 200, an indexable page, one H1,
  the approved title and H1, a self-canonical, the CTA present, the supporting
  phrases rendered, report numbers present, reference reports explained, no
  broken internal links and no orphans.
- What it can't establish: rankings, indexing, real-device behaviour, or that
  copy is persuasive. It checks the registry against the rendered pages; the
  registry itself was reviewed against the plan and the keyword audit by hand.
- Keyword coverage: `docs/KEYWORD-COVERAGE.md` gives every one of the 531
  audit pages and 122 tag phrases a disposition, checked against rendered pages.

## Preview and environments

- Everything above was tested on a **local production build**
  (`npm run build && npm start`), with Playwright emulating a phone (390×844)
  and desktops (1024, 1280). No real devices were used.
- The PR's Vercel preview deployed (bot status Ready) but sits behind Vercel
  Authentication. The connected Vercel account is refused
  (`403 forbidden` reading deployment `dpl_J21wUgPNe3TLzgRhv2NWVkkniJ4R`), so
  the rendered preview and its forms were **not** inspected. To allow it,
  authorize the Foundry project (team `brendenhuntzinger1's projects`,
  project `prj_h0c01RMILqTNP5Vc8PN7nrBnBDOU`) in the Vercel connection.

## Indexing status

| Step | Status |
|---|---|
| Eligible / crawlable | Yes, on the local build (robots, 200s, self-canonicals, no unintended noindex) |
| Sitemap submitted to Google Search Console / Bing | **Not done**: no webmaster access from this workspace |
| Confirmed indexed | Unknown until Search Console shows it after release |

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
