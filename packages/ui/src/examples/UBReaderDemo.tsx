import React, { useState } from 'react';

import { UBReaderLayout, TableOfContents, SectionNavigator } from '../';
import './UBReaderDemo.css';

export interface UBReaderDemoProps {
  /**
   * The title of the demo
   * @default 'UB Reader Demo'
   */
  title?: string;
}

/**
 * UBReaderDemo Component
 *
 * A demo component that showcases the UBReaderLayout with all its features.
 */
export function UBReaderDemo({ title = 'UB Reader Demo' }: UBReaderDemoProps) {
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
  const bookNavigationContent = (
    <div className="book-navigation">
      <h2>Book Navigation</h2>
      <TableOfContents
        items={tocItems}
        currentItemId={activeTocItem}
        onItemSelect={(itemId: string) => setActiveTocItem(itemId)}
      />
    </div>
  );

  // Section navigation content
  const sectionNavigationContent = (
    <div className="section-navigation">
      <h2>Section Navigation</h2>
      <SectionNavigator
        sections={sections}
        currentSectionId={activeSection}
        onSectionChange={(sectionId: string) => setActiveSection(sectionId)}
      />
    </div>
  );

  // Footer content
  const footerContent = (
    <div className="footer-content">
      <p>© 2025 UB Reader | Terms of Service | Privacy Policy</p>
    </div>
  );

  // Bottom panel tabs
  const bottomPanelTabs = [
    {
      id: 'notes',
      label: 'Notes',
      content: (
        <div className="notes-panel">
          <h3>Notes</h3>
          {notes.map(note => (
            <div key={note.id} className="note-item">
              <p className="note-content">{note.content}</p>
              <p className="note-reference">{note.reference}</p>
            </div>
          ))}
          <div className="add-note">
            <textarea placeholder="Add a new note..." rows={3} />
            <button>Add Note</button>
          </div>
        </div>
      ),
    },
    {
      id: 'quotes',
      label: 'Quotes',
      content: (
        <div className="quotes-panel">
          <h3>Quotes</h3>
          {quotes.map(quote => (
            <div key={quote.id} className="quote-item">
              <p className="quote-content">"{quote.content}"</p>
              <p className="quote-reference">{quote.reference}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="settings-panel">
          <h3>Settings</h3>
          <div className="setting-group">
            <label>
              <span>Theme:</span>
              <select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="sepia">Sepia</option>
              </select>
            </label>
          </div>
          <div className="setting-group">
            <label>
              <span>Font Size:</span>
              <select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
          <div className="setting-group">
            <label>
              <input type="checkbox" /> Show line numbers
            </label>
          </div>
        </div>
      ),
    },
  ];

  // Sample content with scientific terms
  const sampleContent = (
    <div className="sample-content">
      <h1>Understanding Quantum Physics</h1>

      <p>
        Modern physics is built upon two fundamental theories:
        <span className="scientific-term">
          Quantum Entanglement
          <div className="scientific-tooltip">
            <div className="tooltip-title">Quantum Entanglement</div>
            <div>
              A physical phenomenon that occurs when a group of particles interact in such a way
              that the quantum state of each particle cannot be described independently of the state
              of the others
            </div>
          </div>
        </span>
        and relativity. The famous equation
        <span className="scientific-term">
          E=mc²
          <div className="scientific-tooltip">
            <div className="tooltip-title">E=mc²</div>
            <div>Energy equals mass times the speed of light squared</div>
            <div className="tooltip-simplified">Energy and mass are equivalent and convertible</div>
          </div>
        </span>
        from Einstein's theory of relativity demonstrates the relationship between energy and mass.
      </p>

      <p>
        In molecular biology,
        <span className="scientific-term">
          DNA
          <div className="scientific-tooltip">
            <div className="tooltip-title">DNA</div>
            <div>Deoxyribonucleic Acid</div>
            <div className="tooltip-context">
              The molecule that carries genetic information in all living organisms
            </div>
          </div>
        </span>
        and
        <span className="scientific-term">
          RNA
          <div className="scientific-tooltip">
            <div className="tooltip-title">RNA</div>
            <div>Ribonucleic Acid</div>
            <div className="tooltip-context">
              A molecule similar to DNA that has various roles in the coding, decoding, regulation,
              and expression of genes
            </div>
          </div>
        </span>
        are essential molecules for life. They carry the genetic information that determines the
        development and functioning of all living organisms.
      </p>

      <h2>Quantum Mechanics Principles</h2>

      <p>
        Quantum mechanics describes the behavior of matter and energy at the atomic and subatomic
        scales. It introduces concepts like superposition, where particles can exist in multiple
        states simultaneously until measured.
      </p>

      <p>
        Another key concept is
        <span className="scientific-term">
          Quantum Entanglement
          <div className="scientific-tooltip">
            <div className="tooltip-title">Quantum Entanglement</div>
            <div>
              A physical phenomenon that occurs when a group of particles interact in such a way
              that the quantum state of each particle cannot be described independently of the state
              of the others
            </div>
          </div>
        </span>
        , where particles become connected in such a way that the quantum state of each particle
        cannot be described independently of the others, regardless of the distance separating them.
      </p>

      <h2>Relativity and Energy</h2>

      <p>
        Einstein's special theory of relativity introduced the concept that energy and mass are
        equivalent, as expressed in the equation
        <span className="scientific-term">
          E=mc²
          <div className="scientific-tooltip">
            <div className="tooltip-title">E=mc²</div>
            <div>Energy equals mass times the speed of light squared</div>
            <div className="tooltip-simplified">Energy and mass are equivalent and convertible</div>
          </div>
        </span>
        . This relationship has profound implications for our understanding of the universe and has
        led to developments in nuclear energy and weapons.
      </p>

      <h2>Molecular Biology</h2>

      <p>
        The discovery of the structure of
        <span className="scientific-term">
          DNA
          <div className="scientific-tooltip">
            <div className="tooltip-title">DNA</div>
            <div>Deoxyribonucleic Acid</div>
            <div className="tooltip-context">
              The molecule that carries genetic information in all living organisms
            </div>
          </div>
        </span>
        by Watson and Crick in 1953 revolutionized our understanding of genetics. The double helix
        structure allows for the storage and transmission of genetic information.
      </p>

      <p>
        <span className="scientific-term">
          RNA
          <div className="scientific-tooltip">
            <div className="tooltip-title">RNA</div>
            <div>Ribonucleic Acid</div>
            <div className="tooltip-context">
              A molecule similar to DNA that has various roles in the coding, decoding, regulation,
              and expression of genes
            </div>
          </div>
        </span>
        , while similar to DNA, plays different roles in the cell, including protein synthesis and
        gene regulation. In some viruses, RNA rather than DNA serves as the genetic material.
      </p>
    </div>
  );

  return (
    <UBReaderLayout
      title={title}
      bookNavigationContent={bookNavigationContent}
      sectionNavigationContent={sectionNavigationContent}
      footerContent={footerContent}
      showBottomPanel={true}
      bottomPanelTabs={bottomPanelTabs}
      bottomPanelInitialHeight={300}
    >
      {sampleContent}
    </UBReaderLayout>
  );
}

export default UBReaderDemo;
