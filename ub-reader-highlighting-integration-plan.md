# UB Reader Highlighting Integration Plan

This document outlines the plan for integrating the highlighting system into the main UB Reader application.

## Overview

The highlighting system will be integrated into the UB Reader application to allow users to highlight text, toggle highlight visibility, and copy highlighted text. The integration will be done in a way that is consistent with the existing UB Reader architecture and user experience.

## Implementation Steps

### 1. Create a Highlighting Module Package

First, we'll create a proper package for the highlighting module in the monorepo structure:

```bash
mkdir -p packages/highlighting
cd packages/highlighting
```

Create the package structure:

```
packages/highlighting/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── HighlightManager.ts
│   ├── components/
│   │   ├── HighlightContext.tsx
│   │   ├── HighlightProvider.tsx
│   │   └── useHighlight.ts
│   └── styles/
│       └── highlighting.css
└── README.md
```

### 2. Convert the Highlighting Module to TypeScript

Convert the existing JavaScript highlighting module to TypeScript for better type safety and integration with the React components:

```typescript
// src/HighlightManager.ts
export interface HighlightManagerOptions {
  container: HTMLElement;
  colors?: HighlightColor[];
  isDarkMode?: () => boolean;
  onHighlight?: (data: HighlightData) => void;
  showHighlights?: boolean;
}

export interface HighlightColor {
  name: string;
  lightModeColor: string;
  darkModeColor: string;
  displayName?: string;
  lightModeOnly?: boolean;
  darkModeOnly?: boolean;
}

export interface HighlightData {
  text: string;
  color: string | null;
  range: Range;
}

export class HighlightManager {
  // Implementation from the existing highlight-module.js
  // with TypeScript types added
}
```

### 3. Create React Context for Highlighting

Create a React context to manage the highlighting state across the application:

```typescript
// src/components/HighlightContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { HighlightManager, HighlightManagerOptions, HighlightData } from '../HighlightManager';

interface HighlightContextProps {
  highlightManager: HighlightManager | null;
  showHighlights: boolean;
  setShowHighlights: (show: boolean) => void;
  highlights: HighlightData[];
  addHighlight: (highlight: HighlightData) => void;
  removeHighlight: (highlight: HighlightData) => void;
}

const HighlightContext = createContext<HighlightContextProps | undefined>(undefined);

export const HighlightProvider: React.FC<{
  children: React.ReactNode;
  containerSelector: string;
  isDarkMode: () => boolean;
}> = ({ children, containerSelector, isDarkMode }) => {
  const [highlightManager, setHighlightManager] = useState<HighlightManager | null>(null);
  const [showHighlights, setShowHighlights] = useState<boolean>(true);
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Initialize the highlight manager when the component mounts
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (container) {
      containerRef.current = container;
      const manager = new HighlightManager({
        container,
        isDarkMode,
        showHighlights,
        onHighlight: data => {
          if (data.color) {
            addHighlight(data);
          } else {
            removeHighlight(data);
          }
        },
      });
      setHighlightManager(manager);
    }

    // Clean up the highlight manager when the component unmounts
    return () => {
      if (highlightManager) {
        highlightManager.destroy();
      }
    };
  }, [containerSelector, isDarkMode]);

  // Update highlight visibility when showHighlights changes
  useEffect(() => {
    if (highlightManager) {
      highlightManager.setShowHighlights(showHighlights);
    }
  }, [highlightManager, showHighlights]);

  const addHighlight = (highlight: HighlightData) => {
    setHighlights(prevHighlights => [...prevHighlights, highlight]);
  };

  const removeHighlight = (highlight: HighlightData) => {
    setHighlights(prevHighlights => prevHighlights.filter(h => h.text !== highlight.text));
  };

  return (
    <HighlightContext.Provider
      value={{
        highlightManager,
        showHighlights,
        setShowHighlights,
        highlights,
        addHighlight,
        removeHighlight,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (context === undefined) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};
```

### 4. Modify the UBParagraph Component

Update the UBParagraph component to support highlighting:

