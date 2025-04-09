import React from 'react';
import { useNavigation } from '@ub-ecosystem/state-management';
import styles from './SectionNavigationPanel.module.css';

export interface SectionNavigationPanelProps {
  /**
   * Whether the panel is open
   */
  isOpen: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * SectionNavigationPanel Component
 *
 * A sliding panel that displays section-level navigation options for the current paper.
 */
export function SectionNavigationPanel({ isOpen, className = '' }: SectionNavigationPanelProps) {
  const { toggleSectionNav, setCurrentSection, currentPaperId, currentSectionId } = useNavigation();

  // Example section data - in a real implementation, this would come from a data source
  // and would be filtered based on the current paper
  const sections = [
    { id: 'section1', title: 'Introduction' },
    { id: 'section2', title: "The Father's Name" },
    { id: 'section3', title: 'The Reality of God' },
    { id: 'section4', title: 'God as a Universal Reality' },
    { id: 'section5', title: 'Personality of the Universal Father' },
    { id: 'section6', title: 'Personality in the Universe' },
    { id: 'section7', title: 'Spiritual Value of the Personality Concept' },
  ];

  const handleSectionClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    toggleSectionNav(); // Close the navigation panel after selection
  };

  const panelClasses = [styles.sectionNavigationPanel, isOpen ? styles.open : '', className]
    .filter(Boolean)
    .join(' ');

  // Get the paper title based on the current paper ID
  const paperTitle =
    currentPaperId === 'paper1'
      ? 'The Universal Father'
      : currentPaperId === 'paper2'
      ? 'The Nature of God'
      : currentPaperId === 'paper3'
      ? 'The Attributes of God'
      : currentPaperId === 'paper4'
      ? "God's Relation to the Universe"
      : currentPaperId === 'paper5'
      ? "God's Relation to the Individual"
      : 'Current Paper';

  return (
    <nav className={panelClasses} aria-hidden={!isOpen}>
      <div className={styles.header}>
        <h2 className={styles.title}>{paperTitle}</h2>
        <button
          className={styles.closeButton}
          onClick={toggleSectionNav}
          aria-label="Close section navigation"
        >
          ×
        </button>
      </div>

      <ul className={styles.navigationList}>
        {sections.map(section => (
          <li key={section.id} className={styles.navigationItem}>
            <a
              href={`#${section.id}`}
              className={`${styles.navigationLink} ${
                section.id === currentSectionId ? styles.active : ''
              }`}
              onClick={e => {
                e.preventDefault();
                handleSectionClick(section.id);
              }}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SectionNavigationPanel;
