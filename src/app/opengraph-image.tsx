import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(70% 60% at 50% 0%, rgba(199,174,94,0.18), #0a0a0a 70%)",
          color: "#f5f5f5",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5 }}>
          <span>Vanta&nbsp;</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>Foundry</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.02, letterSpacing: -3 }}>Everything behind</div>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 1.02, letterSpacing: -3 }}>
            <span>the&nbsp;</span>
            <span style={{ color: "#c7ae5e", fontStyle: "italic" }}>label.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a3a3a3", fontFamily: "sans-serif" }}>
          Wholesale · White label · Fulfillment · Payments · Storefronts
        </div>
      </div>
    ),
    size,
  );
}
