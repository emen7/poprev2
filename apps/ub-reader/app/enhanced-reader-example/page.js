import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Enhanced Reader Example Page (DEPRECATED)
 *
 * This page demonstrates the deprecated Enhanced Reader component.
 * It is kept for reference purposes but should not be used in new development.
 *
 * Please use the Traditional Reader implementation instead, which provides
 * a more streamlined and focused reading experience that better matches
 * the improved-demo.html design.
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';
// Use dynamic import with SSR disabled for the Reader example
// This is necessary because the Reader component uses browser APIs
const EnhancedReaderExample = dynamic(() => import('../../examples/enhanced-reader-example'), {
    ssr: false,
});
/**
 * Enhanced Reader Example Page Component (DEPRECATED)
 */
export default function EnhancedReaderExamplePage() {
    return (_jsxs("div", { className: "enhanced-reader-example-page", children: [_jsxs("div", { className: "fixed top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center z-50", children: [_jsx("strong", { children: "DEPRECATED:" }), " This example uses the deprecated Enhanced Reader. Please use the", ' ', _jsx(Link, { href: "/traditional-test", className: "underline font-bold", children: "Traditional Reader" }), ' ', "instead."] }), _jsx("div", { className: "pt-12", children: _jsx(EnhancedReaderExample, {}) })] }));
}
//# sourceMappingURL=page.js.map