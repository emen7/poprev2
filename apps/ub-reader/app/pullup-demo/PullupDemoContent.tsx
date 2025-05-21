'use client';

import React, { useState, useEffect } from 'react';
import { Pullup, usePullup, TextSelectionHandler } from '../../components/pullup';
import { Note, Quote, ReaderSettings } from '../../components/pullup/types';

/**
 * PullupDemoContent Component
 * 
 * This component demonstrates the enhanced pullup component with sample content.
 */
export function PullupDemoContent() {
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

  // Sample data for the demo
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'This is a sample note about the Universal Father.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paragraphId: 'p1',
      reference: '1:1.1',
      selectedText: 'Of all the names by which God the Father is known throughout the universes',
    },
    {
      id: '2',
      content: 'The concept of the First Source is profound.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paragraphId: 'p2',
      reference: '1:1.2',
      selectedText: 'The First Father is known by various names in different universes',
    },
  ]);

  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      content: 'Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered.',
      createdAt: new Date().toISOString(),
      paragraphId: 'p1',
      reference: '1:1.1',
    },
    {
      id: '2',
      content: 'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
      createdAt: new Date().toISOString(),
      paragraphId: 'p3',
      reference: '1:1.3',
    },
  ]);

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 18,
    lineHeight: 1.6,
    fontFamily: 'Georgia, serif',
    theme: 'dark',
    showParagraphNumbers: true,
    formatType: 'modern',
  });

  const [sortOrder, setSortOrder] = useState<'entry' | 'paper'>('entry');

  // Open the pullup when the component mounts
  useEffect(() => {
    // Short delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      openPullup();
    }, 500);

    return () => clearTimeout(timer);
  }, [openPullup]);

  // Handle note update
  const handleNoteUpdate = (id: string, content: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id
          ? { ...note, content, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // Handle note delete
  const handleNoteDelete = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  // Handle quote delete
  const handleQuoteDelete = (id: string) => {
    setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
  };

  // Handle settings change
  const handleSettingsChange = (newSettings: Partial<ReaderSettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  // Handle sort order change
  const handleSortOrderChange = (order: 'entry' | 'paper') => {
    setSortOrder(order);
  };

  // Handle note creation from text selection
  const handleNoteCreate = (selectedText: string, paragraphId: string, reference: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paragraphId,
      reference,
      selectedText,
    };

    setNotes(prevNotes => [...prevNotes, newNote]);
    openPullup('notes');
  };

  // Handle quote creation from text selection
  const handleQuoteCreate = (selectedText: string, paragraphId: string, reference: string) => {
    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      content: selectedText,
      createdAt: new Date().toISOString(),
      paragraphId,
      reference,
    };

    setQuotes(prevQuotes => [...prevQuotes, newQuote]);
    openPullup('quotes');
  };

  return (
    <div className="relative min-h-[80vh] bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Paper 1: The Universal Father
      </h2>

      <div className="prose dark:prose-invert max-w-none">
        <p id="p1" className="mb-4">
          <span className="text-gray-500 dark:text-gray-400 mr-2">1</span>
          Of all the names by which God the Father is known throughout the universes, those which
          designate him as the First Source and the Universe Center are most often encountered. The
          First Father is known by various names in different universes and in different sectors of
          the same universe. The names which the creature assigns to the Creator are much dependent
          on the creature's concept of the Creator.
        </p>

        <p id="p2" className="mb-4">
          <span className="text-gray-500 dark:text-gray-400 mr-2">2</span>
          The Universal Father never imposes any form of arbitrary recognition, formal worship, or
          slavish service upon the intelligent will creatures of the universes. The evolutionary
          inhabitants of the worlds of time and space must of themselves — in their own hearts —
          recognize, love, and voluntarily worship him.
        </p>

        <p id="p3" className="mb-4">
          <span className="text-gray-500 dark:text-gray-400 mr-2">3</span>
          The Creator refuses to coerce or compel the submission of the spiritual free wills of his
          material creatures. The affectionate dedication of the human will to the doing of the
          Father's will is man's choicest gift to God; in fact, such a consecration of creature will
          constitutes man's only possible gift of true value to the Paradise Father.
        </p>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
        <p className="text-blue-700 dark:text-blue-200">
          Try selecting text above to see the text selection options. You can create notes and quotes
          from selected text.
        </p>
      </div>

      {/* Pullup Component */}
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

      {/* Text Selection Handler */}
      <TextSelectionHandler
        onNoteCreate={handleNoteCreate}
        onQuoteCreate={handleQuoteCreate}
      />
    </div>
  );
}
