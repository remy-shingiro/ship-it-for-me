import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Five 5 MB files plus the quote form fields and multipart overhead.
      bodySizeLimit: "26mb",
    },
  },
};

export default nextConfig;
