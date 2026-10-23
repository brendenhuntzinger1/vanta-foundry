"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet when the route changes. Done by comparing the path seen at
  // render rather than in an effect, so there is no extra render with it open.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13.5px] transition-colors ${active ? "text-white" : "text-white/55 hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/apply" className="btn-gold hidden rounded-full px-5 py-2.5 text-[13px] sm:inline-flex">
            Apply
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="white" strokeWidth="1.2" />
              ) : (
                <path d="M2 5h12M2 11h12" stroke="white" strokeWidth="1.2" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="fade-in border-t border-line px-4 pb-6 pt-2 lg:hidden">
          <ul className="divide-y divide-line">
            {[...NAV, { href: "/launch", label: "Launch" }, { href: "/standards", label: "Standards" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center justify-between py-4 text-[15px] text-white/80">
                  {item.label}
                  <span aria-hidden="true" className="text-white/30">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/apply" className="btn-gold mt-5 flex justify-center rounded-full px-5 py-3.5 text-sm">
            Apply for an account
          </Link>
        </nav>
      )}
    </header>
  );
}
