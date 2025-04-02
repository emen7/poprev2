# PopRev2 Platform

A comprehensive ecosystem for document transformation, reading, and content management with TinaCMS integration.

## Repository Structure

This monorepo contains multiple applications and shared packages that make up the PopRev2 platform:

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
├── sandbox/               # Examples and prototypes
│   ├── app/               # Example pages
│   ├── components/        # Example components
│   └── lib/               # Example utilities
├── docs/                  # Documentation
│   ├── architecture/      # Architecture documentation
│   ├── development/       # Development guides
│   └── deployment/        # Deployment guides
└── content/               # Content files for the applications
```

## Applications

### UB Reader (`apps/reader/`)

The UB Reader is the central application for reading and navigating content. It provides a rich reading experience with features like navigation, search, and user preferences.

### Publications (`apps/publications/`)

The Publications app is used for various publication types:

- Scientific
- Lectionary
- Catechism
- PopRev (formerly UBgems/Perplexity)

Each publication type is configured through environment variables and shares the same codebase.

### Almanac (`apps/almanac/`)

The Almanac application provides access to almanac content with specialized features for this content type.

## Shared Packages

### UI Components (`packages/ui/`)

Reusable UI components used across all applications, ensuring a consistent look and feel.

### Content Transformer (`packages/content-transformer/`)

Utilities for transforming content from various formats (Markdown, DOCX) into a standardized internal representation.

### Data Models (`packages/data-models/`)

Shared data models and types used across the platform.

### Reference Parser (`packages/reference-parser/`)

Utilities for parsing and handling references within documents.

### Audio Services (`packages/audio-services/`)

Services for audio playback and management.

### Table Transformer (`packages/table-transformer/`)

Utilities for transforming and displaying tables in documents.

## Sandbox (`sandbox/`)

The sandbox contains examples and prototypes that demonstrate how to use the various components and utilities. It serves as a development playground and documentation through examples.

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/poprev2.git
cd poprev2

# Install dependencies
npm install
```

### Development

```bash
# Start all applications in development mode
npm run dev

# Start a specific application
npm run dev -- --filter=reader
```

### Building

```bash
# Build all applications
npm run build

# Build a specific application
npm run build -- --filter=reader
```

## Deployment

Each application can be deployed separately to Vercel. See the [deployment guide](docs/deployment/vercel-deployment.md) for detailed instructions.

## Documentation

- [Architecture Documentation](docs/architecture/README.md)
- [Development Guide](docs/development/README.md)
- [Deployment Guide](docs/deployment/README.md)

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [LICENSE NAME] - see the LICENSE file for details.
