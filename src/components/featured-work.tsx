import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconArrowUpRight } from "./icons";

const LIVE = [
  {
    name: "Genesis Biomapping",
    kind: "Research supply store",
    url: "genesisbiomapping.co",
    href: "https://genesisbiomapping.co",
    desktop: "/showcase/genesis-desktop.webp",
    phone: "/showcase/genesis-phone.webp",
    did: ["Design", "Development", "Checkout", "SEO & AI search"],
  },
  {
    name: "Vanta Labs",
    kind: "Research supply store",
    url: "vantalabsresearch.com",
    href: "https://www.vantalabsresearch.com",
    desktop: "/showcase/vanta-labs-desktop.webp",
    phone: "/showcase/vanta-labs-phone.webp",
    did: ["Design", "Development", "Checkout", "Email & SMS", "SEO & AI search"],
  },
];

const MORE = [
  { name: "Solenne", kind: "Skincare", src: "/solenne/hero.webp" },
  { name: "Halcyon", kind: "Specialty coffee", src: "/sites/halcyon-hero.webp" },
];

/**
 * Live sites first, shown the way they look on a laptop and a phone, with
 * what we did on each and a link to visit. Then brands in other industries.
 */
export function FeaturedWork() {
  return (
    <div className="space-y-5">
      {LIVE.map((w) => (
        <article key={w.name} className="overflow-hidden rounded-[28px] border border-line bg-bg-2">
          <div className="flex flex-col gap-5 p-6 sm:p-9 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[13.5px] text-muted">{w.kind} · live</p>
              <h3 className="mt-1 text-[30px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[40px]">{w.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {w.did.map((d) => (
                  <li key={d} className="rounded-full border border-line-2 bg-white px-3 py-1.5 text-[13px] text-body">{d}</li>
                ))}
              </ul>
            </div>
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="btn h-12 w-fit shrink-0 border border-line-2 bg-white px-6 text-[15px] text-ink hover:border-ink">
              Visit {w.url} <IconArrowUpRight />
            </a>
          </div>
          <div className="relative px-6 sm:px-9">
            <div className="mr-[14%] overflow-hidden rounded-t-xl border border-b-0 border-line bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="h-2 w-2 rounded-full bg-line-2" />
                <span className="ml-2 truncate rounded-full bg-bg-2 px-2.5 py-0.5 text-[11px] text-muted">{w.url}</span>
              </div>
              <Image src={w.desktop} alt={`The ${w.name} website on desktop`} width={2160} height={1148} sizes="(min-width: 1200px) 900px, 86vw" className="h-auto w-full" />
            </div>
            <div className="absolute bottom-0 right-6 w-[24%] max-w-[210px] overflow-hidden rounded-t-[22px] border-[5px] border-b-0 border-ink bg-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:right-9">
              <div className="relative aspect-[780/1100] overflow-hidden rounded-t-[16px]">
                <Image src={w.phone} alt={`The ${w.name} website on a phone`} fill sizes="210px" className="object-cover object-top" />
              </div>
            </div>
          </div>
        </article>
      ))}
      <ul className="grid gap-5 md:grid-cols-2">
        {MORE.map((m) => (
          <li key={m.name}>
            <Link href="/work" className="group block overflow-hidden rounded-[28px] border border-line">
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                <Image src={m.src} alt={`${m.name} website`} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-[18px] font-semibold tracking-[-0.02em] text-ink">{m.name}</p>
                  <p className="text-[13.5px] text-muted">{m.kind} · design &amp; build</p>
                </div>
                <IconArrow className="text-ink transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Supabase"];

/** The tools our sites are built on. Plain wordmarks, no logos. */
export function StackRow({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10 ${dark ? "text-white/45" : "text-muted"}`}>
      <p className="text-[13px]">Built on</p>
      <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
        {STACK.map((t) => (
          <li key={t} className={`text-[16px] font-semibold tracking-[-0.02em] ${dark ? "text-white/60" : "text-ink/55"}`}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
