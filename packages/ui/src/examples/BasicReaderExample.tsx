import React, { useState, useEffect } from 'react';
import { AppStateProvider, useNavigation } from '@ub-ecosystem/state-management';
import { ContentContainer } from '../layout/ContentContainer';
import { ContentRenderer } from '../content/ContentRenderer';
import { mockDocument } from '../content/mockDocument';
import './BasicReaderExample.css';

/**
 * BasicReaderExampleContent Component
 *
 * This is the inner component that uses the state management hooks.
 */
function BasicReaderExampleContent() {
  // State from state management
  const { currentSectionId, setCurrentSection, updateSectionTitle } = useNavigation();

  // Local state for format type (default to Traditional as per requirements)
  const [formatType, setFormatType] = useState<'traditional' | 'modern'>('traditional');

  // State for paragraph numbering
  const [showNumbers, setShowNumbers] = useState(true);

  // State for highlighted sections and paragraphs
  const [highlightedSections, setHighlightedSections] = useState<string[]>([]);
  const [highlightedParagraphs, setHighlightedParagraphs] = useState<string[]>([]);

  // Update navigation state when a section becomes visible
  useEffect(() => {
    if (currentSectionId) {
      const section = mockDocument.sections.find(s => s.id === currentSectionId);
      if (section) {
        updateSectionTitle(section.title);
      }
    }
  }, [currentSectionId, updateSectionTitle]);

  // Toggle format type (keeping the toggle for future use, but focusing on Traditional for now)
  const toggleFormat = () => {
    setFormatType(prev => (prev === 'traditional' ? 'modern' : 'traditional'));
    // Note: Modern formatting will be carefully worked on later in the implementation
    if (formatType === 'traditional') {
      console.log(
        'Note: Modern formatting is a future enhancement. Focus is on Traditional formatting for now.'
      );
    }
  };

  // Toggle paragraph numbering
  const toggleNumbers = () => {
    setShowNumbers(prev => !prev);
  };

  // Toggle section highlighting (for demo purposes)
  const toggleSectionHighlight = (sectionId: string) => {
    setHighlightedSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  // Toggle paragraph highlighting (for demo purposes)
  const toggleParagraphHighlight = (paragraphId: string) => {
    setHighlightedParagraphs(prev =>
      prev.includes(paragraphId) ? prev.filter(id => id !== paragraphId) : [...prev, paragraphId]
    );
  };

  return (
    <div className="basic-reader-example">
      <div className="reader-controls">
        <h2>Reader Controls</h2>
        <div className="control-group">
          <button onClick={toggleFormat}>
            Format: {formatType === 'traditional' ? 'Traditional' : 'Modern'}
          </button>
          <button onClick={toggleNumbers}>Numbers: {showNumbers ? 'On' : 'Off'}</button>
        </div>

        <div className="control-group">
          <h3>State Management</h3>
          <div>
            <span>Current Section ID: {currentSectionId || 'None'}</span>
          </div>
        </div>

        <div className="control-group">
          <h3>Highlight Sections</h3>
          {mockDocument.sections.map(section => (
            <button
              key={section.id}
              onClick={() => toggleSectionHighlight(section.id)}
              className={highlightedSections.includes(section.id) ? 'active' : ''}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="control-group">
          <h3>Highlight Paragraphs</h3>
          <button
            onClick={() => toggleParagraphHighlight('para-1-1')}
            className={highlightedParagraphs.includes('para-1-1') ? 'active' : ''}
          >
            Paragraph 1.1
          </button>
          <button
            onClick={() => toggleParagraphHighlight('para-2-2')}
            className={highlightedParagraphs.includes('para-2-2') ? 'active' : ''}
          >
            Paragraph 2.2
          </button>
          <button
            onClick={() => toggleParagraphHighlight('para-3-2')}
            className={highlightedParagraphs.includes('para-3-2') ? 'active' : ''}
          >
            Paragraph 3.2
          </button>
        </div>
      </div>

      <div className="reader-content">
        <ContentContainer width="medium" centered padding="normal">
          <ContentRenderer
            content={mockDocument}
            formatType={formatType}
            showParagraphNumbers={showNumbers}
            highlightedSections={highlightedSections}
            highlightedParagraphs={highlightedParagraphs}
            onSectionVisible={sectionId => {
              console.log(`Section visible: ${sectionId}`);
              setCurrentSection(sectionId);
            }}
            onParagraphVisible={paragraphId => {
              console.log(`Paragraph visible: ${paragraphId}`);
            }}
          />
        </ContentContainer>
      </div>
    </div>
  );
}

/**
 * BasicReaderExample Component
 *
 * A simple example that demonstrates the basic reading experience
 * with the ContentRenderer component, now integrated with the state
 * management system.
 */
export function BasicReaderExample() {
  return (
    <AppStateProvider documentId="basic-reader-example">
      <BasicReaderExampleContent />
    </AppStateProvider>
  );
}

export default BasicReaderExample;
