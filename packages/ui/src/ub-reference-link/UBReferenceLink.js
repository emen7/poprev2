import { jsx as _jsx } from "react/jsx-runtime";
import './UBReferenceLink.css';
/**
 * Generate a URL for a UB reference
 *
 * @param {UBReference} reference - The UB reference
 * @param {string} [baseUrl='/reader'] - The base URL for the UB Reader
 * @returns {string} A URL to the referenced content in the UB Reader
 */
export function generateUBReferenceUrl(reference, baseUrl = '/reader') {
    switch (reference.type) {
        case 'paper':
            return `${baseUrl}/paper/${reference.paper}`;
        case 'paper-section':
            return `${baseUrl}/paper/${reference.paper}#section-${reference.section}`;
        case 'paper-section-paragraph':
            return `${baseUrl}/paper/${reference.paper}#p-${reference.section}-${reference.paragraph}`;
        case 'section':
            // This should not happen after applying context, but just in case
            return `#section-${reference.section}`;
        default:
            return '#';
    }
}
/**
 * UBReferenceLink Component
 *
 * @description A component that renders a link to a UB reference with proper formatting and URL generation.
 * It supports different reference types (paper, section, paragraph) and allows for custom styling.
 *
 * @example
 * ```tsx
 * <UBReferenceLink
 *   reference={{
 *     type: 'paper-section',
 *     paper: 1,
 *     section: 2,
 *     originalText: '1:2'
 *   }}
 *   baseUrl="/reader"
 *   className="custom-link"
 * />
 * ```
 */
export const UBReferenceLink = ({ reference, baseUrl = '/reader', className = '', children, onClick, }) => {
    // Generate the URL for the reference
    const url = generateUBReferenceUrl(reference, baseUrl);
    // Combine CSS classes
    const linkClasses = ['ub-reference', className].filter(Boolean).join(' ');
    // Handle click event
    const handleClick = (event) => {
        if (onClick) {
            onClick(reference, event);
            event.preventDefault();
        }
    };
    return (_jsx("a", { href: url, className: linkClasses, "data-reference-type": reference.type, "data-reference-paper": reference.paper, "data-reference-section": reference.section, "data-reference-paragraph": reference.paragraph, onClick: handleClick, children: children || reference.originalText }));
};
export default UBReferenceLink;
//# sourceMappingURL=UBReferenceLink.js.map