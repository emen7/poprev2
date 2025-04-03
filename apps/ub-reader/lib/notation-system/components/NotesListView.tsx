/**
 * Notes List View Component
 *
 * This component displays a list of all notes and highlights,
 * with options for sorting and filtering.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useNotation } from '../hooks';
import { Highlight, Note, NotationSortBy, NotationFilter, HighlightColor } from '../models';

interface NotesListViewProps {
  /**
   * Callback function called when a highlight is clicked
   */
  onHighlightClick: (id: string) => void;

  /**
   * Callback function called when a note is clicked
   */
  onNoteClick: (id: string) => void;

  /**
   * Initial sort order
   */
  initialSortBy?: NotationSortBy;

  /**
   * Initial filter
   */
  initialFilter?: NotationFilter;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * NotesListView Component
 */
export function NotesListView({
  onHighlightClick,
  onNoteClick,
  initialSortBy = 'date',
  initialFilter = {},
  className = '',
}: NotesListViewProps) {
  // Get notation context
  const notation = useNotation();

  // State for sort and filter
  const [sortBy, setSortBy] = useState<NotationSortBy>(initialSortBy);
  const [filter, setFilter] = useState<NotationFilter>(initialFilter);

  // State for filtered and sorted highlights
  const [displayedHighlights, setDisplayedHighlights] = useState<Highlight[]>([]);

  // Update displayed highlights when highlights, sort, or filter changes
  useEffect(() => {
    // Apply filters
    const filteredHighlights = notation.filterHighlights(filter);

    // Apply sorting
    const sortedHighlights = notation.sortHighlights(filteredHighlights, sortBy);

    setDisplayedHighlights(sortedHighlights);
  }, [notation.highlights, sortBy, filter, notation]);

  // Handle sort change
  const handleSortChange = (newSortBy: NotationSortBy) => {
    setSortBy(newSortBy);
  };

  // Handle filter change for papers
  const handlePaperFilterChange = (paperNumber: number) => {
    setFilter(prev => {
      const papers = prev.papers || [];

      if (papers.includes(paperNumber)) {
        // Remove paper from filter
        return {
          ...prev,
          papers: papers.filter(p => p !== paperNumber),
        };
      } else {
        // Add paper to filter
        return {
          ...prev,
          papers: [...papers, paperNumber],
        };
      }
    });
  };

  // Handle filter change for colors
  const handleColorFilterChange = (color: HighlightColor) => {
    setFilter(prev => {
      const colors = prev.colors || [];

      if (colors.includes(color)) {
        // Remove color from filter
        return {
          ...prev,
          colors: colors.filter(c => c !== color),
        };
      } else {
        // Add color to filter
        return {
          ...prev,
          colors: [...colors, color],
        };
      }
    });
  };

  // Handle filter change for has notes
  const handleHasNotesFilterChange = () => {
    setFilter(prev => ({
      ...prev,
      hasNotes: prev.hasNotes === undefined ? true : !prev.hasNotes,
    }));
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Get note for a highlight
  const getNoteForHighlight = (highlightId: string): Note | null => {
    return notation.getNoteByHighlight(highlightId);
  };

  return (
    <div className={`notes-list-view ${className}`}>
      <div className="notes-list-header">
        <h2 className="notes-list-title">Notes & Highlights</h2>

        <div className="notes-list-controls">
          {/* Sort Controls */}
          <div className="notes-list-sort">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={e => handleSortChange(e.target.value as NotationSortBy)}
            >
              <option value="date">Date</option>
              <option value="paper">Paper</option>
              <option value="color">Color</option>
            </select>
          </div>

          {/* Filter Controls */}
          <div className="notes-list-filters">
            <button
              className={`notes-list-filter-button ${filter.hasNotes ? 'active' : ''}`}
              onClick={handleHasNotesFilterChange}
              title="Show only highlights with notes"
            >
              <span className="sr-only">Show only highlights with notes</span>
              <span aria-hidden="true">📝</span>
            </button>

            {/* Color Filters */}
            <div className="notes-list-color-filters">
              {(['yellow', 'green', 'orange', 'purple'] as HighlightColor[]).map(color => (
                <button
                  key={color}
                  className={`notes-list-color-filter ${color} ${
                    filter.colors?.includes(color) ? 'active' : ''
                  }`}
                  onClick={() => handleColorFilterChange(color)}
                  title={`Filter by ${color} highlights`}
                >
                  <span className="sr-only">Filter by {color} highlights</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights List */}
      <div className="notes-list-items">
        {displayedHighlights.length === 0 ? (
          <div className="notes-list-empty">No highlights or notes found.</div>
        ) : (
          displayedHighlights.map(highlight => {
            const note = getNoteForHighlight(highlight.id);

            return (
              <div
                key={highlight.id}
                className={`notes-list-item ${highlight.color}`}
                onClick={() => onHighlightClick(highlight.id)}
              >
                <div className="notes-list-item-header">
                  <span className="notes-list-item-paper">Paper {highlight.paperNumber}</span>
                  <span className="notes-list-item-date">{formatDate(highlight.createdAt)}</span>
                </div>

                <div className="notes-list-item-text">"{highlight.selectedText}"</div>

                {note && (
                  <div
                    className="notes-list-item-note"
                    onClick={e => {
                      e.stopPropagation();
                      onNoteClick(note.id);
                    }}
                  >
                    <div className="notes-list-item-note-header">
                      <span className="notes-list-item-note-icon">📝</span>
                      <span className="notes-list-item-note-date">
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>

                    <div className="notes-list-item-note-preview">
                      {note.content.substring(0, 100)}
                      {note.content.length > 100 ? '...' : ''}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default NotesListView;
