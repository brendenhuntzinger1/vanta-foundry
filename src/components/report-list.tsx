import Link from "next/link";
import type { ProductReport } from "@/lib/product-facts";
import { productPath } from "@/lib/catalog";
import { isPdf } from "@/lib/reports";
import { IconArrowUpRight } from "./icons";

/**
 * Published laboratory reports, as a list that reads on a phone. Each row
 * gives the report number, the size and batch printed on it, and links to
 * the laboratory's own document. Reference reports say why they don't
 * document the size or lot sold, instead of hiding it.
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
              {r.size && <span className="text-muted"> · {r.size} label</span>}
              {r.batch && <span className="text-muted"> · Batch {r.batch}</span>}
              <span className={`ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[11.5px] font-medium ${r.status === "verified" ? "bg-bg-2 text-ink" : "bg-warn-tint text-warn"}`}>
                {r.status === "verified" ? "Batch report" : "Reference only"}
              </span>
            </p>
            <p className="mt-1 text-[13.5px] leading-[1.55] text-body">
              {r.result} · {r.lab} · {r.date}
            </p>
            {r.note && <p className="mt-1 text-[13px] leading-[1.55] text-muted">{r.note}</p>}
          </div>
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-1.5 text-[14px] font-medium text-ink underline underline-offset-2">
            {isPdf(r) ? "View report (PDF)" : "View report on Vanta Labs"} <IconArrowUpRight />
          </a>
        </li>
      ))}
    </ul>
  );
}
