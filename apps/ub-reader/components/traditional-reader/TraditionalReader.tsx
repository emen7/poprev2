'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import {
  getPaper,
  getParts,
  getPreviousPaper,
  getNextPaper,
  getPartForPaper,
  Paper,
  Section,
  Part,
} from '../../services/PaperDataService';
import { addToHistory } from '../../services/HistoryService';
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
  const { contentTheme, setContentTheme } = useTheme();

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

  // Handle section dropdown toggle
  const handleSectionDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSectionDropdownOpen(!sectionDropdownOpen);
    // Close other panels if open
    if (navigationOpen) {
      setNavigationOpen(false);
    }
    if (settingsOpen) {
      setSettingsOpen(false);
    }
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
    e.preventDefault();

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

  // Handle previous/next navigation
  const handlePrevious = () => {
    const prevPaper = getPreviousPaper(paperId);
    if (prevPaper !== null) {
      router.push(`/traditional-reader/${prevPaper}`);
    }
  };

  const handleNext = () => {
    const nextPaper = getNextPaper(paperId);
    if (nextPaper !== null) {
      router.push(`/traditional-reader/${nextPaper}`);
    }
  };

  // Handle title click (navigate to contents)
  const handleTitleClick = () => {
    router.push('/contents');
  };

  // Set up intersection observer for section titles
  useEffect(() => {
    if (!readingAreaRef.current) return;

    // Options for the observer
    const options = {
      root: null, // Use the viewport
      rootMargin: '-120px 0px 0px 0px', // Adjust for sticky header height
      threshold: [0, 0.1, 0.5, 1], // Multiple thresholds for better detection
    };

    // Callback for the observer
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          // Section is entering the viewport
          setActiveSection(sectionId);

          // Update current section title
          const sectionTitle = entry.target.textContent || '';
          setCurrentSection(prev => ({
            ...prev,
            section: sectionTitle,
          }));
        } else if (
          activeSection === sectionId &&
          entry.boundingClientRect.top > 0 &&
          !entry.isIntersecting
        ) {
          // Section is leaving the viewport by scrolling up
          // Find the previous section
          const sections = Array.from(document.querySelectorAll('.section-title'));
          const currentIndex = sections.findIndex(section => section.id === sectionId);

          if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            setActiveSection(prevSection.id);
            setCurrentSection(prev => ({
              ...prev,
              section: prevSection.textContent || '',
            }));
          } else {
            // If there's no previous section, we're at the top
            setActiveSection(null);
            setCurrentSection(prev => ({
              ...prev,
              section: '',
            }));
          }
        }
      });
    };

    // Create observer
    const observer = new IntersectionObserver(callback, options);

    // Observe all section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      observer.observe(title);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeSection, paper]);

  // Render loading state
  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <PullupProvider>
      <div className="app-container">
        {/* Header */}
        <header className="header">
          {/* Left Group - Navigation Buttons */}
          <div className="header-left-group">
            {/* Paper Navigation Button */}
            <button
              id="toggle-nav"
              className="header-button"
              onClick={handleNavigationToggle}
              title="Papers"
            >
              <i className="fas fa-book"></i>
            </button>

            {/* Section Navigation Button */}
            <div className="section-navigation-header" ref={sectionDropdownRef}>
              <button
                className="header-button section-button"
                onClick={handleSectionDropdownToggle}
                title="Sections"
              >
                <i className="fas fa-list"></i>
              </button>
              <div className={`section-dropdown-content ${sectionDropdownOpen ? 'show' : ''}`}>
                {paper?.sections.map(section => (
                  <a
                    key={section.number}
                    href={`#section${section.number}`}
                    onClick={e => handleSectionClick(e, `section${section.number}`)}
                  >
                    {section.number}. {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Center Group - Title and Prev/Next Buttons */}
          <div className="header-center-group">
            {/* Previous Button */}
            <button
              className={`header-button nav-prev-button ${
                getPreviousPaper(paperId) === null ? 'disabled' : ''
              }`}
              onClick={handlePrevious}
              title="Previous"
              disabled={getPreviousPaper(paperId) === null}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {/* Book Title */}
            <div className="header-title-container">
              <h1 className="header-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                The Urantia Book
              </h1>
              <div className="header-subtitle">
                <Link href="/papers" className="header-subtitle-link">
                  View All Papers
                </Link>
              </div>
            </div>

            {/* Next Button */}
            <button
              className={`header-button nav-next-button ${
                getNextPaper(paperId) === null ? 'disabled' : ''
              }`}
              onClick={handleNext}
              title="Next"
              disabled={getNextPaper(paperId) === null}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Settings Button - Now on the right */}
          <button
            id="toggle-settings"
            className="header-button"
            onClick={handleSettingsToggle}
            title="Settings"
          >
            <i className="fas fa-cog"></i>
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
                      <a
                        href="#"
                        className={paperItem.number === paperId ? 'active' : ''}
                        onClick={e => {
                          e.preventDefault();
                          handlePaperClick(paperItem.number);
                        }}
                      >
                        Paper {paperItem.number}: {paperItem.title}
                      </a>
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
                <button className="settings-option-button active">Dark</button>
                <button className="settings-option-button">Light</button>
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
        <div
          id="overlay"
          className={`overlay ${
            navigationOpen || settingsOpen || sectionDropdownOpen ? 'active' : ''
          }`}
          onClick={handleOverlayClick}
        ></div>

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
          {/* Reading Area */}
          <div className="reading-area" id="reading-area" ref={readingAreaRef}>
            <div className={`content content-${contentTheme}`}>
              {/* Sticky Headers */}
              <div className="sticky-header">
                <div className="sticky-part-title" id="sticky-part-title">
                  {currentSection.part}
                </div>
                <div className="sticky-paper-title" id="sticky-paper-title">
                  {currentSection.paper}
                </div>
              </div>

              {/* Sticky Section Header - Only shown when a section is active */}
              <div
                className={`sticky-section-title ${activeSection ? 'active' : ''}`}
                id="sticky-section-title"
              >
                {currentSection.section}
              </div>

              {/* Paper Introduction */}
              {paper && (
                <>
                  <div className="paper-introduction">
                    <h2 className="paper-title">
                      PAPER {paper.number}. {paper.title.toUpperCase()}
                    </h2>
                    {paper.author && (
                      <div className="paper-author">
                        <em>Presented by {paper.author}</em>
                      </div>
                    )}

                    {/* Introduction paragraph (if available) */}
                    {paper.sections[0]?.paragraphs[0] && (
                      <div className="paragraph" data-paragraph-id="p0">
                        <span className="paragraph-number">0</span>
                        <div className="paragraph-text">{paper.sections[0].paragraphs[0].text}</div>
                      </div>
                    )}
                  </div>

                  {/* Sections */}
                  {paper.sections.map(section => (
                    <div
                      key={section.number}
                      className="section-content"
                      id={`section${section.number}`}
                    >
                      <h3 className="section-title">
                        {section.number}. {section.title.toUpperCase()}
                      </h3>

                      {section.paragraphs.map(paragraph => (
                        <div
                          key={paragraph.number}
                          className="paragraph"
                          data-paragraph-id={`p${section.number}-${paragraph.number}`}
                        >
                          <span className="paragraph-number">{paragraph.number}</span>
                          <div className="paragraph-text">{paragraph.text}</div>
                        </div>
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

        {/* Pullup Container */}
        <PullupContainer />
      </div>
    </PullupProvider>
  );
}
