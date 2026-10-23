// Release check for the page registry and crawlability.
//
//   npm run build && npm start        (in one terminal)
//   npm run check:seo                 (in another; BASE=http://localhost:3000 by default)
//
// Checks, against the running production build:
//   - every registry page, product page and guide answers 200, is indexable,
//     has exactly one <h1> and the approved title, H1, canonical and CTA text;
//   - every product page carries its published report numbers;
//   - every sitemap URL answers 200, is indexable and canonicalises to itself;
//   - every internal link on those pages resolves (no 404s, no orphans in the sitemap);
//   - the catalog's "no published report" list agrees with the product facts.
// Exits 1 on any failure. Wording changes belong in src/lib/seo-pages.ts.

import { SEO_PAGES, productSeo } from "../src/lib/seo-pages.ts";
import { CATALOG, NO_PUBLISHED_REPORT, REFERENCE_REPORT_ONLY } from "../src/lib/catalog.ts";
import { PRODUCT_FACTS } from "../src/lib/product-facts.ts";

const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vantafoundry.com").replace(/\/$/, "");
const failures = [];
const fail = (route, msg) => failures.push(`${route}: ${msg}`);

const decode = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const cache = new Map();
async function get(route) {
  if (cache.has(route)) return cache.get(route);
  const res = await fetch(BASE + route, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  const out = { status: res.status, html, robots: res.headers.get("x-robots-tag") ?? "" };
  cache.set(route, out);
  return out;
}

function parse(html) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1]));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, " "));
  const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((h) => !h.startsWith("/_next") && !/\.(png|jpe?g|webp|svg|ico|pdf|txt|xml)$/.test(h));
  return { title, h1s, canonical, robots, text, links };
}

async function checkPage(route, { title, h1, cta, phrase, mustContain = [] }) {
  const r = await get(route);
  if (r.status !== 200) return fail(route, `status ${r.status}`);
  const p = parse(r.html);
  if (/noindex/.test(p.robots) || /noindex/.test(r.robots)) fail(route, "noindex on a page meant for search");
  if (title && p.title !== title) fail(route, `title is "${p.title}", approved "${title}"`);
  if (p.h1s.length !== 1) fail(route, `${p.h1s.length} <h1> elements`);
  else if (h1 && p.h1s[0] !== h1) fail(route, `h1 is "${p.h1s[0]}", approved "${h1}"`);
  const want = SITE + (route === "/" ? "" : route);
  if (p.canonical.replace(/\/$/, "") !== want) fail(route, `canonical is "${p.canonical}", expected "${want}"`);
  if (cta && !p.text.includes(cta)) fail(route, `CTA "${cta}" not found`);
  if (phrase && !(p.title + " " + p.h1s.join(" ") + " " + p.text).toLowerCase().includes(phrase.toLowerCase())) fail(route, `primary phrase "${phrase}" not on the page`);
  for (const m of mustContain) if (!p.text.includes(m)) fail(route, `missing "${m}"`);
}

for (const page of Object.values(SEO_PAGES)) {
  await checkPage(page.route, { title: page.title, h1: page.h1, cta: page.cta, phrase: page.primaryPhrase });
  // Supporting phrases the registry promises must actually render on the page.
  const text = parse((await get(page.route)).html).text.toLowerCase().replace(/[\s-]+/g, " ");
  for (const ph of page.phrases) if (!text.includes(ph.toLowerCase().replace(/[\s-]+/g, " "))) fail(page.route, `supporting phrase "${ph}" not on the page`);
}
for (const p of CATALOG) {
  const seo = productSeo(p.name);
  const reports = PRODUCT_FACTS[p.slug]?.reports ?? [];
  await checkPage(`/catalog/${p.slug}`, { title: seo.title, h1: seo.h1, cta: seo.cta, phrase: `${p.name} wholesale`, mustContain: reports.map((r) => r.id) });
  const noReport = reports.length === 0;
  if (noReport !== NO_PUBLISHED_REPORT.includes(p.slug)) fail(`/catalog/${p.slug}`, "NO_PUBLISHED_REPORT disagrees with product-facts.ts");
  const referenceOnly = reports.length > 0 && reports.every((r) => r.status === "reference");
  if (referenceOnly !== REFERENCE_REPORT_ONLY.includes(p.slug)) fail(`/catalog/${p.slug}`, "REFERENCE_REPORT_ONLY disagrees with product-facts.ts");
  for (const r of reports) {
    if (r.status === "reference" && !r.note) fail(`/catalog/${p.slug}`, `${r.id} is reference-only but has no note saying why`);
    if (!r.batch) fail(`/catalog/${p.slug}`, `${r.id} has no batch as printed on the report`);
  }
}

// Sitemap: every URL live, indexable, self-canonical. Guides: title is "<h1> | Vanta Foundry".
const sm = await get("/sitemap.xml");
const urls = [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail("/sitemap.xml", "no URLs");
const inSitemap = new Set();
for (const u of urls) {
  if (!u.startsWith(SITE)) fail("/sitemap.xml", `foreign URL ${u}`);
  const route = u.slice(SITE.length) || "/";
  inSitemap.add(route);
  if (route.startsWith("/guides/")) {
    const r = await get(route);
    const p = parse(r.html);
    await checkPage(route, { title: `${p.h1s[0]} | Vanta Foundry`, h1: undefined });
  } else {
    await checkPage(route, {});
  }
}

// Internal links: every link found on a sitemap page must resolve.
const linked = new Set();
for (const route of inSitemap) {
  for (const href of parse((await get(route)).html).links) linked.add(href.replace(/\/$/, "") || "/");
}
for (const href of linked) {
  const r = await get(href);
  if (r.status !== 200) fail(href, `linked internally but answers ${r.status}`);
}
for (const route of inSitemap) if (route !== "/" && !linked.has(route)) fail(route, "in the sitemap but no page links to it (orphan)");

// Optional: every report link must open (CHECK_EXTERNAL=1; needs internet).
if (process.env.CHECK_EXTERNAL) {
  const urls = new Set(Object.values(PRODUCT_FACTS).flatMap((f) => f.reports.map((r) => r.url)));
  for (const u of urls) {
    const res = await fetch(u, { redirect: "follow" }).catch(() => null);
    if (!res || res.status !== 200) fail(u, `report link answers ${res?.status ?? "no response"}`);
  }
  console.log(`Checked ${urls.size} report links.`);
}

const robots = await get("/robots.txt");
if (!/Sitemap: /.test(robots.html)) fail("/robots.txt", "no Sitemap line");
if (/Disallow: \/_next/.test(robots.html)) fail("/robots.txt", "blocks /_next assets needed to render pages");

console.log(`Checked ${cache.size} URLs (${urls.length} in the sitemap, ${linked.size} internal link targets).`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("All registry, sitemap and link checks passed.");
