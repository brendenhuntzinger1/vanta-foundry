import Link from "next/link";
import type { ProductReport } from "@/lib/product-facts";
import { productPath } from "@/lib/catalog";
import { isPdf } from "@/lib/reports";
import { IconArrowUpRight } from "./icons";

/**
 * Published laboratory reports, as a list that reads on a phone. Each row
 * links to the laboratory's own document on the Vanta Labs store.
 */
export function ReportList({ reports, showProduct = false }: { reports: (ProductReport & { slug?: string; product?: string })[]; showProduct?: boolean }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {reports.map((r) => (
        <li key={`${r.slug ?? ""}-${r.id}`} className="grid gap-x-6 gap-y-1.5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-[15.5px] text-ink">
              {showProduct && r.slug && (
                <>
                  <Link href={productPath(r.slug)} className="font-semibold underline-offset-2 hover:underline">{r.product}</Link>
                  <span className="text-muted"> · </span>
                </>
              )}
              <span className="font-mono text-[13.5px]">{r.id}</span>
              {r.size && <span className="text-muted"> · {r.size} vial</span>}
            </p>
            <p className="mt-1 text-[13.5px] leading-[1.55] text-body">
              {r.result} · {r.lab} · {r.date}
            </p>
          </div>
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-ink underline underline-offset-2">
            {isPdf(r) ? "View report (PDF)" : "View report on Vanta Labs"} <IconArrowUpRight />
          </a>
        </li>
      ))}
    </ul>
  );
}
