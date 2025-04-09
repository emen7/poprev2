import React from 'react';
import { useNavigation } from '@ub-ecosystem/state-management';
import styles from './BookNavigationPanel.module.css';

export interface BookNavigationPanelProps {
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
 * BookNavigationPanel Component
 *
 * A sliding panel that displays book-level navigation options.
 */
export function BookNavigationPanel({ isOpen, className = '' }: BookNavigationPanelProps) {
  const { toggleBookNav, setCurrentPaper } = useNavigation();

  // Example paper data - in a real implementation, this would come from a data source
  const papers = [
    { id: 'paper1', title: 'The Universal Father' },
    { id: 'paper2', title: 'The Nature of God' },
    { id: 'paper3', title: 'The Attributes of God' },
    { id: 'paper4', title: "God's Relation to the Universe" },
    { id: 'paper5', title: "God's Relation to the Individual" },
  ];

  const handlePaperClick = (paperId: string) => {
    setCurrentPaper(paperId);
    toggleBookNav(); // Close the navigation panel after selection
  };

  const panelClasses = [styles.bookNavigationPanel, isOpen ? styles.open : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={panelClasses} aria-hidden={!isOpen}>
      <div className={styles.header}>
        <h2 className={styles.title}>Urantia Book</h2>
        <button
          className={styles.closeButton}
          onClick={toggleBookNav}
          aria-label="Close book navigation"
        >
          ×
        </button>
      </div>

      <ul className={styles.navigationList}>
        {papers.map(paper => (
          <li key={paper.id} className={styles.navigationItem}>
            <a
              href={`#${paper.id}`}
              className={styles.navigationLink}
              onClick={e => {
                e.preventDefault();
                handlePaperClick(paper.id);
              }}
            >
              {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BookNavigationPanel;
