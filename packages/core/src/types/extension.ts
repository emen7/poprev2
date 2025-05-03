/**
 * Extension types for the UB Ecosystem
 */

import React from 'react';
import { Document, UBDocument, ContentType } from './document';
import { ReaderContext } from './reader';
import { NavigationPosition } from './navigation';
import { TextSelection, Highlight } from './selection';

/**
 * Extension type enum
 */
export enum ExtensionType {
  /**
   * General purpose extension
   */
  GENERAL = 'general',

  /**
   * Content type specific extension
   */
  CONTENT_TYPE = 'content-type',

  /**
   * UI component extension
   */
  UI = 'ui',

  /**
   * Feature extension
   */
  FEATURE = 'feature',

  /**
   * Integration extension
   */
  INTEGRATION = 'integration',
}

/**
 * Extension manifest interface
 */
export interface ExtensionManifest {
  /**
   * Extension ID
   */
  id: string;

  /**
   * Extension name
   */
  name: string;

  /**
   * Extension version
   */
  version: string;

  /**
   * Extension type
   */
  type: ExtensionType;

  /**
   * Extension description
   */
  description?: string;

  /**
   * Extension author
   */
  author?: string;

  /**
   * Extension dependencies
   */
  dependencies?: string[];

  /**
   * Extension settings schema
   */
  settingsSchema?: Record<string, unknown>;
}

/**
 * Extension settings interface
 */
export interface ExtensionSettings {
  /**
   * Settings schema
   */
  schema: Record<string, unknown>;

  /**
   * Default settings values
   */
  defaults: Record<string, unknown>;

  /**
   * Validate settings
   */
  validate?: (settings: Record<string, unknown>) => boolean;
}

/**
 * Generic component props interface
 */
export interface ExtensionComponentProps {
  /**
   * Extension ID
   */
  extensionId: string;

  /**
   * Slot where the component is rendered
   */
  slot: string;

  /**
   * Any additional props passed to the component
   */
  [key: string]: unknown;
}

/**
 * Extension API interface
 */
export interface ExtensionAPI {
  /**
   * Register a component for a specific slot
   */
  registerComponent: (
    slot: string,
    component: React.ComponentType<ExtensionComponentProps>
  ) => void;

  /**
   * Register a hook
   */
  registerHook: <T extends keyof ExtensionHooks>(hookName: T, callback: ExtensionHooks[T]) => void;

  /**
   * Get a setting value
   */
  getSetting: <T>(key: string) => T;

  /**
   * Set a setting value
   */
  setSetting: <T>(key: string, value: T) => void;

  /**
   * Get the reader context
   */
  getContext: () => ReaderContext;
}

/**
 * Base Extension interface
 */
export interface Extension {
  /**
   * Extension manifest
   */
  manifest: ExtensionManifest;

  /**
   * Initialize the extension
   */
  initialize: (context: ReaderContext, api: ExtensionAPI) => void;

  /**
   * Clean up the extension
   */
  cleanup?: () => void;

  /**
   * Extension components
   */
  components?: ExtensionComponents;

  /**
   * Extension hooks
   */
  hooks?: ExtensionHooks;

  /**
   * Extension settings
   */
  settings?: ExtensionSettings;
}

/**
 * Content Type Extension interface
 */
export interface ContentTypeExtension extends Extension {
  /**
   * Content type this extension handles
   */
  contentType: ContentType;

  /**
   * Document transformer
   */
  transformDocument?: (document: Document) => Document;

  /**
   * Document validator
   */
  validateDocument?: (document: Document) => boolean;

  /**
   * Custom renderers
   */
  renderers?: ContentTypeRenderers;
}

/**
 * Content type renderers interface
 */
export interface ContentTypeRenderers {
  /**
   * Document renderer
   */
  documentRenderer?: React.ComponentType<{ document: Document }>;

  /**
   * Section renderer
   */
  sectionRenderer?: React.ComponentType<{ section: Document['sections'][0] }>;

  /**
   * Paragraph renderer
   */
  paragraphRenderer?: React.ComponentType<{ paragraph: Document['sections'][0]['paragraphs'][0] }>;
}

/**
 * Component slot enum
 */
export enum ComponentSlot {
  HEADER = 'header',
  FOOTER = 'footer',
  SIDEBAR = 'sidebar',
  CONTENT = 'content',
  PULLUP = 'pullup',
  TOOLBAR = 'toolbar',
  SETTINGS = 'settings',
  NAVIGATION = 'navigation',
  SEARCH = 'search',
  REFERENCE = 'reference',
}

