'use client';

import React, { useState, useEffect } from 'react';
import { Pullup, usePullup, Note, Quote, ReaderSettings, TextSelectionHandler } from './pullup';

/**
 * PullupContainer Component
 *
 * This component connects the pullup UI components with the state management.
 * It provides a bottom panel with tabs for Notes, Quotes, and Settings.
 */
export const PullupContainer: React.FC = () => {
  // Get pullup state and actions from the usePullup hook
  const {
    isOpen,
    activeTab,
    height,
    isPersistent,
    openPullup,
    closePullup,
    setActiveTab,
    setHeight,
  } = usePullup();

  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);

  // State for quotes
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // State for settings
  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'Georgia, serif',
    theme: 'light',
    showParagraphNumbers: true,
    formatType: 'traditional',
  });

  // State for sort order
  const [sortOrder, setSortOrder] = useState<'entry' | 'paper'>('entry');

  // Load notes and quotes from localStorage on component mount
  useEffect(() => {
    const loadedNotes = localStorage.getItem('ub-reader-notes');
    if (loadedNotes) {
      try {
        setNotes(JSON.parse(loadedNotes));
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
      }
    }

    const loadedQuotes = localStorage.getItem('ub-reader-quotes');
    if (loadedQuotes) {
      try {
        setQuotes(JSON.parse(loadedQuotes));
      } catch (error) {
        console.error('Error loading quotes from localStorage:', error);
      }
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ub-reader-notes', JSON.stringify(notes));
  }, [notes]);

  // Save quotes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ub-reader-quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Handle note update
  const handleNoteUpdate = (id: string, content: string) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, content, updatedAt: new Date().toISOString() } : note
      )
    );
  };

  // Handle note delete
  const handleNoteDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Handle quote delete
  const handleQuoteDelete = (id: string) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: Partial<ReaderSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Handle sort order change
  const handleSortOrderChange = (newSortOrder: 'entry' | 'paper') => {
    setSortOrder(newSortOrder);
  };

  // Handle note creation
  const handleNoteCreate = (note: Note) => {
    setNotes([note, ...notes]);
  };

  // Handle quote creation
  const handleQuoteCreate = (quote: Quote) => {
    setQuotes([quote, ...quotes]);
  };

  return (
    <>
      <Pullup
        isOpen={isOpen}
        activeTab={activeTab}
        height={height}
        isPersistent={isPersistent}
        onClose={closePullup}
        onTabSelect={setActiveTab}
        onHeightChange={setHeight}
        notes={notes}
        onNoteUpdate={handleNoteUpdate}
        onNoteDelete={handleNoteDelete}
        quotes={quotes}
        onQuoteDelete={handleQuoteDelete}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />
      <TextSelectionHandler onNoteCreate={handleNoteCreate} onQuoteCreate={handleQuoteCreate} />
    </>
  );
};
