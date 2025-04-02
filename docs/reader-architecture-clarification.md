# Reader Architecture Clarification

## Reader Components Overview

The repository contains two distinct but related reader components:

1. **Generic Reader Component** (`packages/ui/src/document-reader`)

   - A reusable, generic document reading component
   - Provides core reading functionality that can be used by any publication
   - Handles common features like text display, navigation, and settings
   - Designed to be extended and customized for specific publication needs

2. **UB Reader Application** (`apps/reader`)
   - A specific application built for reading the Urantia Book
   - Uses the generic reader component as its foundation
   - Adds UB-specific features and customizations
   - Contains UB-specific content in `apps/reader/content/ub-json`

## Publication-Specific Readers

Each publication will have its own reader implementation that builds upon the generic reader component:

1. **Scientific Publication Reader**

   - Uses the generic reader component
   - Adds scientific-specific features (e.g., math formula rendering, citation handling)
   - Custom branding and styling for scientific content

2. **Lectionary Reader**

   - Uses the generic reader component
   - Adds lectionary-specific features (e.g., calendar integration, service planning)
   - Custom branding and styling for lectionary content

3. **Catechism Reader**

   - Uses the generic reader component
   - Adds catechism-specific features (e.g., Q&A format, topic indexing)
   - Custom branding and styling for catechism content

4. **PopRev Reader** (formerly UBgems, formerly Perplexity)
   - Uses the generic reader component
   - Adds PopRev-specific features (e.g., thematic grouping, commentary)
   - Custom branding and styling for PopRev content

## Component Relationships

```
┌─────────────────────────────────────┐
│ Generic Reader Component            │
│ (packages/ui/src/document-reader)   │
└───────────────┬─────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  │ UB Reader   │   │ Scientific  │   │ Lectionary  │   │ Catechism   │
│  │ Application │   │ Reader      │   │ Reader      │   │ Reader      │
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Implementation Strategy

1. **Core Reader Component**

   - Maintain the generic reader component in `packages/ui/src/document-reader`
   - Ensure it remains publication-agnostic
   - Add extension points for publication-specific customizations

2. **UB Reader Application**

   - Continue development in `apps/reader`
   - Use the generic reader component
   - Focus on UB-specific features and content

3. **Other Publication Readers**
   - Implement in their respective application directories
   - Reuse the generic reader component
   - Add only publication-specific features and content

## Benefits of This Approach

- **Code Reuse**: Core reading functionality is implemented once and reused across publications
- **Consistency**: Users experience similar reading interfaces across publications
- **Maintainability**: Improvements to the core reader benefit all publications
- **Flexibility**: Each publication can customize the reader for its specific needs
- **Scalability**: New publications can easily add their own reader by extending the generic component

## Naming Conventions

To maintain clarity:

- **"document-reader"** - The generic, reusable component in packages/ui
- **"ub-reader"** - The specific application for reading the Urantia Book
- **"scientific-reader"**, **"lectionary-reader"**, etc. - Publication-specific implementations
