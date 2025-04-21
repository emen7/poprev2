# Decision Log

This document maintains a chronological record of significant architectural and implementation decisions made during the development of the UB Reader application.

## 2025-04-21: Hybrid Development Approach

**Decision**: Implement a two-phase hybrid approach for page structure redesign:

1. Complete essential layout and design aspects in HTML (Phase 1)
2. Implement more complex interactive features directly in React (Phase 2)

**Rationale**:

- Balances efficient design validation with development productivity
- Allows for quick iteration on core layout elements like paragraph numbering
- Avoids duplicating complex interactive feature development
- Provides clear transition points between HTML and React phases
- Maintains focus on visual consistency while leveraging React's strengths

**Implementation**:

- Phase 1 (HTML):
  - Refine paragraph numbering (positioning, styling, alignment)
  - Improve pullup drag behavior (responsiveness, visual feedback)
  - Enhance reading area layout (typography, spacing)
  - Create basic settings UI mockups
- Phase 2 (React):
  - Create core layout components based on HTML prototype
  - Implement advanced interactive features directly in React
  - Add complex state management for settings and content
  - Integrate with existing content system

## 2025-04-20: Page Structure Redesign Approach

**Decision**: Implement a clean page structure design with proper component hierarchy.

**Rationale**:

- Need to address positioning inconsistencies between localhost and Vercel deployment
- Clean component hierarchy improves maintainability and performance
- Consistent structure ensures proper layout across devices
- Simplified approach supports future enhancements

**Implementation**:

- Create paper-1-alpha.html with clean component hierarchy
- Implement permanent title bar, paper bar, and reading area
- Add pullup footer with text-only tabs and drag handle
- Test across environments to ensure consistent positioning

## 2025-04-20: Reading Area Width Constraints

**Decision**: Limit reading area width to 650-700px on desktop for optimal reading experience.

**Rationale**:

- Research indicates this width range is optimal for readability
- Consistent width improves reading experience across devices
- Centered content with constrained width creates a cleaner layout
- Allows for future enhancements like side-docked Notes on desktop

**Implementation**:

- Use CSS max-width property to constrain reading area
- Center the reading area in the viewport
- Maintain consistent width constraints across all views
- Ensure proper padding and margins for readability

## 2025-04-20: Pullup Component Behavior

**Decision**: Implement text-only initial state for pullup component with adjustable height.

**Rationale**:

- Cleaner initial UI with just text labels ("Notes Quotes Settings")
- Reduced visual complexity in the closed state
- Consistent with mobile-first approach
- Allows for future enhancements while maintaining core functionality

**Implementation**:

- Initial closed state shows only text labels without icons
- When clicked, expands to half-height interface
- User can manually adjust height via drag handle
- Future enhancement (deferred): Note expansion via text selection

## 2025-04-20: Suspension of Three-Row Header Work

**Decision**: Temporarily suspend work on the three-row header to focus on basic page structure.

**Rationale**:

- Need to address fundamental structural issues before enhancing specific components
- Current positioning inconsistencies affect all components including the header
- Clean page structure will provide better foundation for header implementation
- Allows for focused development on core reading experience

**Implementation**:

- Implement simplified header structure with Permanent Title Bar and Paper Bar
- Defer Section Bar implementation for future enhancement
- Focus on consistent positioning and width constraints
- Ensure clean integration with reading area

## 2025-04-19: Code Quality Improvement Initiative

**Decision**: Implement comprehensive code quality improvements focusing on standardized interfaces, component hierarchy, CSS modularization, and state management.

**Rationale**:

- Improve maintainability through consistent component interfaces
- Enhance type safety with TypeScript interfaces
- Establish clear component hierarchies for better code organization
- Implement modular CSS approach for better style management
- Leverage React Context for more efficient state management

**Implementation**:

- Created standardized interfaces in types.ts files
- Refactored components to use TypeScript interfaces
- Established proper component hierarchy (e.g., Pullup and EnhancedPullupContainer)
- Modularized CSS for component-specific styling
- Implemented React Context for theme and highlight state management

