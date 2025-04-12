# 07-P1-Vercel-Cleanup-Plan

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Deployment Preparation

## 1. Overview

This document outlines a plan for cleaning up existing Vercel deployments and setting up fresh deployments for the new UB Ecosystem architecture. This will resolve the current issue where Vercel attempts to deploy outdated configurations whenever changes are pushed to the repository.

## 2. Current Issues

The repository appears to have outdated Vercel configurations that are causing deployment failures. This could be due to:

1. Outdated `vercel.json` configuration
2. Previous project settings that no longer match the repository structure
3. Build commands that reference files or directories that no longer exist
4. Environment variables that are no longer valid

## 3. Cleanup Strategy

### 3.1 Inventory Current Deployments

Before making changes, take inventory of existing deployments:

1. **List All Projects**:

   - Log into the Vercel dashboard
   - Note all projects connected to the poprev2 repository
   - Document their current settings (build commands, environment variables, etc.)

2. **Identify Deployment Issues**:
   - Check deployment logs for specific error messages
   - Identify which configurations are causing failures

### 3.2 Remove Outdated Configurations

1. **Remove `vercel.json`** (if it exists):

   ```bash
   git rm vercel.json
   git commit -m "Remove outdated Vercel configuration"
   git push
   ```

2. **Disconnect Repository from Vercel Projects**:

   - In the Vercel dashboard, go to each project
   - Navigate to Settings > Git
   - Click "Disconnect" to disconnect the repository

3. **Delete Outdated Projects** (Optional):
   - If these projects won't be needed again, delete them
   - In the Vercel dashboard, go to each project
   - Navigate to Settings > Advanced
   - Click "Delete Project"

### 3.3 Clean Up Repository

1. **Remove Deployment-Specific Files**:

   - Remove any `.vercel` directories
   - Remove any deployment-specific configuration files

2. **Update `.gitignore`**:

   - Ensure `.vercel` is in your `.gitignore` file

   ```
   # Vercel
   .vercel
   ```

3. **Commit Changes**:
   ```bash
   git add .gitignore
   git commit -m "Update .gitignore to exclude Vercel files"
   git push
   ```

## 4. Setting Up Fresh Deployments

### 4.1 Create New Vercel Projects

Create new projects for each publication:

1. **UB Publication (ub-pub)**:

   - Go to Vercel dashboard
   - Click "Add New" > "Project"
   - Import the poprev2 repository
   - Name the project "ub-pub"

2. **Scientific Publication (sci-pub)**:
   - Repeat the process
   - Name the project "sci-pub"

### 4.2 Configure Project Settings

For each project, configure the appropriate settings:

1. **Framework Preset**:

   - Select "Next.js" as the framework

2. **Root Directory**:

   - For ub-pub: `apps/ub-reader`
   - For sci-pub: `apps/scientific`

3. **Build Command**:

   - For ub-pub: `cd ../.. && npm run build --workspace=apps/ub-reader`
   - For sci-pub: `cd ../.. && npm run build --workspace=apps/scientific`

4. **Output Directory**:

   - `.next` (default for Next.js)

5. **Environment Variables**:
   - `NEXT_PUBLIC_PUBLICATION_ID`: `ub` or `sci`
   - Any other required variables

### 4.3 Create New Vercel Configuration

Create a minimal `vercel.json` file in the root directory:

```json
{
  "version": 2,
  "buildCommand": null,
  "devCommand": null,
  "installCommand": null,
  "outputDirectory": null,
  "public": false,
  "github": {
    "enabled": false
  }
}
```

This minimal configuration disables automatic deployments from GitHub, allowing you to control which projects deploy when changes are pushed.

### 4.4 Set Up Project-Specific Configurations

In each project directory, create a `vercel.json` file:

For `apps/ub-reader/vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "cd ../.. && npm run build --workspace=apps/ub-reader",
  "outputDirectory": ".next"
}
```

For `apps/scientific/vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "cd ../.. && npm run build --workspace=apps/scientific",
  "outputDirectory": ".next"
}
```

### 4.5 Commit and Push Changes

```bash
git add apps/ub-reader/vercel.json apps/scientific/vercel.json vercel.json
git commit -m "Add project-specific Vercel configurations"
git push
```

## 5. Testing Deployments

### 5.1 Manual Deployments

Initially, use manual deployments to verify everything works:

1. **Deploy from Dashboard**:

   - Go to each project in the Vercel dashboard
   - Click "Deploy"

2. **Verify Deployment**:
   - Check that the deployment completes successfully
   - Test the deployed application

### 5.2 Set Up Automatic Deployments

Once manual deployments are working:

1. **Enable GitHub Integration**:

   - In each project's settings, go to Git
   - Connect to the repository
   - Configure production branch (e.g., main)
   - Set up preview branches if desired

2. **Update Root `vercel.json`**:

   ```json
   {
     "version": 2,
     "public": false,
     "github": {
       "enabled": true,
       "silent": false
     }
   }
   ```

3. **Commit and Push**:
   ```bash
   git add vercel.json
   git commit -m "Enable automatic deployments"
   git push
   ```

## 6. Monitoring and Maintenance

### 6.1 Monitor Deployments

After setting up fresh deployments:

1. **Check Deployment Logs**:

   - Monitor logs for any issues
   - Address problems as they arise

2. **Set Up Notifications**:
   - Configure deployment notifications
   - Get alerted on deployment failures

### 6.2 Regular Maintenance

Establish a maintenance routine:

1. **Clean Up Old Deployments**:

   - Periodically remove old preview deployments
   - Keep deployment history manageable

2. **Update Configurations**:
   - Update Vercel configurations as project structure changes
   - Keep build commands and environment variables current

## 7. Conclusion

By following this cleanup plan, you'll resolve the current deployment issues and set up a clean, well-organized deployment structure for the new UB Ecosystem architecture. This approach separates the deployments for different publications while maintaining a unified codebase, allowing for efficient development and deployment.

Once the cleanup is complete, you can proceed with implementing the architecture as outlined in the previous documents, with confidence that your Vercel deployments will work correctly.
