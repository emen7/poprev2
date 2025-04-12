# @ub-ecosystem/core

Core package for the UB Ecosystem, providing fundamental functionality for reader applications.

## Features

- Document model for structured content
- Navigation system for document traversal
- Selection system for text selection and highlighting
- Reader components for content display
- Extension system for plugin architecture

## Installation

```bash
npm install @ub-ecosystem/core
# or
yarn add @ub-ecosystem/core
# or
pnpm add @ub-ecosystem/core
```

## Usage

```tsx
import { ReaderProvider, useReader } from '@ub-ecosystem/core';
import { Document } from '@ub-ecosystem/core/document';

// Initialize the reader with a document
const MyReader = () => {
  return (
    <ReaderProvider document={myDocument}>
      <ReaderContent />
    </ReaderProvider>
  );
};

// Use reader hooks in components
const ReaderContent = () => {
  const { document, navigation } = useReader();

  return (
    <div>
      <h1>{document.title}</h1>
      <div>{document.content}</div>
    </div>
  );
};
```

## Architecture

The core package is organized into the following modules:

- **document**: Document model and related utilities
- **navigation**: Navigation system for document traversal
- **selection**: Text selection and highlighting
- **reader**: Core reader components
- **extension**: Plugin architecture for extensions

## Development

```bash
# Build the package
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT
