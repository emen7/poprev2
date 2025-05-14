import React, { useState, useEffect } from 'react';

import { NotesTab, Note } from './NotesTab';
import { PullupTab } from './PullupTabs';
import { QuotesTab, Quote } from './QuotesTab';
import { SearchTab, SearchResult } from './SearchTab';
import { SettingsTab, ReaderSettings } from './SettingsTab';
import './PullupContent.css';

export interface PullupContentProps {
  /**
   * The currently active tab
   */
  activeTab: PullupTab;

  /**
   * Array of notes to display in the notes tab
   */
  notes: Note[];

  /**
   * Function called when a note is updated
   */
  onNoteUpdate?: (id: string, content: string) => void;

  /**
   * Function called when a note is deleted
   */
  onNoteDelete?: (id: string) => void;

  /**
   * Array of quotes to display in the quotes tab
   */
  quotes: Quote[];

  /**
   * Function called when a quote is deleted
   */
  onQuoteDelete?: (id: string) => void;

  /**
   * The current reader settings
   */
  settings: ReaderSettings;

  /**
   * Function called when settings are changed
   */
  onSettingsChange: (settings: Partial<ReaderSettings>) => void;

  /**
   * The sort order for notes and quotes
   */
  sortOrder?: 'entry' | 'paper';

  /**
   * Function called when the sort order is changed
   */
  onSortOrderChange?: (sortOrder: 'entry' | 'paper') => void;

  /**
   * Function to search for content
   */
  onSearch?: (query: string) => Promise<SearchResult[]>;

  /**
   * Function called when a search result is selected
   */
  onSearchResultSelect?: (result: SearchResult) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * PullupContent Component
 *
 * A component that renders the content of the active tab in the pullup panel.
 */
export const PullupContent: React.FC<PullupContentProps> = ({
  activeTab,
  notes,
  onNoteUpdate,
  onNoteDelete,
  quotes,
  onQuoteDelete,
  settings,
  onSettingsChange,
  sortOrder = 'entry',
  onSortOrderChange,
  onSearch,
  onSearchResultSelect,
  className = '',
}) => {
  // State for tracking tab transitions
  const [previousTab, setPreviousTab] = useState<PullupTab>(activeTab);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);

  // Update transition direction when active tab changes
  useEffect(() => {
    if (previousTab !== activeTab) {
      // Determine transition direction based on tab order
      const tabOrder: PullupTab[] = ['notes', 'quotes', 'settings', 'search'];
      const prevIndex = tabOrder.indexOf(previousTab);
      const currentIndex = tabOrder.indexOf(activeTab);

      // If we can't find the tabs in our order (shouldn't happen), default to right
      if (prevIndex === -1 || currentIndex === -1) {
        setTransitionDirection('right');
      } else {
        // Handle wrap-around cases
        if (prevIndex === 0 && currentIndex === tabOrder.length - 1) {
          setTransitionDirection('left');
        } else if (prevIndex === tabOrder.length - 1 && currentIndex === 0) {
          setTransitionDirection('right');
        } else {
          setTransitionDirection(prevIndex < currentIndex ? 'right' : 'left');
        }
      }

      // Update previous tab for next transition
      setPreviousTab(activeTab);
    }
  }, [activeTab, previousTab]);

  // Determine container classes
  const containerClasses = ['pullup-content', className].filter(Boolean).join(' ');

  // Render all tab content with appropriate classes for transitions
  const renderTabContent = (tab: PullupTab) => {
    let content;

    switch (tab) {
      case 'notes':
        content = (
          <NotesTab
            notes={notes}
            onNoteUpdate={onNoteUpdate}
            onNoteDelete={onNoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        );
        break;
      case 'quotes':
        content = (
          <QuotesTab
            quotes={quotes}
            onQuoteDelete={onQuoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        );
        break;
      case 'settings':
        content = <SettingsTab settings={settings} onSettingsChange={onSettingsChange} />;
        break;
      case 'search':
        content = <SearchTab onSearch={onSearch} onResultSelect={onSearchResultSelect} />;
        break;
      default:
        content = null;
    }

    // Determine CSS classes for transition
    let tabClasses = ['tab-content'];

    if (tab === activeTab) {
      tabClasses.push('active');
    } else if (tab === previousTab && transitionDirection) {
      tabClasses.push(`exiting-${transitionDirection}`);
    } else if (transitionDirection) {
      // For tabs that are neither active nor previous
      if (transitionDirection === 'right') {
        tabClasses.push('entering-right');
      } else {
        tabClasses.push('entering-left');
      }
    }

    return (
      <div key={tab} className={tabClasses.join(' ')}>
        {content}
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      <div className="tab-transition-container">
        {renderTabContent('notes')}
        {renderTabContent('quotes')}
        {renderTabContent('settings')}
        {renderTabContent('search')}
      </div>
    </div>
  );
};

export default PullupContent;
