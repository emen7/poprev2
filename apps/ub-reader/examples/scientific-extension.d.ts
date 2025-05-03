/**
 * Scientific Extension
 *
 * This file demonstrates how to create an extension for the Reader component.
 * This extension adds specialized features for scientific documents.
 */
import { ReaderExtension, ExtensionComponents, ExtensionHooks, ExtensionUtils } from '../lib/archive/reader-core';
/**
 * Scientific Extension
 */
export declare class ScientificExtension implements ReaderExtension {
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
     * Extension configuration
     */
    private config;
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
 * Create a new instance of the Scientific Extension
 */
export declare function createScientificExtension(): ReaderExtension;
//# sourceMappingURL=scientific-extension.d.ts.map