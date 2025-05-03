# UI Components Package

A package of shared UI components for the PopRev2 platform.

## Overview

The UI Components package provides reusable UI components that are used across all applications in the PopRev2 platform. These components ensure a consistent look and feel across the platform and reduce duplication of code.

## Components

### Layout Components

#### ThreeRowHeader

A header component with three rows that provides a consistent navigation experience across the application.

```tsx
import { ThreeRowHeader } from '@ub-ecosystem/ui';

// Render the three-row header
<ThreeRowHeader paperTitle="Paper 1: The Universal Father" className="custom-header" />;
```

#### HeaderRow

A flexible row component for the three-row header system.

```tsx
import { HeaderRow } from '@ub-ecosystem/ui';

// Render a header row
<HeaderRow
  rowType="paper"
  leftContent={<BackButton />}
  centerContent={<h2>Paper Title</h2>}
  rightContent={<SettingsButton />}
  className="custom-row"
/>;
```

#### DynamicSectionTitle

A component that displays the current section title with a fade-in animation when the title changes.

```tsx
import { DynamicSectionTitle } from '@ub-ecosystem/ui';

// Render a dynamic section title
<DynamicSectionTitle title="Introduction" className="custom-title" />;
```

### Navigation Components

#### DualHamburgerNavigation

A navigation component that provides both book-level and section-level navigation through two hamburger buttons and sliding panels.

```tsx
import { DualHamburgerNavigation } from '@ub-ecosystem/ui';

// Render the dual hamburger navigation
<DualHamburgerNavigation className="custom-nav" />;
```

#### SectionTracker

A component that tracks when a section is visible in the viewport and updates the navigation state accordingly.

```tsx
import { SectionTracker } from '@ub-ecosystem/ui';

// Render a section with tracking
<SectionTracker sectionId="introduction" sectionTitle="Introduction" className="custom-section">
  <h2>Introduction</h2>
  <p>This is the introduction section.</p>
</SectionTracker>;
```

### DocumentReader

A component that displays a transformed document with proper formatting and navigation. It renders the document content as HTML with appropriate styling and provides a table of contents for easy navigation.

```tsx
import { DocumentReader } from '@ub-ecosystem/ui';
import { transformContent } from '@ub-ecosystem/content-transformer';

// Transform a markdown document
const transformedDocument = await transformContent(markdownContent, 'markdown');

// Render the document
<DocumentReader document={transformedDocument} className="custom-reader" />;
```

The DocumentReader component:

- Displays document metadata (title, subtitle, author, date, categories, tags)
- Generates a table of contents from headings in the document
- Renders all content types (headings, paragraphs, lists, links, images, code blocks, etc.)
- Supports smooth scrolling to sections when clicking on table of contents links
- Allows custom styling through the className prop

### UBReferenceLink

A component that renders a link to a UB reference with proper formatting and URL generation. It supports different reference types (paper, section, paragraph) and allows for custom styling.

```tsx
import { UBReferenceLink, UBReference } from '@ub-ecosystem/ui';

// Create a reference
const reference: UBReference = {
  type: 'paper-section',
  paper: 1,
  section: 2,
  originalText: '1:2',
};

// Render a link to a UB reference
<UBReferenceLink reference={reference} baseUrl="/reader" className="custom-link" />;

// Render with custom content
<UBReferenceLink reference={reference}>
  <span className="custom-content">Paper 1, Section 2</span>
</UBReferenceLink>;

// With click handler
<UBReferenceLink
  reference={reference}
  onClick={(ref, event) => {
    console.log('Reference clicked:', ref);
    // Custom navigation logic
  }}
/>;
```

The UBReferenceLink component:

- Supports different reference types (paper, section, paragraph)
- Generates correct URLs based on reference type
- Allows custom content through children prop
- Provides click handling with the reference object
- Sets data attributes for styling based on reference type
- Includes default styling with hover and active states

### UBPaperViewer

A component that renders a UB paper.

