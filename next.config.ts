import type { NextConfig } from "next";

// Preview deployments must never be indexed (see src/app/robots.ts).
const isPreview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Product photos come from the Vanta Labs store's public image storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mlpimwgkwuqpsvsrlpqv.supabase.co",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(isPreview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
