"use client";

import { usePathname } from "next/navigation";
import { NO_WHATSAPP_PATHS } from "@/lib/site";

/** Renders its children everywhere except the website-development pages. */
export function HideOnWebsitePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return NO_WHATSAPP_PATHS.includes(pathname) ? null : <>{children}</>;
}
