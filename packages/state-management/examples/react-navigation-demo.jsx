import React from 'react';
import { AppStateProvider, useNavigation, usePullup } from '@ub-ecosystem/state-management';

/**
 * Navigation Header Component
 *
 * This component displays the navigation header with hamburger buttons
 * and the current section title.
 */
function NavigationHeader() {
  const { isBookNavOpen, isSectionNavOpen, currentSectionTitle, toggleBookNav, toggleSectionNav } =
    useNavigation();

  return (
    <header className="navigation-header">
      <div className="header-content">
        <div className="navigation-buttons">
          <button
            className={`hamburger-button book ${isBookNavOpen ? 'open' : ''}`}
            onClick={toggleBookNav}
            aria-label="Toggle book navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <button
            className={`hamburger-button section ${isSectionNavOpen ? 'open' : ''}`}
            onClick={toggleSectionNav}
            aria-label="Toggle section navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
        <h1 className="current-section">{currentSectionTitle || 'Introduction'}</h1>
      </div>
    </header>
  );
}

/**
 * Book Navigation Panel Component
 *
 * This component displays the book navigation panel with a list of papers.
 */
function BookNavigationPanel() {
  const { isBookNavOpen, toggleBookNav, updateSectionTitle } = useNavigation();

  const handleSectionClick = title => {
    updateSectionTitle(title);
    toggleBookNav();
  };

  return (
    <nav className={`navigation-panel book-panel ${isBookNavOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h2>Book Navigation</h2>
        <button className="close-button" onClick={toggleBookNav}>
          &times;
        </button>
      </div>
      <ul className="navigation-list">
        <li className="navigation-item">
          <button
            className="navigation-link"
            onClick={() => handleSectionClick('The Universal Father')}
          >
            The Universal Father
          </button>
        </li>
        <li className="navigation-item">
          <button
            className="navigation-link"
            onClick={() => handleSectionClick('The Nature of God')}
          >
            The Nature of God
          </button>
        </li>
        <li className="navigation-item">
          <button
            className="navigation-link"
            onClick={() => handleSectionClick('The Attributes of God')}
          >
            The Attributes of God
          </button>
        </li>
        <li className="navigation-item">
          <button
            className="navigation-link"
            onClick={() => handleSectionClick("God's Relation to the Universe")}
          >
            God's Relation to the Universe
          </button>
        </li>
        <li className="navigation-item">
          <button
            className="navigation-link"
            onClick={() => handleSectionClick("God's Relation to the Individual")}
          >
            God's Relation to the Individual
          </button>
        </li>
      </ul>
    </nav>
  );
}

/**
 * Section Navigation Panel Component
 *
 * This component displays the section navigation panel with a list of sections.
 */
function SectionNavigationPanel() {
  const { isSectionNavOpen, toggleSectionNav, updateSectionTitle } = useNavigation();

  const handleSectionClick = title => {
    updateSectionTitle(title);
    toggleSectionNav();
  };

  return (
    <nav className={`navigation-panel section-panel ${isSectionNavOpen ? 'open' : ''}`}>
      <div className="panel-header">
        <h2>Section Navigation</h2>
        <button className="close-button" onClick={toggleSectionNav}>
          &times;
        </button>
      </div>
      <ul className="navigation-list">
        <li className="navigation-item">
          <button className="navigation-link" onClick={() => handleSectionClick('Introduction')}>
            Introduction
          </button>
        </li>
        <li className="navigation-item">
          <button className="navigation-link" onClick={() => handleSectionClick('Section 1')}>
            Section 1
          </button>
        </li>
        <li className="navigation-item">
          <button className="navigation-link" onClick={() => handleSectionClick('Section 2')}>
            Section 2
          </button>
        </li>
        <li className="navigation-item">
          <button className="navigation-link" onClick={() => handleSectionClick('Section 3')}>
            Section 3
          </button>
        </li>
        <li className="navigation-item">
          <button className="navigation-link" onClick={() => handleSectionClick('Conclusion')}>
            Conclusion
          </button>
        </li>
      </ul>
    </nav>
  );
}

/**
 * Pullup Panel Component
 *
 * This component displays the pullup panel with tabs for notes, quotes, and settings.
 */
function PullupPanel() {
  const {
    isOpen,
    activeTab,
    height,
    isPersistent,
    openPullup,
    closePullup,
    setActiveTab,
    setHeight,
  } = usePullup();

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const handleResize = e => {
    const newHeight = window.innerHeight - e.clientY;
    setHeight(Math.max(200, newHeight));
  };

  return (
    <div
      className={`pullup-panel ${isOpen ? 'open' : ''} ${isPersistent ? 'persistent' : ''}`}
      style={{ height: `${height}px` }}
    >
      <div className="pullup-handle" onMouseDown={handleResize}>
        <div className="handle-bar"></div>
      </div>
      <div className="pullup-tabs">
        <button
          className={`pullup-tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => handleTabClick('notes')}
        >
          Notes
        </button>
        <button
          className={`pullup-tab ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => handleTabClick('quotes')}
        >
          Quotes
        </button>
        <button
          className={`pullup-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabClick('settings')}
        >
          Settings
        </button>
        <button className="pullup-close" onClick={closePullup}>
          &times;
        </button>
      </div>
      <div className="pullup-content">
        {activeTab === 'notes' && (
          <div className="tab-content">
            <h3>Notes</h3>
            <p>Your notes will appear here.</p>
          </div>
        )}
        {activeTab === 'quotes' && (
          <div className="tab-content">
            <h3>Quotes</h3>
            <p>Your saved quotes will appear here.</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <h3>Settings</h3>
            <p>Reader settings will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Overlay Component
 *
 * This component displays an overlay when navigation panels are open.
 */
function Overlay() {
  const { isBookNavOpen, isSectionNavOpen, toggleBookNav, toggleSectionNav } = useNavigation();
  const { isOpen: isPullupOpen, closePullup } = usePullup();

  const handleClick = () => {
    if (isBookNavOpen) toggleBookNav();
    if (isSectionNavOpen) toggleSectionNav();
    if (isPullupOpen) closePullup();
  };

  const isVisible = isBookNavOpen || isSectionNavOpen || isPullupOpen;

  return <div className={`overlay ${isVisible ? 'visible' : ''}`} onClick={handleClick}></div>;
}

/**
 * Content Component
 *
 * This component displays the main content of the page.
 */
function Content() {
  const { currentSectionTitle } = useNavigation();
  const { openPullup } = usePullup();

  return (
    <main className="content">
      <section className="content-section">
        <h2>{currentSectionTitle || 'Introduction'}</h2>
        <p>
          This is a demonstration of the state management system for the UB Reader. It shows how the
          navigation and pullup components work together using a centralized state management
          approach.
        </p>
        <button className="pullup-button" onClick={() => openPullup('notes')}>
          Open Notes
        </button>
      </section>
    </main>
  );
}

/**
 * App Component
 *
 * This component wraps all the other components and provides the state management context.
 */
function NavigationDemoApp() {
  return (
    <div className="app">
      <NavigationHeader />
      <BookNavigationPanel />
      <SectionNavigationPanel />
      <PullupPanel />
      <Overlay />
      <Content />
    </div>
  );
}

/**
 * Root Component
 *
 * This component wraps the app with the AppStateProvider.
 */
export default function NavigationDemo() {
  return (
    <AppStateProvider documentId="navigation-demo">
      <NavigationDemoApp />
    </AppStateProvider>
  );
}
