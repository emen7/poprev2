/**
 * Reader Navigation Component
 *
 * This component displays navigation elements like table of contents,
 * breadcrumbs, and relationship map.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Document, ReaderConfig, Section } from '../models';
import './ReaderNavigation.css';

/**
 * Props for the ReaderNavigation component
 */
export interface ReaderNavigationProps {
  /**
   * The document to display
   */
  document: Document;

  /**
   * Reader configuration
   */
  config: ReaderConfig;

  /**
   * Currently active section ID
   */
  activeSection: string | null;

  /**
   * Callback when a section is selected
   */
  onSectionSelect: (sectionId: string) => void;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Callback when the navigation panel is opened
   */
  onNavigationOpen?: () => void;

  /**
   * Callback when the navigation panel is closed
   */
  onNavigationClose?: () => void;

  /**
   * Whether the navigation panel is initially open
   */
  initiallyOpen?: boolean;

  /**
   * Whether to close the navigation panel when a section is selected (mobile)
   */
  closeOnSelect?: boolean;
}

/**
 * Part data structure for navigation
 */
interface Part {
  id: string;
  title: string;
  papers: Paper[];
}

/**
 * Paper data structure for navigation
 */
interface Paper {
  id: string;
  title: string;
  sections: Section[];
}

/**
 * The ReaderNavigation component
 */
