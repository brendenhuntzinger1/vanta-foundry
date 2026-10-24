"""Build docs/KEYWORD-COVERAGE.md: a disposition for every competitor source page
and every explicit keyword-tag phrase in the owner's keyword audit
(Vanta-Foundry-Keyword-Audit-and-Claude-Master-Prompt.md, 2026-10-23).

    npm run build && npm start          # in one terminal
    python3 scripts/keyword-coverage.py docs/research/keyword-audit-records.json

The rules below are written from the audit, the master plan and the owner's
decisions, not generated from the implementation. Each "covered" row is then
checked against the rendered HTML of its destination on the running build:
the page must answer 200, and a phrase marked covered must appear in its
visible text. Anything that fails is reported as "needs improvement", never
silently passed.
"""
import html as htmllib
import json
import re
import sys
import urllib.request
from collections import Counter

BASE = "http://localhost:3000"
RECORDS = json.load(open(sys.argv[1]))

# ---------------------------------------------------------------- status labels
COVERED = "covered and verified"
MERGED = "merged into an existing page"
NOT_RELEVANT = "not relevant"
UNAVAILABLE = "unavailable offer"
UNRESOLVED = "unresolved fact (owner)"
EXCLUDED = "excluded by compliance"
DEFERRED = "deferred (needs sourced content)"
LOCAL = "location intent: needs local facts"

# ---------------------------------------------------------------- products
# Competitor product slug -> our catalog slug, with any format difference.
SAME = {
    "b12": "b12", "bpc-157": "bpc-157", "cagrilintide": "cagrilintide", "cjc-1295-no-dac": "cjc-1295-no-dac",
    "cjc-1295-no-dac-10mg": "cjc-1295-no-dac", "cjc-1295-ipam": "cjc-1295-ipamorelin", "cjc-1295-ipamorelin": "cjc-1295-ipamorelin",
    "dsip": "dsip", "dsip-delta-sleep-inducing-peptide": "dsip", "epithalon": "epithalon", "ghk-cu": "ghk-cu",
    "glow-blend": "glow", "glow": "glow", "klow-blend": "klow", "klow": "klow", "kpv": "kpv", "lipo-c": "lipo-c",
    "mots-c": "mots-c", "nad": "nad", "selank": "selank", "semax": "semax", "snap-8": "snap-8", "ss-31": "ss-31",
    "ss-31-elamipretide": "ss-31", "tesamorelin": "tesamorelin", "thymosin-alpha-1": "thymosin-alpha-1",
    "pt-141-bremelanotide": "pt-141", "kisspeptin": "kisspeptin", "mt-2-melanotan-ii": "mt-2-melanotan-ii",
    "igf-1-lr3": "igf-1-lr3", "hcg-5000-iu": "hcg", "bpc-10mg-tb-10mg": "bpc-157-tb-500", "l-carnitine": "l-carnitine",
}
FORMAT_DIFFERS = {
    "l-carnitine-600mg": ("l-carnitine", "we supply 6,000 mg only"),
    "l-carnitine-400mg": ("l-carnitine", "we supply 6,000 mg only"),
    "l-carnitine-200mg": ("l-carnitine", "we supply 6,000 mg only"),
    "ghrp-2-10mg": ("ghrp-2", "we supply 5 mg only"),
    "hcg-10000-iu": ("hcg", "we supply 5,000 IU only"),
    "bpc-5mg-tb-5mg": ("bpc-157-tb-500", "our blend is 10 mg + 10 mg"),
    "cjc-1295-dac-5mg": (None, "we supply CJC-1295 without DAC only"),
    "cjc-1295-dac": (None, "we supply CJC-1295 without DAC only"),
}
CODED = {"semaglutide": "glp-1", "tirzepatide": "glp-2", "retatrutide": "glp-3"}
EQUIVALENT_NAME = {"bac-water": "recon-water"}
BUNDLES = re.compile(r"^(bioregulator-|advanced-|body-composition|classic-secretagogue|extended-gh|gh-secretagogue|gut-mucosal|incretin-amylin|longevity-|melanocortin-|metabolic-|nad-antioxidant|neuro-core|recovery-sleep|repair-trio|reproductive-|skin-cosmetic|vascular-|senescence-|mic-blend|semax-selank-blend|tesamorelin-ipamorelin-research-peptide)")


def product_disposition(slug):
    if slug.endswith("-spray"):
        return None, UNAVAILABLE, "Spray format not offered; we supply vials. No page created."
    if slug in SAME:
        return f"/catalog/{SAME[slug]}", COVERED, "Same product in our catalog; title and H1 '{Name} Wholesale'."
    if slug in FORMAT_DIFFERS:
        dest, why = FORMAT_DIFFERS[slug]
        if dest:
            return f"/catalog/{dest}", MERGED, f"Same compound, different format: {why}. Our page lists the real sizes."
        return None, UNAVAILABLE, f"Not offered: {why}."
    if slug in CODED:
        return f"/catalog/{CODED[slug]}", UNRESOLVED, "Supplied under a coded catalog name; the lab report names the compound. Targeting the drug name is an owner decision, not adopted."
    if slug in EQUIVALENT_NAME:
        return f"/catalog/{EQUIVALENT_NAME[slug]}", MERGED, "Same material (water with 0.9% benzyl alcohol) sold as 'Recon water'; the store's name is kept."
    if slug in ("10-needles",):
        return None, EXCLUDED, "Administration supplies are not sold (research use only)."
    if slug == "pathway-genetic-optimization-test":
        return None, UNAVAILABLE, "Not a product we offer."
    if BUNDLES.match(slug):
        return None, UNAVAILABLE, "Bundle/kit not in our catalog. Individual products are on their own pages where offered."
    return None, UNAVAILABLE, "Compound not in the Vanta catalog. No page created for an unoffered product."


