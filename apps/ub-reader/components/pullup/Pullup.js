'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { PullupContent } from './PullupContent';
import { PullupPanel } from './PullupPanel';
import { PullupTabs } from './PullupTabs';
import { usePullup } from '../../contexts/PullupContext';
import './Pullup.css';
/**
 * Pullup Component
 *
 * A component that combines all pullup components into a single component.
 * Uses PullupContext for state management instead of props.
 */
export function Pullup({ minHeight = 100, maxHeight = 600, className = '' }) {
    const { isOpen, activeTab, height, isPersistent, closePullup, setActiveTab, setHeight } = usePullup();
    // Determine container classes
    const containerClasses = ['pullup', className].filter(Boolean).join(' ');
    // Log to identify serialization issues
    console.log('Pullup rendering with activeTab:', activeTab);
    console.log('setActiveTab is a function:', typeof setActiveTab === 'function');
    return (_jsx("div", { className: containerClasses, children: _jsx(PullupPanel, { minHeight: minHeight, maxHeight: maxHeight, tabsContent: _jsx(PullupTabs, { activeTab: activeTab }), mainContent: _jsx(PullupContent, {}), className: className }) }));
}
export default Pullup;
//# sourceMappingURL=Pullup.js.map