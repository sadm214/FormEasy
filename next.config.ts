import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Vercel build ke dauran saare TypeScript errors ko ignore kar dega
    ignoreBuildErrors: true,
  },
};

export default nextConfig;