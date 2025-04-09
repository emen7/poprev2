# State Management Package

A standardized state management solution for the UB Ecosystem using React Context.

## Overview

This package provides a comprehensive state management solution for the UB Ecosystem, focusing on four key areas:

1. **Navigation**: Managing navigation state, including book and section navigation panels, current paper and section.
2. **Pullup**: Managing the bottom pullup panel, including its open state, active tab, and height.
3. **Selection**: Managing text selection, including selected text, position, and options (note, quote, highlight).
4. **Notes**: Managing notes and quotes, including creation, updating, and persistence.

## Installation

```bash
npm install @ub-ecosystem/state-management
```

## Usage

### Setting Up the Providers

Wrap your application with the `AppStateProvider` to provide access to all state management contexts:

```tsx
import { AppStateProvider } from '@ub-ecosystem/state-management';

function App() {
  return (
    <AppStateProvider documentId="paper1">
      <YourApp />
    </AppStateProvider>
  );
}
```

### Using the Hooks

Access and manipulate state using the provided hooks:

```tsx
import { useNavigation, usePullup, useSelection, useNotes } from '@ub-ecosystem/state-management';

function YourComponent() {
  // Navigation state and actions
  const { isBookNavOpen, toggleBookNav, setCurrentPaper } = useNavigation();

  // Pullup state and actions
  const { isOpen, activeTab, openPullup, closePullup } = usePullup();

  // Selection state and actions
  const { selectedText, toggleOption, confirmSelection } = useSelection();

  // Notes state and actions
  const { notes, quotes, addNote, addQuote } = useNotes();

  // Your component logic...
}
```

## API Reference

### Providers

- `AppStateProvider`: Combined provider for all state management contexts
- `NavigationProvider`: Provider for navigation state
- `PullupProvider`: Provider for pullup panel state
- `SelectionProvider`: Provider for text selection state
- `NotesProvider`: Provider for notes and quotes state

### Hooks

- `useNavigation`: Hook for accessing and manipulating navigation state
- `usePullup`: Hook for accessing and manipulating pullup panel state
- `useSelection`: Hook for accessing and manipulating text selection state
- `useNotes`: Hook for accessing and manipulating notes and quotes

### Types

- `NavigationState`: Type for navigation state
- `PullupState`: Type for pullup panel state
- `SelectionState`: Type for text selection state
- `NotesState`: Type for notes and quotes state
- `Note`: Type for a note
- `Quote`: Type for a quote

## Examples

The package includes example components demonstrating the use of each hook:

- `NavigationExample`: Demonstrates the use of the `useNavigation` hook
- `PullupExample`: Demonstrates the use of the `usePullup` hook
- `SelectionExample`: Demonstrates the use of the `useSelection` hook

## License

MIT
