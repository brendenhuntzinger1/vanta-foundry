# Organic growth build: launch record and 60-day plan

Built 2026-10-23 from the *Vanta Foundry: Organic Growth Master Plan*. This
file records what PR #31 implements, which page owns which search, what is
still blocked, and how the next 60 days are measured. Nothing here is deployed
to production yet: "implemented" means implemented in the PR. Approved titles, H1s and
CTAs live in `src/lib/seo-pages.ts`; `npm run check:seo` enforces them.

## Where the plan and the owner's decisions differ

The owner's decisions in `CLAUDE.md` (same date) win where they conflict:

| Plan said | What the PR implements | Why |
|---|---|---|
| Homepage H1 "Website Development & Wholesale Peptides" | H1 stays "Build your brand. Or supply it."; the `<title>` carries the phrase | Owner restored the two-doors homepage and rejected later variants |
| `/wholesale/catalog/`, `/wholesale/products/{slug}/`, `/wholesale/private-label/` | `/catalog`, `/catalog/{slug}`, `/white-label` | Plan: keep existing valuable URLs; no redirects needed |
| `/website-development/...` with trailing slashes | No trailing slashes, as the live site already uses | One URL format, matching canonicals |
| WhatsApp on development pages | None | Owner: development pages use the on-page brief only |
| Prices on product pages | None | Owner: no prices; Inquire opens WhatsApp or email |

## Route inventory

**New pages (58)**

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
| `/guides/{slug}` × 16 new | one buyer question each | Related service |

New guides: choose-wholesale-peptide-supplier, read-peptide-coa,
peptide-website-features, retail-vs-wholesale-ordering,
private-label-vs-unbranded, prepare-wholesale-order, peptide-website-cost,
shopify-vs-custom-peptide-website, catalog-and-coa-library,
wholesale-business-launch-checklist, catalog-url-migration,
b2b-buyer-portal-features, start-a-research-peptide-business,
core-web-vitals-explained, why-nextjs-site-is-slow,
choose-website-development-partner.

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

## Report verification

Three separate questions, kept apart on the site and here:

| Question | Result | How it was checked |
|---|---|---|
| Does the report link open? | **41 of 41** (38 lab PDFs, 3 Horizon lot pages) | `npm run check:reports` |
| Do the product, labelled size and client printed on the report match our listing? | **36 match**, **5 reference only**, 2 products have no report | Every PDF read with `pdftotext`; Horizon lot pages read |
| Is the printed batch the batch in current wholesale inventory? | **Not established** for any product | Needs the owner/supplier; each quote names the buyer's lot |

The site labels the 36 "Matches product and size" and says it doesn't confirm
the batch in stock; it never calls them batch-verified. The five reference
reports show their reason on the page:

- **L-Carnitine (KVR-2026-C2C983):** the report is labelled 10 mg (liquid); the product is sold as 6,000 mg.
- **KLOW (KVR-2026-E355F5):** the report prints `Batch: N/A`.
- **CJC-1295 no DAC (Lot GB-5583809-P):** a Genesis Biomapping partner lot (Genesis is named as the client), 5 mg vial, identity only; the product is sold as 10 mg.
- **MOTS-c (Lot GB-7058391-P)** and **Tesamorelin (Lot GB-1700427-P):** Genesis Biomapping partner lots. No report covers Tesamorelin 5 mg.

## Factual questions for the owner (all in one place)

1. **Batch:** 37 Kovera reports across about 30 compounds print the same batch, **Vanta184290**. Is that one manufacturing batch, an order/shipment code, or a lab-entry error? Is it the batch in current wholesale stock?
2. **L-Carnitine:** is there a report for the 6,000 mg product, or is the 10 mg report the right document?
3. **KLOW:** what batch was tested (the report says N/A)?
4. **CJC-1295 no DAC, MOTS-c, Tesamorelin:** were these Genesis Biomapping lots the same material Vanta supplies? Is there a Vanta report for CJC-1295 no DAC 10 mg and Tesamorelin 5 mg?
5. **Thymosin Alpha-1 (KVR-2026-4D316E):** the report measures 12.91 mg net content against a 5 mg label. Is the label or the fill correct?
6. **HCG and Recon water:** will reports be published?
7. **Coded names:** VLP-1/2/3 reports name semaglutide, tirzepatide and retatrutide. Keep coded names only (recommended), or name the compounds?
8. **Origin:** where are products manufactured, and where do wholesale orders ship from? (No "US-made" or "ships from" claim is published.)
9. **Shipping coverage:** which states or countries do you ship wholesale to, and exclude? (Decides the 98 wholesale location intents; see `docs/LOCATION-OPPORTUNITIES.md`.)
10. **Wholesale terms:** is there a refund/replacement policy, standard quote validity and payment terms for wholesale?
11. **KPV salt form:** free base or acetate, if documented.
12. **Website service area:** which countries do you take website clients in, remotely? Do you meet any in person, and is there an office address to publish? (Decides the 24 development location intents, and whether the existing `areaServed: "US"` in the structured data is right.)

