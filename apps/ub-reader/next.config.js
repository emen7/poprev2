/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ub-ecosystem/ui',
    '@ub-ecosystem/content-transformer',
    '@ub-ecosystem/reference-parser',
    '@ub-ecosystem/data-models',
    '@ub-ecosystem/config',
    '@ub-ecosystem/audio-services',
    '@ub-ecosystem/state-management',
    '@ub/highlighting',
  ],
  // Ensure we can access the content directory
  experimental: {
    outputFileTracingRoot: '../../',
  },
  // Override any existing redirects
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
