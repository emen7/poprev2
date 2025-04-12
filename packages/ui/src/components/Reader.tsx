/**
 * Core Reader Component
 *
 * This is the main Reader component that renders a document with configurable extensions.
 */

'use client';

import React, { useState, useEffect } from 'react';

import { Document, ReaderConfig, createConfig, DEFAULT_CONFIG } from '../models';
import { DocumentAdapter, globalExtensionRegistry } from '../utils';

import './Reader.css';
import { ReaderContent } from './ReaderContent';
import { ReaderHeader } from './ReaderHeader';
import { ReaderNavigation } from './ReaderNavigation';
import { ReaderSettings } from './ReaderSettings';

/**
 * Props for the Reader component
 */
export interface ReaderProps {
  /**
   * The document to display, either in our Document format or the legacy TransformedDocument format
   */
  document: Document | any;

  /**
   * Configuration for the Reader
   */
  config?: Partial<ReaderConfig>;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Additional style
   */
  style?: React.CSSProperties;
}

/**
 * The core Reader component
 */
export function Reader({ document, config = {}, className = '', style = {} }: ReaderProps) {
  // Merge the provided config with the default config
  const mergedConfig = createConfig(config);

  // Convert the document to our format if needed
  const [internalDocument, setInternalDocument] = useState<Document | null>(null);

  // Active section state
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Settings state
  const [readerConfig, setReaderConfig] = useState(mergedConfig);

  // Navigation and settings panel state
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Update reader config when props change
  useEffect(() => {
    setReaderConfig(mergedConfig);
  }, [mergedConfig]);

  // Initialize extensions
  useEffect(() => {
    if (readerConfig.extensions.length > 0) {
      globalExtensionRegistry.initializeExtensions(readerConfig.extensionConfig || {});
    }
  }, [readerConfig.extensions, readerConfig.extensionConfig]);

  // Convert document to internal format
  useEffect(() => {
    // Check if the document is already in our format
    if (document && 'id' in document && 'sections' in document) {
      setInternalDocument(document as Document);
    }
    // Otherwise, convert from TransformedDocument
    else if (document && 'content' in document && 'metadata' in document) {
      const convertedDocument = DocumentAdapter.fromTransformedDocument(document);
      setInternalDocument(convertedDocument);
    }
    // Reset active section when document changes
    setActiveSection(null);
  }, [document]);

  // If no document is available yet, show a loading state
  if (!internalDocument) {
    return (
      <div className={`reader-container ${className}`} style={style}>
        <div className="reader-loading">Loading document...</div>
      </div>
    );
  }

  // Handle config changes
  const handleConfigChange = (newConfig: Partial<ReaderConfig>) => {
    setReaderConfig({
      ...readerConfig,
      ...newConfig,
    });
  };

  // Handle navigation panel open/close
  const handleNavigationOpen = () => {
    setIsNavigationOpen(true);
    setIsSettingsOpen(false);
  };

  const handleNavigationClose = () => {
    setIsNavigationOpen(false);
  };

  // Handle settings panel open/close
  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
    setIsNavigationOpen(false);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  // Apply theme, typography, and layout styles
  const readerStyles = {
    // Branding
    '--reader-primary-color': readerConfig.branding.primaryColor,
    '--reader-secondary-color': readerConfig.branding.secondaryColor,

    // Theme colors
    '--reader-background-color':
      readerConfig.theme.mode === 'dark'
        ? readerConfig.theme.colors?.background || '#1a202c'
        : readerConfig.theme.colors?.background || '#ffffff',
    '--reader-text-color':
      readerConfig.theme.mode === 'dark'
        ? readerConfig.theme.colors?.text || '#e2e8f0'
        : readerConfig.theme.colors?.text || '#333333',
    '--reader-border-color':
      readerConfig.theme.mode === 'dark'
        ? readerConfig.theme.colors?.border || '#4a5568'
        : readerConfig.theme.colors?.border || '#e2e8f0',
    '--reader-panel-background':
      readerConfig.theme.mode === 'dark'
        ? readerConfig.theme.colors?.panelBackground || '#2d3748'
        : readerConfig.theme.colors?.panelBackground || '#f7fafc',

    // Typography
    '--reader-font-family':
      readerConfig.typography.fontFamily ||
      (readerConfig.typography.fontStyle === 'serif'
        ? 'Georgia, Cambria, "Times New Roman", Times, serif'
        : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'),
    '--reader-font-size':
      readerConfig.typography.fontSize === 'small'
        ? '14px'
        : readerConfig.typography.fontSize === 'medium'
          ? '16px'
          : readerConfig.typography.fontSize === 'large'
            ? '18px'
            : '20px',
    '--reader-line-height':
      readerConfig.typography.lineSpacing === 'compact'
        ? '1.4'
        : readerConfig.typography.lineSpacing === 'normal'
          ? '1.6'
          : '1.8',

    // Layout
    '--reader-max-width':
      readerConfig.layout.textWidth === 'narrow'
        ? '600px'
        : readerConfig.layout.textWidth === 'medium'
          ? '800px'
          : '1000px',

    ...style,
  } as React.CSSProperties;

  // Combine class names
  const containerClassName = `reader-container ${readerConfig.branding.customClass || ''} ${className}`;

  // Add theme data attribute
  const themeAttribute = readerConfig.theme.mode;

  return (
    <div className={containerClassName} style={readerStyles} data-theme={themeAttribute}>
      {/* Header with title, metadata, etc. */}
      <ReaderHeader document={internalDocument} config={readerConfig}>
        {/* Navigation Toggle Button */}
        {(readerConfig.navigation.showTableOfContents ||
          readerConfig.navigation.showBreadcrumbs ||
          readerConfig.navigation.showRelationshipMap) && (
          <ReaderNavigation
            document={internalDocument}
            config={readerConfig}
            activeSection={activeSection}
            onSectionSelect={setActiveSection}
            onNavigationOpen={handleNavigationOpen}
            onNavigationClose={handleNavigationClose}
            initiallyOpen={false}
          />
        )}

        {/* Settings Toggle Button */}
        {readerConfig.navigation.showSettings && (
          <ReaderSettings
            config={readerConfig}
            onConfigChange={handleConfigChange}
            onSettingsOpen={handleSettingsOpen}
            onSettingsClose={handleSettingsClose}
            initiallyOpen={false}
          />
        )}
      </ReaderHeader>

      {/* Main content area with navigation and document content */}
      <div className="reader-main">
        {/* Navigation (TOC, breadcrumbs, etc.) */}
        {(readerConfig.navigation.showTableOfContents ||
          readerConfig.navigation.showBreadcrumbs ||
          readerConfig.navigation.showRelationshipMap) && (
          <div className="reader-sidebar">
            <ReaderNavigation
              document={internalDocument}
              config={readerConfig}
              activeSection={activeSection}
              onSectionSelect={setActiveSection}
              className="reader-sidebar-navigation"
            />
          </div>
        )}

        {/* Document content */}
        <ReaderContent
          document={internalDocument}
          config={readerConfig}
          activeSection={activeSection}
          onSectionSelect={setActiveSection}
        />
      </div>
    </div>
  );
}
