'use client';

import React, { useState, useEffect, useRef } from 'react';
import './SearchTab.css';

// Mock UBContentItem type for build compatibility
export interface UBContentItem {
  globalId: string;
  objectID: string;
  language: string;
  type: 'part' | 'paper' | 'section' | 'paragraph';
  typeRank: number;
  sortId: string;
  labels: string[];
  text: string | null;
  htmlText: string | null;
}

// Mock UBParagraph type for build compatibility
export interface UBParagraph extends UBContentItem {
  type: 'paragraph';
  typeRank: 3;
  partId: string;
  paperId: string;
  paperTitle: string;
  paperSectionId: string;
  sectionId: string;
  sectionTitle: string | null;
  paragraphId: string;
  paperSectionParagraphId: string;
  standardReferenceId: string;
}

// Mock useUBContent hook for build compatibility
export function useUBContent() {
  // Mock search function that returns empty array
  const search = (query: string): UBContentItem[] => {
    console.log('Mock search called with query:', query);
    return [];
  };

  return {
    search,
    content: null,
    metadata: null,
    isLoading: false,
    error: null,
    loadContent: async () => {},
    getPart: () => null,
    getPaper: () => null,
    getSection: () => null,
    getParagraph: () => null,
    getParagraphByReference: () => null,
  };
}

export interface SearchTabProps {
  /**
   * Function called when a search result is selected
   */
  onResultSelect?: (item: UBContentItem) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SearchTab Component
 *
 * A component that provides search functionality for UB content.
 * It allows users to search for content and displays the results.
 * When a result is selected, it can be displayed in the pullup as a "second reader".
 */
export function SearchTab({ onResultSelect, className = '' }: SearchTabProps) {
  // Get UB content service
  const { search } = useUBContent();

  // State for search
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UBContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResult, setSelectedResult] = useState<UBContentItem | null>(null);

  // Ref for search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const searchResults = search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle result selection
  const handleResultSelect = (item: UBContentItem) => {
    setSelectedResult(item);
    if (onResultSelect) {
      onResultSelect(item);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedResult(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Determine container classes
  const containerClasses = ['search-tab', className].filter(Boolean).join(' ');

  // Render search result
  const renderSearchResult = (item: UBContentItem) => {
    // Format reference based on item type
    let reference = '';
    let title = '';

    switch (item.type) {
      case 'paper':
        reference = `Paper ${item.labels[0]}`;
        title = item.text || '';
        break;
      case 'section':
        reference = `${item.labels[0]}`;
        title = item.text || '';
        break;
      case 'paragraph':
        const paragraph = item as UBParagraph;
        reference = `${paragraph.labels[0]}`;
        title = paragraph.text || '';
        break;
      default:
        reference = item.labels[0] || '';
        title = item.text || '';
    }

    return (
      <div
        key={item.globalId}
        className={`search-result ${selectedResult?.globalId === item.globalId ? 'selected' : ''}`}
        onClick={() => handleResultSelect(item)}
      >
        <div className="search-result-reference">{reference}</div>
        <div className="search-result-title">{highlightSearchTerms(title, query)}</div>
      </div>
    );
  };

  // Highlight search terms in text
  const highlightSearchTerms = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery.trim() || !text) return text;

    const terms = searchQuery
      .trim()
      .split(/\s+/)
      .filter(term => term.length > 2);
    if (terms.length === 0) return text;

    // Create a regex pattern for all search terms
    const pattern = new RegExp(`(${terms.map(term => escapeRegExp(term)).join('|')})`, 'gi');

    // Split text by search terms and create an array of regular text and highlighted text
    const parts = text.split(pattern);

    return (
      <>
        {parts.map((part, i) => {
          // Check if this part matches any search term (case insensitive)
          const isMatch = terms.some(term => part.toLowerCase() === term.toLowerCase());

          return isMatch ? (
            <span key={i} className="search-highlight">
              {part}
            </span>
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

  // Render selected content
  const renderSelectedContent = () => {
    if (!selectedResult) return null;

    const content = selectedResult.text || selectedResult.htmlText || 'No content available';

    return (
      <div className="search-selected-content">
        <div className="search-selected-header">
          <div className="search-selected-reference">{selectedResult.labels[0]}</div>
          <button
            className="search-back-button"
            onClick={() => setSelectedResult(null)}
            aria-label="Back to search results"
          >
            ← Back
          </button>
        </div>
        <div className="search-selected-body">{highlightSearchTerms(content, query)}</div>
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
                placeholder="Search UB content..."
                value={query}
                onChange={e => setQuery(e.target.value)}
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
            ) : results.length > 0 ? (
              results.map(renderSearchResult)
            ) : query ? (
              <div className="search-no-results">No results found</div>
            ) : (
              <div className="search-empty-state">
                Enter a search term to find content in The Urantia Book
              </div>
            )}
          </div>
        </>
      ) : (
        renderSelectedContent()
      )}
    </div>
  );
}

export default SearchTab;
