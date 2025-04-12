# 04-P1-Pullup: Component Design

**Status**: Draft  
**Created**: April 11, 2025  
**Phase**: 1 - Foundation  
**Component**: Pullup System

## 1. Overview

The Pullup System provides a sliding panel that appears from the bottom of the viewport, offering functionality for notes, quotes, and settings. This system is a critical part of the user experience, allowing readers to interact with the content beyond just reading. The Pullup system will be migrated from the existing implementation to a more modular, presentation-only design that integrates with the new architecture.

## 2. Directory Structure

```
packages/
└── ui/
    └── components/
        └── pullup/
            ├── Pullup/              # Main pullup component
            │   ├── index.tsx        # Component export
            │   ├── Pullup.tsx       # Component implementation
            │   └── Pullup.css       # Component styles
            ├── PullupPanel/         # Panel container
            │   ├── index.tsx
            │   ├── PullupPanel.tsx
            │   └── PullupPanel.css
            ├── PullupTabs/          # Tab navigation
            │   ├── index.tsx
            │   ├── PullupTabs.tsx
            │   └── PullupTabs.css
            ├── PullupContent/       # Content area
            │   ├── index.tsx
            │   ├── PullupContent.tsx
            │   └── PullupContent.css
            ├── NotesTab/            # Notes tab
            │   ├── index.tsx
            │   ├── NotesTab.tsx
            │   └── NotesTab.css
            ├── QuotesTab/           # Quotes tab
            │   ├── index.tsx
            │   ├── QuotesTab.tsx
            │   └── QuotesTab.css
            ├── SettingsTab/         # Settings tab
            │   ├── index.tsx
            │   ├── SettingsTab.tsx
            │   └── SettingsTab.css
            ├── TextSelectionHandler/ # Selection handler
            │   ├── index.tsx
            │   ├── TextSelectionHandler.tsx
            │   └── TextSelectionHandler.css
            ├── types.ts             # Type definitions
            └── index.ts             # Public API exports
```

## 3. Component Specifications

### 3.1 Pullup Component

The main component that orchestrates the pullup system.

#### 3.1.1 Component Interface

```typescript
interface PullupProps {
  // State props
  isOpen: boolean;
  activeTab: PullupTab;
  height: number;
  isPersistent: boolean;

  // Data props
  notes: Note[];
  quotes: Quote[];
  settings: ReaderSettings;
  sortOrder: 'entry' | 'paper';

  // Event handlers
  onClose: () => void;
  onTabSelect: (tab: PullupTab) => void;
  onHeightChange: (height: number) => void;
  onNoteUpdate: (id: string, content: string) => void;
  onNoteDelete: (id: string) => void;
  onQuoteDelete: (id: string) => void;
  onSettingsChange: (settings: Partial<ReaderSettings>) => void;
  onSortOrderChange: (order: 'entry' | 'paper') => void;
}

function Pullup(props: PullupProps): JSX.Element;
```

#### 3.1.2 Implementation Details

The Pullup component is a composition of several sub-components:

```typescript
function Pullup(props: PullupProps): JSX.Element {
  const {
    isOpen,
    activeTab,
    height,
    isPersistent,
    notes,
    quotes,
    settings,
    sortOrder,
    onClose,
    onTabSelect,
    onHeightChange,
    onNoteUpdate,
    onNoteDelete,
    onQuoteDelete,
    onSettingsChange,
    onSortOrderChange,
  } = props;

  return (
    <PullupPanel
      isOpen={isOpen}
      height={height}
      isPersistent={isPersistent}
      onClose={onClose}
      onHeightChange={onHeightChange}
    >
      <PullupTabs activeTab={activeTab} onTabSelect={onTabSelect} />
      <PullupContent>
        {activeTab === 'notes' && (
          <NotesTab
            notes={notes}
            sortOrder={sortOrder}
            onNoteUpdate={onNoteUpdate}
            onNoteDelete={onNoteDelete}
            onSortOrderChange={onSortOrderChange}
          />
        )}
        {activeTab === 'quotes' && (
          <QuotesTab
            quotes={quotes}
            sortOrder={sortOrder}
            onQuoteDelete={onQuoteDelete}
            onSortOrderChange={onSortOrderChange}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTab settings={settings} onSettingsChange={onSettingsChange} />
        )}
      </PullupContent>
    </PullupPanel>
  );
}
```

