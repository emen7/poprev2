/**
 * Extension module for the UB Ecosystem
 */

import { ExtensionType, ComponentSlot } from '../types/extension';

import type {
  Extension,
  ExtensionComponents,
  ExtensionHooks,
  ExtensionRegistry,
  ExtensionManifest,
  ExtensionAPI,
  ExtensionSettings,
  ContentTypeExtension,
  ScientificExtension,
} from '../types/extension';
import { ContentType } from '../types/document';
import { ReaderContext } from '../types/reader';
import { Document } from '../types/document';

// Re-export types
export type {
  Extension,
  ExtensionComponents,
  ExtensionHooks,
  ExtensionRegistry,
  ExtensionManifest,
  ExtensionAPI,
  ExtensionSettings,
  ContentTypeExtension,
  ScientificExtension,
};

/**
 * Create a new extension manifest
 */
export function createExtensionManifest(
  id: string,
  name: string,
  version: string,
  type: ExtensionType = ExtensionType.GENERAL,
  description?: string,
  author?: string,
  dependencies?: string[],
  settingsSchema?: Record<string, unknown>
): ExtensionManifest {
  return {
    id,
    name,
    version,
    type,
    description,
    author,
    dependencies,
    settingsSchema,
  };
}

/**
 * Create extension settings
 */
export function createExtensionSettings(
  schema: Record<string, unknown>,
  defaults: Record<string, unknown>,
  validate?: (settings: Record<string, unknown>) => boolean
): ExtensionSettings {
  return {
    schema,
    defaults,
    validate,
  };
}

/**
 * Create a new extension
 */
export function createExtension(
  manifest: ExtensionManifest,
  initialize: (context: ReaderContext, api: ExtensionAPI) => void,
  cleanup?: () => void,
  components?: ExtensionComponents,
  hooks?: ExtensionHooks,
  settings?: ExtensionSettings
): Extension {
  return {
    manifest,
    initialize,
    cleanup,
    components,
    hooks,
    settings,
  };
}

/**
 * Create a content type extension
 */
export function createContentTypeExtension(
  manifest: ExtensionManifest,
  contentType: ContentType,
  initialize: (context: ReaderContext, api: ExtensionAPI) => void,
  transformDocument?: (document: Document) => Document,
  validateDocument?: (document: Document) => boolean,
  cleanup?: () => void,
  components?: ExtensionComponents,
  hooks?: ExtensionHooks,
  settings?: ExtensionSettings,
  renderers?: ContentTypeExtension['renderers']
): ContentTypeExtension {
  return {
    manifest,
    contentType,
    initialize,
    transformDocument,
    validateDocument,
    cleanup,
    components,
    hooks,
    settings,
    renderers,
  };
}

/**
 * Create a scientific extension
 */
export function createScientificExtension(
  manifest: ExtensionManifest,
  initialize: (context: ReaderContext, api: ExtensionAPI) => void,
  formulaRenderer?: React.ComponentType<{ formula: string }>,
  citationRenderer?: React.ComponentType<{ citation: string }>,
  referenceParser?: (text: string) => { type: string; reference: string }[],
  cleanup?: () => void,
  components?: ExtensionComponents,
  hooks?: ExtensionHooks,
  settings?: ExtensionSettings,
  renderers?: ContentTypeExtension['renderers']
): ScientificExtension {
  return {
    manifest,
    contentType: ContentType.SCIENTIFIC,
    initialize,
    formulaRenderer,
    citationRenderer,
    referenceParser,
    cleanup,
    components,
    hooks,
    settings,
    renderers,
  };
}

/**
 * Create an extension API
 */
export function createExtensionAPI(
  context: ReaderContext,
  componentRegistry: Map<ComponentSlot, React.ComponentType<any>[]>,
  hookRegistry: Map<string, Function[]>,
  settings: Map<string, unknown>
): ExtensionAPI {
  return {
    registerComponent: (slot: string, component: React.ComponentType<any>) => {
      const slotKey = slot as ComponentSlot;
      if (!componentRegistry.has(slotKey)) {
        componentRegistry.set(slotKey, []);
      }
      componentRegistry.get(slotKey)?.push(component);
    },

    registerHook: <T extends keyof ExtensionHooks>(hookName: T, callback: ExtensionHooks[T]) => {
      if (!hookRegistry.has(hookName as string)) {
        hookRegistry.set(hookName as string, []);
      }
      hookRegistry.get(hookName as string)?.push(callback as Function);
    },

    getSetting: <T>(key: string): T => {
      return settings.get(key) as T;
    },

    setSetting: <T>(key: string, value: T): void => {
      settings.set(key, value);
    },

    getContext: () => context,
  };
}

