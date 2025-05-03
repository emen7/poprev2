# UB Highlighting Package

A reusable highlighting system for the Urantia Book ecosystem.

## Features

- Text highlighting in both light and dark modes
- Multiple highlight colors
- Toggle highlight visibility
- Copy highlighted text
- Remove highlights

## Installation

```bash
npm install @ub/highlighting
```

## Usage

### Basic Usage

```tsx
import { HighlightProvider, useHighlight } from '@ub/highlighting';

// Wrap your application with the HighlightProvider
function App() {
  return (
    <HighlightProvider
      containerSelector=".ub-content"
      isDarkMode={() => document.body.classList.contains('dark-mode')}
    >
      <YourContent />
    </HighlightProvider>
  );
}

// Use the highlighting functionality in your components
function YourContent() {
  const { showHighlights, setShowHighlights } = useHighlight();

  return (
    <div className="ub-content">
      <label>
        <input
          type="checkbox"
          checked={showHighlights}
          onChange={e => setShowHighlights(e.target.checked)}
        />
        Show Highlights
      </label>

      <div className="content">
        <p>This is some content that can be highlighted.</p>
        <p>Select text to see the highlighting options.</p>
      </div>
    </div>
  );
}
```

### Advanced Usage

For more advanced usage, including customizing colors, handling highlight events, and persisting highlights, see the [documentation](../ui/docs/highlighting-protocol.md).

## API Reference

### HighlightProvider

The `HighlightProvider` component provides the highlighting functionality to its children.

```tsx
<HighlightProvider
  containerSelector=".ub-content"
  isDarkMode={() => document.body.classList.contains('dark-mode')}
  colors={customColors} // Optional
  onHighlight={data => console.log('Highlight applied:', data)} // Optional
  showHighlights={true} // Optional, default: true
  currentPaper={1} // Optional, for context
  currentSection={2} // Optional, for context
>
  {children}
</HighlightProvider>
```

#### Props

```typescript
/**
 * Props for the HighlightProvider component
 *
 * @interface HighlightProviderProps
 * @description Props for the React component that provides highlighting functionality
 * @property {React.ReactNode} children - The children to render within the provider
 * @property {string} containerSelector - CSS selector for the container element where highlighting will be applied
 * @property {() => boolean} isDarkMode - Function that returns true if dark mode is active
 * @property {HighlightColor[]} [colors] - Array of color objects for highlighting
 * @property {(data: HighlightData) => void} [onHighlight] - Callback function when text is highlighted
 * @property {boolean} [showHighlights=true] - Whether to show highlights initially
 * @property {number} [currentPaper] - Current paper number for context
 * @property {number} [currentSection] - Current section number for context
 */
```

### useHighlight

The `useHighlight` hook provides access to the highlighting functionality.

```tsx
const {
  highlightManager,
  showHighlights,
  setShowHighlights,
  highlights,
  addHighlight,
  removeHighlight,
} = useHighlight();
```

#### Return Value

```typescript
/**
 * Context for the highlighting system
 *
 * @interface HighlightContextValue
 * @description The value provided by the HighlightContext
 * @property {HighlightManager|null} highlightManager - The underlying highlight manager instance
 * @property {boolean} showHighlights - Whether highlights are currently visible
 * @property {(show: boolean) => void} setShowHighlights - Function to set whether highlights are visible
 * @property {HighlightData[]} highlights - Array of highlight objects
 * @property {(highlight: HighlightData) => void} addHighlight - Function to add a highlight
 * @property {(highlight: HighlightData) => void} removeHighlight - Function to remove a highlight
 */
```

### HighlightData

The data structure for highlights:

```typescript
/**
 * Data for a highlight
 *
 * @interface HighlightData
 * @description Contains information about a text highlight
 * @property {string} text - The highlighted text content
 * @property {string|null} color - The color name used for the highlight, or null if removed
 * @property {Range} range - The DOM Range object representing the highlighted text
 */
```

### HighlightColor

The data structure for highlight colors:

```typescript
/**
 * Color object for highlighting
 *
 * @interface HighlightColor
 * @description Defines a color that can be used for highlighting text
 * @property {string} name - Unique identifier for the color
 * @property {string} lightModeColor - CSS color value for light mode (background color)
 * @property {string} darkModeColor - CSS color value for dark mode (text color)
 * @property {string} [displayName] - Human-readable name for the color
 * @property {boolean} [lightModeOnly] - Whether the color is only available in light mode
 * @property {boolean} [darkModeOnly] - Whether the color is only available in dark mode
 */
```

## License

MIT
