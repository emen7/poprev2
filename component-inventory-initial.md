# Component and Utility Inventory - Initial Assessment

This document provides an initial inventory of components and utilities in the `src` directory based on the files visible in the VSCode tabs and environment details. This is a starting point that should be expanded with a complete inventory of all files.

## Components

| Component         | Current Location                   | Target Location | Dependencies                      | Status     | Notes                         |
| ----------------- | ---------------------------------- | --------------- | --------------------------------- | ---------- | ----------------------------- |
| DocumentReader    | src/components/document-reader.tsx | packages/ui     | document-transformer, data-models | To Migrate | Core reader component         |
| DocumentReaderCSS | src/components/document-reader.css | packages/ui     | -                                 | To Migrate | Styles for reader component   |
| TinaProvider      | src/components/tina-provider.tsx   | packages/ui     | tina                              | To Migrate | TinaCMS integration component |

## Utilities

| Utility             | Current Location                                     | Target Location              | Dependencies | Status     | Notes                         |
| ------------------- | ---------------------------------------------------- | ---------------------------- | ------------ | ---------- | ----------------------------- |
| DocumentTransformer | src/lib/document-transformer/                        | packages/content-transformer | -            | To Migrate | Core transformation utilities |
| MarkdownTransformer | src/lib/document-transformer/markdown-transformer.ts | packages/content-transformer | -            | To Migrate | Markdown transformation       |
| DocxTransformer     | src/lib/document-transformer/docx-transformer.ts     | packages/content-transformer | -            | To Migrate | DOCX transformation           |
| ContentNormalizer   | src/lib/document-transformer/content-normalizer.ts   | packages/content-transformer | -            | To Migrate | Content normalization         |
| MetadataEnricher    | src/lib/document-transformer/metadata-enricher.ts    | packages/content-transformer | -            | To Migrate | Metadata enrichment           |
| ContentValidator    | src/lib/document-transformer/content-validator.ts    | packages/content-transformer | -            | To Migrate | Content validation            |
| Types               | src/lib/document-transformer/types.ts                | packages/content-transformer | -            | To Migrate | Type definitions              |

## Example Pages

| Page            | Current Location              | Target Location                   | Dependencies                          | Status     | Notes               |
| --------------- | ----------------------------- | --------------------------------- | ------------------------------------- | ---------- | ------------------- |
| HomePage        | src/app/page.tsx              | sandbox/app/page.tsx              | -                                     | To Migrate | Main example page   |
| ExamplePage     | src/app/example/page.tsx      | sandbox/app/example/page.tsx      | document-transformer, document-reader | To Migrate | Basic example       |
| TestPage        | src/app/test/page.tsx         | sandbox/app/test/page.tsx         | document-transformer, document-reader | To Migrate | Test implementation |
| TinaExamplePage | src/app/tina-example/page.tsx | sandbox/app/tina-example/page.tsx | tina-provider                         | To Migrate | TinaCMS example     |

## Configuration Files

| File           | Current Location   | Target Location        | Dependencies | Status     | Notes                     |
| -------------- | ------------------ | ---------------------- | ------------ | ---------- | ------------------------- |
| next.config.ts | src/next.config.ts | sandbox/next.config.ts | -            | To Migrate | Next.js configuration     |
| eslintrc.json  | src/.eslintrc.json | sandbox/.eslintrc.json | -            | To Migrate | ESLint configuration      |
| init-git.sh    | src/init-git.sh    | sandbox/init-git.sh    | -            | To Migrate | Git initialization script |

## TinaCMS Configuration

| File       | Current Location    | Target Location              | Dependencies | Status     | Notes                      |
| ---------- | ------------------- | ---------------------------- | ------------ | ---------- | -------------------------- |
| schema.ts  | src/tina/schema.ts  | packages/content-transformer | -            | To Migrate | TinaCMS schema definitions |
| queries.ts | src/tina/queries.ts | packages/content-transformer | -            | To Migrate | TinaCMS GraphQL queries    |

## Scripts

| Script       | Current Location         | Target Location              | Dependencies | Status     | Notes                         |
| ------------ | ------------------------ | ---------------------------- | ------------ | ---------- | ----------------------------- |
| init-tina.js | src/scripts/init-tina.js | sandbox/scripts/init-tina.js | -            | To Migrate | TinaCMS initialization script |

## Documentation

| Document                     | Current Location                 | Target Location    | Dependencies | Status     | Notes                      |
| ---------------------------- | -------------------------------- | ------------------ | ------------ | ---------- | -------------------------- |
| architecture-plan.md         | src/architecture-plan.md         | docs/architecture/ | -            | To Migrate | Original architecture plan |
| architecture-plan-updated.md | src/architecture-plan-updated.md | docs/architecture/ | -            | To Migrate | Updated architecture plan  |

## Next Steps to Complete This Inventory

1. **Expand Component List**:

   - Review all files in `src/components/`
   - Document purpose, dependencies, and target location

2. **Expand Utility List**:

   - Review all files in `src/lib/`
   - Document purpose, dependencies, and target location

3. **Expand Page List**:

   - Review all files in `src/app/`
   - Document purpose, dependencies, and target location

4. **Identify Additional Configuration Files**:

   - Review all configuration files in `src/`
   - Document purpose and target location

5. **Analyze Dependencies**:

   - For each component and utility, identify all dependencies
   - Document internal and external dependencies

6. **Prioritize Migration**:

   - Identify components that should be migrated first
   - Create a migration order based on dependencies

7. **Update Status**:
   - As migration progresses, update the status of each item
   - Track any issues or challenges encountered

## Commands to Help Complete the Inventory

Use these commands to help identify all files that need to be included in the inventory:

```bash
# List all components
find src/components -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css"

# List all utilities
find src/lib -type f -name "*.tsx" -o -name "*.ts"

# List all pages
find src/app -type f -name "*.tsx" -o -name "*.ts"

# List all configuration files
find src -maxdepth 1 -type f -name "*.json" -o -name "*.js" -o -name "*.ts"

# List all TinaCMS files
find src/tina -type f -name "*.tsx" -o -name "*.ts"

# List all script files
find src/scripts -type f -name "*.js" -o -name "*.ts" -o -name "*.sh"
```

This inventory will serve as a tracking document for the migration process, ensuring that all components and utilities are properly accounted for and migrated to their appropriate locations.
