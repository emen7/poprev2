import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ReaderLayout from '../layout/ReaderLayout';
import { Header, Footer } from '../layout';
import NotesPanel from '../panels/NotesPanel';
import { ScientificContentProvider } from '../scientific/ScientificContentContext';
import { exampleTooltipData } from '../types/TooltipData';
import ScientificTooltip from '../scientific/ScientificTooltip';
import './ReaderDemo.css';
/**
 * ReaderDemo Component
 *
 * A demo component that showcases the enhanced reader features:
 * - Width limitation
 * - Multi-purpose pull-up panel
 * - Scientific content tooltips
 */
export function ReaderDemo() {
    // State for the bottom panel tabs
    const [activeTab, setActiveTab] = useState('notes');
    // Sample scientific content with tooltips
    const sampleContent = (_jsxs("div", { className: "sample-content", children: [_jsx("h1", { children: "Understanding Quantum Physics" }), _jsxs("p", { children: ["Modern physics is built upon two fundamental theories:", _jsx(ScientificTooltip, { content: "Quantum Entanglement", data: exampleTooltipData['Quantum Entanglement'] }), "and relativity. The famous equation", _jsx(ScientificTooltip, { content: "E=mc\u00B2", data: exampleTooltipData['E=mc²'] }), "from Einstein's theory of relativity demonstrates the relationship between energy and mass."] }), _jsxs("p", { children: ["In molecular biology,", _jsx(ScientificTooltip, { content: "DNA", data: exampleTooltipData['DNA'] }), "and", _jsx(ScientificTooltip, { content: "RNA", data: exampleTooltipData['RNA'] }), "are essential molecules for life. They carry the genetic information that determines the development and functioning of all living organisms."] }), _jsx("h2", { children: "Quantum Mechanics Principles" }), _jsx("p", { children: "Quantum mechanics describes the behavior of matter and energy at the atomic and subatomic scales. It introduces concepts like superposition, where particles can exist in multiple states simultaneously until measured." }), _jsxs("p", { children: ["Another key concept is", _jsx(ScientificTooltip, { content: "Quantum Entanglement", data: exampleTooltipData['Quantum Entanglement'] }), ", where particles become connected in such a way that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them."] }), _jsx("h2", { children: "Relativity and Energy" }), _jsxs("p", { children: ["Einstein's special theory of relativity introduced the concept that energy and mass are equivalent, as expressed in the equation", _jsx(ScientificTooltip, { content: "E=mc\u00B2", data: exampleTooltipData['E=mc²'] }), ". This relationship has profound implications for our understanding of the universe and has led to developments in nuclear energy and weapons."] }), _jsx("h2", { children: "Molecular Biology" }), _jsxs("p", { children: ["The discovery of the structure of", _jsx(ScientificTooltip, { content: "DNA", data: exampleTooltipData['DNA'] }), "by Watson and Crick in 1953 revolutionized our understanding of genetics. The double helix structure allows for the storage and transmission of genetic information."] }), _jsxs("p", { children: [_jsx(ScientificTooltip, { content: "RNA", data: exampleTooltipData['RNA'] }), ", while similar to DNA, plays different roles in the cell, including protein synthesis and gene regulation. In some viruses, RNA rather than DNA serves as the genetic material."] })] }));
    // Bottom panel tabs
    const bottomPanelTabs = [
        {
            id: 'notes',
            label: 'Notes',
            content: _jsx(NotesPanel, { documentId: "quantum-physics-demo" }),
        },
        {
            id: 'references',
            label: 'References',
            content: (_jsxs("div", { className: "references-placeholder", children: [_jsx("h3", { children: "References" }), _jsx("p", { children: "This is a placeholder for the References panel." }), _jsxs("ul", { children: [_jsx("li", { children: "Einstein, A. (1905). \"On the Electrodynamics of Moving Bodies\"" }), _jsx("li", { children: "Feynman, R. (1985). \"QED: The Strange Theory of Light and Matter\"" }), _jsx("li", { children: "Watson, J. & Crick, F. (1953). \"Molecular Structure of Nucleic Acids\"" })] })] })),
        },
        {
            id: 'glossary',
            label: 'Glossary',
            content: (_jsxs("div", { className: "glossary-placeholder", children: [_jsx("h3", { children: "Glossary" }), _jsx("p", { children: "This is a placeholder for the Glossary panel." }), _jsxs("dl", { children: [_jsx("dt", { children: "Quantum Mechanics" }), _jsx("dd", { children: "A fundamental theory in physics that describes nature at the smallest scales of energy levels of atoms and subatomic particles." }), _jsx("dt", { children: "Relativity" }), _jsx("dd", { children: "A theory developed by Albert Einstein that describes the relationship between space and time, and how gravity affects them." }), _jsx("dt", { children: "Molecular Biology" }), _jsx("dd", { children: "The branch of biology that deals with the structure and function of the macromolecules essential to life." })] })] })),
        },
    ];
    // Header content
    const headerContent = (_jsx(Header, { leftContent: _jsx("button", { onClick: () => console.log('Back button clicked'), children: "Back" }), centerContent: _jsx("h1", { children: "Enhanced Reader Demo" }) }));
    // Footer content
    const footerContent = (_jsx(Footer, { copyrightText: "\u00A9 2025 UB Reader", centerContent: _jsxs("div", { className: "footer-links", children: [_jsx("a", { href: "#", children: "Terms" }), _jsx("a", { href: "#", children: "Privacy" }), _jsx("a", { href: "#", children: "Help" })] }) }));
    return (_jsx(ScientificContentProvider, { initialData: exampleTooltipData, includeExampleData: true, children: _jsx(ReaderLayout, { showHeader: true, showFooter: true, headerContent: headerContent, footerContent: footerContent, contentWidth: "medium", showBottomPanel: true, bottomPanelTabs: bottomPanelTabs, bottomPanelInitialHeight: 300, children: sampleContent }) }));
}
export default ReaderDemo;
//# sourceMappingURL=ReaderDemo.js.map