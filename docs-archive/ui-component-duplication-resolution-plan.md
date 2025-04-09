# UI Component Duplication Resolution Plan

## Current State

The UI package contains duplicated components in multiple locations:

### Document Reader Components

1. **Root directory files**:

   - `packages/ui/src/document-reader.tsx`
   - `packages/ui/src/document-reader.css`

2. **Subdirectory files**:
   - `packages/ui/src/document-reader/document-reader.tsx`
   - `packages/ui/src/document-reader/document-reader.css`
   - `packages/ui/src/document-reader/index.ts`

### TinaCMS Components

1. **Root directory files**:

   - `packages/ui/src/tina-document-loader.tsx`
   - `packages/ui/src/tina-provider.tsx`

2. **Subdirectory files**:
   - `packages/ui/src/tina/tina-document-loader.tsx`
   - `packages/ui/src/tina/tina-provider.tsx`
   - `packages/ui/src/tina/index.ts`

The subdirectory structure is being used for exports:

- `packages/ui/src/index.ts` exports from './tina'
- `packages/ui/src/tina/index.ts` exports the TinaCMS components

### Key Differences

- The root version imports from `@ub-ecosystem/content-transformer`
- The subdirectory version imports from `@poprev/content-transformer/src/types`
- Otherwise, the files are functionally identical

The main package exports are set up to use the subdirectory structure:

- `packages/ui/src/index.ts` exports from './document-reader'
- `packages/ui/src/document-reader/index.ts` exports the DocumentReader component

## Goal

Establish a consistent component structure throughout the UI package by:

1. Keeping the subdirectory structure (which aligns with the package's organization pattern)
2. Removing all duplicate files in the root directory
3. Ensuring the correct import paths are used in all components
4. Applying the same organization pattern to both document-reader and TinaCMS components

## Implementation Plan

### Phase 1: Investigation

1. **Check for direct imports of root files**

   Search for any imports of the root document-reader files throughout the codebase:

   ```bash
   # Search for direct imports of the root document-reader files
   grep -r "from ['\"].*document-reader['\"]" --include="*.ts" --include="*.tsx" ./apps ./packages ./sandbox
   grep -r "import ['\"].*document-reader.css['\"]" --include="*.ts" --include="*.tsx" ./apps ./packages ./sandbox

   # Search for direct imports of the root TinaCMS files
   grep -r "from ['\"].*tina-document-loader['\"]" --include="*.ts" --include="*.tsx" ./apps ./packages ./sandbox
   grep -r "from ['\"].*tina-provider['\"]" --include="*.ts" --include="*.tsx" ./apps ./packages ./sandbox
   ```

2. **Compare the duplicate files to identify differences**

   Compare the root and subdirectory versions of each component:

   ```bash
   # Compare document-reader files
   diff packages/ui/src/document-reader.tsx packages/ui/src/document-reader/document-reader.tsx
   diff packages/ui/src/document-reader.css packages/ui/src/document-reader/document-reader.css

   # Compare TinaCMS files
   diff packages/ui/src/tina-document-loader.tsx packages/ui/src/tina/tina-document-loader.tsx
   diff packages/ui/src/tina-provider.tsx packages/ui/src/tina/tina-provider.tsx
   ```

### Phase 2: Update Import Paths

1. **Update the import paths in the document-reader subdirectory version**

   Modify `packages/ui/src/document-reader/document-reader.tsx`:

   ```diff
   - import { TransformedDocument, DocumentNode } from '@poprev/content-transformer/src/types';
   + import { TransformedDocument, DocumentNode } from '@ub-ecosystem/content-transformer';
   ```

2. **Check and update import paths in the TinaCMS subdirectory files if needed**

   Review and update imports in:

   - `packages/ui/src/tina/tina-document-loader.tsx`
   - `packages/ui/src/tina/tina-provider.tsx`

3. **Update any direct imports found in Phase 1**

   For each file that directly imports the root document-reader files, update the imports to use the subdirectory version:

   ```diff
   - import { DocumentReader } from '@ub-ecosystem/ui/src/document-reader';
   + import { DocumentReader } from '@ub-ecosystem/ui';
   ```

   or

   ```diff
   - import { DocumentReader } from '../../packages/ui/src/document-reader';
   + import { DocumentReader } from '../../packages/ui/src/document-reader/document-reader';
   ```

### Phase 3: Testing Before Removal

1. **Build the UI package**

   ```bash
   cd packages/ui
   npm run build
   ```

2. **Run tests if available**

   ```bash
   cd packages/ui
   npm test
   ```

3. **Verify imports in consuming applications**

   Start the development server for any applications that use the UI package:

   ```bash
   cd apps/reader
   npm run dev
   ```

   Check the browser console for any import errors.

### Phase 4: Remove Duplicate Files

1. **Create a backup of all root files**

   ```bash
   mkdir -p backup/packages/ui/src
   cp packages/ui/src/document-reader.tsx backup/packages/ui/src/
   cp packages/ui/src/document-reader.css backup/packages/ui/src/
   cp packages/ui/src/tina-document-loader.tsx backup/packages/ui/src/
   cp packages/ui/src/tina-provider.tsx backup/packages/ui/src/
   ```

2. **Remove all duplicate root files**

   ```bash
   rm packages/ui/src/document-reader.tsx
   rm packages/ui/src/document-reader.css
   rm packages/ui/src/tina-document-loader.tsx
   rm packages/ui/src/tina-provider.tsx
   ```

### Phase 5: Final Verification

1. **Build the UI package again**

   ```bash
   cd packages/ui
   npm run build
   ```

2. **Run tests again**

   ```bash
   cd packages/ui
   npm test
   ```

3. **Verify applications still work**

   Start the development server for any applications that use the UI package:

   ```bash
   cd apps/reader
   npm run dev
   ```

   Navigate through the application to ensure the document reader component still works correctly.

## Risk Assessment and Mitigation

| Risk                                  | Impact | Likelihood | Mitigation                                                                |
| ------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------- |
| Direct imports of root files exist    | High   | Medium     | Thoroughly search for imports and update them before removing files       |
| Import path update causes type errors | Medium | Low        | Verify types are compatible between packages before updating              |
| Build fails after removing files      | High   | Low        | Create backups of removed files and test builds before committing changes |
| Runtime errors in applications        | High   | Low        | Test applications thoroughly after changes                                |

## Rollback Plan

If issues are encountered:

1. **Restore from backup**

   ```bash
   # Restore document-reader files
   cp backup/packages/ui/src/document-reader.tsx packages/ui/src/
   cp backup/packages/ui/src/document-reader.css packages/ui/src/

   # Restore TinaCMS files
   cp backup/packages/ui/src/tina-document-loader.tsx packages/ui/src/
   cp backup/packages/ui/src/tina-provider.tsx packages/ui/src/
   ```

2. **Revert import path changes**

   Revert any changes made to import paths in the subdirectory version.

## Future Recommendations

1. **Establish component structure guidelines**

   Create documentation that outlines the preferred component structure to prevent similar duplication in the future.

2. **Add linting rules**

   Consider adding linting rules that enforce the preferred component structure.

3. **Review other components for similar issues**

   Apply the same analysis and cleanup to other components in the UI package, such as:

   - search components
   - layout components
