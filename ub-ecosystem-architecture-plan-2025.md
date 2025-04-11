# UB Ecosystem Architecture and Implementation Plan 2025

**STATUS: ACTIVE - CURRENT IMPLEMENTATION PLAN**

_This is the current, approved implementation plan for the UB Ecosystem._

Last Updated: April 10, 2025

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Package Structure](#package-structure)
3. [Existing Components to Preserve](#existing-components-to-preserve)
4. [Implementation Phases](#implementation-phases)
   - [Phase 1: Foundation](#phase-1-foundation-weeks-1-2)
   - [Phase 2: State Management](#phase-2-state-management-weeks-3-4)
   - [Phase 3: Content Services](#phase-3-content-services-weeks-5-6)
   - [Phase 4: App Integration](#phase-4-app-integration-weeks-7-8)
5. [Technical Decisions](#technical-decisions)
6. [Future Enhancements](#future-enhancements)

## Architecture Overview

The UB Ecosystem architecture is designed to support multiple reader applications with shared functionality and synchronized settings. The architecture follows these key principles:

1. **Separation of Concerns**: UI components, state management, and content handling are separated into distinct packages
2. **Reusability**: Components are designed to be reused across different reader applications
3. **Extensibility**: The architecture supports extensions for different reader types
4. **Stability**: The design prioritizes long-term stability with minimal updates needed

## Package Structure

```
packages/
├── core/                  # Core reader functionality
│   ├── document/          # Document models
│   ├── navigation/        # Navigation system
│   ├── selection/         # Selection system
│   ├── reader/            # Core reader components
│   └── extension/         # Extension system
├── ui/                    # UI components (presentation-only)
│   ├── components/        # Shared UI components
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── navigation/
│   │   ├── pullup/        # Pullup components
│   │   └── panels/
│   └── layouts/           # Layout components
├── state-management/      # State management
│   ├── contexts/          # React contexts
│   ├── hooks/             # React hooks
│   ├── reducers/          # State reducers
│   ├── sync/              # Synchronization
│   └── types/             # Type definitions
├── theme-system/          # Theme system
│   ├── themes/            # Theme definitions
│   ├── components/        # Theme components
│   └── hooks/             # Theme hooks
├── content-services/      # Content services
│   ├── storage/           # Content storage
│   ├── transformer/       # Content transformation
│   ├── parser/            # Reference parsing
│   └── api/               # Content API
├── utilities/             # Shared utilities
│   ├── formatting/        # Text formatting
│   ├── validation/        # Validation
│   └── persistence/       # Persistence utilities
└── reader-extensions/     # Reader extensions
    ├── scientific/        # Scientific reader extension
    └── publications/      # Publications reader extension
```

## Existing Components to Preserve

These existing components will be preserved and integrated into the new architecture:

### Pullup System

- **PullupPanel**: Sliding panel with draggable handle
- **PullupTabs**: Tab navigation (notes, quotes, settings)
- **PullupContent**: Content area for active tab
- **NotesTab**: Notes management with references
- **QuotesTab**: Quotes collection with references
- **SettingsTab**: Reader settings controls
- **TextSelectionHandler**: Text selection with reference extraction

### Text Selection & Highlighting

- Selection menu with options (add note, save quote, copy)
- Reference extraction in format (paper:section.paragraph)
- Highlighting with multiple colors
- Integration with notes and quotes

### State Management

- PullupContext and usePullup hook
- NotesContext and useNotes hook
- QuotesContext and useQuotes hook
- Settings persistence

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

#### 1.1: Create Core Package

- Document model definition
- Extension system implementation
- Reader context provider

#### 1.2: Create Theme System

- Theme definitions (light, dark)
- ThemeProvider component
- useTheme hook

#### 1.3: Migrate Pullup Components

- Move components to UI package
- Update to use theme system
- Make presentation-only

#### 1.4: Create Central Content Repository

- Organize content files
- Create content index

### Phase 2: State Management (Weeks 3-4)

#### 2.1: Enhance State Management

- Implement localStorage persistence
- Create PullupContext with persistence
- Create hooks for state access

#### 2.2: Implement Notes and Quotes Management

- Create NotesContext with persistence
- Create QuotesContext with persistence
- Implement sorting options

#### 2.3: Implement Data Export/Import

- Create utilities for data export
- Implement data import functionality
- Add JSON download/upload

### Phase 3: Content Services (Weeks 5-6)

#### 3.1: Create Content Services Package

- Implement content storage
- Create content transformers
- Consolidate existing functionality

#### 3.2: Implement Reference Parser

- Create reference parsing utilities
- Implement reference processor
- Add reference extraction

#### 3.3: Create Content API

- Implement unified content API
- Create content service provider
- Add content indexing and search

### Phase 4: App Integration (Weeks 7-8)

#### 4.1: Update UB Reader App

- Update dependencies
- Create app providers
- Implement traditional reader

#### 4.2: Create Scientific Reader

- Implement scientific extension
- Create scientific reader component
- Add scientific-specific features

#### 4.3: Set Up Deployment

- Configure Vercel deployment
- Create API routes for content
- Add deployment documentation

## Technical Decisions

### State Persistence

- Use localStorage for user data (notes, quotes, settings)
- Implement export/import for data portability
- Prepare for future synchronization

### Content Storage

- Centralize content in repository
- Use static JSON files for content
- Implement content indexing for search

### UI Components

- Make UI components presentation-only
- Pass state via props
- Use theme system for styling

### Extension System

- Register extensions via registry
- Provide extension points for customization
- Support different reader types

## Future Enhancements

After completing the core implementation, these enhancements can be considered:

1. **Cross-Device Synchronization**: Add sync code feature for sharing reading position
2. **Advanced Search**: Implement full-text search
3. **User Accounts**: Add optional authentication for persistent storage
4. **Offline Support**: Add service workers for offline reading
5. **Mobile Apps**: Create React Native versions
