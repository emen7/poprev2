import { ReactNode } from 'react';
import './UBReaderLayout.css';
export interface UBReaderLayoutProps {
    /**
     * The title of the current paper/document
     */
    title: string;
    /**
     * The main content to be rendered in the layout
     */
    children: ReactNode;
    /**
     * Content for the book navigation panel
     */
    bookNavigationContent?: ReactNode;
    /**
     * Content for the section navigation panel
     */
    sectionNavigationContent?: ReactNode;
    /**
     * Additional content for the right section of the header
     */
    headerRightContent?: ReactNode;
    /**
     * Whether to show the footer
     * @default true
     */
    showFooter?: boolean;
    /**
     * Content to be rendered in the footer
     */
    footerContent?: ReactNode;
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
    /**
     * Additional CSS class name
     */
    className?: string;
}
/**
 * UBReaderLayout Component
 *
 * A specialized layout for the UB Reader with book and section navigation,
 * content container with optimized width, and multi-purpose bottom panel.
 */
export declare function UBReaderLayout({ title, children, bookNavigationContent, sectionNavigationContent, headerRightContent, showFooter, footerContent, contentWidth, showBottomPanel, bottomPanelTabs, bottomPanelInitialHeight, className, }: UBReaderLayoutProps): import("react/jsx-runtime").JSX.Element;
export default UBReaderLayout;
//# sourceMappingURL=UBReaderLayout.d.ts.map