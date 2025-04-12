# 06-P1-Vercel-Deployment-Strategy

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Deployment Strategy

## 1. Overview

This document outlines the strategy for deploying the UB Ecosystem to Vercel, leveraging your Vercel Pro account. The approach balances local development with cloud deployment, ensuring you can test the application on various devices, including mobile phones.

## 2. Deployment Architecture

### 2.1 Multi-Project Structure

The UB Ecosystem will be deployed as multiple Vercel projects, one for each publication:

```
Vercel Account
├── ub-pub           # Main Urantia Book publication
├── sci-pub          # Scientific publication
├── lectionary-pub   # Lectionary publication
├── catechism-pub    # Catechism publication
├── ubgems-pub       # UB Gems publication
└── alm-new-pub      # New Almanac publication
```

Each publication will be a separate Vercel project but will share the same core codebase.

### 2.2 Monorepo Deployment

The poprev2 repository is structured as a monorepo, which requires specific configuration for Vercel deployment:

```
poprev2/
├── packages/        # Shared packages
│   ├── core/
│   ├── ui-theme/
│   ├── content-format/
│   └── ...
├── apps/            # Publication-specific applications
│   ├── ub-reader/   # UB publication
│   ├── scientific/  # Scientific publication
│   └── ...
└── vercel.json      # Vercel configuration
```

Vercel supports monorepo deployments through its build settings and the `vercel.json` configuration file.

## 3. Deployment Setup

### 3.1 Initial Vercel Project Setup

For each publication, we'll create a Vercel project:

1. **Connect Repository**: Link the poprev2 GitHub repository to Vercel
2. **Configure Build Settings**:
   - Root Directory: `apps/[publication-name]`
   - Build Command: `cd ../.. && npm run build --workspace=apps/[publication-name]`
   - Output Directory: `.next` (for Next.js projects)
3. **Set Environment Variables**:
   - `NEXT_PUBLIC_PUBLICATION_ID`: The ID of the publication (e.g., `ub`, `sci`)
   - `NEXT_PUBLIC_API_URL`: The API URL (if applicable)
   - `NEXT_PUBLIC_BASE_PATH`: The base path for the publication

### 3.2 Vercel Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/ub-reader/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/scientific/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/ub/(.*)",
      "dest": "/apps/ub-reader/$1"
    },
    {
      "src": "/sci/(.*)",
      "dest": "/apps/scientific/$1"
    }
  ]
}
```

This configuration tells Vercel how to build and route requests for each publication.

### 3.3 Domain Configuration

For each publication, configure a custom domain or subdomain:

- `ub.yourdomain.com` for the UB publication
- `sci.yourdomain.com` for the Scientific publication
- etc.

Alternatively, use path-based routing:

- `yourdomain.com/ub` for the UB publication
- `yourdomain.com/sci` for the Scientific publication
- etc.

## 4. Development Workflow

### 4.1 Local Development

For local development:

1. **Run Specific Publication**:

   ```bash
   npm run dev --workspace=apps/ub-reader
   ```

2. **Run Multiple Publications**:

   ```bash
   npm run dev --workspace=apps/ub-reader & npm run dev --workspace=apps/scientific
   ```

3. **Test on Mobile Devices**:
   - Use `ngrok` or similar tool to expose local development server
   - Configure your router to allow access to your development machine
   - Use Vercel Preview Deployments for quick mobile testing

### 4.2 Vercel Preview Deployments

Leverage Vercel's Preview Deployments for testing:

1. **Automatic Preview Deployments**: Every pull request gets a preview deployment
2. **Branch Deployments**: Configure specific branches for preview
3. **Manual Deployments**: Deploy specific commits for testing

Preview deployments are perfect for testing on mobile devices without affecting production.

### 4.3 Production Deployments

For production deployments:

1. **Merge to Main**: Production deployments happen when changes are merged to main
2. **Manual Promotion**: Promote preview deployments to production
3. **Scheduled Deployments**: Set up scheduled deployments for content updates

## 5. Mobile Testing Strategy

### 5.1 Responsive Design Testing

1. **Browser DevTools**: Use browser developer tools for initial responsive testing
2. **Real Device Testing**: Test on actual mobile devices using Vercel deployments
3. **BrowserStack/LambdaTest**: Use these services for testing on multiple devices

### 5.2 Mobile-Specific Considerations

1. **Touch Interactions**: Ensure all interactions work well with touch
2. **Viewport Adjustments**: Handle different viewport sizes and orientations
3. **Performance Optimization**: Optimize for mobile network conditions
4. **Offline Support**: Implement service workers for offline reading

### 5.3 Mobile Testing Checklist

- [ ] Test on iOS (Safari) and Android (Chrome)
- [ ] Verify touch interactions for pullup panel
- [ ] Check text selection and highlighting on mobile
- [ ] Test orientation changes
- [ ] Verify performance on slower connections
- [ ] Test offline functionality

## 6. Vercel Pro Features to Leverage

With your Vercel Pro account, you can take advantage of:

### 6.1 Performance Features

1. **Edge Functions**: Use for dynamic content that needs to be close to users
2. **Image Optimization**: Optimize images for different devices
3. **Analytics**: Monitor performance and usage patterns

### 6.2 Team Collaboration

1. **Team Members**: Add team members for collaboration
2. **Preview Comments**: Comment on specific parts of preview deployments
3. **Protection Passwords**: Protect preview deployments with passwords

### 6.3 Advanced Configuration

1. **Serverless Functions**: Implement API routes for dynamic features
2. **Environment Variables**: Set different variables for different environments
3. **Build Cache**: Speed up builds with caching

## 7. Implementation Plan

### 7.1 Phase 1: Initial Setup (Week 1)

1. Create the basic project structure
2. Set up Vercel projects for ub-pub and sci-pub
3. Configure build settings and environment variables
4. Set up preview deployments

### 7.2 Phase 2: Core Development (Weeks 2-5)

1. Implement core components locally
2. Use preview deployments for regular mobile testing
3. Iterate based on mobile testing feedback

### 7.3 Phase 3: Publication-Specific Development (Weeks 6-8)

1. Implement publication-specific features
2. Set up remaining publication projects on Vercel
3. Configure domains and routing

### 7.4 Phase 4: Production Deployment (Week 9)

1. Final testing on all devices
2. Production deployment of all publications
3. Monitoring and performance optimization

## 8. Conclusion

With your Vercel Pro account, you can effectively develop locally while leveraging cloud deployments for testing and production. This approach gives you the best of both worlds: the control and speed of local development with the accessibility and real-device testing capabilities of cloud deployment.

The multi-project structure allows each publication to be deployed independently while sharing the same core codebase, making maintenance and updates more efficient. Regular preview deployments will ensure you can test the application on your phone and other devices throughout the development process.
