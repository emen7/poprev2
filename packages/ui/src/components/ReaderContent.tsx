/**
 * Reader Content Component
 * 
 * This component displays the document content with proper formatting.
 */

'use client';

import React, { useEffect } from 'react';
import { Document, ReaderConfig, Section, Paragraph } from '../models';

/**
 * Props for the ReaderContent component
 */
export interface ReaderContentProps {
  /**
   * The document to display
   */
  document: Document;

  /**
   * Reader configuration
   */
  config: ReaderConfig;

  /**
   * Currently active section ID
   */
  activeSection: string | null;

  /**
   * Callback when a section is selected
   */
  onSectionSelect: (sectionId: string) => void;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * The ReaderContent component
 */
export function ReaderContent({ 
  document, 
  config, 
  activeSection, 
  onSectionSelect,
  className = '' 
}: ReaderContentProps) {
  // Scroll to active section when it changes
  useEffect(() => {
    if (activeSection) {
      const element = window.document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  // Get extension components
  const extensionContentComponents = config.extensions.map(extensionId => {
    // This would be implemented to get custom content components from extensions
    // For now, we'll return null
    return null;
  }).filter(Boolean);

  // If there's an extension content component, use it
  if (extensionContentComponents.length > 0) {
    // In a real implementation, we would render the extension component here
    // For now, we'll just render the default content
  }

  return (
    <div className={`reader-content ${className}`}>
      {/* If we have the original content, use that */}
      {document.content ? (
        <OriginalContentRenderer content={document.content} />
      ) : (
        /* Otherwise, render from our document model */
        <SectionRenderer 
          sections={document.sections} 
          onSectionSelect={onSectionSelect}
        />
      )}
    </div>
  );
}

/**
 * Props for the OriginalContentRenderer component
 */
interface OriginalContentRendererProps {
  /**
   * The original content to render
   */
  content: any;
}

/**
 * Component for rendering the original content
 */
function OriginalContentRenderer({ content }: OriginalContentRendererProps) {
  // This would be a more sophisticated renderer that handles the original content format
  // For now, we'll just render a simple representation
  return (
    <div className="reader-original-content">
      {renderOriginalContent(content)}
    </div>
  );
}

/**
 * Render the original content
 * 
 * @param content The content to render
 * @returns JSX elements representing the content
 */
function renderOriginalContent(content: any): React.ReactNode {
  // If content is null or undefined, return null
  if (!content) {
    return null;
  }

  // If content is a string, return it
  if (typeof content === 'string') {
    return content;
  }

  // If content has children, render them
  if (content.children && Array.isArray(content.children)) {
    return (
      <>
        {content.children.map((child: any, index: number) => (
          <React.Fragment key={index}>
            {renderOriginalNode(child)}
          </React.Fragment>
        ))}
      </>
    );
  }

  // Otherwise, return null
  return null;
}

/**
 * Render an original content node
 * 
 * @param node The node to render
 * @returns JSX element representing the node
 */
function renderOriginalNode(node: any): React.ReactNode {
  // If node is null or undefined, return null
  if (!node) {
    return null;
  }

  // If node is a string, return it
  if (typeof node === 'string') {
    return node;
  }

  // Handle different node types
  switch (node.type) {
    case 'heading': {
      const headingNode = node as any;
      const text = getNodeText(node);
      const id = `heading-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      
      switch (headingNode.depth) {
        case 1:
          return <h1 id={id} className="reader-h1">{renderOriginalChildren(node)}</h1>;
        case 2:
          return <h2 id={id} className="reader-h2">{renderOriginalChildren(node)}</h2>;
        case 3:
          return <h3 id={id} className="reader-h3">{renderOriginalChildren(node)}</h3>;
        case 4:
          return <h4 id={id} className="reader-h4">{renderOriginalChildren(node)}</h4>;
        case 5:
          return <h5 id={id} className="reader-h5">{renderOriginalChildren(node)}</h5>;
        case 6:
          return <h6 id={id} className="reader-h6">{renderOriginalChildren(node)}</h6>;
        default:
          return <h3 id={id} className="reader-h3">{renderOriginalChildren(node)}</h3>;
      }
    }
    
    case 'paragraph':
      return <p className="reader-paragraph">{renderOriginalChildren(node)}</p>;
    
    case 'text':
      return node.value || '';
    
    case 'list':
      return (node as any).ordered ? (
        <ol className="reader-ordered-list">{renderOriginalChildren(node)}</ol>
      ) : (
        <ul className="reader-unordered-list">{renderOriginalChildren(node)}</ul>
      );
    
    case 'listItem':
      return <li className="reader-list-item">{renderOriginalChildren(node)}</li>;
    
    case 'link':
      return (
        <a 
          href={(node as any).url} 
          title={(node as any).title}
          target="_blank"
          rel="noopener noreferrer"
          className="reader-link"
        >
          {renderOriginalChildren(node)}
        </a>
      );
    
    case 'image':
      return (
        <img 
          src={(node as any).url} 
          alt={(node as any).alt || ''} 
          title={(node as any).title}
          className="reader-image"
        />
      );
    
    case 'blockquote':
      return <blockquote className="reader-blockquote">{renderOriginalChildren(node)}</blockquote>;
    
    case 'code':
      return (
        <pre className="reader-code-block">
          <code className={(node as any).lang ? `language-${(node as any).lang}` : ''}>
            {(node as any).value || renderOriginalChildren(node)}
          </code>
        </pre>
      );
    
    case 'inlineCode':
      return <code className="reader-inline-code">{(node as any).value || renderOriginalChildren(node)}</code>;
    
    case 'emphasis':
      return <em className="reader-emphasis">{renderOriginalChildren(node)}</em>;
    
    case 'strong':
      return <strong className="reader-strong">{renderOriginalChildren(node)}</strong>;
    
    case 'thematicBreak':
      return <hr className="reader-hr" />;
    
    case 'table':
      return (
        <div className="reader-table-container">
          <table className="reader-table">
            <tbody>{renderOriginalChildren(node)}</tbody>
          </table>
        </div>
      );
    
    case 'tableRow':
      return <tr className="reader-table-row">{renderOriginalChildren(node)}</tr>;
    
    case 'tableCell':
      return <td className="reader-table-cell">{renderOriginalChildren(node)}</td>;
    
    default:
      // Use a span instead of div to avoid invalid nesting (e.g., div inside p)
      return <span className="reader-unknown">{renderOriginalChildren(node)}</span>;
  }
}

/**
 * Render the children of an original content node
 * 
 * @param node The parent node
 * @returns JSX elements representing the node's children
 */
function renderOriginalChildren(node: any): React.ReactNode {
  if (!node.children || node.children.length === 0) {
    return null;
  }
  
  return (
    <>
      {node.children.map((child: any, index: number) => (
        <React.Fragment key={index}>
          {renderOriginalNode(child)}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Get the text content of a node
 * 
 * @param node The node to extract text from
 * @returns The text content of the node
 */
function getNodeText(node: any): string {
  if (node.type === 'text' && node.value) {
    return node.value;
  }
  
  if (node.children && node.children.length > 0) {
    return node.children.map(getNodeText).join('');
  }
  
  return '';
}

/**
 * Props for the SectionRenderer component
 */
interface SectionRendererProps {
  /**
   * The sections to render
   */
  sections: Section[];

  /**
   * Callback when a section is selected
   */
  onSectionSelect: (sectionId: string) => void;
}

/**
 * Component for rendering sections
 */
function SectionRenderer({ sections, onSectionSelect }: SectionRendererProps) {
  return (
    <div className="reader-sections">
      {sections.map(section => (
        <div key={section.id} className="reader-section">
          <h2 
            id={section.id} 
            className="reader-section-title"
            onClick={() => onSectionSelect(section.id)}
          >
            {section.title}
          </h2>

          {/* Render paragraphs */}
          {section.paragraphs.map(paragraph => (
            <ParagraphRenderer key={paragraph.id} paragraph={paragraph} />
          ))}

          {/* Render subsections */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="reader-subsections">
              <SectionRenderer 
                sections={section.subsections} 
                onSectionSelect={onSectionSelect}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Props for the ParagraphRenderer component
 */
interface ParagraphRendererProps {
  /**
   * The paragraph to render
   */
  paragraph: Paragraph;
}

/**
 * Component for rendering a paragraph
 */
function ParagraphRenderer({ paragraph }: ParagraphRendererProps) {
  return (
    <p id={paragraph.id} className="reader-paragraph">
      {paragraph.content}
      
      {/* Render references */}
      {paragraph.references.length > 0 && (
        <span className="reader-references">
          {paragraph.references.map(reference => (
            <span key={reference.id} className={`reader-reference reader-reference-${reference.type}`}>
              [{reference.targetDocumentId}:{reference.targetParagraphId}]
            </span>
          ))}
        </span>
      )}
    </p>
  );
}