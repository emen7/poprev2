import React from 'react';
import './PullupPanel.css';
export interface PullupPanelProps {
    /**
     * Whether the pullup panel is open
     */
    isOpen: boolean;
    /**
     * The height of the pullup panel
     */
    height: number;
    /**
     * Whether the pullup panel is in persistent mode (for large screens)
     */
    isPersistent: boolean;
    /**
     * Function called when the pullup panel is closed
     */
    onClose?: () => void;
    /**
     * Function called when the height of the pullup panel changes
     */
    onHeightChange?: (height: number) => void;
    /**
     * The minimum height of the pullup panel
     * @default 100
     */
    minHeight?: number;
    /**
     * The maximum height of the pullup panel
     * @default 600
     */
    maxHeight?: number;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Children to render inside the pullup panel
     */
    children: React.ReactNode;
}
/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 */
export declare const PullupPanel: React.FC<PullupPanelProps>;
export default PullupPanel;
//# sourceMappingURL=PullupPanel.d.ts.map