### 3.2 PullupPanel Component

The container component that handles the sliding behavior and resizing.

#### 3.2.1 Component Interface

```typescript
interface PullupPanelProps {
  children: React.ReactNode;
  isOpen: boolean;
  height: number;
  isPersistent: boolean;
  onClose: () => void;
  onHeightChange: (height: number) => void;
}

function PullupPanel(props: PullupPanelProps): JSX.Element;
```

#### 3.2.2 Implementation Details

```typescript
function PullupPanel(props: PullupPanelProps): JSX.Element {
  const { children, isOpen, height, isPersistent, onClose, onHeightChange } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(height);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartY(getClientY(e));
    setStartHeight(height);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  };

  // Handle drag move
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientY = getClientY(e);
    const deltaY = startY - clientY;
    const newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, startHeight + deltaY));
    onHeightChange(newHeight);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
  };

  // Helper to get client Y position from mouse or touch event
  const getClientY = (e: any): number => {
    return e.touches ? e.touches[0].clientY : e.clientY;
  };

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

  // Determine panel class names
  const panelClassNames = [
    'pullup-panel',
    isOpen ? 'pullup-panel-open' : '',
    isPersistent ? 'pullup-panel-persistent' : '',
    isDragging ? 'pullup-panel-dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={panelClassNames} style={{ height: isOpen ? `${height}px` : '0' }}>
      <div className="pullup-handle" onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
        <div className="pullup-handle-bar"></div>
        {!isPersistent && (
          <button className="pullup-close-button" onClick={onClose} aria-label="Close pullup panel">
            ×
          </button>
        )}
      </div>
      <div className="pullup-content-container">{children}</div>
    </div>
  );
}
```

### 3.3 PullupTabs Component

The tab navigation component for switching between notes, quotes, and settings.

#### 3.3.1 Component Interface

```typescript
interface PullupTabsProps {
  activeTab: PullupTab;
  onTabSelect: (tab: PullupTab) => void;
}

function PullupTabs(props: PullupTabsProps): JSX.Element;
```

#### 3.3.2 Implementation Details

```typescript
function PullupTabs(props: PullupTabsProps): JSX.Element {
  const { activeTab, onTabSelect } = props;

  const tabs: Array<{ id: PullupTab; label: string; icon: string }> = [
    { id: 'notes', label: 'Notes', icon: 'note-icon' },
    { id: 'quotes', label: 'Quotes', icon: 'quote-icon' },
    { id: 'settings', label: 'Settings', icon: 'settings-icon' },
  ];

  return (
    <div className="pullup-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`pullup-tab ${activeTab === tab.id ? 'pullup-tab-active' : ''}`}
          onClick={() => onTabSelect(tab.id)}
          aria-selected={activeTab === tab.id}
          role="tab"
        >
          <span className={`pullup-tab-icon ${tab.icon}`}></span>
          <span className="pullup-tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
```

### 3.4 NotesTab Component

The component for displaying and managing notes.

#### 3.4.1 Component Interface

```typescript
interface NotesTabProps {
  notes: Note[];
  sortOrder: 'entry' | 'paper';
  onNoteUpdate: (id: string, content: string) => void;
  onNoteDelete: (id: string) => void;
  onSortOrderChange: (order: 'entry' | 'paper') => void;
}

function NotesTab(props: NotesTabProps): JSX.Element;
```

#### 3.4.2 Implementation Details

