/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  // ESLint and TypeScript checking configuration
  // For Vercel deployment, set ignoreDuringBuilds and ignoreBuildErrors to true
  // For local development, set them to false to catch errors during build
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL === '1', // Only ignore on Vercel
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL === '1', // Only ignore on Vercel
  },
  // Ensure all @ub-ecosystem packages are transpiled
  transpilePackages: [
    '@ub-ecosystem/ui',
    '@ub-ecosystem/content-transformer',
    '@ub-ecosystem/reference-parser',
    '@ub-ecosystem/data-models',
    '@ub-ecosystem/config',
    '@ub-ecosystem/audio-services',
    '@ub-ecosystem/state-management',
    '@ub-ecosystem/core',
    '@ub-ecosystem/theme-system',
    '@ub/highlighting',
    '@ub-ecosystem/content-storage',
    '@ub-ecosystem/table-transformer',
  ],
  // Performance optimizations
  swcMinify: true,
  compiler: {
    // Enable React compiler optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Image optimization settings
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Ensure we can access the content directory
  experimental: {
    outputFileTracingRoot: '../../',
    // Enable app directory features
    serverActions: true,
  },
  // Override any existing redirects
  async redirects() {
    return [];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
