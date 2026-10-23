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
| Do the product, labelled size and client printed on the report match our listing? | **35 match**, **6 reference only**, 2 products have no report | Every PDF read with `pdftotext`; Horizon lot pages read |
| Is the printed batch the batch in current wholesale inventory? | **Not established** for any product | Needs the owner/supplier; each quote names the buyer's lot |

The site labels the 35 "Matches product and size" and says it doesn't confirm
the batch in stock; it never calls them batch-verified. The six reference
reports show their reason on the page:

- **L-Carnitine (KVR-2026-C2C983):** the report is labelled 10 mg (liquid); the product is sold as 6,000 mg.
- **KLOW (KVR-2026-E355F5):** the report prints `Batch: N/A`.
- **CJC-1295 no DAC (Lot GB-5583809-P):** a Genesis Biomapping partner lot (Genesis is named as the client), 5 mg vial, identity only; the product is sold as 10 mg.
- **MOTS-c (Lot GB-7058391-P)** and **Tesamorelin (Lot GB-1700427-P):** Genesis Biomapping partner lots. No report covers Tesamorelin 5 mg.
- **Thymosin Alpha-1 (KVR-2026-4D316E):** the report is labelled 5 mg and measured 12.91 mg net content. The owner confirmed on 2026-10-23 that the product is 10 mg, so the page lists 10 mg and shows this report as reference only. The Vanta Labs store still lists 5 mg and should be corrected there.

## Owner questions (only the unanswered facts)

Answered 2026-10-23: 1, 3, 4 and 8. The owner said nothing else is needed for launch, so the rest stay on their safe display and can wait. Each fact is asked separately: one answer doesn't imply another (for example, where products ship from says nothing about where they're made).

| # | Question | Affects | Shown until answered |
|---|---|---|---|
| 1 | **Business location** | `/contact`, `/about`, Organization data | **Answered:** don't publish it. No address is shown |
| 2 | **Manufacturing origin:** where are the products made? | Any "made in" claim; the USA phrases; audit page 99PW-448 | No origin claim |
| 3 | **Shipping origin** | `/wholesale/ordering`, `/fulfillment` | **Answered:** stock ships from Tampa Bay, Florida. Now on both pages |
| 4 | **Shipping destinations** | `/wholesale/ordering`, `/fulfillment`, `/factory-direct` | **Answered:** stock, white label and 3PL orders ship to the United States only; factory-direct orders can ship internationally from the factory. Now on those pages |
| 5 | **Remote website clients:** which countries do you take website clients in? | A "Where we work" section; 24 development location intents; the Organization structured data's `areaServed: "US"` (live before this PR) | No country list in the copy. Confirm "US", or I remove that line from the structured data |
| 6 | **Offices and in-person meetings:** is there a physical office, and do you meet clients in person anywhere? | `/contact`; any local page | Nothing said about offices or meetings |
| 7 | **Batch Vanta184290:** 37 Kovera reports across about 30 compounds print this batch. Is it a real manufacturing batch, an order code or an entry error? Is it the stock buyers would receive? | 36 report rows marked "Matches product and size"; `/wholesale/testing` | As now: product and size match, the batch is shown as printed, and the page says current stock isn't confirmed. Each quote names the lot |
| 8 | **Thymosin Alpha-1 size** | `/catalog/thymosin-alpha-1` | **Answered:** 10 mg. Listed as 10 mg; the 5 mg report is reference only. *Owner to do:* the Vanta Labs store still lists 5 mg |
| 9 | **Missing or partner reports:** a report for L-Carnitine 6,000 mg? KLOW's tested batch? Are the Genesis lots (CJC-1295 no DAC, MOTS-c, Tesamorelin) Vanta's material? Reports for CJC-1295 no DAC 10 mg and Tesamorelin 5 mg? Will HCG and Recon water get reports? | Those product pages | "Reference only" with the reason, or "No report published yet" |
| 10 | **Wholesale terms:** refund or replacement policy, quote validity, payment terms | `/wholesale/ordering` FAQs | "Confirmed on your quote" |
| 11 | **Coded names:** keep VLP-1/2/3 only, or name the compounds? | `/catalog/glp-1`, `-2`, `-3` | Coded names only (recommended) |
| 12 | **KPV salt form:** free base or acetate? | `/catalog/kpv` spec table | Omitted |

