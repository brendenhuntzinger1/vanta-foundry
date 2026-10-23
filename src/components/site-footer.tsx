import Link from "next/link";
import { Logo } from "./logo";
import { RUO_NOTICE, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { GUIDES } from "@/lib/guides";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">{SITE.description}</p>
            <p className="mt-5 text-xs text-faint">
              Operated by{" "}
              <a href={SITE.parentUrl} className="text-white/60 underline-offset-4 hover:underline">
                {SITE.parent}
              </a>
            </p>
          </div>
          <FooterCol title="Services" links={SERVICES.map((s) => ({ href: `/${s.slug}`, label: s.name }))} />
          <FooterCol title="Guides" links={GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.title }))} />
          <FooterCol
            title="Company"
            links={[
              { href: "/apply", label: "Apply" },
              { href: "/standards", label: "Standards" },
              { href: `mailto:${SITE.email}`, label: "Contact" },
              { href: SITE.privacyUrl, label: "Privacy" },
              { href: SITE.termsUrl, label: "Terms" },
            ]}
          />
        </div>
        <div className="hairline-gold mt-14" />
        <p className="mt-8 max-w-3xl text-xs leading-6 text-faint">{RUO_NOTICE}</p>
        <p className="mt-4 text-xs text-faint">© {new Date().getUTCFullYear()} {SITE.parent}. All rights reserved.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
