# Enhanced Pullup Component

A Google Maps-style pullup component for the UB Reader application.

## Features

- **Snap Points**: The pullup snaps to three positions (collapsed, half-expanded, fully-expanded) when dragged
- **Double-Tap to Cycle**: Double-tap the handle to cycle through snap points
- **Swipe Gestures**: Swipe left or right to navigate between tabs
- **Tab Content Transitions**: Smooth animations when switching between tabs
- **Search Tab**: A new tab for searching content with a "second reader" mode
- **Search Term Highlighting**: Highlights search terms in results and content
- **State Persistence**: Remembers the last used tab, height, and open state between sessions
- **Enhanced Shadow**: Subtle shadow at the top of the pullup for better depth perception

## Components

### Pullup

The main component that combines all pullup components into a single component.

```tsx
<Pullup
  isOpen={isOpen}
  activeTab={activeTab}
  height={height}
  isPersistent={isPersistent}
  enableSnapPoints={true}
  onClose={() => setIsOpen(false)}
  onTabSelect={setActiveTab}
  onHeightChange={setHeight}
  notes={notes}
  onNoteUpdate={handleNoteUpdate}
  onNoteDelete={handleNoteDelete}
  quotes={quotes}
  onQuoteDelete={handleQuoteDelete}
  settings={settings}
  onSettingsChange={handleSettingsChange}
  sortOrder={sortOrder}
  onSortOrderChange={setSortOrder}
  onSearch={handleSearch}
  onSearchResultSelect={handleSearchResultSelect}
  minHeight={100}
  maxHeight={600}
/>
```

### PullupPanel

The panel component that handles dragging, snap points, and touch gestures.

```tsx
<PullupPanel
  isOpen={isOpen}
  height={height}
  isPersistent={isPersistent}
  enableSnapPoints={true}
  onClose={() => setIsOpen(false)}
  onHeightChange={setHeight}
  minHeight={100}
  maxHeight={600}
>
  {children}
</PullupPanel>
```

### PullupTabs

The tabs component that handles tab navigation and swipe gestures.

```tsx
<PullupTabs
  activeTab={activeTab}
  onTabSelect={setActiveTab}
/>
```

### PullupContent

The content component that renders the active tab content with transitions.

```tsx
<PullupContent
  activeTab={activeTab}
  notes={notes}
  onNoteUpdate={handleNoteUpdate}
  onNoteDelete={handleNoteDelete}
  quotes={quotes}
  onQuoteDelete={handleQuoteDelete}
  settings={settings}
  onSettingsChange={handleSettingsChange}
  sortOrder={sortOrder}
  onSortOrderChange={setSortOrder}
  onSearch={handleSearch}
  onSearchResultSelect={handleSearchResultSelect}
/>
```

### SearchTab

The search tab component that provides search functionality.

```tsx
<SearchTab
  onSearch={handleSearch}
  onResultSelect={handleSearchResultSelect}
/>
```

### SnapPointIndicator

The snap point indicator component that shows which snap point is active.

```tsx
<SnapPointIndicator
  currentHeight={currentHeight}
  snapPoints={{
    collapsed: 100,
    half: 300,
    full: 600,
  }}
/>
```

## Usage

To use the enhanced pullup component, import the `Pullup` component and provide the necessary props:

```tsx
import { Pullup } from '@ub-ecosystem/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [height, setHeight] = useState(300);
  
  // ... other state and handlers
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Pullup</button>
      
      <Pullup
        isOpen={isOpen}
        activeTab={activeTab}
        height={height}
        isPersistent={false}
        enableSnapPoints={true}
        onClose={() => setIsOpen(false)}
        onTabSelect={setActiveTab}
        onHeightChange={setHeight}
        notes={notes}
        onNoteUpdate={handleNoteUpdate}
        onNoteDelete={handleNoteDelete}
        quotes={quotes}
        onQuoteDelete={handleQuoteDelete}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onSearch={handleSearch}
        onSearchResultSelect={handleSearchResultSelect}
      />
    </div>
  );
}
```

## Customization

The pullup component can be customized with the following props:

- `enableSnapPoints`: Enable or disable snap points
- `minHeight`: The minimum height of the pullup panel
- `maxHeight`: The maximum height of the pullup panel
- `className`: Additional CSS class name

## Accessibility

The pullup component is designed with accessibility in mind:

- All interactive elements have appropriate ARIA attributes
- The pullup can be closed with the Escape key
- Tab navigation works as expected
- Touch gestures have keyboard equivalents

## Browser Support

The pullup component works in all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge

Mobile browsers are also supported, with touch gestures optimized for mobile devices.
