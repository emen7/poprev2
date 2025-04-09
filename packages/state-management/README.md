# UB Ecosystem State Management

A comprehensive state management solution for the UB Ecosystem, providing centralized state management for navigation, pullup panels, text selection, and notes.

## Features

- **Navigation State Management**: Manage book and section navigation panels
- **Pullup Panel State Management**: Control pullup panels with tabs for notes, quotes, and settings
- **Text Selection State Management**: Handle text selection and highlighting
- **Notes State Management**: Manage user notes and annotations
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **React Hooks**: Easy-to-use React hooks for accessing and manipulating state

## Installation

```bash
npm install @ub-ecosystem/state-management
```

## Usage

### Basic Setup

Wrap your application with the `AppStateProvider` to provide access to all state management contexts:

```jsx
import { AppStateProvider } from '@ub-ecosystem/state-management';

function App() {
  return (
    <AppStateProvider documentId="my-document">
      <YourApp />
    </AppStateProvider>
  );
}
```

### Navigation State

Use the `useNavigation` hook to access and manipulate navigation state:

```jsx
import { useNavigation } from '@ub-ecosystem/state-management';

function NavigationHeader() {
  const {
    isBookNavOpen,
    isSectionNavOpen,
    currentSectionTitle,
    toggleBookNav,
    toggleSectionNav,
    updateSectionTitle,
  } = useNavigation();

  return (
    <header>
      <button onClick={toggleBookNav}>{isBookNavOpen ? 'Close Book Nav' : 'Open Book Nav'}</button>
      <button onClick={toggleSectionNav}>
        {isSectionNavOpen ? 'Close Section Nav' : 'Open Section Nav'}
      </button>
      <h1>{currentSectionTitle}</h1>
    </header>
  );
}
```

### Pullup Panel State

Use the `usePullup` hook to access and manipulate pullup panel state:

```jsx
import { usePullup } from '@ub-ecosystem/state-management';

function PullupPanel() {
  const { isOpen, activeTab, height, openPullup, closePullup, setActiveTab, setHeight } =
    usePullup();

  return (
    <div className={`pullup-panel ${isOpen ? 'open' : ''}`} style={{ height }}>
      <div className="tabs">
        <button
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button
          className={activeTab === 'quotes' ? 'active' : ''}
          onClick={() => setActiveTab('quotes')}
        >
          Quotes
        </button>
        <button onClick={closePullup}>Close</button>
      </div>
      <div className="content">
        {activeTab === 'notes' && <NotesContent />}
        {activeTab === 'quotes' && <QuotesContent />}
      </div>
    </div>
  );
}
```

## Examples

Check out the examples directory for more detailed examples:

- `navigation-demo.html`: A simple HTML demo of the navigation system
- `live-server-demo.html`: A more comprehensive demo that can be viewed with Live Server
- `react-navigation-demo.jsx`: A React-based demo of the navigation system

## API Reference

### Providers

- `AppStateProvider`: Combined provider that wraps all state management contexts
- `NavigationProvider`: Provider for navigation state
- `PullupProvider`: Provider for pullup panel state

### Hooks

- `useNavigation`: Hook for accessing and manipulating navigation state
- `usePullup`: Hook for accessing and manipulating pullup panel state

### Types

- `NavigationState`: Type definition for navigation state
- `PullupState`: Type definition for pullup panel state
- `PullupTab`: Type definition for pullup panel tabs ('notes' | 'quotes' | 'settings')

## Development

### Building the Package

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## License

MIT
