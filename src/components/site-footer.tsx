import Link from "next/link";
import { Logo } from "./logo";
import { HideOnWebsitePages } from "./hide-on-website-pages";
import { RUO_NOTICE, SITE, emailLink, whatsappLink } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export function SiteFooter() {
  const wa = whatsappLink();
  return (
    <footer className="mt-28 border-t border-line bg-bg-2">
      <div className="mx-auto max-w-[1160px] px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-6 text-muted">{SITE.description}</p>
          </div>
          <Col title="Services" links={SERVICES.map((s) => ({ href: `/${s.slug}`, label: s.name }))} />
          <Col
            title="Company"
            links={[
              { href: "/get-started", label: "Get started" },
              { href: "/work", label: "Our work" },
              { href: "/industries", label: "Industries" },
              { href: "/about", label: "About us" },
              { href: "/contact", label: "Contact" },
              { href: "/catalog", label: "Catalog" },
              { href: "/standards", label: "Our standards" },
              { href: "/guides", label: "Guides" },
              { href: "/glossary", label: "Glossary" },
            ]}
          />
          <Col
            title="Contact"
            links={[
              ...(wa ? [{ href: wa, label: "WhatsApp", whatsapp: true }] : []),
              { href: emailLink(), label: SITE.email },
              { href: SITE.privacyUrl, label: "Privacy" },
              { href: SITE.termsUrl, label: "Terms" },
            ]}
          />
        </div>
        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-3xl text-[12.5px] leading-5 text-muted">{RUO_NOTICE}</p>
          <p className="mt-3 text-[12.5px] text-muted">
            © {new Date().getUTCFullYear()} {SITE.parent}. {SITE.name} is operated by{" "}
            <a href={SITE.parentUrl} className="underline underline-offset-2 hover:text-ink">
              {SITE.parent}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { href: string; label: string; whatsapp?: boolean }[] }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-ink">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => {
          const item = (
          <li key={l.href}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[14px] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            )}
          </li>
          );
          return l.whatsapp ? <HideOnWebsitePages key={l.href}>{item}</HideOnWebsitePages> : item;
        })}
      </ul>
    </div>
  );
}
