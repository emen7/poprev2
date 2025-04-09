import React, { useState, useRef, useEffect } from 'react';
import './SectionNavigator.css';

export interface Section {
  /**
   * Unique identifier for the section
   */
  id: string;

  /**
   * Display title for the section
   */
  title: string;

  /**
   * Section number (optional)
   */
  number?: string | number;
}

export interface SectionNavigatorProps {
  /**
   * Array of sections to display
   */
  sections: Section[];

  /**
   * ID of the currently active section
   */
  currentSectionId?: string;

  /**
   * Function called when a section is selected
   */
  onSectionChange: (sectionId: string) => void;

  /**
   * Label for the dropdown button
   * @default 'Sections'
   */
  label?: string;

  /**
   * Whether to show section numbers
   * @default true
   */
  showNumbers?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to close the dropdown when a section is selected
   * @default true
   */
  closeOnSelect?: boolean;
}

/**
 * SectionNavigator Component
 *
 * A dropdown component for navigating between sections.
 * Displays the current section and allows selection from a list.
 */
export function SectionNavigator({
  sections,
  currentSectionId,
  onSectionChange,
  label = 'Sections',
  showNumbers = true,
  className = '',
  closeOnSelect = true,
}: SectionNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the current section
  const currentSection = sections.find(section => section.id === currentSectionId);

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle section selection
  const handleSectionSelect = (sectionId: string) => {
    onSectionChange(sectionId);

    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    const handleEscKey = (event: KeyboardEvent) => {
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

  return (
    <div className={`section-navigator ${className}`} ref={dropdownRef}>
      <button
        className={`section-navigator-toggle ${isOpen ? 'section-navigator-toggle-open' : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="section-navigator-label">{label}:</span>
        <span className="section-navigator-current">
          {currentSection ? (
            <>
              {showNumbers && currentSection.number && (
                <span className="section-navigator-number">{currentSection.number}</span>
              )}
              <span className="section-navigator-title">{currentSection.title}</span>
            </>
          ) : (
            <span className="section-navigator-placeholder">Select a section</span>
          )}
        </span>
        <span className="section-navigator-arrow"></span>
      </button>

      {isOpen && (
        <div
          className="section-navigator-dropdown"
          role="listbox"
          aria-activedescendant={currentSectionId}
        >
          {sections.map(section => (
            <div
              key={section.id}
              className={`section-navigator-item ${
                section.id === currentSectionId ? 'section-navigator-item-active' : ''
              }`}
              onClick={() => handleSectionSelect(section.id)}
              role="option"
              aria-selected={section.id === currentSectionId}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSectionSelect(section.id);
                  e.preventDefault();
                }
              }}
            >
              {showNumbers && section.number && (
                <span className="section-navigator-item-number">{section.number}</span>
              )}
              <span className="section-navigator-item-title">{section.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SectionNavigator;