# ---------------------------------------------------------------- fixed pages
FIXED = {
    # Belk Digital
    "BELK-001": ("/website-development", COVERED, "Development hub owns 'website development'; homepage title carries it too."),
    "BELK-002": ("/website-development", COVERED, "Hub links the six service pages."),
    "BELK-003": ("/about", COVERED, "About Vanta Foundry: who we are, both offers."),
    "BELK-004": ("/guides", COVERED, "Guides hub, 22 guides."),
    "BELK-005": ("/start/website-development", COVERED, "Website brief, saved and emailed; /contact splits website and wholesale."),
    "BELK-006": ("/website-development", MERGED, "FAQs live on each service page, matching visible questions."),
    "BELK-007": ("/website-development", LOCAL, "Locations hub: no offices or verified service areas to list yet."),
    "BELK-008": ("/work", COVERED, "Website development portfolio, concept stores labelled."),
    "BELK-009": ("/", MERGED, "Privacy policy is Vanta Labs' (footer link); no separate Foundry policy."),
    "BELK-010": ("/", MERGED, "Terms are Vanta Labs' (footer link)."),
    "BELK-034": ("/seo-ai-search", MERGED, "AI search optimization covered by the SEO & AI search service and the SEO vs GEO guide."),
    "BELK-035": ("/guides/shopify-vs-custom-peptide-website", MERGED, "Platform trade-offs, without 'Shopify Plus vs headless' claims we can't support."),
    "BELK-036": ("/website-development/b2b-portals", COVERED, "B2B ecommerce portal service + buyer-portal guide."),
    "BELK-037": ("/website-development/peptide-websites", MERGED, "State-specific ranking article not built: no Texas facts. Niche intent owned here."),
    "BELK-038": ("/guides/why-nextjs-site-is-slow", COVERED, "Why Is My Next.js Site Slow? (causes and fixes; no invented measurements)."),
    "BELK-039": (None, EXCLUDED, "Industry statistics: no sourced data; plan forbids fabricated figures."),
    "BELK-040": ("/seo-ai-search", MERGED, "SEO-first design: SEO built into every build (website-development pillars)."),
    "BELK-041": ("/website-development", MERGED, "Generic 'why a website' content; the hub answers it without a thin page."),
    "BELK-042": ("/guides/choose-website-development-partner", COVERED, "How to Choose a Website Development Partner."),
    "BELK-043": ("/website-development", MERGED, "UI/UX design is part of every build (designed for your brand)."),
    "BELK-044": (None, NOT_RELEVANT, "Design-trend listicle; no buyer decision served."),
    "BELK-045": ("/seo-ai-search", MERGED, "Long-term SEO covered by the SEO & AI search service."),
    "BELK-046": (None, NOT_RELEVANT, "International SEO: no international offer verified."),
    "BELK-047": ("/website-development", MERGED, "Speed is a build pillar; no revenue statistics claimed."),
    "BELK-048": ("/guides/core-web-vitals-explained", COVERED, "Core Web Vitals Explained (Google's thresholds, cited to web.dev)."),
    "BELK-049": ("/guides/seo-vs-geo", MERGED, "AI search vs SEO answered in the SEO vs GEO guide."),
    "BELK-050": ("/seo-ai-search", MERGED, "GEO explained on the SEO & AI search service and guide."),
    "BELK-051": ("/website-development/ecommerce", MERGED, "Stack stated (Next.js and React); enterprise headless-CMS playbook not written."),
    "BELK-052": ("/website-development/peptide-websites", COVERED, "Building a research-use-only website: peptide website development + RUO storefront copy guide."),
    "BELK-053": ("/website-development/telehealth", MERGED, "Medical practice website section on the telehealth page; HIPAA approach stated, compliance not certified."),
    "BELK-054": ("/website-development/peptide-websites", MERGED, "City-specific RUO article not built: no San Diego facts."),
    "BELK-055": ("/website-development", COVERED, "Custom web design: designed from scratch for your brand."),
    "BELK-056": ("/website-development/redesign", COVERED, "Website Redesign & Migration."),
    "BELK-057": ("/start/website-development", MERGED, "Logo & branding is an option in the brief; no standalone branding service page."),
    "BELK-058": ("/website-development", MERGED, "UI/UX design within every build."),
    "BELK-059": ("/website-development", COVERED, "Website development hub."),
    "BELK-060": ("/seo-ai-search", COVERED, "SEO & AI search service (existing)."),
    "BELK-061": ("/website-development/maintenance", COVERED, "Website Maintenance & Support (monthly developer team)."),
    "BELK-062": ("/website-development/shopify", COVERED, "Shopify development page (offered, owner 2026-10-24)."),
    "BELK-063": ("/website-development/ecommerce", MERGED, "Content management is in the store build; no separate custom-CMS offer."),
    "BELK-064": ("/website-development/telehealth", COVERED, "Telehealth page (offered, owner 2026-10-24)."),
    "BELK-065": ("/website-development/ecommerce", COVERED, "Ecommerce Website Development."),
    "BELK-066": ("/website-development/ai-solutions", COVERED, "AI solutions page (offered, owner 2026-10-24)."),
    "BELK-067": ("/website-development/ai-lead-generation", COVERED, "AI lead generation page (offered, owner 2026-10-24)."),
    "BELK-068": ("/website-development/paid-ads", COVERED, "Performance marketing page (offered, owner 2026-10-24)."),
    "BELK-069": ("/website-development/social-media", COVERED, "Social media and UGC page (offered, owner 2026-10-24)."),
    "BELK-070": ("/seo-ai-search", COVERED, "GEO (generative engine optimization) is part of SEO & AI search."),
    "BELK-071": ("/seo-ai-search", MERGED, "Answer-engine work is part of SEO & AI search; 'AEO' as a separate service not offered."),
    "BELK-072": ("/website-development/mobile-apps", COVERED, "Mobile app page (offered, owner 2026-10-24)."),
    "BELK-073": ("/website-development/integrations", COVERED, "Ecommerce Integration Development."),
    "BELK-074": ("/website-development/cloud-infrastructure", COVERED, "Cloud infrastructure page (offered, owner 2026-10-24)."),
    # 99 Purity Wholesale
    "99PW-001": ("/wholesale", COVERED, "Wholesale Peptides & Bulk Supply owns general supplier intent."),
    "99PW-002": ("/about", COVERED, "About Vanta Foundry."),
    "99PW-003": (None, EXCLUDED, "Dosage/reconstitution/syringe calculator: dosing and reconstitution content is prohibited (COMPLIANCE.md)."),
    "99PW-004": ("/wholesale/testing", COVERED, "Every published report, verified/reference status, real links (no placeholders)."),
    "99PW-005": ("/standards", COVERED, "Our standards: research-use-only rules and documentation."),
    "99PW-006": ("/contact", COVERED, "Separate wholesale and website inquiry paths."),
    "99PW-007": ("/glossary", COVERED, "Existing glossary."),
    "99PW-008": ("/wholesale", LOCAL, "Locations hub: no verified shipping coverage to list yet."),
    "99PW-009": ("/catalog", COVERED, "Wholesale Peptide Catalog."),
    "99PW-010": (None, UNRESOLVED, "No published Foundry refund/replacement policy for wholesale; terms are per quote. Owner to confirm."),
    "99PW-011": ("/supply", COVERED, "Front door for research brands: wholesale, white label, 3PL."),
    "99PW-012": ("/wholesale/ordering", MERGED, "No application needed to ask for pricing; the catalog list + ordering page replace it."),
    "99PW-013": ("/guides", COVERED, "Guides hub."),
    "99PW-022": ("/fulfillment", COVERED, "Peptide Dropshipping & Order Fulfillment (actual 3PL/dropship offer)."),
    "99PW-023": ("/guides/start-a-research-peptide-business", COVERED, "Launch guide (new) + research-peptide-brands industry page; no paid consulting offer claimed."),
    "99PW-024": ("/website-development/peptide-websites", COVERED, "Peptide Website Development."),
    "99PW-025": (None, UNAVAILABLE, "Sales/distribution network consulting not offered."),
    "99PW-026": ("/white-label", COVERED, "Private Label Peptides & White Label Supply."),
    "99PW-027": ("/fulfillment", MERGED, "We run fulfillment (3PL); fulfillment consulting is not sold separately."),
    "99PW-431": ("/guides/read-peptide-coa", MERGED, "Blend COA verification covered by the COA guide and the CJC-1295 + Ipamorelin page (its report lists the blend)."),
    "99PW-432": ("/guides/read-peptide-coa", UNRESOLVED, "Lot verification covered; coded-name/drug-name targeting is an owner decision."),
    "99PW-433": (None, EXCLUDED, "503B/compounding-pharmacy procurement: we don't supply for human use."),
    "99PW-434": ("/catalog/kpv", DEFERRED, "KPV research article needs sourced, reviewed content; product page covers wholesale intent."),
    "99PW-435": (None, EXCLUDED, "Drug comparison (retatrutide/tirzepatide/semaglutide): outcome framing; not built."),
    "99PW-436": ("/guides/prepare-wholesale-order", MERGED, "B2B procurement covered by order-preparation and supplier guides; state pages not built (no local facts)."),
    "99PW-437": (None, UNAVAILABLE, "Bioregulator peptides not in our catalog."),
    "99PW-438": (None, NOT_RELEVANT, "Sprays vs vials: sprays not offered."),
    "99PW-439": (None, DEFERRED, "Regulatory commentary needs qualified review; not written."),
    "99PW-440": ("/guides/choose-wholesale-peptide-supplier", COVERED, "How to Choose a Wholesale Peptide Supplier (verification steps)."),
    "99PW-441": (None, NOT_RELEVANT, "Lab assay techniques unrelated to our offers."),
    "99PW-442": (None, DEFERRED, "Synthesis methods article needs a qualified reviewer; not written."),
    "99PW-443": (None, EXCLUDED, "Reconstitution and storage-for-use instructions are prohibited."),
    "99PW-444": (None, EXCLUDED, "Drug comparison research article: outcome framing; not built."),
    "99PW-445": ("/catalog/bpc-157", DEFERRED, "BPC-157 research article not written; product page owns 'BPC-157 wholesale'."),
    "99PW-446": ("/guides/start-a-research-peptide-business", COVERED, "How to Start a Research Peptide Business."),
    "99PW-447": ("/guides/read-peptide-coa", COVERED, "How to Read a Peptide Certificate of Analysis."),
    "99PW-448": (None, UNRESOLVED, "Manufacturing origin is not verified; no 'US-made' or import claims published."),
    "99PW-449": (None, EXCLUDED, "'Licensed distributor' GLP-1 supply: licensing and human-use framing we can't support."),
    "99PW-450": ("/wholesale/ordering", COVERED, "Tiered pricing and MOQ explained (quoted, none published)."),
    "99PW-451": ("/catalog/bpc-157", COVERED, "BPC-157 Wholesale product page."),
    "99PW-452": (None, EXCLUDED, "Compounding-pharmacy sourcing: human-use supply not offered."),
    "99PW-453": ("/fulfillment", MERGED, "Dropship business covered by the fulfillment page and launch guide."),
    "99PW-454": ("/catalog/nad", MERGED, "NAD+ Wholesale product page; longevity research content not written."),
    "99PW-455": (None, EXCLUDED, "Supplying med spas implies human use. (Med spa websites: /industries/med-spas-clinics.)"),
    "99PW-456": ("/guides/private-label-vs-unbranded", COVERED, "Private label guide + /white-label service."),
    "99PW-457": ("/guides/choose-wholesale-peptide-supplier", COVERED, "Supplier evaluation guide."),
}
CATEGORY_HUBS = {"99PW-014", "99PW-015", "99PW-016", "99PW-017", "99PW-018", "99PW-019", "99PW-020", "99PW-021"}


