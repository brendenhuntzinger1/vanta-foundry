/**
 * THE CATALOG AND ITS WHOLESALE PRICES.
 *
 * Products, sizes and retail prices were read from the live Vanta Labs store
 * on 2026-10-23 (active, published, enabled products and sizes only). If the
 * store's catalog or prices change, update this file to match.
 *
 * ── HOW TO SET WHOLESALE PRICES ────────────────────────────────────────────
 * Two ways, use either or both:
 *
 * 1. A discount for everything: set `percentOff` on a tier below, for
 *    example 25 means 25% off retail at that quantity. Every product gets a
 *    price in that column automatically.
 *
 * 2. An exact price for one size: set `wholesale` on that size, in dollars,
 *    for example { size: "10mg", retail: 49.99, wholesale: 32 }. An exact
 *    price wins over the tier discount for the first column.
 *
 * Anything left as null shows "Ask us" with a one-tap WhatsApp/email button,
 * so a missing price can never show a wrong one.
 */

export type CatalogSize = { size: string; retail: number; wholesale: number | null };
export type CatalogProduct = { slug: string; name: string; category: string; sizes: CatalogSize[] };

export const PRICE_TIERS: { label: string; minUnits: number; percentOff: number | null }[] = [
  { label: "10+ units", minUnits: 10, percentOff: null },
  { label: "50+ units", minUnits: 50, percentOff: null },
  { label: "100+ units", minUnits: 100, percentOff: null },
];

export const CATALOG_READ_ON = "2026-10-23";

