import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Unit tests for the HeaderRow component
 */
import { render, screen } from '@testing-library/react';
import { HeaderRow } from '../HeaderRow';
describe('HeaderRow', () => {
    it('renders with the correct row type class', () => {
        // Render with different row types
        const { rerender } = render(_jsx(HeaderRow, { rowType: "top", "data-testid": "header-row" }));
        // Get the row element
        const row = screen.getByTestId('header-row');
        // Check that the correct class is applied for top row
        expect(row.classList.contains('top')).toBe(true);
        // Rerender with paper row type
        rerender(_jsx(HeaderRow, { rowType: "paper", "data-testid": "header-row" }));
        expect(row.classList.contains('paper')).toBe(true);
        // Rerender with section row type
        rerender(_jsx(HeaderRow, { rowType: "section", "data-testid": "header-row" }));
        expect(row.classList.contains('section')).toBe(true);
    });
    it('renders left, center, and right content correctly', () => {
        render(_jsx(HeaderRow, { rowType: "top", leftContent: _jsx("div", { "data-testid": "left-content", children: "Left" }), centerContent: _jsx("div", { "data-testid": "center-content", children: "Center" }), rightContent: _jsx("div", { "data-testid": "right-content", children: "Right" }) }));
        // Check that all content is rendered
        expect(screen.getByTestId('left-content')).toBeInTheDocument();
        expect(screen.getByTestId('center-content')).toBeInTheDocument();
        expect(screen.getByTestId('right-content')).toBeInTheDocument();
        // Check the content text
        expect(screen.getByTestId('left-content')).toHaveTextContent('Left');
        expect(screen.getByTestId('center-content')).toHaveTextContent('Center');
        expect(screen.getByTestId('right-content')).toHaveTextContent('Right');
    });
    it('applies custom className correctly', () => {
        render(_jsx(HeaderRow, { rowType: "top", className: "custom-class", "data-testid": "header-row" }));
        // Get the row element
        const row = screen.getByTestId('header-row');
        // Check that the custom class is applied
        expect(row.classList.contains('custom-class')).toBe(true);
    });
    it('renders with empty content areas when not provided', () => {
        render(_jsx(HeaderRow, { rowType: "top", "data-testid": "header-row" }));
        // Get the row element
        const row = screen.getByTestId('header-row');
        // Check that the row has three child divs (left, center, right)
        expect(row.children.length).toBe(3);
        // Check that the content areas are empty
        expect(row.children[0]).toBeEmptyDOMElement();
        expect(row.children[1]).toBeEmptyDOMElement();
        expect(row.children[2]).toBeEmptyDOMElement();
    });
});
//# sourceMappingURL=HeaderRow.test.js.map