## Report mismatches: what each page shows

No product page needs to be held back. Each mismatch is labelled where it appears, and no reference report is presented as verification of the stock a buyer will receive.

| Mismatch | Page | Recommendation | Now |
|---|---|---|---|
| One batch, Vanta184290, printed across about 30 compounds (Q7) | About 30 product pages, `/wholesale/testing` | Show the report, labelled "Matches product and size", with the batch as printed and "doesn't confirm current stock" | Done |
| Thymosin Alpha-1: report labelled 5 mg (12.91 mg measured); product is 10 mg (owner) | `/catalog/thymosin-alpha-1` | Labelled reference; no 10 mg report yet | Done |
| L-Carnitine: 10 mg report, 6,000 mg product | `/catalog/l-carnitine` | Labelled reference; not counted as documented | Done |
| KLOW: batch N/A | `/catalog/klow` | Labelled reference | Done |
| CJC-1295 no DAC: a Genesis partner lot, 5 mg, identity only; we sell 10 mg | `/catalog/cjc-1295-no-dac` | Labelled reference for now. Remove the link if Q9 says it isn't Vanta's material | Labelled reference |
| MOTS-c, Tesamorelin: Genesis partner lots | Those pages | Same as CJC-1295 no DAC | Labelled reference |
| HCG, Recon water: no report | Those pages | "No report published yet"; inquiries still work | Done |

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

Eight rows were created by testing. **Deleted 2026-10-23** with the owner's permission, by exactly these ids (the delete returned all eight):

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

**2. Deployment build status** (from the Vercel bot on the PR): every push builds a preview, and each has reported **Ready** (the latest checked when this was written: `dpl_Fvez71vez11YzGxzXCitMgdxU2Wc`, commit 090e327). This shows the build succeeded on Vercel. It doesn't show that the deployed pages, forms or settings work.

**3. Deployed functional tests:** **none run.** The preview is behind Vercel Authentication, and the connected Vercel account gets **404 on project `prj_h0c01RMILqTNP5Vc8PN7nrBnBDOU`** (team `team_mYQ1nzN5ge279mjxaLG26lYe`) and **403 on the deployment**. See *Getting past the Vercel blocker* below.

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

## Getting past the Vercel blocker

The connected Vercel account can see three projects in the team (`vanta-labs`, `vanta-skin`, `telehealth-jrgh`) but not `vanta-foundry`, so its access is per project and this one was left out.

**The one action:** in Vercel, open the team *brendenhuntzinger1s-projects* → **Settings → Integrations**. Find the Claude/MCP integration, open its **project access**, and add **vanta-foundry** (or choose All Projects).

If that setting isn't there, open the latest preview deployment in Vercel, click **Share**, and paste the share link into the Claude session. It expires on its own, so no secret needs to be shared. It's enough to test pages and forms, and Resend delivery can be checked through the Resend connection, but analytics can't be read with it.

## Deployed verification log

Fill one row per check on the **latest deployed commit**. "Accepted" (Resend answered 200 with an email id) isn't "delivered" (Resend shows the email as delivered, or it's in the support@ inbox).

| Check | Commit | Environment | Result | Evidence |
|---|---|---|---|---|
| Rendering and navigation, 390×844 and 1280 | | Preview | Not run | |
| Preview noindex (header and robots) | | Preview | Not run | |
| Brief saved with reference | | Preview + `foundry.leads` | Not run | |
| Notification accepted by Resend | | Preview + Resend | Not run | |
| Notification delivered | | Resend + inbox | Not run | |
| Retry: no second row, no second email | | Preview + both | Not run | |
| Wholesale handoff keeps products, quantities, reference | | Preview + `foundry.leads` | Not run | |
| Analytics: `inquiry_submitted` separate from `contact_click`, `wholesale_handoff` | | Production or preview with Web Analytics on | Not run | |

