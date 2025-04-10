# UB Highlighting Protocol

This document outlines the protocol for text highlighting in the Urantia Book ecosystem. It serves as a reference for developers who want to use or extend the highlighting system.

## Overview

The UB Highlighting Protocol provides a standardized way to:

- Apply highlights to text in both light and dark modes
- Toggle highlight visibility
- Copy highlighted text
- Remove highlights
- Support multiple highlight colors

## Core Components

### 1. HighlightManager Class

The `HighlightManager` class is the main entry point for the highlighting system. It manages the highlighting functionality and provides methods for interacting with highlights.

```javascript
const highlightManager = new HighlightManager({
  container: document.getElementById('contentContainer'),
  colors: customColors, // Optional
  isDarkMode: () => document.body.classList.contains('dark-mode'),
  onHighlight: data => {
    console.log('Highlight applied:', data);
    // Save highlight to database, etc.
  },
  showHighlights: true, // Optional, default: true
});
```

### 2. HTML Structure

Highlights are applied as `<span>` elements with specific classes:

```html
<span class="ub-highlight ub-highlight-yellow">Highlighted text</span>
```

### 3. CSS Classes

- `ub-highlight`: Base class for all highlights
- `ub-highlight-[color]`: Color-specific class (e.g., `ub-highlight-yellow`)
- `ub-highlights-hidden`: Applied to the body when highlights should be hidden

## Highlight Colors

The system includes a research-backed color palette:

| Color Name  | Light Mode (Background)  | Dark Mode (Text) | Purpose                  |
| ----------- | ------------------------ | ---------------- | ------------------------ |
| Yellow      | rgba(255, 245, 120, 0.6) | #FFDE21          | Primary highlight color  |
| Orange      | rgba(255, 133, 89, 0.6)  | #FF8559          | Warm accent color        |
| Pink        | rgba(255, 193, 204, 0.6) | #FFC1CC          | Warm accent color        |
| Red         | rgba(255, 116, 108, 0.6) | #FF746C          | Warm accent color        |
| Lavender    | rgba(179, 156, 208, 0.6) | #B39CD0          | Cool complementary color |
| Blue        | rgba(176, 196, 222, 0.6) | #B0C4DE          | Cool complementary color |
| Dodger Blue | rgba(30, 144, 255, 0.6)  | #1E90FF          | Bright blue accent       |
| Green       | rgba(152, 251, 152, 0.6) | #98FB98          | High contrast option     |

## User Interaction Flow

1. **Text Selection**: User selects text in the content container
2. **Selection Menu**: A menu appears with options (highlight, copy, note, quote)
3. **Highlight Option**: When the highlight option is selected, a color picker appears
4. **Color Selection**: User selects a color to apply the highlight
5. **Highlight Application**: The highlight is applied to the selected text

## API Reference

### Constructor Options

| Option         | Type        | Description                                              | Default        |
| -------------- | ----------- | -------------------------------------------------------- | -------------- |
| container      | HTMLElement | The container element where highlighting will be applied | Required       |
| colors         | Array       | Array of color objects                                   | Default colors |
| isDarkMode     | Function    | Function that returns true if dark mode is active        | () => false    |
| onHighlight    | Function    | Callback function when text is highlighted               | () => {}       |
| showHighlights | boolean     | Whether to show highlights                               | true           |

### Methods

| Method                             | Description                      | Parameters           |
| ---------------------------------- | -------------------------------- | -------------------- |
| setShowHighlights(show)            | Set whether to show highlights   | show: boolean        |
| toggleHighlights()                 | Toggle highlight visibility      | None                 |
| applyHighlight(colorName)          | Apply highlight to selected text | colorName: string    |
| processSelectionForCopy(selection) | Process selection for copying    | selection: Selection |
| destroy()                          | Destroy the highlight manager    | None                 |

### Events

The `onHighlight` callback receives an object with the following properties:

```javascript
{
  text: "Selected text",
  color: "yellow", // or null if highlight was removed
  range: Range // DOM Range object
}
```

## Implementation Guidelines

### 1. Initialization

```javascript
// Import the module
// In a module environment:
// import { HighlightManager } from './highlight-module.js';
// Or in a browser environment:
// const { HighlightManager } = window.UBHighlight;

// Initialize the highlight manager
const highlightManager = new HighlightManager({
  container: document.getElementById('contentContainer'),
  isDarkMode: () => document.body.classList.contains('dark-mode'),
  onHighlight: data => {
    // Save highlight to database, etc.
    saveHighlightToDatabase(data);
  },
});
```

### 2. Dark Mode Support

The highlighting system automatically adapts to dark mode:

- In light mode, highlights are applied as background colors
- In dark mode, highlights are applied as text colors

### 3. Persistence

To persist highlights, implement the `onHighlight` callback:

```javascript
function saveHighlightToDatabase(data) {
  // Example implementation
  const highlight = {
    text: data.text,
    color: data.color,
    timestamp: new Date().toISOString(),
    // Add other metadata as needed
    pageNumber: getCurrentPage(),
    userId: getCurrentUser().id,
  };

  // Save to database
  api.saveHighlight(highlight);
}
```

### 4. Restoring Highlights

To restore highlights from a database:

```javascript
function restoreHighlights() {
  // Fetch highlights from database
  api.getHighlights().then(highlights => {
    highlights.forEach(highlight => {
      // Find the text in the document
      const range = findTextInDocument(highlight.text);
      if (range) {
        // Select the range
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Apply the highlight
        highlightManager.applyHighlight(highlight.color);
      }
    });
  });
}
```

## Best Practices

1. **Performance**: For large documents, consider implementing lazy loading of highlights
2. **Accessibility**: Ensure highlighted text remains accessible to screen readers
3. **User Preferences**: Allow users to customize highlight colors
4. **Conflict Resolution**: Handle overlapping highlights gracefully
5. **Responsiveness**: Ensure the highlighting system works well on all device sizes

## Browser Compatibility

The highlighting system is compatible with modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 79+

## Troubleshooting

### Common Issues

1. **Highlights not appearing**: Check if `showHighlights` is set to true
2. **Selection menu not appearing**: Ensure the selection is at least 3 characters long
3. **Dark mode highlights not working**: Verify the `isDarkMode` function is correctly implemented

## Future Enhancements

1. **Search through highlights**: Add ability to search and navigate through highlights
2. **Categorized highlights**: Allow grouping highlights by category or purpose
3. **Highlight sharing**: Enable sharing highlights between users
4. **Annotation enhancements**: Expand note-taking capabilities
5. **Mobile optimization**: Improve touch interaction for mobile devices
