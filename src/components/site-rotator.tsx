"use client";

import { useEffect, useState } from "react";
import { SITES, SiteView } from "./demos/example-sites";

/** Bento tile: cycles through the sites we build, Vanta Labs first. */
export function SiteRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SITES.length), 3200);
    return () => clearInterval(t);
  }, []);
  const s = SITES[i];
  return (
    <div className="relative h-full overflow-hidden">
      <div key={s.key} className="fade-in absolute left-3 right-3 top-3 overflow-hidden rounded-t-lg border border-b-0 border-white/10 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.5)]">
        {/* Rendered at desktop width and scaled down, so it reads as a real site. */}
        <div className="w-[200%] origin-top-left scale-50">
          <SiteView which={s.key} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/85 px-3.5 py-2 text-[11.5px] text-white">
        <span>
          {s.name} <span className="text-white/55">· {s.industry}</span>
        </span>
        <span className="flex gap-1">
          {SITES.map((x, n) => (
            <span key={x.key} className={`h-1.5 rounded-full transition-all ${n === i ? "w-4 bg-white" : "w-1.5 bg-white/35"}`} />
          ))}
        </span>
      </div>
    </div>
  );
}