## 2025-04-19: Adoption of Roo Flow Memory Bank System

**Decision**: Implement the Roo Flow Memory Bank system for persistent project context.

**Rationale**:

- Need to maintain continuity of project knowledge across development sessions
- Better tracking of implementation decisions and progress
- Support for the Boomerang task orchestration pattern

**Implementation**:

- Created Memory Bank directory with four core files
- Integrated with existing Boomerang mode

## 2025-04-19: Three-Row Header Architecture

**Decision**: Implement a modular three-row header design with distinct components for each row.

**Rationale**:

- Separation of concerns for better maintainability
- Distinct styling needs for each header section
- Dynamic behavior required for section title row

**Implementation**:

- Created separate components for each row (TitleRow, PaperRow, SectionRow)
- Dynamic section title tracking with Intersection Observer API
- Shared styles through CSS variables for consistency

## 2025-04-19: Sticky Section Title Implementation

**Decision**: Use Intersection Observer API for tracking current section visibility.

**Rationale**:

- More performant than scroll event listeners
- Provides reliable entry/exit detection
- Better support across modern browsers

**Implementation**:

- Custom useSectionObserver hook
- Additional offset parameter for reliable detection
- Fallback display for introduction sections

## 2025-04-19: Vercel Deployment Strategy

**Decision**: Use monorepo-optimized configuration for Vercel deployment.

**Rationale**:

- Need to deploy only the ub-reader app from the monorepo
- Ensure proper dependency resolution across packages
- Optimize build performance and caching

**Implementation**:

- Configured vercel.json for monorepo setup
- Added specific build settings for dependency management
- Fixed CSS syntax issues that were causing deployment failures

## Earlier Decisions

**Decision**: Adopt monorepo architecture with Turborepo.

**Rationale**:

- Share code between multiple applications
- Maintain consistent versioning and dependencies
- Improve build performance with caching

**Implementation**:

- Set up pnpm workspaces
- Configured Turborepo for optimized builds
- Structured shared packages for core functionality

## 2025-04-19: RooFlow and Boomerang Mode Integration Fix

**Decision**: Standardize Boomerang mode naming to "boomerang-mode" across all configuration files.

**Rationale**:

- Inconsistency discovered between roocode.config.json and .roomodes file naming conventions
- "boomerang" in roocode.config.json vs "boomerang-mode" in .roomodes
- Configuration inconsistency prevented proper integration between RooFlow and Boomerang

**Implementation**:

- Updated references in roocode.config.json from "boomerang" to "boomerang-mode"
- Verified naming consistency across all configuration files
- Maintained all other settings and parameters for the mode

## 2025-04-19: Next.js Serialization Error Resolution

**Decision**: Standardize on the global PullupContext implementation to resolve Next.js serialization errors.

**Rationale**:

- Dual PullupContext implementations (global and local) were causing type mismatches and inconsistencies
- Next.js Server Components architecture requires all props to be serializable
- Function props like `onTabSelect` and `onSettingsChange` were causing serialization errors
- Context inconsistency led to components trying to access missing properties

**Implementation**:

- Standardized on the global PullupContext from `apps/ub-reader/contexts/PullupContext.tsx`
- Updated import paths in components using the local context
- Ensured components in "use client" files use the context directly instead of receiving function props
- Added "use client" directive to components that use the PullupContext
- Established proper component boundaries between server and client components

## 2025-04-19: PullupProvider Export Issue Resolution

**Decision**: Fix the PullupProvider export issue by properly exporting it from the global context.

**Rationale**:

- TraditionalReader component was attempting to import PullupProvider from '../pullup', but it wasn't being exported from that location
- This issue was a result of the PullupContext consolidation where the export structure was changed
- Proper exports are essential for maintaining component interoperability

**Implementation**:

- Updated the import in TraditionalReader.tsx to use the correct path from the global context
- Added proper export of PullupProvider from the barrel file in '../pullup' to maintain backward compatibility
- Ensured consistent naming and export patterns across the codebase
- Verified that all components using PullupProvider have the correct import paths
