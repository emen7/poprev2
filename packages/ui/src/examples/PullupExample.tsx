import React, { useState } from 'react';

import { Pullup, PullupTab, Note, Quote, ReaderSettings } from '../pullup';
import './PullupExample.css';

/**
 * Example component demonstrating the pullup feature
 */
export const PullupExample: React.FC = () => {
  // State for pullup
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<PullupTab>('notes');
  const [height, setHeight] = useState<number>(300);
  const [isPersistent, setIsPersistent] = useState<boolean>(false);

  // State for notes
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'This is a note about the Universal Father.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paragraphId: 'p1',
      reference: '(1:1.1)',
      selectedText: 'Universal Father',
    },
    {
      id: '2',
      content: 'Interesting point about arbitrary recognition.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paragraphId: 'p2',
      reference: '(1:1.2)',
      selectedText: 'arbitrary recognition',
    },
  ]);

  // State for quotes
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      content:
        'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
      createdAt: new Date().toISOString(),
      paragraphId: 'p2',
      reference: '(1:1.2)',
    },
    {
      id: '2',
      content:
        'When you have once become truly God-conscious, after you really discover the majestic Creator and begin to experience the realization of the indwelling presence of the divine controller',
      createdAt: new Date().toISOString(),
      paragraphId: 'p3',
      reference: '(1:1.3)',
    },
  ]);

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

  // Handle pullup open
  const handlePullupOpen = () => {
    setIsOpen(true);
  };

  // Handle pullup close
  const handlePullupClose = () => {
    setIsOpen(false);
  };

  // Handle tab select
  const handleTabSelect = (tab: PullupTab) => {
    setActiveTab(tab);
  };

  // Handle height change
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
  };

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

  // Handle persistent mode toggle
  const handlePersistentToggle = () => {
    setIsPersistent(!isPersistent);
  };

  return (
    <div className="pullup-example">
      <h1>Pullup Example</h1>
      <p className="example-description">
        This example demonstrates the pullup feature for the Urantia Book reader. The pullup panel
        slides up from the bottom of the screen and provides access to notes, quotes, and settings.
      </p>

      <div className="example-content">
        <h2>The Universal Father</h2>
        <p id="p1">
          Of all the names by which God the Father is known throughout the universes, those which
          designate him as the First Source and the Universe Center are most often encountered. The
          First Father is known by various names in different universes and in different sectors of
          the same universe. The names which the creature assigns to the Creator are much dependent
          on the creature's concept of the Creator.
        </p>
        <p id="p2">
          The Universal Father never imposes any form of arbitrary recognition, formal worship, or
          slavish service upon the intelligent will creatures of the universes. The evolutionary
          inhabitants of the worlds of time and space must of themselves — in their own hearts —
          recognize, love, and voluntarily worship him.
        </p>
        <p id="p3">
          When you have once become truly God-conscious, after you really discover the majestic
          Creator and begin to experience the realization of the indwelling presence of the divine
          controller, then, in accordance with your enlightenment and in accordance with the manner
          and method by which the divine Sons reveal God, you will find a name for the Universal
          Father which will be adequately expressive of your concept of the First Great Source and
          Center.
        </p>
        <p id="p4">
          Near the center of the universe of universes, the Universal Father is generally known by
          names which may be regarded as meaning the First Source. Farther out in the universes of
          space, the terms employed to designate the Universal Father more often mean the Universal
          Center.
        </p>
        <p id="p5">
          On those worlds where a Paradise Son has lived a bestowal life, God is generally known by
          some name indicative of personal relationship, tender affection, and fatherly devotion. On
          your constellation headquarters God is referred to as the Universal Father, and on
          different planets in your local system of inhabited worlds he is variously known as the
          Father of Fathers, the Paradise Father, the Havona Father, and the Spirit Father.
        </p>
      </div>

      <div className="example-controls">
        <button className="open-button" onClick={handlePullupOpen}>
          Open Pullup
        </button>
        <div className="control-group">
          <label>
            <input type="checkbox" checked={isPersistent} onChange={handlePersistentToggle} />
            Persistent Mode
          </label>
        </div>
      </div>

      <Pullup
        isOpen={isOpen}
        activeTab={activeTab}
        height={height}
        isPersistent={isPersistent}
        onClose={handlePullupClose}
        onTabSelect={handleTabSelect}
        onHeightChange={handleHeightChange}
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
    </div>
  );
};

export default PullupExample;
