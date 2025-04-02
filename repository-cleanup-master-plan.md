# Repository Cleanup: Master Plan

## Overview

This document serves as the master reference for the PopRev2 repository cleanup initiative. It provides a comprehensive overview of the plan, links to detailed documentation, and serves as the central coordination point for the cleanup effort.

## Goals and Objectives

The primary goals of this repository cleanup are to:

1. **Eliminate Code Duplication**: Consolidate duplicated functionality between `src/` and `apps/`
2. **Clarify Repository Structure**: Establish a clear, logical organization for the codebase
3. **Improve Code Sharing**: Move shared components and utilities to dedicated packages
4. **Enhance Documentation**: Provide clear documentation for all aspects of the codebase
5. **Streamline Deployment**: Simplify and standardize deployment configurations

## Planning Documents

We have created several planning documents to guide the cleanup process:

| Document                                 | Purpose                                               | Link                                                                                       |
| ---------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Repository Cleanup Plan                  | Detailed implementation plan with phases and timeline | [repository-cleanup-plan.md](repository-cleanup-plan.md)                                   |
| Repository Cleanup Next Steps            | Immediate actions to take                             | [repository-cleanup-next-steps.md](repository-cleanup-next-steps.md)                       |
| Repository Cleanup Summary               | Comprehensive summary of the cleanup effort           | [repository-cleanup-summary.md](repository-cleanup-summary.md)                             |
| Repository Cleanup Benefits              | Benefits and improvements from the cleanup            | [repository-cleanup-benefits.md](repository-cleanup-benefits.md)                           |
| Repository Cleanup Risks and Mitigations | Risk assessment and mitigation strategies             | [repository-cleanup-risks-and-mitigations.md](repository-cleanup-risks-and-mitigations.md) |

## Templates

We have created templates to ensure consistency across the repository:

| Template                     | Purpose                                   | Link                                                               |
| ---------------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| README Template              | Template for the repository root README   | [README-template.md](README-template.md)                           |
| App README Template          | Template for app-specific READMEs         | [app-readme-template.md](app-readme-template.md)                   |
| Package README Template      | Template for package-specific READMEs     | [package-readme-template.md](package-readme-template.md)           |
| Sandbox README Template      | Template for the sandbox README           | [sandbox-readme-template.md](sandbox-readme-template.md)           |
| Component Inventory Template | Template for tracking component migration | [component-inventory-template.md](component-inventory-template.md) |

## Target Repository Structure

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
└── content/               # Content files for the applications
```

## Implementation Phases

The cleanup will be implemented in these phases:

### Phase 1: Preparation and Documentation (1-2 days)

- Create directory structure
- Move architecture documents
- Create component inventory
- Set up tracking system

### Phase 2: Shared Package Consolidation (3-5 days)

- Migrate document transformer
- Migrate UI components
- Update app references
- Test functionality

### Phase 3: Sandbox Creation (1-2 days)

- Create sandbox structure
- Migrate example pages
- Update imports
- Rename src to sandbox

### Phase 4: Final Cleanup (1-2 days)

- Remove duplicated code
- Update documentation
- Final testing
- Deployment verification

## Key Components to Migrate

The main components that need to be migrated are:

### From `src/lib/document-transformer/` to `packages/content-transformer/`

- `markdown-transformer.ts`
- `docx-transformer.ts`
- `content-normalizer.ts`
- `metadata-enricher.ts`
- `content-validator.ts`
- `types.ts`

### From `src/components/` to `packages/ui/`

- `document-reader.tsx`
- `document-reader.css`
- `tina-provider.tsx`

### From `src/tina/` to Appropriate Packages

- `schema.ts`
- `queries.ts`

### From `src/app/` to `sandbox/app/`

- `page.tsx`
- `example/page.tsx`
- `test/page.tsx`
- `tina-example/page.tsx`
- Other example pages

## Migration Process

For each component to be migrated:

1. **Analyze**: Review the component to understand its purpose and dependencies
2. **Refactor**: Make any necessary changes to fit the target location
3. **Move**: Use `git mv` to move the component to its new location
4. **Update Imports**: Update all import statements in files that reference the moved component
5. **Test**: Verify that the component works correctly in its new location
6. **Document**: Update documentation to reflect the new location

## Tracking and Coordination

Progress will be tracked using:

1. **Component Inventory**: A document listing all components and their migration status
2. **Regular Updates**: Daily updates on progress and issues
3. **Issue Tracking**: Any issues will be documented and addressed promptly

## Risk Management

Key risks and mitigation strategies:

| Risk                      | Mitigation                                       |
| ------------------------- | ------------------------------------------------ |
| Breaking functionality    | Incremental changes with testing after each step |
| Missing dependencies      | Thorough dependency analysis before migration    |
| Disruption to development | Clear communication and coordination with team   |
| Deployment issues         | Test deployments after each significant change   |

See [repository-cleanup-risks-and-mitigations.md](repository-cleanup-risks-and-mitigations.md) for detailed risk management strategies.

## Success Criteria

The repository cleanup will be considered successful when:

1. All components and utilities are moved to their appropriate locations
2. No code is duplicated between applications
3. All applications function correctly with the new structure
4. All tests pass
5. Deployments work correctly
6. Documentation is complete and accurate
7. Developers understand and can work effectively with the new structure

## Next Steps

The immediate next steps are:

1. **Create Directory Structure**:

   ```bash
   mkdir -p docs/architecture docs/development docs/deployment
   ```

2. **Move Architecture Documents**:

   ```bash
   git mv src/architecture-plan.md docs/architecture/
   git mv src/architecture-plan-updated.md docs/architecture/
   git mv src/lectionary-cms-plan.md docs/architecture/
   ```

3. **Complete Component Inventory**:

   - Fill in the component inventory template
   - Identify all components, utilities, and pages
   - Determine target locations

4. **Begin Package Migration**:
   - Start with the document transformer
   - Move to the content-transformer package
   - Update imports and test

## Conclusion

This repository cleanup is a significant investment in the future of the PopRev2 platform. By establishing a clear, logical structure and eliminating duplication, we'll create a more maintainable, understandable, and efficient codebase.

The planning documents and templates we've created provide a solid foundation for implementing these changes. By following the step-by-step guides and adhering to the principles outlined in these documents, we can ensure a smooth transition to the new structure while maintaining functionality throughout the process.

The benefits of this cleanup—improved organization, reduced duplication, better developer experience, and enhanced collaboration—will far outweigh the temporary disruption caused by the migration process.
