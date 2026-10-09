import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Vercel build ke dauran saare TypeScript errors ko ignore kar dega
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build ke dauran eslint errors ko bhi ignore kar dega
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;