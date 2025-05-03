import { PullupTab } from './types';
import './PullupTabs.css';
export interface PullupTabsProps {
    /**
     * The currently active tab
     */
    activeTab: PullupTab;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onTabSelect prop to fix Next.js serialization errors.
 * The component now uses the context directly for tab selection.
 */
export declare function PullupTabs({ activeTab, className }: PullupTabsProps): import("react/jsx-runtime").JSX.Element;
export default PullupTabs;
//# sourceMappingURL=PullupTabs.d.ts.map