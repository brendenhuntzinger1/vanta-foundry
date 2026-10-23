import type { ReactNode } from "react";

/**
 * Window chrome for every product demo. The "Example" tag is not decoration:
 * the data inside is illustrative, and the tag says so on every panel.
 */
export function DemoFrame({
  title,
  subtitle,
  children,
  action,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-white">{title}</p>
          {subtitle && <p className="mt-0.5 truncate text-[11.5px] text-faint">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
            Example
          </span>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "ok" | "warn" | "gold"; children: ReactNode }) {
  const tones = {
    neutral: "border-line-strong text-white/60",
    ok: "border-[rgba(143,191,154,0.3)] text-ok",
    warn: "border-[rgba(217,178,106,0.3)] text-warn",
    gold: "border-[rgba(199,174,94,0.35)] text-gold",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] ${tones[tone]}`}>
      {tone === "ok" && <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />}
      {children}
    </span>
  );
}

export const EXAMPLE_BRAND = "Northfield Research";
