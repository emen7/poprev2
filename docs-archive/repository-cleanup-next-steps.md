# Repository Cleanup: Next Steps

This document outlines the immediate next steps to begin implementing the repository cleanup plan.

## Phase 1: Initial Setup (1-2 days)

### Step 1: Create Directory Structure

1. Create a `docs` directory in the repository root:

   ```bash
   mkdir -p docs/architecture docs/development docs/deployment
   ```

2. Move existing architecture documents to the docs directory:

   ```bash
   git mv src/architecture-plan.md docs/architecture/
   git mv src/architecture-plan-updated.md docs/architecture/
   git mv src/lectionary-cms-plan.md docs/architecture/
   ```

3. Create a `sandbox` directory (we'll rename `src` to this later):
   ```bash
   mkdir sandbox
   ```

### Step 2: Create Documentation

1. Customize and finalize the README templates:

   - Review and update `README-template.md` for the repository root
   - Review and update `app-readme-template.md` for each app
   - Review and update `package-readme-template.md` for each package
   - Review and update `sandbox-readme-template.md` for the sandbox

2. Create the final README files:

   ```bash
   cp README-template.md README.md
   cp app-readme-template.md apps/reader/README.md
   cp app-readme-template.md apps/publications/README.md
   cp app-readme-template.md apps/almanac/README.md
   cp package-readme-template.md packages/ui/README.md
   cp package-readme-template.md packages/content-transformer/README.md
   # ... repeat for other packages
   ```

3. Customize each README file with app/package-specific information

### Step 3: Create Component Inventory

1. Use the `component-inventory-template.md` to create a detailed inventory:

   ```bash
   cp component-inventory-template.md component-inventory.md
   ```

2. Fill in the inventory with all components, utilities, and pages from the `src` directory:

   - Review all files in `src/components/`
   - Review all files in `src/lib/`
   - Review all files in `src/app/`
   - Review all files in `src/tina/`
   - Review all configuration files

3. Determine the appropriate target location for each item

## Phase 2: Package Consolidation (3-5 days)

### Step 1: Prepare Shared Packages

1. Review the structure of existing packages:

   ```bash
   ls -la packages/*/
   ```

2. Ensure each package has the necessary structure:

   ```bash
   mkdir -p packages/content-transformer/src
   mkdir -p packages/content-transformer/dist
   mkdir -p packages/content-transformer/tests
   # ... repeat for other packages as needed
   ```

3. Update package.json files with appropriate dependencies and scripts

### Step 2: Migrate Document Transformer

1. Move the document transformer code to the content-transformer package:

   ```bash
   git mv src/lib/document-transformer/* packages/content-transformer/src/
   ```

2. Update imports and exports to match the package structure

3. Test the migrated code:
   ```bash
   cd packages/content-transformer
   npm run test
   ```

### Step 3: Migrate UI Components

1. Move shared UI components to the UI package:

   ```bash
   git mv src/components/document-reader.tsx packages/ui/src/
   git mv src/components/document-reader.css packages/ui/src/
   # ... move other shared components
   ```

2. Update imports and exports to match the package structure

3. Test the migrated components:
   ```bash
   cd packages/ui
   npm run test
   ```

### Step 4: Update App References

1. Update imports in the reader app to use the shared packages:

   ```typescript
   // Before
   import { DocumentReader } from '../../components/document-reader';

   // After
   import { DocumentReader } from '@ub-ecosystem/ui';
   ```

2. Update imports in the publications app

3. Update imports in the almanac app

4. Test all apps to ensure they work with the shared packages:
   ```bash
   npm run dev -- --filter=reader
   ```

## Phase 3: Sandbox Creation (1-2 days)

### Step 1: Prepare Sandbox Structure

1. Create the necessary directories in the sandbox:

   ```bash
   mkdir -p sandbox/app sandbox/components sandbox/lib sandbox/public sandbox/styles
   ```

2. Copy configuration files to the sandbox:
   ```bash
   cp src/next.config.ts sandbox/
   cp src/.eslintrc.json sandbox/
   cp src/tsconfig.json sandbox/
   cp src/package.json sandbox/
   # ... copy other configuration files
   ```

### Step 2: Migrate Example Pages

1. Move example pages to the sandbox:

   ```bash
   git mv src/app/page.tsx sandbox/app/
   git mv src/app/example/ sandbox/app/
   git mv src/app/test/ sandbox/app/
   git mv src/app/tina-example/ sandbox/app/
   # ... move other example pages
   ```

2. Update imports to use the shared packages:

   ```typescript
   // Before
   import { transformDocument } from '../../lib/document-transformer';

   // After
   import { transformDocument } from '@ub-ecosystem/content-transformer';
   ```

3. Test the sandbox:
   ```bash
   cd sandbox
   npm run dev
   ```

### Step 3: Rename src to sandbox

1. Ensure all valuable code has been migrated from src

2. Rename the src directory to sandbox-old:

   ```bash
   git mv src sandbox-old
   ```

3. Rename the sandbox directory to src:

   ```bash
   git mv sandbox src
   ```

4. Update any references to the old directory structure

## Phase 4: Final Cleanup (1-2 days)

### Step 1: Remove Duplicated Code

1. Identify any remaining duplicated code

2. Consolidate or remove duplicated code

3. Update references to use the consolidated code

### Step 2: Update Documentation

1. Finalize all README files

2. Create additional documentation as needed

3. Update the repository-cleanup-plan.md to reflect the completed work

### Step 3: Final Testing

1. Test all applications:

   ```bash
   npm run dev
   ```

2. Verify that all functionality works correctly

3. Fix any issues that arise

## Next Immediate Actions

1. **Create the docs directory structure**
2. **Complete the component inventory**
3. **Begin migrating the document transformer to packages/content-transformer**

These steps will initiate the cleanup process and provide a solid foundation for the rest of the work.
