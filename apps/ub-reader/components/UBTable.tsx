'use client';

import React from 'react';

import { useTheme } from '../contexts/ThemeContext';

interface TableCell {
  content: string;
  colSpan?: number;
  rowSpan?: number;
  isHeader?: boolean;
}

interface TableRow {
  cells: TableCell[];
}

interface UBTableProps {
  caption?: string;
  rows: TableRow[];
  className?: string;
}

/**
 * Component for displaying a table with support for Modern and Traditional themes
 */
export const UBTable: React.FC<UBTableProps> = ({ caption, rows, className = '' }) => {
  // Try to use the ThemeContext, but provide a fallback if it's not available
  let contentTheme = 'traditional';
  try {
    const themeContext = useTheme();
    contentTheme = themeContext.contentTheme;
  } catch (error) {
    // ThemeContext not available, use default theme
    console.log('ThemeContext not available, using default theme');
  }

  // Apply appropriate classes based on the content theme
  const tableClasses = ['ub-table', className].filter(Boolean).join(' ');

  // Process the cell content to apply theme-specific formatting
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

  return (
    <div className="ub-table-container">
      <table className={tableClasses}>
        {caption && <caption className="ub-table-caption">{caption}</caption>}
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="ub-table-row">
              {row.cells.map((cell, cellIndex) => {
                const CellTag = cell.isHeader ? 'th' : 'td';
                return (
                  <CellTag
                    key={cellIndex}
                    className="ub-table-cell"
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    dangerouslySetInnerHTML={{ __html: processContent(cell.content) }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UBTable;
