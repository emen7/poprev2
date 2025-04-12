/**
 * Tests for the document module
 */

import { createDocument, createSection, createParagraph, createReference } from '../';
import { ReferenceType } from '../../types/document';

describe('Document Module', () => {
  describe('createDocument', () => {
    it('should create a document with the provided values', () => {
      const document = createDocument('doc-1', 'Test Document');

      expect(document).toEqual({
        id: 'doc-1',
        title: 'Test Document',
        sections: [],
        metadata: {},
      });
    });

    it('should create a document with sections and metadata', () => {
      const sections = [createSection('section-1', 'Section 1', 1, [])];
      const metadata = {
        author: 'Test Author',
        language: 'en',
      };

      const document = createDocument('doc-1', 'Test Document', sections, metadata);

      expect(document).toEqual({
        id: 'doc-1',
        title: 'Test Document',
        sections,
        metadata,
      });
    });
  });

  describe('createSection', () => {
    it('should create a section with the provided values', () => {
      const section = createSection('section-1', 'Section 1', 1);

      expect(section).toEqual({
        id: 'section-1',
        title: 'Section 1',
        number: 1,
        paragraphs: [],
      });
    });

    it('should create a section with paragraphs', () => {
      const paragraphs = [createParagraph('para-1', 1, 'Paragraph 1')];

      const section = createSection('section-1', 'Section 1', 1, paragraphs);

      expect(section).toEqual({
        id: 'section-1',
        title: 'Section 1',
        number: 1,
        paragraphs,
      });
    });
  });

  describe('createParagraph', () => {
    it('should create a paragraph with the provided values', () => {
      const paragraph = createParagraph('para-1', 1, 'Paragraph 1');

      expect(paragraph).toEqual({
        id: 'para-1',
        number: 1,
        text: 'Paragraph 1',
        references: [],
      });
    });

    it('should create a paragraph with references', () => {
      const references = [createReference(ReferenceType.INTERNAL, 'doc-2', 'Document 2')];

      const paragraph = createParagraph('para-1', 1, 'Paragraph 1', references);

      expect(paragraph).toEqual({
        id: 'para-1',
        number: 1,
        text: 'Paragraph 1',
        references,
      });
    });
  });

  describe('createReference', () => {
    it('should create a reference with the provided values', () => {
      const reference = createReference(ReferenceType.INTERNAL, 'doc-2', 'Document 2');

      expect(reference).toEqual({
        type: ReferenceType.INTERNAL,
        target: 'doc-2',
        text: 'Document 2',
      });
    });
  });
});
