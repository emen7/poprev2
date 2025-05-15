# Directory Reorganization Plan

This document outlines the plan for reorganizing the directory structure to match our new Storybook organization.

## Current Structure

```
src/
├── components/
├── content/
├── examples/
├── layout/
├── navigation/
├── panels/
├── pullup/
└── theme/
```

## Target Structure

```
src/
├── core/                  # Core components
│   ├── buttons/
│   ├── indicators/
│   ├── navigation/
│   ├── pullup/
│   ├── settings/
│   ├── theme/
│   └── toggles/
├── reader-core/           # Reader Core components
│   ├── components/
│   ├── content/
│   ├── layout/
│   ├── panels/
│   └── pullup/
├── applications/          # Application-specific components
│   ├── ub-reader/
│   │   ├── content/
│   │   └── layout/
│   └── scientific-reader/
└── examples/              # Example implementations
    ├── ub-reader/
    └── scientific-reader/
```

## Migration Steps

### Phase 1: Create New Directory Structure

1. Create the new directory structure without moving any files
2. Update the Storybook story titles using the script

### Phase 2: Move Files to New Locations

#### Core Components

Move the following files to the core directory:

- `src/components/TextAlignmentToggle.tsx` → `src/core/toggles/TextAlignmentToggle.tsx`
- `src/components/ThemeToggle.tsx` → `src/core/toggles/ThemeToggle.tsx`
- `src/components/ThemeSettings.tsx` → `src/core/settings/ThemeSettings.tsx`
- `src/navigation/TabsComponent.tsx` → `src/core/navigation/TabsComponent.tsx`
- `src/pullup/SnapPointIndicator.tsx` → `src/core/indicators/SnapPointIndicator.tsx`
- `src/pullup/EnhancedPullup.tsx` → `src/core/pullup/EnhancedPullup.tsx`
- `src/theme/ThemeToggle.tsx` → `src/core/theme/ThemeToggle.tsx`
- `src/theme/ReaderThemeProvider.tsx` → `src/core/theme/ReaderThemeProvider.tsx`
- `src/examples/SimpleButton.tsx` → `src/core/buttons/SimpleButton.tsx`
- `src/examples/button.tsx` → `src/core/buttons/Button.tsx`

#### Reader Core Components

Move the following files to the reader-core directory:

- `src/content/ParagraphComponent.tsx` → `src/reader-core/content/ParagraphComponent.tsx`
- `src/content/SectionTitle.tsx` → `src/reader-core/content/SectionTitle.tsx`
- `src/content/ParagraphRenderer.tsx` → `src/reader-core/content/ParagraphRenderer.tsx`
- `src/layout/ReaderLayout.tsx` → `src/reader-core/layout/ReaderLayout.tsx`
- `src/pullup/PullupPanel.tsx` → `src/reader-core/pullup/PullupPanel.tsx`
- `src/pullup/PullupTabs.tsx` → `src/reader-core/pullup/PullupTabs.tsx`
- `src/pullup/SearchTab.tsx` → `src/reader-core/pullup/SearchTab.tsx`
- `src/panels/NotesPanel.tsx` → `src/reader-core/panels/NotesPanel.tsx`
- `src/components/NoteEditor.tsx` → `src/reader-core/components/NoteEditor.tsx`
- `src/components/ParagraphRenderer.tsx` → `src/reader-core/components/ParagraphRenderer.tsx`
- `src/components/SelectionMenu.tsx` → `src/reader-core/components/SelectionMenu.tsx`

#### Application Components

Move the following files to the applications directory:

- `src/content/UBParagraph.tsx` → `src/applications/ub-reader/content/UBParagraph.tsx`
- `src/content/UBSection.tsx` → `src/applications/ub-reader/content/UBSection.tsx`
- `src/layout/UBReaderLayout.tsx` → `src/applications/ub-reader/layout/UBReaderLayout.tsx`

#### Examples

Move the following files to the examples directory:

- `src/examples/UBReaderDemo.tsx` → `src/examples/ub-reader/ReaderDemo.tsx`
- `src/examples/UBReaderThemeDemo.tsx` → `src/examples/ub-reader/ThemeDemo.tsx`
- `src/examples/UBReaderWithSearch.tsx` → `src/examples/ub-reader/SearchDemo.tsx`

### Phase 3: Update Imports

After moving files, update all import statements in the codebase to reflect the new file locations.

### Phase 4: Testing

Test the reorganized structure to ensure everything works correctly:

1. Run Storybook and verify all components are displayed correctly
2. Check that the new categorization makes sense
3. Verify that all components can be imported and used correctly

### Phase 5: Documentation

Update documentation to reflect the new structure:

1. Update README.md with the new directory structure
2. Update any other documentation that references the old structure
3. Add comments to the code explaining the new organization
