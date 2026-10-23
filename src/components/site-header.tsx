"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { IconWhatsApp } from "./icons";
import { NAV, whatsappLink } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation, without an extra effect render.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-[border-color] duration-200 ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[14.5px] text-body transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light hidden h-10 px-4 text-[14px] sm:inline-flex">
              <IconWhatsApp className="text-wa" /> WhatsApp
            </a>
          )}
          <Link href="/get-started" className="btn btn-dark hidden h-10 px-5 text-[14px] sm:inline-flex">
            Get started
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {open ? <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" /> : <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fade-in border-t border-line bg-white px-5 pb-6 md:hidden">
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-4 text-[16px] text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3">
            <Link href="/get-started" className="btn btn-dark h-12 text-[15px]">
              Get started
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-light h-12 text-[15px]">
                <IconWhatsApp className="text-wa" /> WhatsApp us
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
