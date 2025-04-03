/**
 * Storage Adapter for Notation System
 *
 * This file provides a storage adapter for persisting notation data
 * to localStorage, with methods for CRUD operations on highlights,
 * notes, and collections.
 */

import { Highlight, Note, Collection } from '../models';

// Storage keys
const STORAGE_KEYS = {
  HIGHLIGHTS: 'ub-reader-highlights',
  NOTES: 'ub-reader-notes',
  COLLECTIONS: 'ub-reader-collections',
};

/**
 * LocalStorageAdapter provides methods for storing and retrieving
 * notation data from localStorage.
 */
export class LocalStorageAdapter {
  /**
   * Get all highlights from storage
   */
  getHighlights(): Highlight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving highlights from localStorage:', error);
      return [];
    }
  }

  /**
   * Save a highlight to storage
   */
  saveHighlight(highlight: Highlight): void {
    try {
      const highlights = this.getHighlights();
      highlights.push(highlight);
      localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
    } catch (error) {
      console.error('Error saving highlight to localStorage:', error);
    }
  }

  /**
   * Update a highlight in storage
   */
  updateHighlight(id: string, updates: Partial<Highlight>): void {
    try {
      const highlights = this.getHighlights();
      const index = highlights.findIndex(h => h.id === id);

      if (index !== -1) {
        highlights[index] = { ...highlights[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
      }
    } catch (error) {
      console.error('Error updating highlight in localStorage:', error);
    }
  }

  /**
   * Delete a highlight from storage
   */
  deleteHighlight(id: string): void {
    try {
      const highlights = this.getHighlights();
      const filteredHighlights = highlights.filter(h => h.id !== id);

      if (filteredHighlights.length !== highlights.length) {
        localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(filteredHighlights));

        // Also delete any associated notes
        const notes = this.getNotes();
        const note = notes.find(n => n.highlightId === id);
        if (note) {
          this.deleteNote(note.id);
        }
      }
    } catch (error) {
      console.error('Error deleting highlight from localStorage:', error);
    }
  }

  /**
   * Get all notes from storage
   */
  getNotes(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving notes from localStorage:', error);
      return [];
    }
  }

  /**
   * Save a note to storage
   */
  saveNote(note: Note): void {
    try {
      const notes = this.getNotes();
      notes.push(note);
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));

      // Update the associated highlight to include the noteId
      const highlights = this.getHighlights();
      const highlight = highlights.find(h => h.id === note.highlightId);
      if (highlight && !highlight.noteId) {
        this.updateHighlight(highlight.id, { noteId: note.id });
      }
    } catch (error) {
      console.error('Error saving note to localStorage:', error);
    }
  }

  /**
   * Update a note in storage
   */
  updateNote(id: string, updates: Partial<Note>): void {
    try {
      const notes = this.getNotes();
      const index = notes.findIndex(n => n.id === id);

      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          ...updates,
          updatedAt: Date.now(), // Always update the updatedAt timestamp
        };
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      }
    } catch (error) {
      console.error('Error updating note in localStorage:', error);
    }
  }

  /**
   * Delete a note from storage
   */
  deleteNote(id: string): void {
    try {
      const notes = this.getNotes();
      const note = notes.find(n => n.id === id);

      if (note) {
        const filteredNotes = notes.filter(n => n.id !== id);
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(filteredNotes));

        // Update the associated highlight to remove the noteId
        const highlights = this.getHighlights();
        const highlight = highlights.find(h => h.id === note.highlightId);
        if (highlight && highlight.noteId === id) {
          this.updateHighlight(highlight.id, { noteId: undefined });
        }
      }
    } catch (error) {
      console.error('Error deleting note from localStorage:', error);
    }
  }

  /**
   * Get all collections from storage
   */
  getCollections(): Collection[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving collections from localStorage:', error);
      return [];
    }
  }

  /**
   * Save a collection to storage
   */
  saveCollection(collection: Collection): void {
    try {
      const collections = this.getCollections();
      collections.push(collection);
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collection to localStorage:', error);
    }
  }

  /**
   * Update a collection in storage
   */
  updateCollection(id: string, updates: Partial<Collection>): void {
    try {
      const collections = this.getCollections();
      const index = collections.findIndex(c => c.id === id);

      if (index !== -1) {
        collections[index] = { ...collections[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
      }
    } catch (error) {
      console.error('Error updating collection in localStorage:', error);
    }
  }

  /**
   * Delete a collection from storage
   */
  deleteCollection(id: string): void {
    try {
      const collections = this.getCollections();
      const filteredCollections = collections.filter(c => c.id !== id);

      if (filteredCollections.length !== collections.length) {
        localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(filteredCollections));
      }
    } catch (error) {
      console.error('Error deleting collection from localStorage:', error);
    }
  }

  /**
   * Export all notation data
   */
  exportData() {
    return {
      highlights: this.getHighlights(),
      notes: this.getNotes(),
      collections: this.getCollections(),
    };
  }

  /**
   * Import notation data
   */
  importData(data: { highlights: Highlight[]; notes: Note[]; collections: Collection[] }): void {
    try {
      localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(data.highlights || []));
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(data.notes || []));
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(data.collections || []));
    } catch (error) {
      console.error('Error importing data to localStorage:', error);
    }
  }

  /**
   * Clear all notation data
   */
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HIGHLIGHTS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      localStorage.removeItem(STORAGE_KEYS.COLLECTIONS);
    } catch (error) {
      console.error('Error clearing notation data from localStorage:', error);
    }
  }
}

// Export a singleton instance
export const storageAdapter = new LocalStorageAdapter();
