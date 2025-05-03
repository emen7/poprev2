'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Pullup } from './pullup/Pullup';
import { usePullup } from '../contexts/PullupContext';
import { TextSelectionHandler } from './pullup/TextSelectionHandler';
import '../styles/themes/global.css';
import '../styles/theme-transitions.css';
/**
 * PullupContainer Component
 *
 * This component connects the pullup UI components with the state management.
 * It provides a bottom panel with tabs for Notes, Quotes, and Settings.
 */
export const PullupContainer = () => {
    // Get theme context
    const { uiTheme } = useTheme();
    // Get pullup state and actions from the usePullup hook
    const { isOpen, activeTab, height, isPersistent, 
    // openPullup is not used in this component
    closePullup, setActiveTab: originalSetActiveTab, // Rename original hook function
    setHeight, } = usePullup();
    // State for peeking
    const [isPeeking, setIsPeeking] = useState(true);
    // State to track if we're on desktop
    const [isDesktop, setIsDesktop] = useState(false);
    // Reference to desktop tabs container
    const desktopTabsRef = useRef(null);
    // State for notes
    const [notes, setNotes] = useState([]);
    // State for quotes
    const [quotes, setQuotes] = useState([]);
    // State for settings
    const [settings, setSettings] = useState({
        fontSize: 16,
        lineHeight: 1.6,
        fontFamily: 'Georgia, serif',
        theme: uiTheme,
        showParagraphNumbers: true,
        formatType: 'traditional',
    });
    // State for sort order
    const [sortOrder, setSortOrder] = useState('entry');
    // State to track the ID of a newly added note to trigger editing
    const [justAddedNoteId, setJustAddedNoteId] = useState(null);
    // Update settings when theme changes
    useEffect(() => {
        handleSettingsChange({ theme: uiTheme });
    }, [uiTheme]);
    // Detect desktop screen size
    useEffect(() => {
        const checkIfDesktop = () => {
            const desktopBreakpoint = 1024;
            setIsDesktop(window.innerWidth >= desktopBreakpoint);
        };
        // Check on mount and when window resizes
        checkIfDesktop();
        window.addEventListener('resize', checkIfDesktop);
        return () => {
            window.removeEventListener('resize', checkIfDesktop);
        };
    }, []);
    // Load notes and quotes from localStorage on component mount
    useEffect(() => {
        const loadedNotes = localStorage.getItem('ub-reader-notes');
        if (loadedNotes) {
            try {
                setNotes(JSON.parse(loadedNotes));
            }
            catch (error) {
                console.error('Error loading notes from localStorage:', error);
            }
        }
        const loadedQuotes = localStorage.getItem('ub-reader-quotes');
        if (loadedQuotes) {
            try {
                setQuotes(JSON.parse(loadedQuotes));
            }
            catch (error) {
                console.error('Error loading quotes from localStorage:', error);
            }
        }
    }, []);
    // Save notes to localStorage when they change
    useEffect(() => {
        localStorage.setItem('ub-reader-notes', JSON.stringify(notes));
    }, [notes]);
    // Save quotes to localStorage when they change
    useEffect(() => {
        localStorage.setItem('ub-reader-quotes', JSON.stringify(quotes));
    }, [quotes]);
    // Handle note update
    const handleNoteUpdate = (id, content) => {
        setNotes(notes.map(note => note.id === id ? Object.assign(Object.assign({}, note), { content, updatedAt: new Date().toISOString() }) : note));
    };
    // Handle note delete
    const handleNoteDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };
    // Handle quote delete
    const handleQuoteDelete = (id) => {
        setQuotes(quotes.filter(quote => quote.id !== id));
    };
    // Handle settings change
    const handleSettingsChange = (newSettings) => {
        setSettings(Object.assign(Object.assign({}, settings), newSettings));
    };
    // Handle sort order change
    const handleSortOrderChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
    };
    // Handle note creation
    const handleNoteCreate = (note) => {
        setNotes([note, ...notes]);
    };
    // Handle quote creation
    const handleQuoteCreate = (quote) => {
        setQuotes([quote, ...quotes]);
    };
    // Handle adding a new note
    const handleAddNewNote = () => {
        const newNote = {
            id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Simple unique ID
            content: '', // Start with empty content
            reference: 'New Note', // Placeholder reference
            selectedText: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paragraphId: 'new-note', // Placeholder ID
        };
        setNotes([newNote, ...notes]); // Add to the beginning of the list
        originalSetActiveTab('notes'); // Switch to notes tab using the renamed function
        // Ideally, we'd also set the editingNoteId here, but that state is in NotesTab.
        // We might need to lift that state up or pass a callback to NotesTab
        // to trigger editing mode for the new note ID after it's added.
        // For now, just adding the note.
        // We also need to trigger editing in NotesTab via justAddedNoteId state.
        setJustAddedNoteId(newNote.id);
    };
    // Callback for NotesTab to signal editing has started and reset the trigger state
    const handleEditStarted = () => {
        setJustAddedNoteId(null);
    };
    // Handle height change
    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
        if (!isOpen && isPeeking) {
            // If panel is peeking and user drags it, open it fully
            setIsPeeking(false);
        }
    };
    // Handle desktop tab click
    const handleDesktopTabClick = (tab) => {
        originalSetActiveTab(tab);
        if (!isOpen) {
            setHeight(300);
            setIsPeeking(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "pullup-container", children: [isDesktop && (_jsxs("div", { className: "desktop-tabs", ref: desktopTabsRef, children: [_jsx("button", { className: `desktop-tab ${activeTab === 'notes' ? 'active' : ''}`, onClick: () => handleDesktopTabClick('notes'), children: "Notes" }), _jsx("button", { className: `desktop-tab ${activeTab === 'quotes' ? 'active' : ''}`, onClick: () => handleDesktopTabClick('quotes'), children: "Quotes" }), _jsx("button", { className: `desktop-tab ${activeTab === 'settings' ? 'active' : ''}`, onClick: () => handleDesktopTabClick('settings'), children: "Settings" })] })), _jsx(Pullup, { className: isDesktop ? 'desktop-mode' : '' })] }), _jsx(TextSelectionHandler, {})] }));
};
//# sourceMappingURL=PullupContainer.js.map