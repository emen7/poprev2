import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './ReaderLayout.css';
import ContentContainer from './ContentContainer';
import MultiPurposePanel from './MultiPurposePanel';
/**
 * ReaderLayout Component
 *
 * A flexible layout component for reader applications that includes:
 * - Header (optional)
 * - Footer (optional)
 * - Side panel (optional)
 * - Main content area
 */
export function ReaderLayout({ children, showHeader = true, showFooter = true, showSidePanel = false, sidePanelContent, headerContent, footerContent, className = '', contentWidth = 'medium', showBottomPanel = false, bottomPanelContent, bottomPanelTabs = [], bottomPanelInitialHeight = 300, }) {
    const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(showBottomPanel);
    return (_jsxs("div", { className: `reader-layout ${className}`, children: [showHeader && _jsx("header", { className: "reader-layout-header", children: headerContent }), _jsxs("div", { className: "reader-layout-body", children: [showSidePanel && _jsx("aside", { className: "reader-layout-sidebar", children: sidePanelContent }), _jsx("main", { className: "reader-layout-content", children: _jsx(ContentContainer, { width: contentWidth, children: children }) })] }), showFooter && _jsx("footer", { className: "reader-layout-footer", children: footerContent }), _jsx(MultiPurposePanel, { isOpen: isBottomPanelOpen, onClose: () => setIsBottomPanelOpen(false), initialHeight: bottomPanelInitialHeight, tabs: bottomPanelTabs, children: bottomPanelContent }), !isBottomPanelOpen && (_jsx("button", { className: "bottom-panel-toggle", onClick: () => setIsBottomPanelOpen(true), "aria-label": "Open panel", children: _jsx("span", { className: "toggle-icon", children: "\u25B2" }) }))] }));
}
export default ReaderLayout;
//# sourceMappingURL=ReaderLayout.js.map