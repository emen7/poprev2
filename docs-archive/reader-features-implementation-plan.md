# Reader Features Implementation Plan

## Overview

This document outlines the technical implementation plan for the enhanced UB Reader features, focusing on the width limitation, multi-purpose pull-up functionality, and tooltip system for scientific content.

## 1. Width Limitation for PC Reader

### Requirements

- Limit reader width to standard reading width (700-800px)
- Maintain proper margins on larger screens
- Ensure content remains centered

### Implementation Approach

#### CSS Implementation

```css
.reader-content-container {
  max-width: 760px; /* Optimal reading width */
  margin: 0 auto; /* Center content */
  padding: 0 20px; /* Consistent padding */
}

/* Additional spacing for very large screens */
@media (min-width: 1440px) {
  .reader-content-container {
    padding: 0 40px;
  }
}
```

#### Component Updates

1. Update `ContentContainer.tsx` component:

   - Add width limitation as default behavior
   - Provide prop to override if needed for special content
   - Ensure proper inheritance of styles

2. Update `ReaderLayout.tsx`:
   - Ensure content area respects width limitations
   - Maintain proper spacing with sidebars and panels

## 2. Multi-Purpose Pull-Up Functionality

### Requirements

- Support for user notes and quote collections
- Scientific content features (references, atlas, glossary, abbreviations)
- Tabbed interface for different content types
- Adjustable height with memory

### Implementation Approach

#### Component Structure

1. Create new component: `MultiPurposePanel.tsx`

   ```typescript
   interface MultiPurposePanelProps {
     initialTab?: string;
     initialHeight?: number;
     onHeightChange?: (height: number) => void;
     tabs: {
       id: string;
       label: string;
       icon: ReactNode;
       content: ReactNode;
     }[];
   }
   ```

2. Create specialized content components:
   - `NotesPanel.tsx`
   - `QuotesPanel.tsx`
   - `ReferencesPanel.tsx`
   - `GlossaryPanel.tsx`
   - `AtlasPanel.tsx`

#### Height Adjustment Implementation

```typescript
// Inside MultiPurposePanel component
const [panelHeight, setPanelHeight] = useState(initialHeight || 300);
const startResizeY = useRef(0);
const startHeight = useRef(0);

const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
  startResizeY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
  startHeight.current = panelHeight;

  // Add document-level event listeners for move and end events
  // ...
};

const handleResizeMove = (clientY: number) => {
  const delta = startResizeY.current - clientY;
  const newHeight = Math.max(100, Math.min(window.innerHeight * 0.8, startHeight.current + delta));
  setPanelHeight(newHeight);

  if (onHeightChange) {
    onHeightChange(newHeight);
  }
};
```

#### State Persistence

Use localStorage to remember the last used height and active tab:

```typescript
useEffect(() => {
  // Load saved height and tab
  const savedHeight = localStorage.getItem('reader-panel-height');
  const savedTab = localStorage.getItem('reader-panel-tab');

  if (savedHeight) {
    setPanelHeight(parseInt(savedHeight, 10));
  }

  if (savedTab) {
    setActiveTab(savedTab);
  }
}, []);

useEffect(() => {
  // Save current height and tab
  localStorage.setItem('reader-panel-height', panelHeight.toString());
  localStorage.setItem('reader-panel-tab', activeTab);
}, [panelHeight, activeTab]);
```

## 3. Tooltip System for Scientific Content

### Requirements

- Show abbreviation definitions on hover/touch
- Display equations in simple English
- Provide context for technical terms

### Implementation Approach

#### Data Structure

Define a schema for tooltip content:

```typescript
interface TooltipData {
  type: 'abbreviation' | 'equation' | 'term';
  shortForm?: string; // For abbreviations
  fullForm: string; // Full text or explanation
  simplifiedForm?: string; // For equations
}

// Example usage
const tooltipData: Record<string, TooltipData> = {
  DNA: {
    type: 'abbreviation',
    shortForm: 'DNA',
    fullForm: 'Deoxyribonucleic Acid',
  },
  'E=mc²': {
    type: 'equation',
    fullForm: 'Energy equals mass times the speed of light squared',
    simplifiedForm: 'Energy and mass are equivalent and convertible',
  },
};
```

#### Component Implementation

1. Create `ScientificTooltip` component:

```typescript
const ScientificTooltip: React.FC<{
  content: string;
  data: TooltipData;
}> = ({ content, data }) => {
  return (
    <Tooltip
      content={
        <div className="scientific-tooltip">
          {data.type === 'abbreviation' && (
            <>
              <div className="tooltip-title">{data.shortForm}</div>
              <div>{data.fullForm}</div>
            </>
          )}
          {data.type === 'equation' && (
            <>
              <div className="tooltip-title">{content}</div>
              <div>{data.fullForm}</div>
              {data.simplifiedForm && (
                <div className="tooltip-simplified">{data.simplifiedForm}</div>
              )}
            </>
          )}
          {data.type === 'term' && <div>{data.fullForm}</div>}
        </div>
      }
    >
      <span className="scientific-term">{content}</span>
    </Tooltip>
  );
};
```

2. Create content processor to automatically wrap terms:

```typescript
const processScientificContent = (content: string, tooltipData: Record<string, TooltipData>) => {
  // This is a simplified approach - a real implementation would use proper parsing
  let processedContent = content;

  Object.entries(tooltipData).forEach(([term, data]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'g');
    processedContent = processedContent.replace(
      regex,
      `<span class="scientific-term" data-tooltip="${encodeURIComponent(
        JSON.stringify(data)
      )}">${term}</span>`
    );
  });

  return processedContent;
};
```

3. Add event handlers for mobile:

```typescript
useEffect(() => {
  const terms = document.querySelectorAll('.scientific-term');

  terms.forEach(term => {
    term.addEventListener('click', e => {
      // Show tooltip on mobile
      const tooltipData = JSON.parse(
        decodeURIComponent((e.currentTarget as HTMLElement).getAttribute('data-tooltip') || '{}')
      );

      showMobileTooltip(tooltipData, e.currentTarget as HTMLElement);
    });
  });

  return () => {
    // Clean up event listeners
  };
}, [content]);
```

## Implementation Phases

### Phase 1: Core Structure Updates

- Implement width limitation in ContentContainer
- Create basic structure for MultiPurposePanel
- Set up tooltip data schema

### Phase 2: Pull-Up Panel Development

- Implement height adjustment with drag handle
- Develop tab navigation system
- Create initial panel content components

### Phase 3: Scientific Content Enhancement

- Implement tooltip system
- Create content processor for scientific terms
- Add mobile-friendly interaction

### Phase 4: State Management and Persistence

- Implement localStorage for panel preferences
- Add context providers for tooltip data
- Create settings for user customization

### Phase 5: Testing and Refinement

- Cross-browser testing
- Accessibility review
- Performance optimization

## Technical Considerations

1. **Performance**

   - Use virtualized lists for large datasets (glossary, references)
   - Lazy-load panel content when switching tabs
   - Optimize tooltip rendering to prevent layout shifts

2. **Accessibility**

   - Ensure all interactive elements have proper ARIA attributes
   - Support keyboard navigation for tooltips
   - Provide high-contrast mode support

3. **Mobile Considerations**
   - Use touch-friendly interaction patterns
   - Ensure panels don't consume too much screen space on small devices
   - Implement swipe gestures for panel height adjustment

This implementation plan provides a roadmap for developing the enhanced reader features while maintaining performance and accessibility standards.
