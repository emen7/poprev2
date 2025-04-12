import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { UBReaderLayout, TableOfContents, SectionNavigator } from '../';
import './UBReaderDemo.css';
/**
 * UBReaderDemo Component
 *
 * A demo component that showcases the UBReaderLayout with all its features.
 */
export function UBReaderDemo({ title = 'UB Reader Demo' }) {
  // Sample TOC data
  const tocItems = [
    { id: 'paper1', title: 'Paper 1: Introduction', level: 1 },
    { id: 'paper2', title: 'Paper 2: Methodology', level: 1 },
    { id: 'paper3', title: 'Paper 3: Results', level: 1 },
    { id: 'paper4', title: 'Paper 4: Discussion', level: 1 },
    { id: 'paper5', title: 'Paper 5: Conclusion', level: 1 },
  ];
  // Sample section data
  const sections = [
    { id: 'section1', title: 'Introduction', level: 1 },
    { id: 'section2', title: 'Background', level: 2 },
    { id: 'section3', title: 'Methods', level: 1 },
    { id: 'section4', title: 'Results', level: 1 },
    { id: 'section5', title: 'Discussion', level: 1 },
    { id: 'section6', title: 'Conclusion', level: 1 },
  ];
  // State for active items
  const [activeTocItem, setActiveTocItem] = useState(tocItems[0].id);
  const [activeSection, setActiveSection] = useState(sections[0].id);
  // Sample notes data
  const [notes, setNotes] = useState([
    {
      id: 'note1',
      content: 'This is an important point to remember.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reference: 'Paper 3: Results',
    },
    {
      id: 'note2',
      content: 'Need to follow up on this methodology.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reference: 'Paper 2: Methodology',
    },
  ]);
  // Sample quotes data
  const [quotes, setQuotes] = useState([
    {
      id: 'quote1',
      content: 'The results indicate a significant correlation between variables A and B.',
      createdAt: new Date().toISOString(),
      reference: 'Paper 3: Results',
    },
    {
      id: 'quote2',
      content: 'Further research is needed to confirm these findings.',
      createdAt: new Date().toISOString(),
      reference: 'Paper 5: Conclusion',
    },
  ]);
  // Book navigation content
  const bookNavigationContent = _jsxs('div', {
    className: 'book-navigation',
    children: [
      _jsx('h2', { children: 'Book Navigation' }),
      _jsx(TableOfContents, {
        items: tocItems,
        currentItemId: activeTocItem,
        onItemSelect: itemId => setActiveTocItem(itemId),
      }),
    ],
  });
  // Section navigation content
  const sectionNavigationContent = _jsxs('div', {
    className: 'section-navigation',
    children: [
      _jsx('h2', { children: 'Section Navigation' }),
      _jsx(SectionNavigator, {
        sections: sections,
        currentSectionId: activeSection,
        onSectionChange: sectionId => setActiveSection(sectionId),
      }),
    ],
  });
  // Footer content
  const footerContent = _jsx('div', {
    className: 'footer-content',
    children: _jsx('p', { children: '\u00A9 2025 UB Reader | Terms of Service | Privacy Policy' }),
  });
  // Bottom panel tabs
  const bottomPanelTabs = [
    {
      id: 'notes',
      label: 'Notes',
      content: _jsxs('div', {
        className: 'notes-panel',
        children: [
          _jsx('h3', { children: 'Notes' }),
          notes.map(note =>
            _jsxs(
              'div',
              {
                className: 'note-item',
                children: [
                  _jsx('p', { className: 'note-content', children: note.content }),
                  _jsx('p', { className: 'note-reference', children: note.reference }),
                ],
              },
              note.id
            )
          ),
          _jsxs('div', {
            className: 'add-note',
            children: [
              _jsx('textarea', { placeholder: 'Add a new note...', rows: 3 }),
              _jsx('button', { children: 'Add Note' }),
            ],
          }),
        ],
      }),
    },
    {
      id: 'quotes',
      label: 'Quotes',
      content: _jsxs('div', {
        className: 'quotes-panel',
        children: [
          _jsx('h3', { children: 'Quotes' }),
          quotes.map(quote =>
            _jsxs(
              'div',
              {
                className: 'quote-item',
                children: [
                  _jsxs('p', { className: 'quote-content', children: ['"', quote.content, '"'] }),
                  _jsx('p', { className: 'quote-reference', children: quote.reference }),
                ],
              },
              quote.id
            )
          ),
        ],
      }),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: _jsxs('div', {
        className: 'settings-panel',
        children: [
          _jsx('h3', { children: 'Settings' }),
          _jsx('div', {
            className: 'setting-group',
            children: _jsxs('label', {
              children: [
                _jsx('span', { children: 'Theme:' }),
                _jsxs('select', {
                  children: [
                    _jsx('option', { value: 'light', children: 'Light' }),
                    _jsx('option', { value: 'dark', children: 'Dark' }),
                    _jsx('option', { value: 'sepia', children: 'Sepia' }),
                  ],
                }),
              ],
            }),
          }),
          _jsx('div', {
            className: 'setting-group',
            children: _jsxs('label', {
              children: [
                _jsx('span', { children: 'Font Size:' }),
                _jsxs('select', {
                  children: [
                    _jsx('option', { value: 'small', children: 'Small' }),
                    _jsx('option', { value: 'medium', children: 'Medium' }),
                    _jsx('option', { value: 'large', children: 'Large' }),
                  ],
                }),
              ],
            }),
          }),
          _jsx('div', {
            className: 'setting-group',
            children: _jsxs('label', {
              children: [_jsx('input', { type: 'checkbox' }), ' Show line numbers'],
            }),
          }),
        ],
      }),
    },
  ];
  // Sample content with scientific terms
  const sampleContent = _jsxs('div', {
    className: 'sample-content',
    children: [
      _jsx('h1', { children: 'Understanding Quantum Physics' }),
      _jsxs('p', {
        children: [
          'Modern physics is built upon two fundamental theories:',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'Quantum Entanglement',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'Quantum Entanglement' }),
                  _jsx('div', {
                    children:
                      'A physical phenomenon that occurs when a group of particles interact in such a way that the quantum state of each particle cannot be described independently of the state of the others',
                  }),
                ],
              }),
            ],
          }),
          'and relativity. The famous equation',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'E=mc\u00B2',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'E=mc\u00B2' }),
                  _jsx('div', { children: 'Energy equals mass times the speed of light squared' }),
                  _jsx('div', {
                    className: 'tooltip-simplified',
                    children: 'Energy and mass are equivalent and convertible',
                  }),
                ],
              }),
            ],
          }),
          "from Einstein's theory of relativity demonstrates the relationship between energy and mass.",
        ],
      }),
      _jsxs('p', {
        children: [
          'In molecular biology,',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'DNA',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'DNA' }),
                  _jsx('div', { children: 'Deoxyribonucleic Acid' }),
                  _jsx('div', {
                    className: 'tooltip-context',
                    children:
                      'The molecule that carries genetic information in all living organisms',
                  }),
                ],
              }),
            ],
          }),
          'and',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'RNA',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'RNA' }),
                  _jsx('div', { children: 'Ribonucleic Acid' }),
                  _jsx('div', {
                    className: 'tooltip-context',
                    children:
                      'A molecule similar to DNA that has various roles in the coding, decoding, regulation, and expression of genes',
                  }),
                ],
              }),
            ],
          }),
          'are essential molecules for life. They carry the genetic information that determines the development and functioning of all living organisms.',
        ],
      }),
      _jsx('h2', { children: 'Quantum Mechanics Principles' }),
      _jsx('p', {
        children:
          'Quantum mechanics describes the behavior of matter and energy at the atomic and subatomic scales. It introduces concepts like superposition, where particles can exist in multiple states simultaneously until measured.',
      }),
      _jsxs('p', {
        children: [
          'Another key concept is',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'Quantum Entanglement',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'Quantum Entanglement' }),
                  _jsx('div', {
                    children:
                      'A physical phenomenon that occurs when a group of particles interact in such a way that the quantum state of each particle cannot be described independently of the state of the others',
                  }),
                ],
              }),
            ],
          }),
          ', where particles become connected in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them.',
        ],
      }),
      _jsx('h2', { children: 'Relativity and Energy' }),
      _jsxs('p', {
        children: [
          "Einstein's special theory of relativity introduced the concept that energy and mass are equivalent, as expressed in the equation",
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'E=mc\u00B2',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'E=mc\u00B2' }),
                  _jsx('div', { children: 'Energy equals mass times the speed of light squared' }),
                  _jsx('div', {
                    className: 'tooltip-simplified',
                    children: 'Energy and mass are equivalent and convertible',
                  }),
                ],
              }),
            ],
          }),
          '. This relationship has profound implications for our understanding of the universe and has led to developments in nuclear energy and weapons.',
        ],
      }),
      _jsx('h2', { children: 'Molecular Biology' }),
      _jsxs('p', {
        children: [
          'The discovery of the structure of',
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'DNA',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'DNA' }),
                  _jsx('div', { children: 'Deoxyribonucleic Acid' }),
                  _jsx('div', {
                    className: 'tooltip-context',
                    children:
                      'The molecule that carries genetic information in all living organisms',
                  }),
                ],
              }),
            ],
          }),
          'by Watson and Crick in 1953 revolutionized our understanding of genetics. The double helix structure allows for the storage and transmission of genetic information.',
        ],
      }),
      _jsxs('p', {
        children: [
          _jsxs('span', {
            className: 'scientific-term',
            children: [
              'RNA',
              _jsxs('div', {
                className: 'scientific-tooltip',
                children: [
                  _jsx('div', { className: 'tooltip-title', children: 'RNA' }),
                  _jsx('div', { children: 'Ribonucleic Acid' }),
                  _jsx('div', {
                    className: 'tooltip-context',
                    children:
                      'A molecule similar to DNA that has various roles in the coding, decoding, regulation, and expression of genes',
                  }),
                ],
              }),
            ],
          }),
          ', while similar to DNA, plays different roles in the cell, including protein synthesis and gene regulation. In some viruses, RNA rather than DNA serves as the genetic material.',
        ],
      }),
    ],
  });
  return _jsx(UBReaderLayout, {
    title: title,
    bookNavigationContent: bookNavigationContent,
    sectionNavigationContent: sectionNavigationContent,
    footerContent: footerContent,
    showBottomPanel: true,
    bottomPanelTabs: bottomPanelTabs,
    bottomPanelInitialHeight: 300,
    children: sampleContent,
  });
}
export default UBReaderDemo;
//# sourceMappingURL=UBReaderDemo.js.map
