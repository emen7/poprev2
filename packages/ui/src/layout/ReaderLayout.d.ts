import { ReactNode } from 'react';
import './ReaderLayout.css';
export interface ReaderLayoutProps {
    /**
     * The main content to be rendered in the layout
     */
    children: ReactNode;
    /**
     * Whether to show the header
     * @default true
     */
    showHeader?: boolean;
    /**
     * Whether to show the footer
     * @default true
     */
    showFooter?: boolean;
    /**
     * Whether to show the side panel
     * @default false
     */
    showSidePanel?: boolean;
    /**
     * Content to be rendered in the side panel
     */
    sidePanelContent?: ReactNode;
    /**
     * Content to be rendered in the header
     */
    headerContent?: ReactNode;
    /**
     * Content to be rendered in the footer
     */
    footerContent?: ReactNode;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Width setting for the content
     * @default 'medium'
     */
    contentWidth?: 'narrow' | 'medium' | 'wide';
    /**
     * Whether to show the bottom panel
     * @default false
     */
    showBottomPanel?: boolean;
    /**
     * Content to be rendered in the bottom panel
     */
    bottomPanelContent?: ReactNode;
    /**
     * Tabs for the bottom panel
     */
    bottomPanelTabs?: {
        id: string;
        label: string;
        icon?: ReactNode;
        content: ReactNode;
    }[];
    /**
     * Initial height for the bottom panel
     * @default 300
     */
    bottomPanelInitialHeight?: number;
}
/**
 * ReaderLayout Component
 *
 * A flexible layout component for reader applications that includes:
 * - Header (optional)
 * - Footer (optional)
 * - Side panel (optional)
 * - Main content area
 */
export declare function ReaderLayout({ children, showHeader, showFooter, showSidePanel, sidePanelContent, headerContent, footerContent, className, contentWidth, showBottomPanel, bottomPanelContent, bottomPanelTabs, bottomPanelInitialHeight, }: ReaderLayoutProps): import("react/jsx-runtime").JSX.Element;
export default ReaderLayout;
//# sourceMappingURL=ReaderLayout.d.ts.map