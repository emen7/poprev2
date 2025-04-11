'use client';

import React from 'react';
import { Quote } from './types';
import './QuotesTab.css';

export interface QuotesTabProps {
  /**
   * Array of quotes to display
   */
  quotes: Quote[];

  /**
   * Function called when a quote is deleted
   */
  onQuoteDelete?: (id: string) => void;

  /**
   * The sort order for quotes
   */
  sortOrder?: 'entry' | 'paper';

  /**
   * Function called when the sort order is changed
   */
  onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * QuotesTab Component
 *
 * A tab for displaying and managing quotes.
 */
export function QuotesTab({
  quotes,
  onQuoteDelete,
  sortOrder = 'entry',
  onSortOrderChange,
  className = '',
}: QuotesTabProps) {
  // Handle delete button click
  const handleDeleteClick = (id: string) => {
    if (onQuoteDelete) {
      onQuoteDelete(id);
    }
  };

  // Handle copy button click
  const handleCopyClick = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        // Show toast or notification
        const toast = document.querySelector('.toast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2000);
        }
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as 'entry' | 'paper';
    if (onSortOrderChange) {
      onSortOrderChange(newSortOrder);
    }
  };

  // Sort quotes based on sort order
  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortOrder === 'entry') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by paper reference
      return a.reference.localeCompare(b.reference);
    }
  });

  // Determine container classes
  const containerClasses = ['quotes-tab', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Header with sort controls */}
      <div className="quotes-tab-header">
        <h3 className="quotes-tab-title">Quotes</h3>
        <div className="quotes-tab-sort">
          <label htmlFor="quotes-sort">Sort by:</label>
          <select
            id="quotes-sort"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="quotes-tab-sort-select"
          >
            <option value="entry">Date Added</option>
            <option value="paper">Paper Reference</option>
          </select>
        </div>
      </div>

      {/* Quotes list */}
      {sortedQuotes.length === 0 ? (
        <div className="quotes-tab-empty">
          <p>No quotes yet. Select text in the document and choose "Save Quote" to create one.</p>
        </div>
      ) : (
        <div className="quotes-list">
          {sortedQuotes.map(quote => (
            <div key={quote.id} className="quote-item">
              <div className="quote-header">
                <div className="quote-reference">{quote.reference}</div>
                <div className="quote-actions">
                  <button
                    className="quote-action-button quote-copy-button"
                    onClick={() => handleCopyClick(quote.content)}
                    title="Copy"
                  >
                    Copy
                  </button>
                  <button
                    className="quote-action-button quote-delete-button"
                    onClick={() => handleDeleteClick(quote.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="quote-content">"{quote.content}"</div>

              <div className="quote-date">
                {new Date(quote.createdAt).toLocaleDateString()}{' '}
                {new Date(quote.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast notification for copy action */}
      <div className="toast">Quote copied to clipboard!</div>
    </div>
  );
}

export default QuotesTab;
