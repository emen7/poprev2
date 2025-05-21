# UB Ecosystem

A comprehensive monorepo for document transformation, reading, and content management with a focus on accessibility and code quality. This project provides a unified platform for various publications with shared core functionality and customized reading experiences.

## Repository Structure

This monorepo contains multiple applications and shared packages that make up the UB Ecosystem:

```
poprev2/
├── apps/                  # Application implementations
│   ├── ub-reader/         # UB Reader application
│   ├── scientific-reader/ # Scientific Reader application
│   ├── lectionary/        # Lectionary application
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
│   ├── table-transformer/ # Table transformation utilities
│   └── server/            # Server-side functionality for Vercel
├── content/               # Content files for the applications
│   ├── raw/               # Raw content files
│   └── scientific/        # Scientific content
├── config/                # Shared configuration
├── scripts/               # Utility scripts
├── styles/                # Global styles
├── .storybook/           # Storybook configuration
└── docs/                  # Project documentation
```

## Applications

### UB Reader (`apps/ub-reader/`)

The UB Reader is the central application for reading and navigating The Urantia Book. It provides a rich reading experience with features like navigation, search, and user preferences. Built with Next.js, it leverages the shared packages for core functionality.

Key features:

- Document navigation and rendering
- Theme customization (dark, light, sepia, system)
- Responsive design for all device sizes
- Pullup panels for notes, quotes, and search
- Text selection and highlighting
- Audio playback integration
- Offline reading capabilities

### Scientific Reader (`apps/scientific-reader/`)

The Scientific Reader application is designed for scientific content with specialized features for this content type. It shares core functionality with the UB Reader but includes additional features specific to scientific publications.

Key features:

- Scientific content rendering
- Specialized navigation for scientific papers
- Reference management
- Data visualization components
- Citation tools

### Lectionary (`apps/lectionary/`)

The Lectionary application provides access to lectionary content with features tailored for this specific publication type.

### Publications (`apps/publications/`)

The Publications app serves as a hub for various publication types. It shares much of its codebase with the UB Reader but is configured for different content types and presentation styles.

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
- Accessibility utilities

### UI (`packages/ui/`)

The UI package contains shared UI components organized according to our Storybook structure:

- Core components (buttons, toggles, indicators)
- Reader Core components (content rendering, panels)
- Application-specific components
- Example implementations

### Theme System (`packages/theme-system/`)

Provides theming capabilities for all applications:

- Theme definitions with CSS modules
- ThemeProvider with React context
- Theme switching functionality
- Default themes (dark, light, sepia, system)
- Responsive typography
- Accessibility considerations

### Content Transformer (`packages/content-transformer/`)

Utilities for transforming content from various formats into a standardized internal representation:

- Markdown to structured content
- JSON to structured content
- HTML to structured content
- Table parsing and transformation

### Content Storage (`packages/content-storage/`)

Services for storing and retrieving content with caching capabilities:

- Local storage integration
- IndexedDB for offline support
- Content synchronization
- Versioning support

### Data Models (`packages/data-models/`)

Shared data models and types used across the platform:

- Content models
- User preference models
- Annotation models
- TypeScript interfaces and types

### Reference Parser (`packages/reference-parser/`)

Utilities for parsing and handling references within documents:

- Reference detection
- Reference linking
- Citation formatting
- Cross-reference management

### Audio Services (`packages/audio-services/`)

Services for audio playback and management:

- Audio player integration
- Playback controls
- Text-to-speech capabilities
- Audio synchronization with text

### Highlighting (`packages/highlighting/`)

Text highlighting functionality with persistence:

- Text selection
- Highlight creation and management
- Highlight persistence
- Highlight synchronization

### State Management (`packages/state-management/`)

State management utilities with persistence and synchronization:

- User preferences
- Reading position
- Notes and highlights
- Cross-device synchronization

### Table Transformer (`packages/table-transformer/`)

Utilities for transforming and displaying tables in documents:

- Table parsing
- Responsive table rendering
- Table navigation
- Accessibility for tables

### Server (`packages/server/`)

Server-side functionality for Vercel deployments:

- Serverless functions
- API endpoints
- Content transformation services
- Search functionality

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.15.5 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/emen7/poprev2.git
cd poprev2

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

# Lint JavaScript/TypeScript files
pnpm lint:js

# Lint CSS files
pnpm lint:css

# Format code
pnpm format

# Check code formatting
pnpm format:check

# Type check
pnpm type-check

# Type check in watch mode
pnpm type-check:watch

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Start Storybook for UI component development
pnpm storybook
```

### Building

```bash
# Build all applications
pnpm build

# Build with bundle analysis
pnpm build:analyze

# Build a specific application
pnpm build --filter=ub-reader

# Build Storybook static site
pnpm build-storybook

# Clean build artifacts
pnpm clean
```

### Vercel Deployment

The project is configured for deployment on Vercel with separate projects for each publication:

```bash
# Deploy to Vercel (preview)
vercel

# Deploy to Vercel (production)
vercel --prod
```

The `vercel.json` file in the root directory configures the build process, serverless functions, and routing for Vercel deployments.

### Code Quality Tools

This project uses several tools to ensure code quality:

- **ESLint**: Static code analysis for JavaScript/TypeScript
- **Prettier**: Code formatting
- **Stylelint**: CSS linting
- **TypeScript**: Static type checking
- **Vitest**: Unit testing
- **Storybook**: UI component development and testing
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Commit message validation
- **Codecov**: Code coverage reporting

For more details, see the [Code Quality Tools](./CODE_QUALITY.md) documentation.

## Technical Architecture

The UB Ecosystem follows a modular architecture where applications leverage shared packages for common functionality. This approach enables:

- Code reuse across applications
- Consistent user experience
- Isolated testing and development
- Flexible deployment options

The architecture is designed around a core package that provides fundamental functionality, with specialized packages for specific features. Applications integrate these packages to create complete reading experiences tailored to different content types and user needs.

### Monorepo Structure

The project uses a monorepo structure with Turborepo for efficient build and development workflows. This structure allows for:

- Shared code between applications
- Consistent tooling and configuration
- Parallel development of multiple applications
- Efficient CI/CD pipelines

### Storybook Component Organization

UI components are organized in Storybook according to the following structure:

1. **Core** - Basic UI components that are application-agnostic
2. **Reader Core** - Components specific to reader applications but shared across different readers
3. **Applications** - Components specific to individual applications (UB Reader, Scientific Reader, etc.)
4. **Examples** - Complete examples and demos showing integration of components

This organization makes it easier to discover and reuse components across the ecosystem.

### Vercel Deployment Strategy

The project is deployed to Vercel with separate projects for each publication. This approach allows for:

- Independent deployment of each publication
- Custom domains for each publication
- Shared server-side functionality through Vercel Functions
- Optimized performance for each publication

## Implementation Plan

The current implementation is following the UB Ecosystem Implementation Plan, which outlines a four-phase approach:

1. **Foundation**: Core package, theme system, component library, content repository
2. **State Management**: Enhanced state management, notes and quotes, data export/import
3. **Content Services**: Content storage, reference parser, content API
4. **App Integration**: UB Reader app, scientific reader, deployment

## Documentation References

- [Code Quality Tools](./CODE_QUALITY.md)
- [Storybook Structure](./packages/ui/storybook-structure.md)
- [Vercel Deployment Strategy](./06-P1-Vercel-Deployment-Strategy.md)