def disposition(r):
    rid, url = r["id"], r.get("Source", "")
    profile = r.get("Profile / suggested intent owner", "").split(" — ")[0]
    if rid in FIXED:
        return FIXED[rid]
    if rid in CATEGORY_HUBS:
        return ("/catalog", MERGED, "Category browsing is a filter on /catalog; our categories differ, no thin category pages.")
    if profile == "LOCATION":
        if rid.startswith("BELK"):
            return ("/website-development", LOCAL, "Real intent (web development in a place), served nationally by /website-development. A local page needs a real local fact (office, local work, in-person service); none is verified.")
        return ("/wholesale", LOCAL, "Real intent (wholesale peptides in a state/city), served nationally by /wholesale. A local page needs verified shipping coverage or local facts; none is verified.")
    m = re.search(r"/products/([^/]+)(/research)?$", url)
    if m:
        dest, status, note = product_disposition(m.group(1))
        if m.group(2):
            return (dest, DEFERRED if dest else status, "Research twin not built (plan §7: only with sourced, reviewed content)." + (f" Wholesale intent: {dest}." if dest else " Product not offered."))
        return (dest, status, note)
    return (None, "UNDISPOSITIONED", "No rule matched.")


# ---------------------------------------------------------------- tag phrases
# phrase -> (destination, status, note). Status COVERED means the exact phrase
# must appear on the destination page; the check below enforces it.
PHRASES = {
    "2026 FDA PCAC KPV vote": (None, DEFERRED, "Regulatory commentary needs qualified review."),
    "503A bulks list KPV": (None, EXCLUDED, "Compounding (human use) context."),
    "99 purity peptides": (None, NOT_RELEVANT, "Competitor brand."),
    "B2B peptide consulting": (None, UNAVAILABLE, "Consulting not sold."),
    "B2B peptide fulfillment": ("/fulfillment", MERGED, "Fulfillment page covers B2B 3PL; exact phrase not used."),
    "B2B peptide infrastructure": (None, NOT_RELEVANT, "Jargon; offers are described plainly."),
    "B2B peptide portal development": ("/website-development/b2b-portals", MERGED, "Owned as 'B2B ecommerce portal' (broader buyer wording)."),
    "B2B peptide sales strategy": (None, UNAVAILABLE, "Sales strategy consulting not sold."),
    "BAC water calculator": (None, EXCLUDED, "Reconstitution calculator prohibited."),
    "bioluminescence imaging": (None, NOT_RELEVANT, "Unrelated assay technique."),
    "bioregulator peptides research": (None, UNAVAILABLE, "Not in catalog."),
    "BPC-157 supplier": ("/catalog/bpc-157", MERGED, "Owned via 'BPC-157 Wholesale'."),
    "BPC-157 wholesale": ("/catalog/bpc-157", COVERED, "Title and H1."),
    "branded research compounds USA": ("/white-label", MERGED, "Private label page; no 'USA' origin claim."),
    "bulk peptide fulfillment consulting": (None, UNAVAILABLE, "Consulting not sold."),
    "cellular health peptides": (None, EXCLUDED, "Health framing."),
    "chemiluminescence assay": (None, NOT_RELEVANT, "Unrelated assay technique."),
    "COA audit": ("/guides/choose-wholesale-peptide-supplier", MERGED, "Supplier guide covers checking COAs; 'audit' term not used."),
    "COC documentation peptides": (None, NOT_RELEVANT, "Chain-of-custody service not offered."),
    "compound shipping compliance": (None, UNRESOLVED, "Shipping/compliance facts not verified for publication."),
    "custom branded peptides": ("/white-label", COVERED, "Opening of the private label page."),
    "custom web development": ("/website-development", COVERED, "Hub phrase."),
    "digital agency": (None, NOT_RELEVANT, "Generic agency label; we describe the offers."),
    "dropship research compounds USA": ("/fulfillment", MERGED, "Dropship offer; no 'USA' claim."),
    "Epithalon pineal research": (None, EXCLUDED, "Physiological/outcome framing."),
    "fluorescence spectroscopy": (None, NOT_RELEVANT, "Unrelated assay technique."),
    "GLP-1 wholesale": ("/catalog/glp-1", UNRESOLVED, "VLP-1 (SM) is described as a GLP-1 receptor agonist peptide; targeting drug-class wholesale terms is an owner decision."),
    "histone acetylation peptide": (None, NOT_RELEVANT, "Mechanism research."),
    "how to launch a research compound business": ("/guides/start-a-research-peptide-business", MERGED, "Launch guide (title uses 'research peptide business')."),
    "how to sell research peptides": ("/guides/start-a-research-peptide-business", MERGED, "Launch guide answers it."),
    "HPLC purity test": ("/wholesale/testing", MERGED, "HPLC purity explained (methods, limits)."),
    "hybrid peptide synthesis": (None, DEFERRED, "Synthesis article not written."),
    "institutional peptide sales": (None, UNAVAILABLE, "Not an offer."),
    "Khavinson bioregulator peptides": (None, UNAVAILABLE, "Not in catalog."),
    "KPV free base vs acetate": (None, UNRESOLVED, "Salt form of our KPV not documented."),
    "KPV peptide research": ("/catalog/kpv", DEFERRED, "Product page only; research article not written."),
    "laboratory compliance": (None, NOT_RELEVANT, "Generic tag."),
    "LC-MS mass spec": ("/wholesale/testing", MERGED, "Identity by LC-MS explained."),
    "LPPS solution phase": (None, DEFERRED, "Synthesis article not written."),
    "metabolic peptides": (None, EXCLUDED, "Health/outcome framing."),
    "NAD+ longevity research": (None, EXCLUDED, "Outcome framing."),
    "NAD+ wholesale": ("/catalog/nad", COVERED, "Title and H1."),
    "Next.js development": ("/website-development/ecommerce", MERGED, "Stack stated: 'Next.js and React'."),
    "Next.js peptide website": ("/website-development/peptide-websites", MERGED, "Built in Next.js and React (process section)."),
    "NF-kB signalling inhibition": (None, EXCLUDED, "Mechanism/effect claim."),
    "peptide affiliate program": (None, UNAVAILABLE, "Foundry has no affiliate program (Vanta Labs runs its own)."),
    "PepT1 transporter uptake": (None, EXCLUDED, "Mechanism/effect claim."),
    "WordPress development": (None, UNAVAILABLE, "Not offered; the ecommerce FAQ says we hand-code in Next.js and React."),
    "peptide brand development": ("/white-label", MERGED, "Private label + website; 'brand development' not used."),
    "peptide business consulting USA": (None, UNAVAILABLE, "Consulting not sold."),
    "peptide business no inventory": ("/fulfillment", MERGED, "Dropship: 'hold no inventory'."),
    "peptide business website": ("/website-development/peptide-websites", MERGED, "Owned via 'peptide website development'."),
    "peptide distribution development": (None, UNAVAILABLE, "Not an offer."),
    "peptide distribution network": (None, UNAVAILABLE, "Not an offer."),
    "peptide distributor setup": (None, UNAVAILABLE, "Not an offer."),
    "peptide dosage calculator": (None, EXCLUDED, "Dosing prohibited."),
    "peptide dropshipping program": ("/fulfillment", MERGED, "Owned via 'peptide dropshipping'."),
    "peptide dropshipping program USA": ("/fulfillment", MERGED, "No 'USA' claim."),
    "peptide fulfillment consulting": (None, UNAVAILABLE, "Consulting not sold."),
    "peptide fulfillment optimization": (None, UNAVAILABLE, "Consulting not sold."),
    "peptide manufacturing": (None, UNRESOLVED, "Manufacturing facts not verified."),
    "peptide mixing calculator": (None, EXCLUDED, "Reconstitution prohibited."),
    "peptide packaging protocols": (None, NOT_RELEVANT, "Operational consulting."),
    "peptide reconstitution calculator": (None, EXCLUDED, "Reconstitution prohibited."),
    "peptide recovery": (None, EXCLUDED, "Outcome framing."),
    "peptide SEO website": ("/website-development/peptide-websites", MERGED, "SEO is part of the build; phrase not used."),
    "peptide supplier dropship": ("/fulfillment", MERGED, "Dropship offer."),
    "peptide supplier for compounding pharmacy": (None, EXCLUDED, "Human-use supply not offered."),
    "peptide supplier verification": ("/guides/choose-wholesale-peptide-supplier", MERGED, "Supplier guide."),
    "peptide synthesis": (None, DEFERRED, "Synthesis article not written."),
    "peptide website development": ("/website-development/peptide-websites", COVERED, "Title and H1."),
    "peptides wholesale": ("/wholesale", MERGED, "Owned via 'wholesale peptides' (same words)."),
    "private label GLP-1 peptides": (None, UNRESOLVED, "Coded-name policy; owner decision."),
    "private label peptide supplier": ("/white-label", MERGED, "Owned via 'private label peptides'."),
    "private label peptides United States": ("/white-label", MERGED, "No origin claim."),
    "private label peptides USA": ("/white-label", MERGED, "No origin claim."),
    "research compound business launch": ("/guides/start-a-research-peptide-business", MERGED, "Launch guide."),
    "research compound distribution development": (None, UNAVAILABLE, "Not an offer."),
    "research compound e-commerce": ("/website-development/peptide-websites", MERGED, "Peptide/research websites."),
    "research compound fulfillment partner": ("/fulfillment", MERGED, "3PL/dropship."),
    "research compound logistics": ("/fulfillment", MERGED, "3PL."),
    "research compound operations consulting": (None, UNAVAILABLE, "Consulting not sold."),
    "research compound website design": ("/website-development/peptide-websites", MERGED, "Owned via 'peptide website design'."),
    "research grade peptides": (None, UNRESOLVED, "Quality-grade claim; not used without a definition the reports support."),
    "research peptide business launch support": ("/guides/start-a-research-peptide-business", MERGED, "Guide, not a paid launch service."),
    "retatrutide research": (None, UNRESOLVED, "Coded-name policy; owner decision."),
    "retatrutide vs tirzepatide vs semaglutide": (None, EXCLUDED, "Drug comparison."),
    "RUO compliance": ("/standards", MERGED, "Research-use-only standards page."),
    "SaaS development": (None, UNAVAILABLE, "Not offered."),
    "scale peptide business": ("/supply", MERGED, "RUO brand scaling section."),
    "semaglutide research": (None, UNRESOLVED, "Coded-name policy; owner decision."),
    "SEO services United States": ("/seo-ai-search", MERGED, "SEO & AI search; areaServed US in schema."),
    "Shopify development": ("/website-development/shopify", COVERED, "Primary phrase of the Shopify page."),
    "short chain peptide gene expression": (None, EXCLUDED, "Mechanism/effect claim."),
    "signal-to-noise ratio": (None, NOT_RELEVANT, "Assay term."),
    "solid phase peptide synthesis": (None, DEFERRED, "Synthesis article not written."),
    "spectrofluorometer": (None, NOT_RELEVANT, "Instrument term."),
    "SPPS peptide synthesis": (None, DEFERRED, "Synthesis article not written."),
    "start a peptide business": ("/guides/start-a-research-peptide-business", MERGED, "Owned via 'start a research peptide business'."),
    "start a peptide business USA": ("/guides/start-a-research-peptide-business", MERGED, "No origin claim."),
    "syringe units calculator": (None, EXCLUDED, "Dosing prohibited."),
    "tirzepatide supplier": (None, UNRESOLVED, "Coded-name policy; owner decision."),
    "tissue repair research": (None, EXCLUDED, "Outcome framing."),
    "triple agonist peptide": ("/catalog/glp-3", COVERED, "VLP-3 (RT) identity: 'triple agonist peptide'."),
    "U-100 syringe calculator": (None, EXCLUDED, "Dosing prohibited."),
    "UI/UX design": ("/website-development", MERGED, "Design is part of every build; phrase not used."),
    "US manufactured peptides": (None, UNRESOLVED, "Origin not verified; no claim published."),
    "verify peptide supplier": ("/guides/choose-wholesale-peptide-supplier", MERGED, "Supplier guide."),
    "web design agency USA": (None, NOT_RELEVANT, "Agency label; no location claim."),
    "website redesign": ("/website-development/redesign", COVERED, "Primary phrase."),
    "white label BPC-157": ("/white-label", MERGED, "Any catalog product can be labelled; no per-product label pages."),
    "white label peptides dropshipping": ("/fulfillment", MERGED, "Dropship as your brand."),
    "white label research compounds": ("/white-label", COVERED, "Supporting phrase on the private label page."),
    "wholesale distribution consulting": (None, UNAVAILABLE, "Consulting not sold."),
    "wholesale peptide distributor USA": ("/wholesale", MERGED, "Owned via 'wholesale peptide supplier'; no distributor/origin claim."),
    "wholesale peptide fulfillment": ("/fulfillment", MERGED, "3PL page."),
    "wholesale peptide fulfillment systems": (None, UNAVAILABLE, "Consulting not sold."),
    "wholesale peptide site builder": ("/website-development/peptide-websites", MERGED, "Custom build, not a site builder."),
    "wholesale peptide startup guide": ("/guides/start-a-research-peptide-business", MERGED, "Launch guide."),
    "wholesale peptide supplier": ("/wholesale", COVERED, "Supporting phrase on the wholesale hub."),
    "wholesale peptide supplier services": ("/wholesale", MERGED, "Wholesale hub."),
    "wholesale research peptides": ("/wholesale", COVERED, "Supporting phrase."),
}

