import { ReactNode } from 'react';
import './MultiPurposePanel.css';
export interface MultiPurposePanelProps {
    /**
     * The content to be rendered in the panel
     */
    children: ReactNode;
    /**
     * Whether the panel is open
     */
    isOpen: boolean;
    /**
     * Function to call when the panel should be closed
     */
    onClose: () => void;
    /**
     * The initial height of the panel
     * @default 300
     */
    initialHeight?: number;
    /**
     * Function to call when the panel height changes
     */
    onHeightChange?: (height: number) => void;
    /**
     * The initial tab to be active
     */
    initialTab?: string;
    /**
     * The tabs to be displayed in the panel
     */
    tabs?: {
        id: string;
        label: string;
        icon?: ReactNode;
        content: ReactNode;
    }[];
    /**
     * Whether to show an overlay behind the panel
     * @default true
     */
    showOverlay?: boolean;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether to close the panel when clicking outside
     * @default true
     */
    closeOnClickOutside?: boolean;
}
/**
 * MultiPurposePanel Component
 *
 * A sliding panel that appears from the bottom of the screen.
 * Includes height adjustment, tab navigation, and overlay.
 */
export declare function MultiPurposePanel({ children, isOpen, onClose, initialHeight, onHeightChange, initialTab, tabs, showOverlay, className, closeOnClickOutside, }: MultiPurposePanelProps): import("react/jsx-runtime").JSX.Element;
export default MultiPurposePanel;
//# sourceMappingURL=MultiPurposePanel.d.ts.map