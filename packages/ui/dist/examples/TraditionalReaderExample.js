import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
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
  const handleSectionChange = sectionId => {
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
  return _jsxs(ReaderLayout, {
    headerContent: _jsx(Header, {
      leftContent: _jsx('button', {
        className: 'header-button',
        onClick: handleMenuToggle,
        children: _jsx('i', { className: 'fas fa-book' }),
      }),
      centerContent: _jsxs('div', {
        className: 'header-title-container',
        children: [
          _jsx('h1', { className: 'header-title', children: 'The Urantia Book' }),
          _jsx('div', {
            className: 'header-subtitle',
            children: _jsx('a', {
              href: '/papers',
              className: 'header-subtitle-link',
              children: 'View All Papers',
            }),
          }),
        ],
      }),
      rightContent: _jsx('button', {
        className: 'header-button',
        onClick: handleSettingsToggle,
        children: _jsx('i', { className: 'fas fa-cog' }),
      }),
    }),
    showSidePanel: sidebarOpen,
    sidePanelContent: _jsxs('div', {
      className: 'sidebar-content',
      children: [
        _jsx('h2', { className: 'sidebar-title', children: 'Table of Contents' }),
        _jsx(TableOfContents, {
          items: mockTOC,
          currentItemId: currentSectionId,
          onItemSelect: handleSectionChange,
          collapsible: true,
          autoExpandCurrent: true,
        }),
      ],
    }),
    footerContent: _jsx(Footer, {
      centerContent: _jsx(NavigationControls, {
        prevEnabled: true,
        nextEnabled: true,
        onPrevious: () => console.log('Previous'),
        onNext: () => console.log('Next'),
        showLabels: true,
      }),
    }),
    children: [
      _jsx(SidePanel, {
        isOpen: settingsOpen,
        onClose: () => setSettingsOpen(false),
        position: 'right',
        children: _jsxs('div', {
          className: 'settings-panel',
          children: [
            _jsx('h2', { className: 'settings-title', children: 'Settings' }),
            _jsx(FormatToggle, {
              currentFormat: formatType,
              onChange: setFormatType,
              showDescription: true,
              showPreview: true,
            }),
          ],
        }),
      }),
      _jsxs('div', {
        className: 'reader-main',
        children: [
          _jsx(Breadcrumbs, { items: mockBreadcrumbs }),
          _jsx(ContentContainer, {
            width: 'medium',
            centered: true,
            padding: 'normal',
            children: _jsx(ContentRenderer, {
              content: mockDocument,
              formatType: formatType,
              showParagraphNumbers: true,
              highlightedSections: [],
              onSectionVisible: sectionId => console.log(`Section visible: ${sectionId}`),
            }),
          }),
        ],
      }),
    ],
  });
}
export default TraditionalReaderExample;
//# sourceMappingURL=TraditionalReaderExample.js.map
