# PopRev2 Deployment Guide

This guide provides information for deploying the PopRev2 platform.

## Deployment Architecture

The PopRev2 platform is designed to be deployed as multiple applications, each with its own deployment:

```
- UB Reader: reader.yourdomain.com
- Scientific Publication: scientific.yourdomain.com
- Lectionary: lectionary.yourdomain.com
- Catechism: catechism.yourdomain.com
- PopRev: poprev.yourdomain.com
- Almanac: almanac.yourdomain.com
```

## Deployment Options

### Vercel Deployment (Recommended)

Vercel is the recommended deployment platform for the PopRev2 applications due to its excellent support for Next.js applications.

#### Prerequisites

- A Vercel account
- Access to the PopRev2 GitHub repository

#### Deployment Steps

For each application you want to deploy:

1. Create a new project in Vercel
2. Connect to your GitHub repository
3. Set the "Root Directory" to the specific app folder (e.g., `apps/reader`)
4. Vercel will automatically detect the framework (Next.js)
5. Configure environment variables as needed
6. Deploy the project

#### Environment Variables

Each application may require specific environment variables. Here are the common ones:

- `NEXT_PUBLIC_API_URL`: The URL of the API server
- `NEXT_PUBLIC_CONTENT_URL`: The URL of the content server
- `NEXT_PUBLIC_PUBLICATION_TYPE`: The type of publication (for the Publications app)

#### Custom Domains

To set up custom domains in Vercel:

1. Go to the project settings
2. Navigate to the "Domains" section
3. Add your custom domain
4. Configure DNS settings as instructed by Vercel

### Other Deployment Options

#### Self-Hosted Deployment

You can also deploy the PopRev2 applications to your own server:

1. Build the application:

   ```bash
   cd apps/reader
   npm run build
   ```

2. Start the application:

   ```bash
   npm start
   ```

3. Use a reverse proxy (like Nginx) to serve the application

#### Docker Deployment

Docker deployment is also supported:

1. Build the Docker image:

   ```bash
   docker build -t poprev2-reader -f apps/reader/Dockerfile .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 poprev2-reader
   ```

## Deployment Configuration

### vercel.json

Each application has its own `vercel.json` file that configures the Vercel deployment:

```json
{
  "redirects": [],
  "rewrites": [{ "source": "/(.*)", "destination": "/$1" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, no-cache, must-revalidate, proxy-revalidate"
        }
      ]
    }
  ],
  "trailingSlash": false
}
```

### next.config.js

Each application also has its own `next.config.js` file that configures the Next.js application:

```javascript
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
```

## Continuous Deployment

### GitHub Actions

You can set up GitHub Actions to automatically deploy your applications when changes are pushed to the repository:

1. Create a `.github/workflows/deploy.yml` file
2. Configure the workflow to deploy the applications when changes are pushed to the main branch
3. Use the Vercel GitHub Action to deploy the applications

### Vercel GitHub Integration

Vercel also provides a GitHub integration that automatically deploys your applications when changes are pushed to the repository:

1. Connect your GitHub repository to Vercel
2. Configure the Vercel project to deploy automatically when changes are pushed to the main branch

## Troubleshooting

### Common Issues

- **Build errors**: Make sure all dependencies are properly configured in the package.json file
- **Environment variable issues**: Check that all required environment variables are set
- **Deployment failures**: Check the Vercel deployment logs for errors

### Getting Help

If you encounter any issues that you can't resolve, please:

1. Check the existing documentation
2. Search for similar issues in the issue tracker
3. Ask for help in the deployment chat
4. Create a new issue with a detailed description of the problem
