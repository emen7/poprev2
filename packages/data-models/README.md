# UB Ecosystem Data Models

This package provides TypeScript interfaces and types for all data models used in the UB Ecosystem.

## Overview

The data models are organized into the following categories:

- **Document Models**: Interfaces for papers, sections, paragraphs, and references
- **Publication Models**: Interfaces for publications and their configuration
- **Annotation Models**: Interfaces for highlights, notes, and bookmarks
- **User Models**: Interfaces for user preferences and reading history
- **Search Models**: Interfaces for search results and indices

## Usage

```typescript
import {
  DocumentModel,
  PublicationModel,
  AnnotationModel,
  UserPreferencesModel,
  SearchResultModel,
} from '@ub-ecosystem/data-models';

// Use the models in your application
const document: DocumentModel = {
  id: 'paper1',
  type: 'paper',
  publicationId: 'ub',
  number: 1,
  title: 'The Universal Father',
  sections: [],
  metadata: {},
};
```

## Models

### Document Models

- `DocumentModel`: Base interface for documents (papers, forewords, etc.)
- `SectionModel`: Interface for document sections
- `ParagraphModel`: Interface for paragraphs
- `ReferenceModel`: Interface for references within paragraphs

### Publication Models

- `PublicationModel`: Interface for publications
- `PublicationStructure`: Interface for publication structure
- `PublicationPart`: Interface for parts within a publication
- `PublicationConfig`: Interface for publication configuration

### Annotation Models

- `AnnotationModel`: Base interface for annotations
- `HighlightModel`: Interface for text highlights
- `NoteModel`: Interface for user notes
- `BookmarkModel`: Interface for bookmarks

### User Models

- `UserPreferencesModel`: Interface for user preferences
- `ReadingPosition`: Interface for reading position
- `PublicationPreferences`: Interface for publication-specific preferences
- `ReadingHistoryEntry`: Interface for reading history entries

### Search Models

- `SearchResultModel`: Interface for search results
- `SearchIndexModel`: Interface for search indices
- `SearchOptions`: Interface for search query options
- `SearchHistoryEntry`: Interface for search history entries

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Lint the code
npm run lint
```
