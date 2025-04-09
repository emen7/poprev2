# Src Migration Completion Plan

This document outlines the detailed plan for completing the migration of files from the `src` directory to their appropriate locations in the new repository structure.

## Current Status

The `src` directory still contains several components, utilities, and pages that need to be migrated:

- Components in `src/components`
- Utilities in `src/lib`
- Pages in `src/app`
- Configuration files in the root of `src`

## Migration Plan

### Phase 1: Component Migration

1. **Document Reader Components**

   - Verify that `document-reader.tsx` and `document-reader.css` have been properly migrated to `packages/ui/src`
   - Update imports in all files that reference these components

2. **Tina Components**

   - Move `tina-document-loader.tsx` to `packages/ui/src`
   - Move `tina-provider.tsx` to `packages/ui/src`
   - Update imports in all files that reference these components

3. **Layout Components**

   - Move `layout/header.tsx` to `packages/ui/src/layout`
   - Update imports in all files that reference these components

4. **Search Components**
   - Move `search/*.tsx` to `packages/ui/src/search`
   - Update imports in all files that reference these components

### Phase 2: Utility Migration

1. **Document Transformer**

   - Verify that all files in `src/lib/document-transformer` have been properly migrated to `packages/content-transformer/src`
   - Update imports in all files that reference these utilities

2. **Reader Core**

   - Move `src/lib/reader-core` to `packages/data-models/src`
   - Update imports in all files that reference these utilities

3. **Search Utilities**
   - Move `src/lib/search` to `packages/reference-parser/src`
   - Update imports in all files that reference these utilities

### Phase 3: Page Migration

1. **Example Pages**

   - Move `src/app/example` to `sandbox/app/example`
   - Update imports in all files that reference these pages

2. **Test Pages**

   - Move `src/app/test` to `sandbox/app/test`
   - Update imports in all files that reference these pages

3. **Perplexity Pages**

   - Move `src/app/perplexity-example` to `sandbox/app/perplexity-example`
   - Move `src/app/perplexity-test` to `sandbox/app/perplexity-test`
   - Update imports in all files that reference these pages

4. **Reader Pages**

   - Move `src/app/reader-example` to `sandbox/app/reader-example`
   - Move `src/app/enhanced-reader-example` to `sandbox/app/enhanced-reader-example`
   - Update imports in all files that reference these pages

5. **Scientific Pages**

   - Move `src/app/scientific` to `sandbox/app/scientific`
   - Update imports in all files that reference these pages

6. **Search Pages**

   - Move `src/app/search` to `sandbox/app/search`
   - Update imports in all files that reference these pages

7. **Tina Pages**

   - Move `src/app/tina-example` to `sandbox/app/tina-example`
   - Update imports in all files that reference these pages

8. **Admin Pages**

   - Move `src/app/admin` to `sandbox/app/admin`
   - Update imports in all files that reference these pages

9. **API Routes**
   - Move `src/app/api` to `sandbox/app/api`
   - Update imports in all files that reference these routes

### Phase 4: Configuration Migration

1. **Next.js Configuration**

   - Move `src/next.config.ts` to `sandbox`
   - Update any references to this file

2. **ESLint Configuration**

   - Move `src/.eslintrc.json` to `sandbox`
   - Update any references to this file

3. **Tailwind Configuration**

   - Move `src/tailwind.config.js` to `sandbox`
   - Update any references to this file

4. **PostCSS Configuration**

   - Move `src/postcss.config.mjs` to `sandbox`
   - Update any references to this file

5. **TypeScript Configuration**
   - Move `src/tsconfig.json` to `sandbox`
   - Update any references to this file

### Phase 5: Tina CMS Migration

1. **Tina Configuration**
   - Move `src/tina` to `sandbox/tina`
   - Update any references to these files

### Phase 6: Testing and Verification

1. **Build Verification**

   - Run `npm run build` to verify that all packages build correctly
   - Fix any build errors that arise

2. **Sandbox Verification**

   - Run the sandbox to verify that all examples work correctly
   - Fix any runtime errors that arise

3. **Import Verification**
   - Verify that all imports have been updated correctly
   - Fix any import errors that arise

### Phase 7: Src Directory Removal

1. **Final Verification**

   - Verify that all files have been migrated
   - Verify that all imports have been updated
   - Verify that all functionality works correctly

2. **Src Directory Removal**
   - Remove the `src` directory
   - Commit the changes

## Implementation Approach

1. **File-by-File Migration**

   - Migrate one file at a time
   - Update imports immediately after migrating each file
   - Test after each migration to ensure functionality is preserved

2. **Import Updates**

   - Use search and replace to update imports
   - Verify each import update manually
   - Test after each update to ensure functionality is preserved

3. **Testing**
   - Test each component, utility, and page after migration
   - Test the entire application after all migrations are complete
   - Fix any issues that arise

## Timeline

1. **Phase 1: Component Migration** - 1 day
2. **Phase 2: Utility Migration** - 1 day
3. **Phase 3: Page Migration** - 2 days
4. **Phase 4: Configuration Migration** - 1 day
5. **Phase 5: Tina CMS Migration** - 1 day
6. **Phase 6: Testing and Verification** - 2 days
7. **Phase 7: Src Directory Removal** - 1 day

Total estimated time: 9 days

## Risks and Mitigations

1. **Import Errors**

   - Risk: Missing or incorrect import updates
   - Mitigation: Use automated search and replace, followed by manual verification

2. **Functionality Breakage**

   - Risk: Migrated components or utilities not working correctly
   - Mitigation: Test after each migration, fix issues immediately

3. **Build Errors**

   - Risk: Build process failing after migration
   - Mitigation: Run builds frequently during migration, fix issues immediately

4. **Dependency Issues**
   - Risk: Dependencies between components causing circular references
   - Mitigation: Carefully plan the migration order, refactor as needed

## Conclusion

This plan provides a detailed roadmap for completing the migration of files from the `src` directory to their appropriate locations in the new repository structure. By following this plan, we can ensure a smooth transition to the new structure while preserving all functionality.

Once the src migration is complete, we can focus on implementing the UB Reader and developing the publication-specific readers for Scientific, Lectionary, Catechism, and PopRev.
