# UB Reader UI Improvements Implementation Plan

This document outlines the implementation plan for the requested UI improvements to the UB Reader.

## 1. Text Alignment Settings

**Changes required:**

- Add text alignment options to the Settings tab in the Format section
- Set left alignment as the default
- Implement right and justified alignment options

**Implementation details:**

1. Update `ReaderSettings` interface in `packages/ui/src/pullup/SettingsTab.tsx` to include:

   ```typescript
   textAlignment: 'left' | 'right' | 'justified';
   ```

2. Add alignment controls to the Format section of the settings UI with left as default

3. Modify CSS to apply text alignment to content containers based on settings

## 2. Paragraph Numbering Format

**Changes required:**

- Display only paragraph numbers (not section numbers)
- Keep paragraph numbers in their own column to the left of text

**Implementation details:**

1. Update `ParagraphRenderer.tsx` to ensure it only displays paragraph numbers
2. Confirm the `paragraphNumberOnly` extraction is working correctly
3. Maintain the dedicated column layout with proper styling

## 3. Section Title Styling

**Changes required:**

- Remove all-caps styling (text-transform: uppercase)
- Apply title case to section titles

**Implementation details:**

1. Update `SectionRenderer.css`:
   - Remove `text-transform: uppercase` from these selectors:
     - `.section-format-traditional .section-title`
     - `.section-format-modern .section-title`
2. Add helper function for title case formatting if needed

## 4. Pullup Bar Improvements

**Changes required:**

- Make pullup bar partially visible at all times
- Remove "Drag to Resize" label
- Reduce default minHeight
- Fix return-to-original-state behavior
- Improve Notes button toggle behavior

**Implementation details:**

1. Update `PullupPanel.tsx`:

   - Modify transformation logic to keep a portion visible when collapsed
   - Reduce default `minHeight` from 100px to a smaller value (e.g., 40-50px)

2. Update pullup state management to reset height when toggled:
   - Revise state handling in `Pullup.tsx` to track original collapse state
   - Ensure tapping Notes button toggles between open and original collapsed state

## 5. Tab Layout Adjustments

**Changes required:**

- Make tab labels adjacent with minimal spacing
- Left-align the "Notes Quotes Settings" tabs set (not centered or spread out)

**Implementation details:**

1. Update `PullupTabs.css`:
   - Reduce `margin-right` in `.pullup-tab` (from 8px to a smaller value)
   - Add styling to make tabs appear as a cohesive unit
   - Adjust the parent container to align tabs to the left instead of being centered or spaced out

## 6. Notes Feature Coordination

**Changes required:**

- Create separate column for notes indicators to left of paragraph numbers
- Update layout to: [Notes dots] [Paragraph numbers] [Text content]
- Add settings to toggle each column independently

**Implementation details:**

1. Update `ParagraphNumbering.tsx` and CSS:

   - Reorganize layout to have separate columns for notes dots and numbers
   - Position notes indicator column to the left of paragraph numbers

2. Update `SettingsTab.tsx`:
   - Add independent toggles for notes indicators and paragraph numbers

## Visual Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header                                                  │
├─────────────────────────────────────────────────────────┤
│ Content Area                                            │
│ ┌───┬───┬────────────────────────────────────────────┐  │
│ │ N │ # │ Paper text content                         │  │
│ │ o │   │ Left-aligned by default                    │  │
│ │ t │ 1 │ Some content in paragraph 1                │  │
│ │ e │   │                                            │  │
│ ├───┼───┼────────────────────────────────────────────┤  │
│ │ • │ 2 │ Content in paragraph 2 with a note         │  │
│ │   │   │                                            │  │
│ └───┴───┴────────────────────────────────────────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Notes Quotes Settings         (pullup handle)       │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Implementation Sequence

For efficient implementation, I recommend this sequence:

1. Start with section title styling changes (simplest)
2. Implement pullup bar improvements (affects user experience)
3. Adjust tab layout (related to pullup bar)
4. Implement text alignment settings
5. Enhance paragraph numbering format
6. Set up notes feature coordination (most complex)
