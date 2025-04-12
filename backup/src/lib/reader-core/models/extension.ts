/**
 * Extension System
 *
 * This file defines the interfaces for the Reader extension system.
 * It provides a plugin architecture for adding specialized features to the Reader.
 */

import { ReactNode } from 'react';
import { Document } from './document';

/**
 * Represents a Reader extension
 */
export interface ReaderExtension {
  /**
   * Unique identifier for the extension
   */
  id: string;

  /**
   * Display name of the extension
   */
  name: string;

  /**
   * Description of the extension
   */
  description: string;

  /**
   * Version of the extension
   */
  version: string;

  /**
   * Initialize the extension
   *
   * @param config Extension configuration
   */
  initialize(config: any): void;

  /**
   * Get the components provided by this extension
   */
  getComponents(): ExtensionComponents;

  /**
   * Get the hooks provided by this extension
   */
  getHooks(): ExtensionHooks;

  /**
   * Get the utilities provided by this extension
   */
  getUtils(): ExtensionUtils;
}

/**
 * Components provided by an extension
 */
export interface ExtensionComponents {
  /**
   * Custom document header component
   */
  DocumentHeader?: React.ComponentType<DocumentHeaderProps>;

  /**
   * Custom table of contents component
   */
  TableOfContents?: React.ComponentType<TableOfContentsProps>;

  /**
   * Custom content renderer component
   */
  ContentRenderer?: React.ComponentType<ContentRendererProps>;

  /**
   * Custom node renderer components
   */
  NodeRenderers?: {
    [nodeType: string]: React.ComponentType<NodeRendererProps>;
  };

  /**
   * Additional UI components
   */
  [key: string]:
    | React.ComponentType<any>
    | undefined
    | {
        [key: string]: React.ComponentType<any>;
      };
}

/**
 * Hooks provided by an extension
 */
export interface ExtensionHooks {
  /**
   * Hook for document processing
   */
  useDocumentProcessor?: (document: Document) => Document;

  /**
   * Hook for reference handling
   */
  useReferenceHandler?: (reference: any) => any;

  /**
   * Additional hooks
   */
  [key: string]: ((...args: any[]) => any) | undefined;
}

/**
 * Utilities provided by an extension
 */
export interface ExtensionUtils {
  /**
   * Utility for processing references
   */
  processReferences?: (content: any) => any;

  /**
   * Utility for validating document structure
   */
  validateDocument?: (document: Document) => boolean;

  /**
   * Additional utilities
   */
  [key: string]: ((...args: any[]) => any) | undefined;
}

/**
 * Props for the DocumentHeader component
 */
export interface DocumentHeaderProps {
  /**
   * The document to display
   */
  document: Document;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Props for the TableOfContents component
 */
export interface TableOfContentsProps {
  /**
   * The document to generate TOC for
   */
  document: Document;

  /**
   * Currently active section ID
   */
  activeSection?: string;

  /**
   * Callback when a section is selected
   */
  onSectionSelect?: (sectionId: string) => void;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Props for the ContentRenderer component
 */
export interface ContentRendererProps {
  /**
   * The document to render
   */
  document: Document;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Props for the NodeRenderer components
 */
export interface NodeRendererProps {
  /**
   * The node to render
   */
  node: any;

  /**
   * Function to render children
   */
  renderChildren: (node: any) => ReactNode;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * Extension registry for managing available extensions
 */
export interface ExtensionRegistry {
  /**
   * Register an extension
   *
   * @param extension The extension to register
   */
  register(extension: ReaderExtension): void;

  /**
   * Unregister an extension
   *
   * @param extensionId The ID of the extension to unregister
   */
  unregister(extensionId: string): void;

  /**
   * Get an extension by ID
   *
   * @param extensionId The ID of the extension to get
   */
  getExtension(extensionId: string): ReaderExtension | undefined;

  /**
   * Get all registered extensions
   */
  getAllExtensions(): ReaderExtension[];

  /**
   * Get all components of a specific type from all extensions
   *
   * @param componentType The type of component to get
   */
  getComponentsByType(componentType: string): Record<string, React.ComponentType<any>>;

  /**
   * Initialize all registered extensions with their configurations
   *
   * @param extensionConfigs Configuration for each extension
   */
  initializeExtensions(extensionConfigs: Record<string, any>): void;
}
