/**
 * Reader context provider and hooks for the UB Ecosystem
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
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
} from '../types/reader';
import type { Document, UBDocument } from '../types/document';
import { ContentType } from '../types/document';
import { NavigationPosition, NavigationState } from '../navigation';
import { TextSelection, Highlight, HighlightType } from '../types/selection';
import { createReaderContext, createUBReaderContext, createDocumentCache } from './index';
import { createExtensionRegistry } from '../extension';
import { ExtensionType } from '../types/extension';

/**
 * Navigation history entry interface
 */
interface NavigationHistoryEntry {
  /**
   * Document ID
   */
  documentId: string;

  /**
   * Section index
   */
  sectionIndex: number;

  /**
   * Paragraph index
   */
  paragraphIndex: number;

  /**
   * Timestamp
   */
  timestamp: number;
}

// Create React context
const ReaderReactContext = createContext<ReaderContext | null>(null);

/**
 * Reader provider component props
 */
export interface ReaderProviderComponentProps extends ReaderProviderProps {
  /**
   * Children components
   */
  children: React.ReactNode;
}

/**
 * Reader provider component
 */
export const ReaderProvider: React.FC<ReaderProviderComponentProps> = ({
  document,
  initialSettings,
  extensions = [],
  contentType = ContentType.STANDARD,
  children,
}) => {
  // Create document cache
  const documentCache = useMemo(() => createDocumentCache(), []);

  // Initialize document in cache if provided
  useEffect(() => {
    if (document) {
      documentCache.set(document.id, document);
    }
  }, [document, documentCache]);

  // Create state for current document
  const [currentDocument, setCurrentDocument] = useState<Document | null>(document || null);

  // Create state for settings
  const [settings, setSettings] = useState<ReaderSettings>({
    ...DEFAULT_READER_SETTINGS,
    ...initialSettings,
  });

  // Create extension registry
  const extensionRegistry = useMemo(() => createExtensionRegistry(), []);

  // Load extensions
  useEffect(() => {
    // This would typically load extensions from a registry or API
    // For now, we'll just log that we're loading extensions
    console.log('Loading extensions:', extensions);
  }, [extensions]);

  // Create navigation state
  const [navigationState, setNavigationState] = useState<{
    document: Document | null;
    currentSectionIndex: number;
    currentParagraphIndex: number;
    history: NavigationHistoryEntry[];
    historyIndex: number;
  }>({
    document: currentDocument,
    currentSectionIndex: 0,
    currentParagraphIndex: 0,
    history: [],
    historyIndex: -1,
  });

  // Navigation methods
  const navigateTo = useCallback((position: NavigationPosition) => {
    setNavigationState(prevState => ({
      ...prevState,
      currentSectionIndex: position.sectionIndex,
      currentParagraphIndex: position.paragraphIndex,
      history: [
        ...prevState.history.slice(0, prevState.historyIndex + 1),
        {
          documentId: position.documentId,
          sectionIndex: position.sectionIndex,
          paragraphIndex: position.paragraphIndex,
          timestamp: Date.now(),
        },
      ],
      historyIndex: prevState.historyIndex + 1,
    }));
  }, []);

  const navigateToSection = useCallback(
    (sectionIndex: number) => {
      navigateTo({
        documentId: currentDocument?.id || '',
        sectionIndex,
        paragraphIndex: 0,
      });
    },
    [currentDocument, navigateTo]
  );

  const navigateToParagraph = useCallback(
    (sectionIndex: number, paragraphIndex: number) => {
      navigateTo({
        documentId: currentDocument?.id || '',
        sectionIndex,
        paragraphIndex,
      });
    },
    [currentDocument, navigateTo]
  );

  const navigateToNextSection = useCallback(() => {
    if (!currentDocument) return;

    const nextSectionIndex = navigationState.currentSectionIndex + 1;
    if (nextSectionIndex < currentDocument.sections.length) {
      navigateToSection(nextSectionIndex);
    }
  }, [currentDocument, navigationState.currentSectionIndex, navigateToSection]);

  const navigateToPreviousSection = useCallback(() => {
    if (navigationState.currentSectionIndex > 0) {
      navigateToSection(navigationState.currentSectionIndex - 1);
    }
  }, [navigationState.currentSectionIndex, navigateToSection]);

  const navigateToNextParagraph = useCallback(() => {
    if (!currentDocument) return;

    const currentSection = currentDocument.sections[navigationState.currentSectionIndex];
    if (!currentSection) return;

    const nextParagraphIndex = navigationState.currentParagraphIndex + 1;

    if (nextParagraphIndex < currentSection.paragraphs.length) {
      // Navigate to next paragraph in current section
      navigateToParagraph(navigationState.currentSectionIndex, nextParagraphIndex);
    } else if (navigationState.currentSectionIndex + 1 < currentDocument.sections.length) {
      // Navigate to first paragraph of next section
      navigateToParagraph(navigationState.currentSectionIndex + 1, 0);
    }
  }, [currentDocument, navigationState, navigateToParagraph]);

  const navigateToPreviousParagraph = useCallback(() => {
    if (!currentDocument) return;

    if (navigationState.currentParagraphIndex > 0) {
      // Navigate to previous paragraph in current section
      navigateToParagraph(
        navigationState.currentSectionIndex,
        navigationState.currentParagraphIndex - 1
      );
    } else if (navigationState.currentSectionIndex > 0) {
      // Navigate to last paragraph of previous section
      const previousSection = currentDocument.sections[navigationState.currentSectionIndex - 1];
      if (previousSection) {
        navigateToParagraph(
          navigationState.currentSectionIndex - 1,
          previousSection.paragraphs.length - 1
        );
      }
    }
  }, [currentDocument, navigationState, navigateToParagraph]);

  const navigateBack = useCallback(() => {
    if (navigationState.historyIndex > 0) {
      const previousEntry = navigationState.history[navigationState.historyIndex - 1];
      setNavigationState(prevState => ({
        ...prevState,
        currentSectionIndex: previousEntry.sectionIndex,
        currentParagraphIndex: previousEntry.paragraphIndex,
        historyIndex: prevState.historyIndex - 1,
      }));
    }
  }, [navigationState]);

  const navigateForward = useCallback(() => {
    if (navigationState.historyIndex < navigationState.history.length - 1) {
      const nextEntry = navigationState.history[navigationState.historyIndex + 1];
      setNavigationState(prevState => ({
        ...prevState,
        currentSectionIndex: nextEntry.sectionIndex,
        currentParagraphIndex: nextEntry.paragraphIndex,
        historyIndex: prevState.historyIndex + 1,
      }));
    }
  }, [navigationState]);

  const getCurrentSection = useCallback(() => {
    if (!currentDocument) return null;
    return currentDocument.sections[navigationState.currentSectionIndex] || null;
  }, [currentDocument, navigationState.currentSectionIndex]);

  const getCurrentParagraph = useCallback(() => {
    const currentSection = getCurrentSection();
    if (!currentSection) return null;
    return currentSection.paragraphs[navigationState.currentParagraphIndex] || null;
  }, [getCurrentSection, navigationState.currentParagraphIndex]);

  // Create navigation service
  const navigation = useMemo(
    () => ({
      getState: () => navigationState,
      navigateTo,
      navigateToSection,
      navigateToParagraph,
      navigateToNextSection,
      navigateToPreviousSection,
      navigateToNextParagraph,
      navigateToPreviousParagraph,
      navigateBack,
      navigateForward,
      getCurrentSection,
      getCurrentParagraph,
    }),
    [
      navigationState,
      navigateTo,
      navigateToSection,
      navigateToParagraph,
      navigateToNextSection,
      navigateToPreviousSection,
      navigateToNextParagraph,
      navigateToPreviousParagraph,
      navigateBack,
      navigateForward,
      getCurrentSection,
      getCurrentParagraph,
    ]
  );

  // Selection state
  const [selections, setSelections] = useState<TextSelection[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  // Selection methods
  const getSelections = useCallback(() => selections, [selections]);

  const getSelectionById = useCallback(
    (id: string) => {
      return selections.find(selection => selection.id === id) || null;
    },
    [selections]
  );

  const createSelection = useCallback((selection: Omit<TextSelection, 'id' | 'timestamp'>) => {
    const newSelection: TextSelection = {
      id: Math.random().toString(36).substring(2, 15),
      timestamp: Date.now(),
      ...selection,
    };

    setSelections(prev => [...prev, newSelection]);
    return newSelection;
  }, []);

  const updateSelection = useCallback((id: string, updates: Partial<TextSelection>) => {
    let updatedSelection: TextSelection | null = null;

    setSelections(prev => {
      const index = prev.findIndex(selection => selection.id === id);
      if (index === -1) return prev;

      const updated = { ...prev[index], ...updates };
      updatedSelection = updated;

      const newSelections = [...prev];
      newSelections[index] = updated;
      return newSelections;
    });

    return updatedSelection;
  }, []);

  const deleteSelection = useCallback((id: string) => {
    let deleted = false;

    setSelections(prev => {
      const index = prev.findIndex(selection => selection.id === id);
      if (index === -1) return prev;

      deleted = true;
      return prev.filter(selection => selection.id !== id);
    });

    return deleted;
  }, []);

  const getHighlights = useCallback(() => highlights, [highlights]);

  const createHighlight = useCallback(
    (selection: TextSelection, type: HighlightType, color?: string) => {
      const newHighlight: Highlight = {
        ...selection,
        id: Math.random().toString(36).substring(2, 15),
        timestamp: Date.now(),
        type,
        color,
        tags: [],
      };

      setHighlights(prev => [...prev, newHighlight]);
      return newHighlight;
    },
    []
  );

  const updateHighlight = useCallback((id: string, updates: Partial<Highlight>) => {
    let updatedHighlight: Highlight | null = null;

    setHighlights(prev => {
      const index = prev.findIndex(highlight => highlight.id === id);
      if (index === -1) return prev;

      const updated = { ...prev[index], ...updates };
      updatedHighlight = updated;

      const newHighlights = [...prev];
      newHighlights[index] = updated;
      return newHighlights;
    });

    return updatedHighlight;
  }, []);

  const deleteHighlight = useCallback((id: string) => {
    let deleted = false;

    setHighlights(prev => {
      const index = prev.findIndex(highlight => highlight.id === id);
      if (index === -1) return prev;

      deleted = true;
      return prev.filter(highlight => highlight.id !== id);
    });

    return deleted;
  }, []);

  // Create selection service
  const selection = useMemo(
    () => ({
      getSelections,
      getSelectionById,
      createSelection,
      updateSelection,
      deleteSelection,
      getHighlights,
      createHighlight,
      updateHighlight,
      deleteHighlight,
    }),
    [
      getSelections,
      getSelectionById,
      createSelection,
      updateSelection,
      deleteSelection,
      getHighlights,
      createHighlight,
      updateHighlight,
      deleteHighlight,
    ]
  );

  // Settings methods
  const updateSettings = useCallback((newSettings: Partial<ReaderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Document methods
  const loadDocument = useCallback(
    async (doc: Document): Promise<void> => {
      // Apply document transformers from extensions
      const transformedDoc = extensionRegistry.applyDocumentTransformers(doc);

      // Store in cache
      documentCache.set(transformedDoc.id, transformedDoc);

      // Update current document
      setCurrentDocument(transformedDoc);

      // Reset navigation
      setNavigationState({
        document: transformedDoc,
        currentSectionIndex: 0,
        currentParagraphIndex: 0,
        history: [
          {
            documentId: transformedDoc.id,
            sectionIndex: 0,
            paragraphIndex: 0,
            timestamp: Date.now(),
          },
        ],
        historyIndex: 0,
      });

      return Promise.resolve();
    },
    [documentCache, extensionRegistry]
  );

  const getDocumentById = useCallback(
    async (id: string): Promise<Document | null> => {
      // Check cache first
      const cachedDoc = documentCache.get(id);
      if (cachedDoc) {
        return Promise.resolve(cachedDoc);
      }

      // In a real implementation, this would fetch from an API or storage
      // For now, just return null
      return Promise.resolve(null);
    },
    [documentCache]
  );

  // Theme methods
  const getTheme = useCallback((): ThemeSettings => {
    return settings.themeSettings || DEFAULT_THEME_SETTINGS;
  }, [settings]);

  // Create context value
  const contextValue: ReaderContext = useMemo(
    () => ({
      document: currentDocument,
      navigation,
      selection,
      settings,
      extensions: extensionRegistry,
      updateSettings,
      loadDocument,
      getDocumentById,
      navigateTo,
      getTheme,
    }),
    [
      currentDocument,
      navigation,
      selection,
      settings,
      extensionRegistry,
      updateSettings,
      loadDocument,
      getDocumentById,
      navigateTo,
      getTheme,
    ]
  );

  // Initialize extensions
  useEffect(() => {
    extensionRegistry.initializeAll(contextValue);

    // Cleanup extensions when unmounting
    return () => {
      extensionRegistry.cleanupAll();
    };
  }, [extensionRegistry, contextValue]);

  return <ReaderReactContext.Provider value={contextValue}>{children}</ReaderReactContext.Provider>;
};

/**
 * UB-specific reader provider component
 */
export const UBReaderProvider: React.FC<ReaderProviderComponentProps> = ({
  document,
  initialSettings,
  extensions = [],
  children,
}) => {
  // Combine default UB settings with provided settings
  const ubSettings: UBReaderSettings = {
    ...DEFAULT_UB_READER_SETTINGS,
    ...(initialSettings as Partial<UBReaderSettings>),
  };

  return (
    <ReaderProvider
      document={document as UBDocument}
      initialSettings={ubSettings}
      extensions={extensions}
      contentType={ContentType.STANDARD}
      children={children}
    />
  );
};

/**
 * Hook to use the reader context
 */
export function useReader(): ReaderContext {
  const context = useContext(ReaderReactContext);
  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }
  return context;
}

/**
 * Hook to use the navigation service
 */
export function useNavigation() {
  const { navigation } = useReader();
  return navigation;
}

/**
 * Hook to use the selection service
 */
export function useSelection() {
  const { selection } = useReader();
  return selection;
}

/**
 * Hook to use the reader settings
 */
export function useReaderSettings() {
  const { settings, updateSettings } = useReader();
  return { settings, updateSettings };
}

/**
 * Hook to use the theme settings
 */
export function useTheme() {
  const { settings, updateSettings } = useReaderSettings();
  const theme = settings.themeSettings || DEFAULT_THEME_SETTINGS;

  const setTheme = useCallback(
    (newTheme: Partial<ThemeSettings>) => {
      updateSettings({
        themeSettings: { ...theme, ...newTheme },
      });
    },
    [theme, updateSettings]
  );

  const setThemeType = useCallback(
    (type: ThemeType) => {
      setTheme({ type });
    },
    [setTheme]
  );

  return { theme, setTheme, setThemeType };
}

/**
 * Hook to use the document
 */
export function useDocument() {
  const { document, loadDocument, getDocumentById } = useReader();
  return { document, loadDocument, getDocumentById };
}

/**
 * Hook to use the extensions
 */
export function useExtensions() {
  const { extensions } = useReader();
  return extensions;
}

/**
 * Hook to use a specific extension
 */
export function useExtension(id: string) {
  const extensions = useExtensions();
  const extension = extensions.getExtension(id);
  return extension;
}

/**
 * Hook to use content type extensions
 */
export function useContentTypeExtensions() {
  const extensions = useExtensions();
  const contentTypeExtensions = extensions.getExtensionsByType(ExtensionType.CONTENT_TYPE);
  return contentTypeExtensions;
}
