# UB Reader Highlighting Integration Plan

## Current Status

We've successfully created a highlighting package in the monorepo with the following components:

1. **Highlighting Package Structure**

   - Package name: `@ub/highlighting`
   - Source files in `packages/highlighting/src`
   - Compiled files in `packages/highlighting/dist`
   - TypeScript configuration in `packages/highlighting/tsconfig.json`

2. **Integration with UB Reader**

   - Added `@ub/highlighting` as a dependency in `apps/ub-reader/package.json`
   - Added `@ub/highlighting` to the `transpilePackages` array in `apps/ub-reader/next.config.js`
   - Configured TypeScript paths in `config/tsconfig.base.json` to include the highlighting package

3. **Current Issues**
   - Module resolution errors for `@ub/highlighting`
   - CSS loader issues with `style-loader` and other webpack loaders
   - The UB Reader application fails to start due to these issues

## Action Plan

### 1. Fix Module Resolution Issues

The main issue appears to be with the module resolution for the highlighting package. Here's how to fix it:

1. **Install Required Dependencies**

   ```bash
   # From the root directory
   npm install --save-dev style-loader css-loader postcss-loader
   ```

2. **Update Next.js Configuration**
   Modify `apps/ub-reader/next.config.js` to use Next.js's built-in CSS support instead of custom loaders:

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
       '@ub-ecosystem/state-management',
       '@ub/highlighting',
     ],
     experimental: {
       outputFileTracingRoot: '../../',
     },
     async redirects() {
       return [];
     },
   };

   module.exports = nextConfig;
   ```

3. **Update Package References**
   Ensure that all package references use the correct format:
   - In TypeScript imports: `import { HighlightProvider } from '@ub/highlighting';`
   - In CSS imports: `import '@ub/highlighting/dist/styles/highlighting.css';`

### 2. Implement Incremental Integration

To avoid breaking the application, we should implement the highlighting integration incrementally:

1. **Step 1: Basic Integration**

   - First, ensure the application can start without errors
   - Import only the CSS from the highlighting package
   - Don't use any React components or TypeScript imports yet

2. **Step 2: Add HighlightProvider**
   Once the basic integration is working:

   - Add the HighlightProvider to the layout.tsx file
   - Configure it with the appropriate container selector
   - Test that it doesn't break the application

3. **Step 3: Add Highlighting Functionality**
   - Integrate the highlighting functionality with the UBParagraph component
   - Add the useHighlight hook to the PreferencesPanel component
   - Test the highlighting functionality

### 3. Testing and Validation

After each step of the integration, we should test the application to ensure it's working correctly:

1. **Basic Functionality**

   - Ensure the application starts without errors
   - Verify that all pages load correctly
   - Check that the CSS styles are applied correctly

2. **Highlighting Functionality**
   - Test text selection and highlighting
   - Verify that highlights persist across page reloads
   - Test the highlight toggle in the PreferencesPanel

## Conclusion

By following this incremental approach, we can successfully integrate the highlighting package with the UB Reader application while minimizing the risk of breaking changes. The key is to focus on one aspect of the integration at a time and thoroughly test each step before moving on to the next.

Once the integration is complete, we should document the highlighting functionality and provide examples of how to use it in the UB Reader application.
