/**
 * UBReferenceLink Component
 *
 * This component renders a link to a UB reference with proper formatting and URL generation.
 * 
 * @module ui/ub-reference-link
 */

import React from 'react';
import './UBReferenceLink.css';

/**
 * Types of UB references
 * 
 * @typedef {('paper-section'|'paper-section-paragraph'|'paper'|'section')} UBReferenceType
 * @description Defines the type of reference to the Urantia Book
 */
export type UBReferenceType = 'paper-section' | 'paper-section-paragraph' | 'paper' | 'section';

/**
 * Represents a reference to the Urantia Book
 * 
 * @interface UBReference
 * @description A reference to a specific location in the Urantia Book
 * @property {UBReferenceType} type - The type of reference
 * @property {number} paper - The paper number
 * @property {number} [section] - The section number (optional for paper-only references)
 * @property {number} [paragraph] - The paragraph number (optional for paper-section references)
 * @property {string} originalText - The original text of the reference
 * @property {Object} [position] - The position of the reference in the source text
 * @property {number} position.start - The start index of the reference
 * @property {number} position.end - The end index of the reference
 */
export interface UBReference {
  type: UBReferenceType;
  paper: number;
  section?: number;
  paragraph?: number;
  originalText: string;
  position?: {
    start: number;
    end: number;
  };
}

/**
 * Props for the UBReferenceLink component
 * 
 * @interface UBReferenceLinkProps
 * @description Props for the UB reference link component
 * @property {UBReference} reference - The UB reference to link to
 * @property {string} [baseUrl='/reader'] - The base URL for the UB Reader
 * @property {string} [className] - Additional CSS class name to apply to the component
 * @property {React.ReactNode} [children] - Optional children to render instead of the reference text
 * @property {(reference: UBReference, event: React.MouseEvent) => void} [onClick] - Optional click handler
 */
export interface UBReferenceLinkProps {
  /**
   * The UB reference to link to
   */
  reference: UBReference;
  
  /**
   * The base URL for the UB Reader
   * @default '/reader'
   */
  baseUrl?: string;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Optional children to render instead of the reference text
   */
  children?: React.ReactNode;
  
  /**
   * Optional click handler
   */
  onClick?: (reference: UBReference, event: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Generate a URL for a UB reference
 *
 * @param {UBReference} reference - The UB reference
 * @param {string} [baseUrl='/reader'] - The base URL for the UB Reader
 * @returns {string} A URL to the referenced content in the UB Reader
 */
export function generateUBReferenceUrl(reference: UBReference, baseUrl: string = '/reader'): string {
  switch (reference.type) {
    case 'paper':
      return `${baseUrl}/paper/${reference.paper}`;

    case 'paper-section':
      return `${baseUrl}/paper/${reference.paper}#section-${reference.section}`;

    case 'paper-section-paragraph':
      return `${baseUrl}/paper/${reference.paper}#p-${reference.section}-${reference.paragraph}`;

    case 'section':
      // This should not happen after applying context, but just in case
      return `#section-${reference.section}`;

    default:
      return '#';
  }
}

/**
 * UBReferenceLink Component
 * 
 * @description A component that renders a link to a UB reference with proper formatting and URL generation.
 * It supports different reference types (paper, section, paragraph) and allows for custom styling.
 * 
 * @example
 * ```tsx
 * <UBReferenceLink 
 *   reference={{ 
 *     type: 'paper-section', 
 *     paper: 1, 
 *     section: 2, 
 *     originalText: '1:2' 
 *   }} 
 *   baseUrl="/reader" 
 *   className="custom-link" 
 * />
 * ```
 */
export const UBReferenceLink: React.FC<UBReferenceLinkProps> = ({
  reference,
  baseUrl = '/reader',
  className = '',
  children,
  onClick,
}) => {
  // Generate the URL for the reference
  const url = generateUBReferenceUrl(reference, baseUrl);
  
  // Combine CSS classes
  const linkClasses = ['ub-reference', className].filter(Boolean).join(' ');
  
  // Handle click event
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(reference, event);
      event.preventDefault();
    }
  };

  return (
    <a 
      href={url} 
      className={linkClasses}
      data-reference-type={reference.type}
      data-reference-paper={reference.paper}
      data-reference-section={reference.section}
      data-reference-paragraph={reference.paragraph}
      onClick={handleClick}
    >
      {children || reference.originalText}
    </a>
  );
};

export default UBReferenceLink;
