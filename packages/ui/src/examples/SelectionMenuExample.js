import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { SelectionMenu, useSelectionMenu } from '../selection';
import './SelectionMenuExample.css';
/**
 * Example component demonstrating the selection menu
 */
export const SelectionMenuExample = () => {
    // Ref for the content container
    const contentRef = useRef(null);
    // State for notes
    const [notes, setNotes] = useState([]);
    // State for quotes
    const [quotes, setQuotes] = useState([]);
    // State for copy message
    const [copyMessage, setCopyMessage] = useState(null);
    // Use selection menu hook
    const { isMenuVisible, menuPosition, selectedText, hideMenu, copySelectedText } = useSelectionMenu({
        targetElement: contentRef.current,
        minSelectionLength: 3,
    });
    // Handle copy action
    const handleCopy = () => {
        copySelectedText();
        setCopyMessage(`Copied: "${selectedText.substring(0, 30)}${selectedText.length > 30 ? '...' : ''}"`);
        setTimeout(() => setCopyMessage(null), 3000);
        hideMenu();
    };
    // Handle note action
    const handleNote = () => {
        // Generate a reference for the note (in a real app, this would be the paper:section.paragraph reference)
        const reference = `(1:1.${Math.floor(Math.random() * 10) + 1})`;
        setNotes([...notes, { text: '', selection: selectedText, reference }]);
        hideMenu();
    };
    // Handle quote action
    const handleQuote = () => {
        // Generate a reference for the quote (in a real app, this would be the paper:section.paragraph reference)
        const reference = `(1:1.${Math.floor(Math.random() * 10) + 1})`;
        setQuotes([...quotes, { text: selectedText, reference }]);
        hideMenu();
    };
    return (_jsxs("div", { className: "selection-menu-example", children: [_jsx("h1", { children: "Selection Menu Example" }), _jsx("p", { className: "example-description", children: "Select text in the content below to see the selection menu. You can copy the text, add a note, or save a quote." }), _jsxs("div", { className: "example-container", children: [_jsxs("div", { className: "content-container", ref: contentRef, children: [_jsx("h2", { children: "The Universal Father" }), _jsx("p", { children: "Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered. The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator." }), _jsx("p", { children: "The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes. The evolutionary inhabitants of the worlds of time and space must of themselves \u2014 in their own hearts \u2014 recognize, love, and voluntarily worship him." }), _jsx("p", { children: "When you have once become truly God-conscious, after you really discover the majestic Creator and begin to experience the realization of the indwelling presence of the divine controller, then, in accordance with your enlightenment and in accordance with the manner and method by which the divine Sons reveal God, you will find a name for the Universal Father which will be adequately expressive of your concept of the First Great Source and Center." }), _jsx("p", { children: "Near the center of the universe of universes, the Universal Father is generally known by names which may be regarded as meaning the First Source. Farther out in the universes of space, the terms employed to designate the Universal Father more often mean the Universal Center." }), _jsx("p", { children: "On those worlds where a Paradise Son has lived a bestowal life, God is generally known by some name indicative of personal relationship, tender affection, and fatherly devotion. On your constellation headquarters God is referred to as the Universal Father, and on different planets in your local system of inhabited worlds he is variously known as the Father of Fathers, the Paradise Father, the Havona Father, and the Spirit Father." })] }), _jsxs("div", { className: "sidebar", children: [copyMessage && _jsx("div", { className: "copy-message", children: copyMessage }), notes.length > 0 && (_jsxs("div", { className: "notes-container", children: [_jsx("h3", { children: "Notes" }), _jsx("ul", { children: notes.map((note, index) => (_jsxs("li", { children: [_jsxs("div", { className: "note-item", children: [_jsx("span", { className: "note-reference", children: note.reference }), " \"", note.selection, "\""] }), _jsx("div", { className: "note-editor", children: _jsx("textarea", { placeholder: "Add your note here...", value: note.text, onChange: e => {
                                                            const updatedNotes = [...notes];
                                                            updatedNotes[index].text = e.target.value;
                                                            setNotes(updatedNotes);
                                                        } }) })] }, index))) })] })), quotes.length > 0 && (_jsxs("div", { className: "quotes-container", children: [_jsx("h3", { children: "Quotes" }), _jsx("ul", { children: quotes.map((quote, index) => (_jsx("li", { children: _jsxs("div", { className: "quote-item", children: [_jsx("span", { className: "quote-reference", children: quote.reference }), " \"", quote.text, "\""] }) }, index))) })] }))] })] }), isMenuVisible && (_jsx(SelectionMenu, { position: menuPosition, selectedText: selectedText, onCopy: handleCopy, onNote: handleNote, onQuote: handleQuote, onClose: hideMenu }))] }));
};
export default SelectionMenuExample;
//# sourceMappingURL=SelectionMenuExample.js.map