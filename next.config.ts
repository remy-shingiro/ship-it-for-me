import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack's filesystem root inside this project when a parent lockfile exists.
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      // Five 5 MB files plus the quote form fields and multipart overhead.
      bodySizeLimit: "26mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
