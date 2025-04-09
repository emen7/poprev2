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
}

/**
 * Component for displaying paragraph numbers in a vertical column
 */
export const ParagraphNumbering: React.FC<ParagraphNumberingProps> = ({
  number,
  hasNotes = false,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="paragraph-numbering">
      {hasNotes && (
        <div className="paragraph-note-indicator" title="This paragraph has notes">
          ●
        </div>
      )}
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
   * Children elements
   */
  children: React.ReactNode;
}

/**
 * Container component for paragraph numbering
 */
export const ParagraphNumberingContainer: React.FC<ParagraphNumberingContainerProps> = ({
  visible = true,
  children,
}) => {
  if (!visible) {
    return <>{children}</>;
  }

  return (
    <div className="paragraph-numbering-container">
      <div className="paragraph-numbering-column">
        {/* This column will be filled with ParagraphNumbering components */}
      </div>
      <div className="paragraph-content">{children}</div>
    </div>
  );
};