## Inquiry storage and delivery

Leads are saved in the **Vanta Labs Supabase project** (`mlpimwgkwuqpsvsrlpqv`),
schema `foundry` (not exposed by the API), table `leads`. Migrations
`foundry_leads` and `foundry_leads_ref_not_unique` are kept in
`supabase/foundry_leads.sql`. No store table, checkout, payment object or the
Authorize.Net gateway and its transaction payloads were touched. The site
writes through two database functions using the publishable key, which can't
read leads; reading `foundry.leads` over the API is refused (checked).

| Path | What happens | Counted as |
|---|---|---|
| Website brief | Validated → saved (`status = new`) → emailed through Resend → `notified_at` recorded | `inquiry_submitted`, only after the server confirms it was saved or emailed |
| Same brief sent again | Same id: same row, same reference; Resend gets the same Idempotency-Key | One lead |
| Email fails after saving | Row kept with `notify_error`; the visitor sees "Brief received" with the reference | Lead (in the table, un-notified) |
| Storage unreachable, email works | Emailed; the email is the record | Lead |
| Both fail | Email-app fallback with the brief written in | `inquiry_error` |
| Wholesale list sent | Logged as `wholesale_handoff` (`status = handoff`) with the reference printed in the WhatsApp/email message | `contact_click` + `wholesale_handoff`; not a lead until the message arrives |

### What was verified, and where

