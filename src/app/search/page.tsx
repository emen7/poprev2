/**
 * Search Page
 * 
 * This page displays search results based on query parameters.
 */

import { Suspense } from 'react';
import { SearchBar } from '../../components/search/search-bar';
import { SearchFilters } from '../../components/search/search-filters';
import { SearchResults } from '../../components/search/search-results';
// Import the actions when they're available
// import { getSearchResults } from './actions';

/**
 * Props for the SearchPage component
 */
interface SearchPageProps {
  searchParams: {
    q?: string;
    type?: string | string[];
  };
}

/**
 * Search page component
 * 
 * @param props Component props
 * @returns React component
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await searchParams to fix the "searchParams should be awaited" error
  const params = await searchParams;
  
  const query = params.q || '';
  const types = Array.isArray(params.type)
    ? params.type
    : params.type
      ? [params.type]
      : [];
  
  // For now, we'll use an empty array for initial results
  // When the actions module is implemented, we can use:
  // const initialResults = query || types.length > 0
  //   ? await getSearchResults(query, { types })
  //   : [];
  const initialResults: any[] = [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Search Documents</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <SearchFilters />
        </div>
        
        <div className="md:col-span-3">
          <Suspense fallback={<div>Loading results...</div>}>
            <SearchResults 
              initialResults={initialResults}
              query={query}
              filters={{ types }}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}