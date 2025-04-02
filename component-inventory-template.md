# Component and Utility Inventory

This document inventories the components and utilities in the `src` directory that need to be migrated to the appropriate packages or the sandbox.

## Components

| Component              | Current Location                   | Target Location | Dependencies                      | Status     | Notes                         |
| ---------------------- | ---------------------------------- | --------------- | --------------------------------- | ---------- | ----------------------------- |
| DocumentReader         | src/components/document-reader.tsx | packages/ui     | document-transformer, data-models | To Migrate | Core reader component         |
| DocumentReaderCSS      | src/components/document-reader.css | packages/ui     | -                                 | To Migrate | Styles for reader component   |
| TinaProvider           | src/components/tina-provider.tsx   | packages/ui     | tina                              | To Migrate | TinaCMS integration component |
| [Additional Component] | src/components/...                 | packages/...    | ...                               | To Migrate | ...                           |

## Utilities

| Utility              | Current Location                                     | Target Location              | Dependencies | Status     | Notes                         |
| -------------------- | ---------------------------------------------------- | ---------------------------- | ------------ | ---------- | ----------------------------- |
| DocumentTransformer  | src/lib/document-transformer/                        | packages/content-transformer | -            | To Migrate | Core transformation utilities |
| MarkdownTransformer  | src/lib/document-transformer/markdown-transformer.ts | packages/content-transformer | -            | To Migrate | Markdown transformation       |
| DocxTransformer      | src/lib/document-transformer/docx-transformer.ts     | packages/content-transformer | -            | To Migrate | DOCX transformation           |
| ContentNormalizer    | src/lib/document-transformer/content-normalizer.ts   | packages/content-transformer | -            | To Migrate | Content normalization         |
| MetadataEnricher     | src/lib/document-transformer/metadata-enricher.ts    | packages/content-transformer | -            | To Migrate | Metadata enrichment           |
| ContentValidator     | src/lib/document-transformer/content-validator.ts    | packages/content-transformer | -            | To Migrate | Content validation            |
| [Additional Utility] | src/lib/...                                          | packages/...                 | ...          | To Migrate | ...                           |

## Example Pages

| Page              | Current Location              | Target Location                   | Dependencies                          | Status     | Notes               |
| ----------------- | ----------------------------- | --------------------------------- | ------------------------------------- | ---------- | ------------------- |
| HomePage          | src/app/page.tsx              | sandbox/app/page.tsx              | -                                     | To Migrate | Main example page   |
| ExamplePage       | src/app/example/page.tsx      | sandbox/app/example/page.tsx      | document-transformer, document-reader | To Migrate | Basic example       |
| TestPage          | src/app/test/page.tsx         | sandbox/app/test/page.tsx         | document-transformer, document-reader | To Migrate | Test implementation |
| TinaExamplePage   | src/app/tina-example/page.tsx | sandbox/app/tina-example/page.tsx | tina-provider                         | To Migrate | TinaCMS example     |
| [Additional Page] | src/app/...                   | sandbox/app/...                   | ...                                   | To Migrate | ...                 |

## Configuration Files

| File                | Current Location   | Target Location        | Dependencies | Status     | Notes                    |
| ------------------- | ------------------ | ---------------------- | ------------ | ---------- | ------------------------ |
| next.config.ts      | src/next.config.ts | sandbox/next.config.ts | -            | To Migrate | Next.js configuration    |
| eslintrc.json       | src/.eslintrc.json | sandbox/.eslintrc.json | -            | To Migrate | ESLint configuration     |
| tsconfig.json       | src/tsconfig.json  | sandbox/tsconfig.json  | -            | To Migrate | TypeScript configuration |
| package.json        | src/package.json   | sandbox/package.json   | -            | To Migrate | Dependencies and scripts |
| [Additional Config] | src/...            | sandbox/...            | ...          | To Migrate | ...                      |

## TinaCMS Configuration

| File                     | Current Location    | Target Location              | Dependencies | Status     | Notes                      |
| ------------------------ | ------------------- | ---------------------------- | ------------ | ---------- | -------------------------- |
| schema.ts                | src/tina/schema.ts  | packages/content-transformer | -            | To Migrate | TinaCMS schema definitions |
| queries.ts               | src/tina/queries.ts | packages/content-transformer | -            | To Migrate | TinaCMS GraphQL queries    |
| [Additional Tina Config] | src/tina/...        | packages/...                 | ...          | To Migrate | ...                        |

## Scripts

| Script              | Current Location         | Target Location              | Dependencies | Status     | Notes                         |
| ------------------- | ------------------------ | ---------------------------- | ------------ | ---------- | ----------------------------- |
| init-tina.js        | src/scripts/init-tina.js | sandbox/scripts/init-tina.js | -            | To Migrate | TinaCMS initialization script |
| init-git.sh         | src/init-git.sh          | sandbox/init-git.sh          | -            | To Migrate | Git initialization script     |
| [Additional Script] | src/scripts/...          | sandbox/scripts/...          | ...          | To Migrate | ...                           |

## Documentation

| Document                     | Current Location                 | Target Location    | Dependencies | Status     | Notes                      |
| ---------------------------- | -------------------------------- | ------------------ | ------------ | ---------- | -------------------------- |
| architecture-plan.md         | src/architecture-plan.md         | docs/architecture/ | -            | To Migrate | Original architecture plan |
| architecture-plan-updated.md | src/architecture-plan-updated.md | docs/architecture/ | -            | To Migrate | Updated architecture plan  |
| lectionary-cms-plan.md       | src/lectionary-cms-plan.md       | docs/architecture/ | -            | To Migrate | Lectionary CMS plan        |
| README.md                    | src/README.md                    | sandbox/README.md  | -            | To Migrate | README for src directory   |
| README-TINACMS.md            | src/README-TINACMS.md            | docs/development/  | -            | To Migrate | TinaCMS documentation      |
| [Additional Doc]             | src/...                          | docs/...           | ...          | To Migrate | ...                        |

## Migration Process

For each item in this inventory:

1. **Analyze**: Review the component/utility to understand its purpose and dependencies
2. **Refactor**: Make any necessary changes to fit the target location
3. **Move**: Move the item to its target location
4. **Update Imports**: Update all import statements in files that reference the moved item
5. **Test**: Verify that the item works correctly in its new location
6. **Document**: Update documentation to reflect the new location

## Migration Status

- **Not Started**: Item has not been migrated
- **In Progress**: Migration has begun but is not complete
- **Migrated**: Item has been successfully migrated
- **Verified**: Migration has been tested and verified

## Migration Priorities

1. **High Priority**: Core components and utilities needed by multiple applications
2. **Medium Priority**: Supporting components and utilities
3. **Low Priority**: Example pages and documentation

## Dependencies Between Items

[Document any dependencies between items that affect the migration order]

## Known Issues

[Document any known issues or challenges with the migration]
