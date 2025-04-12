'use client';

import React, { useState } from 'react';

import {
  parseUBReferences,
  applyReferenceContext,
  generateUBReferenceUrl,
  isValidReference,
  UBReference,
} from './ReferenceUtils';
import './ReferenceProcessor.css';

interface ReferenceProcessorProps {
  /**
   * The content to process for references
   */
  content: string;

  /**
   * The current paper number for context (optional)
   */
  currentPaper?: number;

  /**
   * The base URL for reference links (optional)
   */
  baseUrl?: string;

  /**
   * Whether to show tooltips on hover (optional)
   */
  showTooltips?: boolean;

  /**
   * Maximum number of papers (optional)
   */
  maxPapers?: number;

  /**
   * Map of maximum sections per paper (optional)
   */
  maxSections?: Record<number, number>;

  /**
   * Custom class name for reference links (optional)
   */
  linkClassName?: string;

  /**
   * Callback when a reference is clicked (optional)
   */
  onReferenceClick?: (reference: UBReference, event: React.MouseEvent) => void;
}

/**
 * ReferenceProcessor Component
 *
 * This component processes text content and converts references to interactive links.
 */
export function ReferenceProcessor({
  content,
  currentPaper = 0,
  baseUrl = '/paper',
  showTooltips = true,
  maxPapers = 196,
  maxSections,
  linkClassName = 'ub-reference',
  onReferenceClick,
}: ReferenceProcessorProps) {
  // State for the currently hovered reference
  const [hoveredReference, setHoveredReference] = useState<UBReference | null>(null);
  // State for the tooltip position
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Process the content to find references
  const processContent = () => {
    // Parse references from the content
    let references = parseUBReferences(content);

    // Apply context if we have a current paper
    if (currentPaper > 0) {
      references = applyReferenceContext(references, currentPaper);
    }

    // Sort references by position in reverse order to avoid offset issues
    references.sort((a, b) => b.position.start - a.position.start);

    let processedContent = content;

    // Replace references with links
    for (const ref of references) {
      const isValid = isValidReference(ref, maxPapers, maxSections);
      const url = isValid ? generateUBReferenceUrl(ref, baseUrl) : '#';

      // Create a unique ID for this reference
      const refId = `ref-${ref.type}-${ref.paper}${ref.section ? `-${ref.section}` : ''}${
        ref.paragraph ? `-${ref.paragraph}` : ''
      }`;

      // Create the link element
      const link = `<a 
        href="${url}" 
        class="${linkClassName} ${isValid ? 'valid-reference' : 'invalid-reference'}" 
        data-reference-type="${ref.type}"
        data-reference-paper="${ref.paper}"
        ${ref.section !== undefined ? `data-reference-section="${ref.section}"` : ''}
        ${ref.paragraph !== undefined ? `data-reference-paragraph="${ref.paragraph}"` : ''}
        id="${refId}"
      >${ref.originalText}</a>`;

      // Replace the reference in the content
      processedContent =
        processedContent.substring(0, ref.position.start) +
        link +
        processedContent.substring(ref.position.end);
    }

    return processedContent;
  };

  // Handle reference hover
  const handleReferenceHover = (event: React.MouseEvent) => {
    if (!showTooltips) return;

    const target = event.target as HTMLElement;
    if (!target.classList.contains(linkClassName)) return;

    // Extract reference data from data attributes
    const type = target.getAttribute('data-reference-type') as UBReference['type'];
    const paper = parseInt(target.getAttribute('data-reference-paper') || '0', 10);
    const section = target.hasAttribute('data-reference-section')
      ? parseInt(target.getAttribute('data-reference-section') || '0', 10)
      : undefined;
    const paragraph = target.hasAttribute('data-reference-paragraph')
      ? parseInt(target.getAttribute('data-reference-paragraph') || '0', 10)
      : undefined;

    // Create reference object
    const reference: UBReference = {
      type,
      paper,
      section,
      paragraph,
      originalText: target.textContent || '',
      position: { start: 0, end: 0 }, // Not needed for hover
    };

    // Set hovered reference
    setHoveredReference(reference);

    // Set tooltip position
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Handle reference hover end
  const handleReferenceHoverEnd = () => {
    setHoveredReference(null);
  };

  // Handle reference click
  const handleReferenceClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains(linkClassName)) return;

    // Extract reference data from data attributes
    const type = target.getAttribute('data-reference-type') as UBReference['type'];
    const paper = parseInt(target.getAttribute('data-reference-paper') || '0', 10);
    const section = target.hasAttribute('data-reference-section')
      ? parseInt(target.getAttribute('data-reference-section') || '0', 10)
      : undefined;
    const paragraph = target.hasAttribute('data-reference-paragraph')
      ? parseInt(target.getAttribute('data-reference-paragraph') || '0', 10)
      : undefined;

    // Create reference object
    const reference: UBReference = {
      type,
      paper,
      section,
      paragraph,
      originalText: target.textContent || '',
      position: { start: 0, end: 0 }, // Not needed for click
    };

    // Call the onReferenceClick callback if provided
    if (onReferenceClick) {
      onReferenceClick(reference, event);

      // Prevent default if callback is provided
      event.preventDefault();
    }
  };

  // Format the tooltip content
  const formatTooltipContent = (reference: UBReference) => {
    let content = '';

    switch (reference.type) {
      case 'paper':
        content = `Paper ${reference.paper}`;
        break;
      case 'paper-section':
        content = `Paper ${reference.paper}, Section ${reference.section}`;
        break;
      case 'paper-section-paragraph':
        content = `Paper ${reference.paper}, Section ${reference.section}, Paragraph ${reference.paragraph}`;
        break;
      case 'section':
        content = `Section ${reference.section}`;
        break;
    }

    return content;
  };

  return (
    <div
      className="reference-processor"
      onMouseOver={handleReferenceHover}
      onMouseOut={handleReferenceHoverEnd}
      onClick={handleReferenceClick}
      dangerouslySetInnerHTML={{ __html: processContent() }}
    >
      {/* Tooltip */}
      {showTooltips && hoveredReference && (
        <div
          className="reference-tooltip"
          style={{
            top: `${tooltipPosition.y + 20}px`,
            left: `${tooltipPosition.x + 10}px`,
          }}
        >
          {formatTooltipContent(hoveredReference)}
        </div>
      )}
    </div>
  );
}

export default ReferenceProcessor;
