# 03-P1-ContentFormat: System Specification

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Content Format System

## 1. Overview

The Content Format System is responsible for controlling how UB content is displayed to users. It provides two primary formatting options:

1. **Traditional Format**: The standard formatting used in most online UB readers
2. **Modern Format**: Enhanced formatting with improved lists, emphasis, and typography as described in modern-theme-project-notes.txt

This system is separate from the UI Theme system, which handles the visual styling of the interface (light/dark mode, colors, etc.).

## 2. Directory Structure

```
packages/
└── content-format/
    ├── formats/            # Format definitions
    │   ├── traditional.ts  # Traditional format
    │   └── modern.ts       # Modern format
    ├── components/         # Format components
    │   ├── FormatProvider/ # Format provider component
    │   ├── FormatToggle/   # Format toggle component
    │   └── renderers/      # Content renderers
    │       ├── Paragraph/  # Paragraph renderer
    │       ├── List/       # List renderer
    │       ├── Table/      # Table renderer
    │       └── Emphasis/   # Emphasis renderer
    ├── hooks/              # Format hooks
    │   └── useContentFormat.ts # Main format hook
    ├── transformers/       # Content transformers
    │   ├── listTransformer.ts  # List formatting
    │   ├── tableTransformer.ts # Table formatting
    │   └── emphasisTransformer.ts # Emphasis formatting
    ├── storage/            # Format persistence
    │   └── formatStorage.ts # Local storage utilities
    └── index.ts            # Public API exports
```

## 3. Component Specifications

### 3.1 Format Definitions

The format definitions provide the rules for how content should be displayed in each format.

#### 3.1.1 Key Interfaces

```typescript
interface ContentFormat {
  id: string;
  name: string;
  description: string;

  // Typography settings
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      small: string;
      large: string;
    };
    lineHeight: number;
    paragraphSpacing: string;
  };

  // Emphasis settings
  emphasis: {
    italic: {
      fontStyle: string;
      fontWeight?: string;
    };
    bold: {
      fontWeight: string;
    };
    uppercase: {
      textTransform: string;
      letterSpacing?: string;
    };
    smallcaps: {
      fontVariant: string;
    };
  };

  // List settings
  lists: {
    indentation: string;
    bulletStyle: string;
    numberStyle: string;
    spacing: string;
    alignment: 'traditional' | 'modern';
  };

  // Table settings
  tables: {
    borderStyle: string;
    cellPadding: string;
    headerStyle: {
      fontWeight: string;
      backgroundColor?: string;
    };
    alignment: 'traditional' | 'modern';
  };

  // Paragraph settings
  paragraphs: {
    indentation: string;
    firstLineIndent: string;
    spacing: string;
    sectionBreakIndicator: 'space' | 'line' | 'none';
  };

  // Reference settings
  references: {
    style: 'parentheses' | 'superscript' | 'inline';
    format: 'long' | 'short';
  };
}
```

#### 3.1.2 Default Formats

```typescript
// Traditional Format
const traditionalFormat: ContentFormat = {
  id: 'traditional',
  name: 'Traditional',
  description: 'Standard formatting used in most online UB readers',

  typography: {
    fontFamily: 'Georgia, serif',
    fontSize: {
      base: '16px',
      small: '14px',
      large: '18px',
    },
    lineHeight: 1.6,
    paragraphSpacing: '1em',
  },

  emphasis: {
    italic: {
      fontStyle: 'italic',
    },
    bold: {
      fontWeight: 'bold',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    smallcaps: {
      fontVariant: 'small-caps',
    },
  },

  lists: {
    indentation: '2em',
    bulletStyle: '•',
    numberStyle: 'decimal',
    spacing: '0.5em',
    alignment: 'traditional', // Numbers and text in paragraph form
  },

  tables: {
    borderStyle: 'none',
    cellPadding: '0.5em',
    headerStyle: {
      fontWeight: 'bold',
    },
    alignment: 'traditional', // Tables as paragraphs with dots
  },

  paragraphs: {
    indentation: '0',
    firstLineIndent: '1.5em',
    spacing: '1em',
    sectionBreakIndicator: 'space',
  },

  references: {
    style: 'parentheses',
    format: 'long',
  },
};

// Modern Format
const modernFormat: ContentFormat = {
  id: 'modern',
  name: 'Modern',
  description: 'Enhanced formatting with improved lists and emphasis',

  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: {
      base: '16px',
      small: '14px',
      large: '18px',
    },
    lineHeight: 1.6,
    paragraphSpacing: '1.2em',
  },

  emphasis: {
    italic: {
      fontStyle: 'italic',
      fontWeight: '500', // Slightly bolder italics
    },
    bold: {
      fontWeight: 'bold',
    },
    uppercase: {
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    smallcaps: {
      fontVariant: 'small-caps',
    },
  },

  lists: {
    indentation: '2em',
    bulletStyle: '•',
    numberStyle: 'decimal',
    spacing: '0.75em',
    alignment: 'modern', // Numbers aligned, text aligned
  },

  tables: {
    borderStyle: '1px solid rgba(0,0,0,0.1)',
    cellPadding: '0.75em',
    headerStyle: {
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    alignment: 'modern', // Proper table formatting
  },

  paragraphs: {
    indentation: '0',
    firstLineIndent: '1.5em',
    spacing: '1.2em',
    sectionBreakIndicator: 'line', // Faint line for section breaks
  },

  references: {
    style: 'parentheses',
    format: 'long',
  },
};
```

