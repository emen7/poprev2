import React, { useEffect, useState } from 'react';
import { ParagraphContainer } from './ParagraphContainer';
import { Paragraph } from './ParagraphRenderer';
import './UBContentRenderer.css';

// Import types from state-management package
// Note: In a real implementation, these would be imported from the state-management package
// For now, we'll define them here for demonstration purposes
interface UBParagraph {
  id: string;
  paperId: string;
  sectionId: string;
  paragraphId: string;
  text: string;
  htmlText: string | null;
  hasNotes?: boolean;
  standardReferenceId: string;
}

export interface UBContentRendererProps {
  /**
   * Paper ID to render
   */
  paperId: string;

  /**
   * Section ID to render (optional)
   * If not provided, all sections of the paper will be rendered
   */
  sectionId?: string;

  /**
   * The formatting type to use
   */
  formatType: 'traditional' | 'modern';

  /**
   * Whether to show paragraph numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Whether to use the vertical numbering column
   * @default true
   */
  useVerticalNumbering?: boolean;

  /**
   * ID of the currently highlighted paragraph
   */
  highlightedParagraphId?: string;

  /**
   * Function called when a paragraph is clicked
   */
  onParagraphClick?: (paragraphId: string, event: React.MouseEvent) => void;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * UBContentRenderer Component
 *
 * A component that renders UB content with paragraph numbering.
 */
export const UBContentRenderer: React.FC<UBContentRendererProps> = ({
  paperId,
  sectionId,
  formatType,
  showNumbers = true,
  useVerticalNumbering = true,
  highlightedParagraphId,
  onParagraphClick,
  className = '',
}) => {
  // State for paragraphs
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);
  // State for loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for error
  const [error, setError] = useState<Error | null>(null);

  // Load UB content
  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real implementation, this would use the UBContentService
        // For now, we'll simulate loading content with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate fetching UB content
        const mockUBParagraphs: UBParagraph[] = Array.from({ length: 20 }, (_, i) => ({
          id: `p${i + 1}`,
          paperId,
          sectionId: sectionId || '1',
          paragraphId: `${i + 1}`,
          text: `This is paragraph ${i + 1} of paper ${paperId}${
            sectionId ? `, section ${sectionId}` : ''
          }. It demonstrates the UB content rendering with paragraph numbering.`,
          htmlText: `<span>This is paragraph ${i + 1} of paper ${paperId}${
            sectionId ? `, section ${sectionId}` : ''
          }. It demonstrates the UB content rendering with paragraph numbering.</span>`,
          hasNotes: i % 3 === 0, // Every third paragraph has notes
          standardReferenceId: `${paperId}:${sectionId || '1'}.${i + 1}`,
        }));

        // Convert UB paragraphs to Paragraph format
        const formattedParagraphs: Paragraph[] = mockUBParagraphs.map(ubParagraph => ({
          id: ubParagraph.id,
          number: parseInt(ubParagraph.paragraphId, 10),
          text: ubParagraph.htmlText || ubParagraph.text,
          hasNotes: ubParagraph.hasNotes,
          metadata: {
            isIndented: parseInt(ubParagraph.paragraphId, 10) % 5 === 0, // Every fifth paragraph is indented
            isList: parseInt(ubParagraph.paragraphId, 10) % 7 === 0, // Every seventh paragraph is a list item
            listType: parseInt(ubParagraph.paragraphId, 10) % 14 === 0 ? 'bulleted' : 'numbered', // Alternate list types
            isTopicChange: parseInt(ubParagraph.paragraphId, 10) % 10 === 0, // Every tenth paragraph marks a topic change
          },
        }));

        setParagraphs(formattedParagraphs);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load UB content'));
        setIsLoading(false);
      }
    };

    loadContent();
  }, [paperId, sectionId]);

  // Determine container classes
  const containerClasses = [
    'ub-content-renderer',
    isLoading ? 'ub-content-renderer-loading' : '',
    error ? 'ub-content-renderer-error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render loading state
  if (isLoading) {
    return (
      <div className={containerClasses}>
        <div className="ub-content-renderer-loading-indicator">
          <span>Loading UB content...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={containerClasses}>
        <div className="ub-content-renderer-error-message">
          <h3>Error loading UB content</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  // Render content
  return (
    <div className={containerClasses}>
      <ParagraphContainer
        paragraphs={paragraphs}
        formatType={formatType}
        showNumbers={showNumbers}
        useVerticalNumbering={useVerticalNumbering}
        highlightedParagraphId={highlightedParagraphId}
        onParagraphClick={onParagraphClick}
      />
    </div>
  );
};

export default UBContentRenderer;
