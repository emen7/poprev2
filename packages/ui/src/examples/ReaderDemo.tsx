import React, { useState } from 'react';

import { Header, Footer } from '../layout';
import ReaderLayout from '../layout/ReaderLayout';
import NotesPanel from '../panels/NotesPanel';
import { ScientificContentProvider } from '../scientific/ScientificContentContext';
import ScientificTooltip from '../scientific/ScientificTooltip';
import { exampleTooltipData } from '../types/TooltipData';
import './ReaderDemo.css';

/**
 * ReaderDemo Component
 *
 * A demo component that showcases the enhanced reader features:
 * - Width limitation
 * - Multi-purpose pull-up panel
 * - Scientific content tooltips
 */
export function ReaderDemo() {
  // State for the bottom panel tabs
  const [activeTab, setActiveTab] = useState('notes');

  // Sample scientific content with tooltips
  const sampleContent = (
    <div className="sample-content">
      <h1>Understanding Quantum Physics</h1>

      <p>
        Modern physics is built upon two fundamental theories:
        <ScientificTooltip
          content="Quantum Entanglement"
          data={exampleTooltipData['Quantum Entanglement']}
        />
        and relativity. The famous equation
        <ScientificTooltip content="E=mc²" data={exampleTooltipData['E=mc²']} />
        from Einstein's theory of relativity demonstrates the relationship between energy and mass.
      </p>

      <p>
        In molecular biology,
        <ScientificTooltip content="DNA" data={exampleTooltipData['DNA']} />
        and
        <ScientificTooltip content="RNA" data={exampleTooltipData['RNA']} />
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
        <ScientificTooltip
          content="Quantum Entanglement"
          data={exampleTooltipData['Quantum Entanglement']}
        />
        , where particles become connected in such a way that the quantum state of each particle
        cannot be described independently of the others, regardless of the distance separating them.
      </p>

      <h2>Relativity and Energy</h2>

      <p>
        Einstein's special theory of relativity introduced the concept that energy and mass are
        equivalent, as expressed in the equation
        <ScientificTooltip content="E=mc²" data={exampleTooltipData['E=mc²']} />. This relationship
        has profound implications for our understanding of the universe and has led to developments
        in nuclear energy and weapons.
      </p>

      <h2>Molecular Biology</h2>

      <p>
        The discovery of the structure of
        <ScientificTooltip content="DNA" data={exampleTooltipData['DNA']} />
        by Watson and Crick in 1953 revolutionized our understanding of genetics. The double helix
        structure allows for the storage and transmission of genetic information.
      </p>

      <p>
        <ScientificTooltip content="RNA" data={exampleTooltipData['RNA']} />, while similar to DNA,
        plays different roles in the cell, including protein synthesis and gene regulation. In some
        viruses, RNA rather than DNA serves as the genetic material.
      </p>
    </div>
  );

  // Bottom panel tabs
  const bottomPanelTabs = [
    {
      id: 'notes',
      label: 'Notes',
      content: <NotesPanel documentId="quantum-physics-demo" />,
    },
    {
      id: 'references',
      label: 'References',
      content: (
        <div className="references-placeholder">
          <h3>References</h3>
          <p>This is a placeholder for the References panel.</p>
          <ul>
            <li>Einstein, A. (1905). "On the Electrodynamics of Moving Bodies"</li>
            <li>Feynman, R. (1985). "QED: The Strange Theory of Light and Matter"</li>
            <li>Watson, J. & Crick, F. (1953). "Molecular Structure of Nucleic Acids"</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'glossary',
      label: 'Glossary',
      content: (
        <div className="glossary-placeholder">
          <h3>Glossary</h3>
          <p>This is a placeholder for the Glossary panel.</p>
          <dl>
            <dt>Quantum Mechanics</dt>
            <dd>
              A fundamental theory in physics that describes nature at the smallest scales of energy
              levels of atoms and subatomic particles.
            </dd>

            <dt>Relativity</dt>
            <dd>
              A theory developed by Albert Einstein that describes the relationship between space
              and time, and how gravity affects them.
            </dd>

            <dt>Molecular Biology</dt>
            <dd>
              The branch of biology that deals with the structure and function of the macromolecules
              essential to life.
            </dd>
          </dl>
        </div>
      ),
    },
  ];

  // Header content
  const headerContent = (
    <Header
      leftContent={<button onClick={() => console.log('Back button clicked')}>Back</button>}
      centerContent={<h1>Enhanced Reader Demo</h1>}
    />
  );

  // Footer content
  const footerContent = (
    <Footer
      copyrightText="© 2025 UB Reader"
      centerContent={
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Help</a>
        </div>
      }
    />
  );

  return (
    <ScientificContentProvider initialData={exampleTooltipData} includeExampleData={true}>
      <ReaderLayout
        showHeader={true}
        showFooter={true}
        headerContent={headerContent}
        footerContent={footerContent}
        contentWidth="medium"
        showBottomPanel={true}
        bottomPanelTabs={bottomPanelTabs}
        bottomPanelInitialHeight={300}
      >
        {sampleContent}
      </ReaderLayout>
    </ScientificContentProvider>
  );
}

export default ReaderDemo;