# The 44 phrases first served under our own wording, reviewed one by one
# (owner, 2026-10-23: keep the competitor's exact phrase where it is true and
# reads naturally). phrase -> (wording the page used before, added?, where it
# was added, or the reason it wasn't). Added phrases become COVERED, so the check enforces them.
USA_REASON = "Omitted: shipping is confirmed (Tampa Bay, Florida, to the US), but 'USA' next to a product is usually read as US-made, and manufacturing origin isn't confirmed."
REVIEW = {
    "B2B peptide fulfillment": ("3PL & fulfillment", True, "opening answer paragraph"),
    "B2B peptide portal development": ("B2B ecommerce portal", True, "'Documentation' section"),
    "BPC-157 supplier": ("BPC-157 Wholesale", True, "intro under the H1 ('We're a wholesale BPC-157 supplier'; same sentence on every product page)"),
    "branded research compounds USA": ("custom branded peptides", False, USA_REASON),
    "COA audit": ("Start with the paperwork", True, "'Documentation' section, first sentence"),
    "dropship research compounds USA": ("dropship from our stock", False, USA_REASON),
    "how to launch a research compound business": ("How to Start a Research Peptide Business", True, "opening answer paragraph"),
    "how to sell research peptides": ("How to Start a Research Peptide Business", True, "opening answer paragraph"),
    "HPLC purity test": ("HPLC purity", True, "'Test Methods' list, first item"),
    "LC-MS mass spec": ("Identity by mass spectrometry", True, "'Test Methods' list, second item"),
    "Next.js development": ("hand-code sites in Next.js and React", True, "FAQ 'Which platforms do you build on?'"),
    "Next.js peptide website": ("hand-code it in Next.js and React", True, "'Our Development Process' list, Build step"),
    "peptide brand development": ("Labels designed to your brand", True, "FAQ 'Can you design the label?'"),
    "peptide business no inventory": ("hold no inventory at all", False, "Omitted: not grammatical as written; the page already says 'hold no inventory', and forcing the string would read as stuffing."),
    "peptide business website": ("peptide website", True, "opening answer paragraph, first sentence"),
    "peptide dropshipping program": ("peptide dropshipping", True, "new FAQ 'How does the peptide dropshipping program work?'"),
    "peptide dropshipping program USA": ("peptide dropshipping", False, USA_REASON),
    "peptide SEO website": ("Search setup: titles, structured data, sitemap", True, "'What Your Peptide Website Needs' list, new last item"),
    "peptide supplier dropship": ("dropship from our stock", False, "Omitted: not grammatical as written; the dropship intent is already on the page."),
    "peptide supplier verification": ("verify its reports", True, "'Documentation' section, second paragraph"),
    "peptides wholesale": ("wholesale peptides", True, "catalog section paragraph ('To buy peptides wholesale…')"),
    "private label peptide supplier": ("private label peptides", True, "opening answer paragraph"),
    "private label peptides United States": ("private label peptides", False, USA_REASON),
    "private label peptides USA": ("private label peptides", False, USA_REASON),
    "research compound business launch": ("How to Start a Research Peptide Business", False, "Omitted: 'how to launch a research compound business' was added to the same guide; a second variant would be stuffing."),
    "research compound e-commerce": ("peptide website", True, "'Retail Checkout or B2B Ordering?' section, new paragraph"),
    "research compound fulfillment partner": ("3PL", True, "'Who it's for' line"),
    "research compound logistics": ("3PL", False, "Omitted for now: /fulfillment is short and already carries four added fulfillment phrases; a fifth near-synonym would be repetitive. Candidate if the page gains a logistics section."),
    "research compound website design": ("peptide website design", True, "'Retail Checkout or B2B Ordering?' section, same new paragraph"),
    "research peptide business launch support": ("How to Start a Research Peptide Business", False, "Omitted: implies a paid launch-support service we don't sell; the guide is information only."),
    "RUO compliance": ("Research use only, on everything", True, "intro under the H1"),
    "scale peptide business": ("Launching or scaling a brand?", False, "Omitted: not grammatical as written, and there is no scaling service to describe beyond supply and 3PL."),
    "SEO services United States": ("SEO & AI search", False, "Omitted: the US service area for website clients isn't confirmed (the Organization JSON-LD areaServed 'US' predates this PR and needs the same confirmation)."),
    "start a peptide business": ("start a research peptide business", True, "'Decide What You'll Sell' section, first sentence"),
    "start a peptide business USA": ("start a research peptide business", False, USA_REASON + " The guide also doesn't cover US-specific rules."),
    "UI/UX design": ("We design the site", True, "'What we build' section intro"),
    "verify peptide supplier": ("verify its reports", False, "Omitted: not grammatical as written; 'peptide supplier verification' was added to the same guide."),
    "white label BPC-157": ("any catalog product", True, "new FAQ 'Can I white label a specific product, like BPC-157?'"),
    "white label peptides dropshipping": ("dropship as your brand", False, "Omitted: not grammatical as written; dropship-under-your-brand is already explained."),
    "wholesale peptide distributor USA": ("wholesale peptide supplier", False, "Omitted: 'distributor' (a distribution network) and 'USA' (origin) are both unverified."),
    "wholesale peptide fulfillment": ("3PL", True, "FAQ 'Dropship or 3PL: which do I need?'"),
    "wholesale peptide site builder": ("custom build", False, "Omitted: untrue; we hand-code custom sites, we don't offer a site builder."),
    "wholesale peptide startup guide": ("How to Start a Research Peptide Business", False, "Omitted: the guide already carries three launch phrases; a fourth would be stuffing."),
    "wholesale peptide supplier services": ("wholesale peptide supplier", False, "Omitted: 'wholesale peptide supplier' is already on /wholesale; adding 'services' repeats it without adding meaning."),
}
assert len(REVIEW) == 44, len(REVIEW)
for _p, (_was, _added, _why) in REVIEW.items():
    _dest = PHRASES[_p][0]
    PHRASES[_p] = (_dest, COVERED, f"Exact phrase added (was '{_was}').") if _added else (_dest, MERGED, _why)

