# Repository Cleanup: Quick Reference Guide

## Documents Created

| Document                                                                                   | Purpose                                                 |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| [repository-cleanup-plan.md](repository-cleanup-plan.md)                                   | Detailed implementation plan with phases and timeline   |
| [repository-cleanup-next-steps.md](repository-cleanup-next-steps.md)                       | Immediate actions to take                               |
| [repository-cleanup-summary.md](repository-cleanup-summary.md)                             | Comprehensive summary of the cleanup effort             |
| [repository-cleanup-benefits.md](repository-cleanup-benefits.md)                           | Benefits and improvements from the cleanup              |
| [repository-cleanup-risks-and-mitigations.md](repository-cleanup-risks-and-mitigations.md) | Risk assessment and mitigation strategies               |
| [repository-cleanup-master-plan.md](repository-cleanup-master-plan.md)                     | Master reference document that ties everything together |
| [component-inventory-initial.md](component-inventory-initial.md)                           | Initial inventory of components to migrate              |
| [README-template.md](README-template.md)                                                   | Template for the repository root README                 |
| [app-readme-template.md](app-readme-template.md)                                           | Template for app-specific READMEs                       |
| [package-readme-template.md](package-readme-template.md)                                   | Template for package-specific READMEs                   |
| [sandbox-readme-template.md](sandbox-readme-template.md)                                   | Template for the sandbox README                         |
| [component-inventory-template.md](component-inventory-template.md)                         | Template for tracking component migration               |

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
├── docs/                  # Documentation
└── content/               # Content files for the applications
```

## Implementation Phases

1. **Preparation (1-2 days)**

   - Create directory structure
   - Move architecture documents
   - Complete component inventory

2. **Package Consolidation (3-5 days)**

   - Migrate document transformer
   - Migrate UI components
   - Update app references

3. **Sandbox Creation (1-2 days)**

   - Create sandbox structure
   - Migrate example pages
   - Rename src to sandbox

4. **Final Cleanup (1-2 days)**
   - Remove duplicated code
   - Update documentation
   - Final testing

## Key Components to Migrate

1. **Document Transformer** → `packages/content-transformer/`
2. **Document Reader** → `packages/ui/`
3. **TinaCMS Integration** → appropriate packages
4. **Example Pages** → `sandbox/app/`

## Immediate Next Steps

1. **Create Directory Structure**

   ```bash
   mkdir -p docs/architecture docs/development docs/deployment
   ```

2. **Move Architecture Documents**

   ```bash
   git mv src/architecture-plan.md docs/architecture/
   git mv src/architecture-plan-updated.md docs/architecture/
   git mv src/lectionary-cms-plan.md docs/architecture/
   ```

3. **Complete Component Inventory**

   - Fill in the component inventory template
   - Identify all components, utilities, and pages

4. **Begin Package Migration**
   - Start with the document transformer
   - Move to the content-transformer package

## Migration Process for Each Component

1. **Analyze**: Review purpose and dependencies
2. **Refactor**: Make necessary changes
3. **Move**: Use `git mv` to move files
4. **Update Imports**: Update all references
5. **Test**: Verify functionality
6. **Document**: Update documentation

## Key Benefits

1. **Improved Code Organization**: Clear separation of concerns
2. **Reduced Duplication**: Single source of truth for shared code
3. **Better Developer Experience**: Faster onboarding, reduced cognitive load
4. **Enhanced Collaboration**: Clear ownership, parallel development
5. **Improved Deployment**: Independent deployments, simplified configuration

## Risk Mitigation

1. **Breaking Functionality**: Incremental changes with testing
2. **Missing Dependencies**: Thorough dependency analysis
3. **Disruption to Development**: Clear communication and coordination
4. **Deployment Issues**: Test deployments after changes

## Success Criteria

1. No code duplication between applications
2. All applications function correctly
3. All tests pass
4. Deployments work correctly
5. Documentation is complete and accurate
6. Developers understand the new structure

## Useful Commands

```bash
# Create directory structure
mkdir -p docs/architecture docs/development docs/deployment

# Move files
git mv src/file.ts packages/package-name/src/

# Find components
find src/components -type f -name "*.tsx" -o -name "*.ts"

# Find utilities
find src/lib -type f -name "*.tsx" -o -name "*.ts"

# Test after changes
npm run test -- --filter=package-name

# Run specific app
npm run dev -- --filter=app-name
```

## Reference

For more detailed information, refer to the [repository-cleanup-master-plan.md](repository-cleanup-master-plan.md) document.
