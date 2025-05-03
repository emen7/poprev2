import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import PaperNavigation from '../../../components/PaperNavigation';
import PaperTTSPlayerWrapper from '../../../components/PaperTTSPlayerWrapper';
import UBParagraph from '../../../components/UBParagraph';
// This would be replaced with actual data fetching
const getPaper = async (id) => {
    // Mock data for demonstration
    return {
        number: parseInt(id, 10),
        title: `Paper ${id}`,
        author: 'Divine Counselor',
        sections: [
            {
                number: 1,
                title: 'Introduction',
                paragraphs: [
                    {
                        number: 1,
                        text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book. See Paper 2, Section 1 for more information.',
                    },
                    {
                        number: 2,
                        text: 'Another sample paragraph. The real implementation would fetch this data from a database or API. You can also refer to Section 3 of this paper for more details.',
                    },
                ],
            },
            {
                number: 2,
                title: 'Sample Section',
                paragraphs: [
                    {
                        number: 1,
                        text: 'This is a sample paragraph in section 2. It demonstrates how sections and paragraphs are structured. For more information on this topic, see Paper 3:2.5 or Paper 1-3.',
                    },
                ],
            },
            {
                number: 3,
                title: 'References Section',
                paragraphs: [
                    {
                        number: 1,
                        text: 'This section demonstrates various reference formats: Paper 1, Section 3; 2:1; 3-2; Paper 4; Section 2.',
                    },
                ],
            },
        ],
    };
};
export default async function PaperPage({ params }) {
    const paper = await getPaper(params.id);
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx(PaperNavigation, { currentPaper: paper.number }), _jsxs("div", { className: "ub-paper", children: [_jsxs("h1", { className: "ub-paper-title", children: ["Paper ", paper.number, ": ", paper.title] }), paper.author && _jsxs("div", { className: "ub-paper-author", children: ["Presented by: ", paper.author] }), _jsx(PaperTTSPlayerWrapper, { paper: paper }), _jsxs("div", { className: "my-6 p-4 bg-gray-50 rounded", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Sections in this Paper" }), _jsx("ul", { className: "pl-6 space-y-1", children: paper.sections.map(section => (_jsx("li", { children: _jsxs(Link, { href: `/paper/${paper.number}/section/${section.number}`, className: "text-blue-600 hover:underline", children: [section.number, ". ", section.title] }) }, section.number))) })] }), _jsx("div", { className: "ub-paper-sections", children: paper.sections.map(section => (_jsxs("div", { className: "ub-section", id: `section-${section.number}`, children: [_jsx("h2", { className: "ub-section-title", children: _jsxs(Link, { href: `/paper/${paper.number}/section/${section.number}`, className: "hover:underline", children: [section.number, ". ", section.title] }) }), _jsx("div", { className: "ub-section-paragraphs", children: section.paragraphs.map(paragraph => (_jsx(UBParagraph, { paragraph: paragraph, currentPaper: paper.number }, paragraph.number))) })] }, section.number))) })] }), _jsx(PaperNavigation, { currentPaper: paper.number })] }));
}
//# sourceMappingURL=page.js.map