/**
 * Search API Route
 * 
 * This API route handles search queries and returns search results.
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SearchEngine, SearchOptions } from '@poprev/reference-parser/src/engine';
import type { SearchableDocument } from '../../../lib/search/indexer';

// Cache for search engine instance
let searchEngine: SearchEngine | null = null;

/**
 * Get search engine instance
 * 
 * @returns Search engine instance
 */
function getSearchEngine(): SearchEngine {
  if (searchEngine) {
    return searchEngine;
  }
  
  try {
    // Load search index
    const indexPath = path.join(process.cwd(), 'public', 'search-index.json');
    
    if (!fs.existsSync(indexPath)) {
      throw new Error('Search index not found. Run the build-search-index script first.');
    }
    
    const indexData = fs.readFileSync(indexPath, 'utf-8');
    const documents = JSON.parse(indexData) as SearchableDocument[];
    
    // Create search engine
    searchEngine = new SearchEngine(documents);
    
    return searchEngine;
  } catch (error) {
    console.error('Error loading search index:', error);
    
    // Return a search engine with empty documents as fallback
    return new SearchEngine([]);
  }
}

/**
 * GET handler for search API
 * 
 * @param request Next.js request
 * @returns Next.js response
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const types = searchParams.getAll('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '0');
    
    // Create search options
    const options: SearchOptions = {
      query,
      limit,
      page
    };
    
    // Add filters if provided
    if (types.length > 0) {
      options.filters = {
        types: types as ('scientific' | 'perplexity' | 'lectionary' | 'post')[]
      };
    }
    
    // Get search engine
    const engine = getSearchEngine();
    
    // Perform search
    const results = engine.search(options);
    
    // Return results
    return NextResponse.json({
      results,
      meta: {
        query,
        filters: options.filters,
        limit,
        page,
        total: results.length
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
