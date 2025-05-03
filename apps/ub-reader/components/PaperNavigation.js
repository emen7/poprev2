'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import Link from 'next/link';
const PaperNavigation = ({ currentPaper = 1, currentSection = 0, totalPapers = 196, }) => {
    const prevPaper = currentPaper > 1 ? currentPaper - 1 : null;
    const nextPaper = currentPaper < totalPapers ? currentPaper + 1 : null;
    return (_jsxs("div", { className: "flex justify-between items-center py-4 border-t border-b my-6", children: [_jsx("div", { children: prevPaper && (_jsxs(Link, { href: `/paper/${prevPaper}`, className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: ["\u2190 Paper ", prevPaper] })) }), _jsxs("div", { className: "text-center", children: [_jsx("select", { value: currentPaper, onChange: e => {
                            const paper = parseInt(e.target.value, 10);
                            window.location.href = `/paper/${paper}`;
                        }, className: "px-4 py-2 border rounded mr-2", children: Array.from({ length: totalPapers }, (_, i) => i + 1).map(paper => (_jsxs("option", { value: paper, children: ["Paper ", paper] }, paper))) }), currentSection > 0 && (_jsxs("select", { value: currentSection, onChange: e => {
                            const section = parseInt(e.target.value, 10);
                            window.location.href = `/paper/${currentPaper}/section/${section}`;
                        }, className: "px-4 py-2 border rounded", children: [_jsx("option", { value: 0, children: "All Sections" }), Array.from({ length: 10 }, (_, i) => i + 1).map(section => (_jsxs("option", { value: section, children: ["Section ", section] }, section)))] }))] }), _jsx("div", { children: nextPaper && (_jsxs(Link, { href: `/paper/${nextPaper}`, className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: ["Paper ", nextPaper, " \u2192"] })) })] }));
};
export default PaperNavigation;
//# sourceMappingURL=PaperNavigation.js.map