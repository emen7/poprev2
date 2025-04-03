/**
 * DOM Utilities for Notation System
 *
 * This file provides utility functions for DOM manipulation
 * related to highlighting and text selection.
 */

import { Highlight } from '../models';

/**
 * Create an XPath for a node relative to a container
 *
 * @param node The node to create an XPath for
 * @param container The container element to create the XPath relative to
 * @returns The XPath string or null if it couldn't be created
 */
export function createXPath(node: Node, container: Node): string | null {
  // Check if the node is a text node
  if (node.nodeType === Node.TEXT_NODE) {
    // Get the parent element
    const parent = node.parentElement;
    if (!parent) return null;

    // Create XPath for the parent
    const parentXPath = createXPath(parent, container);
    if (!parentXPath) return null;

    // Find the index of this text node among its siblings
    let index = 0;
    let sibling = node.previousSibling;
    while (sibling) {
      if (sibling.nodeType === Node.TEXT_NODE) {
        index++;
      }
      sibling = sibling.previousSibling;
    }

    // Return the XPath with the text node index
    return `${parentXPath}/text()[${index + 1}]`;
  }

  // Handle element nodes
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;

    // If this is the container, return the root
    if (node === container) {
      return '.';
    }

    // Get the parent element
    const parent = element.parentElement;
    if (!parent) return null;

    // Create XPath for the parent
    const parentXPath = createXPath(parent, container);
    if (!parentXPath) return null;

    // Get the tag name
    const tagName = element.tagName.toLowerCase();

    // Find the index of this element among its siblings with the same tag
    let index = 0;
    let sibling = element.previousElementSibling;
    while (sibling) {
      if (sibling.tagName.toLowerCase() === tagName) {
        index++;
      }
      sibling = sibling.previousElementSibling;
    }

    // Return the XPath with the element index
    return `${parentXPath}/${tagName}[${index + 1}]`;
  }

  return null;
}

/**
 * Find a node by XPath relative to a container
 *
 * @param xpath The XPath to the node
 * @param container The container element to resolve the XPath from
 * @returns The node or null if it couldn't be found
 */
export function findNodeByXPath(xpath: string, container: Node): Node | null {
  try {
    const result = document.evaluate(
      xpath,
      container,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    return result.singleNodeValue;
  } catch (error) {
    console.error('Error finding node by XPath:', error);
    return null;
  }
}

/**
 * Create a highlight object from a selection
 *
 * @param selection The text selection
 * @param color The highlight color
 * @param container The container element
 * @returns A highlight object or null if it couldn't be created
 */
export function createHighlightFromSelection(
  selection: {
    text: string;
    range: Range;
    paperNumber: number;
    sectionId: string;
  },
  color: string,
  container: HTMLElement
): Omit<Highlight, 'id' | 'createdAt'> | null {
  try {
    const { text, range, paperNumber, sectionId } = selection;

    // Create XPaths for the start and end containers
    const startXPath = createXPath(range.startContainer, container);
    const endXPath = createXPath(range.endContainer, container);

    if (!startXPath || !endXPath) {
      console.error('Could not create XPaths for selection');
      return null;
    }

    // Create the highlight object
    return {
      paperNumber,
      sectionId,
      selectedText: text,
      color: color as any, // Type assertion needed here
      tags: [],
      startOffset: range.startOffset,
      endOffset: range.endOffset,
      startContainer: startXPath,
      endContainer: endXPath,
    };
  } catch (error) {
    console.error('Error creating highlight from selection:', error);
    return null;
  }
}

/**
 * Apply a highlight to the DOM
 *
 * @param highlight The highlight to apply
 * @param container The container element
 * @param onClick Callback function when the highlight is clicked
 * @returns The highlight element or null if it couldn't be applied
 */
export function applyHighlightToDOM(
  highlight: Highlight,
  container: HTMLElement,
  onClick: (id: string) => void
): HTMLElement | null {
  try {
    // Find the start and end nodes
    const startNode = findNodeByXPath(highlight.startContainer, container);
    const endNode = findNodeByXPath(highlight.endContainer, container);

    if (!startNode || !endNode) {
      console.error('Could not find nodes for highlight');
      return null;
    }

    // Create a range
    const range = document.createRange();
    range.setStart(startNode, highlight.startOffset);
    range.setEnd(endNode, highlight.endOffset);

    // Create the highlight element
    const highlightElement = document.createElement('span');
    highlightElement.className = `highlighted-text ${highlight.color}`;
    highlightElement.dataset.highlightId = highlight.id;

    // Add note indicator if there's a note
    if (highlight.noteId) {
      const noteIndicator = document.createElement('span');
      noteIndicator.className = 'note-indicator';
      highlightElement.appendChild(noteIndicator);
    }

    // Add click handler
    highlightElement.addEventListener('click', () => {
      onClick(highlight.id);
    });

    // Apply the highlight
    range.surroundContents(highlightElement);

    // Add margin indicator
    const marginIndicator = document.createElement('span');
    marginIndicator.className = `margin-indicator ${highlight.color}`;

    if (highlight.noteId) {
      marginIndicator.classList.add('has-note');
    }

    highlightElement.appendChild(marginIndicator);

    return highlightElement;
  } catch (error) {
    console.error('Error applying highlight to DOM:', error);
    return null;
  }
}
