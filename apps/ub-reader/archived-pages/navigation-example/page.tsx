'use client';

import { AppStateProvider, useNavigation } from '@ub-ecosystem/state-management';
import { ThreeRowHeader, SectionTracker, DualHamburgerNavigation } from '@ub-ecosystem/ui';
import React from 'react';

/**
 * Navigation Example Page Content
 *
 * This component contains the actual content of the page and uses the
 * navigation hooks from the state management package.
 */
function NavigationExampleContent() {
  const {
    isBookNavOpen,
    isSectionNavOpen,
    currentSectionTitle,
    toggleBookNav,
    toggleSectionNav,
    updateSectionTitle,
  } = useNavigation();

  return (
    <div className="navigation-example-page">
      {/* Three-Row Header */}
      <header className="three-row-header">
        <div className="header-row top-row">
          <div className="left-content">
            {/* Dual Hamburger Navigation */}
            <div className="dual-hamburger-navigation">
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
          </div>
          <div className="center-content">
            <h1 className="main-title">Urantia Book</h1>
          </div>
          <div className="right-content"></div>
        </div>
        <div className="header-row paper-row">
          <div className="center-content">
            <h2 className="paper-title">Navigation Example</h2>
          </div>
        </div>
        <div className="header-row section-row">
          <div className="center-content">
            <h3 className="section-title">{currentSectionTitle || 'Introduction'}</h3>
          </div>
        </div>
      </header>

      {/* Navigation Panels */}
      <nav
        className={`book-navigation-panel ${isBookNavOpen ? 'open' : ''}`}
        aria-hidden={!isBookNavOpen}
      >
        <div className="panel-header">
          <h2 className="panel-title">Urantia Book</h2>
          <button
            className="close-button"
            onClick={toggleBookNav}
            aria-label="Close book navigation"
          >
            ×
          </button>
        </div>
        <ul className="navigation-list">
          <li className="navigation-item">
            <a href="#" className="navigation-link">
              The Universal Father
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" className="navigation-link">
              The Nature of God
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" className="navigation-link">
              The Attributes of God
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" className="navigation-link">
              God's Relation to the Universe
            </a>
          </li>
          <li className="navigation-item">
            <a href="#" className="navigation-link">
              God's Relation to the Individual
            </a>
          </li>
        </ul>
      </nav>

      <nav
        className={`section-navigation-panel ${isSectionNavOpen ? 'open' : ''}`}
        aria-hidden={!isSectionNavOpen}
      >
        <div className="panel-header">
          <h2 className="panel-title">Navigation Example</h2>
          <button
            className="close-button"
            onClick={toggleSectionNav}
            aria-label="Close section navigation"
          >
            ×
          </button>
        </div>
        <ul className="navigation-list">
          <li className="navigation-item">
            <a
              href="#section1"
              className="navigation-link"
              onClick={() => {
                updateSectionTitle('Introduction');
                toggleSectionNav();
              }}
            >
              Introduction
            </a>
          </li>
          <li className="navigation-item">
            <a
              href="#section2"
              className="navigation-link"
              onClick={() => {
                updateSectionTitle('Dual Hamburger Navigation');
                toggleSectionNav();
              }}
            >
              Dual Hamburger Navigation
            </a>
          </li>
          <li className="navigation-item">
            <a
              href="#section3"
              className="navigation-link"
              onClick={() => {
                updateSectionTitle('Section Tracking');
                toggleSectionNav();
              }}
            >
              Section Tracking
            </a>
          </li>
          <li className="navigation-item">
            <a
              href="#section4"
              className="navigation-link"
              onClick={() => {
                updateSectionTitle('Responsive Design');
                toggleSectionNav();
              }}
            >
              Responsive Design
            </a>
          </li>
          <li className="navigation-item">
            <a
              href="#section5"
              className="navigation-link"
              onClick={() => {
                updateSectionTitle('Conclusion');
                toggleSectionNav();
              }}
            >
              Conclusion
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      <div
        className={`overlay ${isBookNavOpen || isSectionNavOpen ? 'visible' : ''}`}
        onClick={() => {
          if (isBookNavOpen) toggleBookNav();
          if (isSectionNavOpen) toggleSectionNav();
        }}
        aria-hidden="true"
      ></div>

      <main className="content">
        <section id="section1" className="section">
          <h2>Introduction</h2>
          <p>
            This example demonstrates the new navigation system for the UB Reader. It includes a
            three-row header with dual hamburger navigation and section tracking.
          </p>
          <p>The navigation system consists of two main components:</p>
          <ul>
            <li>
              <strong>ThreeRowHeader</strong>: A header with three rows for main title, paper title,
              and section title.
            </li>
            <li>
              <strong>SectionTracker</strong>: A component that tracks when sections are visible in
              the viewport and updates the navigation state accordingly.
            </li>
          </ul>
        </section>

        <section id="section2" className="section">
          <h2>Dual Hamburger Navigation</h2>
          <p>The dual hamburger navigation system provides two navigation panels:</p>
          <ul>
            <li>
              <strong>Book Navigation</strong>: For navigating between papers in the book. This is
              accessed through the larger hamburger button.
            </li>
            <li>
              <strong>Section Navigation</strong>: For navigating between sections within the
              current paper. This is accessed through the smaller hamburger button.
            </li>
          </ul>
          <p>
            Try clicking on the hamburger buttons in the top-left corner to open the navigation
            panels.
          </p>
        </section>

        <section id="section3" className="section">
          <h2>Section Tracking</h2>
          <p>
            The section tracking system updates the current section title in the header as you
            scroll through the content. It uses the Intersection Observer API to detect when
            sections are visible in the viewport.
          </p>
          <p>
            Notice how the section title in the header updates as you navigate through this page.
            This provides context to the reader about their current position in the content.
          </p>
          <p>
            The section tracking system is implemented using the SectionTracker component, which
            wraps each section of content and updates the navigation state when the section becomes
            visible.
          </p>
        </section>

        <section id="section4" className="section">
          <h2>Responsive Design</h2>
          <p>
            The navigation system is designed to be responsive and work well on all screen sizes.
            Try resizing your browser window to see how the navigation adapts.
          </p>
          <p>
            On smaller screens, the navigation panels take up the full width of the screen, while on
            larger screens they take up a portion of the screen.
          </p>
          <p>
            The header also adapts to different screen sizes, with the font sizes and spacing
            adjusting to ensure readability on all devices.
          </p>
        </section>

        <section id="section5" className="section">
          <h2>Conclusion</h2>
          <p>
            This example demonstrates the new navigation system for the UB Reader. It provides a
            more intuitive and user-friendly way to navigate through the content.
          </p>
          <p>
            The navigation system is built on top of the state management architecture, which
            provides a standardized way to manage navigation state across the application.
          </p>
          <p>The next steps in the implementation plan include:</p>
          <ul>
            <li>Implementing the pullup panel system</li>
            <li>Implementing the text selection system</li>
            <li>Integrating with the existing components</li>
            <li>Adding accessibility features</li>
            <li>Optimizing performance</li>
          </ul>
        </section>
      </main>

      <style jsx>{`
        .navigation-example-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Three-Row Header */
        .three-row-header {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 16px;
          box-sizing: border-box;
        }

        .top-row {
          height: 60px;
          background-color: #f8f8f8;
          border-bottom: 1px solid #e0e0e0;
        }

        .paper-row {
          height: 50px;
          background-color: #ffffff;
          border-bottom: 1px solid #e0e0e0;
        }

        .section-row {
          height: 40px;
          background-color: #f0f0f0;
          border-bottom: 1px solid #e0e0e0;
        }

        .left-content,
        .right-content {
          flex: 1;
        }

        .center-content {
          flex: 2;
          text-align: center;
        }

        .left-content {
          display: flex;
          justify-content: flex-start;
        }

        .right-content {
          display: flex;
          justify-content: flex-end;
        }

        .main-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .paper-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0;
        }

        .section-title {
          font-size: 1rem;
          font-weight: normal;
          margin: 0;
        }

        /* Dual Hamburger Navigation */
        .dual-hamburger-navigation {
          display: flex;
          align-items: center;
        }

        .hamburger-button {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          position: relative;
        }

        .hamburger-button.book {
          width: 32px;
          height: 24px;
        }

        .hamburger-button.section {
          width: 24px;
          height: 18px;
          margin-left: 8px;
        }

        .bar {
          display: block;
          width: 100%;
          height: 3px;
          background-color: #333;
          border-radius: 2px;
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .hamburger-button.open .bar:nth-child(1) {
          transform: translateY(10px) rotate(45deg);
        }

        .hamburger-button.open .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger-button.open .bar:nth-child(3) {
          transform: translateY(-10px) rotate(-45deg);
        }

        .hamburger-button.section.open .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger-button.section.open .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Navigation Panels */
        .book-navigation-panel,
        .section-navigation-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background-color: #fff;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          padding: 20px;
        }

        .section-navigation-panel {
          width: 280px;
          background-color: #f5f5f5;
        }

        .book-navigation-panel.open,
        .section-navigation-panel.open {
          transform: translateX(0);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .panel-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .close-button {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 5px;
        }

        .navigation-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .navigation-item {
          margin-bottom: 10px;
        }

        .navigation-link {
          display: block;
          padding: 10px;
          color: #333;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .navigation-link:hover,
        .navigation-link:focus {
          background-color: #f0f0f0;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.3s ease,
            visibility 0.3s ease;
        }

        .overlay.visible {
          opacity: 1;
          visibility: visible;
        }

        /* Content */
        .content {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          padding-top: 20px;
        }

        .section {
          margin-bottom: 40px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin-top: 0;
          color: #333;
        }

        p {
          line-height: 1.6;
          margin-bottom: 16px;
        }

        ul {
          margin-bottom: 16px;
        }

        li {
          margin-bottom: 8px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header-row {
            padding: 0 8px;
          }

          .top-row {
            height: 50px;
          }

          .paper-row {
            height: 40px;
          }

          .section-row {
            height: 36px;
          }

          .main-title {
            font-size: 1.25rem;
          }

          .paper-title {
            font-size: 1.1rem;
          }

          .section-title {
            font-size: 0.9rem;
          }

          .book-navigation-panel,
          .section-navigation-panel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Navigation Example Page
 *
 * This page demonstrates the navigation components concept.
 * It uses the state management package to manage navigation state.
 */
export default function NavigationExamplePage() {
  return (
    <AppStateProvider documentId="navigation-example">
      <NavigationExampleContent />
    </AppStateProvider>
  );
}
