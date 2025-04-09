import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigation } from '@ub-ecosystem/state-management';
import styles from './BookNavigationPanel.module.css';
/**
 * BookNavigationPanel Component
 *
 * A sliding panel that displays book-level navigation options.
 */
export function BookNavigationPanel({ isOpen, className = '' }) {
    const { toggleBookNav, setCurrentPaper } = useNavigation();
    // Example paper data - in a real implementation, this would come from a data source
    const papers = [
        { id: 'paper1', title: 'The Universal Father' },
        { id: 'paper2', title: 'The Nature of God' },
        { id: 'paper3', title: 'The Attributes of God' },
        { id: 'paper4', title: "God's Relation to the Universe" },
        { id: 'paper5', title: "God's Relation to the Individual" },
    ];
    const handlePaperClick = (paperId) => {
        setCurrentPaper(paperId);
        toggleBookNav(); // Close the navigation panel after selection
    };
    const panelClasses = [styles.bookNavigationPanel, isOpen ? styles.open : '', className]
        .filter(Boolean)
        .join(' ');
    return (_jsxs("nav", { className: panelClasses, "aria-hidden": !isOpen, children: [_jsxs("div", { className: styles.header, children: [_jsx("h2", { className: styles.title, children: "Urantia Book" }), _jsx("button", { className: styles.closeButton, onClick: toggleBookNav, "aria-label": "Close book navigation", children: "\u00D7" })] }), _jsx("ul", { className: styles.navigationList, children: papers.map(paper => (_jsx("li", { className: styles.navigationItem, children: _jsx("a", { href: `#${paper.id}`, className: styles.navigationLink, onClick: e => {
                            e.preventDefault();
                            handlePaperClick(paper.id);
                        }, children: paper.title }) }, paper.id))) })] }));
}
export default BookNavigationPanel;
//# sourceMappingURL=BookNavigationPanel.js.map