/**
 * Create an extension registry
 */
export function createExtensionRegistry(): ExtensionRegistry {
  // Store registered extensions
  const extensions: Extension[] = [];
  const componentRegistry = new Map<ComponentSlot, React.ComponentType<any>[]>();
  const hookRegistry = new Map<string, Function[]>();
  const settingsRegistry = new Map<string, Map<string, unknown>>();

  // Register an extension
  const register = (extension: Extension): void => {
    // Check if extension already exists
    const existingIndex = extensions.findIndex(ext => ext.manifest.id === extension.manifest.id);
    if (existingIndex >= 0) {
      // Replace existing extension
      extensions[existingIndex] = extension;
    } else {
      // Add new extension
      extensions.push(extension);
    }

    // Initialize settings if provided
    if (extension.settings) {
      const extensionSettings = new Map<string, unknown>();

      // Set default values
      Object.entries(extension.settings.defaults).forEach(([key, value]) => {
        extensionSettings.set(key, value);
      });

      settingsRegistry.set(extension.manifest.id, extensionSettings);
    }
  };

  // Unregister an extension
  const unregister = (id: string): void => {
    const index = extensions.findIndex(ext => ext.manifest.id === id);
    if (index >= 0) {
      // Call cleanup if available
      if (extensions[index].cleanup) {
        extensions[index].cleanup();
      }
      // Remove extension
      extensions.splice(index, 1);
      // Remove settings
      settingsRegistry.delete(id);
    }
  };

  // Get all extensions
  const getExtensions = (): Extension[] => {
    return [...extensions];
  };

  // Get extension by ID
  const getExtension = (id: string): Extension | undefined => {
    return extensions.find(ext => ext.manifest.id === id);
  };

  // Get extensions by type
  const getExtensionsByType = (type: ExtensionType): Extension[] => {
    return extensions.filter(ext => ext.manifest.type === type);
  };

  // Get content type extensions
  const getContentTypeExtensions = (): ContentTypeExtension[] => {
    return extensions.filter(
      ext => ext.manifest.type === ExtensionType.CONTENT_TYPE
    ) as ContentTypeExtension[];
  };

  // Get content type extension for a specific content type
  const getContentTypeExtension = (contentType: ContentType): ContentTypeExtension | undefined => {
    return getContentTypeExtensions().find(
      ext => (ext as ContentTypeExtension).contentType === contentType
    );
  };

  // Initialize all extensions
  const initializeAll = (context: ReaderContext): void => {
    extensions.forEach(extension => {
      // Create extension API
      const extensionSettings =
        settingsRegistry.get(extension.manifest.id) || new Map<string, unknown>();
      const api = createExtensionAPI(context, componentRegistry, hookRegistry, extensionSettings);

      // Initialize extension
      extension.initialize(context, api);
    });
  };

  // Clean up all extensions
  const cleanupAll = (): void => {
    extensions.forEach(extension => {
      if (extension.cleanup) {
        extension.cleanup();
      }
    });

    // Clear registries
    componentRegistry.clear();
    hookRegistry.clear();
  };

  // Get components for a specific slot
  const getComponentsForSlot = (slot: ComponentSlot): React.ComponentType<any>[] | undefined => {
    return componentRegistry.get(slot);
  };

  // Apply document transformers from all extensions
  const applyDocumentTransformers = (document: Document): Document => {
    let transformedDocument = { ...document };

    // Get all document transformer hooks
    const transformers = hookRegistry.get('transformDocument') || [];

    // Apply each transformer in sequence
    transformers.forEach(transformer => {
      const result = (transformer as (doc: Document) => Document)(transformedDocument);
      if (result) {
        transformedDocument = result;
      }
    });

    return transformedDocument;
  };

  return {
    register,
    unregister,
    getExtensions,
    getExtension,
    getExtensionsByType,
    getContentTypeExtensions,
    getContentTypeExtension,
    initializeAll,
    cleanupAll,
    getComponentsForSlot,
    applyDocumentTransformers,
  };
}
