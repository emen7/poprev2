/**
 * Extension types for the UB Ecosystem
 */
import { ReaderContext } from './reader';
/**
 * Extension interface
 */
export interface Extension {
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
     * Extension description
     */
    description?: string;
    /**
     * Initialize the extension
     */
    initialize: (context: ReaderContext) => void;
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
}
/**
 * Extension components interface
 */
export interface ExtensionComponents {
    /**
     * Header components
     */
    header?: React.ComponentType[];
    /**
     * Footer components
     */
    footer?: React.ComponentType[];
    /**
     * Sidebar components
     */
    sidebar?: React.ComponentType[];
    /**
     * Content components
     */
    content?: React.ComponentType[];
    /**
     * Pullup components
     */
    pullup?: React.ComponentType[];
}
/**
 * Extension hooks interface
 */
export interface ExtensionHooks {
    /**
     * Before document load hook
     */
    beforeDocumentLoad?: (document: any) => any;
    /**
     * After document load hook
     */
    afterDocumentLoad?: (document: any) => void;
    /**
     * Before navigation hook
     */
    beforeNavigation?: (position: any) => boolean;
    /**
     * After navigation hook
     */
    afterNavigation?: (position: any) => void;
    /**
     * Before selection hook
     */
    beforeSelection?: (selection: any) => boolean;
    /**
     * After selection hook
     */
    afterSelection?: (selection: any) => void;
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
     * Initialize all extensions
     */
    initializeAll: (context: ReaderContext) => void;
    /**
     * Clean up all extensions
     */
    cleanupAll: () => void;
}
//# sourceMappingURL=extension.d.ts.map