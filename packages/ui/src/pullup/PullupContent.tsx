import React from 'react';
import { PullupTab } from './PullupTabs';
import { NotesTab, Note } from './NotesTab';
import { QuotesTab, Quote } from './QuotesTab';
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
  className = '',
}) => {
  // Determine container classes
  const containerClasses = ['pullup-content', className].filter(Boolean).join(' ');

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'notes':
        return (
          <NotesTab
            notes={notes}
            onNoteUpdate={onNoteUpdate}
            onNoteDelete={onNoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        );
      case 'quotes':
        return (
          <QuotesTab
            quotes={quotes}
            onQuoteDelete={onQuoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        );
      case 'settings':
        return <SettingsTab settings={settings} onSettingsChange={onSettingsChange} />;
      default:
        return null;
    }
  };

  return <div className={containerClasses}>{renderTabContent()}</div>;
};

export default PullupContent;
