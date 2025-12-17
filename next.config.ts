import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@sanity/ui', '@sanity/icons'],
  serverExternalPackages: ['jsdom'],
  turbopack: {
    resolveAlias: {
      // Add any alias configurations if needed
    },
  },
};

export default nextConfig;
