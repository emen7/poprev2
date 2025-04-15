# poprev2

A comprehensive monorepo for document transformation, reading, and content management with a focus on accessibility and code quality.

## Repository Structure

This monorepo contains multiple applications and shared packages that make up the UB Ecosystem:

```
poprev2/
├── apps/                  # Application implementations
│   ├── ub-reader/         # UB Reader application
│   ├── publications/      # Publications application
│   └── almanac-new/       # Almanac application
├── packages/              # Shared libraries and components
│   ├── core/              # Core functionality and types
│   ├── ui/                # Shared UI components
│   ├── theme-system/      # Theming capabilities
│   ├── content-transformer/ # Document transformation utilities
│   ├── content-storage/   # Content storage and retrieval
│   ├── data-models/       # Shared data models
│   ├── reference-parser/  # Reference parsing utilities
│   ├── audio-services/    # Audio playback services
│   ├── highlighting/      # Text highlighting functionality
│   ├── state-management/  # State management utilities
│   └── table-transformer/ # Table transformation utilities
├── content/               # Content files for the applications
│   ├── raw/               # Raw content files
│   └── scientific/        # Scientific content
├── config/                # Shared configuration
├── scripts/               # Utility scripts
└── styles/                # Global styles
```

## Applications

### UB Reader (`apps/ub-reader/`)

The UB Reader is the central application for reading and navigating content. It provides a rich reading experience with features like navigation, search, and user preferences. Built with Next.js, it leverages the shared packages for core functionality.

Key features:

- Document navigation and rendering
- Theme customization
- Pullup panels for additional content
- Audio playback integration
- Highlighting and notes

### Publications (`apps/publications/`)

The Publications app is used for various publication types. It shares much of its codebase with the UB Reader but is configured for different content types and presentation styles.

### Almanac (`apps/almanac-new/`)

The Almanac application provides access to almanac content with specialized features for this content type.

## Shared Packages

### Core (`packages/core/`)

The core package provides fundamental functionality for reader applications:

- Document model for structured content
- Navigation system for document traversal
- Selection system for text selection and highlighting
- Reader components for content display
- Extension system for plugin architecture

### Theme System (`packages/theme-system/`)

Provides theming capabilities for all applications:

- Theme definitions with CSS modules
- ThemeProvider with React context
- Theme switching functionality
- Default themes (light, dark, traditional)

### Content Transformer (`packages/content-transformer/`)

Utilities for transforming content from various formats into a standardized internal representation.

### Content Storage (`packages/content-storage/`)

Services for storing and retrieving content with caching capabilities.

### Data Models (`packages/data-models/`)

Shared data models and types used across the platform.

### Reference Parser (`packages/reference-parser/`)

Utilities for parsing and handling references within documents.

### Audio Services (`packages/audio-services/`)

Services for audio playback and management.

### Highlighting (`packages/highlighting/`)

Text highlighting functionality with persistence.

### State Management (`packages/state-management/`)

State management utilities with persistence and synchronization.

### Table Transformer (`packages/table-transformer/`)

Utilities for transforming and displaying tables in documents.

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- pnpm 8.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ub-ecosystem.git
cd ub-ecosystem

# Install dependencies
pnpm install
```

### Development

```bash
# Start all applications in development mode
pnpm dev

# Start a specific application
pnpm dev --filter=ub-reader

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check

# Run tests
pnpm test
```

### Building

```bash
# Build all applications
pnpm build

# Build with bundle analysis
pnpm build:analyze

# Build a specific application
pnpm build --filter=ub-reader
```

## Technical Architecture

The UB Ecosystem follows a modular architecture where applications leverage shared packages for common functionality. This approach enables:

- Code reuse across applications
- Consistent user experience
- Isolated testing and development
- Flexible deployment options

The architecture is designed around a core package that provides fundamental functionality, with specialized packages for specific features. Applications integrate these packages to create complete reading experiences tailored to different content types and user needs.

## Implementation Plan

The current implementation is following the [UB Ecosystem Implementation Plan 2025](./16-P1-Implementation-Plan-2025.md), which outlines a four-phase approach:

1. **Foundation**: Core package, theme system, pullup components, content repository
2. **State Management**: Enhanced state management, notes and quotes, data export/import
3. **Content Services**: Content storage, reference parser, content API
4. **App Integration**: UB Reader app, scientific reader, deployment

## Documentation References

- [Code Quality Tools](./CODE_QUALITY.md)
- [Development Tools Guide](./DEV_TOOLS.md)
- [Implementation Plan](./16-P1-Implementation-Plan-2025.md)
