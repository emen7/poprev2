/**
 * Extension module for the UB Ecosystem
 */
import type { Extension, ExtensionComponents, ExtensionHooks, ExtensionRegistry } from '../types/extension';
export type { Extension, ExtensionComponents, ExtensionHooks, ExtensionRegistry };
/**
 * Create a new extension
 */
export declare function createExtension(id: string, name: string, version: string, description?: string, components?: ExtensionComponents, hooks?: ExtensionHooks): Extension;
/**
 * Create an extension registry
 */
export declare function createExtensionRegistry(): ExtensionRegistry;
//# sourceMappingURL=index.d.ts.map