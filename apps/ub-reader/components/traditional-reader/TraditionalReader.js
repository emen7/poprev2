'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { UBParagraph } from '../UBParagraph';
import { UBSectionDivider } from '../UBSectionDivider';
import { useTheme } from '../../contexts/ThemeContext';
import { addToHistory } from '../../services/HistoryService';
import { getPaper, getParts, getPreviousPaper, getNextPaper, getPartForPaper, } from '../../services/PaperDataService';
import { PullupProvider } from '../../contexts/PullupContext';
import { PullupContainer } from '../PullupContainer';
import { ThreeRowHeader } from '../three-row-header';
import '../navigation/Breadcrumbs.css';
import './styles/index.css';
/**
 * Traditional Reader Component
 *
 * This component implements a reader interface that matches the improved-demo.html
 * but uses the traditional theme by default.
 */
export default function TraditionalReader({ paperId = 1 }) {
    var _a;
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
    const [paper, setPaper] = useState(null);
    const [parts, setParts] = useState([]);
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
    const sectionDropdownRef = useRef(null);
    const readingAreaRef = useRef(null);
    // Current section state for paper info only
    // (section title handled by ThreeRowHeader)
    const [currentSection, setCurrentSection] = useState({
        part: '',
        paper: '',
    });
    // Fetch paper data
    useEffect(() => {
        const fetchData = async () => {
            var _a;
            setLoading(true);
            try {
                const paperData = await getPaper(paperId);
                setPaper(paperData);
                // Update current section info
                const partNumber = getPartForPaper(paperId);
                const partTitle = ((_a = parts.find(p => p.number === partNumber)) === null || _a === void 0 ? void 0 : _a.title) || '';
                setCurrentSection({
                    part: `Part ${partNumber}: ${partTitle}`,
                    paper: `Paper ${paperData.number}: ${paperData.title}`,
                });
                // Add to reading history
                const title = paperId === 0 ? 'Foreword' : `Paper ${paperId}: ${paperData.title}`;
                addToHistory(paperId, title);
            }
            catch (error) {
                console.error('Error fetching paper:', error);
            }
            finally {
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
                appContainer.setAttribute('style', 'background-color: #ffffff !important; color: #333333 !important;');
            }
            else {
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#f0e6d8';
                appContainer.setAttribute('style', 'background-color: #1a1a1a !important; color: #f0e6d8 !important;');
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
        const handleClickOutside = (event) => {
            if (sectionDropdownRef.current &&
                !sectionDropdownRef.current.contains(event.target)) {
                setSectionDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Handle section navigation
    const handleSectionClick = (e, sectionId) => {
        // Close the dropdown
        setSectionDropdownOpen(false);
        // Scroll to section
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            // Offset for the three-row header
            const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-total-height')) || 120;
            const elementPosition = sectionElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };
    // Handle paper navigation
    const handlePaperClick = (paperNumber) => {
        router.push(`/traditional-reader/${paperNumber}`);
    };
    // Handle part toggle
    const handlePartToggle = (partNumber) => {
        // Toggle the expanded state of the part
        const partToggle = document.querySelector(`[data-part="part${partNumber}"]`);
        const partContent = document.getElementById(`part${partNumber}-content`);
        if (partToggle && partContent) {
            partToggle.classList.toggle('expanded');
            partContent.classList.toggle('expanded');
        }
    };
    // Handle theme change
    const handleThemeChange = (theme) => {
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
            if (!readingAreaRef.current)
                return;
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
        const handleKeyDown = (e) => {
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
        return (_jsx("div", { className: `app-container ${uiTheme === 'dark' ? 'dark-theme-container' : 'light-theme-container'}`, children: _jsxs("div", { className: "loading-container", children: [_jsx("div", { className: "loading-spinner" }), _jsx("div", { className: "loading-text", children: "Loading..." })] }) }));
    }
    return (_jsx(PullupProvider, { initialSettings: {
            fontSize: 16,
            lineHeight: 1.6,
            fontFamily: 'system-ui, sans-serif',
            theme: uiTheme,
            showParagraphNumbers: true,
            formatType: 'traditional',
        }, children: _jsxs("div", { className: `app-container ${uiTheme === 'dark' ? 'dark-theme-container' : 'light-theme-container'}`, children: [_jsxs("div", { className: "reader-container", children: [_jsx("nav", { id: "navigation-menu", className: `navigation-menu ${navigationOpen ? 'open' : ''}`, children: parts.map(part => (_jsxs("div", { className: part.number === getPartForPaper(paperId) ? 'nav-fixed-top' : 'nav-fixed-bottom', children: [_jsxs("button", { className: `part-toggle ${part.number === getPartForPaper(paperId) ? 'active expanded' : ''}`, "data-part": `part${part.number}`, onClick: () => handlePartToggle(part.number), children: ["PART ", part.number, ". ", part.title, _jsx("i", { className: "fas fa-chevron-down" })] }), _jsx("div", { className: `part-content ${part.number === getPartForPaper(paperId) ? 'expanded' : ''}`, id: `part${part.number}-content`, children: _jsx("ul", { className: "nav-list", children: part.papers.map(paperItem => (_jsx("li", { children: _jsxs("button", { className: `nav-paper-button ${paperItem.number === paperId ? 'active' : ''}`, onClick: () => handlePaperClick(paperItem.number), style: {
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: '0.25rem 0.5rem',
                                                        color: 'inherit',
                                                        textAlign: 'left',
                                                        width: '100%',
                                                        cursor: 'pointer',
                                                    }, children: ["Paper ", paperItem.number, ": ", paperItem.title] }) }, paperItem.number))) }) })] }, part.number))) }), _jsxs("div", { id: "settings-panel", className: `settings-panel ${settingsOpen ? 'open' : ''}`, children: [_jsx("h2", { className: "settings-title", children: "Settings" }), _jsxs("div", { className: "settings-section", children: [_jsx("h3", { className: "settings-section-title", children: "UI Theme" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `theme-button ${uiTheme === 'light' ? 'active' : ''}`, onClick: () => setUITheme('light'), children: "Light" }), _jsx("button", { className: `theme-button ${uiTheme === 'dark' ? 'active' : ''}`, onClick: () => setUITheme('dark'), children: "Dark" }), _jsx("button", { className: "theme-button", onClick: () => {
                                                        // Use preferred color scheme from OS
                                                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                                        setUITheme(prefersDark ? 'dark' : 'light');
                                                    }, children: "System" })] })] }), _jsxs("div", { className: "settings-section", children: [_jsx("h3", { className: "settings-section-title", children: "Content Format" }), _jsxs("div", { className: "settings-options", children: [_jsx("button", { className: `theme-button ${contentTheme === 'traditional' ? 'active' : ''}`, onClick: () => handleThemeChange('traditional'), children: "Traditional" }), _jsx("button", { className: `theme-button ${contentTheme === 'modern' ? 'active' : ''}`, onClick: () => handleThemeChange('modern'), children: "Modern" })] })] }), _jsxs("div", { className: "settings-about", children: [_jsx("div", { className: "mt-2", children: _jsx(Link, { href: "/contents", className: "settings-link", children: "Table of Contents" }) }), _jsx("div", { className: "mt-2", children: _jsx(Link, { href: "/", className: "settings-link", children: "Reader Home" }) })] })] }), _jsx("div", { className: `content-overlay ${navigationOpen || settingsOpen ? 'active' : ''}`, onClick: handleOverlayClick }), _jsx("div", { id: "section-dropdown", className: `section-dropdown ${sectionDropdownOpen ? 'open' : ''}`, ref: sectionDropdownRef, children: _jsxs("div", { className: "section-dropdown-content", children: [_jsx("h3", { className: "section-dropdown-title", children: "Jump to Section" }), _jsx("ul", { className: "section-list", children: paper === null || paper === void 0 ? void 0 : paper.sections.map(section => (_jsx("li", { children: _jsxs("button", { className: "section-link", onClick: e => handleSectionClick(e, `section-title-${section.number}`), children: [section.number, ". ", section.title] }) }, section.number))) })] }) }), _jsx("div", { className: "reading-area ub-reading-content", id: "reading-area", ref: readingAreaRef, children: _jsxs("div", { className: "content", "data-theme": contentTheme, children: [paper && (_jsx(ThreeRowHeader, { paper: {
                                            id: `paper-${paper.number}`,
                                            number: paper.number,
                                            title: paper.title,
                                            sections: paper.sections.map(section => ({
                                                id: `section-${section.number}`,
                                                number: section.number,
                                                title: section.title,
                                            })),
                                        }, onBookMenuToggle: handleNavigationToggle, onSectionMenuToggle: () => setSectionDropdownOpen(!sectionDropdownOpen), onPreviousPaper: () => {
                                            if (paper) {
                                                const prevPaperNum = getPreviousPaper(paper.number);
                                                if (prevPaperNum !== null)
                                                    handlePaperClick(prevPaperNum);
                                            }
                                        }, onNextPaper: () => {
                                            if (paper) {
                                                const nextPaperNum = getNextPaper(paper.number);
                                                if (nextPaperNum !== null)
                                                    handlePaperClick(nextPaperNum);
                                            }
                                        } })), paper && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "paper-introduction", children: [_jsx("h2", { className: "paper-title" }), ((_a = paper.sections[0]) === null || _a === void 0 ? void 0 : _a.paragraphs[0]) && (_jsx(UBParagraph, { paragraph: paper.sections[0].paragraphs[0], currentPaper: paper.number }))] }), paper.sections.map(section => (_jsxs("div", { className: "section-content", id: `section-container-${section.number}`, children: [_jsxs("h3", { className: "section-title", id: `section-title-${section.number}`, children: [section.number, ". ", section.title] }), _jsx(UBSectionDivider, {}), _jsx("div", { className: "paragraphs", children: section.paragraphs.map((paragraph, index) => (_jsx(UBParagraph, { paragraph: paragraph, currentPaper: paper.number }, paragraph.number))) })] }, section.number)))] }))] }) })] }), ' ', _jsx("div", { className: "toast", children: "Text copied to clipboard!" }), _jsx("div", { className: "reading-progress-container", children: _jsx("div", { className: "reading-progress-bar", style: { width: `${readingProgress}%` }, "aria-label": "reading progress" }) }), _jsx("button", { className: "copy-button", onClick: handleCopyClick, title: "Copy selected text", children: _jsx("i", { className: "fas fa-copy" }) }), _jsx(PullupContainer, {}), debugMode && (_jsxs("div", { className: "debug-info", children: [_jsx("h3", { children: "Debug Info" }), _jsxs("p", { children: [_jsx("strong", { children: "Paper ID:" }), " ", paperId] }), _jsxs("p", { children: [_jsx("strong", { children: "UI Theme:" }), " ", uiTheme] }), _jsxs("p", { children: [_jsx("strong", { children: "Content Theme:" }), " ", contentTheme] }), _jsxs("p", { children: [_jsx("strong", { children: "Section Titles Count:" }), ' ', document.querySelectorAll('h3.section-heading').length ||
                                    document.querySelectorAll('h3.section-title').length] }), _jsxs("p", { children: [_jsx("strong", { children: "Reading Progress:" }), " ", readingProgress.toFixed(2), "%"] }), _jsx("div", { className: "debug-controls", children: _jsx("button", { className: "debug-button", onClick: () => {
                                    // Toggle debug mode
                                    setDebugMode(prev => !prev);
                                }, children: "Toggle Debug Mode" }) })] }))] }) }));
}
//# sourceMappingURL=TraditionalReader.js.map