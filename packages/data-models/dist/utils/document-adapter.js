/**
 * Document Adapter
 *
 * This file provides utilities for adapting between the existing TransformedDocument
 * and our new Document model.
 */
/**
 * Adapter for converting between TransformedDocument and Document
 */
export class DocumentAdapter {
  /**
   * Convert a TransformedDocument to our Document model
   *
   * @param transformedDocument The transformed document to convert
   * @returns A Document object
   */
  static fromTransformedDocument(transformedDocument) {
    // Extract metadata
    const metadata = this.convertMetadata(transformedDocument.metadata);
    // Generate a unique ID for the document
    const id = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    // Extract sections from the content
    const sections = this.extractSections(transformedDocument.content);
    return {
      id,
      title: metadata.title || 'Untitled Document',
      type: 'main',
      sections,
      relationships: [],
      metadata,
      content: transformedDocument.content,
    };
  }
  /**
   * Convert our Document model to a TransformedDocument
   *
   * @param document The document to convert
   * @returns A TransformedDocument object
   */
  static toTransformedDocument(document) {
    // If the original content is available, use it
    if (document.content) {
      return {
        content: document.content,
        metadata: document.metadata,
        html: undefined,
        text: undefined,
      };
    }
    // Otherwise, construct a new content structure
    const content = this.constructContent(document);
    return {
      content,
      metadata: document.metadata,
      html: undefined,
      text: undefined,
    };
  }
  /**
   * Convert metadata from TransformedDocument to our DocumentMetadata
   *
   * @param metadata The metadata to convert
   * @returns DocumentMetadata
   */
  static convertMetadata(metadata) {
    return Object.assign(
      {
        title: metadata.title,
        subtitle: metadata.subtitle,
        author: metadata.author,
        date: metadata.date,
        categories: metadata.categories,
        tags: metadata.tags,
        relatedContent: metadata.relatedContent,
      },
      metadata
    );
  }
  /**
   * Extract sections from the content
   *
   * @param content The content to extract sections from
   * @returns Array of sections
   */
  static extractSections(content) {
    const sections = [];
    let currentSection = null;
    // Function to process nodes recursively
    const processNode = (node, depth = 0) => {
      // If it's a heading, create a new section
      if (node.type === 'heading') {
        const headingNode = node;
        const headingText = this.getNodeText(node);
        const sectionId = `section-${headingText
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')}`;
        // Create a new section
        const newSection = {
          id: sectionId,
          title: headingText,
          paragraphs: [],
          subsections: [],
        };
        // If it's a top-level heading (h1 or h2), add it to the main sections array
        if (headingNode.depth <= 2) {
          sections.push(newSection);
          currentSection = newSection;
        }
        // Otherwise, add it as a subsection of the current section
        else if (currentSection) {
          currentSection.subsections = currentSection.subsections || [];
          currentSection.subsections.push(newSection);
        }
      }
      // If it's a paragraph, add it to the current section
      else if (node.type === 'paragraph') {
        const paragraphText = this.getNodeText(node);
        const paragraphId = `paragraph-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const paragraph = {
          id: paragraphId,
          content: paragraphText,
          references: [],
        };
        // If we have a current section, add the paragraph to it
        if (currentSection) {
          currentSection.paragraphs.push(paragraph);
        }
        // Otherwise, create a default section
        else {
          const defaultSection = {
            id: 'section-default',
            title: 'Default Section',
            paragraphs: [paragraph],
            subsections: [],
          };
          sections.push(defaultSection);
          currentSection = defaultSection;
        }
      }
      // Process children recursively
      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          processNode(child, depth + 1);
        }
      }
    };
    // Process all nodes in the content
    if (content.children && content.children.length > 0) {
      for (const child of content.children) {
        processNode(child);
      }
    }
    return sections;
  }
  /**
   * Construct content from a Document
   *
   * @param document The document to construct content from
   * @returns A RootNode
   */
  static constructContent(document) {
    // Create a root node
    const rootNode = {
      type: 'root',
      children: [],
    };
    // Function to add a section to the content
    const addSection = (section, depth = 1) => {
      // Add a heading for the section
      const headingNode = {
        type: 'heading',
        depth: Math.min(depth, 6),
        children: [
          {
            type: 'text',
            value: section.title,
          },
        ],
      };
      rootNode.children.push(headingNode);
      // Add paragraphs
      for (const paragraph of section.paragraphs) {
        const paragraphNode = {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: paragraph.content,
            },
          ],
        };
        rootNode.children.push(paragraphNode);
      }
      // Add subsections recursively
      if (section.subsections && section.subsections.length > 0) {
        for (const subsection of section.subsections) {
          addSection(subsection, depth + 1);
        }
      }
    };
    // Add all sections
    for (const section of document.sections) {
      addSection(section);
    }
    return rootNode;
  }
  /**
   * Get the text content of a node
   *
   * @param node The node to extract text from
   * @returns The text content of the node
   */
  static getNodeText(node) {
    if (node.type === 'text' && node.value) {
      return node.value;
    }
    if (node.children && node.children.length > 0) {
      return node.children.map(this.getNodeText.bind(this)).join('');
    }
    return '';
  }
}
//# sourceMappingURL=document-adapter.js.map
