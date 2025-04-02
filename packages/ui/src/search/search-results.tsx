/**
 * Search Results Component
 * 
 * This component displays search results.
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SearchResult } from '../../lib/search/engine';

/**
 * Props for the SearchResults component
 */
interface SearchResultsProps {
  initialResults?: SearchResult[];
  query: string;
  filters?: {
    types?: string[];
  };
  className?: string;
}

/**
 * Search results component
 * 
 * @param props Component props
 * @returns React component
 */
export function SearchResults({ 
  initialResults, 
  query, 
  filters,
  className = '' 
}: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>(initialResults || []);
  const [loading, setLoading] = useState(!initialResults);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // If we have initial results and no query/filters, don't fetch
    if (initialResults && initialResults.length > 0 && !query && (!filters || !filters.types?.length)) {
      setResults(initialResults);
      setLoading(false);
      return;
    }
    
    // Don't fetch if we have no query and no filters
    if (!query && (!filters || !filters.types?.length)) {
      setResults([]);
      setLoading(false);
      return;
    }
    
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Build query string
        const params = new URLSearchParams();
        
        if (query) {
          params.set('q', query);
        }
        
        if (filters?.types?.length) {
          filters.types.forEach(type => params.append('type', type));
        }
        
        // Fetch results
        const response = await fetch(`/api/search?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        console.error('Search error:', err);
        setError('An error occurred while searching. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query, filters, initialResults]);
  
  if (loading) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-500">Loading results...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`py-8 text-center text-red-500 ${className}`}>
        {error}
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <p className="text-gray-500">No results found for your search.</p>
        {(query || (filters?.types && filters.types.length > 0)) && (
          <p className="mt-2 text-sm text-gray-400">
            Try using different keywords or removing filters.
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      <p className="text-sm text-gray-500">
        Found {results.length} result{results.length !== 1 ? 's' : ''}
      </p>
      
      <ul className="divide-y divide-gray-100">
        {results.map(result => (
          <li key={result.document.id} className="py-4">
            <article>
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs capitalize text-blue-800">
                  {result.document.type}
                </span>
                <h3 className="text-lg font-medium">
                  <Link
                    href={`/scientific/document/sample-${result.document.id.replace(/[^a-zA-Z0-9-]/g, '-')}`}
                    className="text-blue-600 cursor-pointer underline text-left font-normal"
                  >
                    {result.document.title || 'Untitled Document'}
                  </Link>
                </h3>
              </div>
              
              <p className="mt-2 text-sm text-gray-600">
                {result.document.excerpt}
              </p>
              
              {result.document.metadata.author && (
                <p className="mt-1 text-xs text-gray-500">
                  By {result.document.metadata.author}
                </p>
              )}
              
              {result.document.metadata.date && (
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(result.document.metadata.date).toLocaleDateString()}
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}