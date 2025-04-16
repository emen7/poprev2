# Vercel Fluid Compute Deployment Guide

This guide provides step-by-step instructions for setting up a new Vercel deployment for the UB Reader app using Fluid Compute.

## Prerequisites

- Vercel account with Pro plan (for Fluid Compute)
- GitHub repository connected to Vercel
- Latest code pushed to the repository

## Step 1: Create a New Project in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Name the project (e.g., "ub-reader-new" to distinguish it from the old deployment)

## Step 2: Configure Project Settings

### Basic Settings

- **Framework Preset**: Select "Next.js"
- **Root Directory**: Set to `apps/ub-reader`
- **Build Command**: Leave empty (will use the one from vercel.json)
- **Output Directory**: Leave empty (will use the one from vercel.json)
- **Node.js Version**: Set to 18.x (or the latest LTS version)

### Enable Fluid Compute

- Find the "Compute" section in the project settings
- Toggle "Fluid Compute" to ON
- This will dynamically allocate resources during build time

### Environment Variables

Add the following environment variables:

```
TURBO_REMOTE_ONLY=true
NEXT_TELEMETRY_DISABLED=1
```

Add any other environment variables your app needs.

## Step 3: Configure Deployment Settings

### Production Branch

- Set the production branch to "main" (or your production branch)

### Preview Deployments

- Configure preview branches as needed for development
- Enable automatic deployments for your production branch

### Advanced Settings

- **Build Cache**: Enable to speed up builds
- **Concurrent Builds**: Enable if you have multiple apps in your monorepo
- **Serverless Function Region**: Choose the region closest to your users

## Step 4: Deploy the Project

1. Click "Deploy" to start the deployment process
2. Monitor the build logs for any issues
3. If the build fails, check the logs for specific errors and troubleshoot accordingly

## Step 5: Verify the Deployment

After successful deployment:

1. Visit the deployed URL
2. Verify that the app loads correctly at the root URL
3. Check that the redirect from `/paper/1` to `/` works as expected
4. Test all features of your Core Package implementation

## Troubleshooting

### Build Failures

- **Dependency Issues**: Check if all dependencies are properly installed
- **Memory Errors**: Fluid Compute should handle this, but check if builds are exceeding limits
- **Build Command Errors**: Verify the build command in vercel.json is correct
- **Native Module Errors**: If you see errors related to native modules like better-sqlite3:
  - Ensure `ignore-scripts=true` is set in .npmrc
  - Add `--ignore-scripts` flag to the installCommand in vercel.json
  - This prevents build failures due to C++ compiler version mismatches

### Runtime Errors

- Check browser console for JavaScript errors
- Review server-side logs in Vercel dashboard
- Verify environment variables are correctly set

## Monitoring and Optimization

- Monitor build times and resource usage in Vercel dashboard
- Check Function Logs for runtime performance
- Use Vercel Analytics to track user experience

## Next Steps

- Set up custom domain if needed
- Configure CI/CD pipeline for automated testing before deployment
- Implement monitoring and alerting for production issues

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/solutions/nextjs)
- [Monorepo Deployment Guide](https://vercel.com/blog/monorepos-are-changing-how-teams-build-software)
- [Fluid Compute Documentation](https://vercel.com/docs/concepts/compute/fluid-compute)
