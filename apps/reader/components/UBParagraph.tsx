'use client';

import React from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

interface UBParagraphProps {
  paragraph: {
    number: number;
    text: string;
  };
  className?: string;
}

/**
 * Component for displaying a UB paragraph with optional paragraph numbers
 */
export const UBParagraph: React.FC<UBParagraphProps> = ({
  paragraph,
  className = '',
}) => {
  const { preferences } = useUserPreferences();
  
  return (
    <div className={`ub-paragraph ${className}`} id={`p-${paragraph.number}`}>
      {preferences.reader.showParagraphNumbers && (
        <span className="ub-paragraph-number">{paragraph.number}</span>
      )}
      <span 
        className="ub-paragraph-text" 
        dangerouslySetInnerHTML={{ __html: paragraph.text }} 
      />
    </div>
  );
};

export default UBParagraph;