## Launch preparation (checked)

| Item | Result | Evidence |
|---|---|---|
| Public domain | `https://www.vantafoundry.com` (the apex 308s to it); `SITE.url` defaults to it | `curl` of the live site; `src/lib/site.ts` |
| Production canonicals, sitemap, robots | All self-canonicals and all 104 sitemap URLs on `https://www.vantafoundry.com`; robots allows all except `/api/` and names the sitemap; no `X-Robots-Tag` | Local build with `VERCEL_ENV=production` |
| Preview noindex can't reach production | With `VERCEL_ENV=preview`: robots disallows all and every page sends `X-Robots-Tag: noindex, nofollow`. Production gets neither. Both switch on `VERCEL_ENV`, which Vercel sets to `production` only on production | Two local builds compared; `src/lib/env.ts`, `next.config.ts` |
| Internal links | Relative; no preview or other hostnames | `check:seo` and a scan of the rendered HTML |
| Lead privacy | `foundry.leads` has RLS on, no policies and no table grants, and the schema isn't exposed. The two write functions return only `ref`, `created` and `notified`, never contact details. The Supabase advisor's "anon can execute SECURITY DEFINER" warnings are these intended write-only functions | SQL catalog queries; Supabase advisors |
| Notification failures visible | The row keeps `notify_error` and an empty `notified_at`. The API now also logs "lead saved but not emailed" with the reference, visible in Vercel logs | `src/app/api/lead/route.ts` |
| Recovering unemailed leads | `select ref, name, email, service, details, created_at, notify_error from foundry.leads where kind = 'website_brief' and notified_at is null order by created_at;` A visitor's retry also re-sends the email | Supabase SQL editor |
| Unverified service area removed | This PR's Service structured data no longer says `areaServed: "US"`; the Organization line from before the PR waits on Q5 | `src/lib/jsonld.tsx` |

## Launch blockers

1. **No deployed functional test has run** (Vercel access, above). Rendering, brief storage, notification delivery, duplicate protection, handoff contents and analytics are verified locally only.
2. **Web Analytics not enabled** (Project → Analytics → Enable), so inquiries couldn't be measured from day one.
3. **Test rows** in `foundry.leads`: the delete waited for approval and timed out, so the 8 rows (the statement above) are still the only rows.

Not blockers: the owner questions (each has a safe display meanwhile); sitemap submission and indexing; deferred research content; the 122 location pages (`docs/SEO-BACKLOG.md`).

## Indexing status

| Step | Status |
|---|---|
| Eligible / crawlable | On the local build only (robots, 200s, self-canonicals, no unintended noindex); unknown on production |
| Sitemap submitted to Google Search Console / Bing | **Not done**: no webmaster access from this workspace |
| Indexed | **Unknown** (not verified). Nothing is deployed to production from this PR yet |

### Submitting the sitemap after release

1. **Google Search Console** (search.google.com/search-console): Add property → **Domain** → `vantafoundry.com`. Add the TXT record it gives to the domain's DNS, then Verify.
2. Sitemaps → enter `sitemap.xml` → Submit. Status should read "Success" with 104 discovered URLs.
3. URL Inspection → request indexing for `/`, `/wholesale`, `/catalog`, `/website-development` and `/website-development/peptide-websites`.
4. **Bing Webmaster Tools** (bing.com/webmasters): Import from Search Console (fastest), or add the site and verify. Then Sitemaps → Submit `https://www.vantafoundry.com/sitemap.xml`.
5. Record the date. Indexing stays **unknown** until the Pages report in each tool shows it.

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
