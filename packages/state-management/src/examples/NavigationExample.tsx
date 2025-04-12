import React from 'react';

import { useNavigation } from '../hooks/useNavigation';

/**
 * Example component demonstrating the use of the useNavigation hook
 */
export function NavigationExample() {
  const {
    isBookNavOpen,
    isSectionNavOpen,
    currentPaperId,
    currentSectionId,
    currentSectionTitle,
    toggleBookNav,
    toggleSectionNav,
    setCurrentPaper,
    setCurrentSection,
    updateSectionTitle,
  } = useNavigation();

  return (
    <div className="navigation-example">
      <h2>Navigation Example</h2>

      <div className="navigation-controls">
        <button
          className={`hamburger-button large ${isBookNavOpen ? 'active' : ''}`}
          onClick={toggleBookNav}
          aria-label="Toggle book navigation"
          aria-expanded={isBookNavOpen}
        >
          Toggle Book Nav
        </button>

        <button
          className={`hamburger-button small ${isSectionNavOpen ? 'active' : ''}`}
          onClick={toggleSectionNav}
          aria-label="Toggle section navigation"
          aria-expanded={isSectionNavOpen}
        >
          Toggle Section Nav
        </button>
      </div>

      <div className="navigation-state">
        <h3>Current State</h3>
        <ul>
          <li>Book Nav Open: {isBookNavOpen ? 'Yes' : 'No'}</li>
          <li>Section Nav Open: {isSectionNavOpen ? 'Yes' : 'No'}</li>
          <li>Current Paper ID: {currentPaperId || 'None'}</li>
          <li>Current Section ID: {currentSectionId || 'None'}</li>
          <li>Current Section Title: {currentSectionTitle || 'None'}</li>
        </ul>
      </div>

      <div className="navigation-actions">
        <h3>Actions</h3>

        <div className="action-group">
          <h4>Set Current Paper</h4>
          <div className="button-group">
            <button onClick={() => setCurrentPaper('paper1')}>Paper 1</button>
            <button onClick={() => setCurrentPaper('paper2')}>Paper 2</button>
            <button onClick={() => setCurrentPaper('paper3')}>Paper 3</button>
          </div>
        </div>

        <div className="action-group">
          <h4>Set Current Section</h4>
          <div className="button-group">
            <button onClick={() => setCurrentSection('section1')}>Section 1</button>
            <button onClick={() => setCurrentSection('section2')}>Section 2</button>
            <button onClick={() => setCurrentSection('section3')}>Section 3</button>
          </div>
        </div>

        <div className="action-group">
          <h4>Update Section Title</h4>
          <div className="button-group">
            <button onClick={() => updateSectionTitle('Introduction')}>Introduction</button>
            <button onClick={() => updateSectionTitle('Main Content')}>Main Content</button>
            <button onClick={() => updateSectionTitle('Conclusion')}>Conclusion</button>
          </div>
        </div>
      </div>
    </div>
  );
}
