import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pullup } from '../pullup';
import './PullupExample.css';
/**
 * Example component demonstrating the pullup feature
 */
export const PullupExample = () => {
    // State for pullup
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('notes');
    const [height, setHeight] = useState(300);
    const [isPersistent, setIsPersistent] = useState(false);
    // State for notes
    const [notes, setNotes] = useState([
        {
            id: '1',
            content: 'This is a note about the Universal Father.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paragraphId: 'p1',
            reference: '(1:1.1)',
            selectedText: 'Universal Father',
        },
        {
            id: '2',
            content: 'Interesting point about arbitrary recognition.',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            paragraphId: 'p2',
            reference: '(1:1.2)',
            selectedText: 'arbitrary recognition',
        },
    ]);
    // State for quotes
    const [quotes, setQuotes] = useState([
        {
            id: '1',
            content: 'The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes.',
            createdAt: new Date().toISOString(),
            paragraphId: 'p2',
            reference: '(1:1.2)',
        },
        {
            id: '2',
            content: 'When you have once become truly God-conscious, after you really discover the majestic Creator and begin to experience the realization of the indwelling presence of the divine controller',
            createdAt: new Date().toISOString(),
            paragraphId: 'p3',
            reference: '(1:1.3)',
        },
    ]);
    // State for settings
    const [settings, setSettings] = useState({
        fontSize: 16,
        lineHeight: 1.6,
        fontFamily: 'Georgia, serif',
        theme: 'light',
        showParagraphNumbers: true,
        formatType: 'traditional',
    });
    // State for sort order
    const [sortOrder, setSortOrder] = useState('entry');
    // Handle pullup open
    const handlePullupOpen = () => {
        setIsOpen(true);
    };
    // Handle pullup close
    const handlePullupClose = () => {
        setIsOpen(false);
    };
    // Handle tab select
    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };
    // Handle height change
    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
    };
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
    // Handle persistent mode toggle
    const handlePersistentToggle = () => {
        setIsPersistent(!isPersistent);
    };
    return (_jsxs("div", { className: "pullup-example", children: [_jsx("h1", { children: "Pullup Example" }), _jsx("p", { className: "example-description", children: "This example demonstrates the pullup feature for the Urantia Book reader. The pullup panel slides up from the bottom of the screen and provides access to notes, quotes, and settings." }), _jsxs("div", { className: "example-content", children: [_jsx("h2", { children: "The Universal Father" }), _jsx("p", { id: "p1", children: "Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered. The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator." }), _jsx("p", { id: "p2", children: "The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes. The evolutionary inhabitants of the worlds of time and space must of themselves \u2014 in their own hearts \u2014 recognize, love, and voluntarily worship him." }), _jsx("p", { id: "p3", children: "When you have once become truly God-conscious, after you really discover the majestic Creator and begin to experience the realization of the indwelling presence of the divine controller, then, in accordance with your enlightenment and in accordance with the manner and method by which the divine Sons reveal God, you will find a name for the Universal Father which will be adequately expressive of your concept of the First Great Source and Center." }), _jsx("p", { id: "p4", children: "Near the center of the universe of universes, the Universal Father is generally known by names which may be regarded as meaning the First Source. Farther out in the universes of space, the terms employed to designate the Universal Father more often mean the Universal Center." }), _jsx("p", { id: "p5", children: "On those worlds where a Paradise Son has lived a bestowal life, God is generally known by some name indicative of personal relationship, tender affection, and fatherly devotion. On your constellation headquarters God is referred to as the Universal Father, and on different planets in your local system of inhabited worlds he is variously known as the Father of Fathers, the Paradise Father, the Havona Father, and the Spirit Father." })] }), _jsxs("div", { className: "example-controls", children: [_jsx("button", { className: "open-button", onClick: handlePullupOpen, children: "Open Pullup" }), _jsx("div", { className: "control-group", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: isPersistent, onChange: handlePersistentToggle }), "Persistent Mode"] }) })] }), _jsx(Pullup, { isOpen: isOpen, activeTab: activeTab, height: height, isPersistent: isPersistent, onClose: handlePullupClose, onTabSelect: handleTabSelect, onHeightChange: handleHeightChange, notes: notes, onNoteUpdate: handleNoteUpdate, onNoteDelete: handleNoteDelete, quotes: quotes, onQuoteDelete: handleQuoteDelete, settings: settings, onSettingsChange: handleSettingsChange, sortOrder: sortOrder, onSortOrderChange: handleSortOrderChange })] }));
};
export default PullupExample;
//# sourceMappingURL=PullupExample.js.map