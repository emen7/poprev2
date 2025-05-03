import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HighlightProvider, useHighlight } from '../components/HighlightContext';
// Mock component that uses the highlight context
const TestComponent = () => {
    const { showHighlights, setShowHighlights, highlights, addHighlight, removeHighlight } = useHighlight();
    const handleAddHighlight = () => {
        const mockRange = document.createRange();
        const mockHighlight = {
            text: 'Test highlight',
            color: 'yellow',
            range: mockRange,
        };
        addHighlight(mockHighlight);
    };
    const handleRemoveHighlight = () => {
        if (highlights.length > 0) {
            removeHighlight(highlights[0]);
        }
    };
    return (_jsxs("div", { children: [_jsx("div", { "data-testid": "highlight-count", children: highlights.length }), _jsx("button", { "data-testid": "toggle-highlights", onClick: () => setShowHighlights(!showHighlights), children: showHighlights ? 'Hide Highlights' : 'Show Highlights' }), _jsx("button", { "data-testid": "add-highlight", onClick: handleAddHighlight, children: "Add Highlight" }), _jsx("button", { "data-testid": "remove-highlight", onClick: handleRemoveHighlight, children: "Remove Highlight" })] }));
};
describe('HighlightContext', () => {
    beforeEach(() => {
        // Set up document body with a container for highlighting
        document.body.innerHTML = '<div id="test-container"><p>This is a test paragraph with some text to highlight.</p></div>';
    });
    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });
    it('should provide highlight context to children', () => {
        render(_jsx(HighlightProvider, { containerSelector: "#test-container", isDarkMode: () => false, showHighlights: true, children: _jsx(TestComponent, {}) }));
        // Initial state
        expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
        expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Hide Highlights');
    });
    it('should toggle highlight visibility', () => {
        render(_jsx(HighlightProvider, { containerSelector: "#test-container", isDarkMode: () => false, showHighlights: true, children: _jsx(TestComponent, {}) }));
        // Initial state
        expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Hide Highlights');
        // Toggle highlights off
        fireEvent.click(screen.getByTestId('toggle-highlights'));
        // Updated state
        expect(screen.getByTestId('toggle-highlights')).toHaveTextContent('Show Highlights');
    });
    it('should add and remove highlights', () => {
        render(_jsx(HighlightProvider, { containerSelector: "#test-container", isDarkMode: () => false, showHighlights: true, children: _jsx(TestComponent, {}) }));
        // Initial state
        expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
        // Add a highlight
        fireEvent.click(screen.getByTestId('add-highlight'));
        // Updated state
        expect(screen.getByTestId('highlight-count')).toHaveTextContent('1');
        // Remove the highlight
        fireEvent.click(screen.getByTestId('remove-highlight'));
        // Final state
        expect(screen.getByTestId('highlight-count')).toHaveTextContent('0');
    });
});
//# sourceMappingURL=HighlightContext.test.js.map