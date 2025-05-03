'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { parseUBReferences, applyReferenceContext, generateUBReferenceUrl, isValidReference, } from './ReferenceUtils';
import './ReferenceProcessor.css';
/**
 * ReferenceProcessor Component
 *
 * This component processes text content and converts references to interactive links.
 */
export function ReferenceProcessor({ content, currentPaper = 0, baseUrl = '/paper', showTooltips = true, maxPapers = 196, maxSections, linkClassName = 'ub-reference', onReferenceClick, }) {
    // State for the currently hovered reference
    const [hoveredReference, setHoveredReference] = useState(null);
    // State for the tooltip position
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    // Process the content to find references
    const processContent = () => {
        // Parse references from the content
        let references = parseUBReferences(content);
        // Apply context if we have a current paper
        if (currentPaper > 0) {
            references = applyReferenceContext(references, currentPaper);
        }
        // Sort references by position in reverse order to avoid offset issues
        references.sort((a, b) => b.position.start - a.position.start);
        let processedContent = content;
        // Replace references with links
        for (const ref of references) {
            const isValid = isValidReference(ref, maxPapers, maxSections);
            const url = isValid ? generateUBReferenceUrl(ref, baseUrl) : '#';
            // Create a unique ID for this reference
            const refId = `ref-${ref.type}-${ref.paper}${ref.section ? `-${ref.section}` : ''}${ref.paragraph ? `-${ref.paragraph}` : ''}`;
            // Create the link element
            const link = `<a 
        href="${url}" 
        class="${linkClassName} ${isValid ? 'valid-reference' : 'invalid-reference'}" 
        data-reference-type="${ref.type}"
        data-reference-paper="${ref.paper}"
        ${ref.section !== undefined ? `data-reference-section="${ref.section}"` : ''}
        ${ref.paragraph !== undefined ? `data-reference-paragraph="${ref.paragraph}"` : ''}
        id="${refId}"
      >${ref.originalText}</a>`;
            // Replace the reference in the content
            processedContent =
                processedContent.substring(0, ref.position.start) +
                    link +
                    processedContent.substring(ref.position.end);
        }
        return processedContent;
    };
    // Handle reference hover
    const handleReferenceHover = (event) => {
        if (!showTooltips)
            return;
        const target = event.target;
        if (!target.classList.contains(linkClassName))
            return;
        // Extract reference data from data attributes
        const type = target.getAttribute('data-reference-type');
        const paper = parseInt(target.getAttribute('data-reference-paper') || '0', 10);
        const section = target.hasAttribute('data-reference-section')
            ? parseInt(target.getAttribute('data-reference-section') || '0', 10)
            : undefined;
        const paragraph = target.hasAttribute('data-reference-paragraph')
            ? parseInt(target.getAttribute('data-reference-paragraph') || '0', 10)
            : undefined;
        // Create reference object
        const reference = {
            type,
            paper,
            section,
            paragraph,
            originalText: target.textContent || '',
            position: { start: 0, end: 0 }, // Not needed for hover
        };
        // Set hovered reference
        setHoveredReference(reference);
        // Set tooltip position
        setTooltipPosition({
            x: event.clientX,
            y: event.clientY,
        });
    };
    // Handle reference hover end
    const handleReferenceHoverEnd = () => {
        setHoveredReference(null);
    };
    // Handle reference click
    const handleReferenceClick = (event) => {
        const target = event.target;
        if (!target.classList.contains(linkClassName))
            return;
        // Extract reference data from data attributes
        const type = target.getAttribute('data-reference-type');
        const paper = parseInt(target.getAttribute('data-reference-paper') || '0', 10);
        const section = target.hasAttribute('data-reference-section')
            ? parseInt(target.getAttribute('data-reference-section') || '0', 10)
            : undefined;
        const paragraph = target.hasAttribute('data-reference-paragraph')
            ? parseInt(target.getAttribute('data-reference-paragraph') || '0', 10)
            : undefined;
        // Create reference object
        const reference = {
            type,
            paper,
            section,
            paragraph,
            originalText: target.textContent || '',
            position: { start: 0, end: 0 }, // Not needed for click
        };
        // Call the onReferenceClick callback if provided
        if (onReferenceClick) {
            onReferenceClick(reference, event);
            // Prevent default if callback is provided
            event.preventDefault();
        }
    };
    // Format the tooltip content
    const formatTooltipContent = (reference) => {
        let content = '';
        switch (reference.type) {
            case 'paper':
                content = `Paper ${reference.paper}`;
                break;
            case 'paper-section':
                content = `Paper ${reference.paper}, Section ${reference.section}`;
                break;
            case 'paper-section-paragraph':
                content = `Paper ${reference.paper}, Section ${reference.section}, Paragraph ${reference.paragraph}`;
                break;
            case 'section':
                content = `Section ${reference.section}`;
                break;
        }
        return content;
    };
    // In React, we can't use both dangerouslySetInnerHTML and children in the same element
    // So we need to wrap the content in one div and the tooltip in another
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "reference-processor", onMouseOver: handleReferenceHover, onMouseOut: handleReferenceHoverEnd, onClick: handleReferenceClick, dangerouslySetInnerHTML: { __html: processContent() } }), showTooltips && hoveredReference && (_jsx("div", { className: "reference-tooltip", style: {
                    position: 'fixed' /* Changed to fixed positioning */,
                    top: `${tooltipPosition.y + 20}px`,
                    left: `${tooltipPosition.x + 10}px`,
                    zIndex: 1000 /* Ensure it appears above other content */,
                }, children: formatTooltipContent(hoveredReference) }))] }));
}
export default ReferenceProcessor;
//# sourceMappingURL=ReferenceProcessor.js.map