/**
 * Extension Registry
 *
 * This file implements the extension registry for managing Reader extensions.
 */
import { ReaderExtension, ExtensionRegistry } from '../models/extension';
/**
 * Implementation of the ExtensionRegistry interface
 */
export declare class ReaderExtensionRegistry implements ExtensionRegistry {
  /**
   * Map of registered extensions
   */
  private extensions;
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
   * @returns The extension, or undefined if not found
   */
  getExtension(extensionId: string): ReaderExtension | undefined;
  /**
   * Get all registered extensions
   *
   * @returns Array of all registered extensions
   */
  getAllExtensions(): ReaderExtension[];
  /**
   * Get all components of a specific type from all extensions
   *
   * @param componentType The type of component to get
   * @returns Record of extension ID to component
   */
  getComponentsByType(componentType: string): Record<string, React.ComponentType<any>>;
  /**
   * Get all node renderers from all extensions
   *
   * @returns Record of node type to renderer component
   */
  getAllNodeRenderers(): Record<string, React.ComponentType<any>>;
  /**
   * Get all hooks of a specific type from all extensions
   *
   * @param hookType The type of hook to get
   * @returns Array of hooks
   */
  getHooksByType(hookType: string): Array<(...args: any[]) => any>;
  /**
   * Get all utilities of a specific type from all extensions
   *
   * @param utilType The type of utility to get
   * @returns Array of utilities
   */
  getUtilsByType(utilType: string): Array<(...args: any[]) => any>;
  /**
   * Initialize all registered extensions with their configurations
   *
   * @param extensionConfigs Configuration for each extension
   */
  initializeExtensions(extensionConfigs?: Record<string, any>): void;
}
/**
 * Create a new extension registry
 *
 * @returns A new extension registry
 */
export declare function createExtensionRegistry(): ExtensionRegistry;
/**
 * Global extension registry instance
 */
export declare const globalExtensionRegistry: ExtensionRegistry;
//# sourceMappingURL=extension-registry.d.ts.map
