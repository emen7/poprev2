import React, { useState } from 'react';
import { UBContentRenderer } from '../content/UBContentRenderer';
import './UBContentRendererExample.css';

/**
 * Example component demonstrating the UB content renderer
 */
export const UBContentRendererExample: React.FC = () => {
  // State for paper ID
  const [paperId, setPaperId] = useState<string>('1');

  // State for section ID
  const [sectionId, setSectionId] = useState<string>('1');

  // State for formatting type
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

  // Handle paper ID change
  const handlePaperIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPaperId(value);
    }
  };

  // Handle section ID change
  const handleSectionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSectionId(value);
    }
  };

  return (
    <div className="ub-content-renderer-example">
      <div className="example-header">
        <h1>UB Content Renderer Example</h1>
        <p>
          This example demonstrates the UB content renderer with paragraph numbering. Enter a paper
          ID and section ID to load content.
        </p>

        <div className="example-controls">
          <div className="control-group">
            <label>Paper ID:</label>
            <input
              type="text"
              value={paperId}
              onChange={handlePaperIdChange}
              placeholder="Enter paper ID"
            />
          </div>

          <div className="control-group">
            <label>Section ID:</label>
            <input
              type="text"
              value={sectionId}
              onChange={handleSectionIdChange}
              placeholder="Enter section ID"
            />
          </div>

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

          <div className="control-group">
            <button
              className="load-button"
              onClick={() => {
                // Force a re-render by setting the highlighted paragraph ID to undefined
                setHighlightedParagraphId(undefined);
              }}
            >
              Load Content
            </button>
          </div>
        </div>
      </div>

      <div className="example-content">
        <UBContentRenderer
          paperId={paperId}
          sectionId={sectionId}
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

export default UBContentRendererExample;