```typescript
// apps/ub-reader/components/UBParagraph.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { useTheme } from '../contexts/ThemeContext';
import { ReferenceProcessor } from './references';
import { useHighlight } from '@ub/highlighting'; // Import from the new package

// ... existing code ...

export const UBParagraph: React.FC<UBParagraphProps> = ({
  paragraph,
  isTopicChange = false,
  className = '',
  currentPaper = 0,
}) => {
  // ... existing code ...

  // Get the highlight context
  const { highlightManager } = useHighlight();
  const paragraphRef = useRef<HTMLDivElement>(null);

  // ... existing code ...

  return (
    <div className={paragraphClasses} id={`p-${paragraph.number}`} ref={paragraphRef}>
      {showParagraphNumbers && <span className="ub-paragraph-number">{paragraph.number}</span>}

      {/* Use ReferenceProcessor to detect and link references */}
      <div className="ub-paragraph-text">
        <ReferenceProcessor
          content={processText(paragraph.text)}
          currentPaper={currentPaper}
          baseUrl="/paper"
          showTooltips={true}
          onReferenceClick={handleReferenceClick}
        />
      </div>
    </div>
  );
};

export default UBParagraph;
```

### 5. Add Highlighting Provider to the Layout

Add the HighlightProvider to the main layout component:

```typescript
// apps/ub-reader/app/layout.tsx
import { HighlightProvider } from '@ub/highlighting';
import { ThemeProvider } from '../contexts/ThemeContext';
import { UserPreferencesProvider } from '../contexts/UserPreferencesContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserPreferencesProvider>
          <ThemeProvider>
            <HighlightProvider
              containerSelector=".ub-paper"
              isDarkMode={() => document.body.classList.contains('dark-mode')}
            >
              {children}
            </HighlightProvider>
          </ThemeProvider>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
```

### 6. Add Highlighting Controls to the UI

Add highlighting controls to the UI, such as a toggle for showing/hiding highlights:

```typescript
// apps/ub-reader/components/PreferencesPanel.tsx
import { useHighlight } from '@ub/highlighting';

export const PreferencesPanel = () => {
  // ... existing code ...

  const { showHighlights, setShowHighlights } = useHighlight();

  // ... existing code ...

  return (
    <div className="preferences-panel">
      {/* ... existing code ... */}

      <div className="preference-section">
        <h3>Highlighting</h3>
        <div className="preference-item">
          <label htmlFor="show-highlights">Show Highlights</label>
          <input
            type="checkbox"
            id="show-highlights"
            checked={showHighlights}
            onChange={e => setShowHighlights(e.target.checked)}
          />
        </div>
      </div>

      {/* ... existing code ... */}
    </div>
  );
};
```

### 7. Add Highlight Persistence

Add functionality to save and restore highlights using localStorage or a database:

