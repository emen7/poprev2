/**
 * Tag Input Component
 *
 * This component provides an input for adding and managing tags.
 * It supports adding, removing, and displaying tags.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TagInputProps {
  /**
   * Array of tags
   */
  tags: string[];

  /**
   * Callback function called when tags are updated
   */
  onTagsChange: (tags: string[]) => void;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * TagInput Component
 */
export function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Add tags...',
  className = '',
}: TagInputProps) {
  // State for input value
  const [inputValue, setInputValue] = useState('');

  // Reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle input keydown
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      removeTag(tags.length - 1);
    }
  };

  // Add a tag
  const addTag = (tag: string) => {
    // Normalize tag (lowercase, no spaces)
    const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');

    // Check if tag already exists
    if (normalizedTag && !tags.includes(normalizedTag)) {
      const newTags = [...tags, normalizedTag];
      onTagsChange(newTags);
    }

    // Clear input
    setInputValue('');
  };

  // Remove a tag
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onTagsChange(newTags);
  };

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={`tag-input ${className}`}>
      <div className="tag-input-container">
        {/* Display existing tags */}
        {tags.map((tag, index) => (
          <div key={index} className="tag-input-tag">
            <span className="tag-input-tag-text">#{tag}</span>
            <button
              type="button"
              className="tag-input-tag-remove"
              onClick={() => removeTag(index)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </div>
        ))}

        {/* Input for new tags */}
        <input
          ref={inputRef}
          type="text"
          className="tag-input-field"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          aria-label="Add a tag"
        />
      </div>

      <div className="tag-input-help">
        Press Enter to add a tag, Backspace to remove the last tag
      </div>
    </div>
  );
}

export default TagInput;
