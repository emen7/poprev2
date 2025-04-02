# Src Directory Migration Plan

This document outlines the plan for migrating files from the `src` directory to appropriate locations in the repository.

## Components

| Source                                   | Destination                               | Notes              |
| ---------------------------------------- | ----------------------------------------- | ------------------ |
| src/components/document-reader.tsx       | packages/ui/src/document-reader.tsx       | Already moved      |
| src/components/document-reader.css       | packages/ui/src/document-reader.css       | Already moved      |
| src/components/tina-document-loader.tsx  | packages/ui/src/tina-document-loader.tsx  | Move to UI package |
| src/components/tina-provider.tsx         | packages/ui/src/tina-provider.tsx         | Move to UI package |
| src/components/layout/header.tsx         | packages/ui/src/layout/header.tsx         | Move to UI package |
| src/components/search/search-bar.tsx     | packages/ui/src/search/search-bar.tsx     | Move to UI package |
| src/components/search/search-filters.tsx | packages/ui/src/search/search-filters.tsx | Move to UI package |
| src/components/search/search-results.tsx | packages/ui/src/search/search-results.tsx | Move to UI package |

## Libraries

| Source                        | Destination                       | Notes                            |
| ----------------------------- | --------------------------------- | -------------------------------- |
| src/lib/document-transformer/ | packages/content-transformer/src/ | Already moved                    |
| src/lib/reader-core/          | packages/data-models/src/         | Move to data-models package      |
| src/lib/search/               | packages/reference-parser/src/    | Move to reference-parser package |

## Pages

| Source                           | Destination                          | Notes           |
| -------------------------------- | ------------------------------------ | --------------- |
| src/app/layout.tsx               | sandbox/app/layout.tsx               | Already created |
| src/app/page.tsx                 | sandbox/app/page.tsx                 | Already created |
| src/app/example/                 | sandbox/app/example/                 | Already moved   |
| src/app/test/                    | sandbox/app/test/                    | Already moved   |
| src/app/perplexity-example/      | sandbox/app/perplexity-example/      | Move to sandbox |
| src/app/perplexity-test/         | sandbox/app/perplexity-test/         | Move to sandbox |
| src/app/reader-example/          | sandbox/app/reader-example/          | Move to sandbox |
| src/app/enhanced-reader-example/ | sandbox/app/enhanced-reader-example/ | Move to sandbox |
| src/app/scientific/              | sandbox/app/scientific/              | Move to sandbox |
| src/app/search/                  | sandbox/app/search/                  | Move to sandbox |
| src/app/tina-example/            | sandbox/app/tina-example/            | Move to sandbox |
| src/app/admin/                   | sandbox/app/admin/                   | Move to sandbox |
| src/app/api/                     | sandbox/app/api/                     | Move to sandbox |

## Tina CMS

| Source    | Destination   | Notes           |
| --------- | ------------- | --------------- |
| src/tina/ | sandbox/tina/ | Move to sandbox |

## Implementation Steps

1. Create necessary directories in destination locations
2. Copy files to their new locations
3. Update imports in the copied files
4. Test functionality
5. Remove the src directory once all files have been migrated

## Import Updates

When moving files, we'll need to update imports to reflect the new locations:

- Update relative imports to use the new paths
- Update imports from src/lib/document-transformer to @ub-ecosystem/content-transformer
- Update imports from src/components/document-reader to @ub-ecosystem/ui

## Testing

After migration, we'll need to test:

1. Build the packages
2. Run the sandbox
3. Verify that all examples work correctly