```typescript
// src/components/HighlightContext.tsx
// ... existing code ...

interface HighlightStorage {
  paperNumber: number;
  sectionNumber: number;
  paragraphNumber: number;
  text: string;
  color: string;
  timestamp: string;
}

export const HighlightProvider: React.FC<{
  children: React.ReactNode;
  containerSelector: string;
  isDarkMode: () => boolean;
  currentPaper?: number;
  currentSection?: number;
}> = ({ children, containerSelector, isDarkMode, currentPaper, currentSection }) => {
  // ... existing code ...

  // Load highlights from localStorage when the component mounts
  useEffect(() => {
    if (currentPaper) {
      const storedHighlights = localStorage.getItem('ub-highlights');
      if (storedHighlights) {
        try {
          const parsedHighlights = JSON.parse(storedHighlights) as HighlightStorage[];
          const paperHighlights = parsedHighlights.filter(
            h =>
              h.paperNumber === currentPaper &&
              (!currentSection || h.sectionNumber === currentSection)
          );

          // Apply the highlights to the DOM
          // This would require finding the text in the DOM and applying the highlight
          // This is a simplified example and would need to be expanded
          paperHighlights.forEach(highlight => {
            // Find the paragraph element
            const paragraphElement = document.querySelector(`#p-${highlight.paragraphNumber}`);
            if (paragraphElement) {
              // Find the text in the paragraph
              const textNode = Array.from(
                paragraphElement.querySelectorAll('.ub-paragraph-text')
              ).find(node => node.textContent?.includes(highlight.text));

              if (textNode) {
                // Create a range for the text
                const range = document.createRange();
                const textContent = textNode.textContent || '';
                const startIndex = textContent.indexOf(highlight.text);

                if (startIndex !== -1) {
                  // Set the range to the text
                  range.setStart(textNode.firstChild!, startIndex);
                  range.setEnd(textNode.firstChild!, startIndex + highlight.text.length);

                  // Apply the highlight
                  const selection = window.getSelection();
                  selection?.removeAllRanges();
                  selection?.addRange(range);

                  // Apply the highlight using the highlight manager
                  highlightManager?.applyHighlight(highlight.color);
                }
              }
            }
          });
        } catch (error) {
          console.error('Error parsing stored highlights:', error);
        }
      }
    }
  }, [currentPaper, currentSection, highlightManager]);

  // Save highlights to localStorage when they change
  useEffect(() => {
    if (highlights.length > 0) {
      // Convert highlights to a format suitable for storage
      const storageHighlights: HighlightStorage[] = highlights.map(highlight => {
        // Extract paragraph number from the closest paragraph element
        const paragraphElement =
          highlight.range.startContainer.parentElement?.closest('.ub-paragraph');
        const paragraphNumber = paragraphElement
          ? parseInt(paragraphElement.id.replace('p-', ''), 10)
          : 0;

        return {
          paperNumber: currentPaper || 0,
          sectionNumber: currentSection || 0,
          paragraphNumber,
          text: highlight.text,
          color: highlight.color || '',
          timestamp: new Date().toISOString(),
        };
      });

      // Get existing highlights from localStorage
      const storedHighlights = localStorage.getItem('ub-highlights');
      let allHighlights: HighlightStorage[] = [];

      if (storedHighlights) {
        try {
          allHighlights = JSON.parse(storedHighlights) as HighlightStorage[];

          // Remove highlights for the current paper/section
          allHighlights = allHighlights.filter(
            h =>
              h.paperNumber !== currentPaper ||
              (currentSection && h.sectionNumber !== currentSection)
          );
        } catch (error) {
          console.error('Error parsing stored highlights:', error);
        }
      }

      // Add the new highlights
      allHighlights = [...allHighlights, ...storageHighlights];

      // Save to localStorage
      localStorage.setItem('ub-highlights', JSON.stringify(allHighlights));
    }
  }, [highlights, currentPaper, currentSection]);

  // ... existing code ...
};
```

### 8. Add Highlight Management UI

Add a UI for managing highlights, such as a list of highlights and the ability to delete them:

```typescript
// apps/ub-reader/components/HighlightManager.tsx
import React from 'react';
import { useHighlight } from '@ub/highlighting';

export const HighlightManager: React.FC = () => {
  const { highlights, removeHighlight } = useHighlight();

  return (
    <div className="highlight-manager">
      <h3>Your Highlights</h3>
      {highlights.length === 0 ? (
        <p>No highlights yet</p>
      ) : (
        <ul className="highlight-list">
          {highlights.map((highlight, index) => (
            <li key={index} className={`highlight-item highlight-${highlight.color}`}>
              <div className="highlight-text">{highlight.text}</div>
              <button className="highlight-delete" onClick={() => removeHighlight(highlight)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Testing Plan

1. **Unit Tests**: Write unit tests for the HighlightManager class and React components.
2. **Integration Tests**: Test the integration of the highlighting system with the UB Reader.
3. **User Testing**: Have users test the highlighting functionality to ensure it meets their needs.

## Deployment Plan

1. **Package Publishing**: Publish the highlighting package to the monorepo.
2. **UB Reader Integration**: Integrate the highlighting package into the UB Reader.
3. **Testing**: Test the integration in development and staging environments.
4. **Deployment**: Deploy the updated UB Reader to production.

## Future Enhancements

1. **Search through highlights**: Add ability to search and navigate through highlights.
2. **Categorized highlights**: Allow grouping highlights by category or purpose.
3. **Highlight sharing**: Enable sharing highlights between users.
4. **Annotation enhancements**: Expand note-taking capabilities.
5. **Mobile optimization**: Improve touch interaction for mobile devices.
