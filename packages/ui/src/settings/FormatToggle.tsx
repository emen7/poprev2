import React from 'react';
import './FormatToggle.css';

export interface FormatToggleProps {
  /**
   * Current format type
   */
  currentFormat: 'traditional' | 'modern';

  /**
   * Function called when the format is changed
   */
  onChange: (format: 'traditional' | 'modern') => void;

  /**
   * Whether to show descriptions for each format
   * @default false
   */
  showDescription?: boolean;

  /**
   * Whether to show a preview of each format
   * @default false
   */
  showPreview?: boolean;

  /**
   * Label for the traditional format option
   * @default 'Traditional'
   */
  traditionalLabel?: string;

  /**
   * Label for the modern format option
   * @default 'Modern'
   */
  modernLabel?: string;

  /**
   * Description for the traditional format
   */
  traditionalDescription?: string;

  /**
   * Description for the modern format
   */
  modernDescription?: string;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * FormatToggle Component
 *
 * A component that allows switching between traditional and modern formatting.
 * Supports descriptions and visual previews of each format.
 */
export function FormatToggle({
  currentFormat,
  onChange,
  showDescription = false,
  showPreview = false,
  traditionalLabel = 'Traditional',
  modernLabel = 'Modern',
  traditionalDescription = 'Formatting that matches the original book presentation.',
  modernDescription = 'Enhanced formatting optimized for digital reading.',
  className = '',
}: FormatToggleProps) {
  const handleFormatChange = (format: 'traditional' | 'modern') => {
    if (format !== currentFormat) {
      onChange(format);
    }
  };

  const containerClasses = [
    'format-toggle',
    showDescription ? 'format-toggle-with-description' : '',
    showPreview ? 'format-toggle-with-preview' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className="format-toggle-header">
        <h3 className="format-toggle-title">Content Formatting</h3>
      </div>

      <div className="format-toggle-options">
        {/* Traditional Format Option */}
        <div
          className={`format-option ${
            currentFormat === 'traditional' ? 'format-option-active' : ''
          }`}
          onClick={() => handleFormatChange('traditional')}
        >
          <div className="format-option-header">
            <input
              type="radio"
              id="format-traditional"
              name="format"
              value="traditional"
              checked={currentFormat === 'traditional'}
              onChange={() => handleFormatChange('traditional')}
              className="format-option-radio"
            />
            <label htmlFor="format-traditional" className="format-option-label">
              {traditionalLabel}
            </label>
          </div>

          {showDescription && <p className="format-option-description">{traditionalDescription}</p>}

          {showPreview && (
            <div className="format-preview format-preview-traditional">
              <div className="format-preview-paragraph">
                <span className="format-preview-number">1</span>
                <span className="format-preview-text">
                  This is an example of <em>traditional</em> formatting with standard emphasis.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modern Format Option */}
        <div
          className={`format-option ${currentFormat === 'modern' ? 'format-option-active' : ''}`}
          onClick={() => handleFormatChange('modern')}
        >
          <div className="format-option-header">
            <input
              type="radio"
              id="format-modern"
              name="format"
              value="modern"
              checked={currentFormat === 'modern'}
              onChange={() => handleFormatChange('modern')}
              className="format-option-radio"
            />
            <label htmlFor="format-modern" className="format-option-label">
              {modernLabel}
            </label>
          </div>

          {showDescription && <p className="format-option-description">{modernDescription}</p>}

          {showPreview && (
            <div className="format-preview format-preview-modern">
              <div className="format-preview-paragraph">
                <span className="format-preview-number">1</span>
                <span className="format-preview-text">
                  This is an example of <em>modern</em> formatting with enhanced emphasis.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormatToggle;
