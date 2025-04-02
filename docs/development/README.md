# PopRev2 Development Guide

This guide provides information for developers working on the PopRev2 platform.

## Development Environment Setup

### Prerequisites

- Node.js 16.x or higher
- npm 9.x or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/poprev2.git
cd poprev2

# Install dependencies
npm install
```

## Repository Structure

The PopRev2 platform is organized as a monorepo using npm workspaces:

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
├── docs/                  # Documentation
└── content/               # Content files for the applications
```

## Development Workflow

### Running Applications

```bash
# Start all applications in development mode
npm run dev

# Start a specific application
npm run dev -- --filter=reader
```

### Building Applications

```bash
# Build all applications
npm run build

# Build a specific application
npm run build -- --filter=reader
```

### Testing

```bash
# Run tests for all packages and applications
npm run test

# Run tests for a specific package or application
npm run test -- --filter=content-transformer
```

### Linting

```bash
# Run linting for all packages and applications
npm run lint

# Run linting for a specific package or application
npm run lint -- --filter=ui
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use proper typing for function parameters and return values
- Avoid using `any` type when possible

### React

- Use functional components with hooks
- Use TypeScript interfaces for component props
- Follow the React component naming convention (PascalCase)
- Keep components small and focused on a single responsibility

### CSS

- Use CSS modules or styled-components for component styling
- Follow BEM naming convention for CSS classes
- Use responsive design principles

### Testing

- Write unit tests for all new code
- Use Jest for testing
- Use React Testing Library for testing React components

## Contributing

### Branch Naming Convention

- `feature/feature-name` for new features
- `bugfix/bug-name` for bug fixes
- `docs/doc-name` for documentation changes
- `refactor/refactor-name` for code refactoring

### Commit Message Convention

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Pull Request Process

1. Ensure all tests pass
2. Update documentation if necessary
3. Get at least one code review
4. Squash commits before merging

## Troubleshooting

### Common Issues

- **Module not found errors**: Make sure all dependencies are installed and the package is properly linked in the monorepo
- **TypeScript errors**: Check that all types are properly defined and imported
- **Build errors**: Make sure all dependencies are properly configured in the package.json file

### Getting Help

If you encounter any issues that you can't resolve, please:

1. Check the existing documentation
2. Search for similar issues in the issue tracker
3. Ask for help in the development chat
4. Create a new issue with a detailed description of the problem
