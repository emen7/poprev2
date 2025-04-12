# 01-P1-CoreEngine: Architecture Specification

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Core Engine

## 1. Overview

The Core Engine is the foundation of the UB Ecosystem, providing essential functionality that powers all publication readers (pubs). It implements the document model, extension system, navigation, and selection capabilities that are shared across all publications.

## 2. Directory Structure

```
packages/
└── core/
    ├── document/           # Document model definitions
    │   ├── interfaces/     # Type definitions
    │   ├── models/         # Implementation classes
    │   └── utils/          # Helper functions
    ├── extension/          # Extension system
    │   ├── interfaces/     # Extension point definitions
    │   ├── registry/       # Extension registration
    │   └── loaders/        # Extension loading utilities
    ├── navigation/         # Navigation system
    │   ├── interfaces/     # Navigation types
    │   ├── services/       # Navigation implementation
    │   └── hooks/          # React hooks for navigation
    ├── selection/          # Text selection system
    │   ├── interfaces/     # Selection types
    │   ├── services/       # Selection implementation
    │   └── utils/          # Selection utilities
    ├── publication/        # Publication context
    │   ├── interfaces/     # Publication types
    │   ├── context/        # React context
    │   └── hooks/          # React hooks
    └── index.ts            # Public API exports
```

## 3. Component Specifications

### 3.1 Document Model

The document model defines the structure of UB content and provides interfaces for accessing and manipulating it.

#### 3.1.1 Key Interfaces

```typescript
// Document hierarchy
interface Paper {
  id: string;
  number: number;
  title: string;
  sections: Section[];
  metadata?: Record<string, any>;
}

interface Section {
  id: string;
  number: number;
  title?: string;
  paragraphs: Paragraph[];
}

interface Paragraph {
  id: string;
  number: number;
  text: string;
  format?: ParagraphFormat;
  type?: ParagraphType;
}

// Content types
enum ParagraphType {
  TEXT = 'text',
  LIST_ITEM = 'list-item',
  TABLE_ROW = 'table-row',
  QUOTE = 'quote',
  HEADING = 'heading',
}

interface ParagraphFormat {
  indent?: number;
  listNumber?: string | number;
  isTable?: boolean;
  columnCount?: number;
  emphasis?: EmphasisRange[];
}

interface EmphasisRange {
  start: number;
  end: number;
  type: EmphasisType;
}

enum EmphasisType {
  ITALIC = 'italic',
  BOLD = 'bold',
  UPPERCASE = 'uppercase',
  SMALLCAPS = 'smallcaps',
}

// Reference system
interface Reference {
  paper: number;
  section: number;
  paragraph: number;
  toString(): string; // Returns "paper:section.paragraph"
  toShortString(): string; // Returns "p:s.p"
}
```

#### 3.1.2 Document Services

```typescript
interface DocumentService {
  // Load a paper by number
  getPaper(number: number): Promise<Paper>;

  // Get a specific section
  getSection(paper: number, section: number): Promise<Section>;

  // Get a specific paragraph
  getParagraph(paper: number, section: number, paragraph: number): Promise<Paragraph>;

  // Parse a reference string
  parseReference(refString: string): Reference;

  // Search within documents
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
}
```

### 3.2 Extension System

The extension system allows for extending the core functionality with publication-specific features.

#### 3.2.1 Key Interfaces

```typescript
interface Extension {
  id: string;
  name: string;
  version: string;
  description?: string;
  initialize(): Promise<void>;
  getExtensionPoints(): ExtensionPoint[];
}

interface ExtensionPoint {
  id: string;
  type: ExtensionPointType;
  component?: React.ComponentType<any>;
  handler?: (...args: any[]) => any;
}

enum ExtensionPointType {
  UI_COMPONENT = 'ui-component',
  DATA_PROVIDER = 'data-provider',
  CONTENT_FORMATTER = 'content-formatter',
  COMMAND_HANDLER = 'command-handler',
}
```

#### 3.2.2 Extension Registry

```typescript
interface ExtensionRegistry {
  // Register an extension
  register(extension: Extension): void;

  // Get all registered extensions
  getExtensions(): Extension[];

  // Get extension points by type
  getExtensionPoints(type: ExtensionPointType): ExtensionPoint[];

  // Get a specific extension point
  getExtensionPoint(id: string): ExtensionPoint | undefined;
}
```

### 3.3 Navigation System

The navigation system handles movement within and between documents.

#### 3.3.1 Key Interfaces

