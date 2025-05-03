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

import { TransformedDocument, DocumentNode, RootNode } from '@ub-ecosystem/content-transformer';
import React, { useState, useEffect } from 'react';
import './document-reader.css';

/**
 * Props for the DocumentReader component
 *
 * @interface DocumentReaderProps
 * @description Props for the document reader component
 * @property {TransformedDocument} document - The transformed document to display
 * @property {string} [className] - Additional CSS class name to apply to the component
 */
interface DocumentReaderProps {
  /**
   * The transformed document to display
   */
  document: TransformedDocument;

  /**
   * Additional CSS class name
   */
  className?: string;
}

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
export function DocumentReader({ document, className = '' }: DocumentReaderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

  return (
    <div className={readerClasses}>
      <div className="document-reader-header">
        <h1 className="document-title">{document.metadata.title || 'Untitled Document'}</h1>
        {document.metadata.subtitle && (
          <h2 className="document-subtitle">{document.metadata.subtitle}</h2>
        )}
        <div className="document-metadata">
          {document.metadata.author && (
            <div className="document-author">
              By:{' '}
              {Array.isArray(document.metadata.author)
                ? document.metadata.author.join(', ')
                : document.metadata.author}
            </div>
          )}
          {document.metadata.date && <div className="document-date">{document.metadata.date}</div>}
          {document.metadata.categories && document.metadata.categories.length > 0 && (
            <div className="document-categories">
              Categories: {document.metadata.categories.join(', ')}
            </div>
          )}
          {document.metadata.tags && document.metadata.tags.length > 0 && (
            <div className="document-tags">Tags: {document.metadata.tags.join(', ')}</div>
          )}
        </div>
      </div>

      {tableOfContents.length > 0 && (
        <div className="document-toc">
          <h3>Table of Contents</h3>
          <ul>
            {tableOfContents.map((item, index) => (
              <li
                key={index}
                className={`toc-item toc-level-${item.level} ${
                  activeSection === item.id ? 'active' : ''
                }`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={e => {
                    e.preventDefault();
                    // Use window.document to avoid confusion with the document prop
                    const element = window.document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection(item.id);
                    }
                  }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="document-content">{renderContent(document.content)}</div>
    </div>
  );
}

/**
 * Table of contents item
 *
 * @interface TocItem
 * @description Represents an item in the table of contents
 * @property {string} id - The HTML ID of the heading element
 * @property {string} text - The text content of the heading
 * @property {number} level - The heading level (1-6)
 */
interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract table of contents from the document
 *
 * @param {RootNode} rootNode - The root node of the document
 * @returns {TocItem[]} Array of table of contents items
 */
function extractTableOfContents(rootNode: RootNode): TocItem[] {
  const toc: TocItem[] = [];

  /**
   * Recursively traverse the document tree to find heading nodes
   *
   * @param {DocumentNode} node - The current node to process
   */
  function traverse(node: DocumentNode): void {
    if (node.type === 'heading') {
      const headingNode = node as any; // TODO: Use proper HeadingNode type
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
function getNodeText(node: DocumentNode): string {
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
function renderContent(rootNode: RootNode): JSX.Element {
  // Get the children or default to an empty array
  const children = rootNode.children || [];

  return (
    <>
      {children.map((node: DocumentNode, index: number) => (
        <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
      ))}
    </>
  );
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
function renderNode(node: DocumentNode): JSX.Element | string | null {
  switch (node.type) {
    case 'heading': {
      const headingNode = node as any;
      const text = getNodeText(node);
      const id = `heading-${text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')}`;

      switch (headingNode.depth) {
        case 1:
          return (
            <h1 id={id} className="document-h1">
              {renderChildren(node)}
            </h1>
          );
        case 2:
          return (
            <h2 id={id} className="document-h2">
              {renderChildren(node)}
            </h2>
          );
        case 3:
          return (
            <h3 id={id} className="document-h3">
              {renderChildren(node)}
            </h3>
          );
        case 4:
          return (
            <h4 id={id} className="document-h4">
              {renderChildren(node)}
            </h4>
          );
        case 5:
          return (
            <h5 id={id} className="document-h5">
              {renderChildren(node)}
            </h5>
          );
        case 6:
          return (
            <h6 id={id} className="document-h6">
              {renderChildren(node)}
            </h6>
          );
        default:
          return (
            <h3 id={id} className="document-h3">
              {renderChildren(node)}
            </h3>
          );
      }
    }

    case 'paragraph':
      return <p className="document-paragraph">{renderChildren(node)}</p>;

    case 'text':
      return node.value || '';

    case 'list':
      return (node as any).ordered ? (
        <ol className="document-ordered-list">{renderChildren(node)}</ol>
      ) : (
        <ul className="document-unordered-list">{renderChildren(node)}</ul>
      );

    case 'listItem':
      return <li className="document-list-item">{renderChildren(node)}</li>;

    case 'link':
      return (
        <a
          href={(node as any).url}
          title={(node as any).title}
          target="_blank"
          rel="noopener noreferrer"
          className="document-link"
        >
          {renderChildren(node)}
        </a>
      );

    case 'image':
      return (
        <img
          src={(node as any).url}
          alt={(node as any).alt || ''}
          title={(node as any).title}
          className="document-image"
        />
      );

    case 'blockquote':
      return <blockquote className="document-blockquote">{renderChildren(node)}</blockquote>;

    case 'code':
      return (
        <pre className="document-code-block">
          <code className={(node as any).lang ? `language-${(node as any).lang}` : ''}>
            {(node as any).value || renderChildren(node)}
          </code>
        </pre>
      );

    case 'inlineCode':
      return (
        <code className="document-inline-code">{(node as any).value || renderChildren(node)}</code>
      );

    case 'emphasis':
      return <em className="document-emphasis">{renderChildren(node)}</em>;

    case 'strong':
      return <strong className="document-strong">{renderChildren(node)}</strong>;

    case 'thematicBreak':
      return <hr className="document-hr" />;

    case 'table':
      return (
        <div className="document-table-container">
          <table className="document-table">
            <tbody>{renderChildren(node)}</tbody>
          </table>
        </div>
      );

    case 'tableRow':
      return <tr className="document-table-row">{renderChildren(node)}</tr>;

    case 'tableCell':
      return <td className="document-table-cell">{renderChildren(node)}</td>;

    default:
      // Use a span instead of div to avoid invalid nesting (e.g., div inside p)
      return <span className="document-unknown">{renderChildren(node)}</span>;
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
function renderChildren(node: DocumentNode): JSX.Element | null {
  // If the node has no children, return null
  if (!node.children || node.children.length === 0) {
    return null;
  }

  // Render each child node
  return (
    <>
      {node.children.map((child: DocumentNode, index: number) => (
        <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
      ))}
    </>
  );
}
