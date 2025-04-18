'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import { UBParagraph } from '../UBParagraph';
import { UBSectionDivider } from '../UBSectionDivider';
import { useTheme } from '../../contexts/ThemeContext';
import { addToHistory } from '../../services/HistoryService';
import {
  getPaper,
  getParts,
  getPreviousPaper,
  getNextPaper,
  getPartForPaper,
  Paper,
  Part,
} from '../../services/PaperDataService';
import Breadcrumbs from '../navigation/Breadcrumbs';
import { PullupProvider } from '../pullup';
import { PullupContainer } from '../PullupContainer';
import '../navigation/Breadcrumbs.css';
import './TraditionalReader.css';

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
  const { contentTheme, setContentTheme, uiTheme, setUITheme } = useTheme();

  // Use inline styles based on theme
  const getThemeStyles = () => {
    return {
      appContainer: {
        backgroundColor: uiTheme === 'light' ? '#ffffff' : '#1a1a1a',
        color: uiTheme === 'light' ? '#333333' : '#f0e6d8',
      },
      header: {
        backgroundColor: uiTheme === 'light' ? '#f8f8f8' : '#222222',
        borderBottom: uiTheme === 'light' ? '1px solid #e2e8f0' : '1px solid #333333',
      },
      title: {
        color: uiTheme === 'light' ? '#2c5282' : '#7fc8f5',
      },
      settingsPanel: {
        backgroundColor: uiTheme === 'light' ? '#f8f8f8' : '#222222',
        borderLeft: uiTheme === 'light' ? '1px solid #e2e8f0' : '1px solid #333333',
      },
      text: {
        color: uiTheme === 'light' ? '#333333' : '#f0e6d8',
      },
      sectionTitle: {
        color: uiTheme === 'light' ? '#2c5282' : '#91a7f9',
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

  // Active section state
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Debug mode state
  const [debugMode, setDebugMode] = useState(false);

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);

  // Refs for dropdown and sections
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  const readingAreaRef = useRef<HTMLDivElement>(null);

  // Current section state for sticky header
  const [currentSection, setCurrentSection] = useState({
    part: '',
    paper: '',
    section: '',
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
        const partTitle = parts.find(p => p.number === partNumber)?.title || '';

        setCurrentSection({
          part: `Part ${partNumber}: ${partTitle}`,
          paper: `Paper ${paperData.number}: ${paperData.title}`,
          section: '',
        });

        // Add to reading history
        const title = paperId === 0 ? 'Foreword' : `Paper ${paperId}: ${paperData.title}`;
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
      if (uiTheme === 'light') {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#333333';
        appContainer.setAttribute(
          'style',
          'background-color: #ffffff !important; color: #333333 !important;'
        );

        // Update header and other elements
        const header = document.querySelector('.header');
        if (header) {
          header.setAttribute(
            'style',
            'background-color: #f8f8f8 !important; border-bottom: 1px solid #e2e8f0 !important;'
          );
        }

        // Update titles
        const titles = document.querySelectorAll(
          '.header-title, .section-title, .sticky-part-title, .sticky-paper-title, .sticky-section-title'
        );
        titles.forEach(title => {
          title.setAttribute('style', 'color: #2c5282 !important;');
        });
      } else {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#f0e6d8';
        appContainer.setAttribute(
          'style',
          'background-color: #1a1a1a !important; color: #f0e6d8 !important;'
        );

        // Update header and other elements
        const header = document.querySelector('.header');
        if (header) {
          header.setAttribute(
            'style',
            'background-color: #222222 !important; border-bottom: 1px solid #333333 !important;'
          );
        }

        // Update titles
        const titles = document.querySelectorAll(
          '.header-title, .section-title, .sticky-part-title, .sticky-paper-title, .sticky-section-title'
        );
        titles.forEach(title => {
          title.setAttribute('style', 'color: #7fc8f5 !important;');
        });
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

  // This function was previously used for section dropdown toggle
  // Now removed as part of the UI redesign

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
      // Offset for the sticky header
      const headerOffset = 120;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
  const handleThemeChange = (theme: 'modern' | 'traditional') => {
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

  // Previous/next navigation functions removed as part of UI redesign
  // Navigation now handled through the menu system

  // Handle title click (navigate to contents)
  const handleTitleClick = () => {
    router.push('/contents');
  };

  // Create sticky section title element on mount
  useEffect(() => {
    if (!readingAreaRef.current) return;

    // Create the sticky section title element if it doesn't exist
    let stickySection = document.getElementById('sticky-section-title');
    if (!stickySection) {
      console.log('Creating initial sticky section title element');
      const readingArea = document.querySelector('.reading-area');
      if (readingArea) {
        stickySection = document.createElement('div');
        stickySection.id = 'sticky-section-title';
        stickySection.style.position = 'fixed';
        stickySection.style.top = '105px';
        stickySection.style.left = '0';
        stickySection.style.right = '0';
        stickySection.style.zIndex = '25';
        stickySection.style.backgroundColor = uiTheme === 'light' ? '#ffffff' : '#1a1a1a';
        stickySection.style.borderBottom = '2px solid var(--border-color)';
        stickySection.style.padding = '0.6rem 1.5rem';
        stickySection.style.width = '100%';
        stickySection.style.maxWidth = '800px';
        stickySection.style.margin = '0 auto';
        stickySection.style.boxShadow = '0 3px 5px rgba(0, 0, 0, 0.2)';
        stickySection.style.color = uiTheme === 'light' ? '#2c5282' : '#91a7f9';
        stickySection.style.fontWeight = '700';
        stickySection.style.fontSize = '1.1rem';
        stickySection.style.display = 'none'; // Initially hidden
        stickySection.textContent = 'Current Section';
        readingArea.appendChild(stickySection);
      }
    }
  }, [readingAreaRef, uiTheme]);

  // Set up intersection observer for section titles
  useEffect(() => {
    if (!readingAreaRef.current) return;

    // Options for the observer
    const options = {
      root: null, // Use the viewport
      rootMargin: '-120px 0px -70% 0px', // Adjusted margins for better detection
      threshold: [0, 0.1, 0.5], // Lower threshold for earlier detection
    };

    // Function to update the sticky section title
    const updateStickyTitle = (sectionId: string | null, sectionText: string) => {
      const stickySection = document.getElementById('sticky-section-title');
      if (sectionId && sectionText) {
        if (stickySection) {
          stickySection.style.display = 'block';
          stickySection.textContent = sectionText;
          console.log('Updated sticky title to:', sectionText);
        }
      } else {
        if (stickySection) {
          stickySection.style.display = 'none';
        }
      }
    };

    // Get all section titles for reference
    const allSectionTitles = Array.from(document.querySelectorAll('h3.section-title'));

    // Callback for the observer
    const callback = (entries: IntersectionObserverEntry[]) => {
      // First, handle entries that are leaving the viewport
      const leavingEntries = entries.filter(
        entry => !entry.isIntersecting && entry.boundingClientRect.top < 0
      );

      if (leavingEntries.length > 0) {
        // Sort by position (closest to viewport top first)
        leavingEntries.sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
        );
        const closestLeavingEntry = leavingEntries[0];

        // Find the next section that should be active
        const leavingSectionId = closestLeavingEntry.target.id;
        const leavingIndex = allSectionTitles.findIndex(section => section.id === leavingSectionId);

        if (leavingIndex > 0) {
          // There's a previous section, make it active
          const nextActiveSection = allSectionTitles[leavingIndex - 1];
          setActiveSection(nextActiveSection.id);
          const sectionText = nextActiveSection.textContent || '';
          setCurrentSection(prev => ({ ...prev, section: sectionText }));
          updateStickyTitle(nextActiveSection.id, sectionText);
        }
      }

      // Then handle entries that are entering the viewport
      const visibleEntries = entries.filter(
        entry => entry.isIntersecting && entry.intersectionRatio > 0.1
      );

      if (visibleEntries.length > 0) {
        // Sort by position (top to bottom)
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topVisibleEntry = visibleEntries[0];

        const sectionId = topVisibleEntry.target.id;
        // Only update if this is a different section than the current active one
        if (sectionId !== activeSection) {
          console.log('Setting active section:', sectionId);
          setActiveSection(sectionId);

          // Update current section title
          const fullText = topVisibleEntry.target.textContent || '';
          setCurrentSection(prev => ({ ...prev, section: fullText }));
          updateStickyTitle(sectionId, fullText);
        }
      }

      // If no sections are visible and we're at the top, clear the active section
      if (visibleEntries.length === 0 && window.scrollY < 100) {
        setActiveSection(null);
        setCurrentSection(prev => ({ ...prev, section: '' }));
        updateStickyTitle(null, '');
      }
    };

    // Create observer
    const observer = new IntersectionObserver(callback, options);

    // Observe all section titles
    allSectionTitles.forEach(title => {
      observer.observe(title);
    });

    console.log('Observing section titles:', allSectionTitles.length);

    return () => {
      observer.disconnect();
    };
  }, [activeSection, paper, uiTheme]);

  // Set up scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!readingAreaRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setReadingProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add keyboard shortcut for debug mode (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        console.log('Toggling debug mode');
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
        className={`app-container ${uiTheme === 'dark' ? 'dark-theme-container' : 'light-theme-container'}`}
      >
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <PullupProvider>
      <div
        className={`app-container ${uiTheme === 'dark' ? 'dark-theme-container' : 'light-theme-container'}`}
      >
        {/* Header */}
        <header className="header" style={themeStyles.header}>
          {/* Left Group - Navigation Button */}
          <div className="header-left-group">
            {/* Paper Navigation Button - Changed to hamburger icon */}
            <button
              id="toggle-nav"
              className="header-button"
              onClick={handleNavigationToggle}
              title="Papers"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          {/* Center Group - Title Only */}
          <div className="header-center-group">
            {/* Book Title - Removed "The" */}
            <div className="header-title-container">
              <button
                className="header-title"
                onClick={handleTitleClick}
                style={{
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: themeStyles.title.color,
                }}
              >
                Urantia Book
              </button>
            </div>
          </div>

          {/* Right Group - Settings Button with hamburger icon */}
          <button
            id="toggle-settings"
            className="header-button"
            onClick={handleSettingsToggle}
            title="Settings"
          >
            <i className="fas fa-bars"></i>
          </button>
        </header>

        {/* Navigation Menu */}
        <nav id="navigation-menu" className={`navigation-menu ${navigationOpen ? 'open' : ''}`}>
          {/* Parts and Papers */}
          {parts.map(part => (
            <div
              key={part.number}
              className={
                part.number === getPartForPaper(paperId) ? 'nav-fixed-top' : 'nav-fixed-bottom'
              }
            >
              <button
                className={`part-toggle ${
                  part.number === getPartForPaper(paperId) ? 'active expanded' : ''
                }`}
                data-part={`part${part.number}`}
                onClick={() => handlePartToggle(part.number)}
              >
                PART {part.number}. {part.title}
                <i className="fas fa-chevron-down"></i>
              </button>
              <div
                className={`part-content ${
                  part.number === getPartForPaper(paperId) ? 'expanded' : ''
                }`}
                id={`part${part.number}-content`}
              >
                <ul className="nav-list">
                  {part.papers.map(paperItem => (
                    <li key={paperItem.number}>
                      <button
                        className={`nav-paper-button ${paperItem.number === paperId ? 'active' : ''}`}
                        onClick={() => handlePaperClick(paperItem.number)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          color: 'inherit',
                          textAlign: 'left',
                          width: '100%',
                          cursor: 'pointer',
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
        <div id="settings-panel" className={`settings-panel ${settingsOpen ? 'open' : ''}`}>
          <div className="settings-section">
            <h3 className="settings-title">Display Settings</h3>
            <div className="settings-option">
              <h4 className="settings-option-title">Theme</h4>
              <div className="settings-option-list">
                <button
                  className={`settings-option-button ${uiTheme === 'dark' ? 'active' : ''}`}
                  onClick={() => setUITheme('dark')}
                >
                  Dark
                </button>
                <button
                  className={`settings-option-button ${uiTheme === 'light' ? 'active' : ''}`}
                  onClick={() => setUITheme('light')}
                >
                  Light
                </button>
              </div>
            </div>
            <div className="settings-option">
              <h4 className="settings-option-title">Content Formatting</h4>
              <div className="settings-option-list">
                <button
                  className={`settings-option-button ${contentTheme === 'modern' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('modern')}
                >
                  Modern
                </button>
                <button
                  className={`settings-option-button ${
                    contentTheme === 'traditional' ? 'active' : ''
                  }`}
                  onClick={() => handleThemeChange('traditional')}
                >
                  Traditional
                </button>
              </div>
            </div>
            <div className="settings-option">
              <h4 className="settings-option-title">Font Size</h4>
              <div className="settings-option-list">
                <button className="settings-option-button">Small</button>
                <button className="settings-option-button active">Medium</button>
                <button className="settings-option-button">Large</button>
                <button className="settings-option-button">X-Large</button>
              </div>
            </div>
            <div className="settings-option">
              <h4 className="settings-option-title">Font Style</h4>
              <div className="settings-option-list">
                <button className="settings-option-button">Sans-serif</button>
                <button className="settings-option-button active">Serif</button>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <h3 className="settings-title">Reading Settings</h3>
            <div className="settings-option">
              <h4 className="settings-option-title">Line Spacing</h4>
              <div className="settings-option-list">
                <button className="settings-option-button">Compact</button>
                <button className="settings-option-button active">Normal</button>
                <button className="settings-option-button">Relaxed</button>
              </div>
            </div>
            <div className="settings-option">
              <h4 className="settings-option-title">Text Width</h4>
              <div className="settings-option-list">
                <button className="settings-option-button">Narrow</button>
                <button className="settings-option-button active">Medium</button>
                <button className="settings-option-button">Wide</button>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <h3 className="settings-title">Navigation</h3>
            <div className="settings-option">
              <h4 className="settings-option-title">Reading History</h4>
              <div className="settings-option-description">
                View your reading history and quickly access recently read papers.
              </div>
              <div className="mt-2">
                <Link
                  href="/history"
                  className="settings-link"
                  onClick={() => setSettingsOpen(false)}
                >
                  View Reading History <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
            <div className="settings-option">
              <h4 className="settings-option-title">Contents</h4>
              <div className="settings-option-description">
                Browse the complete table of contents.
              </div>
              <div className="mt-2">
                <Link
                  href="/contents"
                  className="settings-link"
                  onClick={() => setSettingsOpen(false)}
                >
                  View Contents <i className="fas fa-arrow-right ml-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <button
          id="overlay"
          className={`overlay ${
            navigationOpen || settingsOpen || sectionDropdownOpen ? 'active' : ''
          }`}
          onClick={handleOverlayClick}
          aria-label="Close panels"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            inset: '56px 0 0',
            zIndex: 30,
            display: navigationOpen || settingsOpen || sectionDropdownOpen ? 'block' : 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(2px)',
          }}
        ></button>

        {/* Reading Progress Bar */}
        <div className="reading-progress-container">
          <div
            className="reading-progress-bar"
            style={{ width: `${readingProgress}%` }}
            title={`Reading progress: ${Math.round(readingProgress)}%`}
          ></div>
        </div>

        {/* Breadcrumbs Navigation */}
        {paper && (
          <Breadcrumbs
            paperId={paperId}
            paperTitle={paper.title}
            sectionTitle={currentSection.section}
          />
        )}

        {/* Content Container */}
        <div className="content-container">
          {/* Section Navigation Sidebar */}
          {paper && (
            <div className="section-navigation-sidebar">
              <div className="section-navigation-title" style={themeStyles.sectionTitle}>
                Sections
              </div>
              <ul className="section-navigation-list">
                {paper.sections.map(section => (
                  <li
                    key={section.number}
                    className={activeSection === `section${section.number}` ? 'active' : ''}
                  >
                    <button
                      onClick={e => handleSectionClick(e, `section${section.number}`)}
                      className="section-navigation-button"
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        color: uiTheme === 'light' ? '#333333' : '#f0e6d8',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        transition: 'background-color 0.2s',
                        borderLeft: '3px solid transparent',
                        textAlign: 'left',
                        width: '100%',
                        display: 'block',
                      }}
                    >
                      {section.number}. {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reading Area */}
          <div className="reading-area" id="reading-area" ref={readingAreaRef}>
            <div className="content" data-theme={contentTheme}>
              {/* Sticky Headers */}
              <div
                className={`sticky-header ${activeSection ? 'section-active' : ''}`}
                style={{
                  position: 'fixed',
                  top: '56px',
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  backgroundColor: uiTheme === 'light' ? '#ffffff' : '#1a1a1a',
                  padding: '0.4rem 0 0.3rem',
                  borderBottom: '1px solid var(--border-color)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  maxWidth: '800px',
                  margin: '0 auto',
                  paddingLeft: '1.5rem',
                }}
              >
                <div
                  className="sticky-part-title"
                  id="sticky-part-title"
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.2rem',
                    display: 'block',
                  }}
                >
                  {currentSection.part}
                </div>
                <div
                  className="sticky-paper-title"
                  id="sticky-paper-title"
                  style={{
                    ...themeStyles.sectionTitle,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '0.3rem',
                  }}
                >
                  {currentSection.paper}
                </div>
              </div>

              {/* Sticky Section Header - Always visible when a section is active */}
              {activeSection && (
                <div
                  id="sticky-section-title"
                  data-active="true"
                  data-has-content={currentSection.section ? 'true' : 'false'}
                  style={{
                    position: 'fixed',
                    top: '105px',
                    left: 0,
                    right: 0,
                    zIndex: 25,
                    backgroundColor: uiTheme === 'light' ? '#ffffff' : '#1a1a1a',
                    borderBottom: '2px solid var(--border-color)',
                    padding: '0.6rem 1.5rem',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                    color: uiTheme === 'light' ? '#2c5282' : '#91a7f9',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    display: 'block',
                  }}
                >
                  {currentSection.section || 'Current Section'} {/* Add fallback text */}
                </div>
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

                      {section.paragraphs.map((paragraph, index) => (
                        <UBParagraph
                          key={paragraph.number}
                          paragraph={paragraph}
                          currentPaper={paper.number}
                          isTopicChange={index > 0 && index % 3 === 0} // Add topic change spacing every 3 paragraphs
                        />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <button className="copy-button" title="Copy selected text" onClick={handleCopyClick}>
          <i className="fas fa-copy"></i>
        </button>

        {/* Toast Notification */}
        <div className="toast">Text copied to clipboard!</div>

        {/* Debug Panel - Enhanced for better visibility */}
        {debugMode && (
          <div
            className="debug-panel"
            style={{
              position: 'fixed',
              top: '150px',
              right: '20px',
              background: 'rgba(0,0,0,0.9)',
              color: 'white',
              padding: '15px',
              zIndex: 1000,
              borderRadius: '5px',
              maxWidth: '350px',
              fontFamily: 'monospace',
              fontSize: '13px',
              boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            }}
          >
            <h4 style={{ margin: '0 0 10px 0', color: '#7fc8f5' }}>Debug Info</h4>
            <p style={{ margin: '5px 0' }}>
              <strong>Active Section:</strong> {activeSection || 'none'}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Current Section Title:</strong>{' '}
              <span style={{ color: currentSection.section ? '#90ee90' : '#ff6666' }}>
                {currentSection.section || 'none'}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Sticky Section Visible:</strong>{' '}
              <span style={{ color: activeSection ? '#90ee90' : '#ff6666' }}>
                {activeSection ? 'Yes' : 'No'}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Section Titles Count:</strong>{' '}
              {document.querySelectorAll('h3.section-title').length}
            </p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setDebugMode(false)}
                style={{
                  background: '#555',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Close Debug
              </button>
              <button
                onClick={() => {
                  // Force toggle the sticky section title visibility
                  const stickySection = document.getElementById('sticky-section-title');
                  if (stickySection) {
                    // Simple toggle for debugging
                    if (stickySection.style.display === 'block') {
                      stickySection.style.display = 'none';
                    } else {
                      stickySection.style.display = 'block';
                      // Make sure it has content
                      if (!stickySection.textContent || stickySection.textContent.trim() === '') {
                        stickySection.textContent = currentSection.section || 'Current Section';
                      }
                    }
                  }
                }}
                style={{
                  background: '#2c5282',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                Toggle Section Title
              </button>
            </div>
          </div>
        )}

        {/* Pullup Container */}
        <PullupContainer />
      </div>
    </PullupProvider>
  );
}
