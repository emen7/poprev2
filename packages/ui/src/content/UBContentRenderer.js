import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ParagraphContainer } from './ParagraphContainer';
import './UBContentRenderer.css';
/**
 * UBContentRenderer Component
 *
 * A component that renders UB content with paragraph numbering.
 */
export const UBContentRenderer = ({ paperId, sectionId, formatType, showNumbers = true, useVerticalNumbering = true, textAlignment = 'left', showNoteIndicators = true, highlightedParagraphId, onParagraphClick, className = '', }) => {
    // State for paragraphs
    const [paragraphs, setParagraphs] = useState([]);
    // State for loading
    const [isLoading, setIsLoading] = useState(true);
    // State for error
    const [error, setError] = useState(null);
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
                const mockUBParagraphs = Array.from({ length: 20 }, (_, i) => ({
                    id: `p${i + 1}`,
                    paperId,
                    sectionId: sectionId || '1',
                    paragraphId: `${i + 1}`,
                    text: `This is paragraph ${i + 1} of paper ${paperId}${sectionId ? `, section ${sectionId}` : ''}. It demonstrates the UB content rendering with paragraph numbering.`,
                    htmlText: `<span>This is paragraph ${i + 1} of paper ${paperId}${sectionId ? `, section ${sectionId}` : ''}. It demonstrates the UB content rendering with paragraph numbering.</span>`,
                    hasNotes: i % 3 === 0, // Every third paragraph has notes
                    standardReferenceId: `${paperId}:${sectionId || '1'}.${i + 1}`,
                }));
                // Convert UB paragraphs to Paragraph format
                const formattedParagraphs = mockUBParagraphs.map(ubParagraph => ({
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
            }
            catch (err) {
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
        return (_jsx("div", { className: containerClasses, children: _jsx("div", { className: "ub-content-renderer-loading-indicator", children: _jsx("span", { children: "Loading UB content..." }) }) }));
    }
    // Render error state
    if (error) {
        return (_jsx("div", { className: containerClasses, children: _jsxs("div", { className: "ub-content-renderer-error-message", children: [_jsx("h3", { children: "Error loading UB content" }), _jsx("p", { children: error.message })] }) }));
    }
    // Render content
    return (_jsx("div", { className: containerClasses, children: _jsx(ParagraphContainer, { paragraphs: paragraphs, formatType: formatType, showNumbers: showNumbers, useVerticalNumbering: useVerticalNumbering, textAlignment: textAlignment, showNoteIndicators: showNoteIndicators, highlightedParagraphId: highlightedParagraphId, onParagraphClick: onParagraphClick }) }));
};
export default UBContentRenderer;
//# sourceMappingURL=UBContentRenderer.js.map