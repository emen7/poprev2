/**
 * Highlight Renderer Component
 *
 * This component renders highlights in the document by applying
 * highlight styles to the selected text ranges.
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { Highlight } from '../models';
import { findNodeByXPath, applyHighlightToDOM } from '../utils';

interface HighlightRendererProps {
  /**
   * Array of highlights to render
   */
  highlights: Highlight[];

  /**
   * Callback function called when a highlight is clicked
   */
  onHighlightClick: (id: string) => void;

  /**
   * Container element to apply highlights to
   */
  containerRef: React.RefObject<HTMLElement>;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * HighlightRenderer Component
 */
export function HighlightRenderer({
  highlights,
  onHighlightClick,
  containerRef,
  className = '',
}: HighlightRendererProps) {
  // Reference to track applied highlights
  const appliedHighlightsRef = useRef<Set<string>>(new Set());

  // Apply highlights to the document
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const appliedHighlights = appliedHighlightsRef.current;

    // Process each highlight
    highlights.forEach(highlight => {
      // Skip if already applied
      if (appliedHighlights.has(highlight.id)) return;

      try {
        // Apply the highlight to the DOM
        const highlightElement = applyHighlightToDOM(highlight, container, onHighlightClick);

        if (highlightElement) {
          // Mark as applied
          appliedHighlights.add(highlight.id);
        }
      } catch (error) {
        console.error(`Error applying highlight ${highlight.id}:`, error);
      }
    });

    // Clean up function
    return () => {
      // Remove highlights when component unmounts
      // This is a simplified approach; a more robust solution would track
      // and remove specific highlight elements
      const highlightElements = container.querySelectorAll('.highlighted-text');
      highlightElements.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          // Replace the highlight element with its text content
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          // Normalize to merge adjacent text nodes
          parent.normalize();
        }
      });
    };
  }, [highlights, containerRef, onHighlightClick]);

  // This component doesn't render anything directly
  return null;
}

export default HighlightRenderer;
