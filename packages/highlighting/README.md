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
>
  {children}
</HighlightProvider>
```

#### Props

- `containerSelector` (string): CSS selector for the container element where highlighting will be applied
- `isDarkMode` (function): Function that returns true if dark mode is active
- `colors` (array, optional): Array of color objects with name, lightModeColor, and darkModeColor properties
- `onHighlight` (function, optional): Callback function when text is highlighted
- `showHighlights` (boolean, optional): Whether to show highlights (default: true)

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

- `highlightManager` (HighlightManager): The underlying highlight manager instance
- `showHighlights` (boolean): Whether highlights are currently visible
- `setShowHighlights` (function): Function to set whether highlights are visible
- `highlights` (array): Array of highlight objects
- `addHighlight` (function): Function to add a highlight
- `removeHighlight` (function): Function to remove a highlight

## License

MIT
