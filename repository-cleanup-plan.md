# Repository Cleanup Plan

This document outlines the plan for cleaning up the repository structure, eliminating duplications, and establishing a clear, exemplary structure for continued development.

## Current Structure

The repository currently has several areas of duplication and unclear organization:

- `src/` directory contains a Next.js application with components and utilities
- `apps/reader/` contains another Next.js application with similar functionality
- `apps/publications/` and `apps/almanac/` contain separate applications
- `packages/` contains shared libraries, but some functionality may be duplicated in apps

## Target Structure

```
poprev2/
├── apps/                  # Application implementations
│   ├── reader/            # UB Reader application
│   ├── publications/      # Publications application
│   └── almanac/           # Almanac application
├── packages/              # Shared libraries and components
│   ├── ui/                # Shared UI components
│   ├── content-transformer/ # Document transformation utilities
│   ├── data-models/       # Shared data models
│   ├── reference-parser/  # Reference parsing utilities
│   ├── audio-services/    # Audio playback services
│   └── table-transformer/ # Table transformation utilities
├── sandbox/               # Examples and prototypes (renamed from src/)
│   ├── app/               # Example pages
│   ├── components/        # Example components
│   └── lib/               # Example utilities
├── docs/                  # Documentation
│   ├── architecture/      # Architecture documentation
│   ├── development/       # Development guides
│   └── deployment/        # Deployment guides
└── README.md              # Root README with project overview
```

## Implementation Plan

### Phase 1: Preparation and Documentation (1-2 days)

1. **Create Documentation Structure**

   - Create `docs/` directory
   - Move existing architecture plans to `docs/architecture/`
   - Create template README files for each app and package

2. **Document Current State**
   - Create inventory of components and utilities in `src/`
   - Identify duplications between `src/` and `apps/reader/`
   - Document dependencies between components

### Phase 2: Shared Package Consolidation (3-5 days)

1. **Identify Shared Components**

   - Document reader components
   - Document transformation utilities
   - Document data models

2. **Consolidate UI Components**

   - Move shared UI components to `packages/ui`
   - Update imports in all applications
   - Test functionality

3. **Consolidate Utilities**
   - Move document transformation code to `packages/content-transformer`
   - Move reference parsing to `packages/reference-parser`
   - Move data models to `packages/data-models`
   - Update imports and test

### Phase 3: Sandbox Creation (1-2 days)

1. **Prepare Sandbox**

   - Create `sandbox/` directory
   - Document its purpose in README.md

2. **Migrate Valuable Examples**

   - Move example pages from `src/app/` to `sandbox/app/`
   - Move example components from `src/components/` to `sandbox/components/`
   - Move example utilities from `src/lib/` to `sandbox/lib/`

3. **Clean Up Sandbox**
   - Remove unnecessary files
   - Update imports to use shared packages
   - Ensure examples work correctly

### Phase 4: App Cleanup (2-3 days)

1. **Standardize App Structure**

   - Ensure consistent directory structure across apps
   - Implement consistent configuration files
   - Add app-specific README files

2. **Remove Duplications**

   - Remove any remaining duplicated code
   - Ensure all apps use shared packages

3. **Final Testing**
   - Test all applications
   - Verify shared packages work correctly
   - Ensure sandbox examples function properly

### Phase 5: Final Documentation (1 day)

1. **Update Root README**

   - Document repository structure
   - Add getting started guide
   - Explain purpose of each directory

2. **Create Development Guide**

   - Document development workflow
   - Explain how to add new features
   - Provide testing guidelines

3. **Create Deployment Guide**
   - Document deployment process for each app
   - Explain Vercel configuration
   - Provide troubleshooting tips

## Timeline

Total estimated time: 8-13 days

- Phase 1: 1-2 days
- Phase 2: 3-5 days
- Phase 3: 1-2 days
- Phase 4: 2-3 days
- Phase 5: 1 day

## Success Criteria

The repository cleanup will be considered successful when:

1. No code is duplicated between applications
2. All shared functionality is in appropriate packages
3. Each application has a clear purpose and structure
4. Documentation clearly explains the repository organization
5. New developers can easily understand the codebase
6. The sandbox contains working examples that demonstrate best practices
