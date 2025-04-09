/**
 * Reader Header Component
 *
 * This component displays the document header with title, subtitle, and metadata.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * The ReaderHeader component
 */
export function ReaderHeader({ document, config, className = '' }) {
    // Get extension components
    const extensionHeaderComponents = config.extensions.map(extensionId => {
        // This would be implemented to get custom header components from extensions
        // For now, we'll return null
        return null;
    }).filter(Boolean);
    // If there's an extension header component, use it
    if (extensionHeaderComponents.length > 0) {
        // In a real implementation, we would render the extension component here
        // For now, we'll just render the default header
    }
    return (_jsxs("div", { className: `reader-header ${className}`, children: [config.branding.logo && (_jsx("div", { className: "reader-logo", children: _jsx("img", { src: config.branding.logo, alt: config.branding.appName || 'Reader' }) })), _jsxs("div", { className: "reader-title-container", children: [_jsx("h1", { className: "reader-title", children: document.title || 'Untitled Document' }), document.metadata.subtitle && (_jsx("h2", { className: "reader-subtitle", children: document.metadata.subtitle }))] }), _jsxs("div", { className: "reader-metadata", children: [document.metadata.author && (_jsxs("div", { className: "reader-author", children: ["By: ", Array.isArray(document.metadata.author)
                                ? document.metadata.author.join(', ')
                                : document.metadata.author] })), document.metadata.date && (_jsx("div", { className: "reader-date", children: document.metadata.date })), document.metadata.categories && document.metadata.categories.length > 0 && (_jsxs("div", { className: "reader-categories", children: ["Categories: ", document.metadata.categories.join(', ')] })), document.metadata.tags && document.metadata.tags.length > 0 && (_jsxs("div", { className: "reader-tags", children: ["Tags: ", document.metadata.tags.join(', ')] }))] }), config.navigation.linkbackUrl && (_jsx("div", { className: "reader-linkback", children: _jsx("a", { href: config.navigation.linkbackUrl, children: config.navigation.linkbackText || 'Back' }) }))] }));
}
//# sourceMappingURL=ReaderHeader.js.map