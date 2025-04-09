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
  ],
  // Ensure we can access the content directory
  experimental: {
    outputFileTracingRoot: '../../',
  },
  // Override any existing redirects
  async redirects() {
    return [];
  },
  // Configure webpack to handle CSS modules from workspace packages
  webpack: (config, { isServer }) => {
    // Handle CSS modules from workspace packages
    config.module.rules.push({
      test: /\.module\.css$/,
      include: /node_modules\/@ub-ecosystem/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });

    // Handle regular CSS from workspace packages
    config.module.rules.push({
      test: /\.css$/,
      include: /node_modules\/@ub-ecosystem/,
      exclude: /\.module\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Add PostCSS loader for all CSS files
    config.module.rules.push({
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer'],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
