/**
 * Extension module for the UB Ecosystem
 */

import type {
  Extension,
  ExtensionComponents,
  ExtensionHooks,
  ExtensionRegistry,
} from '../types/extension';

// Re-export types
export type { Extension, ExtensionComponents, ExtensionHooks, ExtensionRegistry };

// This is a placeholder for future implementation
// The actual implementation will be added in subsequent tasks

/**
 * Create a new extension
 */
export function createExtension(
  id: string,
  name: string,
  version: string,
  description?: string,
  components?: ExtensionComponents,
  hooks?: ExtensionHooks
): Extension {
  return {
    id,
    name,
    version,
    description,
    components,
    hooks,
    initialize: () => {},
  };
}

/**
 * Create an extension registry
 */
export function createExtensionRegistry(): ExtensionRegistry {
  // Store registered extensions
  const extensions: Extension[] = [];

  // Register an extension
  const register = (extension: Extension): void => {
    // Check if extension already exists
    const existingIndex = extensions.findIndex(ext => ext.id === extension.id);
    if (existingIndex >= 0) {
      // Replace existing extension
      extensions[existingIndex] = extension;
    } else {
      // Add new extension
      extensions.push(extension);
    }
  };

  // Unregister an extension
  const unregister = (id: string): void => {
    const index = extensions.findIndex(ext => ext.id === id);
    if (index >= 0) {
      // Call cleanup if available
      if (extensions[index].cleanup) {
        extensions[index].cleanup!();
      }
      // Remove extension
      extensions.splice(index, 1);
    }
  };

  // Get all extensions
  const getExtensions = (): Extension[] => {
    return [...extensions];
  };

  // Get extension by ID
  const getExtension = (id: string): Extension | undefined => {
    return extensions.find(ext => ext.id === id);
  };

  // Initialize all extensions
  const initializeAll = (context: any): void => {
    extensions.forEach(extension => {
      extension.initialize(context);
    });
  };

  // Clean up all extensions
  const cleanupAll = (): void => {
    extensions.forEach(extension => {
      if (extension.cleanup) {
        extension.cleanup();
      }
    });
  };

  return {
    register,
    unregister,
    getExtensions,
    getExtension,
    initializeAll,
    cleanupAll,
  };
}
