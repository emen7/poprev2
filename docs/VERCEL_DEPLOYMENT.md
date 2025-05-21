# Vercel Deployment Guide

This document provides an overview of the Vercel deployment strategy for the UB Ecosystem project and guidelines for deploying applications.

## Table of Contents

- [Deployment Architecture](#deployment-architecture)
- [Vercel Configuration](#vercel-configuration)
- [Deployment Workflow](#deployment-workflow)
- [Server-Side Functions](#server-side-functions)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Deployment Architecture

The UB Ecosystem is deployed as multiple Vercel projects, one for each publication:

```
Vercel Account
├── ub-reader           # Main Urantia Book publication
├── scientific-reader   # Scientific publication
├── lectionary          # Lectionary publication
├── publications        # Publications hub
└── almanac-new         # New Almanac publication
```

Each publication is a separate Vercel project but shares the same core codebase. This approach allows for:

- Independent deployment of each publication
- Custom domains for each publication
- Shared server-side functionality through Vercel Functions
- Optimized performance for each publication

## Vercel Configuration

### Root Configuration

The `vercel.json` file in the root directory configures the build process, serverless functions, and routing for Vercel deployments:

```json
{
  "version": 2,
  "buildCommand": "npx turbo run build --filter=ub-reader...",
  "installCommand": "pnpm install",
  "outputDirectory": "apps/ub-reader/.next",
  "public": false,
  "github": {
    "enabled": true,
    "silent": false,
    "autoJobCancelation": true
  },
  "functions": {
    "packages/server/functions/search/index.js": {
      "memory": 1024,
      "maxDuration": 10
    },
    "packages/server/functions/transform/index.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/api/search",
      "destination": "/packages/server/functions/search/index.js"
    },
    {
      "source": "/api/transform",
      "destination": "/packages/server/functions/transform/index.js"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cron/refresh-content",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### Application-Specific Configuration

Each application can have its own Vercel configuration in its directory:

```json
{
  "buildCommand": "cd ../.. && npx turbo run build --filter=ub-reader",
  "outputDirectory": ".next"
}
```

## Deployment Workflow

### Development Workflow

1. **Local Development**:

   ```bash
   pnpm dev --filter=ub-reader
   ```

2. **Preview Deployment**:

   ```bash
   vercel
   ```

3. **Production Deployment**:
   ```bash
   vercel --prod
   ```

### Continuous Integration

The project uses GitHub Actions for continuous integration and deployment:

1. **Pull Request Checks**:

   - Lint
   - Type check
   - Test
   - Build
   - Storybook build

2. **Preview Deployments**:

   - Automatically deployed for each pull request
   - Accessible via a unique URL

3. **Production Deployments**:
   - Automatically deployed when changes are merged to main
   - Can be manually triggered

## Server-Side Functions

The project uses Vercel Functions for server-side functionality:

### Search Function

The search function provides full-text search capabilities for content:

```javascript
// packages/server/functions/search/index.js
export default async function handler(req, res) {
  const { query, publication } = req.query;
  // Search implementation
  res.status(200).json({ results });
}
```

### Transform Function

The transform function converts content from one format to another:

```javascript
// packages/server/functions/transform/index.js
export default async function handler(req, res) {
  const { content, format } = req.body;
  // Transform implementation
  res.status(200).json({ result });
}
```

### Cron Jobs

The project uses Vercel Cron Jobs for scheduled tasks:

```javascript
// packages/server/functions/cron/refresh-content.js
export default async function handler(req, res) {
  // Refresh content implementation
  res.status(200).json({ success: true });
}
```

## Environment Variables

The project uses environment variables for configuration:

### Common Variables

- `NEXT_PUBLIC_API_URL`: The URL of the API
- `NEXT_PUBLIC_ENVIRONMENT`: The environment (development, staging, production)
- `NEXT_PUBLIC_ANALYTICS_ID`: The analytics ID

### Publication-Specific Variables

- `NEXT_PUBLIC_PUBLICATION_ID`: The ID of the publication (ub, sci, etc.)
- `NEXT_PUBLIC_PUBLICATION_NAME`: The name of the publication
- `NEXT_PUBLIC_PUBLICATION_DOMAIN`: The domain of the publication

### Secret Variables

- `API_KEY`: The API key for external services
- `DATABASE_URL`: The URL of the database
- `AUTH_SECRET`: The secret for authentication

## Performance Optimization

The project uses several techniques for performance optimization:

### Next.js Optimization

- **Image Optimization**: Using Next.js Image component
- **Font Optimization**: Using Next.js Font optimization
- **Script Optimization**: Using Next.js Script component

### Vercel Edge Functions

- **Edge Caching**: Using Vercel Edge Caching
- **Edge Middleware**: Using Vercel Edge Middleware
- **Edge Config**: Using Vercel Edge Config

### Content Delivery

- **Static Generation**: Using Next.js Static Generation
- **Incremental Static Regeneration**: Using Next.js ISR
- **Content Delivery Network**: Using Vercel CDN

## Troubleshooting

### Common Issues

#### Build Failures

- **Issue**: Build fails due to missing dependencies
- **Solution**: Ensure all dependencies are installed and properly configured

#### Deployment Failures

- **Issue**: Deployment fails due to environment variables
- **Solution**: Check that all required environment variables are set

#### Function Timeouts

- **Issue**: Serverless functions timeout
- **Solution**: Optimize function performance or increase timeout limit

### Debugging

- **Vercel Logs**: Check Vercel logs for errors
- **Function Logs**: Check function logs for errors
- **Local Testing**: Test functions locally before deployment

### Support

For additional support, contact the development team or refer to the Vercel documentation.