```typescript
function NotesTab(props: NotesTabProps): JSX.Element {
  const { notes, sortOrder, onNoteUpdate, onNoteDelete, onSortOrderChange } = props;
  const [newNoteContent, setNewNoteContent] = useState('');
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  // Handle new note submission
  const handleNewNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteContent.trim()) {
      // Note: actual note creation is handled by the container component
      // This is just for clearing the input
      setNewNoteContent('');
    }
  };

  // Sort notes based on sort order
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === 'entry') {
      // Sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by paper reference
      return a.reference.paper === b.reference.paper
        ? a.reference.section === b.reference.section
          ? a.reference.paragraph - b.reference.paragraph
          : a.reference.section - b.reference.section
        : a.reference.paper - b.reference.paper;
    }
  });

  return (
    <div className="notes-tab">
      <div className="notes-header">
        <h2>Notes</h2>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={e => onSortOrderChange(e.target.value as 'entry' | 'paper')}
          >
            <option value="entry">Entry Date</option>
            <option value="paper">Paper Order</option>
          </select>
        </div>
      </div>

      <form className="new-note-form" onSubmit={handleNewNoteSubmit}>
        <textarea
          className="new-note-input"
          value={newNoteContent}
          onChange={e => setNewNoteContent(e.target.value)}
          placeholder="Add a new note..."
          rows={3}
        />
        <button type="submit" className="new-note-button" disabled={!newNoteContent.trim()}>
          Add Note
        </button>
      </form>

      <div className="notes-list">
        {sortedNotes.length === 0 ? (
          <div className="empty-state">No notes yet. Add your first note above.</div>
        ) : (
          sortedNotes.map(note => (
            <div
              key={note.id}
              className={`note-item ${expandedNoteId === note.id ? 'note-expanded' : ''}`}
            >
              <div
                className="note-header"
                onClick={() => setExpandedNoteId(expandedNoteId === note.id ? null : note.id)}
              >
                <div className="note-reference">{note.reference.toString()}</div>
                <div className="note-preview">
                  {note.content.substring(0, 100)}
                  {note.content.length > 100 ? '...' : ''}
                </div>
                <div className="note-date">
                  {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
                </div>
                <button
                  className="note-expand-button"
                  aria-label={expandedNoteId === note.id ? 'Collapse note' : 'Expand note'}
                >
                  {expandedNoteId === note.id ? '▲' : '▼'}
                </button>
              </div>

              {expandedNoteId === note.id && (
                <div className="note-expanded-content">
                  {note.quote && <div className="note-quote">"{note.quote}"</div>}
                  <textarea
                    className="note-edit-textarea"
                    value={note.content}
                    onChange={e => onNoteUpdate(note.id, e.target.value)}
                    rows={5}
                  />
                  <div className="note-actions">
                    <button className="note-delete-button" onClick={() => onNoteDelete(note.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### 3.5 QuotesTab Component

The component for displaying and managing quotes.

#### 3.5.1 Component Interface

```typescript
interface QuotesTabProps {
  quotes: Quote[];
  sortOrder: 'entry' | 'paper';
  onQuoteDelete: (id: string) => void;
  onSortOrderChange: (order: 'entry' | 'paper') => void;
}

function QuotesTab(props: QuotesTabProps): JSX.Element;
```

#### 3.5.2 Implementation Details

Similar to NotesTab but simplified for quotes management.

### 3.6 SettingsTab Component

The component for displaying and managing reader settings.

#### 3.6.1 Component Interface

```typescript
interface SettingsTabProps {
  settings: ReaderSettings;
  onSettingsChange: (settings: Partial<ReaderSettings>) => void;
}

