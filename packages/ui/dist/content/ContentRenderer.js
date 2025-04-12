import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useRef } from 'react';
import { SectionRenderer } from './SectionRenderer';
import './ContentRenderer.css';
/**
 * ContentRenderer Component
 *
 * A component that renders document content with support for:
 * - Traditional and Modern formatting
 * - Paragraph numbering
 * - Section and paragraph highlighting
 * - Visibility tracking
 */
export function ContentRenderer({
  content,
  formatType,
  showParagraphNumbers = true,
  highlightedSections = [],
  highlightedParagraphs = [],
  onSectionVisible,
  onParagraphVisible,
  className = '',
}) {
  const contentRef = useRef(null);
  // Set up intersection observer for tracking visible sections
  useEffect(() => {
    if (!contentRef.current || !onSectionVisible) return;
    const options = {
      root: null,
      rootMargin: '-100px 0px -100px 0px',
      threshold: [0.1, 0.5, 0.9],
    };
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            onSectionVisible(sectionId);
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    // Observe all section elements
    const sectionElements = contentRef.current.querySelectorAll('[data-section-id]');
    sectionElements.forEach(element => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [content, onSectionVisible]);
  // Set up intersection observer for tracking visible paragraphs
  useEffect(() => {
    if (!contentRef.current || !onParagraphVisible) return;
    const options = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: [0.1, 0.5],
    };
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const paragraphId = entry.target.getAttribute('data-paragraph-id');
          if (paragraphId) {
            onParagraphVisible(paragraphId);
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    // Observe all paragraph elements
    const paragraphElements = contentRef.current.querySelectorAll('[data-paragraph-id]');
    paragraphElements.forEach(element => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [content, onParagraphVisible]);
  const contentClasses = [
    'content-renderer',
    `content-format-${formatType}`,
    showParagraphNumbers ? 'content-show-numbers' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return _jsxs('div', {
    className: contentClasses,
    ref: contentRef,
    children: [
      _jsx('h1', { className: 'content-title', children: content.title }),
      content.sections.map(section =>
        _jsx(
          SectionRenderer,
          {
            section: section,
            formatType: formatType,
            showParagraphNumbers: showParagraphNumbers,
            isHighlighted: highlightedSections.includes(section.id),
            highlightedParagraphs: highlightedParagraphs,
            onVisible: onSectionVisible,
            onParagraphVisible: onParagraphVisible,
            onParagraphClick: (paragraphId, event) => {
              // Handle paragraph click if needed
              console.log(`Paragraph clicked: ${paragraphId}`);
            },
          },
          section.id
        )
      ),
    ],
  });
}
export default ContentRenderer;
//# sourceMappingURL=ContentRenderer.js.map
