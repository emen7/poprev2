'use client';

import Link from &apos;next/link';
import { useRouter } from &apos;next/navigation';
import React, { useState, useEffect, useRef } from &apos;react';

import { PullupProvider } from '../../contexts/PullupContext';
import { useTheme } from '../../contexts/ThemeContext';
import { addToHistory } from '../../services/HistoryService';
import type { Paper, Part } from '../../services/PaperDataService';
import {
  getPaper,
  getParts,
  _getPreviousPaper,
  getNextPaper,
  getPartForPaper,
} from '../../services/PaperDataService';
import Breadcrumbs from '../navigation/Breadcrumbs';
import { PullupContainer } from '../PullupContainer';
import { ThreeRowHeader } from '../three-row-header';
import { UBParagraph } from '../UBParagraph';
import { UBSectionDivider } from '../UBSectionDivider';
import '../navigation/Breadcrumbs.css';
import './styles/index.css';

interface TraditionalReaderProps {
  paperId?: number;
}

/**
 * Traditional Reader Component
 *
 * This component implements a reader interface that matches the improved-demo.html
 * but uses the traditional theme by default.
 */
export default function TraditionalReader({ paperId = 1 }: TraditionalReaderProps) {
  const router = useRouter();

  // Theme state from context
  const { contentTheme, setContentTheme, _uiTheme, setUITheme } = useTheme();

  // Use inline styles based on theme
  const getThemeStyles = () => {
    return {
      appContainer: {
        backgroundColor: uiTheme === &apos;light' ? '#ffffff' : '#1a1a1a',
        color: uiTheme === &apos;light' ? '#333333' : '#f0e6d8',
      },
      header: {
        backgroundColor: uiTheme === &apos;light' ? '#f8f8f8' : '#222222',
        borderBottom: uiTheme === &apos;light' ? &apos;1px solid #e2e8f0' : &apos;1px solid #333333',
      },
      title: {
        color: uiTheme === &apos;light' ? '#2c5282' : '#7fc8f5',
      },
      settingsPanel: {
        backgroundColor: uiTheme === &apos;light' ? '#f8f8f8' : '#222222',
        borderLeft: uiTheme === &apos;light' ? &apos;1px solid #e2e8f0' : &apos;1px solid #333333',
      },
      text: {
        color: uiTheme === &apos;light' ? '#333333' : '#f0e6d8',
      },
      sectionTitle: {
        color: uiTheme === &apos;light' ? '#2c5282' : '#91a7f9',
      },
    };
  };

  // Get current theme styles
  const themeStyles = getThemeStyles();

  // Paper data state
  const [paper, setPaper] = useState<Paper | null>(null);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  // Navigation panel state
  const [navigationOpen, setNavigationOpen] = useState(false);

  // Settings panel state
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Section dropdown state
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);

  // Debug mode state
  const [debugMode, setDebugMode] = useState(false);

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);

  // Refs for dropdown and sections
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  const readingAreaRef = useRef<HTMLDivElement>(null);

  // Current section state for paper info only
  // (section title handled by ThreeRowHeader)
  const [currentSection, setCurrentSection] = useState({
    part: '',
    paper: '',
  });

  // Fetch paper data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const paperData = await getPaper(paperId);
        setPaper(paperData);

        // Update current section info
        const partNumber = getPartForPaper(paperId);
        const _partTitle = parts.find(p => p.number === partNumber)?.title || '';

        setCurrentSection({
          part: `Part ${partNumber}: ${_partTitle}`,
          paper: `Paper ${paperData.number}: ${paperData.title}`,
        });

        // Add to reading history
        const title = paperId === 0 ? &apos;Foreword' : `Paper ${paperId}: ${paperData.title}`;
        addToHistory(paperId, title);
      } catch (error) {
        console.error('Error fetching paper:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paperId, parts]);

  // Fetch parts data
  useEffect(() => {
    setParts(getParts());
  }, []);

  // Apply theme directly to app container
  useEffect(() => {
    // Apply theme to app container
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      // Apply styles directly based on theme
      if (uiTheme === &apos;light') {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#333333';
        appContainer.setAttribute(
          &apos;style',
          &apos;background-color: #ffffff !important; color: #333333 !important;'
        );
      } else {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#f0e6d8';
        appContainer.setAttribute(
          &apos;style',
          &apos;background-color: #1a1a1a !important; color: #f0e6d8 !important;'
        );
      }
    }
  }, [uiTheme]);

  // Handle navigation toggle
  const handleNavigationToggle = () => {
    setNavigationOpen(!navigationOpen);
    if (settingsOpen) {
      setSettingsOpen(false);
    }
    // Close section dropdown if open
    setSectionDropdownOpen(false);
  };

  // Handle settings toggle
  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
    if (navigationOpen) {
      setNavigationOpen(false);
    }
    // Close section dropdown if open
    setSectionDropdownOpen(false);
  };

  // Handle overlay click
  const handleOverlayClick = () => {
    setNavigationOpen(false);
    setSettingsOpen(false);
    setSectionDropdownOpen(false);
  };

  // Close section dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionDropdownRef.current &&
        !sectionDropdownRef.current.contains(event.target as Node)
      ) {
        setSectionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle section navigation
  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    // Close the dropdown
    setSectionDropdownOpen(false);

    // Scroll to section
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      // Offset for the three-row header
      const headerOffset =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-total-height')
        ) || 120;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: &apos;smooth',
      });
    }
  };

  // Handle paper navigation
  const handlePaperClick = (paperNumber: number) => {
    router.push(`/traditional-reader/${paperNumber}`);
  };

  // Handle part toggle
  const handlePartToggle = (partNumber: number) => {
    // Toggle the expanded state of the part
    const partToggle = document.querySelector(`[data-part="part${partNumber}"]`);
    const partContent = document.getElementById(`part${partNumber}-content`);

    if (partToggle && partContent) {
      partToggle.classList.toggle('expanded');
      partContent.classList.toggle('expanded');
    }
  };

  // Handle theme change
  const handleThemeChange = (theme: &apos;modern' | &apos;traditional') => {
    setContentTheme(theme);
  };

  // Handle copy button click
  const handleCopyClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      navigator.clipboard
        .writeText(selection.toString())
        .then(() => {
          // Show toast
          const toast = document.querySelector('.toast');
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
              toast.classList.remove('show');
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  // Handle title click (navigate to contents)
  const handleTitleClick = () => {
    router.push('/contents');
  };

  // Monitor scroll position to update reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!readingAreaRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);

      setReadingProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial update
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [readingAreaRef]);

  // Add keyboard shortcut for debug mode (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === &apos;D') {
        // Removed console.log
        setDebugMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div
        className={`app-container ${uiTheme === &apos;dark' ? &apos;dark-theme-container' : &apos;light-theme-container'}`}
      >
        <div className="loading-container">
          <div className="loading-spinner" />
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <PullupProvider
      initialSettings={{
        fontSize: 16,
        lineHeight: 1.6,
        fontFamily: &apos;system-ui, sans-serif',
        theme: uiTheme,
        showParagraphNumbers: true,
        formatType: &apos;traditional',
      }}
    >
      <div
        className={`app-container ${uiTheme === &apos;dark' ? &apos;dark-theme-container' : &apos;light-theme-container'}`}
      >
        {/* Reader Container - New fixed-width wrapper */}
        <div className="reader-container">
          {/* Navigation Menu */}
          <nav id="navigation-menu" className={`navigation-menu ${navigationOpen ? &apos;open' : ''}`}>
            {/* Parts and Papers */}
            {parts.map(part => (
              <div
                key={part.number}
                className={
                  part.number === getPartForPaper(paperId) ? &apos;nav-fixed-top' : &apos;nav-fixed-bottom'
                }
              >
                <button
                  className={`part-toggle ${
                    part.number === getPartForPaper(paperId) ? &apos;active expanded' : ''
                  }`}
                  data-part={`part${part.number}`}
                  onClick={() => handlePartToggle(part.number)}
                >
                  PART {part.number}. {part.title}
                  <i className="fas fa-chevron-down" />
                </button>
                <div
                  className={`part-content ${
                    part.number === getPartForPaper(paperId) ? &apos;expanded' : ''
                  }`}
                  id={`part${part.number}-content`}
                >
                  <ul className="nav-list">
                    {part.papers.map(paperItem => (
                      <li key={paperItem.number}>
                        <button
                          className={`nav-paper-button ${paperItem.number === paperId ? &apos;active' : ''}`}
                          onClick={() => handlePaperClick(paperItem.number)}
                          style={{
                            background: &apos;none',
                            border: &apos;none',
                            padding: &apos;0.25rem 0.5rem',
                            color: &apos;inherit',
                            textAlign: &apos;left',
                            width: &apos;100%',
                            cursor: &apos;pointer',
                          }}
                        >
                          Paper {paperItem.number}: {paperItem.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          {/* Settings Panel */}
          <div id="settings-panel" className={`settings-panel ${settingsOpen ? &apos;open' : ''}`}>
            <h2 className="settings-title">Settings</h2>

            {/* Theme selection */}
            <div className="settings-section">
              <h3 className="settings-section-title">UI Theme</h3>
              <div className="settings-options">
                <button
                  className={`theme-button ${uiTheme === &apos;light' ? &apos;active' : ''}`}
                  onClick={() => setUITheme('light')}
                >
                  Light
                </button>
                <button
                  className={`theme-button ${uiTheme === &apos;dark' ? &apos;active' : ''}`}
                  onClick={() => setUITheme('dark')}
                >
                  Dark
                </button>
                {/* System theme option is not yet supported in the UITheme type */}
                <button
                  className="theme-button"
                  onClick={() => {
                    // Use preferred color scheme from OS
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setUITheme(prefersDark ? &apos;dark' : &apos;light');
                  }}
                >
                  System
                </button>
              </div>
            </div>

            {/* Content theme selection */}
            <div className="settings-section">
              <h3 className="settings-section-title">Content Format</h3>
              <div className="settings-options">
                <button
                  className={`theme-button ${contentTheme === &apos;traditional' ? &apos;active' : ''}`}
                  onClick={() => handleThemeChange('traditional')}
                >
                  Traditional
                </button>
                <button
                  className={`theme-button ${contentTheme === &apos;modern' ? &apos;active' : ''}`}
                  onClick={() => handleThemeChange('modern')}
                >
                  Modern
                </button>
              </div>
            </div>

            {/* About Information */}
            <div className="settings-about">
              <div className="mt-2">
                <Link href="/contents" className="settings-link">
                  Table of Contents
                </Link>
              </div>
              <div className="mt-2">
                <Link href="/" className="settings-link">
                  Reader Home
                </Link>
              </div>
            </div>
          </div>

          {/* Content Overlay (for closing menus) */}
          <div
            className={`content-overlay ${navigationOpen || settingsOpen ? &apos;active' : ''}`}
            onClick={handleOverlayClick}
          />

          {/* Section Dropdown (if needed) */}
          <div
            id="section-dropdown"
            className={`section-dropdown ${sectionDropdownOpen ? &apos;open' : ''}`}
            ref={sectionDropdownRef}
          >
            <div className="section-dropdown-content">
              <h3 className="section-dropdown-title">Jump to Section</h3>
              <ul className="section-list">
                {paper?.sections.map(section => (
                  <li key={section.number}>
                    <button
                      className="section-link"
                      onClick={e => handleSectionClick(e, `section-title-${section.number}`)}
                    >
                      {section.number}. {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reading Area with fixed width */}
          <div className="reading-area ub-reading-content" id="reading-area" ref={readingAreaRef}>
            <div className="content" data-theme={contentTheme}>
              {/* Three-Row Header moved inside content div */}
              {paper && (
                <ThreeRowHeader
                  paper={{
                    id: `paper-${paper.number}`,
                    number: paper.number,
                    title: paper.title,
                    sections: paper.sections.map(section => ({
                      id: `section-${section.number}`,
                      number: section.number,
                      title: section.title,
                    })),
                  }}
                  onBookMenuToggle={handleNavigationToggle}
                  onSectionMenuToggle={() => setSectionDropdownOpen(!sectionDropdownOpen)}
                  onPreviousPaper={() => {
                    if (paper) {
                      const prevPaperNum = getPreviousPaper(paper.number);
                      if (prevPaperNum !== null) handlePaperClick(prevPaperNum);
                    }
                  }}
                  onNextPaper={() => {
                    if (paper) {
                      const nextPaperNum = getNextPaper(paper.number);
                      if (nextPaperNum !== null) handlePaperClick(nextPaperNum);
                    }
                  }}
                />
              )}
              {/* Paper Introduction */}
              {paper && (
                <>
                  <div className="paper-introduction">
                    <h2 className="paper-title">
                      {/* Paper title will be handled in the JSON in production */}
                    </h2>
                    {/* Attribution text removed as per design spec */}

                    {/* Introduction paragraph (if available) */}
                    {paper.sections[0]?.paragraphs[0] && (
                      <UBParagraph
                        paragraph={paper.sections[0].paragraphs[0]}
                        currentPaper={paper.number}
                      />
                    )}
                  </div>

                  {/* Sections */}
                  {paper.sections.map(section => (
                    <div
                      key={section.number}
                      className="section-content"
                      id={`section-container-${section.number}`}
                    >
                      <h3 className="section-title" id={`section-title-${section.number}`}>
                        {section.number}. {section.title}
                      </h3>

                      {/* Add section divider for visual separation */}
                      <UBSectionDivider />

                      {/* Render section paragraphs */}
                      <div className="paragraphs">
                        {section.paragraphs.map((paragraph, index) => (
                          <UBParagraph
                            key={paragraph.number}
                            paragraph={paragraph}
                            currentPaper={paper.number}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>{' '}
        {/* End of reader-container */}
        {/* Toast Notification */}
        <div className="toast">Text copied to clipboard!</div>
        {/* Reading Progress Bar */}
        <div className="reading-progress-container">
          <div
            className="reading-progress-bar"
            style={{ width: `${readingProgress}%` }}
            aria-label="reading progress"
          />
        </div>
        {/* Copy Button */}
        <button className="copy-button" onClick={handleCopyClick} title="Copy selected text">
          <i className="fas fa-copy" />
        </button>
        {/* Pullup Panel Component */}
        <PullupContainer />
        {/* Debug Info (if enabled) */}
        {debugMode && (
          <div className="debug-info">
            <h3>Debug Info</h3>
            <p>
              <strong>Paper ID:</strong> {paperId}
            </p>
            <p>
              <strong>UI Theme:</strong> {_uiTheme}
            </p>
            <p>
              <strong>Content Theme:</strong> {contentTheme}
            </p>
            <p>
              <strong>Section Titles Count:</strong>{' '}
              {document.querySelectorAll('h3.section-heading').length ||
                document.querySelectorAll('h3.section-title').length}
            </p>
            <p>
              <strong>Reading Progress:</strong> {readingProgress.toFixed(2)}%
            </p>
            <div className="debug-controls">
              <button
                className="debug-button"
                onClick={() => {
                  // Toggle debug mode
                  setDebugMode(prev => !prev);
                }}
              >
                Toggle Debug Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </PullupProvider>
  );
}
