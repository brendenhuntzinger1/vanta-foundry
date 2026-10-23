"""Build docs/KEYWORD-DECISIONS.md: what is implemented (phrase by phrase, with
its placement on the rendered page), what is only classified, the deferred
list, the owner decisions, the not-relevant recheck and the URL map.

    npm run build && npm start
    python3 scripts/keyword-decisions.py

Reads the rules in scripts/keyword-coverage.py and the audit records in
docs/research/. Placement comes from parsing each page's rendered HTML:
<title>, <h1>, <h2>/<h3>, FAQ (<summary> questions and their answers),
body text, and the text of internal links pointing at the page.
"""
import importlib.util
import json
import re
import sys
import urllib.request
from collections import Counter, defaultdict
from html.parser import HTMLParser

sys.argv = [sys.argv[0], "docs/research/keyword-audit-records.json"]
spec = importlib.util.spec_from_file_location("kc", "scripts/keyword-coverage.py")
kc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(kc)

BASE = "http://localhost:3000"
TAGS = json.load(open("docs/research/keyword-tag-groups.json"))
REG = json.loads(open("docs/research/seo-registry.json").read())  # written by the npm script below
CATALOG = REG["catalog"]


class Placements(HTMLParser):
    """Splits a page's visible text by where it sits."""

    def __init__(self):
        super().__init__()
        self.stack = []
        self.parts = defaultdict(list)
        self.links = []  # (href, text)
        self._a = None

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg"):
            self.stack.append("skip")
            return
        self.stack.append(tag)
        if tag == "a":
            self._a = [dict(attrs).get("href", ""), ""]

    def handle_endtag(self, tag):
        if tag == "a" and self._a:
            self.links.append((self._a[0], re.sub(r"\s+", " ", self._a[1]).strip()))
            self._a = None
        while self.stack:
            if self.stack.pop() in (tag, "skip") and True:
                break

    def handle_data(self, data):
        if "skip" in self.stack:
            return
        s = data.strip()
        if not s:
            return
        if self._a is not None:
            self._a[1] += " " + s
        if "title" in self.stack:
            where = "title"
        elif "h1" in self.stack:
            where = "H1"
        elif "summary" in self.stack:
            where = "FAQ question"
        elif "details" in self.stack:
            where = "FAQ answer"
        elif "h2" in self.stack or "h3" in self.stack:
            where = "heading"
        else:
            where = "body"
        self.parts[where].append(s)


_pages = {}


def page(route):
    if route not in _pages:
        try:
            raw = urllib.request.urlopen(BASE + route, timeout=20).read().decode("utf-8", "replace")
        except Exception:  # noqa: BLE001
            raw = ""
        p = Placements()
        p.feed(raw)
        _pages[route] = p
    return _pages[route]


norm = lambda s: re.sub(r"[\s\-‑]+", " ", s.lower().replace("’", "'").replace("&amp;", "&"))


def placements(route, phrase):
    p = page(route)
    found = [w for w in ("title", "H1", "heading", "FAQ question", "FAQ answer", "body") if norm(phrase) in norm(" ".join(p.parts.get(w, [])))]
    return found


ALL_ROUTES = []


def anchors_to(route, phrase):
    """Internal links elsewhere on the site whose text contains the phrase and point at route."""
    hits = set()
    for r in ALL_ROUTES:
        for href, text in page(r).links:
            if href.split("#")[0].rstrip("/") == route.rstrip("/") and norm(phrase) in norm(text) and r != route:
                hits.add(r)
    return sorted(hits)