```typescript
interface NavigationState {
  currentPaper?: number;
  currentSection?: number;
  currentParagraph?: number;
  scrollPosition?: number;
  history: Reference[];
}

interface NavigationService {
  // Navigate to a specific reference
  navigateTo(ref: Reference | string): Promise<void>;

  // Navigate to next/previous paper
  nextPaper(): Promise<void>;
  previousPaper(): Promise<void>;

  // Navigate to next/previous section
  nextSection(): Promise<void>;
  previousSection(): Promise<void>;

  // Navigate to next/previous paragraph
  nextParagraph(): Promise<void>;
  previousParagraph(): Promise<void>;

  // Get current navigation state
  getState(): NavigationState;

  // Save/restore navigation state
  saveState(): void;
  restoreState(): Promise<boolean>;
}
```

#### 3.3.2 React Hooks

```typescript
// Hook for accessing navigation
function useNavigation(): {
  state: NavigationState;
  navigateTo: (ref: Reference | string) => Promise<void>;
  nextPaper: () => Promise<void>;
  previousPaper: () => Promise<void>;
  nextSection: () => Promise<void>;
  previousSection: () => Promise<void>;
  nextParagraph: () => Promise<void>;
  previousParagraph: () => Promise<void>;
};
```

### 3.4 Selection System

The selection system handles text selection and provides utilities for working with selected text.

#### 3.4.1 Key Interfaces

```typescript
interface TextSelection {
  text: string;
  reference?: Reference;
  range?: Range;
  startOffset?: number;
  endOffset?: number;
}

interface SelectionService {
  // Get current selection
  getCurrentSelection(): TextSelection | null;

  // Create a selection programmatically
  createSelection(
    reference: Reference,
    startOffset: number,
    endOffset: number
  ): Promise<TextSelection>;

  // Clear current selection
  clearSelection(): void;

  // Add event listeners
  onSelectionChange(callback: (selection: TextSelection | null) => void): () => void;
}
```

#### 3.4.2 React Hooks

```typescript
// Hook for accessing selection
function useSelection(): {
  selection: TextSelection | null;
  createSelection: (
    reference: Reference,
    startOffset: number,
    endOffset: number
  ) => Promise<TextSelection>;
  clearSelection: () => void;
};
```

### 3.5 Publication Context

The publication context provides access to publication-specific configuration and state.

#### 3.5.1 Key Interfaces

```typescript
interface PublicationConfig {
  id: string;
  name: string;
  description?: string;
  contentPath: string;
  defaultFormat: 'traditional' | 'modern';
  features: {
    highlighting?: boolean;
    notes?: boolean;
    quotes?: boolean;
    search?: boolean;
    sharing?: boolean;
  };
}

interface PublicationState {
  config: PublicationConfig;
  isLoading: boolean;
  error?: Error;
  format: 'traditional' | 'modern';
}

interface PublicationContextValue {
  state: PublicationState;
  setFormat: (format: 'traditional' | 'modern') => void;
}
```

#### 3.5.2 React Context and Hooks

```typescript
// Publication context
const PublicationContext = React.createContext<PublicationContextValue | undefined>(undefined);

// Provider component
function PublicationProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: PublicationConfig;
}): JSX.Element;

// Hook for accessing publication context
function usePublication(): PublicationContextValue;
```

## 4. Implementation Guidelines

### 4.1 General Principles

1. **Separation of Concerns**: Keep interfaces, implementations, and utilities separate
2. **TypeScript First**: Use TypeScript for all code with proper type definitions
3. **React Hooks**: Expose functionality through React hooks for component consumption
4. **Minimal Dependencies**: Minimize external dependencies to reduce bundle size
5. **Testing**: Write unit tests for all core functionality

### 4.2 Code Organization

1. **Interface-First Development**: Define interfaces before implementation
2. **Barrel Exports**: Use index.ts files to control the public API
3. **Consistent Naming**: Use consistent naming conventions across the codebase
4. **Documentation**: Document all public APIs with JSDoc comments

### 4.3 Performance Considerations

1. **Lazy Loading**: Implement lazy loading for content to minimize initial load time
2. **Memoization**: Use memoization for expensive computations
3. **Virtual Rendering**: Consider virtual rendering for long documents
4. **Worker Threads**: Move heavy processing to worker threads when possible

## 5. Dependencies

- React 18+
- TypeScript 4.9+
- Optional: RxJS for reactive programming patterns

## 6. Testing Strategy

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test interactions between components
3. **E2E Tests**: Test complete user flows
4. **Test Coverage**: Aim for >80% code coverage

## 7. Next Steps

1. Create the directory structure
2. Define the core interfaces
3. Implement the document model
4. Develop the extension system
5. Build the navigation and selection systems
6. Create the publication context
7. Write comprehensive tests
8. Document the public API