| Check | Result | Environment |
|---|---|---|
| Brief saved, "Brief received" with reference, attribution kept | VF-B03E3A83 saved; landing page, campaign and last page stored | Local production build + real database, Playwright 390×844 |
| Resend of the same brief | Same reference, still one row (`notify_attempts` = 2) | same |
| Three concurrent sends of one id | One row | Local build + real database (curl) |
| Email provider rejects (bad key) | Brief kept, `notify_error = resend 401` | same |
| Storage unreachable, no email | Email-app fallback shown, brief in the mailto | Local build, Playwright |
| Wholesale handoff | Both products, sizes, quantities, business, destination and reference VF-26E0786D identical in the WhatsApp message and the saved row | Local build + real database, Playwright |
| Analytics events | `inquiry_start`, `inquiry_submitted`, `catalog_product_select`, `contact_click`, `wholesale_handoff` each queued separately with the right fields | Local build (read from the analytics queue; nothing sent, the script isn't served locally) |

### Not verified, and why

- **A real notification email from the new code.** It needs `RESEND_API_KEY`, which lives in the Vercel project, and the preview can't be reached (below). Evidence that the production settings work: Resend shows two "New website development lead: Setup Test" emails from `Vanta Foundry <leads@vantalabsresearch.com>` delivered to support@ at 12:16 and 12:18 UTC today, sent by the current production site. The sending domains `vantalabsresearch.com` and `mail.vantalabsresearch.com` are verified. Whether the *preview* environment has the key is unknown. After merge, send one brief and check that `notified_at` is filled.
- **Duplicate notification suppression in Resend.** The Idempotency-Key is sent, but a second real send wasn't possible without the key.
- **Analytics delivery.** Events are queued correctly, but they reach Vercel only once Web Analytics is enabled for the project.

### Test rows to delete

Eight rows were created by testing. Delete exactly these (the connector held deletes for your approval):

```sql
delete from foundry.leads where id in (
  '00000000-0000-4000-8000-001792787508', -- VF-00000000 brief (REST test)
  'aaaaaaaa-0000-4000-8000-000000000001', -- VF-AAAAAAAA brief
  '1595db4f-6f80-4271-890d-bfe14b230dd8', -- VF-1595DB4F brief (retry test)
  'faee196d-21ae-44bc-8417-559e6cc71b0c', -- VF-FAEE196D brief (concurrency test)
  '043793e2-d5e4-4e4b-8575-c389b7501d3d', -- VF-043793E2 brief (email failure test)
  'f9d05db8-d637-4106-a159-e742d5ca42c0', -- VF-F9D05DB8 handoff (API test)
  '26e0786d-edef-449c-8ce2-9d47536834c8', -- VF-26E0786D handoff (browser test)
  'b03e3a83-6812-4e64-841b-1f3f036af7cf'  -- VF-B03E3A83 brief (browser test)
);
```

Working the leads: Supabase → Table editor → schema `foundry` → `leads`. Move
`status` through new → acknowledged → qualified → quoted → won/lost, and fill
`lost_reason`, `quote_value` and `sale_value`. Briefs whose email failed:
`where notified_at is null and kind = 'website_brief'`.

## Analytics

| Event | Fires when | Is a lead? |
|---|---|---|
| `offer_view` | A service, product or wholesale page is viewed | No |
| `catalog_product_select` | A product is added to the wholesale list | No |
| `inquiry_start` | The website brief opens | No |
| `inquiry_error` | Validation, storage/email failure or network error | No |
| `inquiry_submitted` | The server confirms a brief was saved or emailed | **Yes** |
| `contact_click` | Any WhatsApp/email link opened | No |
| `wholesale_handoff` | The wholesale list is handed to WhatsApp/email (with its reference) | No: a lead only once the message arrives |

Qualification, quotes, sales and repeat orders are `foundry.leads` columns, not page events.

**Enabling Vercel Web Analytics** (Project → Analytics → Enable) gives page views, referrers and countries, and records the events above on a plan that includes custom events. It couldn't be enabled from here: no access to the project (below).

## Technical SEO

- Sitemap: 104 canonical URLs, `lastModified` only where a real revision date is recorded.
- `robots.txt` allows everything except `/api/`, including `/_next` assets. Preview deployments disallow all and send `X-Robots-Tag: noindex`; that header was seen on the PR preview's login-wall response.
- Structured data: Organization, WebSite, Service, Product (no offers), ItemList, FAQPage (matching visible FAQs), Article, BreadcrumbList.
- `npm run check:seo` checks every registry page, product, guide and sitemap URL: 200, indexable, one H1, approved title and H1, self-canonical, CTA, primary phrase in title/H1/body (each checked on its own), supporting phrases, report statuses and notes, no broken internal links, no orphans. It establishes that the build matches the approved registry; it can't establish rankings, indexing, real-device behaviour or persuasiveness.
- Keyword work: `docs/KEYWORD-COVERAGE.md` (every audit page and phrase classified) and `docs/KEYWORD-DECISIONS.md` (what is actually implemented, placement by placement, the deferred list, owner decisions and the URL map). Regenerate with `npm run keywords`.

## Verification tiers

Three different things, reported separately.

**1. Local test results** (local `npm run build && npm start`, real Supabase database, Playwright-emulated browsers at 390×844, 1024 and 1280; no real devices):

| Check | Result |
|---|---|
| `npm run check:seo` | Pass: 106 URLs, registry, canonicals, links, orphans |
| `npm run check:reports` | Pass: 41 of 41 report links open (this proves the PDF opens, not that it matches current stock) |
| Brief saved, reference shown, retry, concurrency, email failure, storage outage | Pass (table above) |
| Wholesale handoff contents | Pass: products, sizes, quantities and reference identical in message and saved row |
| Analytics events | Queued correctly; not delivered (no analytics endpoint locally) |
| Keyword placements | Read from rendered HTML (`docs/KEYWORD-DECISIONS.md`) |

**2. Deployment build status** (from the Vercel bot on the PR): every push builds a preview, and each has reported **Ready** (the most recent checked: `dpl_5PCpGQi8wC9jL6anXQZiK9bAWDMX`, commit 90455f7). This shows the build succeeded on Vercel. It doesn't show that the deployed pages, forms or settings work.

**3. Deployed functional tests:** **none run.** The preview is behind Vercel Authentication, and the connected Vercel account gets **404 on project `prj_h0c01RMILqTNP5Vc8PN7nrBnBDOU`** (team `team_mYQ1nzN5ge279mjxaLG26lYe`) and **403 on the deployment**. To fix: grant the connection access to the `vanta-foundry` project, or share a preview bypass link.

Run these on the deployed preview once access exists (each is "not run" until then):

| Deployed check | How | Pass when |
|---|---|---|
| Pages render | Open `/`, `/website-development`, `/wholesale`, `/catalog/bpc-157`, `/wholesale/testing` at 390×844 | 200, correct H1, no layout breaks |
| Preview isn't indexable | `curl -I` any page and `/robots.txt` | `X-Robots-Tag: noindex`, robots disallows all |
| Brief storage | Submit one brief | A new row in `foundry.leads` with the shown reference |
| Notification delivery | Same brief | Resend shows one delivered email to support@; the row has `notified_at` |
| Duplicate protection | Submit the same brief again (back + resend) | Same reference, still one row, no second email |
| Wholesale handoff | Add two products with quantities, send by WhatsApp and by email | Message and saved row both hold the same products, quantities and reference |
| Analytics delivery | After enabling Web Analytics, repeat the brief and handoff | Vercel shows `inquiry_submitted` separately from `contact_click` and `wholesale_handoff` |
| Clean-up | Delete the rows those tests create, by their exact ids | — |

## Launch blockers

1. **No deployed functional test has run** (Vercel access, above): rendering, brief storage, notification delivery, duplicate protection, handoff contents and analytics delivery are verified locally only.
2. **Report batch question 1** (Vanta184290) unanswered: product pages already avoid batch-verification claims, but the owner should confirm before buyers rely on them.
3. **Web Analytics not enabled**, so launch-day measurement would be lost.
4. **Test rows** in `foundry.leads` (delete statement above) so the first real lead isn't mixed with tests.

Not blockers (handled after release): sitemap submission and indexing; the deferred research content; location pages; the other factual questions.

## Indexing status

| Step | Status |
|---|---|
| Eligible / crawlable | On the local build only (robots, 200s, self-canonicals, no unintended noindex); unknown on production |
| Sitemap submitted to Google Search Console / Bing | **Not done**: no webmaster access from this workspace |
| Indexed | **Unknown** (not verified). Nothing is deployed to production from this PR yet |

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
