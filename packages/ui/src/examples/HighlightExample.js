import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { SelectionMenu, useSelectionMenu } from '../selection';
import './HighlightExample.css';
/**
 * Example component demonstrating the text highlighting feature
 */
export const HighlightExample = () => {
    // Ref for the content container
    const contentRef = useRef(null);
    // State for dark mode
    const [darkMode, setDarkMode] = useState(false);
    // State for copy message
    const [copyMessage, setCopyMessage] = useState(null);
    // Use selection menu hook
    const { isMenuVisible, menuPosition, selectedText, hideMenu, copySelectedText, highlightSelectedText, } = useSelectionMenu({
        targetElement: contentRef.current,
        minSelectionLength: 3,
        darkMode,
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
        // In a real app, this would add a note
        alert(`Note added for: "${selectedText}"`);
        hideMenu();
    };
    // Handle quote action
    const handleQuote = () => {
        // In a real app, this would save a quote
        alert(`Quote saved: "${selectedText}"`);
        hideMenu();
    };
    // Handle highlight action
    const handleHighlight = (color) => {
        highlightSelectedText(color);
        hideMenu();
    };
    // Handle dark mode toggle
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };
    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        }
        else {
            document.body.classList.remove('dark-mode');
        }
        return () => {
            document.body.classList.remove('dark-mode');
        };
    }, [darkMode]);
    return (_jsxs("div", { className: `highlight-example ${darkMode ? 'dark-mode' : ''}`, children: [_jsx("h1", { children: "Highlight Example" }), _jsx("p", { className: "example-description", children: "Select text in the content below to see the selection menu. You can highlight text in different colors, copy the text, add a note, or save a quote." }), _jsx("div", { className: "example-controls", children: _jsxs("label", { className: "dark-mode-toggle", children: [_jsx("input", { type: "checkbox", checked: darkMode, onChange: handleDarkModeToggle }), "Dark Mode"] }) }), _jsxs("div", { className: "example-container", children: [_jsxs("div", { className: "content-container", ref: contentRef, children: [_jsx("h2", { children: "The Universal Father" }), _jsx("p", { children: "Of all the names by which God the Father is known throughout the universes, those which designate him as the First Source and the Universe Center are most often encountered. The First Father is known by various names in different universes and in different sectors of the same universe. The names which the creature assigns to the Creator are much dependent on the creature's concept of the Creator." }), _jsx("p", { children: "The Universal Father never imposes any form of arbitrary recognition, formal worship, or slavish service upon the intelligent will creatures of the universes. The evolutionary inhabitants of the worlds of time and space must of themselves \u2014 in their own hearts \u2014 recognize, love, and voluntarily worship him." }), _jsx("p", { children: "When you have once become truly God-conscious, after you really discover the majestic Creator and begin to experience the realization of the indwelling presence of the divine controller, then, in accordance with your enlightenment and in accordance with the manner and method by which the divine Sons reveal God, you will find a name for the Universal Father which will be adequately expressive of your concept of the First Great Source and Center." }), _jsx("p", { children: "Near the center of the universe of universes, the Universal Father is generally known by names which may be regarded as meaning the First Source. Farther out in the universes of space, the terms employed to designate the Universal Father more often mean the Universal Center." }), _jsx("p", { children: "On those worlds where a Paradise Son has lived a bestowal life, God is generally known by some name indicative of personal relationship, tender affection, and fatherly devotion. On your constellation headquarters God is referred to as the Universal Father, and on different planets in your local system of inhabited worlds he is variously known as the Father of Fathers, the Paradise Father, the Havona Father, and the Spirit Father." })] }), _jsxs("div", { className: "sidebar", children: [copyMessage && _jsx("div", { className: "copy-message", children: copyMessage }), _jsxs("div", { className: "instructions", children: [_jsx("h3", { children: "Instructions" }), _jsxs("ol", { children: [_jsx("li", { children: "Select text in the content area" }), _jsx("li", { children: "Click the highlight icon (\uD83D\uDD8C\uFE0F) in the menu" }), _jsx("li", { children: "Choose a color from the color picker" }), _jsx("li", { children: "Click the checkmark to apply the highlight" })] }), _jsx("p", { children: "In dark mode, highlighting changes the text color to match the selected color. In light mode, it adds a background highlight." }), _jsx("p", { children: "The default text selection color in dark mode is set to a bright cyan (#00e5ff)." }), _jsx("p", { children: "The color palette includes complementary colors: cyan, pink, orange, green, and purple." })] })] })] }), isMenuVisible && (_jsx(SelectionMenu, { position: menuPosition, selectedText: selectedText, onCopy: handleCopy, onNote: handleNote, onQuote: handleQuote, onHighlight: handleHighlight, darkMode: darkMode }))] }));
};
export default HighlightExample;
//# sourceMappingURL=HighlightExample.js.map