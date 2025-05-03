'use client';

import type { ReactNode } from &apos;react';
import React, { createContext, useContext, useState, useEffect } from &apos;react';

import type { Note, Quote, PullupTab, ReaderSettings } from '../components/pullup/types';

interface PullupContextType {
  // Pullup state
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeTab: PullupTab;
  setActiveTab: (tab: PullupTab) => void;
  height: number;
  setHeight: (height: number) => void;
  isPersistent: boolean;
  setIsPersistent: (isPersistent: boolean) => void;
  isPeeking: boolean;
  setIsPeeking: (isPeeking: boolean) => void;

  // Notes and quotes data
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  quotes: Quote[];
  setQuotes: (quotes: Quote[]) => void;

  // Settings state
  settings: ReaderSettings;
  updateSettings: (settings: Partial<ReaderSettings>) => void;

  // Sort order
  sortOrder: &apos;entry' | &apos;paper';
  setSortOrder: (sortOrder: &apos;entry' | &apos;paper') => void;

  // Just added note
  justAddedNoteId: string | null;
  setJustAddedNoteId: (id: string | null) => void;

  // Actions
  openPullup: (tab?: PullupTab) => void;
  closePullup: () => void;
  handleHeightChange: (newHeight: number) => void;
  handleNoteUpdate: (id: string, content: string) => void;
  handleNoteDelete: (id: string) => void;
  handleQuoteDelete: (id: string) => void;
  handleNoteCreate: (note: Note) => void;
  handleQuoteCreate: (quote: Quote) => void;
  handleNoteAdd: (newNoteId: string) => void;
  handleEditStarted: () => void;
}

export const PullupContext = createContext<PullupContextType | undefined>(undefined);

interface PullupProviderProps {
  children: ReactNode;
  initialSettings: ReaderSettings;
}

export function PullupProvider({ children, initialSettings }: PullupProviderProps) {
  // State for pullup
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PullupTab>('notes');
  const [height, setHeight] = useState(300);
  const [isPersistent, setIsPersistent] = useState(false);
  const [isPeeking, setIsPeeking] = useState(true); // Start with peeking enabled

  // State for notes
  const [notes, setNotes] = useState<Note[]>([]);

  // State for quotes
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // State for settings
  const [settings, setSettings] = useState<ReaderSettings>(initialSettings);

  // State for sort order
  const [sortOrder, setSortOrder] = useState<'entry' | &apos;paper'>('entry');

  // State for just added note
  const [justAddedNoteId, setJustAddedNoteId] = useState<string | null>(null);

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

  // Open pullup
  const openPullup = (tab: PullupTab = &apos;notes') => {
    setActiveTab(tab);
    setIsOpen(true);
    setIsPeeking(false);
  };

  // Close pullup
  const closePullup = () => {
    setIsOpen(false);
    setIsPeeking(true);
  };

  // Handle height change
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (!isOpen && isPeeking) {
      setIsOpen(true);
      setIsPeeking(false);
    }
  };

  // Update settings
  const updateSettings = (newSettings: Partial<ReaderSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  // Handle note update
  const handleNoteUpdate = (id: string, content: string) => {
    const now = new Date().toISOString();
    setNotes(notes.map(note => (note.id === id ? { ...note, content, updatedAt: now } : note)));
  };

  // Handle note delete
  const handleNoteDelete = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Handle quote delete
  const handleQuoteDelete = (id: string) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  // Handle note creation
  const _handleNoteCreate = (note: Note) => {
    // Ensure the note has all required fields from the canonical interface
    const completeNote: Note = {
      ...note,
      updatedAt: note.updatedAt || note.createdAt,
      selectedText: note.selectedText || '',
      isSelected: false,
    };
    setNotes([completeNote, ...notes]);
    setJustAddedNoteId(note.id);
    openPullup('notes');
  };

  // Handle quote creation
  const _handleQuoteCreate = (quote: Quote) => {
    setQuotes([quote, ...quotes]);
    openPullup('quotes');
  };

  // Handle note add
  const handleNoteAdd = (newNoteId: string) => {
    setJustAddedNoteId(newNoteId);
  };

  // Handle edit started
  const handleEditStarted = () => {
    setJustAddedNoteId(null);
  };

  return (
    <PullupContext.Provider
      value={{
        // Pullup state
        isOpen,
        setIsOpen,
        activeTab,
        setActiveTab,
        height,
        setHeight,
        isPersistent,
        setIsPersistent,
        isPeeking,
        setIsPeeking,

        // Notes and quotes data
        notes,
        setNotes,
        quotes,
        setQuotes,

        // Settings state
        settings,
        updateSettings,

        // Sort order
        sortOrder,
        setSortOrder,

        // Just added note
        justAddedNoteId,
        setJustAddedNoteId,

        // Actions
        openPullup,
        closePullup,
        handleHeightChange,
        handleNoteUpdate,
        handleNoteDelete,
        handleQuoteDelete,
        handleNoteCreate,
        handleQuoteCreate,
        handleNoteAdd,
        handleEditStarted,
      }}
    >
      {children}
    </PullupContext.Provider>
  );
}

export function usePullup(): PullupContextType {
  const context = useContext(PullupContext);

  if (context === undefined) {
    throw new Error('usePullup must be used within a PullupProvider');
  }

  return context;
}
