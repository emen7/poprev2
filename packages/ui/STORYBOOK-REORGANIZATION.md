# Storybook Reorganization

This document provides an overview of the Storybook reorganization project.

## Overview

We are reorganizing our Storybook structure to better reflect the architecture of our component library. The new structure categorizes components into four main groups:

1. **Core** - Basic UI components that are application-agnostic
2. **Reader Core** - Components specific to reader applications but shared across different readers
3. **Applications** - Components specific to individual applications (UB Reader, Scientific Reader, etc.)
4. **Examples** - Complete examples and demos showing integration of components

## Why Reorganize?

The reorganization provides several benefits:

1. **Clearer Component Hierarchy**: Makes it easier to understand the relationship between components
2. **Better Reusability**: Clearly separates reusable components from application-specific ones
3. **Improved Discoverability**: Makes it easier to find components by their purpose
4. **Consistent Naming**: Establishes a consistent naming convention for components
5. **Scalable Structure**: Provides a structure that can accommodate future growth

## Implementation Plan

The reorganization is implemented in several phases:

1. **Documentation**: Create documentation explaining the new structure
2. **Directory Structure**: Create the new directory structure
3. **Story Titles**: Update the titles of story files to reflect the new categorization
4. **File Movement**: Move files to their new locations
5. **Import Updates**: Update import statements to reflect the new file locations
6. **Testing**: Test the reorganized structure to ensure everything works correctly

## Files Included in This Project

- `storybook-structure.md`: Detailed explanation of the new Storybook structure
- `directory-reorganization-plan.md`: Plan for reorganizing the directory structure
- `update-storybook-structure.ps1`: Script to update story titles
- `create-directory-structure.ps1`: Script to create the new directory structure

## How to Implement the Reorganization

Follow these steps to implement the reorganization:

1. Review the documentation to understand the new structure
2. Run the `create-directory-structure.ps1` script to create the new directories
3. Run the `update-storybook-structure.ps1` script to update story titles
4. Move files to their new locations according to the `directory-reorganization-plan.md`
5. Update import statements in the codebase
6. Test the reorganized structure

## Naming Convention

Stories should follow this naming convention:

```
{Category}/{Subcategory}/{ComponentName}
```

For example:
- `Core/Buttons/Button`
- `ReaderCore/Content/Paragraph`
- `Applications/UBReader/Layout`
- `Examples/UBReader/ThemeDemo`

## Component Categorization

### Core Components
- Button
- TextAlignmentToggle
- ThemeToggle
- TabsComponent
- SnapPointIndicator
- EnhancedPullup
- ThemeToggle
- ReaderThemeProvider
- SimpleButton

### Reader Core Components
- ParagraphComponent
- SectionTitle
- ParagraphRenderer
- ReaderLayout
- PullupPanel
- PullupTabs
- SearchTab
- NotesPanel
- NoteEditor
- ParagraphRenderer
- SelectionMenu

### Application Components
- UBParagraph
- UBSection
- UBReaderLayout

### Examples
- UBReaderDemo
- UBReaderThemeDemo
- UBReaderWithSearch
