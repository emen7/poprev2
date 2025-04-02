# Migration Plan for Monorepo Structure

## 1. Moving document-transformer to packages/content-transformer

### Files to Move:

- `src/lib/document-transformer/index.ts` → `packages/content-transformer/src/index.ts`
- `src/lib/document-transformer/types.ts` → `packages/content-transformer/src/types.ts` (already created)
- `src/lib/document-transformer/markdown-transformer.ts` → `packages/content-transformer/src/markdown-transformer.ts`
- `src/lib/document-transformer/docx-transformer.ts` → `packages/content-transformer/src/docx-transformer.ts`
- `src/lib/document-transformer/content-normalizer.ts` → `packages/content-transformer/src/content-normalizer.ts`
- `src/lib/document-transformer/metadata-enricher.ts` → `packages/content-transformer/src/metadata-enricher.ts`
- `src/lib/document-transformer/content-validator.ts` → `packages/content-transformer/src/content-validator.ts`
- `src/lib/document-transformer/__tests__/` → `packages/content-transformer/__tests__/`

### Code Modifications Needed:

1. Update import paths in all files
2. Update types to use the new PublicationType instead of DocumentType where applicable
3. Ensure the package exports all necessary functions and types
4. Update any references to file system paths to be more generic/configurable

## 2. Setting Up Next.js App Structure

### For Each Application (reader, almanac, publications):

#### Basic Structure:

```
apps/[app-name]/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── [app-specific components]
├── lib/
│   └── [app-specific utilities]
├── public/
│   └── [static assets]
├── next.config.js
├── package.json (already created)
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

### Reader App Setup:

1. Create basic app structure
2. Implement paper and section navigation
3. Create reader component using @ub-ecosystem/ui components
4. Set up routing for paper/section navigation

### Almanac App Setup:

1. Create basic app structure
2. Implement lists and tables views
3. Create components for displaying almanac data
4. Set up routing for different almanac sections

### Publications App Setup:

1. Move existing Next.js app structure from src/ to apps/publications/
2. Update import paths to use the new package structure
3. Update TinaCMS configuration to work with the new structure
4. Ensure all publication types are properly supported

## 3. Content Migration Strategy

### Content Directory Structure:

- Keep the current content directory at the root level
- Ensure all applications can access it through relative paths

### Content Processing:

1. Update content processing to use @ub-ecosystem/content-transformer
2. Implement a shared content loading mechanism
3. Create publication-specific content processors as needed

### TinaCMS Integration:

1. Update TinaCMS configuration to work with the new structure
2. Ensure all publication types are properly configured
3. Test content creation and editing for each type

## 4. Implementation Order

1. **Phase 1: Core Packages**

   - Move document-transformer to content-transformer
   - Set up reference-parser with basic functionality
   - Create data-models with shared types
   - Implement basic UI components

2. **Phase 2: Reader App**

   - Set up basic Next.js structure
   - Implement paper/section navigation
   - Create reader component
   - Test with sample UB content

3. **Phase 3: Publications App**

   - Move existing Next.js app
   - Update import paths
   - Test with existing content
   - Ensure TinaCMS integration works

4. **Phase 4: Almanac App**

   - Set up basic Next.js structure
   - Implement lists and tables views
   - Connect to UB data
   - Test with sample almanac content

5. **Phase 5: Integration**
   - Ensure cross-linking between apps works
   - Test reference parsing and linking
   - Implement shared navigation
   - Deploy and test all apps together
