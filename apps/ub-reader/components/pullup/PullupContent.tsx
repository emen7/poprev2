'use client';

import React from &apos;react';

import { usePullup } from '../../contexts/PullupContext';

import { NotesTab } from './NotesTab';
import { QuotesTab } from './QuotesTab';
import { SettingsTab } from './SettingsTab';
import './PullupContent.css';

export interface PullupContentProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * PullupContent Component
 *
 * A component that renders the content of the active tab in the pullup panel.
 * Uses PullupContext for state management instead of props.
 */
export function PullupContent({ className = '' }: PullupContentProps) {
  const {
    activeTab,
    notes,
    handleNoteUpdate,
    handleNoteDelete,
    quotes,
    handleQuoteDelete,
    settings,
    updateSettings,
    sortOrder,
    setSortOrder,
    handleNoteAdd,
    justAddedNoteId,
    handleEditStarted,
  } = usePullup();

  // Determine container classes
  const containerClasses = ['pullup-content', className].filter(Boolean).join(' ');

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case &apos;notes':
        return (
          <NotesTab
            notes={notes}
            onNoteUpdate={handleNoteUpdate}
            onNoteDelete={handleNoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onNoteAdd={handleNoteAdd}
            justAddedNoteId={justAddedNoteId}
            onEditStarted={handleEditStarted}
          />
        );
      case &apos;quotes':
        return (
          <QuotesTab
            quotes={quotes}
            onQuoteDelete={handleQuoteDelete}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        );
      case &apos;settings':
        // Log to identify serialization issues
        // Removed console.log
        // Removed console.log
        return <SettingsTab settings={settings} />;
      default:
        return null;
    }
  };

  return <div className={containerClasses}>{renderTabContent()}</div>;
}

export default PullupContent;
