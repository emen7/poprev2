/**
 * Document Reader Component
 *
 * This component displays a transformed document with proper formatting and navigation.
 * It renders the document content as HTML with appropriate styling and provides
 * a table of contents for easy navigation.
 *
 * @module document-reader/document-reader
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import './document-reader.css';
/**
 * DocumentReader Component
 *
 * @description A component that displays a transformed document with proper formatting and navigation.
 * It renders the document content as HTML with appropriate styling and provides
 * a table of contents for easy navigation.
 *
 * @example
 * ```tsx
 * <DocumentReader
 *   document={transformedDocument}
 *   className="custom-reader"
 * />
 * ```
 */
export function DocumentReader({ document, className = '' }) {
    const [activeSection, setActiveSection] = useState(null);
    /**
     * Effect to update the active section when the document changes
     */
    useEffect(() => {
        // Reset active section when document changes
        setActiveSection(null);
    }, [document]);
    // Extract table of contents from the document
    const tableOfContents = extractTableOfContents(document.content);
    /**
     * Combine CSS classes for the document reader
     */
    const readerClasses = ['document-reader', className].filter(Boolean).join(' ');
    return (_jsxs("div", { className: readerClasses, children: [_jsxs("div", { className: "document-reader-header", children: [_jsx("h1", { className: "document-title", children: document.metadata.title || 'Untitled Document' }), document.metadata.subtitle && (_jsx("h2", { className: "document-subtitle", children: document.metadata.subtitle })), _jsxs("div", { className: "document-metadata", children: [document.metadata.author && (_jsxs("div", { className: "document-author", children: ["By:", ' ', Array.isArray(document.metadata.author)
                                        ? document.metadata.author.join(', ')
                                        : document.metadata.author] })), document.metadata.date && _jsx("div", { className: "document-date", children: document.metadata.date }), document.metadata.categories && document.metadata.categories.length > 0 && (_jsxs("div", { className: "document-categories", children: ["Categories: ", document.metadata.categories.join(', ')] })), document.metadata.tags && document.metadata.tags.length > 0 && (_jsxs("div", { className: "document-tags", children: ["Tags: ", document.metadata.tags.join(', ')] }))] })] }), tableOfContents.length > 0 && (_jsxs("div", { className: "document-toc", children: [_jsx("h3", { children: "Table of Contents" }), _jsx("ul", { children: tableOfContents.map((item, index) => (_jsx("li", { className: `toc-item toc-level-${item.level} ${activeSection === item.id ? 'active' : ''}`, children: _jsx("a", { href: `#${item.id}`, onClick: e => {
                                    e.preventDefault();
                                    // Use window.document to avoid confusion with the document prop
                                    const element = window.document.getElementById(item.id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                        setActiveSection(item.id);
                                    }
                                }, children: item.text }) }, index))) })] })), _jsx("div", { className: "document-content", children: renderContent(document.content) })] }));
}
/**
 * Extract table of contents from the document
 *
 * @param {RootNode} rootNode - The root node of the document
 * @returns {TocItem[]} Array of table of contents items
 */
function extractTableOfContents(rootNode) {
    const toc = [];
    /**
     * Recursively traverse the document tree to find heading nodes
     *
     * @param {DocumentNode} node - The current node to process
     */
    function traverse(node) {
        if (node.type === 'heading') {
            const headingNode = node; // TODO: Use proper HeadingNode type
            const text = getNodeText(node);
            const id = `heading-${text
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')}`;
            toc.push({
                id,
                text,
                level: headingNode.depth,
            });
        }
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    }
    // Start traversal from the root node's children
    const children = rootNode.children || [];
    for (const child of children) {
        traverse(child);
    }
    return toc;
}
/**
 * Get the text content of a node
 *
 * @param {DocumentNode} node - The node to extract text from
 * @returns {string} The text content of the node
 *
 * @description
 * This function recursively extracts the text content from a document node.
 * It handles text nodes directly and traverses child nodes to collect their text.
 *
 * @example
 * ```tsx
 * const heading = { type: 'heading', children: [{ type: 'text', value: 'Hello World' }] };
 * const text = getNodeText(heading); // Returns "Hello World"
 * ```
 */
function getNodeText(node) {
    // If it's a text node with a value, return the value
    if (node.type === 'text' && node.value) {
        return node.value;
    }
    // If it has children, recursively get their text and join it
    if (node.children && node.children.length > 0) {
        return node.children.map(getNodeText).join('');
    }
    // Default case: no text found
    return '';
}
/**
 * Render the document content
 *
 * @param {RootNode} rootNode - The root node of the document
 * @returns {JSX.Element} JSX elements representing the document content
 *
 * @description
 * This function renders the document content by mapping over the root node's children
 * and rendering each child node using the renderNode function.
 *
 * @example
 * ```tsx
 * const content = renderContent(document.content);
 * ```
 */