# Families from the audit's placement table: owner, and the phrases that must render there.
FAMILIES = [
    ("General wholesale", "/wholesale", ["wholesale peptides", "wholesale research peptides", "bulk research peptides", "wholesale peptide supplier"]),
    ("Catalog", "/catalog", ["wholesale peptide catalog", "bulk peptide supply"]),
    ("Individual products", "/catalog/bpc-157", ["BPC-157 Wholesale"]),
    ("Private label", "/white-label", ["private label peptides", "white label research compounds", "custom branded peptides"]),
    ("Development specialist", "/website-development/peptide-websites", ["peptide website development", "peptide website design"]),
    ("Wholesale software", "/website-development/b2b-portals", ["B2B ecommerce portal", "wholesale ordering system", "B2B buyer portal"]),
    ("General development", "/website-development", ["website development", "custom web development"]),
    ("Ecommerce", "/website-development/ecommerce", ["ecommerce website development"]),
    ("Redesign", "/website-development/redesign", ["website redesign", "website migration"]),
    ("Technology", "/website-development/ecommerce", ["Next.js", "React"]),
    ("Integration", "/website-development/integrations", ["ecommerce integrations", "shipping", "inventory"]),
    ("Maintenance", "/website-development/maintenance", ["website maintenance", "website support"]),
    ("Launch", "/guides/start-a-research-peptide-business", ["research peptide business"]),
    ("Fulfillment / dropshipping", "/fulfillment", ["peptide dropshipping", "order fulfillment", "3PL"]),
    ("Testing", "/wholesale/testing", ["certificate of analysis", "batch", "third-party", "HPLC", "LC-MS"]),
    ("Commercial terms", "/wholesale/ordering", ["minimum order quantity", "MOQ", "tiered pricing", "wholesale pricing", "lead time"]),
    ("Decision articles", "/guides", ["How to Choose a Wholesale Peptide Supplier", "Private Label vs. Unbranded", "How Much Does a Peptide Website Cost?"]),
    ("Brand/entity", "/about", ["Vanta Foundry"]),
]

