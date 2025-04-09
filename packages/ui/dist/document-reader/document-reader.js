/**
 * Document Reader Component
 *
 * This component displays a transformed document with proper formatting and navigation.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import './document-reader.css';
export function DocumentReader({ document }) {
    const [activeSection, setActiveSection] = useState(null);
    // Extract table of contents from the document
    const tableOfContents = extractTableOfContents(document.content);
    return (_jsxs("div", { className: "document-reader", children: [_jsxs("div", { className: "document-reader-header", children: [_jsx("h1", { className: "document-title", children: document.metadata.title || 'Untitled Document' }), document.metadata.subtitle && (_jsx("h2", { className: "document-subtitle", children: document.metadata.subtitle })), _jsxs("div", { className: "document-metadata", children: [document.metadata.author && (_jsxs("div", { className: "document-author", children: ["By:", ' ', Array.isArray(document.metadata.author)
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
 * @param rootNode The root node of the document
 * @returns Array of table of contents items
 */
function extractTableOfContents(rootNode) {
    const toc = [];
    // Function to traverse the document and find headings
    function traverse(node) {
        if (node.type === 'heading') {
            const headingNode = node;
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
 * @param node The node to extract text from
 * @returns The text content of the node
 */
function getNodeText(node) {
    if (node.type === 'text' && node.value) {
        return node.value;
    }
    if (node.children && node.children.length > 0) {
        return node.children.map(getNodeText).join('');
    }
    return '';
}
/**
 * Render the document content
 *
 * @param rootNode The root node of the document
 * @returns JSX elements representing the document content
 */
function renderContent(rootNode) {
    const children = rootNode.children || [];
    return (_jsx(_Fragment, { children: children.map((node, index) => (_jsx(React.Fragment, { children: renderNode(node) }, index))) }));
}
/**
 * Render a single node
 *
 * @param node The node to render
 * @returns JSX element representing the node
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
 * @param node The parent node
 * @returns JSX elements representing the node's children
 */
function renderChildren(node) {
    if (!node.children || node.children.length === 0) {
        return null;
    }
    return (_jsx(_Fragment, { children: node.children.map((child, index) => (_jsx(React.Fragment, { children: renderNode(child) }, index))) }));
}
//# sourceMappingURL=document-reader.js.map