### 3.2 Format Provider

The Format Provider is a React component that provides the current content format to all child components.

#### 3.2.1 Component Interface

```typescript
interface FormatProviderProps {
  children: React.ReactNode;
  initialFormat?: 'traditional' | 'modern';
}

function FormatProvider({
  children,
  initialFormat = 'traditional',
}: FormatProviderProps): JSX.Element;
```

#### 3.2.2 Format Context

```typescript
interface FormatContextValue {
  format: ContentFormat;
  formatType: 'traditional' | 'modern';
  setFormat: (format: 'traditional' | 'modern') => void;
  toggleFormat: () => void;
}

const FormatContext = React.createContext<FormatContextValue | undefined>(undefined);
```

### 3.3 Content Renderers

#### 3.3.1 Paragraph Renderer

```typescript
interface ParagraphRendererProps {
  paragraph: Paragraph;
  reference?: Reference;
}

function ParagraphRenderer({ paragraph, reference }: ParagraphRendererProps): JSX.Element;
```

#### 3.3.2 List Renderer

```typescript
interface ListRendererProps {
  paragraphs: Paragraph[];
  ordered?: boolean;
}

function ListRenderer({ paragraphs, ordered = true }: ListRendererProps): JSX.Element;
```

#### 3.3.3 Table Renderer

```typescript
interface TableRendererProps {
  paragraphs: Paragraph[];
  columns?: number;
}

function TableRenderer({ paragraphs, columns = 2 }: TableRendererProps): JSX.Element;
```

#### 3.3.4 Emphasis Renderer

```typescript
interface EmphasisRendererProps {
  text: string;
  emphases: EmphasisRange[];
}

function EmphasisRenderer({ text, emphases }: EmphasisRendererProps): JSX.Element;
```

### 3.4 Content Transformers

#### 3.4.1 List Transformer

```typescript
interface ListTransformerOptions {
  alignment: 'traditional' | 'modern';
  indentation: string;
  spacing: string;
}

// Transform list paragraphs based on format
function transformList(paragraphs: Paragraph[], options: ListTransformerOptions): React.ReactNode;
```

#### 3.4.2 Table Transformer

```typescript
interface TableTransformerOptions {
  alignment: 'traditional' | 'modern';
  borderStyle: string;
  cellPadding: string;
}

// Transform table paragraphs based on format
function transformTable(
  paragraphs: Paragraph[],
  columns: number,
  options: TableTransformerOptions
): React.ReactNode;
```

#### 3.4.3 Emphasis Transformer

```typescript
interface EmphasisTransformerOptions {
  italic: {
    fontStyle: string;
    fontWeight?: string;
  };
  bold: {
    fontWeight: string;
  };
  uppercase: {
    textTransform: string;
    letterSpacing?: string;
  };
  smallcaps: {
    fontVariant: string;
  };
}

// Transform text with emphasis ranges based on format
function transformEmphasis(
  text: string,
  emphases: EmphasisRange[],
  options: EmphasisTransformerOptions
): React.ReactNode;
```

### 3.5 Format Hooks

```typescript
// Hook for accessing content format
function useContentFormat(): {
  format: ContentFormat;
  formatType: 'traditional' | 'modern';
  setFormat: (format: 'traditional' | 'modern') => void;
  toggleFormat: () => void;
};
```

### 3.6 Format Storage

```typescript
// Save format preference to localStorage
function saveFormatPreference(preference: 'traditional' | 'modern'): void;

// Get format preference from localStorage
function getFormatPreference(): 'traditional' | 'modern';
```

## 4. Implementation Guidelines

### 4.1 Format Detection and Application

The system should detect the appropriate format to apply based on:

1. User preference (stored in localStorage)
2. Publication default setting
3. Fallback to Traditional format if no preference is set

### 4.2 List Formatting

For Modern format, lists should be properly formatted with:

1. Numbers aligned under numbers
2. Text aligned under text
3. Proper indentation and spacing
4. Consistent bullet or number styles

For Traditional format, lists should maintain the original paragraph-style formatting.

### 4.3 Table Formatting

For Modern format, tables should be properly formatted with:

1. Aligned columns
2. Optional borders
3. Proper cell padding
4. Optional header styling

For Traditional format, tables should maintain the original paragraph-style formatting with dots.

### 4.4 Emphasis Handling

For Modern format, emphasis should be enhanced:

1. Italicized text should be slightly bolder for better visibility
2. ALL CAPS text should have slightly increased letter spacing
3. Emphasis should be consistently applied

For Traditional format, emphasis should follow standard styling.

### 4.5 Section Break Indicators

For Modern format, section breaks should be indicated with a faint line to help readers understand the change in topic.

For Traditional format, section breaks should be indicated with extra spacing.

## 5. Dependencies

- React 18+
- TypeScript 4.9+
- Core Engine (for document model)

## 6. Testing Strategy

1. **Unit Tests**: Test individual format transformers
2. **Component Tests**: Test format renderers
3. **Visual Tests**: Use Storybook for visual comparison between formats
4. **User Tests**: Gather feedback on readability and usability

## 7. Next Steps

1. Create the directory structure
2. Define the format interfaces
3. Implement traditional and modern formats
4. Create the FormatProvider component
5. Develop content renderers
6. Implement format transformers
7. Create documentation and examples
