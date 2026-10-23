"use client";

import { usePathname } from "next/navigation";
import { isWebsitePath } from "@/lib/site";

/** Renders its children everywhere except the website-development pages. */
export function HideOnWebsitePages({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return isWebsitePath(pathname) ? null : <>{children}</>;
}
