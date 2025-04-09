# UB References Module

This module provides components and utilities for detecting, processing, and linking references to The Urantia Book within text content.

## Features

- Automatic detection of various reference formats
- Interactive reference links with tooltips
- Context-aware reference resolution
- Reference validation
- Customizable styling
- TypeScript support

## Components

### ReferenceProcessor

The main component that processes text content and converts references to interactive links.

```tsx
import { ReferenceProcessor } from '../components/references';

function MyComponent() {
  const content = `
    <p>This is a paragraph with a reference to Paper 1, Section 3.</p>
    <p>Here's another reference: 2:1</p>
  `;

  return (
    <ReferenceProcessor
      content={content}
      currentPaper={1}
      baseUrl="/paper"
      showTooltips={true}
      onReferenceClick={(reference, event) => {
        console.log('Reference clicked:', reference);
      }}
    />
  );
}
```

#### Props

| Prop               | Type                                                        | Default          | Description                                |
| ------------------ | ----------------------------------------------------------- | ---------------- | ------------------------------------------ |
| `content`          | `string`                                                    | (required)       | The HTML content to process for references |
| `currentPaper`     | `number`                                                    | `0`              | The current paper number for context       |
| `baseUrl`          | `string`                                                    | `'/paper'`       | The base URL for reference links           |
| `showTooltips`     | `boolean`                                                   | `true`           | Whether to show tooltips on hover          |
| `maxPapers`        | `number`                                                    | `196`            | Maximum number of papers for validation    |
| `maxSections`      | `Record<number, number>`                                    | `undefined`      | Map of maximum sections per paper          |
| `linkClassName`    | `string`                                                    | `'ub-reference'` | Custom class name for reference links      |
| `onReferenceClick` | `(reference: UBReference, event: React.MouseEvent) => void` | `undefined`      | Callback when a reference is clicked       |

### ReferenceExample

A demonstration component that shows how to use the ReferenceProcessor with various reference formats.

```tsx
import { ReferenceExample } from '../components/references';

function DemoPage() {
  return (
    <div>
      <h1>Reference Detection Demo</h1>
      <ReferenceExample />
    </div>
  );
}
```

## Utilities

### Reference Detection

```tsx
import { parseUBReferences, UBReference } from '../components/references';

// Parse references from text
const text = 'See Paper 1, Section 3 for more information.';
const references: UBReference[] = parseUBReferences(text);
console.log(references);
```

### Context Application

```tsx
import { parseUBReferences, applyReferenceContext } from '../components/references';

// Parse references and apply context
const text = 'See Section 3 for more information.';
let references = parseUBReferences(text);
references = applyReferenceContext(references, 1); // Apply Paper 1 context
console.log(references);
```

### URL Generation

```tsx
import { generateUBReferenceUrl, UBReference } from '../components/references';

// Generate a URL for a reference
const reference: UBReference = {
  type: 'paper-section',
  paper: 1,
  section: 3,
  originalText: 'Paper 1, Section 3',
  position: { start: 0, end: 0 },
};
const url = generateUBReferenceUrl(reference, '/paper');
console.log(url); // "/paper/1#section-3"
```

### Reference Validation

```tsx
import { isValidReference, UBReference } from '../components/references';

// Check if a reference is valid
const reference: UBReference = {
  type: 'paper-section',
  paper: 1,
  section: 3,
  originalText: 'Paper 1, Section 3',
  position: { start: 0, end: 0 },
};
const maxSections = { 1: 7, 2: 7, 3: 6 };
const isValid = isValidReference(reference, 196, maxSections);
console.log(isValid); // true
```

## Supported Reference Formats

The module detects the following reference formats:

1. **Full Format**

   - `Paper 1, Section 3`
   - `Paper 2, Section 1, paragraph 5`

2. **Short Format with Colon**

   - `1:3`
   - `2:1.5`

3. **Short Format with Dash**

   - `1-3`
   - `2-1-5`

4. **Paper-Only References**

   - `Paper 1`
   - `UB 2`

5. **Section-Only References (with context)**
   - `Section 3`
   - `Section 1, paragraph 2`

## Styling

The module includes default styles in `ReferenceProcessor.css`. You can customize the appearance by:

1. Overriding the CSS classes
2. Providing a custom `linkClassName` prop
3. Using your own CSS/SCSS

## TypeScript Types

```tsx
// Reference type
type UBReferenceType = 'paper-section' | 'paper-section-paragraph' | 'paper' | 'section';

// Reference interface
interface UBReference {
  type: UBReferenceType;
  paper: number;
  section?: number;
  paragraph?: number;
  originalText: string;
  position: {
    start: number;
    end: number;
  };
}
```

## Integration with UB Reader

This module is designed to be integrated with the UB Reader application. It can be used in:

1. Paper content rendering
2. Search results
3. Annotations
4. Notes and comments
5. Any text content that might contain references to The Urantia Book

## Browser Compatibility

The module is compatible with all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Accessibility

The module is designed with accessibility in mind:

- References are proper `<a>` elements
- Tooltips are keyboard accessible
- Color contrast meets WCAG standards
- Screen reader friendly
