import { jsx as _jsx } from 'react/jsx-runtime';
import { render, screen } from '@testing-library/react';
import { DocumentReader } from '../document-reader';
// Mock the TransformedDocument
const mockDocument = {
  content: {
    type: 'root',
    children: [
      {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'Test Document',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'This is a test document.',
          },
        ],
      },
    ],
  },
  metadata: {
    title: 'Test Document',
    author: 'Test Author',
    date: '2023-01-01',
    categories: ['test'],
    tags: ['test'],
  },
  html: '<h1>Test Document</h1><p>This is a test document.</p>',
};
describe('DocumentReader', () => {
  it('renders the document title', () => {
    render(_jsx(DocumentReader, { document: mockDocument }));
    // Check if the title is rendered
    expect(screen.getByText('Test Document')).toBeInTheDocument();
  });
  it('renders the document content', () => {
    render(_jsx(DocumentReader, { document: mockDocument }));
    // Check if the content is rendered
    expect(screen.getByText('This is a test document.')).toBeInTheDocument();
  });
  it('renders metadata when provided', () => {
    render(_jsx(DocumentReader, { document: mockDocument }));
    // Check if metadata is rendered
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });
  it('renders table of contents for documents with headings', () => {
    const documentWithMultipleHeadings = Object.assign(Object.assign({}, mockDocument), {
      content: {
        type: 'root',
        children: [
          {
            type: 'heading',
            depth: 1,
            children: [{ type: 'text', value: 'Main Title' }],
          },
          {
            type: 'heading',
            depth: 2,
            children: [{ type: 'text', value: 'Section 1' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', value: 'Content for section 1' }],
          },
          {
            type: 'heading',
            depth: 2,
            children: [{ type: 'text', value: 'Section 2' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', value: 'Content for section 2' }],
          },
        ],
      },
    });
    render(_jsx(DocumentReader, { document: documentWithMultipleHeadings }));
    // Check if table of contents is rendered
    expect(screen.getByText('Table of Contents')).toBeInTheDocument();
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });
});
//# sourceMappingURL=document-reader.test.js.map
