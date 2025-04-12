/**
 * Reader types for the UB Ecosystem
 */
import { Document } from './document';
import { NavigationService } from './navigation';
import { SelectionService } from './selection';
/**
 * Reader context interface
 */
export interface ReaderContext {
    /**
     * Current document
     */
    document: Document | null;
    /**
     * Navigation service
     */
    navigation: NavigationService;
    /**
     * Selection service
     */
    selection: SelectionService;
    /**
     * Reader settings
     */
    settings: ReaderSettings;
    /**
     * Update reader settings
     */
    updateSettings: (settings: Partial<ReaderSettings>) => void;
    /**
     * Load a document
     */
    loadDocument: (document: Document) => void;
}
/**
 * Reader settings interface
 */
export interface ReaderSettings {
    /**
     * Font size in pixels
     */
    fontSize: number;
    /**
     * Line height
     */
    lineHeight: number;
    /**
     * Font family
     */
    fontFamily: string;
    /**
     * Show paragraph numbers
     */
    showParagraphNumbers: boolean;
    /**
     * Show section titles
     */
    showSectionTitles: boolean;
    /**
     * Theme name
     */
    theme: string;
    /**
     * Enable text selection
     */
    enableTextSelection: boolean;
    /**
     * Enable highlighting
     */
    enableHighlighting: boolean;
    /**
     * Additional settings
     */
    [key: string]: any;
}
/**
 * Reader provider props interface
 */
export interface ReaderProviderProps {
    /**
     * Initial document
     */
    document?: Document;
    /**
     * Initial settings
     */
    initialSettings?: Partial<ReaderSettings>;
    /**
     * Children components
     */
    children: React.ReactNode;
}
/**
 * Default reader settings
 */
export declare const DEFAULT_READER_SETTINGS: ReaderSettings;
//# sourceMappingURL=reader.d.ts.map