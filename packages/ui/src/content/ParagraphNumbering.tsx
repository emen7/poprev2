import React from 'react';
import './ParagraphNumbering.css';

export interface ParagraphNumberingProps {
  /**
   * Paragraph number to display
   */
  number: number;

  /**
   * Whether the paragraph has notes
   */
  hasNotes?: boolean;

  /**
   * Whether the numbering is visible
   */
  visible?: boolean;

  /**
   * Whether to show note indicators
   * @default true
   */
  showNoteIndicators?: boolean;
}

/**
 * Component for displaying paragraph numbers in a vertical column
 */
export const ParagraphNumbering: React.FC<ParagraphNumberingProps> = ({
  number,
  hasNotes = false,
  visible = true,
  showNoteIndicators = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="paragraph-numbering">
      <div className="paragraph-note-indicator-container">
        {hasNotes && showNoteIndicators && (
          <div className="paragraph-note-indicator" title="This paragraph has notes">
            ●
          </div>
        )}
      </div>
      <div className="paragraph-number">{number}</div>
    </div>
  );
};

/**
 * Container component for paragraph numbering
 */
export interface ParagraphNumberingContainerProps {
  /**
   * Whether the numbering is visible
   */
  visible?: boolean;

  /**
   * Whether to show note indicators
   * @default true
   */
  showNoteIndicators?: boolean;

  /**
   * Children elements
   */
  children: React.ReactNode;
}

/**
 * Container component for paragraph numbering
 */
export const ParagraphNumberingContainer: React.FC<ParagraphNumberingContainerProps> = ({
  visible = true,
  showNoteIndicators = true,
  children,
}) => {
  if (!visible) {
    return <>{children}</>;
  }

  const containerClasses = [
    'paragraph-numbering-container',
    showNoteIndicators ? 'show-note-indicators' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {showNoteIndicators && (
        <div className="paragraph-notes-column">
          {/* This column will contain note indicators */}
        </div>
      )}
      <div className="paragraph-numbering-column">
        {/* This column will be filled with paragraph numbers */}
      </div>
      <div className="paragraph-content">{children}</div>
    </div>
  );
};
