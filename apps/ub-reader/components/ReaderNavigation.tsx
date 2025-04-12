'use client';

import React, { useState } from 'react';

interface ReaderNavigationProps {
  title: string;
  onSettingsClick: () => void;
}

/**
 * ReaderNavigation Component
 *
 * This component provides the navigation header for the reader with:
 * - Book navigation (big hamburger)
 * - Section navigation (small hamburger)
 * - Title display
 * - Settings button
 */
export const ReaderNavigation: React.FC<ReaderNavigationProps> = ({ title, onSettingsClick }) => {
  const [isBookNavOpen, setIsBookNavOpen] = useState(false);
  const [isSectionNavOpen, setIsSectionNavOpen] = useState(false);

  // Toggle book navigation
  const toggleBookNav = () => {
    setIsBookNavOpen(!isBookNavOpen);
    if (isSectionNavOpen) setIsSectionNavOpen(false);
  };

  // Toggle section navigation
  const toggleSectionNav = () => {
    setIsSectionNavOpen(!isSectionNavOpen);
    if (isBookNavOpen) setIsBookNavOpen(false);
  };

  return (
    <>
      <header className="reader-header">
        <div className="reader-nav">
          <button
            className="reader-nav-button book-nav-button"
            onClick={toggleBookNav}
            aria-label="Book navigation"
            aria-expanded={isBookNavOpen}
          >
            ☰
          </button>
          <button
            className="reader-nav-button section-nav-button"
            onClick={toggleSectionNav}
            aria-label="Section navigation"
            aria-expanded={isSectionNavOpen}
          >
            ≡
          </button>
        </div>
        <h1 className="reader-title">{title}</h1>
        <div className="reader-actions">
          <button className="reader-action-button" onClick={onSettingsClick} aria-label="Settings">
            ⚙️
          </button>
        </div>
      </header>

      {/* Book Navigation Panel */}
      {isBookNavOpen && (
        <div className="nav-panel book-nav-panel">
          <div className="nav-panel-header">
            <h2>The Urantia Book</h2>
            <button
              className="nav-panel-close"
              onClick={() => setIsBookNavOpen(false)}
              aria-label="Close book navigation"
            >
              ✕
            </button>
          </div>
          <div className="nav-panel-content">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="/foreword" className="nav-link">
                  Foreword
                </a>
              </li>
              <li className="nav-item">
                <a href="/paper/1" className="nav-link active">
                  Paper 1: The Universal Father
                </a>
              </li>
              <li className="nav-item">
                <a href="/paper/2" className="nav-link">
                  Paper 2: The Nature of God
                </a>
              </li>
              <li className="nav-item">
                <a href="/paper/3" className="nav-link">
                  Paper 3: The Attributes of God
                </a>
              </li>
              <li className="nav-item">
                <a href="/paper/4" className="nav-link">
                  Paper 4: God's Relation to the Universe
                </a>
              </li>
              <li className="nav-item">
                <a href="/contents" className="nav-link nav-special">
                  Table of Contents
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Section Navigation Panel */}
      {isSectionNavOpen && (
        <div className="nav-panel section-nav-panel">
          <div className="nav-panel-header">
            <h2>Paper 1 Sections</h2>
            <button
              className="nav-panel-close"
              onClick={() => setIsSectionNavOpen(false)}
              aria-label="Close section navigation"
            >
              ✕
            </button>
          </div>
          <div className="nav-panel-content">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#introduction" className="nav-link">
                  Introduction
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-1" className="nav-link">
                  1. The Father's Name
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-2" className="nav-link">
                  2. The Reality of God
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-3" className="nav-link">
                  3. God is a Universal Spirit
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-4" className="nav-link">
                  4. The Mystery of God
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-5" className="nav-link">
                  5. Personality of the Universal Father
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-6" className="nav-link">
                  6. Personality in the Universe
                </a>
              </li>
              <li className="nav-item">
                <a href="#section-7" className="nav-link">
                  7. Spiritual Value of the Personality Concept
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .reader-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: var(--header-background, #f8f8f8);
          border-bottom: 1px solid var(--border-color, #ddd);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .reader-nav,
        .reader-actions {
          display: flex;
          gap: 0.5rem;
        }

        .reader-nav-button,
        .reader-action-button {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          color: var(--button-color, #333);
        }

        .reader-nav-button:hover,
        .reader-action-button:hover {
          background-color: var(--button-hover-background, rgba(0, 0, 0, 0.05));
        }

        .book-nav-button {
          font-size: 1.5rem;
        }

        .section-nav-button {
          font-size: 1.4rem;
        }

        .reader-title {
          font-size: 1.25rem;
          margin: 0;
          text-align: center;
          flex-grow: 1;
          color: var(--title-color, #333);
        }

        .nav-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background-color: var(--panel-background, #fff);
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          z-index: 20;
          display: flex;
          flex-direction: column;
        }

        .nav-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color, #ddd);
        }

        .nav-panel-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--heading-color, #333);
        }

        .nav-panel-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: var(--close-button-color, #666);
        }

        .nav-panel-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1rem 0;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin: 0;
        }

        .nav-link {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--link-color, #333);
          text-decoration: none;
          border-left: 3px solid transparent;
        }

        .nav-link:hover {
          background-color: var(--link-hover-background, rgba(0, 0, 0, 0.05));
        }

        .nav-link.active {
          border-left-color: var(--link-active-border, #007bff);
          background-color: var(--link-active-background, rgba(0, 123, 255, 0.1));
          font-weight: 500;
        }

        .nav-special {
          margin-top: 1rem;
          font-weight: 500;
          color: var(--special-link-color, #007bff);
        }

        /* Dark mode styles */
        :global(.dark-theme) .reader-header {
          background-color: var(--header-background-dark, #1e1e1e);
          border-bottom-color: var(--border-color-dark, #333);
        }

        :global(.dark-theme) .reader-nav-button,
        :global(.dark-theme) .reader-action-button {
          color: var(--button-color-dark, #eee);
        }

        :global(.dark-theme) .reader-nav-button:hover,
        :global(.dark-theme) .reader-action-button:hover {
          background-color: var(--button-hover-background-dark, rgba(255, 255, 255, 0.1));
        }

        :global(.dark-theme) .reader-title {
          color: var(--title-color-dark, #eee);
        }

        :global(.dark-theme) .nav-panel {
          background-color: var(--panel-background-dark, #222);
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
        }

        :global(.dark-theme) .nav-panel-header {
          border-bottom-color: var(--border-color-dark, #333);
        }

        :global(.dark-theme) .nav-panel-header h2 {
          color: var(--heading-color-dark, #eee);
        }

        :global(.dark-theme) .nav-panel-close {
          color: var(--close-button-color-dark, #aaa);
        }

        :global(.dark-theme) .nav-link {
          color: var(--link-color-dark, #ddd);
        }

        :global(.dark-theme) .nav-link:hover {
          background-color: var(--link-hover-background-dark, rgba(255, 255, 255, 0.05));
        }

        :global(.dark-theme) .nav-link.active {
          border-left-color: var(--link-active-border-dark, #3498db);
          background-color: var(--link-active-background-dark, rgba(52, 152, 219, 0.2));
        }

        :global(.dark-theme) .nav-special {
          color: var(--special-link-color-dark, #3498db);
        }
      `}</style>
    </>
  );
};

export default ReaderNavigation;
