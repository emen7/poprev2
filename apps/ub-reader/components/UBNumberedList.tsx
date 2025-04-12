'use client';

import React from 'react';

import { useTheme } from '../contexts/ThemeContext';

interface ListItem {
  id: string | number;
  content: string;
  children?: ListItem[];
}

interface UBNumberedListProps {
  items: ListItem[];
  withDots?: boolean;
  className?: string;
}

/**
 * Component for displaying a numbered list with support for Modern and Traditional themes
 * Numbers are included directly in the text content for better copy-paste functionality
 * Visual alignment is handled with CSS while maintaining good copy behavior
 */
export const UBNumberedList: React.FC<UBNumberedListProps> = ({
  items,
  withDots = false,
  className = '',
}) => {
  // Try to use the ThemeContext, but provide a fallback if it's not available
  let contentTheme = 'traditional';
  try {
    const themeContext = useTheme();
    contentTheme = themeContext.contentTheme;
  } catch (error) {
    // ThemeContext not available, use default theme
    console.log('ThemeContext not available, using default theme');
  }

  // Apply appropriate classes based on the content theme and dots option
  const listClasses = [
    'ub-list',
    'ub-list-numbered',
    withDots ? 'ub-list-with-dots' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Process the item content to apply theme-specific formatting
  const processContent = (content: string): string => {
    // Replace italic tags with our custom classes
    let processed = content.replace(/<i>(.*?)<\/i>/g, '<span class="ub-emphasis">$1</span>');

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

  // Render list items recursively with numbers included in the text content
  const renderItems = (items: ListItem[], level: number = 1) => {
    return items.map((item, index) => {
      const itemNumber = typeof item.id === 'number' ? item.id : index + 1;

      return (
        <div key={item.id} className="ub-list-item" id={`list-item-${item.id}`}>
          {/* 
            Use a special structure for visual alignment while maintaining good copy behavior:
            - The outer div has position: relative for positioning context
            - The number span is absolutely positioned for visual alignment
            - The content span has padding-left to make room for the number
            - The hidden span contains both number and content for copying
          */}
          <div className="ub-list-item-wrapper">
            {/* Visually displayed number (positioned with CSS) */}
            <span className="ub-list-item-number-visual">{itemNumber}.</span>

            {/* Visually displayed content (with padding for the number) */}
            <span
              className="ub-list-item-content-visual"
              dangerouslySetInnerHTML={{ __html: processContent(item.content) }}
            />

            {/* Hidden element that contains both number and content for copying */}
            <span
              className="ub-list-item-copy-text"
              dangerouslySetInnerHTML={{ __html: `${itemNumber}. ${processContent(item.content)}` }}
            />
          </div>

          {item.children && item.children.length > 0 && (
            <div className={`ub-list ub-list-nested ub-list-level-${level + 1}`}>
              {renderItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return <div className={listClasses}>{renderItems(items)}</div>;
};

export default UBNumberedList;
