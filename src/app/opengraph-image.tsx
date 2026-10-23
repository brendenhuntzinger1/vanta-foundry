import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: payments, supply, shipping and websites`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#ffffff", color: "#0c0c0d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>
          <span>Vanta&nbsp;</span>
          <span style={{ color: "#6b6b72" }}>Foundry</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 600, letterSpacing: -4, lineHeight: 1.0 }}>
          <span>Payments, supply, shipping</span>
          <span>and websites.</span>
          <span style={{ color: "#6b6b72" }}>One team for all of it.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6b6b72" }}>
          Payment processing · Wholesale · Factory-direct · White label · 3PL · Websites
        </div>
      </div>
    ),
    size,
  );
}
