import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PullupTabs.css';
/**
 * PullupTabs Component
 *
 * Navigation tabs for the pullup panel.
 */
export const PullupTabs = ({ activeTab, onTabSelect, className = '', }) => {
    // Define tabs
    const tabs = [
        { id: 'notes', label: 'Notes', icon: '📝' },
        { id: 'quotes', label: 'Quotes', icon: '💬' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];
    // Determine container classes
    const containerClasses = ['pullup-tabs', className].filter(Boolean).join(' ');
    return (_jsx("div", { className: containerClasses, children: tabs.map(tab => (_jsxs("button", { className: `pullup-tab ${activeTab === tab.id ? 'pullup-tab-active' : ''}`, onClick: () => onTabSelect(tab.id), "aria-selected": activeTab === tab.id, role: "tab", children: [_jsx("span", { className: "pullup-tab-icon", children: tab.icon }), _jsx("span", { className: "pullup-tab-label", children: tab.label })] }, tab.id))) }));
};
export default PullupTabs;
//# sourceMappingURL=PullupTabs.js.map