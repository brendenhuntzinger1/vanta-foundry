"use client";

import { usePathname } from "next/navigation";
import { IconWhatsApp } from "./icons";
import { isWebsitePath, whatsappLink } from "@/lib/site";

/**
 * Bottom-right chat button on every page when WhatsApp is configured. Hidden
 * on the catalog and product pages, whose inquiry bar already carries
 * WhatsApp and would sit on top of it.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const wa = whatsappLink("Hi Vanta Foundry, I have a question.");
  if (!wa || pathname.startsWith("/catalog") || isWebsitePath(pathname)) return null;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="floating-wa fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] transition-transform hover:scale-105"
    >
      <IconWhatsApp width={28} height={28} />
    </a>
  );
}
