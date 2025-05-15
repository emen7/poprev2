# Storybook Structure

This document outlines the organization of our Storybook components.

## Overview

Our Storybook is organized into four main categories:

1. **Core** - Basic UI components that are application-agnostic
2. **Reader Core** - Components specific to reader applications but shared across different readers
3. **Applications** - Components specific to individual applications (UB Reader, Scientific Reader, etc.)
4. **Examples** - Complete examples and demos showing integration of components

## Category Details

### Core

Core components are the fundamental building blocks of our UI. They are application-agnostic and can be used in any context.

Examples:
- Buttons
- Inputs
- Typography
- Icons
- Modals
- Tooltips
- Toggles
- Tabs

### Reader Core

Reader Core components are specific to reader applications but are shared across different readers (UB Reader, Scientific Reader, etc.).

Examples:
- Content rendering components
- Navigation components
- Selection and highlighting
- Notes and quotes functionality
- Settings panels
- Search functionality

### Applications

Application components are specific to individual applications and implement specialized functionality.

Examples:
- UB Reader specific components
- Scientific Reader specific components
- Almanac specific components
- Publications specific components

### Examples

Examples demonstrate how to use and integrate components to build complete features or pages.

Examples:
- Complete reader pages
- Theme demonstrations
- Feature demonstrations (search, notes, etc.)
- Integration examples

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

## Component Organization

Components should be organized in the codebase to reflect their category:

```
src/
├── core/           # Core components
├── reader-core/    # Reader Core components
├── applications/   # Application-specific components
│   ├── ub-reader/
│   ├── scientific-reader/
│   └── almanac/
└── examples/       # Example implementations
```

## Migration Guide

When migrating existing components to the new structure:

1. Identify the appropriate category for each component
2. Update the `title` property in the story file
3. Move the component to the appropriate directory if needed
4. Update imports in other files if the component location changed

## Examples of Component Categorization

### Core Components
- Button
- TextAlignmentToggle
- ThemeToggle
- TabsComponent

### Reader Core Components
- ParagraphComponent
- SectionTitle
- ParagraphRenderer
- ReaderLayout
- PullupPanel
- NotesPanel
- SearchTab

### Application Components
- UBParagraph
- UBSection
- UBReaderLayout

### Examples
- UBReaderDemo
- UBReaderThemeDemo
- UBReaderWithSearch
