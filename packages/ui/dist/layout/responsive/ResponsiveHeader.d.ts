import React from 'react';
import './ResponsiveHeader.css';
export interface ResponsiveHeaderProps {
    /**
     * The content to be rendered in the header
     */
    children: React.ReactNode;
    /**
     * Whether to auto-hide the header on scroll (mobile only)
     * @default true
     */
    autoHide?: boolean;
    /**
     * Threshold in pixels for when to start hiding the header
     * @default 50
     */
    scrollThreshold?: number;
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * ResponsiveHeader Component
 *
 * A header component that adapts to different screen sizes:
 * - On mobile: Can auto-hide when scrolling down and reappear when scrolling up
 * - On desktop: Remains fixed at the top of the viewport
 */
export declare function ResponsiveHeader({ children, autoHide, scrollThreshold, className, }: ResponsiveHeaderProps): import("react/jsx-runtime").JSX.Element;
export default ResponsiveHeader;
//# sourceMappingURL=ResponsiveHeader.d.ts.map