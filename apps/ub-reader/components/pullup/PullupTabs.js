'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePullup } from '../../contexts/PullupContext';
import './PullupTabs.css';
/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 * Uses PullupContext for state management.
 *
 * Note: We removed the onTabSelect prop to fix Next.js serialization errors.
 * The component now uses the context directly for tab selection.
 */
export function PullupTabs({ activeTab, className = '' }) {
    // Get pullup context
    const { activeTab: contextActiveTab, setActiveTab } = usePullup();
    // Use context values if props are not provided
    const currentActiveTab = activeTab || contextActiveTab;
    const handleTabSelect = setActiveTab;
    // Define tabs
    const tabs = [
        { id: 'notes', label: 'Notes', icon: '📝' },
        { id: 'quotes', label: 'Quotes', icon: '💬' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    // Determine container classes
    // Add the bottom-tabs class to allow targeting in desktop-pullup.css
    const containerClasses = ['pullup-tabs', 'bottom-tabs', className].filter(Boolean).join(' ');
    return (_jsx("div", { className: containerClasses, children: tabs.map(tab => (_jsxs("button", { className: `pullup-tab ${currentActiveTab === tab.id ? 'pullup-tab-active' : ''}`, onClick: () => handleTabSelect(tab.id), "aria-selected": currentActiveTab === tab.id, role: "tab", children: [_jsx("span", { className: "pullup-tab-icon", children: tab.icon }), _jsx("span", { className: "pullup-tab-label", children: tab.label })] }, tab.id))) }));
}
export default PullupTabs;
//# sourceMappingURL=PullupTabs.js.map