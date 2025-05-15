import React, { useState, useEffect, useRef } from 'react';
import './SearchTab.css';

export interface SearchResult {
  /**
   * Unique identifier for the search result
   */
  id: string;
  
  /**
   * Reference (e.g., "1:1.1") for the search result
   */
  reference: string;
  
  /**
   * Title or text content of the search result
   */
  content: string;
  
  /**
   * Type of content (e.g., "paper", "section", "paragraph")
   */
  type: string;
  
  /**
   * Full text content for display when selected
   */
  fullContent?: string;
  
  /**
   * HTML content for display when selected
   */
  htmlContent?: string;
}

export interface SearchTabProps {
  /**
   * Function to search for content
   */
  onSearch?: (query: string) => Promise<SearchResult[]>;
  
  /**
   * Function called when a search result is selected
   */
  onResultSelect?: (result: SearchResult) => void;
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SearchTab Component
 *
 * A component that provides search functionality for content.
 * It allows users to search for content and displays the results.
 * When a result is selected, it can be displayed in the pullup as a "second reader".
 */
export const SearchTab: React.FC<SearchTabProps> = ({
  onSearch,
  onResultSelect,
  className = '',
}) => {
  // State for search
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Ref for search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (!onSearch) {
      setError('Search functionality is not available');
      return;
    }

    setIsSearching(true);
    setError(null);
    
    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setError('An error occurred while searching');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
    if (onResultSelect) {
      onResultSelect(result);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedResult(null);
    setError(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Highlight search terms in text
  const highlightSearchTerms = (text: string): React.ReactNode => {
    if (!query.trim() || !text) return text;
    
    const terms = query.trim().split(/\s+/).filter(term => term.length > 2);
    if (terms.length === 0) return text;
    
    // Create a regex pattern for all search terms
    const pattern = new RegExp(`(${terms.map(term => escapeRegExp(term)).join('|')})`, 'gi');
    
    // Split text by search terms and create an array of regular text and highlighted text
    const parts = text.split(pattern);
    
    return (
      <>
        {parts.map((part, i) => {
          // Check if this part matches any search term (case insensitive)
          const isMatch = terms.some(term => 
            part.toLowerCase() === term.toLowerCase()
          );
          
          return isMatch ? (
            <span key={i} className="search-highlight">{part}</span>
          ) : (
            part
          );
        })}
      </>
    );
  };
  
  // Helper function to escape special regex characters
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Determine container classes
  const containerClasses = ['search-tab', className].filter(Boolean).join(' ');

  // Render search result
  const renderSearchResult = (result: SearchResult) => {
    return (
      <div 
        key={result.id} 
        className={`search-result ${selectedResult?.id === result.id ? 'selected' : ''}`}
        onClick={() => handleResultSelect(result)}
      >
        <div className="search-result-reference">{result.reference}</div>
        <div className="search-result-content">
          {highlightSearchTerms(result.content)}
        </div>
      </div>
    );
  };

  // Render selected content
  const renderSelectedContent = () => {
    if (!selectedResult) return null;

    const content = selectedResult.htmlContent ? (
      <div dangerouslySetInnerHTML={{ __html: selectedResult.htmlContent }} />
    ) : (
      selectedResult.fullContent || selectedResult.content
    );

    return (
      <div className="search-selected-content">
        <div className="search-selected-header">
          <div className="search-selected-reference">
            {selectedResult.reference}
          </div>
          <button 
            className="search-back-button"
            onClick={() => setSelectedResult(null)}
            aria-label="Back to search results"
          >
            ← Back
          </button>
        </div>
        <div className="search-selected-body">
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {!selectedResult ? (
        <>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-container">
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search content..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search query"
              />
              {query && (
                <button
                  type="button"
                  className="search-clear-button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
              <button type="submit" className="search-button" aria-label="Search">
                🔍
              </button>
            </div>
          </form>

          <div className="search-results">
            {isSearching ? (
              <div className="search-loading">Searching...</div>
            ) : error ? (
              <div className="search-error">{error}</div>
            ) : results.length > 0 ? (
              results.map(renderSearchResult)
            ) : query ? (
              <div className="search-no-results">No results found</div>
            ) : (
              <div className="search-empty-state">
                Enter a search term to find content
              </div>
            )}
          </div>
        </>
      ) : (
        renderSelectedContent()
      )}
    </div>
  );
};

export default SearchTab;
