import type { ReactNode } from "react";

/**
 * A product screen. The small "Example" note is deliberate: the data inside is
 * illustrative, and the screen says so rather than passing it off as real.
 */
export function Screen({
  title,
  subtitle,
  status,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`screen overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-ink">{title}</p>
          {subtitle && <p className="mt-0.5 truncate text-[12.5px] text-muted">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">{status}</div>
      </div>
      <div className="p-5">{children}</div>
      <p className="border-t border-line bg-bg-2 px-5 py-2 text-[11px] text-muted">Example account</p>
    </div>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "ok" | "warn" | "gold"; children: ReactNode }) {
  const tones = {
    neutral: "bg-bg-2 text-body",
    ok: "bg-ok-tint text-ok",
    warn: "bg-warn-tint text-warn",
    gold: "bg-gold-tint text-gold",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${tones[tone]}`}>
      {tone === "ok" && <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />}
      {children}
    </span>
  );
}

export const EXAMPLE_BRAND = "Northfield Co.";