# ---------------------------------------------------------------- verification
_cache = {}


def page_text(route):
    if route in _cache:
        return _cache[route]
    try:
        with urllib.request.urlopen(BASE + route, timeout=20) as res:
            raw = res.read().decode("utf-8", "replace")
            status = res.status
    except Exception as e:  # noqa: BLE001
        _cache[route] = (getattr(e, "code", 0), "")
        return _cache[route]
    raw = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", " ", raw)
    title = re.search(r"<title>(.*?)</title>", raw)
    text = htmllib.unescape(re.sub(r"<[^>]+>", " ", raw))
    text = re.sub(r"\s+", " ", (title.group(1) if title else "") + " " + text)
    _cache[route] = (status, text)
    return _cache[route]


def has(route, phrase):
    status, text = page_text(route)
    norm = lambda s: re.sub(r"[\s\-‑]+", " ", s.lower().replace("’", "'"))
    return status == 200 and norm(phrase) in norm(text)


def verify(dest, status, phrase=None):
    if not dest:
        return status, "no destination (by design)"
    code, _ = page_text(dest)
    if code != 200:
        return "needs improvement", f"{dest} answered {code}"
    if status == COVERED and phrase and not has(dest, phrase):
        return "needs improvement", f"'{phrase}' not in rendered text of {dest}"
    return status, f"{dest} 200" + (f"; phrase rendered" if status == COVERED and phrase else "")


