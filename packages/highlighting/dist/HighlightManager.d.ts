/**
 * UB Highlight Module
 * A reusable module for text highlighting in the Urantia Book ecosystem
 */
import { HighlightManagerOptions } from './types';
/**
 * Highlight Manager Class
 * Manages text highlighting functionality
 */
export declare class HighlightManager {
    private container;
    private colors;
    private isDarkMode;
    private onHighlight;
    private showHighlights;
    private selectionMenu;
    private colorPicker;
    private selectedText;
    private selectedRange;
    /**
     * Create a new HighlightManager
     * @param options - Configuration options
     */
    constructor(options: HighlightManagerOptions);
    /**
     * Get default color options based on research-backed recommendations
     * @returns Array of default color objects
     */
    private getDefaultColors;
    /**
     * Initialize the highlight manager
     */
    private init;
    /**
     * Handle copy event to ensure text is copied without dark mode styling
     * @param event - The copy event
     */
    private handleCopy;
    /**
     * Process selection for copying
     * @param selection - The selection to process
     * @returns The plain text of the selection
     */
    private processSelectionForCopy;
    /**
     * Add required styles to the document
     */
    private addStyles;
    /**
     * Handle mouse up event
     * @param event - The mouse event
     */
    private handleMouseUp;
    /**
     * Handle context menu event
     * @param event - The mouse event
     */
    private handleContextMenu;
    /**
     * Handle click outside
     * @param event - The mouse event
     */
    private handleClickOutside;
    /**
     * Create selection menu
     * @param position - The position of the menu
     */
    private createSelectionMenu;
    /**
     * Show color picker
     * @param position - The position of the color picker
     */
    private showColorPicker;
    /**
     * Update highlight visibility based on showHighlights setting
     */
    updateHighlightVisibility(): void;
    /**
     * Apply highlight to selected text
     * @param colorName - The name of the color to apply
     */
    applyHighlight(colorName: string): void;
    /**
     * Process contents for highlighting
     * @param contents - The contents to process
     * @param className - The class name to apply
     */
    private processContentsForHighlighting;
    /**
     * Remove all highlights within a range
     * @param range - The range to remove highlights from
     */
    private removeHighlightsInRange;
    /**
     * Get all text nodes within a range
     * @param range - The range to get text nodes from
     * @returns Array of text nodes
     */
    private getTextNodesInRange;
    /**
     * Remove selection menu
     */
    private removeSelectionMenu;
    /**
     * Remove color picker
     */
    private removeColorPicker;
    /**
     * Set whether to show highlights
     * @param show - Whether to show highlights
     */
    setShowHighlights(show: boolean): void;
    /**
     * Toggle highlight visibility
     * @returns The new visibility state
     */
    toggleHighlights(): boolean;
    /**
     * Destroy the highlight manager
     * Removes event listeners and cleans up
     */
    destroy(): void;
}
