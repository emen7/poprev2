import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import PaperNavigation from '../../../../../components/PaperNavigation';
import PaperTTSPlayerWrapper from '../../../../../components/PaperTTSPlayerWrapper';
import UBParagraph from '../../../../../components/UBParagraph';
// This would be replaced with actual data fetching
const getPaperSection = async (paperId, sectionId) => {
    // Mock data for demonstration
    return {
        paper: {
            number: parseInt(paperId, 10),
            title: `Paper ${paperId}`,
            author: 'Divine Counselor',
            sections: [
                {
                    number: parseInt(sectionId, 10),
                    title: `Section ${sectionId}`,
                    paragraphs: [
                        {
                            number: 1,
                            text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book.',
                        },
                        {
                            number: 2,
                            text: 'Another sample paragraph. The real implementation would fetch this data from a database or API.',
                        },
                        {
                            number: 3,
                            text: 'A third sample paragraph with a reference to <a href="/paper/1/section/3" class="ub-reference">Paper 1, Section 3</a>.',
                        },
                    ],
                },
            ],
        },
        section: {
            number: parseInt(sectionId, 10),
            title: `Section ${sectionId}`,
            paragraphs: [
                {
                    number: 1,
                    text: 'This is a sample paragraph for demonstration purposes. In the actual implementation, this would be real content from The Urantia Book.',
                },
                {
                    number: 2,
                    text: 'Another sample paragraph. The real implementation would fetch this data from a database or API.',
                },
                {
                    number: 3,
                    text: 'A third sample paragraph with a reference to <a href="/paper/1/section/3" class="ub-reference">Paper 1, Section 3</a>.',
                },
            ],
        },
        totalSections: 10,
    };
};
export default async function SectionPage({ params, }) {
    const { paper, section, totalSections } = await getPaperSection(params.id, params.sectionId);
    const sectionNumber = parseInt(params.sectionId, 10);
    const prevSection = sectionNumber > 1 ? sectionNumber - 1 : null;
    const nextSection = sectionNumber < totalSections ? sectionNumber + 1 : null;
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx(PaperNavigation, { currentPaper: paper.number, currentSection: section.number }), _jsxs("div", { className: "ub-paper", children: [_jsx("h1", { className: "ub-paper-title", children: _jsxs(Link, { href: `/paper/${paper.number}`, className: "hover:underline", children: ["Paper ", paper.number, ": ", paper.title] }) }), paper.author && _jsxs("div", { className: "ub-paper-author", children: ["Presented by: ", paper.author] }), _jsx(PaperTTSPlayerWrapper, { paper: paper, currentSectionNumber: section.number }), _jsxs("div", { className: "ub-section", id: `section-${section.number}`, children: [_jsxs("h2", { className: "ub-section-title", children: [section.number, ". ", section.title] }), _jsx("div", { className: "ub-section-paragraphs", children: section.paragraphs.map(paragraph => (_jsx(UBParagraph, { paragraph: paragraph }, paragraph.number))) })] }), _jsxs("div", { className: "flex justify-between mt-8", children: [prevSection && (_jsxs(Link, { href: `/paper/${paper.number}/section/${prevSection}`, className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: ["\u2190 Section ", prevSection] })), _jsx(Link, { href: `/paper/${paper.number}`, className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: "Full Paper" }), nextSection && (_jsxs(Link, { href: `/paper/${paper.number}/section/${nextSection}`, className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: ["Section ", nextSection, " \u2192"] }))] })] }), _jsx(PaperNavigation, { currentPaper: paper.number, currentSection: section.number })] }));
}
//# sourceMappingURL=page.js.map