function renderContent(rootNode) {
    // Get the children or default to an empty array
    const children = rootNode.children || [];
    return (_jsx(_Fragment, { children: children.map((node, index) => (_jsx(React.Fragment, { children: renderNode(node) }, index))) }));
}
/**
 * Render a single node
 *
 * @param {DocumentNode} node - The node to render
 * @returns {JSX.Element|string|null} JSX element, string, or null representing the node
 *
 * @description
 * This function renders a single document node based on its type.
 * It handles various node types like headings, paragraphs, lists, links, etc.
 * For each type, it applies appropriate styling and renders the node's children.
 *
 * @example
 * ```tsx
 * const headingElement = renderNode({ type: 'heading', depth: 1, children: [...] });
 * ```
 */
function renderNode(node) {
    switch (node.type) {
        case 'heading': {
            const headingNode = node;
            const text = getNodeText(node);
            const id = `heading-${text
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')}`;
            switch (headingNode.depth) {
                case 1:
                    return (_jsx("h1", { id: id, className: "document-h1", children: renderChildren(node) }));
                case 2:
                    return (_jsx("h2", { id: id, className: "document-h2", children: renderChildren(node) }));
                case 3:
                    return (_jsx("h3", { id: id, className: "document-h3", children: renderChildren(node) }));
                case 4:
                    return (_jsx("h4", { id: id, className: "document-h4", children: renderChildren(node) }));
                case 5:
                    return (_jsx("h5", { id: id, className: "document-h5", children: renderChildren(node) }));
                case 6:
                    return (_jsx("h6", { id: id, className: "document-h6", children: renderChildren(node) }));
                default:
                    return (_jsx("h3", { id: id, className: "document-h3", children: renderChildren(node) }));
            }
        }
        case 'paragraph':
            return _jsx("p", { className: "document-paragraph", children: renderChildren(node) });
        case 'text':
            return node.value || '';
        case 'list':
            return node.ordered ? (_jsx("ol", { className: "document-ordered-list", children: renderChildren(node) })) : (_jsx("ul", { className: "document-unordered-list", children: renderChildren(node) }));
        case 'listItem':
            return _jsx("li", { className: "document-list-item", children: renderChildren(node) });
        case 'link':
            return (_jsx("a", { href: node.url, title: node.title, target: "_blank", rel: "noopener noreferrer", className: "document-link", children: renderChildren(node) }));
        case 'image':
            return (_jsx("img", { src: node.url, alt: node.alt || '', title: node.title, className: "document-image" }));
        case 'blockquote':
            return _jsx("blockquote", { className: "document-blockquote", children: renderChildren(node) });
        case 'code':
            return (_jsx("pre", { className: "document-code-block", children: _jsx("code", { className: node.lang ? `language-${node.lang}` : '', children: node.value || renderChildren(node) }) }));
        case 'inlineCode':
            return (_jsx("code", { className: "document-inline-code", children: node.value || renderChildren(node) }));
        case 'emphasis':
            return _jsx("em", { className: "document-emphasis", children: renderChildren(node) });
        case 'strong':
            return _jsx("strong", { className: "document-strong", children: renderChildren(node) });
        case 'thematicBreak':
            return _jsx("hr", { className: "document-hr" });
        case 'table':
            return (_jsx("div", { className: "document-table-container", children: _jsx("table", { className: "document-table", children: _jsx("tbody", { children: renderChildren(node) }) }) }));
        case 'tableRow':
            return _jsx("tr", { className: "document-table-row", children: renderChildren(node) });
        case 'tableCell':
            return _jsx("td", { className: "document-table-cell", children: renderChildren(node) });
        default:
            // Use a span instead of div to avoid invalid nesting (e.g., div inside p)
            return _jsx("span", { className: "document-unknown", children: renderChildren(node) });
    }
}
/**
 * Render the children of a node
 *
 * @param {DocumentNode} node - The parent node
 * @returns {JSX.Element|null} JSX elements representing the node's children, or null if no children
 *
 * @description
 * This function renders the children of a document node by mapping over them
 * and rendering each child using the renderNode function.
 * If the node has no children, it returns null.
 *
 * @example
 * ```tsx
 * const childrenElements = renderChildren({ type: 'paragraph', children: [...] });
 * ```
 */
function renderChildren(node) {
    // If the node has no children, return null
    if (!node.children || node.children.length === 0) {
        return null;
    }
    // Render each child node
    return (_jsx(_Fragment, { children: node.children.map((child, index) => (_jsx(React.Fragment, { children: renderNode(child) }, index))) }));
}
//# sourceMappingURL=document-reader.js.map