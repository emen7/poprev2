import React, { useState } from 'react';
import { ContentContainer } from '../layout/ContentContainer';
import { ContentRenderer } from '../content/ContentRenderer';
import { Header } from '../layout/header';
import { Footer } from '../layout/Footer';
import { NavigationControls } from '../navigation/NavigationControls';
import { TableOfContents, TOCItem } from '../navigation/TableOfContents';
import { mockDocument } from '../content/mockDocument';
import './NavigationExample.css';

/**
 * NavigationExample Component
 *
 * A simple example that demonstrates the essential navigation features:
 * - Header with navigation controls
 * - Table of contents with section linking
 * - Prev/next navigation
 * - Footer with navigation information
 */
export function NavigationExample() {
  // State for format type
  const [formatType, setFormatType] = useState<'traditional' | 'modern'>('traditional');

  // State for paragraph numbering
  const [showNumbers, setShowNumbers] = useState(true);

  // State for current section
  const [currentSectionId, setCurrentSectionId] = useState(mockDocument.sections[0].id);

  // Generate table of contents items from the mock document
  const tocItems: TOCItem[] = mockDocument.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: 0,
    children: [],
  }));

  // Find the current section index
  const currentSectionIndex = mockDocument.sections.findIndex(
    section => section.id === currentSectionId
  );

  // Determine if prev/next navigation is available
  const hasPrevious = currentSectionIndex > 0;
  const hasNext = currentSectionIndex < mockDocument.sections.length - 1;

  // Handle navigation to previous section
  const handlePrevious = () => {
    if (hasPrevious) {
      setCurrentSectionId(mockDocument.sections[currentSectionIndex - 1].id);
    }
  };

  // Handle navigation to next section
  const handleNext = () => {
    if (hasNext) {
      setCurrentSectionId(mockDocument.sections[currentSectionIndex + 1].id);
    }
  };

  // Handle TOC item selection
  const handleTocItemSelect = (itemId: string) => {
    setCurrentSectionId(itemId);
  };

  // Toggle format type
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

  // Filter the document to show only the current section
  const currentSection = mockDocument.sections.find(section => section.id === currentSectionId);
  const filteredDocument = {
    ...mockDocument,
    sections: currentSection ? [currentSection] : [],
  };

  // Create header content
  const headerLeftContent = (
    <NavigationControls
      prevEnabled={hasPrevious}
      nextEnabled={hasNext}
      onPrevious={handlePrevious}
      onNext={handleNext}
      size="small"
    />
  );

  const headerCenterContent = <h1 className="reader-title">{mockDocument.title}</h1>;

  const headerRightContent = (
    <div className="reader-controls">
      <button onClick={toggleFormat} className="reader-control-button">
        {formatType === 'traditional' ? 'Traditional' : 'Modern'}
      </button>
      <button onClick={toggleNumbers} className="reader-control-button">
        {showNumbers ? 'Hide Numbers' : 'Show Numbers'}
      </button>
    </div>
  );

  // Create footer content
  const footerLeftContent = (
    <div className="reader-section-info">
      Section {currentSectionIndex + 1} of {mockDocument.sections.length}
    </div>
  );

  const footerRightContent = (
    <NavigationControls
      prevEnabled={hasPrevious}
      nextEnabled={hasNext}
      onPrevious={handlePrevious}
      onNext={handleNext}
      size="small"
      showLabels
    />
  );

  return (
    <div className="navigation-example">
      <Header
        leftContent={headerLeftContent}
        centerContent={headerCenterContent}
        rightContent={headerRightContent}
      />

      <div className="reader-body">
        <aside className="reader-sidebar">
          <TableOfContents
            items={tocItems}
            currentItemId={currentSectionId}
            onItemSelect={handleTocItemSelect}
            maxHeight="calc(100vh - 120px)"
          />
        </aside>

        <main className="reader-main">
          <ContentContainer width="medium" centered padding="normal">
            <ContentRenderer
              content={filteredDocument}
              formatType={formatType}
              showParagraphNumbers={showNumbers}
              onSectionVisible={sectionId => {
                console.log(`Section visible: ${sectionId}`);
              }}
            />
          </ContentContainer>
        </main>
      </div>

      <Footer
        leftContent={footerLeftContent}
        rightContent={footerRightContent}
        showCopyright
        copyrightText={`© ${new Date().getFullYear()} UB Reader`}
      />
    </div>
  );
}

export default NavigationExample;