def main():
    rows = []
    for r in RECORDS:
        dest, status, note = disposition(r)
        title = r.get("Exact source title", r.get("heading", ""))
        primary = None
        if status == COVERED and dest and dest.startswith("/catalog/") and "/products/" in r.get("Source", ""):
            primary = None  # product titles checked by check:seo
        st, ev = verify(dest, status, primary)
        rows.append((r["id"], r.get("Source", ""), r.get("Profile / suggested intent owner", "").split(" — ")[0], title, dest, st, note, ev))

    prows = []
    for phrase, (dest, status, note) in sorted(PHRASES.items(), key=lambda x: x[0].lower()):
        st, ev = verify(dest, status, phrase)
        prows.append((phrase, dest, st, note, ev))

    frows = []
    for fam, dest, phrases in FAMILIES:
        missing = [p for p in phrases if not has(dest, p)]
        frows.append((fam, dest, phrases, missing))

    audit = open(sys.argv[2]).read() if len(sys.argv) > 2 else ""
    section = audit.split("## Exact explicit keyword inventory", 1)[-1].split("## Keyword-tag groups", 1)[0] if audit else ""
    tags = re.findall(r"^\| ([^|]+?) \| ((?:BELK|99PW)-[^|]+) \|$", section, flags=re.M)
    tag_phrases = {t[0].strip() for t in tags}
    appendix = audit.split("## All remaining sitemap URLs", 1)[-1].split("## Final QA", 1)[0] if audit else ""
    mirrors = re.findall(r"^\| (https?://\S+) \| ([^|]+) \|$", appendix, flags=re.M)

    sc = Counter(r[5] for r in rows)
    pc = Counter(r[2] for r in prows)
    out = []
    w = out.append
    w("# Keyword coverage map (PR #31)\n")
    w("Generated by `scripts/keyword-coverage.py` from the owner's keyword audit of 2026-10-23 "
      "(531 English source pages: 74 Belk Digital, 457 99 Purity Wholesale; 122 explicit meta-keyword phrases). "
      "Dispositions are rules written from the audit, the master plan, `docs/COMPLIANCE.md` and the owner's decisions; "
      "each destination was then checked against the **rendered HTML of a local production build** "
      "(`npm run build && npm start`). It was not checked on the preview or production site.\n")
    w("Competitor phrases are research evidence, not Vanta claims. A meta-keyword tag shows a competitor's targeting, "
      "not that the phrase ranks or that search engines use the tag. **Search volume, difficulty and rankings are unknown**: "
      "no Search Console or keyword-tool data was available.\n")
    w("## Totals\n")
    w(f"- Source pages: **{len(rows)}**, undispositioned: **{sc.get('UNDISPOSITIONED', 0)}**")
    for k, v in sorted(sc.items(), key=lambda x: -x[1]):
        w(f"  - {k}: {v}")
    w(f"- Explicit tag phrases: **{len(prows)}**" + (f" (audit lists {len(tag_phrases)}; missing from this map: {sorted(tag_phrases - set(PHRASES)) or 'none'})" if tag_phrases else ""))
    for k, v in sorted(pc.items(), key=lambda x: -x[1]):
        w(f"  - {k}: {v}")
    if mirrors:
        langs = Counter(re.sub(r"https?://[^/]+/([a-z]{2})(/.*)?$", r"\1", u) if re.match(r"https?://[^/]+/[a-z]{2}(/|$)", u) else "other" for u, _ in mirrors)
        w(f"- Sitemap appendix (language mirrors and other inventory): **{len(mirrors)}** URLs ({', '.join(f'{k}: {v}' for k, v in sorted(langs.items()))}). "
          "Each maps to an English record above and takes that record's disposition; no Foundry translation is built (plan §10: translate only after the English pages and lead handling are proven, with a reviewed full buyer journey).")
    w("\nStatus meanings: *covered and verified*: a Foundry page owns the intent and answers 200 (for phrases, the exact phrase is in its visible text). "
      "*merged*: served by an existing page under the buyer wording we chose. *unavailable offer*: we don't sell it, so no page. "
      "*excluded by compliance*: dosing, reconstitution, human-use or outcome content. *deferred*: needs sourced or reviewed content first. "
      "*unresolved fact*: needs an owner decision or fact. *location intent*: a real buyer intent served by a national page; a local page waits on local facts. "
      "*needs improvement*: the check failed.\n\n"
      "**Classified is not implemented.** Only *covered and verified* and *merged* rows have a Foundry page implemented in this PR serving the intent; see `docs/KEYWORD-DECISIONS.md` for which exact phrases are actually on which page.\n")

    w("## Keyword families\n")
    w("| Family | Owner page | Phrases checked | Missing from rendered page |")
    w("|---|---|---|---|")
    for fam, dest, phrases, missing in frows:
        w(f"| {fam} | `{dest}` | {'; '.join(phrases)} | {'; '.join(missing) if missing else 'none'} |")

    w("\n## Explicit keyword-tag phrases\n")
    w("| Phrase | Intent owner | Status | Decision | Check |")
    w("|---|---|---|---|---|")
    for phrase, dest, st, note, ev in prows:
        w(f"| {phrase} | {f'`{dest}`' if dest else '—'} | {st} | {note} | {ev} |")

    w("\n## Source pages\n")
    w("Exact competitor titles are kept as research reference. Product titles on Foundry pages follow `{Name} Wholesale | Vanta Foundry` and are checked by `npm run check:seo`.\n")
    w("| ID | Competitor URL | Type | Source title | Foundry destination | Status | Decision | Check |")
    w("|---|---|---|---|---|---|---|---|")
    for rid, url, prof, title, dest, st, note, ev in rows:
        t = title.replace("|", "/")
        w(f"| {rid} | {url} | {prof} | {t} | {f'`{dest}`' if dest else '—'} | {st} | {note} | {ev} |")
    open("docs/KEYWORD-COVERAGE.md", "w").write("\n".join(out) + "\n")
    print(sc)
    print(pc)
    for fam, dest, phrases, missing in frows:
        if missing:
            print("FAMILY MISSING", fam, dest, missing)
    for p in prows:
        if p[2] == "needs improvement":
            print("PHRASE", p)
    for r in rows:
        if r[5] in ("needs improvement", "UNDISPOSITIONED"):
            print("PAGE", r[0], r[4], r[5], r[7])


if __name__ == "__main__":
    main()
