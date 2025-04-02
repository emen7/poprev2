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
- **DOCX Transformation**: Shows how to transform DOCX files
- **Perplexity Transformation**: Examples of transforming Perplexity AI responses

### Reader Component Examples

- **Simple Reader**: Basic implementation of the document reader
- **Enhanced Reader**: Advanced reader with navigation and preferences
- **Scientific Reader**: Specialized reader for scientific content

### TinaCMS Integration Examples

- **Basic TinaCMS Setup**: Shows how to integrate TinaCMS
- **Custom Field Types**: Demonstrates custom field types for TinaCMS
- **Content Editing Workflow**: Illustrates the content editing workflow

## Directory Structure

```
sandbox/
├── app/                  # Next.js app directory with example pages
│   ├── page.tsx          # Home page with links to examples
│   ├── example/          # Basic example page
│   ├── test/             # Test implementation
│   ├── perplexity-example/ # Perplexity transformation example
│   └── tina-example/     # TinaCMS integration example
├── components/           # Example components
│   ├── document-reader.tsx # Document reader component
│   └── document-reader.css # Reader styles
├── lib/                  # Example utilities
│   └── document-transformer/ # Document transformation utilities
├── public/               # Static assets
├── styles/               # CSS and styling
├── next.config.ts        # Next.js configuration
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

# Or install only sandbox dependencies
npm install --workspace=sandbox
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

## License

The Sandbox is part of the PopRev2 platform and is licensed under the [LICENSE NAME].
