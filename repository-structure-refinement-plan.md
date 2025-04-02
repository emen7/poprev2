# Repository Structure Refinement Plan

Based on our review of the current repository structure and your feedback, this document outlines a plan to further refine the repository structure to better align with best practices and your specific requirements.

## Current Structure Issues

1. **UB Reader JSON Files Location**: The Urantia Book database (`ub-json`) is currently in the `almanac-reference` directory but should be moved to the `apps/reader` directory since it's specifically for the UB Reader application.

2. **Almanac Reference Location**: The `almanac-reference` directory is currently at the root level but might be better nested under the `apps` directory like other applications.

3. **Src Directory**: The `src` directory still exists alongside the new `sandbox` directory, creating potential confusion. We should migrate all content from `src` to appropriate locations and eventually remove it.

## Proposed Changes

### 1. Reorganize Content Files

#### Move UB Reader Database

- Move `almanac-reference/ub-json` to `apps/reader/content/ub-json`
- Update any references to these files in the code

#### Reorganize Almanac Reference

- Move `almanac-reference/ub` to `apps/almanac/content/ub`
- Update any references to these files in the code

### 2. Complete Src Migration

#### Move Components

- Move any remaining components from `src/components` to `packages/ui/src`
- Update imports in all files that reference these components

#### Move Utilities

- Move any remaining utilities from `src/lib` to appropriate packages
- Update imports in all files that reference these utilities

#### Move Pages

- Move any remaining pages from `src/app` to either `sandbox/app` or appropriate application directories in `apps/`
- Update any references to these pages

#### Move Configuration

- Move configuration files from `src` to appropriate locations
- Update any references to these configuration files

### 3. Update Documentation

- Update all documentation to reflect the new structure
- Update any diagrams or references to the directory structure

## Final Directory Structure

```
poprev2/
├── apps/                  # Application implementations
│   ├── reader/            # UB Reader application
│   │   └── content/       # UB Reader content files
│   │       └── ub-json/   # Urantia Book database (moved from almanac-reference)
│   ├── publications/      # Publications application
│   └── almanac/           # Almanac application
│       └── content/       # Almanac content files
│           └── ub/        # Almanac reference files (moved from almanac-reference)
├── packages/              # Shared libraries and components
│   ├── ui/                # Shared UI components
│   ├── content-transformer/ # Document transformation utilities
│   ├── data-models/       # Shared data models
│   ├── reference-parser/  # Reference parsing utilities
│   ├── audio-services/    # Audio playback services
│   └── table-transformer/ # Table transformation utilities
├── sandbox/               # Examples and prototypes (replaces src)
│   ├── app/               # Example pages
│   ├── components/        # Example components
│   └── lib/               # Example utilities
├── docs/                  # Documentation
│   ├── architecture/      # Architecture documentation
│   ├── development/       # Development guides
│   └── deployment/        # Deployment guides
└── content/               # Shared content files
```

## Implementation Approach

### Phase 1: Content Reorganization

1. Create the necessary directory structure in `apps/reader/content` and `apps/almanac/content`
2. Move the content files to their new locations
3. Update any references to these files in the code
4. Test to ensure everything works correctly

### Phase 2: Src Migration

1. Identify all components, utilities, and pages in the `src` directory
2. Create a mapping of where each file should be moved to
3. Move the files to their new locations
4. Update all imports and references
5. Test to ensure everything works correctly

### Phase 3: Cleanup and Documentation

1. Remove the `src` directory once all content has been migrated
2. Remove the `almanac-reference` directory once all content has been migrated
3. Update all documentation to reflect the new structure
4. Create or update diagrams to visualize the new structure

## Benefits of This Approach

1. **Improved Organization**: Each application has its own content directory, making it clear which content belongs to which application.
2. **Simplified Structure**: Removing the `src` directory and moving its content to appropriate locations simplifies the repository structure.
3. **Better Maintainability**: The new structure is more maintainable as it follows standard monorepo practices.
4. **Clearer Separation of Concerns**: The separation between applications, packages, and sandbox is clearer.

## Risks and Mitigations

1. **Breaking Changes**: Moving files could break existing code.

   - **Mitigation**: Carefully update all references and thoroughly test after each move.

2. **Loss of History**: Git history might be lost when moving files.

   - **Mitigation**: Use `git mv` to preserve history when possible.

3. **Deployment Issues**: Changes to the structure might affect deployment.
   - **Mitigation**: Test deployments after making changes.

## Next Steps

1. Review this plan and provide feedback
2. Prioritize the changes based on your needs
3. Create a timeline for implementation
4. Implement the changes in phases
5. Test thoroughly after each phase