export const CATALOG: CatalogProduct[] = [
  { slug: "glow", name: "GLOW", category: "Blends", sizes: [{ size: "70mg", retail: 89.99, wholesale: null }] },
  { slug: "klow", name: "KLOW", category: "Blends", sizes: [{ size: "80mg", retail: 99.99, wholesale: null }] },
  { slug: "bpc-157-tb-500", name: "BPC-157 + TB-500", category: "Blends", sizes: [{ size: "20mg", retail: 84.99, wholesale: null }] },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 no DAC", category: "GHRH & GH Secretagogues", sizes: [{ size: "10mg", retail: 64.99, wholesale: null }] },
  { slug: "ghrp-2", name: "GHRP-2", category: "GHRH & GH Secretagogues", sizes: [{ size: "5mg", retail: 29.99, wholesale: null }] },
  { slug: "tesamorelin", name: "Tesamorelin", category: "GHRH & GH Secretagogues", sizes: [{ size: "5mg", retail: 34.99, wholesale: null }, { size: "10mg", retail: 74.99, wholesale: null }] },
  { slug: "cjc-1295-ipamorelin", name: "CJC-1295 + Ipamorelin", category: "GHRH & GH Secretagogues", sizes: [{ size: "10mg", retail: 64.99, wholesale: null }] },
  { slug: "cagrilintide", name: "Cagrilintide", category: "GLP Research", sizes: [{ size: "10mg", retail: 79.99, wholesale: null }] },
  { slug: "glp-1", name: "VLP-1 (SM)", category: "GLP Research", sizes: [{ size: "5mg", retail: 39.99, wholesale: null }, { size: "10mg", retail: 69.99, wholesale: null }, { size: "20mg", retail: 119.99, wholesale: null }, { size: "30mg", retail: 144.99, wholesale: null }] },
  { slug: "glp-2", name: "VLP-2 (TR)", category: "GLP Research", sizes: [{ size: "5mg", retail: 39.99, wholesale: null }, { size: "10mg", retail: 69.99, wholesale: null }, { size: "20mg", retail: 119.99, wholesale: null }, { size: "30mg", retail: 144.99, wholesale: null }] },
  { slug: "glp-3", name: "VLP-3 (RT)", category: "GLP Research", sizes: [{ size: "5mg", retail: 39.99, wholesale: null }, { size: "10mg", retail: 69.99, wholesale: null }, { size: "20mg", retail: 119.99, wholesale: null }, { size: "30mg", retail: 144.99, wholesale: null }] },
  { slug: "bpc-157", name: "BPC-157", category: "Peptides", sizes: [{ size: "5mg", retail: 29.99, wholesale: null }, { size: "10mg", retail: 49.99, wholesale: null }] },
  { slug: "dsip", name: "DSIP", category: "Peptides", sizes: [{ size: "10mg", retail: 44.99, wholesale: null }] },
  { slug: "ghk-cu", name: "GHK-Cu", category: "Peptides", sizes: [{ size: "50mg", retail: 29.99, wholesale: null }] },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", category: "Peptides", sizes: [{ size: "1mg", retail: 79.99, wholesale: null }] },
  { slug: "kpv", name: "KPV", category: "Peptides", sizes: [{ size: "10mg", retail: 39.99, wholesale: null }] },
  { slug: "mots-c", name: "MOTS-C", category: "Peptides", sizes: [{ size: "10mg", retail: 49.99, wholesale: null }] },
  { slug: "ss-31", name: "SS-31", category: "Peptides", sizes: [{ size: "10mg", retail: 49.99, wholesale: null }] },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", category: "Peptides", sizes: [{ size: "5mg", retail: 49.99, wholesale: null }] },
  { slug: "epithalon", name: "Epithalon", category: "Peptides", sizes: [{ size: "10mg", retail: 44.99, wholesale: null }] },
  { slug: "semax", name: "Semax", category: "Peptides", sizes: [{ size: "10mg", retail: 44.99, wholesale: null }] },
  { slug: "selank", name: "Selank", category: "Peptides", sizes: [{ size: "10mg", retail: 44.99, wholesale: null }] },
  { slug: "l-carnitine", name: "L-Carnitine", category: "Small Molecules & Cofactors", sizes: [{ size: "6000mg", retail: 49.99, wholesale: null }] },
  { slug: "lipo-c", name: "LIPO-C", category: "Small Molecules & Cofactors", sizes: [{ size: "10mL", retail: 49.99, wholesale: null }] },
  { slug: "nad", name: "NAD+", category: "Small Molecules & Cofactors", sizes: [{ size: "500mg", retail: 59.99, wholesale: null }, { size: "1000mg", retail: 79.99, wholesale: null }] },
  { slug: "b12", name: "B12", category: "Small Molecules & Cofactors", sizes: [{ size: "10mL", retail: 44.99, wholesale: null }] },
  { slug: "recon-water", name: "Recon water (0.9% Benzyl Alcohol)", category: "Solvents & Solutions", sizes: [{ size: "10mL", retail: 14.99, wholesale: null }] },
  { slug: "hcg", name: "HCG", category: "Specialty", sizes: [{ size: "5000iu", retail: 69.99, wholesale: null }] },
  { slug: "pt-141", name: "PT-141", category: "Specialty", sizes: [{ size: "10mg", retail: 49.99, wholesale: null }] },
  { slug: "mt-2-melanotan-ii", name: "MT-II", category: "Specialty", sizes: [{ size: "10mg", retail: 39.99, wholesale: null }] },
  { slug: "kisspeptin", name: "Kisspeptin", category: "Specialty", sizes: [{ size: "10mg", retail: 59.99, wholesale: null }] },
  { slug: "snap-8", name: "SNAP-8", category: "Specialty", sizes: [{ size: "10mg", retail: 39.99, wholesale: null }] },
];

/** Wholesale unit price for a size at a tier, or null when none is set. */
export function tierPrice(size: CatalogSize, tierIndex: number): number | null {
  if (tierIndex === 0 && size.wholesale != null) return size.wholesale;
  const pct = PRICE_TIERS[tierIndex]?.percentOff;
  if (pct == null) return null;
  return Math.round(size.retail * (1 - pct / 100) * 100) / 100;
}

export function hasAnyWholesalePrice() {
  return PRICE_TIERS.some((t) => t.percentOff != null) || CATALOG.some((p) => p.sizes.some((s) => s.wholesale != null));
}

export const money = (n: number) => `$${n.toFixed(2)}`;
