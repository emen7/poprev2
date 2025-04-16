/**
 * Reader module for the UB Ecosystem
 */

import type {
  ReaderContext,
  ReaderSettings,
  ReaderProviderProps,
  UBReaderSettings,
  ThemeSettings,
} from '../types/reader';
import {
  DEFAULT_READER_SETTINGS,
  DEFAULT_UB_READER_SETTINGS,
  DEFAULT_THEME_SETTINGS,
  ThemeType,
  FontSizePreset,
} from '../types/reader';
import type { Document, UBDocument } from '../types/document';
import { ContentType } from '../types/document';
import { createNavigationState, NavigationPosition } from '../navigation';
import type { NavigationService } from '../types/navigation';
import { TextSelection, Highlight, HighlightType, SelectionService } from '../types/selection';
import { createExtensionRegistry } from '../extension';
// Simple ID generation function instead of using uuid
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Re-export types
export type { ReaderContext, ReaderSettings, ReaderProviderProps, UBReaderSettings, ThemeSettings };

// Re-export constants
export {
  DEFAULT_READER_SETTINGS,
  DEFAULT_UB_READER_SETTINGS,
  DEFAULT_THEME_SETTINGS,
  ThemeType,
  FontSizePreset,
};

// Re-export context provider and hooks
export {
  ReaderProvider,
  UBReaderProvider,
  useReader,
  useNavigation,
  useSelection,
  useReaderSettings,
  useTheme,
  useDocument,
  useExtensions,
  useExtension,
  useContentTypeExtensions,
} from './context';

/**
 * Create a document cache
 */
export function createDocumentCache() {
  const cache = new Map<string, Document>();

  return {
    /**
     * Get a document from the cache
     */
    get: (id: string): Document | undefined => {
      return cache.get(id);
    },

    /**
     * Set a document in the cache
     */
    set: (id: string, document: Document): void => {
      cache.set(id, document);
    },

    /**
     * Check if a document exists in the cache
     */
    has: (id: string): boolean => {
      return cache.has(id);
    },

    /**
     * Remove a document from the cache
     */
    remove: (id: string): boolean => {
      return cache.delete(id);
    },

    /**
     * Clear the cache
     */
    clear: (): void => {
      cache.clear();
    },
  };
}

/**
 * Create a reader context value
 */
export function createReaderContext(
  document: Document | null = null,
  settings: ReaderSettings = DEFAULT_READER_SETTINGS
): ReaderContext {
  // Create document cache
  const documentCache = createDocumentCache();
  if (document) {
    documentCache.set(document.id, document);
  }

  // Create navigation state that conforms to NavigationService interface
  const navigation = {
    getState: () => createNavigationState(),
    navigateTo: (position: NavigationPosition) => {},
    navigateToSection: (sectionIndex: number) => {},
    navigateToParagraph: (sectionIndex: number, paragraphIndex: number) => {},
    navigateToNextSection: () => {},
    navigateToPreviousSection: () => {},
    navigateToNextParagraph: () => {},
    navigateToPreviousParagraph: () => {},
    navigateBack: () => {},
    navigateForward: () => {},
    getCurrentSection: () => null,
    getCurrentParagraph: () => null,
  };

  // Create selection state that conforms to SelectionService interface
  const selection = {
    getSelections: () => [],
    getSelectionById: (id: string) => null,
    createSelection: (selection: Omit<TextSelection, 'id' | 'timestamp'>) => ({
      id: generateId(),
      text: selection.text,
      startPosition: selection.startPosition,
      endPosition: selection.endPosition,
      timestamp: Date.now(),
      color: selection.color,
    }),
    updateSelection: (id: string, selection: Partial<TextSelection>) => null,
    deleteSelection: (id: string) => false,
    getHighlights: () => [],
    createHighlight: (selection: TextSelection, type: HighlightType, color?: string) => ({
      id: generateId(),
      text: selection.text,
      startPosition: selection.startPosition,
      endPosition: selection.endPosition,
      timestamp: Date.now(),
      type,
      color,
      tags: [],
    }),
    updateHighlight: (id: string, highlight: Partial<Highlight>) => null,
    deleteHighlight: (id: string) => false,
  };

  // Create extension registry
  const extensions = createExtensionRegistry();

  // Create context value
  return {
    document,
    navigation,
    selection,
    settings,
    extensions,
    updateSettings: (newSettings: Partial<ReaderSettings>) => {
      // This is a placeholder - the actual implementation will be in the React context
    },
    loadDocument: async (doc: Document): Promise<void> => {
      // This is a placeholder - the actual implementation will be in the React context
      return Promise.resolve();
    },
    getDocumentById: async (id: string): Promise<Document | null> => {
      // Check cache first
      const cachedDoc = documentCache.get(id);
      if (cachedDoc) {
        return Promise.resolve(cachedDoc);
      }

      // This is a placeholder - the actual implementation will fetch from an API or storage
      return Promise.resolve(null);
    },
    navigateTo: (position: NavigationPosition): void => {
      navigation.navigateTo(position);
    },
    getTheme: (): ThemeSettings => {
      return settings.themeSettings || DEFAULT_THEME_SETTINGS;
    },
  };
}

/**
 * Create a UB-specific reader context
 */
export function createUBReaderContext(
  document: UBDocument | null = null,
  settings: UBReaderSettings = DEFAULT_UB_READER_SETTINGS
): ReaderContext {
  // Create base reader context
  const baseContext = createReaderContext(document, settings);

  // Add UB-specific functionality
  return {
    ...baseContext,
    // Additional UB-specific methods could be added here
  };
}

// Note: The actual React context provider and hook will be implemented in a future task
// This is just a placeholder for the initial structure
