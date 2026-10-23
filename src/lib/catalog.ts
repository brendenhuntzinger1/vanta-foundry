/**
 * THE CATALOG: what a wholesale customer can get from us.
 *
 * Products and sizes were read from the live Vanta Labs store on 2026-10-23
 * (active, published, enabled products and sizes only). Update this list when
 * the store's catalog changes.
 *
 * No prices on purpose (owner, 2026-10-23): customers pick what they want and
 * send an inquiry on WhatsApp or by email, and we reply with pricing.
 */

export type CatalogProduct = { slug: string; name: string; category: string; sizes: string[] };

export const CATALOG_READ_ON = "2026-10-23";

export const CATALOG: CatalogProduct[] = [
  { slug: "glow", name: "GLOW", category: "Blends", sizes: ["70mg"] },
  { slug: "klow", name: "KLOW", category: "Blends", sizes: ["80mg"] },
  { slug: "bpc-157-tb-500", name: "BPC-157 + TB-500", category: "Blends", sizes: ["20mg"] },
  { slug: "cjc-1295-no-dac", name: "CJC-1295 no DAC", category: "GHRH & GH Secretagogues", sizes: ["10mg"] },
  { slug: "ghrp-2", name: "GHRP-2", category: "GHRH & GH Secretagogues", sizes: ["5mg"] },
  { slug: "tesamorelin", name: "Tesamorelin", category: "GHRH & GH Secretagogues", sizes: ["5mg", "10mg"] },
  { slug: "cjc-1295-ipamorelin", name: "CJC-1295 + Ipamorelin", category: "GHRH & GH Secretagogues", sizes: ["10mg"] },
  { slug: "cagrilintide", name: "Cagrilintide", category: "GLP Research", sizes: ["10mg"] },
  { slug: "glp-1", name: "VLP-1 (SM)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"] },
  { slug: "glp-2", name: "VLP-2 (TR)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"] },
  { slug: "glp-3", name: "VLP-3 (RT)", category: "GLP Research", sizes: ["5mg", "10mg", "20mg", "30mg"] },
  { slug: "bpc-157", name: "BPC-157", category: "Peptides", sizes: ["5mg", "10mg"] },
  { slug: "dsip", name: "DSIP", category: "Peptides", sizes: ["10mg"] },
  { slug: "ghk-cu", name: "GHK-Cu", category: "Peptides", sizes: ["50mg"] },
  { slug: "igf-1-lr3", name: "IGF-1 LR3", category: "Peptides", sizes: ["1mg"] },
  { slug: "kpv", name: "KPV", category: "Peptides", sizes: ["10mg"] },
  { slug: "mots-c", name: "MOTS-C", category: "Peptides", sizes: ["10mg"] },
  { slug: "ss-31", name: "SS-31", category: "Peptides", sizes: ["10mg"] },
  { slug: "thymosin-alpha-1", name: "Thymosin Alpha-1", category: "Peptides", sizes: ["5mg"] },
  { slug: "epithalon", name: "Epithalon", category: "Peptides", sizes: ["10mg"] },
  { slug: "semax", name: "Semax", category: "Peptides", sizes: ["10mg"] },
  { slug: "selank", name: "Selank", category: "Peptides", sizes: ["10mg"] },
  { slug: "l-carnitine", name: "L-Carnitine", category: "Small Molecules & Cofactors", sizes: ["6000mg"] },
  { slug: "lipo-c", name: "LIPO-C", category: "Small Molecules & Cofactors", sizes: ["10mL"] },
  { slug: "nad", name: "NAD+", category: "Small Molecules & Cofactors", sizes: ["500mg", "1000mg"] },
  { slug: "b12", name: "B12", category: "Small Molecules & Cofactors", sizes: ["10mL"] },
  { slug: "recon-water", name: "Recon water (0.9% Benzyl Alcohol)", category: "Solvents & Solutions", sizes: ["10mL"] },
  { slug: "hcg", name: "HCG", category: "Specialty", sizes: ["5000iu"] },
  { slug: "pt-141", name: "PT-141", category: "Specialty", sizes: ["10mg"] },
  { slug: "mt-2-melanotan-ii", name: "MT-II", category: "Specialty", sizes: ["10mg"] },
  { slug: "kisspeptin", name: "Kisspeptin", category: "Specialty", sizes: ["10mg"] },
  { slug: "snap-8", name: "SNAP-8", category: "Specialty", sizes: ["10mg"] },
];
