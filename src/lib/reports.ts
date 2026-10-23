import { CATALOG } from "./catalog";
import { PRODUCT_FACTS, type ProductReport } from "./product-facts";

/** Every published report across the catalog, one row per report, in catalog order. */
export function allReports(): (ProductReport & { slug: string; product: string })[] {
  return CATALOG.flatMap((p) => (PRODUCT_FACTS[p.slug]?.reports ?? []).map((r) => ({ ...r, slug: p.slug, product: p.name })));
}

/** True when the store's report URL is the laboratory PDF itself (Kovera reports). */
export const isPdf = (r: ProductReport) => r.url.endsWith(".pdf");
