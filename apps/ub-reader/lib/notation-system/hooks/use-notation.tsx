/**
 * Notation Context and Provider
 *
 * This file implements the React context and provider for the notation system,
 * providing access to highlights, notes, and collections throughout the application.
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Highlight,
  Note,
  Collection,
  HighlightColor,
  TextSelection,
  NotationFilter,
  NotationSortBy,
} from '../models';
import { storageAdapter, generateUUID } from '../utils';

/**
 * Notation Context Value Interface
 */
interface NotationContextValue {
  // Highlights
  highlights: Highlight[];
  addHighlight: (highlight: Omit<Highlight, 'id' | 'createdAt'>) => string;
  updateHighlight: (id: string, updates: Partial<Highlight>) => void;
  removeHighlight: (id: string) => void;
  getHighlightsByPaper: (paperNumber: number) => Highlight[];
  getHighlightsBySection: (sectionId: string) => Highlight[];

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateNote: (id: string, updates: Partial<Note>) => void;
  removeNote: (id: string) => void;
  getNoteByHighlight: (highlightId: string) => Note | null;

  // Collections
  collections: Collection[];
  addCollection: (collection: Omit<Collection, 'id' | 'createdAt'>) => string;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  removeCollection: (id: string) => void;

  // UI State
  activeHighlight: string | null;
  setActiveHighlight: (id: string | null) => void;
  activeNote: string | null;
  setActiveNote: (id: string | null) => void;
  isNotePanelOpen: boolean;
  openNotePanel: () => void;
  closeNotePanel: () => void;

  // Search and Filter
  searchHighlights: (query: string) => Highlight[];
  searchNotes: (query: string) => Note[];
  searchAll: (query: string) => { highlights: Highlight[]; notes: Note[] };
  filterHighlights: (filter: NotationFilter) => Highlight[];
  sortHighlights: (highlights: Highlight[], sortBy: NotationSortBy) => Highlight[];

  // Tags
  getAllTags: () => string[];
  getHighlightsByTag: (tag: string) => Highlight[];

  // Export/Import
  exportData: () => { highlights: Highlight[]; notes: Note[]; collections: Collection[] };
  importData: (data: { highlights: Highlight[]; notes: Note[]; collections: Collection[] }) => void;
  clearAllData: () => void;
}

// Create the context
const NotationContext = createContext<NotationContextValue | undefined>(undefined);

/**
 * Hook to use the notation context
 */
export function useNotation() {
  const context = useContext(NotationContext);
  if (context === undefined) {
    throw new Error('useNotation must be used within a NotationProvider');
  }
  return context;
}

interface NotationProviderProps {
  children: ReactNode;
}

/**
 * Notation Provider Component
 */
