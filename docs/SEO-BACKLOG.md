# SEO backlog (after PR #31)

What's left from the keyword audit, in priority order. Counts come from
`npm run keywords` (`docs/KEYWORD-COVERAGE.md`, `docs/KEYWORD-DECISIONS.md`,
`docs/LOCATION-OPPORTUNITIES.md`). Search volume and rankings are unknown, so
the order follows evidence and effort, not measured demand. Nothing on this
list counts as implemented until a page with the content is live.

**Implemented in the PR:** 112 of 531 audit pages; 35 of 122 unique audit
tag phrases word for word, each checked on its rendered page.

## 1. Unblocked by owner answers (small, factual)

| Item | Needs | Adds | Doesn't count as |
|---|---|---|---|
| "Where we ship" section on `/wholesale/ordering` | Q3 shipping origin, Q4 destinations | Accurate shipping copy; the USA phrases that turn out true | Any of the 98 wholesale location pages |
| "Where we work" section on `/website-development` | Q5 remote countries, Q6 offices | Accurate service-area copy; corrected `areaServed` | Any of the 24 development location pages |
| Wholesale terms on `/wholesale/ordering` | Q10 | Refund, quote validity and payment terms, stated once | — |
| KPV salt form spec row | Q12 | The "KPV free base vs acetate" phrase | — |
| The 16 keyword decisions (6 pages, 10 phrases) | Owner decisions | Recommendations in `docs/KEYWORD-DECISIONS.md` (most are "don't") | — |

## 2. Research content (47 deferred pages)

Each needs a dated literature source list, a qualified reviewer and a
compliance review against `docs/COMPLIANCE.md` (no usage, dosing or outcome
framing). Suggested order:

1. **99PW-442** SPPS vs LPPS vs hybrid synthesis, and **99PW-439** 2026 sourcing
   and RUO rules. Broad buyer questions; need a technical or regulatory
   reviewer, not product claims.
2. **99PW-445** "What is BPC-157" and **99PW-434** KPV: articles linked from
   their product pages.
3. **43 product research pages**: start with products whose report matches
   the product and size, so each article can point to a report.

## 3. Location pages (122, not implemented)

Build a local page only where there's a verified local fact that makes it
useful (a real office, an in-person service, or a destination with its own
shipping rules). The two sections in part 1 don't complete these pages and
won't be counted as doing so. Don't build template city pages.

## 4. Phrases left out on purpose

19 of the 44 reviewed phrases (see `docs/KEYWORD-DECISIONS.md`):
- **8 USA / United States phrases:** revisit after Q2–Q5.
- **"research compound logistics":** if `/fulfillment` gains a logistics section.
- **The rest:** ungrammatical, untrue or duplicates; no action.

## 5. After launch, from real results

Measure qualified wholesale inquiries (`wholesale_handoff` rows that turn into
quotes) and website briefs (`inquiry_submitted`, `foundry.leads.status`) per
landing page. Use Search Console queries and pages, once they exist, to
re-rank this backlog.
