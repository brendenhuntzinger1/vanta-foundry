import Link from "next/link";
import { SITE } from "@/lib/site";

/** Wordmark: a hairline gold vial outline beside the name in Fraunces. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${SITE.name} home`}>
      <svg width="18" height="24" viewBox="0 0 18 24" fill="none" aria-hidden="true">
        <rect x="5" y="0.75" width="8" height="3.5" rx="0.75" stroke="var(--gold)" strokeWidth="1" />
        <path d="M3.5 6.5h11v14.25a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V6.5Z" stroke="var(--gold)" strokeWidth="1" />
        <path d="M3.5 13.5h11" stroke="var(--gold)" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
      <span className="font-display text-[19px] font-medium tracking-[-0.02em] text-white">
        Vanta <span className="text-white/60 transition-colors group-hover:text-white/80">Foundry</span>
      </span>
    </Link>
  );
}
