# UI Components Package

A package of shared UI components for the PopRev2 platform.

## Overview

The UI Components package provides reusable UI components that are used across all applications in the PopRev2 platform. These components ensure a consistent look and feel across the platform and reduce duplication of code.

## Components

### DocumentReader

A component that displays a transformed document with proper formatting and navigation.

```tsx
import { DocumentReader } from "@ub-ecosystem/ui";
import { transformContent } from "@ub-ecosystem/content-transformer";

// Transform a markdown document
const transformedDocument = await transformContent(markdownContent, "markdown");

// Render the document
<DocumentReader document={transformedDocument} />;
```

### UBReferenceLink

A component that renders a link to a UB reference.

```tsx
import { UBReferenceLink } from "@ub-ecosystem/ui";

// Render a link to a UB reference
<UBReferenceLink
  reference={{ paper: 1, section: 2, originalText: "1:2" }}
  baseUrl="/reader"
/>;
```

### UBPaperViewer

A component that renders a UB paper.

```tsx
import { UBPaperViewer } from "@ub-ecosystem/ui";

// Render a UB paper
<UBPaperViewer
  paper={{
    number: 1,
    title: "The Universal Father",
    author: "Divine Counselor",
    sections: [
      /* ... */
    ],
  }}
/>;
```

### UBSectionViewer

A component that renders a UB section.

```tsx
import { UBSectionViewer } from "@ub-ecosystem/ui";

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
import { UBParagraphViewer } from "@ub-ecosystem/ui";

// Render a UB paragraph
<UBParagraphViewer
  paragraph={{
    number: 1,
    text: "The Universal Father is the God of all creation, the First Source and Center of all things and beings.",
  }}
/>;
```

### DocumentViewer

A component that renders a document.

```tsx
import { DocumentViewer } from "@ub-ecosystem/ui";

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
import { DocumentReader } from "@ub-ecosystem/ui";
import { transformContent } from "@ub-ecosystem/content-transformer";

// Transform a markdown document
const transformedDocument = await transformContent(markdownContent, "markdown");

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
  font-family: "Your Custom Font", sans-serif;
  max-width: 1000px;
}

.document-title {
  color: #0070f3;
}
```

## Development

### Adding a New Component

To add a new component to the UI package:

1. Create a new file in the `src` directory
2. Implement your component
3. Export your component from the `index.tsx` file

```tsx
// src/my-component.tsx
import React from "react";

export interface MyComponentProps {
  // Props definition
}

export function MyComponent(props: MyComponentProps) {
  // Component implementation
}

// src/index.tsx
export { MyComponent } from "./my-component";
```

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
