'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
export const PullupContext = createContext(undefined);
export function PullupProvider({ children, initialSettings }) {
    // State for pullup
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('notes');
    const [height, setHeight] = useState(300);
    const [isPersistent, setIsPersistent] = useState(false);
    const [isPeeking, setIsPeeking] = useState(true); // Start with peeking enabled
    // State for notes
    const [notes, setNotes] = useState([]);
    // State for quotes
    const [quotes, setQuotes] = useState([]);
    // State for settings
    const [settings, setSettings] = useState(initialSettings);
    // State for sort order
    const [sortOrder, setSortOrder] = useState('entry');
    // State for just added note
    const [justAddedNoteId, setJustAddedNoteId] = useState(null);
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
    // Open pullup
    const openPullup = (tab = 'notes') => {
        setActiveTab(tab);
        setIsOpen(true);
        setIsPeeking(false);
    };
    // Close pullup
    const closePullup = () => {
        setIsOpen(false);
        setIsPeeking(true);
    };
    // Handle height change
    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
        if (!isOpen && isPeeking) {
            setIsOpen(true);
            setIsPeeking(false);
        }
    };
    // Update settings
    const updateSettings = (newSettings) => {
        setSettings(prevSettings => (Object.assign(Object.assign({}, prevSettings), newSettings)));
    };
    // Handle note update
    const handleNoteUpdate = (id, content) => {
        const now = new Date().toISOString();
        setNotes(notes.map(note => (note.id === id ? Object.assign(Object.assign({}, note), { content, updatedAt: now }) : note)));
    };
    // Handle note delete
    const handleNoteDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };
    // Handle quote delete
    const handleQuoteDelete = (id) => {
        setQuotes(quotes.filter(quote => quote.id !== id));
    };
    // Handle note creation
    const handleNoteCreate = (note) => {
        // Ensure the note has all required fields from the canonical interface
        const completeNote = Object.assign(Object.assign({}, note), { updatedAt: note.updatedAt || note.createdAt, selectedText: note.selectedText || '', isSelected: false });
        setNotes([completeNote, ...notes]);
        setJustAddedNoteId(note.id);
        openPullup('notes');
    };
    // Handle quote creation
    const handleQuoteCreate = (quote) => {
        setQuotes([quote, ...quotes]);
        openPullup('quotes');
    };
    // Handle note add
    const handleNoteAdd = (newNoteId) => {
        setJustAddedNoteId(newNoteId);
    };
    // Handle edit started
    const handleEditStarted = () => {
        setJustAddedNoteId(null);
    };
    return (_jsx(PullupContext.Provider, { value: {
            // Pullup state
            isOpen,
            setIsOpen,
            activeTab,
            setActiveTab,
            height,
            setHeight,
            isPersistent,
            setIsPersistent,
            isPeeking,
            setIsPeeking,
            // Notes and quotes data
            notes,
            setNotes,
            quotes,
            setQuotes,
            // Settings state
            settings,
            updateSettings,
            // Sort order
            sortOrder,
            setSortOrder,
            // Just added note
            justAddedNoteId,
            setJustAddedNoteId,
            // Actions
            openPullup,
            closePullup,
            handleHeightChange,
            handleNoteUpdate,
            handleNoteDelete,
            handleQuoteDelete,
            handleNoteCreate,
            handleQuoteCreate,
            handleNoteAdd,
            handleEditStarted,
        }, children: children }));
}
export function usePullup() {
    const context = useContext(PullupContext);
    if (context === undefined) {
        throw new Error('usePullup must be used within a PullupProvider');
    }
    return context;
}
//# sourceMappingURL=PullupContext.js.map