function SettingsTab(props: SettingsTabProps): JSX.Element;
```

#### 3.6.2 Implementation Details

```typescript
function SettingsTab(props: SettingsTabProps): JSX.Element {
  const { settings, onSettingsChange } = props;

  // Handle font size change
  const handleFontSizeChange = (size: number) => {
    onSettingsChange({ fontSize: size });
  };

  // Handle line height change
  const handleLineHeightChange = (height: number) => {
    onSettingsChange({ lineHeight: height });
  };

  // Handle font family change
  const handleFontFamilyChange = (family: string) => {
    onSettingsChange({ fontFamily: family });
  };

  // Handle theme change
  const handleThemeChange = (theme: 'light' | 'dark') => {
    onSettingsChange({ theme });
  };

  // Handle paragraph numbers toggle
  const handleParagraphNumbersToggle = () => {
    onSettingsChange({ showParagraphNumbers: !settings.showParagraphNumbers });
  };

  // Handle format type change
  const handleFormatTypeChange = (formatType: 'traditional' | 'modern') => {
    onSettingsChange({ formatType });
  };

  return (
    <div className="settings-tab">
      <h2>Reader Settings</h2>

      <div className="settings-section">
        <h3>Text Size</h3>
        <div className="font-size-controls">
          <button
            className="font-size-button"
            onClick={() => handleFontSizeChange(Math.max(12, settings.fontSize - 1))}
            aria-label="Decrease font size"
          >
            A-
          </button>
          <span className="font-size-value">{settings.fontSize}px</span>
          <button
            className="font-size-button"
            onClick={() => handleFontSizeChange(Math.min(24, settings.fontSize + 1))}
            aria-label="Increase font size"
          >
            A+
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Line Spacing</h3>
        <div className="line-height-controls">
          <input
            type="range"
            min="1.2"
            max="2.0"
            step="0.1"
            value={settings.lineHeight}
            onChange={e => handleLineHeightChange(parseFloat(e.target.value))}
          />
          <span className="line-height-value">{settings.lineHeight}x</span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Font</h3>
        <div className="font-family-controls">
          <select
            value={settings.fontFamily}
            onChange={e => handleFontFamilyChange(e.target.value)}
          >
            <option value="Georgia, serif">Georgia (Serif)</option>
            <option value="system-ui, sans-serif">System (Sans-serif)</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Arial, sans-serif">Arial</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Theme</h3>
        <div className="theme-controls">
          <button
            className={`theme-button ${settings.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </button>
          <button
            className={`theme-button ${settings.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Format</h3>
        <div className="format-controls">
          <button
            className={`format-button ${settings.formatType === 'traditional' ? 'active' : ''}`}
            onClick={() => handleFormatTypeChange('traditional')}
          >
            Traditional
          </button>
          <button
            className={`format-button ${settings.formatType === 'modern' ? 'active' : ''}`}
            onClick={() => handleFormatTypeChange('modern')}
          >
            Modern
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>Display Options</h3>
        <div className="display-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={settings.showParagraphNumbers}
              onChange={handleParagraphNumbersToggle}
            />
            Show paragraph numbers
          </label>
        </div>
      </div>
    </div>
  );
}
```

### 3.7 TextSelectionHandler Component

The component that handles text selection and displays the selection menu.

#### 3.7.1 Component Interface

```typescript
interface TextSelectionHandlerProps {
  onNoteCreate: (note: Note) => void;
  onQuoteCreate: (quote: Quote) => void;
}

function TextSelectionHandler(props: TextSelectionHandlerProps): JSX.Element;
```

#### 3.7.2 Implementation Details

```typescript
function TextSelectionHandler(props: TextSelectionHandlerProps): JSX.Element {
  const { onNoteCreate, onQuoteCreate } = props;
  const [selection, setSelection] = useState<TextSelection | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  // Handle text selection
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setSelection(null);
        setMenuPosition(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();

      if (!text) {
        setSelection(null);
        setMenuPosition(null);
        return;
      }

      // Extract reference from selection
      const reference = extractReferenceFromSelection(selection);

      setSelection({
        text,
        reference,
        range,
      });

      // Position menu above selection
      const rect = range.getBoundingClientRect();
      setMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuPosition) return;

      const target = e.target as Node;
      const menu = document.getElementById('selection-menu');

      if (menu && !menu.contains(target)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuPosition]);

  // Handle create note
  const handleCreateNote = () => {
    if (!selection || !selection.reference) return;

    const note: Note = {
      id: generateId(),
      content: '',
      quote: selection.text,
      reference: selection.reference,
      createdAt: new Date().toISOString(),
    };

    onNoteCreate(note);
    setMenuPosition(null);
  };

  // Handle create quote
  const handleCreateQuote = () => {
    if (!selection || !selection.reference) return;

    const quote: Quote = {
      id: generateId(),
      text: selection.text,
      reference: selection.reference,
      createdAt: new Date().toISOString(),
    };

    onQuoteCreate(quote);
    setMenuPosition(null);
  };

  // Handle copy text
  const handleCopyText = () => {
    if (!selection) return;

    const textToCopy = selection.reference
      ? `${selection.reference.toString()} "${selection.text}"`
      : selection.text;

    navigator.clipboard.writeText(textToCopy);
    setMenuPosition(null);
  };

  // Helper to extract reference from selection
  const extractReferenceFromSelection = (selection: Selection): Reference | undefined => {
    // Implementation depends on the document structure
    // This is a placeholder
    return undefined;
  };

  // Helper to generate unique ID
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 15);
  };

  if (!menuPosition) {
    return null;
  }

  return (
    <div
      id="selection-menu"
      className="selection-menu"
      style={{
        position: 'absolute',
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <button
        className="selection-menu-button"
        onClick={handleCreateNote}
        disabled={!selection?.reference}
      >
        Add Note
      </button>
      <button
        className="selection-menu-button"
        onClick={handleCreateQuote}
        disabled={!selection?.reference}
      >
        Save Quote
      </button>
      <button className="selection-menu-button" onClick={handleCopyText}>
        Copy
      </button>
    </div>
  );
}
```

### 3.8 Type Definitions

```typescript
// Pullup tab types
type PullupTab = 'notes' | 'quotes' | 'settings';

// Note type
interface Note {
  id: string;
  content: string;
  quote?: string;
  reference: Reference;
  createdAt: string;
  updatedAt?: string;
}

// Quote type
interface Quote {
  id: string;
  text: string;
  reference: Reference;
  createdAt: string;
}

// Reader settings type
interface ReaderSettings {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: 'light' | 'dark';
  showParagraphNumbers: boolean;
  formatType: 'traditional' | 'modern';
}

// Text selection type
interface TextSelection {
  text: string;
  reference?: Reference;
  range?: Range;
}
```

## 4. Implementation Guidelines

### 4.1 Presentation-Only Components

The Pullup components should be presentation-only, meaning:

1. They should not manage their own state
2. They should receive all data and callbacks as props
3. They should not directly interact with state management or data services

This separation allows for:

1. Better testability
2. Easier reuse across different publications
3. Cleaner separation of concerns

### 4.2 Accessibility Considerations

The Pullup system should be fully accessible:

1. All interactive elements should be keyboard navigable
2. Proper ARIA attributes should be used
3. Focus management should be implemented
4. Color contrast should meet WCAG standards

### 4.3 Responsive Design

The Pullup system should adapt to different screen sizes:

1. On mobile, the pullup should take up more screen space
2. On desktop, the pullup should have a maximum width
3. The persistent mode should be enabled automatically on larger screens
4. Touch interactions should be properly supported

### 4.4 Performance Optimization

To ensure smooth performance:

1. Use CSS transitions for animations
2. Virtualize long lists of notes and quotes
3. Debounce resize and scroll events
4. Memoize expensive calculations and renders

## 5. Dependencies

- React 18+
- TypeScript 4.9+
- UI Theme System (for styling)

## 6. Testing Strategy

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Test keyboard navigation and screen reader compatibility
4. **Responsive Tests**: Test on different screen sizes

## 7. Next Steps

1. Create the directory structure
2. Migrate existing components
3. Refactor to use the UI Theme system
4. Make components presentation-only
5. Implement accessibility improvements
6. Create documentation and examples
