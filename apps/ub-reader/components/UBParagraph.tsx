'use client';

import React, { useRef } from 'react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { useTheme } from '../contexts/ThemeContext';
import { ReferenceProcessor } from './references';
import { useHighlight } from '@ub/highlighting';

interface UBParagraphProps {
  paragraph: {
    number: number;
    text: string;
  };
  isTopicChange?: boolean;
  className?: string;
  currentPaper?: number;
}

/**
 * Component for displaying a UB paragraph with optional paragraph numbers
 * Supports both Modern and Traditional formatting themes
 * Includes automatic reference detection and linking
 */
export const UBParagraph: React.FC<UBParagraphProps> = ({
  paragraph,
  isTopicChange = false,
  className = '',
  currentPaper = 0,
}) => {
  const { preferences } = useUserPreferences();
  const paragraphRef = useRef<HTMLDivElement>(null);
  const { highlightManager } = useHighlight();

  // Try to use the ThemeContext, but provide a fallback if it's not available
  let contentTheme = 'traditional';
  try {
    const themeContext = useTheme();
    contentTheme = themeContext.contentTheme;
  } catch (error) {
    // ThemeContext not available, use default theme
    console.log('ThemeContext not available, using default theme');
  }

  // Determine if paragraph numbers should be shown
  const showParagraphNumbers = preferences.reader.showParagraphNumbers;

  // Apply appropriate classes based on the content theme and topic change status
  const paragraphClasses = ['ub-paragraph', isTopicChange ? 'ub-topic-change' : '', className]
    .filter(Boolean)
    .join(' ');

  // Process the paragraph text to apply theme-specific formatting
  const processText = (text: string): string => {
    // Replace italic tags with our custom classes
    let processed = text.replace(/<i>(.*?)<\/i>/g, '<span class="ub-emphasis">$1</span>');

    // Replace bold italic tags with our custom classes
    processed = processed.replace(
      /<b><i>(.*?)<\/i><\/b>/g,
      '<span class="ub-strong-emphasis">$1</span>'
    );
    processed = processed.replace(
      /<i><b>(.*?)<\/b><\/i>/g,
      '<span class="ub-strong-emphasis">$1</span>'
    );

    // Detect and mark ALL CAPS text (words of 2 or more characters)
    processed = processed.replace(/\b([A-Z]{2,})\b/g, '<span class="ub-all-caps">$1</span>');

    // Detect and mark bold ALL CAPS text
    processed = processed.replace(
      /<b>([A-Z]{2,})<\/b>/g,
      '<span class="ub-strong-all-caps">$1</span>'
    );

    return processed;
  };

  // Handle reference click
  const handleReferenceClick = (reference: any, event: React.MouseEvent) => {
    // Navigate to the referenced content
    window.location.href =
      reference.type === 'paper'
        ? `/paper/${reference.paper}`
        : `/paper/${reference.paper}#section-${reference.section}`;

    // Prevent default link behavior
    event.preventDefault();
  };

  return (
    <div className={paragraphClasses} id={`p-${paragraph.number}`} ref={paragraphRef}>
      {showParagraphNumbers && <span className="ub-paragraph-number">{paragraph.number}</span>}

      {/* Use ReferenceProcessor to detect and link references */}
      <div className="ub-paragraph-text">
        <ReferenceProcessor
          content={processText(paragraph.text)}
          currentPaper={currentPaper}
          baseUrl="/paper"
          showTooltips={true}
          onReferenceClick={handleReferenceClick}
        />
      </div>
    </div>
  );
};

export default UBParagraph;
