/**
 * Search Panel Component
 *
 * This component provides a search interface for finding highlights and notes.
 * It allows searching by text, tags, and other criteria.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useNotation } from '../hooks';
import { Highlight, Note } from '../models';

interface SearchPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Callback function called when the panel is closed
   */
  onClose: () => void;

  /**
   * Callback function called when a highlight is clicked
   */
  onHighlightClick: (id: string) => void;

  /**
   * Callback function called when a note is clicked
   */
  onNoteClick: (id: string) => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * SearchPanel Component
 */
export function SearchPanel({
  isOpen,
  onClose,
  onHighlightClick,
  onNoteClick,
  className = '',
}: SearchPanelProps) {
  // Get notation context
  const notation = useNotation();

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for search results
  const [searchResults, setSearchResults] = useState<{
    highlights: Highlight[];
    notes: Note[];
  }>({ highlights: [], notes: [] });

  // State for active tab
  const [activeTab, setActiveTab] = useState<'all' | 'highlights' | 'notes'>('all');

  // State for available tags
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // State for selected tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Update available tags when highlights change
  useEffect(() => {
    setAvailableTags(notation.getAllTags());
  }, [notation.highlights]);

  // Perform search when query or selected tags change
  useEffect(() => {
    if (searchQuery.trim() || selectedTags.length > 0) {
      // Search by query
      let results = searchQuery.trim()
        ? notation.searchAll(searchQuery)
        : { highlights: notation.highlights, notes: notation.notes };

      // Filter by selected tags
      if (selectedTags.length > 0) {
        results.highlights = results.highlights.filter(h =>
          selectedTags.some(tag => h.tags.includes(tag))
        );

        // Filter notes to only include those associated with the filtered highlights
        const highlightIds = results.highlights.map(h => h.id);
        results.notes = results.notes.filter(n => highlightIds.includes(n.highlightId));
      }

      setSearchResults(results);
    } else {
      setSearchResults({ highlights: [], notes: [] });
    }
  }, [searchQuery, selectedTags, notation]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Get filtered results based on active tab
  const getFilteredResults = () => {
    switch (activeTab) {
      case 'highlights':
        return {
          highlights: searchResults.highlights,
          notes: [],
        };
      case 'notes':
        return {
          highlights: [],
          notes: searchResults.notes,
        };
      default:
        return searchResults;
    }
  };

  // Get result counts
  const resultCounts = {
    all: searchResults.highlights.length + searchResults.notes.length,
    highlights: searchResults.highlights.length,
    notes: searchResults.notes.length,
  };

  // If panel is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`search-panel ${isOpen ? 'open' : ''} ${className}`}>
      <div className="search-panel-header">
        <h2 className="search-panel-title">Search</h2>

        <button className="search-panel-close" onClick={onClose} title="Close">
          <span className="sr-only">Close</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="search-panel-content">
        {/* Search Input */}
        <div className="search-panel-input-container">
          <input
            type="text"
            className="search-panel-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search highlights and notes..."
            aria-label="Search highlights and notes"
          />

          {(searchQuery || selectedTags.length > 0) && (
            <button className="search-panel-clear" onClick={handleClearSearch} title="Clear search">
              <span className="sr-only">Clear search</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>

        {/* Tags */}
        {availableTags.length > 0 && (
          <div className="search-panel-tags">
            <h3 className="search-panel-tags-title">Filter by tags:</h3>
            <div className="search-panel-tags-list">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  className={`search-panel-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="search-panel-tabs">
          <button
            className={`search-panel-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({resultCounts.all})
          </button>

          <button
            className={`search-panel-tab ${activeTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlights')}
          >
            Highlights ({resultCounts.highlights})
          </button>

          <button
            className={`search-panel-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes ({resultCounts.notes})
          </button>
        </div>

        {/* Results */}
        <div className="search-panel-results">
          {getFilteredResults().highlights.length === 0 &&
          getFilteredResults().notes.length === 0 ? (
            <div className="search-panel-no-results">
              {searchQuery || selectedTags.length > 0
                ? 'No results found. Try a different search term or tag.'
                : 'Enter a search term or select tags to find highlights and notes.'}
            </div>
          ) : (
            <>
              {/* Highlight Results */}
              {getFilteredResults().highlights.length > 0 && (
                <div className="search-panel-results-section">
                  <h3 className="search-panel-results-title">
                    Highlights ({getFilteredResults().highlights.length})
                  </h3>

                  <div className="search-panel-results-list">
                    {getFilteredResults().highlights.map(highlight => (
                      <div
                        key={highlight.id}
                        className={`search-panel-result ${highlight.color}`}
                        onClick={() => onHighlightClick(highlight.id)}
                      >
                        <div className="search-panel-result-header">
                          <span className="search-panel-result-paper">
                            Paper {highlight.paperNumber}
                          </span>
                          <span className="search-panel-result-date">
                            {formatDate(highlight.createdAt)}
                          </span>
                        </div>

                        <div className="search-panel-result-text">"{highlight.selectedText}"</div>

                        {highlight.tags.length > 0 && (
                          <div className="search-panel-result-tags">
                            {highlight.tags.map((tag, index) => (
                              <span key={index} className="search-panel-result-tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Note Results */}
              {getFilteredResults().notes.length > 0 && (
                <div className="search-panel-results-section">
                  <h3 className="search-panel-results-title">
                    Notes ({getFilteredResults().notes.length})
                  </h3>

                  <div className="search-panel-results-list">
                    {getFilteredResults().notes.map(note => {
                      const highlight = notation.highlights.find(h => h.id === note.highlightId);

                      return (
                        <div
                          key={note.id}
                          className={`search-panel-result ${highlight?.color || 'yellow'}`}
                          onClick={() => onNoteClick(note.id)}
                        >
                          <div className="search-panel-result-header">
                            <span className="search-panel-result-paper">
                              {highlight ? `Paper ${highlight.paperNumber}` : 'Note'}
                            </span>
                            <span className="search-panel-result-date">
                              {formatDate(note.updatedAt)}
                            </span>
                          </div>

                          {highlight && (
                            <div className="search-panel-result-highlight">
                              "{highlight.selectedText}"
                            </div>
                          )}

                          <div className="search-panel-result-note">
                            {note.content.substring(0, 100)}
                            {note.content.length > 100 ? '...' : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
