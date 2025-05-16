import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://lyricitriade.com/wp-content/uploads/**')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
