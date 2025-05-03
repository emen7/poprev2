import React from 'react';
import './PullupTabs.css';
export type PullupTab = 'notes' | 'quotes' | 'settings';
export interface PullupTabsProps {
    /**
     * The currently active tab
     */
    activeTab: PullupTab;
    /**
     * Function called when a tab is selected
     */
    onTabSelect: (tab: PullupTab) => void;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 */
export declare const PullupTabs: React.FC<PullupTabsProps>;
export default PullupTabs;
//# sourceMappingURL=PullupTabs.d.ts.map