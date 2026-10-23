import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * The mark: a black tile holding a V cut down its centre line, one arm white
 * and one arm Vanta gold. Beside it, the name set in spaced capitals.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#0c0c0d" />
      <path d="M7 7.5h3.6L14 15.6V21L7 7.5Z" fill="#ffffff" />
      <path d="M21 7.5h-3.6L14 15.6V21l7-13.5Z" fill="#c7ae5e" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
      <LogoMark />
      <span className="text-[13.5px] uppercase leading-none tracking-[0.18em] text-ink">
        <span className="font-semibold">Vanta</span> <span className="font-normal">Foundry</span>
      </span>
    </Link>
  );
}