def main():
    global ALL_ROUTES
    sm = urllib.request.urlopen(BASE + "/sitemap.xml").read().decode()
    ALL_ROUTES = [re.sub(r"^https?://[^/]+", "", u) or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sm)]

    rows = []
    for r in kc.RECORDS:
        dest, status, note = kc.disposition(r)
        st, ev = kc.verify(dest, status)
        rows.append(dict(r=r, dest=dest, status=st, note=note))
    by_status = Counter(x["status"] for x in rows)
    implemented_pages = [x for x in rows if x["status"] in (kc.COVERED, kc.MERGED)]

    # ---- phrases per Foundry URL: registry phrases + tag phrases mapped there + product names
    want = defaultdict(set)
    for pg in REG["pages"]:
        want[pg["route"]].add(pg["primaryPhrase"])
        for ph in pg["phrases"]:
            want[pg["route"]].add(ph)
    for c in CATALOG:
        want[f"/catalog/{c['slug']}"].add(f"{c['name']} Wholesale")
    tag_rows = []
    for phrase, (dest, status, note) in sorted(kc.PHRASES.items(), key=lambda x: x[0].lower()):
        where = placements(dest, phrase) if dest else []
        if dest and status in (kc.COVERED, kc.MERGED):
            want[dest].add(phrase) if where else None
        tag_rows.append(dict(phrase=phrase, dest=dest, status=status, note=note, where=where))

    impl = []
    for route in sorted(want):
        seen = {}
        for ph in sorted(want[route]):
            seen.setdefault(ph.lower(), ph)
        for phrase in sorted(seen.values(), key=str.lower):
            where = placements(route, phrase)
            anc = anchors_to(route, phrase)
            impl.append(dict(route=route, phrase=phrase, where=where, anchors=anc))

    tag_impl = [t for t in tag_rows if t["where"]]
    tag_intent_only = [t for t in tag_rows if t["status"] in (kc.COVERED, kc.MERGED) and not t["where"]]

    out = []
    w = out.append
    w("# Keyword decisions, implementation and URL map (PR #31)\n")
    w("Generated by `scripts/keyword-decisions.py` against a **local production build** (`npm run build && npm start`) on 2026-10-23. "
      "Placements come from each page's rendered HTML. Nothing here is measured search demand, ranking or indexing: none of that data was available.\n")

    w("## Classified vs implemented\n")
    w("| | Count | Meaning |")
    w("|---|---|---|")
    w(f"| Source pages classified | {len(rows)} | Every audit page has a decision (0 without one) |")
    w(f"| …implemented (a live Foundry page serves the intent) | {len(implemented_pages)} | covered {by_status[kc.COVERED]} + merged {by_status[kc.MERGED]} |")
    for s in (kc.LOCAL, kc.DEFERRED, kc.UNRESOLVED, kc.UNAVAILABLE, kc.EXCLUDED, kc.NOT_RELEVANT):
        w(f"| …{s} | {by_status[s]} | classified only, not coverage |")
    w(f"| Tag phrases classified | {len(tag_rows)} | all 122 audit meta-keyword phrases |")
    w(f"| …exact phrase rendered on its Foundry page | {len(tag_impl)} | see placements below |")
    w(f"| …intent served, exact phrase not used | {len(tag_intent_only)} | merged under our own buyer wording |")
    w(f"| …not implemented (unavailable, excluded, deferred, decision, not relevant) | {len(tag_rows) - len(tag_impl) - len(tag_intent_only)} | |")
    w("")

    # ---- deferred
    deferred = [x for x in rows if x["status"] == kc.DEFERRED]
    w(f"## Deferred competitor pages ({len(deferred)})\n")
    w("None can be finished today without inventing facts. Research articles need a literature source list, a qualified reviewer "
      "and a compliance review (COMPLIANCE.md forbids outcome and usage framing); the three website-development guides that "
      "could be written today from public primary sources were written instead (BELK-038, BELK-042, BELK-048, now covered).\n")
    w("| ID | Competitor page | Target keywords (source H1 + tags) | Proposed Foundry destination | Missing evidence | Today? |")
    w("|---|---|---|---|---|---|")
    for x in deferred:
        r = x["r"]
        tags = TAGS.get(r.get("Explicit source keywords") or "", [])
        kw = "; ".join([r.get("Exact source H1") or ""] + [t for t in tags if t not in ("99 purity peptides",)][:6]).strip("; ")
        research = r.get("Source", "").endswith("/research")
        missing = ("Sourced literature (dates, evidence type, limits), qualified scientific reviewer, compliance review" if research or "research" in x["note"].lower()
                   else "Qualified regulatory/technical reviewer" if r["id"] in ("99PW-439", "99PW-442") else "Original source material")
        w(f"| {r['id']} | {r.get('Source','')} | {kw.replace('|','/')} | {f'`{x['dest']}` (wholesale intent already served there)' if x['dest'] else 'none (product not offered)'} | {missing} | No |")
    w("")

    # ---- owner decisions
    w("## Decisions for the owner, with recommendations\n")
    w("### Six source pages\n")
    w("| ID | Page | Question | Recommendation |")
    w("|---|---|---|---|")
    REC_PAGES = {
        "99PW-010": ("Is there a wholesale refund/replacement policy?", "Publish a short wholesale terms page only once real terms exist; until then keep 'stated on your quote'. Don't copy the retail refund policy."),
        "99PW-432": ("Target the drug names behind VLP-1/2/3 (semaglutide, tirzepatide, retatrutide)?", "Don't. The store deliberately uses coded names, these terms invite human-use and regulatory scrutiny, and ad/processor reviewers flag them. Keep coded names; the linked lab PDFs already name the compound for buyers who verify."),
        "99PW-448": ("Where are products manufactured, and where do they ship from?", "Answer it privately first. Publish 'ships from' and 'made in' only as separate, documented facts; never imply US manufacture without evidence."),
    }
    for x in rows:
        if x["status"] != kc.UNRESOLVED:
            continue
        r = x["r"]
        q, rec = REC_PAGES.get(r["id"], ("Target this compound's drug name on the coded-name product page?", "Don't (as 99PW-432). Keep the product page under its catalog name."))
        w(f"| {r['id']} | {r.get('Source','')} → {f'`{x['dest']}`' if x['dest'] else '—'} | {q} | {rec} |")
    w("\n### Ten phrases\n")
    w("| Phrase | Question | Recommendation |")
    w("|---|---|---|")
    REC_PHRASES = {
        "compound shipping compliance": ("Do you have documented shipping rules (carriers, restricted destinations, packaging)?", "If yes, add a short factual section to /wholesale/ordering. Don't publish 'compliant shipping' as a claim."),
        "GLP-1 wholesale": ("Target GLP-1 drug-class wholesale terms?", "No. VLP-1's identity line already says 'GLP-1 receptor agonist peptide'; that factual description is enough."),
        "KPV free base vs acetate": ("Which salt form is your KPV?", "If the supplier documents it, add it as a spec row on /catalog/kpv. Otherwise leave it out."),
        "peptide manufacturing": ("Who manufactures, and can it be stated?", "Only state documented facts (country, certifications) and only if you'll stand behind them on a quote."),
        "private label GLP-1 peptides": ("Offer and name GLP-class products for private label?", "No, for the same reasons as GLP-1 wholesale; any catalog product can already be labelled."),
        "research grade peptides": ("Use 'research grade' as a quality claim?", "Avoid it as a claim (it has no defined standard); keep 'for laboratory research use only' and the reports."),
        "retatrutide research": ("Target the drug name?", "No (coded-name policy)."),
        "semaglutide research": ("Target the drug name?", "No (coded-name policy)."),
        "tirzepatide supplier": ("Target the drug name?", "No (coded-name policy)."),
        "US manufactured peptides": ("Are products US-manufactured, and documented?", "Don't publish unless documented per product; 'ships from' ≠ 'made in'."),
    }
    for t in tag_rows:
        if t["status"] == kc.UNRESOLVED:
            q, rec = REC_PHRASES.get(t["phrase"], ("", ""))
            w(f"| {t['phrase']} | {q} | {rec} |")
    w("")

    # ---- not relevant recheck
    nr = [x for x in rows if x["status"] == kc.NOT_RELEVANT]
    loc = [x for x in rows if x["status"] == kc.LOCAL]
    w(f"## Recheck of the pages first marked “not relevant”\n")
    w(f"Of the 126 first marked not relevant, **{len(loc)}** turned out to carry real buyer intent: location pages for website development "
      f"(Belk) and wholesale peptides (99 Purity). They are now *location intent: needs local facts*. The national pages serve that intent today, and a local page "
      f"should follow only a verified local fact. **{len(nr)}** stay not relevant (or are competitor-brand/assay pages):\n")
    w("| ID | Page | Why it stays out |")
    w("|---|---|---|")
    for x in nr:
        w(f"| {x['r']['id']} | {x['r'].get('Source','')} | {x['note']} |")
    places = defaultdict(list)
    for x in loc:
        u = x["r"].get("Source", "")
        places["Website development (Belk)" if x["r"]["id"].startswith("BELK") else "Wholesale peptides (99 Purity)"].append(re.sub(r"^https?://[^/]+", "", u))
    w("\nLocation pages by intent (all served nationally today):\n")
    for k, v in places.items():
        w(f"- **{k}** ({len(v)}): " + ", ".join(sorted(v)))
    w("\nOwner question that would unlock them: *which states/regions do you actually ship wholesale to (and exclude), and do you meet website clients in person anywhere?*\n")

    # ---- implemented phrases
    w("## Phrases implemented, by Foundry URL and placement\n")
    w("Only phrases found in the rendered page. *Anchor* lists other pages whose internal link text contains the phrase and points here.\n")
    w("| Foundry URL | Phrase | Placement on the page | Internal-link anchors from |")
    w("|---|---|---|---|")
    missing = []
    for i in impl:
        if not i["where"] and not i["anchors"]:
            missing.append(i)
            continue
        w(f"| `{i['route']}` | {i['phrase']} | {', '.join(i['where']) or '—'} | {', '.join(f'`{a}`' for a in i['anchors'][:4]) + (' …' if len(i['anchors']) > 4 else '') or '—'} |")
    if missing:
        w("\n**Registry phrases not found on their page (needs improvement):** " + "; ".join(f"`{m['route']}` {m['phrase']}" for m in missing))

    w("\n### Tag phrases: intent served, exact phrase not used\n")
    for t in tag_intent_only:
        w(f"- {t['phrase']} → `{t['dest']}`: {t['note']}")

    # ---- URL map
    w("\n## Final URL-to-keyword map\n")
    served = defaultdict(list)
    for x in implemented_pages:
        served[x["dest"]].append(x["r"]["id"])
    w("| Foundry URL | Title | H1 | Primary phrase | Supporting phrases rendered | Audit pages served |")
    w("|---|---|---|---|---|---|")
    for pg in REG["pages"]:
        rendered = [i["phrase"] for i in impl if i["route"] == pg["route"] and i["where"] and i["phrase"] != pg["primaryPhrase"]]
        ids = served.get(pg["route"], [])
        w(f"| `{pg['route']}` | {pg['title']} | {pg['h1']} | {pg['primaryPhrase']} | {'; '.join(rendered) or '—'} | {len(ids)}: {', '.join(ids[:8])}{' …' if len(ids) > 8 else ''} |")
    for c in CATALOG:
        route = f"/catalog/{c['slug']}"
        ids = served.get(route, [])
        w(f"| `{route}` | {c['name']} Wholesale \\| Vanta Foundry | {c['name']} Wholesale | {c['name']} wholesale | — | {len(ids)}: {', '.join(ids)} |")
    other = sorted(set(served) - {p["route"] for p in REG["pages"]} - {f"/catalog/{c['slug']}" for c in CATALOG})
    for route in other:
        p = page(route)
        title = " ".join(p.parts.get("title", []))
        h1 = " ".join(p.parts.get("H1", []))
        ids = served[route]
        w(f"| `{route}` | {title} | {h1} | (guide/hub) | — | {len(ids)}: {', '.join(ids[:8])}{' …' if len(ids) > 8 else ''} |")

    open("docs/KEYWORD-DECISIONS.md", "w").write("\n".join(out) + "\n")
    print(by_status, "| tag phrases rendered:", len(tag_impl), "intent-only:", len(tag_intent_only), "| registry phrases missing:", len(missing))
    for m in missing:
        print("MISSING", m["route"], m["phrase"])


if __name__ == "__main__":
    main()
