/**
 * Search Engine
 *
 * This module provides search capabilities using the generated index.
 * It uses Fuse.js for fuzzy searching.
 */

import Fuse from 'fuse.js';

import type { SearchableDocument } from './indexer';

/**
 * Search options
 */
export interface SearchOptions {
  query: string;
  filters?: {
    types?: ('scientific' | 'perplexity' | 'lectionary' | 'post')[];
    dateRange?: { from?: string; to?: string };
    metadata?: Record<string, any>;
  };
  limit?: number;
  page?: number;
}

/**
 * Search result
 */
export interface SearchResult {
  document: SearchableDocument;
  score: number;
  matches?: any;
}

/**
 * Search engine class
 *
 * This class provides search capabilities using Fuse.js.
 * It requires the fuse.js library to be installed.
 */
export class SearchEngine {
  private fuse!: Fuse<SearchableDocument>;
  private documents: SearchableDocument[];

  /**
   * Create a new search engine
   *
   * @param documents The documents to search
   */
  constructor(documents: SearchableDocument[]) {
    this.documents = documents;

    // Initialize Fuse.js
    this.initializeFuse();
  }

  /**
   * Initialize Fuse.js
   */
  private initializeFuse(): void {
    // Configure Fuse.js for fuzzy searching
    this.fuse = new Fuse(this.documents, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'content', weight: 2 }, // Increased weight for content
        { name: 'metadata.author', weight: 1 },
        { name: 'metadata.categories', weight: 1 },
        { name: 'metadata.tags', weight: 1 },
      ],
      includeMatches: true,
      threshold: 0.6, // Increased threshold for more lenient matching
      distance: 200, // Increased distance for better fuzzy matching
      useExtendedSearch: true,
      ignoreLocation: true, // Ignore location for better content searching
    });
  }

  /**
   * Search for documents
   *
   * @param options Search options
   * @returns Search results
   */
  search(options: SearchOptions): SearchResult[] {
    const { query, filters, limit = 10, page = 0 } = options;

    // Start with basic search
    let results = query
      ? this.fuse.search(query)
      : this.documents.map(doc => ({
          item: doc,
          score: 1,
          matches: [],
          refIndex: 0,
        }));

    // Apply filters if provided
    if (filters) {
      results = this.applyFilters(results, filters);
    }

    // Apply pagination
    const startIdx = page * limit;
    const paginatedResults = results.slice(startIdx, startIdx + limit);

    // Format results
    return paginatedResults.map(result => ({
      document: result.item,
      score: result.score || 1,
      matches: result.matches,
    }));
  }

  /**
   * Apply filters to search results
   *
   * @param results The search results to filter
   * @param filters The filters to apply
   * @returns Filtered search results
   */
  private applyFilters(
    results: any[], // Using any temporarily, TS should infer this
    filters: NonNullable<SearchOptions['filters']>
  ): any[] {
    // Using any temporarily, TS should infer this
    // Filter by document type
    if (filters.types && filters.types.length > 0) {
      results = results.filter(result => filters.types!.includes(result.item.type));
    }

    // Filter by date range
    if (filters.dateRange) {
      const { from, to } = filters.dateRange;

      if (from || to) {
        results = results.filter(result => {
          const date = new Date(result.item.lastUpdated);

          if (from && to) {
            return date >= new Date(from) && date <= new Date(to);
          }

          if (from) {
            return date >= new Date(from);
          }

          if (to) {
            return date <= new Date(to);
          }

          return true;
        });
      }
    }

    // Filter by metadata
    if (filters.metadata) {
      const metadataFilters = filters.metadata;

      results = results.filter(result => {
        const metadata = result.item.metadata;

        // Check each metadata filter
        for (const [key, value] of Object.entries(metadataFilters)) {
          if (Array.isArray(value)) {
            // If the filter value is an array, check if any value matches
            if (!Array.isArray(metadata[key]) || !value.some(v => metadata[key].includes(v))) {
              return false;
            }
          } else {
            // Otherwise, check for exact match
            if (metadata[key] !== value) {
              return false;
            }
          }
        }

        return true;
      });
    }

    return results;
  }
}
