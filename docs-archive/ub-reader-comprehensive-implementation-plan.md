# UB Reader Comprehensive Implementation Plan

This document outlines the comprehensive implementation plan for the UB Reader ecosystem, focusing on the standalone ub-reader and sci-reader components. The plan incorporates all the requirements and features discussed, with a phased approach to implementation.

## Reader Ecosystem Overview

The UB Reader ecosystem consists of multiple reader types, each with its own URL and specific functionality:

1. **Standalone ub-reader**

   - Independent URL
   - No links to other publications
   - Focus on general reading experience

2. **sci-reader**

   - Scientific content focus
   - Employs a branded version of ub-reader (not the standalone)
   - Papers may link to other papers/articles in the system

3. **Future Publications** (informed by sci-reader implementation)
   - ubLectionary
   - ubCatechism
   - ubGems
   - almanac-new

## Core Architecture

All reader types share a common architecture with three main areas:

1. **Header (Top)**

   - Fixed position with two hamburger icons:
     - First icon (left): For whole-book navigation, consistent across all pages
     - Second icon (right): For paper-specific section navigation
   - Paper title in the center, becomes sticky when scrolling

2. **Content Area (Middle)**

   - Optimized width (760px) for readability
   - Scientific content enhanced with tooltips
   - Sticky section headers as user scrolls

3. **Multi-Purpose Panel (Bottom)**
   - Pull-up panel with tabbed interface
   - Tab content varies by reader type
   - Height adjustment with memory of preferences

## Standalone ub-reader Features

### Tab Configuration

- **Notes Tab**: User annotations with source references
- **Quotes Tab**: Collection of user-selected text
- **Settings Tab**: Reader configuration options

### Text Selection Functionality

- Selection triggers a toolbar with options: "Note", "Quote", "Highlight"
- **Note**: Opens notes tab for annotation, auto-includes reference (Paper:Section.Title)
- **Quote**: Automatically adds selection to quotes tab with reference
- **Highlight**: Applies highlighting to selected text
  - Dark Mode: Changes text color (similar to Perplexity AI)
  - Light Mode: Conventional highlighting with mitigated brightness

### Data Organization

- Notes can be ordered by time of entry or by Paper Order
- Quotes organized with source references

## sci-reader Features

### Tab Configuration

- Scientific-focused tabs (references, equations, etc.)
- Integration with branded ub-reader

### Scientific Content Enhancement

- Tooltips for abbreviations, equations, and technical terms
- Inter-paper navigation and references

## Implementation Components

### 1. Core Layout Components

#### ReaderLayout

- Overall container for the reader
- Manages the three main areas (header, content, panel)
- Responsive behavior for different screen sizes

```typescript
interface ReaderLayoutProps {
  headerContent: ReactNode;
  children: ReactNode;
  showBottomPanel?: boolean;
  bottomPanelTabs?: TabConfig[];
  bottomPanelInitialHeight?: number;
  contentWidth?: 'narrow' | 'medium' | 'wide';
}
```

#### ContentContainer

- Width-limited container for content
- Optimal reading width (760px)
- Responsive margins and padding

```typescript
interface ContentContainerProps {
  children: ReactNode;
  width?: 'narrow' | 'medium' | 'wide';
  centered?: boolean;
  padding?: 'none' | 'small' | 'normal' | 'large';
}
```

#### Header

- Fixed position header with navigation controls
- Hamburger icons for book and section navigation
- Sticky paper title

```typescript
interface HeaderProps {
  title: string;
  onBookNavClick: () => void;
  onSectionNavClick: () => void;
  additionalControls?: ReactNode;
}
```

#### SidePanel

- Sliding panel for navigation menus
- Opened by hamburger icons
- Contains TableOfContents or SectionNavigator

```typescript
interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  position: 'left' | 'right';
  children: ReactNode;
}
```

#### MultiPurposePanel

- Bottom pull-up panel with tabs
- Height adjustment with drag handle
- Configurable tab content

```typescript
interface MultiPurposePanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialHeight?: number;
  onHeightChange?: (height: number) => void;
  tabs: TabConfig[];
}

interface TabConfig {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}
```

### 2. Navigation Components

#### TableOfContents

- Book-level navigation
- Displayed in left SidePanel

```typescript
interface TableOfContentsProps {
  items: TOCItem[];
  currentItemId?: string;
  onItemClick: (itemId: string) => void;
}
```

#### SectionNavigator

- Paper-specific section navigation
- Displayed in right SidePanel