```tsx
import { UBPaperViewer } from '@ub-ecosystem/ui';

// Render a UB paper
<UBPaperViewer
  paper={{
    number: 1,
    title: 'The Universal Father',
    author: 'Divine Counselor',
    sections: [
      /* ... */
    ],
  }}
/>;
```

### UBSectionViewer

A component that renders a UB section.

```tsx
import { UBSectionViewer } from '@ub-ecosystem/ui';

// Render a UB section
<UBSectionViewer
  section={{
    number: 1,
    title: "The Father's Name",
    paragraphs: [
      /* ... */
    ],
  }}
/>;
```

### UBParagraphViewer

A component that renders a UB paragraph.

```tsx
import { UBParagraphViewer } from '@ub-ecosystem/ui';

// Render a UB paragraph
<UBParagraphViewer
  paragraph={{
    number: 1,
    text: 'The Universal Father is the God of all creation, the First Source and Center of all things and beings.',
  }}
/>;
```

### DocumentViewer

A component that renders a document.

```tsx
import { DocumentViewer } from '@ub-ecosystem/ui';

// Render a document
<DocumentViewer content="<h1>Document Title</h1><p>Document content...</p>" />;
```

## Installation

```bash
# From the repository root
npm install
```

## Usage

```tsx
import { DocumentReader } from '@ub-ecosystem/ui';
import { transformContent } from '@ub-ecosystem/content-transformer';

// Transform a markdown document
const transformedDocument = await transformContent(markdownContent, 'markdown');

// Render the document
function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <DocumentReader document={transformedDocument} />
    </div>
  );
}
```

## Styling

The UI components come with default styling, but you can customize the appearance by providing your own CSS. The components use CSS classes that you can target in your stylesheets.

```css
/* Example of customizing the DocumentReader component */
.document-reader {
  font-family: 'Your Custom Font', sans-serif;
  max-width: 1000px;
}

.document-title {
  color: #0070f3;
}
```

## Type System

The UI package uses TypeScript to provide type safety and better developer experience. All components have well-defined interfaces and comprehensive JSDoc comments.

### Component Props

All component props are defined as TypeScript interfaces with detailed JSDoc comments:

```tsx
/**
 * Props for the DualHamburgerNavigation component
 *
 * @interface DualHamburgerNavigationProps
 * @description Props for the dual hamburger navigation component
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
export interface DualHamburgerNavigationProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}
```

### Component Documentation

Components are documented with comprehensive JSDoc comments that include:

- Description of the component's purpose
- Examples of how to use the component
- Details about the component's behavior
- Information about any side effects or dependencies

````tsx
/**
 * SectionTracker Component
 *
 * @description A component that tracks when a section is visible in the viewport and
 * updates the navigation state accordingly. It uses the Intersection Observer API
 * to detect when the section enters and exits the viewport, and updates the
 * navigation state with the current section ID and title.
 *
 * @example
 * ```tsx
 * <SectionTracker
 *   sectionId="introduction"
 *   sectionTitle="Introduction"
 *   className="custom-section"
 * >
 *   <h2>Introduction</h2>
 *   <p>This is the introduction section.</p>
 * </SectionTracker>
 * ```
 */
````

## Development

### Adding a New Component

To add a new component to the UI package:

1. Create a new file in the `src` directory
2. Implement your component with proper TypeScript interfaces and JSDoc comments
3. Create unit tests for your component
4. Export your component from the appropriate index file

````tsx
// src/my-component.tsx
import React from 'react';

/**
 * Props for the MyComponent component
 *
 * @interface MyComponentProps
 * @description Props for the my component
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
export interface MyComponentProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * MyComponent Component
 *
 * @description A component that does something useful
 *
 * @example
 * ```tsx
 * <MyComponent className="custom-class" />
 * ```
 */
export function MyComponent(props: MyComponentProps) {
  // Component implementation
}

// src/index.tsx
export { MyComponent } from './my-component';
````

### Testing Components

To test your components:

```bash
# From the repository root
npm run test -- --filter=ui
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Submit a pull request

## License

This package is part of the PopRev2 platform and is licensed under the same terms.
