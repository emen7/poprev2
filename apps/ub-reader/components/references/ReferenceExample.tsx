'use client';

import React, { useState } from &apos;react';

import type { UBReference } from './';
import { ReferenceProcessor } from './';

/**
 * Reference Example Component
 *
 * This component demonstrates how to use the ReferenceProcessor.
 */
export function ReferenceExample() {
  // Sample content with references
  const [content, setContent] = useState(`
    <h2>Reference Detection Example</h2>
    
    <p>
      This example demonstrates how the ReferenceProcessor component detects and links references
      to The Urantia Book. Here are some examples of references:
    </p>
    
    <h3>Full Format References</h3>
    <ul>
      <li>Paper 1, Section 3</li>
      <li>Paper 2, Section 1</li>
      <li>Paper 3, Section 2, paragraph 5</li>
    </ul>
    
    <h3>Short Format References</h3>
    <ul>
      <li>1:3</li>
      <li>2:1</li>
      <li>3:2.5</li>
    </ul>
    
    <h3>Dash Format References</h3>
    <ul>
      <li>1-3</li>
      <li>2-1</li>
      <li>3-2-5</li>
    </ul>
    
    <h3>Paper-Only References</h3>
    <ul>
      <li>Paper 1</li>
      <li>UB 2</li>
    </ul>
    
    <h3>Section-Only References (with context)</h3>
    <ul>
      <li>Section 3</li>
      <li>Section 1, paragraph 2</li>
    </ul>
    
    <p>
      When viewing Paper 1, a reference to &quot;Section 3" will be understood as &quot;Paper 1, Section 3"
      because the current paper context is applied.
    </p>
    
    <h3>Invalid References</h3>
    <ul>
      <li>Paper 999, Section 1</li>
      <li>Paper 1, Section 999</li>
    </ul>
  `);

  // Current paper for context
  const [currentPaper, setCurrentPaper] = useState(1);

  // Handle reference click
  const handleReferenceClick = (reference: UBReference, event: React.MouseEvent) => {
    // Removed console.log
    alert(
      `Clicked reference: ${reference.type} - Paper ${reference.paper}${
        reference.section ? `, Section ${reference.section}` : ''
      }${reference.paragraph ? `, Paragraph ${reference.paragraph}` : ''}`
    );
  };

  // Maximum sections per paper (for validation)
  const maxSections = {
    1: 7,
    2: 7,
    3: 6,
    // Add more as needed
  };

  return (
    <div className="reference-example">
      <div className="controls">
        <label>
          Current Paper Context:
          <select
            value={currentPaper}
            onChange={e => setCurrentPaper(parseInt(e.target.value, 10))}
          >
            <option value={0}>No Context</option>
            <option value={1}>Paper 1</option>
            <option value={2}>Paper 2</option>
            <option value={3}>Paper 3</option>
          </select>
        </label>
      </div>

      <div className="example-content">
        <ReferenceProcessor
          content={content}
          currentPaper={currentPaper}
          baseUrl="/paper"
          showTooltips={true}
          maxPapers={196}
          maxSections={maxSections}
          onReferenceClick={handleReferenceClick}
        />
      </div>

      <div className="example-notes">
        <h3>Notes:</h3>
        <ul>
          <li>Hover over references to see tooltips</li>
          <li>Click on references to trigger the click handler</li>
          <li>
            Change the current paper context to see how section-only references are interpreted
          </li>
          <li>Invalid references are shown in red</li>
        </ul>
      </div>

      <style jsx>{`
        .reference-example {
          font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            &apos;Segoe UI',
            Roboto,
            &apos;Helvetica Neue',
            Arial,
            sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .controls {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #f5f5f5;
          border-radius: 5px;
        }

        .controls select {
          margin-left: 10px;
          padding: 5px;
          border-radius: 3px;
          border: 1px solid #ccc;
        }

        .example-content {
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          background-color: white;
        }

        .example-notes {
          margin-top: 20px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 5px;
          border-left: 4px solid #0070f3;
        }

        @media (prefers-color-scheme: dark) {
          .controls {
            background-color: #2d3748;
            color: white;
          }

          .controls select {
            background-color: #1a202c;
            color: white;
            border-color: #4a5568;
          }

          .example-content {
            background-color: #1a202c;
            border-color: #4a5568;
            color: white;
          }

          .example-notes {
            background-color: #2d3748;
            color: white;
            border-left-color: #3291ff;
          }
        }
      `}</style>
    </div>
  );
}

export default ReferenceExample;
