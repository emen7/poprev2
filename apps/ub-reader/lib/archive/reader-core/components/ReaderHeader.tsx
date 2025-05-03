/**
 * Reader Header Component
 *
 * This component displays the document header with title, subtitle, and metadata.
 */

&apos;use client';

import React from &apos;react';

import type { Document, ReaderConfig } from '../models';

/**
 * Props for the ReaderHeader component
 */
export interface ReaderHeaderProps {
  /**
   * The document to display
   */
  document: Document;

  /**
   * Reader configuration
   */
  config: ReaderConfig;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Children components
   */
  children?: React.ReactNode;
}

/**
 * The ReaderHeader component
 */
export function ReaderHeader({ document, config, className = '', children }: ReaderHeaderProps) {
  // Get extension components
  const extensionHeaderComponents = config.extensions
    .map(extensionId => {
      // This would be implemented to get custom header components from extensions
      // For now, we'll return null
      return null;
    })
    .filter(Boolean);

  // If there's an extension header component, use it
  if (extensionHeaderComponents.length > 0) {
    // In a real implementation, we would render the extension component here
    // For now, we'll just render the default header
  }

  return (
    <div className={`reader-header ${className}`}>
      {/* Logo */}
      {config.branding.logo && (
        <div className="reader-logo">
          <img src={config.branding.logo} alt={config.branding.appName || &apos;Reader'} />
        </div>
      )}

      {/* Title and subtitle */}
      <div className="reader-title-container">
        <h1 className="reader-title">{document.title || &apos;Untitled Document'}</h1>
        {document.metadata.subtitle && (
          <h2 className="reader-subtitle">{document.metadata.subtitle}</h2>
        )}
      </div>

      {/* Metadata */}
      <div className="reader-metadata">
        {document.metadata.author && (
          <div className="reader-author">
            By:{' '}
            {Array.isArray(document.metadata.author)
              ? document.metadata.author.join(', ')
              : document.metadata.author}
          </div>
        )}
        {document.metadata.date && <div className="reader-date">{document.metadata.date}</div>}
        {document.metadata.categories && document.metadata.categories.length > 0 && (
          <div className="reader-categories">
            Categories: {document.metadata.categories.join(', ')}
          </div>
        )}
        {document.metadata.tags && document.metadata.tags.length > 0 && (
          <div className="reader-tags">Tags: {document.metadata.tags.join(', ')}</div>
        )}
      </div>

      {/* Linkback */}
      {config.navigation.linkbackUrl && (
        <div className="reader-linkback">
          <a href={config.navigation.linkbackUrl}>{config.navigation.linkbackText || &apos;Back'}</a>
        </div>
      )}

      {/* Render children */}
      {children}
    </div>
  );
}
