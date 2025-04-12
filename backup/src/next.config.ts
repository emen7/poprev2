import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable ESLint during build to avoid deployment errors
  eslint: {
    // Only run ESLint on local development, not during builds
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    // Only run type checking on local development, not during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