export function NotationProvider({ children }: NotationProviderProps) {
  // State for highlights, notes, and collections
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  // UI state
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isNotePanelOpen, setIsNotePanelOpen] = useState(false);

  // Load data from storage on mount
  useEffect(() => {
    setHighlights(storageAdapter.getHighlights());
    setNotes(storageAdapter.getNotes());
    setCollections(storageAdapter.getCollections());
  }, []);

  // Highlight operations
  const addHighlight = (highlightData: Omit<Highlight, 'id' | 'createdAt'>) => {
    const id = generateUUID();
    const highlight: Highlight = {
      ...highlightData,
      id,
      createdAt: Date.now(),
    };

    storageAdapter.saveHighlight(highlight);
    setHighlights(prev => [...prev, highlight]);

    return id;
  };

  const updateHighlight = (id: string, updates: Partial<Highlight>) => {
    storageAdapter.updateHighlight(id, updates);
    setHighlights(prev => prev.map(h => (h.id === id ? { ...h, ...updates } : h)));
  };

  const removeHighlight = (id: string) => {
    storageAdapter.deleteHighlight(id);
    setHighlights(prev => prev.filter(h => h.id !== id));

    // If this highlight has a note, remove it too
    const note = notes.find(n => n.highlightId === id);
    if (note) {
      removeNote(note.id);
    }

    // Remove this highlight from any collections
    collections.forEach(collection => {
      if (collection.highlightIds.includes(id)) {
        const updatedIds = collection.highlightIds.filter(hId => hId !== id);
        updateCollection(collection.id, { highlightIds: updatedIds });
      }
    });
  };

  const getHighlightsByPaper = (paperNumber: number) => {
    return highlights.filter(h => h.paperNumber === paperNumber);
  };

  const getHighlightsBySection = (sectionId: string) => {
    return highlights.filter(h => h.sectionId === sectionId);
  };

  // Note operations
  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = generateUUID();
    const now = Date.now();
    const note: Note = {
      ...noteData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    storageAdapter.saveNote(note);
    setNotes(prev => [...prev, note]);

    // Update the associated highlight
    const highlight = highlights.find(h => h.id === note.highlightId);
    if (highlight) {
      updateHighlight(highlight.id, { noteId: id });
    }

    return id;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updatedNote = {
      ...updates,
      updatedAt: Date.now(),
    };

    storageAdapter.updateNote(id, updatedNote);
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...updatedNote } : n)));
  };

  const removeNote = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      storageAdapter.deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));

      // Update the associated highlight
      const highlight = highlights.find(h => h.id === note.highlightId);
      if (highlight) {
        updateHighlight(highlight.id, { noteId: undefined });
      }
    }
  };

  const getNoteByHighlight = (highlightId: string) => {
    return notes.find(n => n.highlightId === highlightId) || null;
  };

  // Collection operations
  const addCollection = (collectionData: Omit<Collection, 'id' | 'createdAt'>) => {
    const id = generateUUID();
    const collection: Collection = {
      ...collectionData,
      id,
      createdAt: Date.now(),
    };

    storageAdapter.saveCollection(collection);
    setCollections(prev => [...prev, collection]);

    return id;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    storageAdapter.updateCollection(id, updates);
    setCollections(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCollection = (id: string) => {
    storageAdapter.deleteCollection(id);
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  // UI operations
  const openNotePanel = () => {
    setIsNotePanelOpen(true);
  };

  const closeNotePanel = () => {
    setIsNotePanelOpen(false);
  };

  // Search and filter operations
  const searchHighlights = (query: string) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return highlights.filter(
      h =>
        h.selectedText.toLowerCase().includes(lowerQuery) ||
        h.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const searchNotes = (query: string) => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return notes.filter(n => n.content.toLowerCase().includes(lowerQuery));
  };

  const searchAll = (query: string) => {
    if (!query.trim()) return { highlights: [], notes: [] };

    const matchedHighlights = searchHighlights(query);
    const matchedNotes = searchNotes(query);

    // Filter out notes that are already associated with matched highlights
    const highlightNoteIds = matchedHighlights.filter(h => h.noteId).map(h => h.noteId as string);

    const uniqueNotes = matchedNotes.filter(n => !highlightNoteIds.includes(n.id));

    return {
      highlights: matchedHighlights,
      notes: uniqueNotes,
    };
  };

  const filterHighlights = (filter: NotationFilter) => {
    return highlights.filter(h => {
      // Filter by paper
      if (filter.papers && filter.papers.length > 0) {
        if (!filter.papers.includes(h.paperNumber)) return false;
      }

      // Filter by color
      if (filter.colors && filter.colors.length > 0) {
        if (!filter.colors.includes(h.color)) return false;
      }

      // Filter by tags
      if (filter.tags && filter.tags.length > 0) {
        if (!h.tags.some(tag => filter.tags!.includes(tag))) return false;
      }

      // Filter by has notes
      if (filter.hasNotes !== undefined) {
        const hasNote = !!h.noteId;
        if (hasNote !== filter.hasNotes) return false;
      }

      // Filter by date range
      if (filter.dateRange) {
        if (h.createdAt < filter.dateRange.start || h.createdAt > filter.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  };

  const sortHighlights = (highlightsToSort: Highlight[], sortBy: NotationSortBy) => {
    const sortedHighlights = [...highlightsToSort];

    switch (sortBy) {
      case 'paper':
        sortedHighlights.sort((a, b) => {
          // First by paper number
          if (a.paperNumber !== b.paperNumber) {
            return a.paperNumber - b.paperNumber;
          }
          // Then by section ID
          if (a.sectionId !== b.sectionId) {
            return a.sectionId.localeCompare(b.sectionId);
          }
          // Finally by position in the document
          return a.startOffset - b.startOffset;
        });
        break;

      case 'date':
        sortedHighlights.sort((a, b) => b.createdAt - a.createdAt);
        break;

      case 'color':
        const colorOrder: Record<HighlightColor, number> = {
          yellow: 1,
          green: 2,
          orange: 3,
          purple: 4,
        };
        sortedHighlights.sort((a, b) => colorOrder[a.color] - colorOrder[b.color]);
        break;
    }

    return sortedHighlights;
  };

  // Tag operations
  const getAllTags = () => {
    // Get all unique tags from highlights
    const tagSet = new Set<string>();

    highlights.forEach(highlight => {
      highlight.tags.forEach(tag => {
        tagSet.add(tag);
      });
    });

    return Array.from(tagSet).sort();
  };

  const getHighlightsByTag = (tag: string) => {
    return highlights.filter(h => h.tags.includes(tag));
  };

  // Export/Import operations
  const exportData = () => {
    return storageAdapter.exportData();
  };

  const importData = (data: {
    highlights: Highlight[];
    notes: Note[];
    collections: Collection[];
  }) => {
    storageAdapter.importData(data);
    setHighlights(data.highlights || []);
    setNotes(data.notes || []);
    setCollections(data.collections || []);
  };

  const clearAllData = () => {
    storageAdapter.clearAll();
    setHighlights([]);
    setNotes([]);
    setCollections([]);
    setActiveHighlight(null);
    setActiveNote(null);
    setIsNotePanelOpen(false);
  };

  // Context value
  const value: NotationContextValue = {
    // Highlights
    highlights,
    addHighlight,
    updateHighlight,
    removeHighlight,
    getHighlightsByPaper,
    getHighlightsBySection,

    // Notes
    notes,
    addNote,
    updateNote,
    removeNote,
    getNoteByHighlight,

    // Collections
    collections,
    addCollection,
    updateCollection,
    removeCollection,

    // UI State
    activeHighlight,
    setActiveHighlight,
    activeNote,
    setActiveNote,
    isNotePanelOpen,
    openNotePanel,
    closeNotePanel,

    // Search and Filter
    searchHighlights,
    searchNotes,
    searchAll,
    filterHighlights,
    sortHighlights,

    // Tags
    getAllTags,
    getHighlightsByTag,

    // Export/Import
    exportData,
    importData,
    clearAllData,
  };

  return <NotationContext.Provider value={value}>{children}</NotationContext.Provider>;
}
