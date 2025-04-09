# Search Functionality for PopRev2

This document provides an overview of the search functionality implemented in the PopRev2 project.

## Overview

The search system allows users to find content across all document types (scientific articles, perplexity responses, lectionary content, and general posts) through a unified, intuitive interface.

## Features

- **Full-text search**: Search across all content in the platform
- **Filtering by document type**: Filter results by scientific, perplexity, lectionary, or post
- **Fuzzy matching**: Find content even with typos or slight variations
- **Relevance ranking**: Results are sorted by relevance to the search query
- **Responsive design**: Works well on both desktop and mobile devices

## Implementation Details

The search functionality consists of several components:

1. **Search Indexer**: Processes documents to extract searchable content
2. **Search Engine**: Provides search capabilities using Fuse.js
3. **Search API**: Handles search queries via API endpoints
4. **Search UI**: Provides user interface for search input and results display

## Getting Started

### Setup

To set up the search functionality, run the setup script:

**On Windows (PowerShell):**

```powershell
cd src
.\scripts\setup-search.ps1
```

**On macOS/Linux (Bash):**

```bash
cd src
chmod +x scripts/setup-search.sh
./scripts/setup-search.sh
```

This script will:

1. Install Fuse.js for fuzzy searching
2. Create necessary content directories
3. Copy existing content if available
4. Create a sample post if none exists
5. Build the search index

### Usage

Once set up, you can use the search functionality in several ways:

1. **Header Search Bar**: Available on all pages for quick searches
2. **Search Page**: Access via `/search` for advanced search with filters
3. **API Endpoint**: Use `/api/search` for programmatic access

### Search Page

The search page (`/search`) provides a full-featured search interface with:

- Search input field
- Document type filters
- Results list with excerpts and metadata

### API Usage

The search API can be accessed at `/api/search` with the following parameters:

- `q`: Search query
- `type`: Document type filter (can be specified multiple times)
- `limit`: Maximum number of results (default: 10)
- `page`: Page number for pagination (default: 0)

Example:

```
/api/search?q=document&type=scientific&type=post&limit=20&page=0
```

## Customization

### Relevance Tuning

You can adjust the search relevance by modifying the weights in `src/lib/search/engine.ts`:

```typescript
this.fuse = new Fuse(this.documents, {
  keys: [
    { name: "title", weight: 2 },
    { name: "content", weight: 1 },
    { name: "metadata.author", weight: 1.5 },
    { name: "metadata.categories", weight: 1.2 },
    { name: "metadata.tags", weight: 1.2 },
  ],
  // ...
});
```

### Adding New Document Types

To add a new document type:

1. Update the `SearchableDocument` interface in `src/lib/search/indexer.ts`
2. Add the new type to the `TYPE_OPTIONS` array in `src/components/search/search-filters.tsx`
3. Update the `determineDocumentType` function in `src/lib/search/indexer.ts`

## Troubleshooting

### Search Index Not Found

If you see "Search index not found" errors:

1. Make sure you've run the setup script
2. Check that the `public/search-index.json` file exists
3. If not, run `npm run build:search-index` to generate it

### No Results Found

If searches return no results:

1. Check that you have content in the content directories
2. Verify that the search index has been built
3. Try a broader search query or remove filters

## Future Enhancements

Potential improvements for the search functionality:

1. **Server-side search**: For larger content collections
2. **Advanced filtering**: By date, author, etc.
3. **Search suggestions**: As you type
4. **Highlighting**: Of search terms in results
5. **Faceted search**: For more complex filtering

## Technical Details

The search functionality uses:

- **Fuse.js**: For fuzzy searching
- **Next.js API Routes**: For the search API
- **React**: For the search UI components
- **TypeScript**: For type safety

The search index is built during the build process and stored as a JSON file in the public directory.
