import React from 'react';
import './PullupPanel.css';
export interface PullupPanelProps {
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
     * Content for the tabs area
     */
    tabsContent: React.ReactNode;
    /**
     * Main content for the panel
     */
    mainContent: React.ReactNode;
}
/**
 * PullupPanel Component
 *
 * A panel that slides up from the bottom of the screen.
 * Supports dragging, peeking, and theme-aware styling.
 * Uses PullupContext for state management instead of props.
 */
export declare function PullupPanel({ minHeight, maxHeight, className, tabsContent, mainContent, }: PullupPanelProps): import("react/jsx-runtime").JSX.Element;
export default PullupPanel;
//# sourceMappingURL=PullupPanel.d.ts.map