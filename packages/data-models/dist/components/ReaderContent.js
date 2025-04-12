/**
 * Reader Content Component
 *
 * This component displays the document content with proper formatting.
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import React, { useEffect } from 'react';
/**
 * The ReaderContent component
 */
export function ReaderContent({
  document,
  config,
  activeSection,
  onSectionSelect,
  className = '',
}) {
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
  const extensionContentComponents = config.extensions
    .map(extensionId => {
      // This would be implemented to get custom content components from extensions
      // For now, we'll return null
      return null;
    })
    .filter(Boolean);
  // If there's an extension content component, use it
  if (extensionContentComponents.length > 0) {
    // In a real implementation, we would render the extension component here
    // For now, we'll just render the default content
  }
  return _jsx('div', {
    className: `reader-content ${className}`,
    children: document.content
      ? _jsx(OriginalContentRenderer, { content: document.content })
      : /* Otherwise, render from our document model */
        _jsx(SectionRenderer, { sections: document.sections, onSectionSelect: onSectionSelect }),
  });
}
/**
 * Component for rendering the original content
 */
function OriginalContentRenderer({ content }) {
  // This would be a more sophisticated renderer that handles the original content format
  // For now, we'll just render a simple representation
  return _jsx('div', {
    className: 'reader-original-content',
    children: renderOriginalContent(content),
  });
}
/**
 * Render the original content
 *
 * @param content The content to render
 * @returns JSX elements representing the content
 */
function renderOriginalContent(content) {
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
    return _jsx(_Fragment, {
      children: content.children.map((child, index) =>
        _jsx(React.Fragment, { children: renderOriginalNode(child) }, index)
      ),
    });
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
function renderOriginalNode(node) {
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
      const headingNode = node;
      const text = getNodeText(node);
      const id = `heading-${text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')}`;
      switch (headingNode.depth) {
        case 1:
          return _jsx('h1', {
            id: id,
            className: 'reader-h1',
            children: renderOriginalChildren(node),
          });
        case 2:
          return _jsx('h2', {
            id: id,
            className: 'reader-h2',
            children: renderOriginalChildren(node),
          });
        case 3:
          return _jsx('h3', {
            id: id,
            className: 'reader-h3',
            children: renderOriginalChildren(node),
          });
        case 4:
          return _jsx('h4', {
            id: id,
            className: 'reader-h4',
            children: renderOriginalChildren(node),
          });
        case 5:
          return _jsx('h5', {
            id: id,
            className: 'reader-h5',
            children: renderOriginalChildren(node),
          });
        case 6:
          return _jsx('h6', {
            id: id,
            className: 'reader-h6',
            children: renderOriginalChildren(node),
          });
        default:
          return _jsx('h3', {
            id: id,
            className: 'reader-h3',
            children: renderOriginalChildren(node),
          });
      }
    }
    case 'paragraph':
      return _jsx('p', { className: 'reader-paragraph', children: renderOriginalChildren(node) });
    case 'text':
      return node.value || '';
    case 'list':
      return node.ordered
        ? _jsx('ol', { className: 'reader-ordered-list', children: renderOriginalChildren(node) })
        : _jsx('ul', {
            className: 'reader-unordered-list',
            children: renderOriginalChildren(node),
          });
    case 'listItem':
      return _jsx('li', { className: 'reader-list-item', children: renderOriginalChildren(node) });
    case 'link':
      return _jsx('a', {
        href: node.url,
        title: node.title,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'reader-link',
        children: renderOriginalChildren(node),
      });
    case 'image':
      return _jsx('img', {
        src: node.url,
        alt: node.alt || '',
        title: node.title,
        className: 'reader-image',
      });
    case 'blockquote':
      return _jsx('blockquote', {
        className: 'reader-blockquote',
        children: renderOriginalChildren(node),
      });
    case 'code':
      return _jsx('pre', {
        className: 'reader-code-block',
        children: _jsx('code', {
          className: node.lang ? `language-${node.lang}` : '',
          children: node.value || renderOriginalChildren(node),
        }),
      });
    case 'inlineCode':
      return _jsx('code', {
        className: 'reader-inline-code',
        children: node.value || renderOriginalChildren(node),
      });
    case 'emphasis':
      return _jsx('em', { className: 'reader-emphasis', children: renderOriginalChildren(node) });
    case 'strong':
      return _jsx('strong', { className: 'reader-strong', children: renderOriginalChildren(node) });
    case 'thematicBreak':
      return _jsx('hr', { className: 'reader-hr' });
    case 'table':
      return _jsx('div', {
        className: 'reader-table-container',
        children: _jsx('table', {
          className: 'reader-table',
          children: _jsx('tbody', { children: renderOriginalChildren(node) }),
        }),
      });
    case 'tableRow':
      return _jsx('tr', { className: 'reader-table-row', children: renderOriginalChildren(node) });
    case 'tableCell':
      return _jsx('td', { className: 'reader-table-cell', children: renderOriginalChildren(node) });
    default:
      // Use a span instead of div to avoid invalid nesting (e.g., div inside p)
      return _jsx('span', { className: 'reader-unknown', children: renderOriginalChildren(node) });
  }
}
/**
 * Render the children of an original content node
 *
 * @param node The parent node
 * @returns JSX elements representing the node's children
 */
function renderOriginalChildren(node) {
  if (!node.children || node.children.length === 0) {
    return null;
  }
  return _jsx(_Fragment, {
    children: node.children.map((child, index) =>
      _jsx(React.Fragment, { children: renderOriginalNode(child) }, index)
    ),
  });
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
 * Component for rendering sections
 */
function SectionRenderer({ sections, onSectionSelect }) {
  return _jsx('div', {
    className: 'reader-sections',
    children: sections.map(section =>
      _jsxs(
        'div',
        {
          className: 'reader-section',
          children: [
            _jsx('h2', {
              id: section.id,
              className: 'reader-section-title',
              onClick: () => onSectionSelect(section.id),
              children: section.title,
            }),
            section.paragraphs.map(paragraph =>
              _jsx(ParagraphRenderer, { paragraph: paragraph }, paragraph.id)
            ),
            section.subsections &&
              section.subsections.length > 0 &&
              _jsx('div', {
                className: 'reader-subsections',
                children: _jsx(SectionRenderer, {
                  sections: section.subsections,
                  onSectionSelect: onSectionSelect,
                }),
              }),
          ],
        },
        section.id
      )
    ),
  });
}
/**
 * Component for rendering a paragraph
 */
function ParagraphRenderer({ paragraph }) {
  return _jsxs('p', {
    id: paragraph.id,
    className: 'reader-paragraph',
    children: [
      paragraph.content,
      paragraph.references.length > 0 &&
        _jsx('span', {
          className: 'reader-references',
          children: paragraph.references.map(reference =>
            _jsxs(
              'span',
              {
                className: `reader-reference reader-reference-${reference.type}`,
                children: ['[', reference.targetDocumentId, ':', reference.targetParagraphId, ']'],
              },
              reference.id
            )
          ),
        }),
    ],
  });
}
//# sourceMappingURL=ReaderContent.js.map
