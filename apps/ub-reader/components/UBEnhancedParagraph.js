'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useEnhancedHighlight } from './EnhancedHighlightProvider';
import { useTheme } from '../contexts/ThemeContext';
import { useExtendedUserPreferences } from '../contexts/ExtendedUserPreferencesContext';
import { ReferenceProcessor } from './references';
/**
 * Enhanced paragraph component with note indicators
 *
 * This component displays a paragraph with:
 * - A column for note indicators (dots)
 * - A column for paragraph numbers
 * - The paragraph text content
 */
export const UBEnhancedParagraph = ({ paragraph, isTopicChange = false, className = '', currentPaper = 0, hasNote = false, onNoteIndicatorClick, }) => {
    const { preferences } = useExtendedUserPreferences();
    const paragraphRef = useRef(null);
    const { highlightManager, showHighlights } = useEnhancedHighlight();
    const [isHovered, setIsHovered] = useState(false);
    const { uiTheme } = useTheme();
    // Determine if paragraph numbers should be shown
    const showParagraphNumbers = preferences.reader.showParagraphNumbers;
    // Determine if note indicators should be shown
    const showNoteIndicators = preferences.reader.showNoteIndicators;
    // Get line height from preferences
    const lineHeight = getLineHeightValue(preferences.reader.lineHeight);
    // Get font size from preferences
    const fontSize = getFontSizeValue(preferences.reader.fontSize);
    // Apply appropriate classes based on the content theme and topic change status
    const paragraphClasses = [
        'ub-enhanced-paragraph',
        isTopicChange ? 'ub-topic-change' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Process the paragraph text to apply theme-specific formatting
    const processText = (text) => {
        // Replace italic tags with our custom classes
        let processed = text.replace(/<i>(.*?)<\/i>/g, '<span class="ub-emphasis">$1</span>');
        // Replace bold italic tags with our custom classes
        processed = processed.replace(/<b><i>(.*?)<\/i><\/b>/g, '<span class="ub-strong-emphasis">$1</span>');
        processed = processed.replace(/<i><b>(.*?)<\/b><\/i>/g, '<span class="ub-strong-emphasis">$1</span>');
        // Detect and mark ALL CAPS text (words of 2 or more characters)
        processed = processed.replace(/\b([A-Z]{2,})\b/g, '<span class="ub-all-caps">$1</span>');
        // Detect and mark bold ALL CAPS text
        processed = processed.replace(/<b>([A-Z]{2,})<\/b>/g, '<span class="ub-strong-all-caps">$1</span>');
        return processed;
    };
    // Helper function to get line height value
    function getLineHeightValue(lineHeight) {
        switch (lineHeight) {
            case 'compact':
                return 1.4;
            case 'relaxed':
                return 1.8;
            case 'normal':
            default:
                return 1.6;
        }
    }
    // Helper function to get font size value
    function getFontSizeValue(fontSize) {
        switch (fontSize) {
            case 'small':
                return '0.9rem';
            case 'large':
                return '1.1rem';
            case 'medium':
            default:
                return '1rem';
        }
    }
    // Handle reference click
    const handleReferenceClick = (reference, event) => {
        // Navigate to the referenced content
        window.location.href =
            reference.type === 'paper'
                ? `/paper/${reference.paper}`
                : `/paper/${reference.paper}#section-${reference.section}`;
        // Prevent default link behavior
        event.preventDefault();
    };
    // Handle text selection for highlighting
    const handleMouseUp = () => {
        if (typeof window === 'undefined' || !highlightManager)
            return;
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !paragraphRef.current)
            return;
        // Check if the selection is within this paragraph
        const range = selection.getRangeAt(0);
        const container = paragraphRef.current;
        if (container.contains(range.commonAncestorContainer)) {
            // Get the selected text
            const selectedText = selection.toString().trim();
            if (selectedText) {
                // Show the highlight menu
                const rect = range.getBoundingClientRect();
                const top = rect.top + window.scrollY - 40; // Position above the selection
                const left = rect.left + window.scrollX + rect.width / 2 - 75; // Center horizontally
                // Call the highlightManager to show the menu
                highlightManager.showSelectionMenu({
                    text: selectedText,
                    position: { top, left },
                    onHighlight: (color) => {
                        // Create a highlight with the selected color
                        highlightManager.createHighlight(selectedText, color, {
                            paperId: currentPaper.toString(),
                            paragraphId: paragraph.number.toString(),
                        });
                    },
                });
            }
        }
    };
    // Handle note indicator click
    const handleNoteIndicatorClick = () => {
        if (hasNote && onNoteIndicatorClick) {
            onNoteIndicatorClick(paragraph.number.toString());
        }
    };
    return (_jsxs("div", { className: paragraphClasses, id: `p-${paragraph.number}`, ref: paragraphRef, onMouseUp: handleMouseUp, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [showNoteIndicators && (_jsx("div", { className: `ub-note-indicator ${hasNote ? 'has-note' : ''} ${isHovered ? 'hovered' : ''}`, onClick: handleNoteIndicatorClick, children: hasNote && _jsx("span", { className: "ub-note-dot" }) })), showParagraphNumbers && (_jsx("div", { className: "ub-paragraph-number", children: _jsx("span", { children: paragraph.number }) })), _jsx("div", { className: "ub-paragraph-text", children: _jsx(ReferenceProcessor, { content: processText(paragraph.text), currentPaper: currentPaper, baseUrl: "/paper", showTooltips: true, onReferenceClick: handleReferenceClick }) }), _jsx("style", { jsx: true, children: `
        .ub-enhanced-paragraph {
          display: grid;
          grid-template-columns: ${showNoteIndicators ? '20px' : ''} ${showParagraphNumbers
                    ? 'minmax(30px, auto)'
                    : ''} 1fr;
          margin-bottom: 1rem;
          position: relative;
        }

        .ub-note-indicator {
          width: 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 0.25rem;
          cursor: ${hasNote ? 'pointer' : 'default'};
        }

        .ub-note-indicator.has-note {
          opacity: 1;
        }

        .ub-note-indicator.has-note:hover {
          opacity: 0.8;
        }

        .ub-note-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--note-indicator-color, #3498db);
          display: block;
        }

        .ub-paragraph-number {
          padding-right: 1rem;
          text-align: right;
          color: var(--paragraph-number-color, #666);
          font-size: 0.9rem;
          padding-top: 0.25rem;
          user-select: none;
        }

        .ub-paragraph-text {
          line-height: ${lineHeight};
          font-size: ${fontSize};
          color: var(--text-color, #333);
        }

        .ub-topic-change {
          margin-top: 2rem;
        }

        /* Ensure text selection doesn't include indicators or numbers */
        .ub-note-indicator,
        .ub-paragraph-number {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        /* Dark mode styles */
        :global(.dark-theme) .ub-paragraph-number {
          color: var(--paragraph-number-color-dark, #999);
        }

        :global(.dark-theme) .ub-paragraph-text {
          color: var(--text-color-dark, #eee);
        }

        :global(.dark-theme) .ub-note-dot {
          background-color: var(--note-indicator-color-dark, #5dade2);
        }
      ` })] }));
};
export default UBEnhancedParagraph;
//# sourceMappingURL=UBEnhancedParagraph.js.map