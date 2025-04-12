import React, { useState } from 'react';

import { EnhancedReaderLayout } from '../layout';
import { TableOfContents, NavigationControls } from '../navigation';

import './EnhancedReaderDemo.css';

/**
 * EnhancedReaderDemo Component
 *
 * A demo component that showcases the EnhancedReaderLayout with sticky headers
 * and responsive navigation.
 */
export function EnhancedReaderDemo() {
  // Sample paper data
  const paper = {
    id: 'paper-1',
    title: 'Paper 1: The Origins of the Universe',
    sections: [
      {
        id: 'section-1',
        title: 'Section 1: Introduction',
        content: `
          <p>This is the introduction to the paper. It provides an overview of the topics that will be covered.</p>
          <p>The universe is vast and complex, with many mysteries yet to be uncovered.</p>
          <p>In this paper, we will explore some of the fundamental questions about the origins of the universe.</p>
        `,
      },
      {
        id: 'section-2',
        title: 'Section 2: The Big Bang Theory',
        content: `
          <p>The Big Bang theory is the prevailing cosmological model for the observable universe.</p>
          <p>According to this theory, the universe began as a singularity approximately 13.8 billion years ago.</p>
          <p>The initial singularity was followed by an exponential expansion known as cosmic inflation.</p>
          <p>This expansion explains why the universe appears to be homogeneous and isotropic on large scales.</p>
        `,
      },
      {
        id: 'section-3',
        title: 'Section 3: Evidence for the Big Bang',
        content: `
          <p>There are several key pieces of evidence that support the Big Bang theory:</p>
          <ul>
            <li>The cosmic microwave background radiation</li>
            <li>The abundance of light elements in the universe</li>
            <li>The redshift of distant galaxies</li>
            <li>The large-scale structure of the universe</li>
          </ul>
          <p>These observations provide strong support for the idea that the universe began with a hot, dense state and has been expanding ever since.</p>
        `,
      },
      {
        id: 'section-4',
        title: 'Section 4: Alternative Theories',
        content: `
          <p>While the Big Bang theory is widely accepted, there are alternative theories about the origins of the universe:</p>
          <ul>
            <li>Steady State theory</li>
            <li>Oscillating universe theory</li>
            <li>Multiverse theories</li>
            <li>String theory and M-theory</li>
          </ul>
          <p>These theories offer different perspectives on how the universe began and how it might end.</p>
        `,
      },
      {
        id: 'section-5',
        title: 'Section 5: Conclusion',
        content: `
          <p>The study of the origins of the universe is an ongoing endeavor in modern cosmology.</p>
          <p>As our technology and understanding improve, we continue to refine our models and theories.</p>
          <p>The quest to understand the beginning of everything remains one of the most profound scientific pursuits.</p>
        `,
      },
    ],
  };

  // State for current section
  const [currentSectionId, setCurrentSectionId] = useState(paper.sections[0].id);

  // TOC items for the sidebar
  const tocItems = paper.sections.map(section => ({
    id: section.id,
    title: section.title,
    level: 0,
  }));

  // Handle section change
  const handleSectionChange = (sectionId: string) => {
    setCurrentSectionId(sectionId);
  };

  // Handle TOC item selection
  const handleTocItemSelect = (itemId: string) => {
    setCurrentSectionId(itemId);
    // In a real app, you would scroll to the section here
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Create header content
  const headerContent = (
    <div className="demo-header-content">
      <h1 className="demo-header-title">UB Reader</h1>
      <NavigationControls
        prevEnabled={paper.sections.findIndex(section => section.id === currentSectionId) > 0}
        nextEnabled={
          paper.sections.findIndex(section => section.id === currentSectionId) <
          paper.sections.length - 1
        }
        onPrevious={() => {
          const currentIndex = paper.sections.findIndex(section => section.id === currentSectionId);
          if (currentIndex > 0) {
            handleSectionChange(paper.sections[currentIndex - 1].id);
          }
        }}
        onNext={() => {
          const currentIndex = paper.sections.findIndex(section => section.id === currentSectionId);
          if (currentIndex < paper.sections.length - 1) {
            handleSectionChange(paper.sections[currentIndex + 1].id);
          }
        }}
      />
    </div>
  );

  // Create footer content
  const footerContent = (
    <div className="demo-footer-content">
      <div className="demo-footer-info">
        <span>© 2025 UB Ecosystem</span>
      </div>
      <div className="demo-footer-controls">
        <button className="demo-footer-button">A-</button>
        <button className="demo-footer-button">A+</button>
        <button className="demo-footer-button">☰</button>
      </div>
    </div>
  );

  // Create side panel content
  const sidePanelContent = (
    <div className="demo-side-panel">
      <TableOfContents
        items={tocItems}
        currentItemId={currentSectionId}
        onItemSelect={handleTocItemSelect}
      />
    </div>
  );

  return (
    <EnhancedReaderLayout
      paperTitle={<h1 className="demo-paper-title">{paper.title}</h1>}
      sections={paper.sections}
      currentSectionId={currentSectionId}
      onSectionChange={handleSectionChange}
      headerContent={headerContent}
      footerContent={footerContent}
      sidePanelContent={sidePanelContent}
      showSidePanel={true}
      className="demo-reader"
    >
      <div className="demo-content">
        {paper.sections.map(section => (
          <div key={section.id} id={section.id} className="demo-section">
            <h2 className="demo-section-title">{section.title}</h2>
            <div
              className="demo-section-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </EnhancedReaderLayout>
  );
}

export default EnhancedReaderDemo;
