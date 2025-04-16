# Core Package

The Core Package provides the foundation for the UB Ecosystem, including document models, navigation, selection, and extension systems.

## Features

- **Document Model**: Structured representation of documents with sections and paragraphs
- **Navigation System**: Navigate between sections and paragraphs with history tracking
- **Selection System**: Select and highlight text with customizable highlight types
- **Extension System**: Extend functionality with custom extensions
- **Theme System**: Customize the appearance with different themes
- **React Integration**: Context providers and hooks for easy integration with React applications

## Installation

```bash
npm install @ub-ecosystem/core
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { ReaderProvider, useReader, useNavigation, useTheme } from '@ub-ecosystem/core';

// Example document
const document = {
  id: 'example-doc',
  title: 'Example Document',
  contentType: 'standard',
  sections: [
    {
      id: 'section-1',
      title: 'Introduction',
      number: 1,
      paragraphs: [
        {
          id: 'p-1',
          number: 1,
          text: 'This is the first paragraph.',
        },
      ],
    },
  ],
  metadata: {
    author: 'Example Author',
  },
};

// Reader component
const Reader = () => {
  const { document } = useReader();
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <div>
      <h1>{document?.title}</h1>
      <p>Current section: {navigation.getCurrentSection()?.title}</p>
      <p>Current paragraph: {navigation.getCurrentParagraph()?.text}</p>
      <button onClick={() => navigation.navigateToNextParagraph()}>Next Paragraph</button>
    </div>
  );
};

// App component
const App = () => {
  return (
    <ReaderProvider document={document}>
      <Reader />
    </ReaderProvider>
  );
};
```

### UB-Specific Usage

```tsx
import React from 'react';
import { UBReaderProvider, useReader, useNavigation } from '@ub-ecosystem/core';

// UB-specific document
const ubDocument = {
  id: 'ub-doc',
  title: 'The Urantia Book',
  contentType: 'standard',
  part: 1,
  paper: 1,
  // ... other document properties
};

// App component
const App = () => {
  return (
    <UBReaderProvider document={ubDocument}>
      <Reader />
    </UBReaderProvider>
  );
};
```

## API Reference

### Context Providers

#### ReaderProvider

Provides the reader context to all child components.

```tsx
<ReaderProvider
  document={document}
  initialSettings={settings}
  extensions={extensions}
  contentType={contentType}
>
  {children}
</ReaderProvider>
```

#### UBReaderProvider

Provides the UB-specific reader context to all child components.

```tsx
<UBReaderProvider document={ubDocument} initialSettings={ubSettings} extensions={extensions}>
  {children}
</UBReaderProvider>
```

### Hooks

#### useReader

Returns the full reader context.

```tsx
const {
  document,
  navigation,
  selection,
  settings,
  extensions,
  updateSettings,
  loadDocument,
  getDocumentById,
  navigateTo,
  getTheme,
} = useReader();
```

#### useNavigation

Returns the navigation service.

```tsx
const navigation = useNavigation();

// Navigate to next section
navigation.navigateToNextSection();

// Get current section
const currentSection = navigation.getCurrentSection();
```

#### useSelection

Returns the selection service.

```tsx
const selection = useSelection();

// Create a selection
const newSelection = selection.createSelection({
  text: 'Selected text',
  startPosition: { ... },
  endPosition: { ... },
});

// Get all highlights
const highlights = selection.getHighlights();
```

#### useTheme

Returns the theme settings and methods to update them.

```tsx
const { theme, setTheme, setThemeType } = useTheme();

// Change theme type
setThemeType('dark');

// Update theme settings
setTheme({
  primaryColor: '#007bff',
  textColor: '#333',
});
```

#### useDocument

Returns the document and methods to load and retrieve documents.

```tsx
const { document, loadDocument, getDocumentById } = useDocument();

// Load a new document
await loadDocument(newDocument);

// Get a document by ID
const doc = await getDocumentById('document-id');
```

#### useExtensions

Returns the extension registry.

```tsx
const extensions = useExtensions();

// Get all extensions
const allExtensions = extensions.getExtensions();

// Get extension by ID
const extension = extensions.getExtension('extension-id');
```

## Extension System

The extension system allows you to extend the functionality of the reader with custom extensions.

### Creating an Extension

```tsx
import { createExtension, ExtensionType } from '@ub-ecosystem/core';

// Create an extension
const myExtension = createExtension(
  {
    id: 'my-extension',
    name: 'My Extension',
    version: '1.0.0',
    type: ExtensionType.FEATURE,
    description: 'My custom extension',
  },
  (context, api) => {
    // Initialize the extension
    api.registerComponent('header', MyHeaderComponent);
    api.registerHook('afterDocumentLoad', document => {
      console.log('Document loaded:', document);
    });
  },
  () => {
    // Clean up the extension
    console.log('Extension cleaned up');
  }
);
```

### Using Extensions

```tsx
import { ReaderProvider } from '@ub-ecosystem/core';
import { myExtension } from './extensions';

const App = () => {
  return (
    <ReaderProvider document={document} extensions={[myExtension.id]}>
      {children}
    </ReaderProvider>
  );
};
```

## Theme System

The theme system allows you to customize the appearance of the reader.

### Theme Types

- `light`: Light theme
- `dark`: Dark theme
- `sepia`: Sepia theme
- `traditional`: Traditional theme
- `scientific`: Scientific theme
- `custom`: Custom theme

### Customizing Themes

```tsx
import { useTheme, ThemeType } from '@ub-ecosystem/core';

const ThemeSelector = () => {
  const { theme, setTheme, setThemeType } = useTheme();

  return (
    <div>
      <button onClick={() => setThemeType(ThemeType.LIGHT)}>Light</button>
      <button onClick={() => setThemeType(ThemeType.DARK)}>Dark</button>
      <button onClick={() => setThemeType(ThemeType.SEPIA)}>Sepia</button>
      <button
        onClick={() =>
          setTheme({
            primaryColor: '#007bff',
            backgroundColor: '#f8f9fa',
            textColor: '#333',
          })
        }
      >
        Custom
      </button>
    </div>
  );
};
```

## License

MIT
