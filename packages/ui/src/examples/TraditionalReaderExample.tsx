import React, { useState } from 'react';
import {
  ReaderLayout,
  ContentContainer,
  SidePanel,
  Header,
  Footer,
  TableOfContents,
  Breadcrumbs,
  NavigationControls,
  ContentRenderer,
  FormatToggle,
  useFormatting,
} from '../';
import './TraditionalReaderExample.css';

/**
 * TraditionalReaderExample
 *
 * A complete example showing how to use the unified UI components
 * to create a traditional reader interface.
 */
export function TraditionalReaderExample() {
  // State for the reader
  const { formatType, setFormatType } = useFormatting();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState('section1');

  // Mock data for the example
  const mockDocument = {
    id: 'paper1',
    title: 'Paper 1: The Universal Father',
    sections: [
      {
        id: 'section1',
        title: "The Father's Name",
        content: `
          <div class="paragraph">
            <span class="paragraph-number">1</span>
            <div class="paragraph-text">
              Of all the names by which God the Father is known throughout the universes, 
              those which designate him as the First Source and the Universe Center are most often encountered. 
              The First Father is known by various names in different universes and in different 
              sectors of the same universe. The names which the creature assigns to the Creator 
              are much dependent on the creature's concept of the Creator.
            </div>
          </div>
          <div class="paragraph">
            <span class="paragraph-number">2</span>
            <div class="paragraph-text">
              The First Source and Universe Center has never revealed himself by name, 
              only by nature. If we believe that we are the children of this Creator, 
              it is only natural that we should eventually call him Father. 
              But this is the name of our own choosing, and it grows out of the 
              recognition of our personal relationship with the First Source and Center.
            </div>
          </div>
        `,
      },
      {
        id: 'section2',
        title: 'The Reality of God',
        content: `
          <div class="paragraph">
            <span class="paragraph-number">1</span>
            <div class="paragraph-text">
              God is primal reality in the spirit world; God is the source of truth in the mind spheres; 
              God overshadows all throughout the material realms. To all created intelligences 
              God is a personality, and to the universe of universes he is the First Source 
              and Center of eternal reality.
            </div>
          </div>
          <div class="paragraph">
            <span class="paragraph-number">2</span>
            <div class="paragraph-text">
              God is not hidden from any of his creatures. He is unapproachable to so many 
              orders of beings only because he "dwells in a light which no material creature can approach." 
              The immensity and grandeur of the divine personality is beyond the grasp of the 
              unperfected mind of evolutionary mortals.
            </div>
          </div>
        `,
      },
    ],
  };

  const mockTOC = [
    {
      id: 'paper1',
      title: 'Paper 1: The Universal Father',
      level: 0,
      children: [
        {
          id: 'section1',
          title: "The Father's Name",
          level: 1,
        },
        {
          id: 'section2',
          title: 'The Reality of God',
          level: 1,
        },
      ],
    },
  ];

  const mockBreadcrumbs = [
    { id: 'home', title: 'Home', url: '/' },
    { id: 'papers', title: 'Papers', url: '/papers' },
    { id: 'paper1', title: 'Paper 1', url: '/paper/1' },
    {
      id: currentSectionId,
      title: currentSectionId === 'section1' ? "The Father's Name" : 'The Reality of God',
      isCurrent: true,
    },
  ];

  // Event handlers
  const handleSectionChange = (sectionId: string) => {
    setCurrentSectionId(sectionId);
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (settingsOpen) setSettingsOpen(false);
  };

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <ReaderLayout
      headerContent={
        <Header
          leftContent={
            <button className="header-button" onClick={handleMenuToggle}>
              <i className="fas fa-book"></i>
            </button>
          }
          centerContent={
            <div className="header-title-container">
              <h1 className="header-title">The Urantia Book</h1>
              <div className="header-subtitle">
                <a href="/papers" className="header-subtitle-link">
                  View All Papers
                </a>
              </div>
            </div>
          }
          rightContent={
            <button className="header-button" onClick={handleSettingsToggle}>
              <i className="fas fa-cog"></i>
            </button>
          }
        />
      }
      showSidePanel={sidebarOpen}
      sidePanelContent={
        <div className="sidebar-content">
          <h2 className="sidebar-title">Table of Contents</h2>
          <TableOfContents
            items={mockTOC}
            currentItemId={currentSectionId}
            onItemSelect={handleSectionChange}
            collapsible
            autoExpandCurrent
          />
        </div>
      }
      footerContent={
        <Footer
          centerContent={
            <NavigationControls
              prevEnabled={true}
              nextEnabled={true}
              onPrevious={() => console.log('Previous')}
              onNext={() => console.log('Next')}
              showLabels
            />
          }
        />
      }
    >
      {/* Settings Panel */}
      <SidePanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} position="right">
        <div className="settings-panel">
          <h2 className="settings-title">Settings</h2>
          <FormatToggle
            currentFormat={formatType}
            onChange={setFormatType}
            showDescription
            showPreview
          />
        </div>
      </SidePanel>

      {/* Main Content */}
      <div className="reader-main">
        <Breadcrumbs items={mockBreadcrumbs} />

        <ContentContainer width="medium" centered padding="normal">
          <ContentRenderer
            content={mockDocument}
            formatType={formatType}
            showParagraphNumbers={true}
            highlightedSections={[]}
            onSectionVisible={sectionId => console.log(`Section visible: ${sectionId}`)}
          />
        </ContentContainer>
      </div>
    </ReaderLayout>
  );
}

export default TraditionalReaderExample;