export function ReaderNavigation({
  document,
  config,
  activeSection,
  onSectionSelect,
  className = '',
  onNavigationOpen,
  onNavigationClose,
  initiallyOpen = false,
  closeOnSelect = true,
}: ReaderNavigationProps) {
  // State for navigation panel
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [activePart, setActivePart] = useState<string | null>(null);
  const [expandedParts, setExpandedParts] = useState<string[]>([]);

  // Ref for navigation panel
  const navPanelRef = useRef<HTMLDivElement>(null);

  // Mock data for parts and papers (in a real implementation, this would come from the API)
  const parts: Part[] = [
    {
      id: 'part1',
      title: 'PART I. THE CENTRAL AND SUPERUNIVERSES',
      papers: [
        {
          id: 'paper1',
          title: 'Paper 1: The Universal Father',
          sections: document.sections, // Use the current document's sections for demo
        },
        {
          id: 'paper2',
          title: 'Paper 2: The Nature of God',
          sections: [],
        },
      ],
    },
    {
      id: 'part2',
      title: 'PART II. THE LOCAL UNIVERSE',
      papers: [
        {
          id: 'paper32',
          title: 'Paper 32: The Evolution of Local Universes',
          sections: [],
        },
        {
          id: 'paper33',
          title: 'Paper 33: Administration of the Local Universe',
          sections: [],
        },
      ],
    },
    {
      id: 'part3',
      title: 'PART III. THE HISTORY OF URANTIA',
      papers: [
        {
          id: 'paper57',
          title: 'Paper 57: The Origin of Urantia',
          sections: [],
        },
        {
          id: 'paper58',
          title: 'Paper 58: Life Establishment on Urantia',
          sections: [],
        },
      ],
    },
    {
      id: 'part4',
      title: 'PART IV. THE LIFE AND TEACHINGS OF JESUS',
      papers: [
        {
          id: 'paper120',
          title: 'Paper 120: The Bestowal of Michael on Urantia',
          sections: [],
        },
        {
          id: 'paper121',
          title: "Paper 121: The Times of Michael's Bestowal",
          sections: [],
        },
      ],
    },
  ];

  // Set the active part based on the current document
  useEffect(() => {
    // In a real implementation, we would determine the active part based on the document
    // For now, we'll just set the first part as active
    setActivePart('part1');
    setExpandedParts(['part1']);
  }, [document]);

  // Toggle navigation panel
  const toggleNavigation = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      onNavigationOpen?.();
    } else {
      onNavigationClose?.();
    }
  };

  // Toggle part expansion
  const togglePart = (partId: string) => {
    if (expandedParts.includes(partId)) {
      setExpandedParts(expandedParts.filter(id => id !== partId));
    } else {
      setExpandedParts([...expandedParts, partId]);
      setActivePart(partId);
    }
  };

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    onSectionSelect(sectionId);

    if (closeOnSelect && window.innerWidth < 768) {
      setIsOpen(false);
      onNavigationClose?.();
    }
  };

  // Close navigation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navPanelRef.current && !navPanelRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
        onNavigationClose?.();
      }
    };

    window.document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onNavigationClose]);

  // Get extension components
  const extensionTocComponents = config.extensions
    .map(extensionId => {
      // This would be implemented to get custom TOC components from extensions
      // For now, we'll return null
      return null;
    })
    .filter(Boolean);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="reader-header-button reader-nav-toggle"
        onClick={toggleNavigation}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Navigation Panel */}
      <div
        ref={navPanelRef}
        className={`reader-navigation-menu ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        {/* Active Part Container */}
        <div className="reader-nav-fixed-top">
          {parts
            .filter(part => part.id === activePart)
            .map(part => (
              <div key={part.id}>
                <button
                  className={`reader-part-toggle ${expandedParts.includes(part.id) ? 'expanded' : ''}`}
                  onClick={() => togglePart(part.id)}
                  aria-expanded={expandedParts.includes(part.id)}
                >
                  {part.title}
                  <i className="fas fa-chevron-down"></i>
                </button>

                {expandedParts.includes(part.id) && (
                  <div className="reader-part-content">
                    <ul className="reader-nav-list">
                      {part.papers.map(paper => (
                        <li key={paper.id} className="reader-nav-item">
                          <a
                            href={`#${paper.id}`}
                            className={`reader-nav-link ${paper.id === document.id ? 'active' : ''}`}
                          >
                            {paper.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Scrollable Papers Container */}
        <div className="reader-nav-scrollable">
          {/* This would contain additional papers or content */}
        </div>

        {/* Inactive Parts Container */}
        <div className="reader-nav-fixed-bottom">
          {parts
            .filter(part => part.id !== activePart)
            .map(part => (
              <div key={part.id}>
                <button
                  className={`reader-part-toggle ${expandedParts.includes(part.id) ? 'expanded' : ''}`}
                  onClick={() => togglePart(part.id)}
                  aria-expanded={expandedParts.includes(part.id)}
                >
                  {part.title}
                  <i className="fas fa-chevron-down"></i>
                </button>

                {expandedParts.includes(part.id) && (
                  <div className="reader-part-content">
                    <ul className="reader-nav-list">
                      {part.papers.map(paper => (
                        <li key={paper.id} className="reader-nav-item">
                          <a
                            href={`#${paper.id}`}
                            className={`reader-nav-link ${paper.id === document.id ? 'active' : ''}`}
                          >
                            {paper.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`reader-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setIsOpen(false);
          onNavigationClose?.();
        }}
      ></div>

      {/* Main Navigation Content */}
      <div className={`reader-navigation ${className}`}>
        {/* Breadcrumbs */}
        {config.navigation.showBreadcrumbs && (
          <div className="reader-breadcrumbs">
            <span className="reader-breadcrumb-item">Home</span>
            <span className="reader-breadcrumb-separator">/</span>
            <span className="reader-breadcrumb-item">{document.title}</span>
            {activeSection && (
              <>
                <span className="reader-breadcrumb-separator">/</span>
                <span className="reader-breadcrumb-item">
                  {findSectionTitle(document, activeSection)}
                </span>
              </>
            )}
          </div>
        )}

        {/* Table of Contents */}
        {config.navigation.showTableOfContents && (
          <div className="reader-toc">
            <h3 className="reader-toc-title">Table of Contents</h3>
            <ul className="reader-toc-list">
              {document.sections.map(section => (
                <TableOfContentsItem
                  key={section.id}
                  section={section}
                  activeSection={activeSection}
                  onSectionSelect={handleSectionSelect}
                  level={1}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Relationship Map */}
        {config.navigation.showRelationshipMap && document.relationships.length > 0 && (
          <div className="reader-relationship-map">
            <h3 className="reader-relationship-map-title">Related Documents</h3>
            <ul className="reader-relationship-list">
              {document.relationships.map((relationship, index) => (
                <li key={index} className="reader-relationship-item">
                  <span className="reader-relationship-type">{relationship.type}</span>
                  <span className="reader-relationship-target">
                    {relationship.targetDocumentId}
                  </span>
                  {relationship.description && (
                    <span className="reader-relationship-description">
                      {relationship.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Props for the TableOfContentsItem component
 */
interface TableOfContentsItemProps {
  /**
   * The section to display
   */
  section: Section;

  /**
   * Currently active section ID
   */
  activeSection: string | null;

  /**
   * Callback when a section is selected
   */
  onSectionSelect: (sectionId: string) => void;

  /**
   * Nesting level
   */
  level: number;
}

/**
 * Component for rendering a table of contents item
 */
function TableOfContentsItem({
  section,
  activeSection,
  onSectionSelect,
  level,
}: TableOfContentsItemProps) {
  const isActive = activeSection === section.id;
  const hasSubsections = section.subsections && section.subsections.length > 0;

  return (
    <li className={`reader-toc-item reader-toc-level-${level} ${isActive ? 'active' : ''}`}>
      <a
        href={`#${section.id}`}
        className="reader-toc-link"
        onClick={e => {
          e.preventDefault();
          onSectionSelect(section.id);
        }}
      >
        {section.title}
      </a>

      {hasSubsections && (
        <ul className="reader-toc-sublist">
          {section.subsections!.map(subsection => (
            <TableOfContentsItem
              key={subsection.id}
              section={subsection}
              activeSection={activeSection}
              onSectionSelect={onSectionSelect}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Find the title of a section by its ID
 *
 * @param document The document to search
 * @param sectionId The ID of the section to find
 * @returns The title of the section, or undefined if not found
 */
function findSectionTitle(document: Document, sectionId: string): string | undefined {
  // Search in top-level sections
  for (const section of document.sections) {
    if (section.id === sectionId) {
      return section.title;
    }

    // Search in subsections
    if (section.subsections) {
      const subsectionTitle = findSubsectionTitle(section.subsections, sectionId);
      if (subsectionTitle) {
        return subsectionTitle;
      }
    }
  }

  return undefined;
}

/**
 * Find the title of a subsection by its ID
 *
 * @param subsections The subsections to search
 * @param sectionId The ID of the section to find
 * @returns The title of the section, or undefined if not found
 */
function findSubsectionTitle(subsections: Section[], sectionId: string): string | undefined {
  for (const subsection of subsections) {
    if (subsection.id === sectionId) {
      return subsection.title;
    }

    // Search in nested subsections
    if (subsection.subsections) {
      const nestedTitle = findSubsectionTitle(subsection.subsections, sectionId);
      if (nestedTitle) {
        return nestedTitle;
      }
    }
  }

  return undefined;
}
