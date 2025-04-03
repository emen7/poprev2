/**
 * Text Selection Handler Component
 *
 * This component detects and handles text selection events within its children.
 * It provides the selected text, range, and context information to the parent component.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TextSelection } from '../models';

interface TextSelectionHandlerProps {
  /**
   * Callback function called when text is selected
   */
  onSelection: (selection: TextSelection | null) => void;

  /**
   * Paper number for the current document
   */
  paperNumber: number;

  /**
   * Section ID for the current section
   */
  sectionId: string;

  /**
   * Children to render within the selection handler
   */
  children: React.ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * TextSelectionHandler Component
 */
export function TextSelectionHandler({
  onSelection,
  paperNumber,
  sectionId,
  children,
  className = '',
}: TextSelectionHandlerProps) {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle selection change
  const handleSelectionChange = () => {
    const selection = window.getSelection();

    // If there's no selection or it's collapsed (cursor only), clear the selection
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      onSelection(null);
      return;
    }

    const range = selection.getRangeAt(0);

    // Check if the selection is within our container
    if (containerRef.current && containerRef.current.contains(range.commonAncestorContainer)) {
      // Get the selected text
      const text = range.toString().trim();

      // Only process non-empty selections
      if (text) {
        onSelection({
          text,
          range,
          paperNumber,
          sectionId,
        });
      } else {
        onSelection(null);
      }
    } else {
      // Selection is outside our container
      onSelection(null);
    }
  };

  // Add event listeners for selection changes
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, [paperNumber, sectionId]); // Re-add listeners if paper or section changes

  return (
    <div ref={containerRef} className={`text-selection-handler ${className}`}>
      {children}
    </div>
  );
}

export default TextSelectionHandler;
