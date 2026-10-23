import Link from "next/link";
import { SITE } from "@/lib/site";

/** Wordmark: the Vanta vial outline in gold beside the name. */
export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label={`${SITE.name} home`}>
      <svg width="16" height="22" viewBox="0 0 18 24" fill="none" aria-hidden="true">
        <rect x="5" y="0.9" width="8" height="3.4" rx="0.8" stroke="var(--gold-fill)" strokeWidth="1.5" />
        <path d="M3.5 6.5h11v14.25a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V6.5Z" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M3.5 13.5h11" stroke="var(--gold-fill)" strokeWidth="1.5" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.03em] text-ink">
        Vanta <span className="text-muted">Foundry</span>
      </span>
    </Link>
  );
}
