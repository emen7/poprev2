import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import './SectionNavigator.css';
/**
 * SectionNavigator Component
 *
 * A dropdown component for navigating between sections.
 * Displays the current section and allows selection from a list.
 */
export function SectionNavigator({ sections, currentSectionId, onSectionChange, label = 'Sections', showNumbers = true, className = '', closeOnSelect = true, }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Find the current section
    const currentSection = sections.find(section => section.id === currentSectionId);
    // Toggle dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    // Handle section selection
    const handleSectionSelect = (sectionId) => {
        onSectionChange(sectionId);
        if (closeOnSelect) {
            setIsOpen(false);
        }
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Close dropdown when pressing escape
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            return () => {
                document.removeEventListener('keydown', handleEscKey);
            };
        }
    }, [isOpen]);
    return (_jsxs("div", { className: `section-navigator ${className}`, ref: dropdownRef, children: [_jsxs("button", { className: `section-navigator-toggle ${isOpen ? 'section-navigator-toggle-open' : ''}`, onClick: toggleDropdown, "aria-haspopup": "listbox", "aria-expanded": isOpen, children: [_jsxs("span", { className: "section-navigator-label", children: [label, ":"] }), _jsx("span", { className: "section-navigator-current", children: currentSection ? (_jsxs(_Fragment, { children: [showNumbers && currentSection.number && (_jsx("span", { className: "section-navigator-number", children: currentSection.number })), _jsx("span", { className: "section-navigator-title", children: currentSection.title })] })) : (_jsx("span", { className: "section-navigator-placeholder", children: "Select a section" })) }), _jsx("span", { className: "section-navigator-arrow" })] }), isOpen && (_jsx("div", { className: "section-navigator-dropdown", role: "listbox", "aria-activedescendant": currentSectionId, children: sections.map(section => (_jsxs("div", { className: `section-navigator-item ${section.id === currentSectionId ? 'section-navigator-item-active' : ''}`, onClick: () => handleSectionSelect(section.id), role: "option", "aria-selected": section.id === currentSectionId, tabIndex: 0, onKeyDown: e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleSectionSelect(section.id);
                            e.preventDefault();
                        }
                    }, children: [showNumbers && section.number && (_jsx("span", { className: "section-navigator-item-number", children: section.number })), _jsx("span", { className: "section-navigator-item-title", children: section.title })] }, section.id))) }))] }));
}
export default SectionNavigator;
//# sourceMappingURL=SectionNavigator.js.map