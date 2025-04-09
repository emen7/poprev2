import React from 'react';
import './QuotesTab.css';

export interface Quote {
  /**
   * Unique identifier for the quote
   */
  id: string;

  /**
   * The content of the quote
   */
  content: string;

  /**
   * The timestamp when the quote was created
   */
  createdAt: string;

  /**
   * The ID of the paragraph the quote is associated with
   */
  paragraphId: string;

  /**
   * The reference information (Paper:Section.Paragraph)
   */
  reference: string;
}

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
 * A tab for displaying and managing quotes in the pullup panel.
 */
export const QuotesTab: React.FC<QuotesTabProps> = ({
  quotes,
  onQuoteDelete,
  sortOrder = 'entry',
  onSortOrderChange,
  className = '',
}) => {
  // Handle quote delete
  const handleQuoteDelete = (id: string) => {
    if (onQuoteDelete) {
      onQuoteDelete(id);
    }
  };

  // Handle sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value as 'entry' | 'paper';
    if (onSortOrderChange) {
      onSortOrderChange(newSortOrder);
    }
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = (quote: Quote) => {
    // Format the quote with reference
    const formattedQuote = `${quote.reference} "${quote.content}"`;

    // Copy to clipboard
    navigator.clipboard.writeText(formattedQuote).catch(error => {
      console.error('Failed to copy text:', error);
    });
  };

  // Sort quotes based on sort order
  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortOrder === 'entry') {
      // Sort by creation date (newest first)
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
        <h2 className="quotes-tab-title">Quotes</h2>
        <div className="quotes-tab-controls">
          <label htmlFor="quotes-sort-order">Sort by:</label>
          <select
            id="quotes-sort-order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="quotes-tab-sort"
          >
            <option value="entry">Entry Date</option>
            <option value="paper">Paper Reference</option>
          </select>
        </div>
      </div>

      {/* Quotes list */}
      {sortedQuotes.length > 0 ? (
        <ul className="quotes-list">
          {sortedQuotes.map(quote => (
            <li key={quote.id} className="quote-item">
              {/* Quote header */}
              <div className="quote-header">
                <span className="quote-reference">{quote.reference}</span>
                <div className="quote-actions">
                  <button
                    className="quote-copy-button"
                    onClick={() => handleCopyToClipboard(quote)}
                    aria-label="Copy quote"
                  >
                    📋
                  </button>
                  <button
                    className="quote-delete-button"
                    onClick={() => handleQuoteDelete(quote.id)}
                    aria-label="Delete quote"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Quote content */}
              <div className="quote-content">"{quote.content}"</div>

              {/* Quote metadata */}
              <div className="quote-metadata">
                <span className="quote-date">{new Date(quote.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="quotes-empty">
          <p>No quotes yet. Select text and choose "quote" to add quotes.</p>
        </div>
      )}
    </div>
  );
};

export default QuotesTab;
