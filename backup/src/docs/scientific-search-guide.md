# Searching Scientific Content in PopRev2

This guide explains how to use the search functionality to find scientific content in the PopRev2 project.

## Overview

The search functionality has been updated to index scientific content from both markdown and docx files. This allows you to search across all your scientific documents regardless of their format.

## Setup

To use the search functionality with scientific content:

1. Make sure your scientific content is in one of these directories:

   - `src/content/raw/scientific/markdown` (for markdown files)
   - `src/content/raw/scientific/docx` (for docx files)
   - `src/src/content/raw/scientific/markdown` (for markdown files)
   - `src/src/content/raw/scientific/docx` (for docx files)

2. Run the indexer to build the search index:

   ```bash
   cd src
   npm run index
   ```

3. Make sure the development server is running:

   ```bash
   cd src
   npm run dev
   ```

4. Access the search page at http://localhost:3000/search

## Using the Search

1. Enter your search query in the search box
2. Use the filters on the left to narrow down results by document type
3. Select "Scientific Documents" to see only scientific content

## Search Tips

- Use specific terms related to your scientific content
- Try searching for author names, titles, or specific scientific terms
- The search is fuzzy, so it will find results even with slight typos
- You can combine filters to narrow down results

## Troubleshooting

If you don't see your scientific content in the search results:

1. Make sure you've run the indexer (`npm run index`)
2. Check that your files are in the correct directories
3. Verify that the files have the correct extensions (.md or .docx)
4. Check the console for any errors during indexing

## Adding New Content

When you add new scientific content:

1. Place the files in one of the scientific content directories
2. Run the indexer again to update the search index:

   ```bash
   cd src
   npm run index
   ```

3. Refresh the search page to see the new content

## Technical Details

The search functionality uses:

- **Fuse.js**: For fuzzy searching
- **Document Transformer**: To process both markdown and docx files
- **Search Indexer**: To build a searchable index of all content

The search index is stored in `public/search-index.json` and is loaded by the search API when needed.
