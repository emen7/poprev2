import { useState, useEffect, useCallback } from 'react';

import { ubContentService } from '../services/UBContentService';
import {
  StructuredUBContent,
  StructuredUBPart,
  StructuredUBPaper,
  StructuredUBSection,
  UBParagraph,
  UBContentMetadata,
  UBContentItem,
} from '../types/ub-content.types';

/**
 * Hook for accessing and interacting with UB content
 * @returns Object with UB content and methods to interact with it
 */
export function useUBContent() {
  const [content, setContent] = useState<StructuredUBContent | null>(ubContentService.getContent());
  const [metadata, setMetadata] = useState<UBContentMetadata | null>(
    ubContentService.getMetadata()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Load the UB content
   */
  const loadContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const loadedContent = await ubContentService.loadContent();

      setContent(loadedContent);
      setMetadata(ubContentService.getMetadata());
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load UB content'));
      setIsLoading(false);
    }
  }, []);

  /**
   * Get a UB part by ID
   * @param partId Part ID
   * @returns Structured UB part or null if not found
   */
  const getPart = useCallback((partId: string): StructuredUBPart | null => {
    return ubContentService.getPart(partId);
  }, []);

  /**
   * Get a UB paper by ID
   * @param paperId Paper ID
   * @returns Structured UB paper or null if not found
   */
  const getPaper = useCallback((paperId: string): StructuredUBPaper | null => {
    return ubContentService.getPaper(paperId);
  }, []);

  /**
   * Get a UB section by paper ID and section ID
   * @param paperId Paper ID
   * @param sectionId Section ID
   * @returns Structured UB section or null if not found
   */
  const getSection = useCallback(
    (paperId: string, sectionId: string): StructuredUBSection | null => {
      return ubContentService.getSection(paperId, sectionId);
    },
    []
  );

  /**
   * Get a UB paragraph by paper ID, section ID, and paragraph ID
   * @param paperId Paper ID
   * @param sectionId Section ID
   * @param paragraphId Paragraph ID
   * @returns UB paragraph or null if not found
   */
  const getParagraph = useCallback(
    (paperId: string, sectionId: string, paragraphId: string): UBParagraph | null => {
      return ubContentService.getParagraph(paperId, sectionId, paragraphId);
    },
    []
  );

  /**
   * Get a UB paragraph by reference
   * @param reference UB reference (e.g., "1:1.2")
   * @returns UB paragraph or null if not found
   */
  const getParagraphByReference = useCallback((reference: string): UBParagraph | null => {
    return ubContentService.getParagraphByReference(reference);
  }, []);

  /**
   * Search for UB content
   * @param query Search query
   * @returns Array of UB content items that match the query
   */
  const search = useCallback((query: string): UBContentItem[] => {
    return ubContentService.search(query);
  }, []);

  // Load content on mount if not already loaded
  useEffect(() => {
    if (!content) {
      loadContent();
    }
  }, [content, loadContent]);

  return {
    content,
    metadata,
    isLoading,
    error,
    loadContent,
    getPart,
    getPaper,
    getSection,
    getParagraph,
    getParagraphByReference,
    search,
  };
}
