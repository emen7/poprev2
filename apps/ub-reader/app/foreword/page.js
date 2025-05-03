import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import PaperNavigation from '../../components/PaperNavigation';
import UBParagraph from '../../components/UBParagraph';
// This would be replaced with actual data fetching
const getForeword = async () => {
    // Mock data for demonstration
    return {
        title: 'Foreword',
        author: 'Divine Counselor',
        paragraphs: [
            {
                number: 1,
                text: 'In the minds of the mortals of Urantia—that being the name of your world—there exists great confusion respecting the meaning of such terms as God, divinity, and deity. Human beings are still more confused and uncertain about the relationships of the divine personalities designated by these numerous appellations. See Paper 1, Section 1 for more details on this topic.',
            },
            {
                number: 2,
                text: 'Because of this conceptual poverty associated with so much ideational confusion, I have been directed to formulate this introductory statement in explanation of the meanings which should be attached to certain word symbols as they may be hereinafter used in those papers which the Orvonton corps of truth revealers have been authorized to translate into the English language of Urantia. Reference 1:3 provides additional context.',
            },
            {
                number: 3,
                text: 'It is exceedingly difficult to present enlarged concepts and advanced truth, in our endeavor to expand cosmic consciousness and enhance spiritual perception, when we are restricted to the use of a circumscribed language of the realm. But our mandate admonishes us to make every effort to convey our meanings by using the word symbols of the English tongue. We have been instructed to introduce new terms only when the concept to be portrayed finds no terminology in English which can be employed to convey such a new concept partially or even with more or less distortion of meaning. For more on language limitations, see Paper 2-1.',
            },
        ],
    };
};
export default async function ForewordPage() {
    const foreword = await getForeword();
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "ub-paper", children: [_jsx("h1", { className: "ub-paper-title", children: foreword.title }), foreword.author && _jsxs("div", { className: "ub-paper-author", children: ["Presented by: ", foreword.author] }), _jsx("div", { className: "ub-section-paragraphs", children: foreword.paragraphs.map(paragraph => (_jsx(UBParagraph, { paragraph: paragraph, currentPaper: 0 }, paragraph.number))) }), _jsx("div", { className: "mt-8", children: _jsx(Link, { href: "/paper/1", className: "px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors", children: "Continue to Paper 1 \u2192" }) })] }), _jsx(PaperNavigation, { currentPaper: 0 })] }));
}
//# sourceMappingURL=page.js.map