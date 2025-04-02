# PopRev2 Sandbox

## Overview

The Sandbox is a development playground and demonstration environment for the PopRev2 platform. It contains examples, prototypes, and test implementations that showcase the capabilities of the platform's components and utilities.

## Purpose

The Sandbox serves several important purposes:

1. **Demonstration**: Provides working examples of platform features
2. **Development**: Serves as a testing ground for new components and utilities
3. **Documentation**: Offers practical examples of how to use the platform
4. **Experimentation**: Allows for experimentation with new ideas and approaches

## Examples Included

### Document Transformation Examples

- **Basic Markdown Transformation**: Demonstrates transforming Markdown to the internal document format
- **Scientific Document**: Shows a scientific document using the document reader component

### Reader Component Examples

- **Document Reader**: Demonstrates the document reader component with various content types

## Directory Structure

```
sandbox/
├── app/                  # Next.js app directory with example pages
│   ├── page.tsx          # Home page with links to examples
│   ├── example/          # Basic example page
│   ├── test/             # Scientific document test
│   └── types/            # Type declarations for packages
├── components/           # Example components (to be added)
├── lib/                  # Example utilities (to be added)
├── public/               # Static assets
├── styles/               # CSS and styling
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 9.x or higher

### Installation

From the repository root:

```bash
# Install all dependencies
npm install
```

### Running Examples

From the repository root:

```bash
# Start the sandbox
npm run dev -- --filter=sandbox

# Or from the sandbox directory
cd sandbox
npm run dev
```

Then open your browser to [http://localhost:3000](http://localhost:3000) to see the examples.

## Using the Examples

### As Learning Resources

The examples in the Sandbox are designed to be educational. Each example includes:

- Clear, commented code
- Practical implementations
- Best practices

Study these examples to understand how to use the platform's components and utilities.

### As Starting Points

You can use these examples as starting points for your own implementations:

1. Copy the relevant code from the Sandbox
2. Adapt it to your specific needs
3. Integrate it into your application

### For Testing

The Sandbox is also useful for testing:

- Test new features in isolation
- Verify bug fixes
- Experiment with different approaches

## Contributing New Examples

We encourage adding new examples to the Sandbox:

1. Create a new directory or file for your example
2. Implement your example with clear, commented code
3. Update this README to include your example
4. Submit a pull request

## Relationship to Production Code

The Sandbox is **not** production code. It is meant for demonstration and development purposes only. Production applications should:

1. Use the shared packages from the `packages/` directory
2. Follow the architecture and patterns established in the `apps/` directory
3. Implement proper error handling, testing, and performance optimizations

## Maintenance

The Sandbox should be kept up-to-date with the latest platform features and best practices. When significant changes are made to the platform:

1. Update relevant examples
2. Add new examples for new features
3. Remove outdated examples
4. Update documentation
