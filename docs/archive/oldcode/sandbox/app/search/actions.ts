/**
 * Search Server Actions
 * 
 * This module provides server actions for the search page.
 */

import fs from 'fs';
import path from 'path';
import { SearchEngine } from '../../lib/search/engine';
import type { SearchableDocument } from '../../lib/search/indexer';
import type { SearchResult } from '../../lib/search/engine';

/**
 * Get search engine instance
 * 
 * @returns Search engine instance
 */
function getSearchEngine(): SearchEngine {
  try {
    // Load search index
    const indexPath = path.join(process.cwd(), 'public', 'search-index.json');
    
    if (!fs.existsSync(indexPath)) {
      console.warn('Search index not found. Run the build-search-index script first.');
      return new SearchEngine([]);
    }
    
    const indexData = fs.readFileSync(indexPath, 'utf-8');
    const documents = JSON.parse(indexData) as SearchableDocument[];
    
    // Create search engine
    return new SearchEngine(documents);
  } catch (error) {
    console.error('Error loading search index:', error);
    
    // Return a search engine with empty documents as fallback
    return new SearchEngine([]);
  }
}

/**
 * Get search results
 * 
 * @param query Search query
 * @param filters Search filters
 * @param limit Result limit
 * @param page Result page
 * @returns Search results
 */
export async function getSearchResults(
  query: string,
  filters?: {
    types?: string[];
    dateRange?: { from?: string; to?: string };
  },
  limit: number = 10,
  page: number = 0
): Promise<SearchResult[]> {
  const engine = getSearchEngine();
  
  return engine.search({
    query,
    filters: filters ? {
      types: filters.types as ('scientific' | 'perplexity' | 'lectionary' | 'post')[],
      dateRange: filters.dateRange
    } : undefined,
    limit,
    page
  });
}