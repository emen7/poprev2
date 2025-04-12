# Archived Example Pages

This directory contains example pages that were temporarily archived to resolve build issues in the Vercel deployment environment.

## Why were these pages archived?

These example pages were causing build errors due to dependencies that weren't properly resolved in the Vercel build environment. Specifically:

1. The `enhanced-example` page was trying to import from a component that had been moved to the archive directory.
2. The `navigation-example` and `state-management-example` pages were trying to import from the `@ub-ecosystem/state-management` package, which was causing build issues.
3. The `perplexity-example` page was trying to import from paths that didn't exist in the build environment.

## How to restore these pages

To restore these pages, move them back to the `app` directory and resolve the import issues by:

1. Updating import paths to point to the correct locations
2. Ensuring all required dependencies are properly installed and configured
3. Testing locally before deploying to Vercel

## Example pages in this archive

- `enhanced-example`: Demonstrates the Enhanced Reader component with navigation and settings
- `navigation-example`: Demonstrates the navigation system with dual hamburger navigation
- `state-management-example`: Demonstrates the state management architecture
- `perplexity-example`: Demonstrates integration with Perplexity
