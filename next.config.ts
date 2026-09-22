import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use a separate output dir for e2e production runs so `next build` does not
  // clobber the `.next` cache while `next dev` is running locally.
  distDir: process.env.NEXT_E2E === "1" ? ".next-e2e" : ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lyricitriade.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
