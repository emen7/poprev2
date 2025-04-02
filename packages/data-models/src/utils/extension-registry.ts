/**
 * Extension Registry
 * 
 * This file implements the extension registry for managing Reader extensions.
 */

import { ReaderExtension, ExtensionRegistry } from '../models/extension';

/**
 * Implementation of the ExtensionRegistry interface
 */
export class ReaderExtensionRegistry implements ExtensionRegistry {
  /**
   * Map of registered extensions
   */
  private extensions: Map<string, ReaderExtension> = new Map();

  /**
   * Register an extension
   * 
   * @param extension The extension to register
   */
  public register(extension: ReaderExtension): void {
    if (this.extensions.has(extension.id)) {
      console.warn(`Extension with ID ${extension.id} is already registered. It will be overwritten.`);
    }
    
    this.extensions.set(extension.id, extension);
    console.log(`Extension ${extension.name} (${extension.id}) registered successfully.`);
  }

  /**
   * Unregister an extension
   * 
   * @param extensionId The ID of the extension to unregister
   */
  public unregister(extensionId: string): void {
    if (!this.extensions.has(extensionId)) {
      console.warn(`Extension with ID ${extensionId} is not registered.`);
      return;
    }
    
    const extension = this.extensions.get(extensionId);
    this.extensions.delete(extensionId);
    console.log(`Extension ${extension?.name} (${extensionId}) unregistered successfully.`);
  }

  /**
   * Get an extension by ID
   * 
   * @param extensionId The ID of the extension to get
   * @returns The extension, or undefined if not found
   */
  public getExtension(extensionId: string): ReaderExtension | undefined {
    return this.extensions.get(extensionId);
  }

  /**
   * Get all registered extensions
   * 
   * @returns Array of all registered extensions
   */
  public getAllExtensions(): ReaderExtension[] {
    return Array.from(this.extensions.values());
  }

  /**
   * Get all components of a specific type from all extensions
   * 
   * @param componentType The type of component to get
   * @returns Record of extension ID to component
   */
  public getComponentsByType(componentType: string): Record<string, React.ComponentType<any>> {
    const components: Record<string, React.ComponentType<any>> = {};
    
    this.extensions.forEach((extension, extensionId) => {
      const extensionComponents = extension.getComponents();
      const component = extensionComponents[componentType] as React.ComponentType<any>;
      
      if (component) {
        components[extensionId] = component;
      }
    });
    
    return components;
  }

  /**
   * Get all node renderers from all extensions
   * 
   * @returns Record of node type to renderer component
   */
  public getAllNodeRenderers(): Record<string, React.ComponentType<any>> {
    const nodeRenderers: Record<string, React.ComponentType<any>> = {};
    
    this.extensions.forEach((extension) => {
      const extensionComponents = extension.getComponents();
      const renderers = extensionComponents.NodeRenderers;
      
      if (renderers) {
        Object.entries(renderers).forEach(([nodeType, renderer]) => {
          // If multiple extensions provide a renderer for the same node type,
          // the last one registered wins
          nodeRenderers[nodeType] = renderer;
        });
      }
    });
    
    return nodeRenderers;
  }

  /**
   * Get all hooks of a specific type from all extensions
   * 
   * @param hookType The type of hook to get
   * @returns Array of hooks
   */
  public getHooksByType(hookType: string): Array<(...args: any[]) => any> {
    const hooks: Array<(...args: any[]) => any> = [];
    
    this.extensions.forEach((extension) => {
      const extensionHooks = extension.getHooks();
      const hook = extensionHooks[hookType] as (...args: any[]) => any;
      
      if (hook) {
        hooks.push(hook);
      }
    });
    
    return hooks;
  }

  /**
   * Get all utilities of a specific type from all extensions
   * 
   * @param utilType The type of utility to get
   * @returns Array of utilities
   */
  public getUtilsByType(utilType: string): Array<(...args: any[]) => any> {
    const utils: Array<(...args: any[]) => any> = [];
    
    this.extensions.forEach((extension) => {
      const extensionUtils = extension.getUtils();
      const util = extensionUtils[utilType] as (...args: any[]) => any;
      
      if (util) {
        utils.push(util);
      }
    });
    
    return utils;
  }

  /**
   * Initialize all registered extensions with their configurations
   * 
   * @param extensionConfigs Configuration for each extension
   */
  public initializeExtensions(extensionConfigs: Record<string, any> = {}): void {
    this.extensions.forEach((extension, extensionId) => {
      const config = extensionConfigs[extensionId] || {};
      extension.initialize(config);
      console.log(`Extension ${extension.name} (${extensionId}) initialized.`);
    });
  }
}

/**
 * Create a new extension registry
 * 
 * @returns A new extension registry
 */
export function createExtensionRegistry(): ExtensionRegistry {
  return new ReaderExtensionRegistry();
}

/**
 * Global extension registry instance
 */
export const globalExtensionRegistry = createExtensionRegistry();