/**
 * Extension components interface
 */
export interface ExtensionComponents {
  /**
   * Header components
   */
  [ComponentSlot.HEADER]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Footer components
   */
  [ComponentSlot.FOOTER]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Sidebar components
   */
  [ComponentSlot.SIDEBAR]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Content components
   */
  [ComponentSlot.CONTENT]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Pullup components
   */
  [ComponentSlot.PULLUP]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Toolbar components
   */
  [ComponentSlot.TOOLBAR]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Settings components
   */
  [ComponentSlot.SETTINGS]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Navigation components
   */
  [ComponentSlot.NAVIGATION]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Search components
   */
  [ComponentSlot.SEARCH]?: React.ComponentType<ExtensionComponentProps>[];

  /**
   * Reference components
   */
  [ComponentSlot.REFERENCE]?: React.ComponentType<ExtensionComponentProps>[];
}

/**
 * Extension hooks interface
 */
export interface ExtensionHooks {
  /**
   * Before document load hook
   * Return modified document or undefined to continue with original
   */
  beforeDocumentLoad?: (document: Document) => Document | undefined;

  /**
   * After document load hook
   */
  afterDocumentLoad?: (document: Document) => void;

  /**
   * Before navigation hook
   * Return false to prevent navigation
   */
  beforeNavigation?: (position: NavigationPosition) => boolean;

  /**
   * After navigation hook
   */
  afterNavigation?: (position: NavigationPosition) => void;

  /**
   * Before selection hook
   * Return false to prevent selection
   */
  beforeSelection?: (selection: TextSelection) => boolean;

  /**
   * After selection hook
   */
  afterSelection?: (selection: TextSelection) => void;

  /**
   * Before highlight hook
   * Return false to prevent highlighting
   */
  beforeHighlight?: (highlight: Highlight) => boolean;

  /**
   * After highlight hook
   */
  afterHighlight?: (highlight: Highlight) => void;

  /**
   * Document transformer hook
   * Transform the document before rendering
   */
  transformDocument?: (document: Document) => Document;

  /**
   * Paragraph transformer hook
   * Transform paragraph content before rendering
   */
  transformParagraph?: (
    paragraph: Document['sections'][0]['paragraphs'][0],
    context: {
      sectionIndex: number;
      paragraphIndex: number;
      document: Document;
    }
  ) => Document['sections'][0]['paragraphs'][0];
}

/**
 * Extension registry interface
 */
export interface ExtensionRegistry {
  /**
   * Register an extension
   */
  register: (extension: Extension) => void;

  /**
   * Unregister an extension
   */
  unregister: (id: string) => void;

  /**
   * Get all registered extensions
   */
  getExtensions: () => Extension[];

  /**
   * Get an extension by ID
   */
  getExtension: (id: string) => Extension | undefined;

  /**
   * Get extensions by type
   */
  getExtensionsByType: (type: ExtensionType) => Extension[];

  /**
   * Get content type extensions
   */
  getContentTypeExtensions: () => ContentTypeExtension[];

  /**
   * Get content type extension for a specific content type
   */
  getContentTypeExtension: (contentType: ContentType) => ContentTypeExtension | undefined;

  /**
   * Initialize all extensions
   */
  initializeAll: (context: ReaderContext) => void;

  /**
   * Clean up all extensions
   */
  cleanupAll: () => void;

  /**
   * Get components for a specific slot
   */
  getComponentsForSlot: (
    slot: ComponentSlot
  ) => React.ComponentType<ExtensionComponentProps>[] | undefined;

  /**
   * Apply document transformers from all extensions
   */
  applyDocumentTransformers: (document: Document) => Document;
}

/**
 * Scientific extension interface
 * Example of a specialized content type extension
 */
export interface ScientificExtension extends ContentTypeExtension {
  /**
   * Content type is always scientific
   */
  contentType: ContentType.SCIENTIFIC;

  /**
   * Formula renderer
   */
  formulaRenderer?: React.ComponentType<{ formula: string }>;

  /**
   * Citation renderer
   */
  citationRenderer?: React.ComponentType<{ citation: string }>;

  /**
   * Reference parser
   */
  referenceParser?: (text: string) => { type: string; reference: string }[];
}
