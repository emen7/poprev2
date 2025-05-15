import React from 'react';
import { useTheme, TextAlignment } from '../contexts/ThemeContext';

interface TextAlignmentToggleProps {
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Whether to show labels next to icons
   */
  showLabels?: boolean;
  
  /**
   * Which alignment options to show
   */
  options?: TextAlignment[];
}

/**
 * TextAlignmentToggle Component
 * 
 * A component that allows users to toggle between different text alignment options.
 */
export const TextAlignmentToggle: React.FC<TextAlignmentToggleProps> = ({
  className = '',
  showLabels = true,
  options = ['left', 'justify', 'right'],
}) => {
  const { textAlignment, setTextAlignment } = useTheme();
  
  const handleAlignmentChange = (alignment: TextAlignment) => {
    setTextAlignment(alignment);
  };
  
  // Icons for each alignment option
  const alignmentIcons = {
    left: '⇤',
    justify: '⇲',
    right: '⇥',
    center: '⇶',
  };
  
  // Labels for each alignment option
  const alignmentLabels = {
    left: 'Left',
    justify: 'Justify',
    right: 'Right',
    center: 'Center',
  };
  
  return (
    <div className={`text-alignment-toggle ${className}`}>
      <div className="text-alignment-buttons">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`text-alignment-button ${textAlignment === option ? 'active' : ''}`}
            onClick={() => handleAlignmentChange(option)}
            aria-label={`${alignmentLabels[option]} alignment`}
            title={`${alignmentLabels[option]} alignment`}
          >
            <span className="text-alignment-icon">{alignmentIcons[option]}</span>
            {showLabels && <span className="text-alignment-label">{alignmentLabels[option]}</span>}
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .text-alignment-toggle {
          display: inline-flex;
          align-items: center;
        }
        
        .text-alignment-buttons {
          display: flex;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        
        .text-alignment-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.75rem;
          background: var(--color-surface);
          color: var(--color-text-primary);
          border: none;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .text-alignment-button:hover {
          background-color: var(--color-primary-hover);
          color: white;
        }
        
        .text-alignment-button.active {
          background-color: var(--color-primary);
          color: white;
        }
        
        .text-alignment-icon {
          font-size: 1rem;
          margin-right: ${showLabels ? '0.5rem' : '0'};
        }
        
        .text-alignment-label {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default TextAlignmentToggle;
