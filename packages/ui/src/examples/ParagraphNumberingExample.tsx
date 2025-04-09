import React, { useState } from 'react';
import { ParagraphContainer } from '../content/ParagraphContainer';
import { Paragraph } from '../content/ParagraphRenderer';
import './ParagraphNumberingExample.css';

/**
 * Example component demonstrating the paragraph numbering system
 */
export const ParagraphNumberingExample: React.FC = () => {
  // Sample paragraphs with notes
  const sampleParagraphs: Paragraph[] = [
    {
      id: 'p1',
      number: 1,
      text: 'This is the first paragraph of the example. It demonstrates the basic paragraph rendering with the new numbering system.',
      hasNotes: true,
    },
    {
      id: 'p2',
      number: 2,
      text: 'The second paragraph has no notes attached to it. Notice how the note indicator is not shown for this paragraph.',
    },
    {
      id: 'p3',
      number: 3,
      text: 'This paragraph has notes attached to it, so you can see the note indicator in the numbering column.',
      hasNotes: true,
    },
    {
      id: 'p4',
      number: 4,
      text: 'This is an indented paragraph, which might represent a quote or special section in the text.',
      metadata: {
        isIndented: true,
      },
    },
    {
      id: 'p5',
      number: 5,
      text: 'This is a numbered list item.',
      hasNotes: true,
      metadata: {
        isList: true,
        listType: 'numbered',
      },
    },
    {
      id: 'p6',
      number: 6,
      text: 'This is another numbered list item.',
      metadata: {
        isList: true,
        listType: 'numbered',
      },
    },
    {
      id: 'p7',
      number: 7,
      text: 'This is a bulleted list item.',
      metadata: {
        isList: true,
        listType: 'bulleted',
      },
    },
    {
      id: 'p8',
      number: 8,
      text: 'This is another bulleted list item with notes.',
      hasNotes: true,
      metadata: {
        isList: true,
        listType: 'bulleted',
      },
    },
    {
      id: 'p9',
      number: 9,
      text: 'This paragraph marks a topic change in the text.',
      metadata: {
        isTopicChange: true,
      },
    },
    {
      id: 'p10',
      number: 10,
      text: 'This is the final paragraph in our example, demonstrating the complete numbering system.',
      hasNotes: true,
    },
  ];

  // State for the formatting type
  const [formatType, setFormatType] = useState<'traditional' | 'modern'>('traditional');

  // State for vertical numbering
  const [useVerticalNumbering, setUseVerticalNumbering] = useState<boolean>(true);

  // State for highlighted paragraph
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | undefined>(
    undefined
  );

  // Handle paragraph click
  const handleParagraphClick = (paragraphId: string) => {
    setHighlightedParagraphId(paragraphId === highlightedParagraphId ? undefined : paragraphId);
  };

  return (
    <div className="paragraph-numbering-example">
      <div className="example-header">
        <h1>Paragraph Numbering Example</h1>
        <p>
          This example demonstrates the paragraph numbering system for the Urantia Book reader. The
          numbering column on the left shows paragraph numbers and note indicators.
        </p>

        <div className="example-controls">
          <div className="control-group">
            <label>Format Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="formatType"
                  value="traditional"
                  checked={formatType === 'traditional'}
                  onChange={() => setFormatType('traditional')}
                />
                Traditional
              </label>
              <label>
                <input
                  type="radio"
                  name="formatType"
                  value="modern"
                  checked={formatType === 'modern'}
                  onChange={() => setFormatType('modern')}
                />
                Modern
              </label>
            </div>
          </div>

          <div className="control-group">
            <label>Numbering Style:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="numberingStyle"
                  value="vertical"
                  checked={useVerticalNumbering}
                  onChange={() => setUseVerticalNumbering(true)}
                />
                Vertical Column
              </label>
              <label>
                <input
                  type="radio"
                  name="numberingStyle"
                  value="inline"
                  checked={!useVerticalNumbering}
                  onChange={() => setUseVerticalNumbering(false)}
                />
                Inline
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="example-content">
        <ParagraphContainer
          paragraphs={sampleParagraphs}
          formatType={formatType}
          useVerticalNumbering={useVerticalNumbering}
          highlightedParagraphId={highlightedParagraphId}
          onParagraphClick={handleParagraphClick}
        />
      </div>

      <div className="example-footer">
        <p>
          Click on a paragraph to highlight it. Use the toggle button in the bottom left to
          show/hide paragraph numbers.
        </p>
      </div>
    </div>
  );
};

export default ParagraphNumberingExample;
