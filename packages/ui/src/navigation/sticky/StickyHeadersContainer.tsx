import React, { useEffect, useRef, useState } from 'react';
import './StickyHeadersContainer.css';

export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Display title for the section
   */
  title: string;
}

export interface StickyHeadersContainerProps {
  /**
   * Paper title to display at the top
   */
  paperTitle: React.ReactNode;

  /**
   * Array of sections in the document
   */
  sections: Section[];

  /**
   * ID of the currently active section
   */
  currentSectionId?: string;

  /**
   * Function called when the active section changes
   */
  onSectionChange?: (sectionId: string) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * StickyHeadersContainer Component
 *
 * A component that provides sticky paper title and section headers that update as the user scrolls.
 * - Paper title remains fixed at the top of the viewport
 * - Current section title sticks below the paper title
 * - Section titles update automatically as the user scrolls through the document
 */
export function StickyHeadersContainer({
  paperTitle,
  sections,
  currentSectionId,
  onSectionChange,
  className = '',
}: StickyHeadersContainerProps) {
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(currentSectionId);
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Set up intersection observer for section headers
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        // Sort entries by their position in the document (top to bottom)
        const sortedEntries = [...entries].sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.top - rectB.top;
        });

        // Find the first entry that is intersecting or about to intersect
        for (const entry of sortedEntries) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId && entry.isIntersecting) {
            if (activeSectionId !== sectionId) {
              setActiveSectionId(sectionId);
              if (onSectionChange) {
                onSectionChange(sectionId);
              }
            }
            break;
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-56px 0px 0px 0px', // Adjust based on paper title height
      }
    );

    // Observe all section headers
    const sectionElements = sectionRefs.current;
    sections.forEach(section => {
      const element = sectionElements.get(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, onSectionChange, activeSectionId]);

  // Handle scroll events for paper title shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the active section data
  const activeSection = sections.find(section => section.id === activeSectionId);

  return (
    <div className={`sticky-headers-container ${className}`}>
      {/* Sticky paper title */}
      <div className={`sticky-paper-title ${isScrolled ? 'scrolled' : ''}`}>{paperTitle}</div>

      {/* Sticky section header */}
      {activeSection && <div className="sticky-section-header">{activeSection.title}</div>}

      {/* Actual section headers in content (these will be observed) */}
      <div className="section-headers">
        {sections.map(section => (
          <div
            key={section.id}
            ref={el => {
              if (el) sectionRefs.current.set(section.id, el);
            }}
            data-section-id={section.id}
            className="section-header"
          >
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickyHeadersContainer;
