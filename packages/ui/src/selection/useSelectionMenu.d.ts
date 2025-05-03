import { HighlightColor } from './HighlightColorPicker';
export interface SelectionPosition {
    top: number;
    left: number;
}
export interface UseSelectionMenuOptions {
    /**
     * Element to listen for selection events on
     * If not provided, the document body will be used
     */
    targetElement?: HTMLElement | null;
    /**
     * Whether to show the selection menu on right-click
     * @default true
     */
    showOnRightClick?: boolean;
    /**
     * Whether to show the selection menu on mouse up
     * @default true
     */
    showOnMouseUp?: boolean;
    /**
     * Minimum length of selected text to show the menu
     * @default 1
     */
    minSelectionLength?: number;
    /**
     * Offset for the menu position
     * @default { top: 10, left: 0 }
     */
    offset?: {
        top: number;
        left: number;
    };
    /**
     * Whether the component is in dark mode
     * @default false
     */
    darkMode?: boolean;
}
export interface UseSelectionMenuResult {
    /**
     * Whether the selection menu is visible
     */
    isMenuVisible: boolean;
    /**
     * Position of the selection menu
     */
    menuPosition: SelectionPosition;
    /**
     * Selected text
     */
    selectedText: string;
    /**
     * Show the selection menu
     */
    showMenu: (position?: SelectionPosition) => void;
    /**
     * Hide the selection menu
     */
    hideMenu: () => void;
    /**
     * Copy the selected text to clipboard
     */
    copySelectedText: () => void;
    /**
     * Highlight the selected text
     */
    highlightSelectedText: (color: HighlightColor) => void;
    /**
     * Whether the component is in dark mode
     */
    darkMode: boolean;
}
/**
 * Hook for handling text selection and showing a selection menu
 */
export declare function useSelectionMenu({ targetElement, showOnRightClick, showOnMouseUp, minSelectionLength, offset, darkMode, }?: UseSelectionMenuOptions): UseSelectionMenuResult;
export default useSelectionMenu;
//# sourceMappingURL=useSelectionMenu.d.ts.map