/**
 * Document Reader Component
 *
 * This component displays a transformed document with proper formatting and navigation.
 */

'use client';

import React, { useState } from 'react';
import { TransformedDocument, DocumentNode } from '@ub-ecosystem/content-transformer';
import './document-reader.css';

interface DocumentReaderProps {
  document: TransformedDocument;
}

export function DocumentReader({ document }: DocumentReaderProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Extract table of contents from the document
  const tableOfContents = extractTableOfContents(document.content);
  
  return (
    <div className="document-reader">
      <div className="document-reader-header">
        <h1 className="document-title">{document.metadata.title || 'Untitled Document'}</h1>
        {document.metadata.subtitle && (
          <h2 className="document-subtitle">{document.metadata.subtitle}</h2>
        )}
        <div className="document-metadata">
          {document.metadata.author && (
            <div className="document-author">
              By: {Array.isArray(document.metadata.author) 
                ? document.metadata.author.join(', ') 
                : document.metadata.author}
            </div>
          )}
          {document.metadata.date && (
            <div className="document-date">{document.metadata.date}</div>
          )}
          {document.metadata.categories && document.metadata.categories.length > 0 && (
            <div className="document-categories">
              Categories: {document.metadata.categories.join(', ')}
            </div>
          )}
          {document.metadata.tags && document.metadata.tags.length > 0 && (
            <div className="document-tags">
              Tags: {document.metadata.tags.join(', ')}
            </div>
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
                className={`toc-item toc-level-${item.level} ${activeSection === item.id ? 'active' : ''}`}
              >
                <a 
                  href={`#${item.id}`}
                  onClick={(e) => {
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
      
      <div className="document-content">
        {renderContent(document.content)}
      </div>
    </div>
  );
}

/**
 * Extract table of contents from the document
 * 
 * @param rootNode The root node of the document
 * @returns Array of table of contents items
 */
function extractTableOfContents(rootNode: any) {
  const toc: Array<{ id: string; text: string; level: number }> = [];
  
  // Function to traverse the document and find headings
  function traverse(node: DocumentNode) {
    if (node.type === 'heading') {
      const headingNode = node as any;
      const text = getNodeText(node);
      const id = `heading-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      
      toc.push({
        id,
        text,
        level: headingNode.depth
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
function getNodeText(node: DocumentNode): string {
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
function renderContent(rootNode: any) {
  const children = rootNode.children || [];
  
  return (
    <>
      {children.map((node: DocumentNode, index: number) => (
        <React.Fragment key={index}>
          {renderNode(node)}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Render a single node
 * 
 * @param node The node to render
 * @returns JSX element representing the node
 */
function renderNode(node: DocumentNode) {
  switch (node.type) {
    case 'heading': {
      const headingNode = node as any;
      const text = getNodeText(node);
      const id = `heading-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      
      switch (headingNode.depth) {
        case 1:
          return <h1 id={id} className="document-h1">{renderChildren(node)}</h1>;
        case 2:
          return <h2 id={id} className="document-h2">{renderChildren(node)}</h2>;
        case 3:
          return <h3 id={id} className="document-h3">{renderChildren(node)}</h3>;
        case 4:
          return <h4 id={id} className="document-h4">{renderChildren(node)}</h4>;
        case 5:
          return <h5 id={id} className="document-h5">{renderChildren(node)}</h5>;
        case 6:
          return <h6 id={id} className="document-h6">{renderChildren(node)}</h6>;
        default:
          return <h3 id={id} className="document-h3">{renderChildren(node)}</h3>;
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
      return <code className="document-inline-code">{(node as any).value || renderChildren(node)}</code>;
    
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
 * @param node The parent node
 * @returns JSX elements representing the node's children
 */
function renderChildren(node: DocumentNode) {
  if (!node.children || node.children.length === 0) {
    return null;
  }
  
  return (
    <>
      {node.children.map((child: DocumentNode, index: number) => (
        <React.Fragment key={index}>
          {renderNode(child)}
        </React.Fragment>
      ))}
    </>
  );
}