```typescript
interface SectionNavigatorProps {
  sections: Section[];
  currentSectionId?: string;
  onSectionClick: (sectionId: string) => void;
}
```

#### StickyHeaders

- Makes paper title and section headers sticky when scrolling
- Hierarchical navigation experience

```typescript
interface StickyHeadersProps {
  title: string;
  sections: Section[];
}
```

### 3. Content Enhancement Components

#### ScientificTooltip

- Tooltip for scientific content (abbreviations, equations, terms)
- Displays definitions, explanations, and context

```typescript
interface ScientificTooltipProps {
  content: string;
  data: TooltipData;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
}
```

#### ScientificContentProcessor

- Processes content to automatically wrap terms with tooltips
- Supports different types of scientific content

```typescript
interface ProcessingOptions {
  processAbbreviations?: boolean;
  processEquations?: boolean;
  processTerms?: boolean;
}
```

#### SelectionToolbar

- Appears above selected text
- Provides options: Note, Quote, Highlight

```typescript
interface SelectionToolbarProps {
  selection: Selection;
  onNoteClick: (text: string, range: Range) => void;
  onQuoteClick: (text: string, range: Range) => void;
  onHighlightClick: (text: string, range: Range) => void;
}
```

#### TextHighlighter

- Applies highlighting to selected text
- Different styles for dark and light modes

```typescript
interface TextHighlighterProps {
  range: Range;
  mode: 'light' | 'dark';
}
```

### 4. Panel Content Components

#### NotesPanel

- Displays and manages user notes
- Sorting options (time, paper order)
- Editing and deletion functionality

```typescript
interface NotesPanelProps {
  documentId?: string;
  initialNotes?: Note[];
  onNotesChange?: (notes: Note[]) => void;
}
```

#### QuotesPanel

- Displays and manages user-selected quotes
- Organization and filtering options

```typescript
interface QuotesPanelProps {
  documentId?: string;
  initialQuotes?: Quote[];
  onQuotesChange?: (quotes: Quote[]) => void;
}
```

#### SettingsPanel

- Reader configuration options
- Theme settings, font size, etc.

```typescript
interface SettingsPanelProps {
  settings: ReaderSettings;
  onSettingsChange: (settings: ReaderSettings) => void;
}
```

### 5. Data Management

#### LocalStorageManager

- Manages persistence of user data in localStorage
- Notes, quotes, settings, preferences

```typescript
interface LocalStorageManagerProps {
  storageKey: string;
  initialData?: any;
  onDataChange?: (data: any) => void;
}
```

## Implementation Phases

### Phase 1: Core Structure

1. **Layout Components**

   - ReaderLayout
   - ContentContainer
   - Header
   - SidePanel
   - MultiPurposePanel

2. **Basic Navigation**
   - TableOfContents
   - SectionNavigator

### Phase 2: Content Enhancement

1. **Scientific Content**

   - ScientificTooltip
   - ScientificContentProcessor

2. **Sticky Headers**
   - StickyHeaders component
   - Scroll behavior

### Phase 3: User Interaction

1. **Text Selection**

   - SelectionToolbar
   - TextHighlighter

2. **Panel Content**
   - NotesPanel
   - QuotesPanel
   - SettingsPanel

### Phase 4: Data Management

1. **Local Storage**

   - LocalStorageManager
   - Data synchronization

2. **Theme Support**
   - Light/dark mode
   - Custom highlighting

### Phase 5: Reader Integration

1. **Standalone ub-reader**

   - Complete integration of components
   - Testing and refinement

2. **sci-reader**
   - Scientific content enhancements
   - Branded ub-reader integration

## Technical Considerations

### Responsive Design

- Adaptive behavior for different screen sizes
- Mobile-friendly interaction patterns

### Accessibility

- ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader compatibility

### Performance

- Virtualized lists for large datasets
- Lazy-loading of panel content
- Optimized tooltip rendering

### Theme Support

- Light and dark mode
- Different highlighting strategies for each mode
- CSS variables for consistent styling

## Next Steps

1. Begin implementation of Phase 1 components
2. Create a basic demo with the core structure
3. Implement the text selection and highlighting functionality
4. Develop the panel content components
5. Integrate all components into the standalone ub-reader

This implementation plan provides a comprehensive roadmap for developing the UB Reader ecosystem, with a focus on the standalone ub-reader and sci-reader components. The phased approach allows for incremental progress and testing, ensuring a robust and user-friendly reading experience.
