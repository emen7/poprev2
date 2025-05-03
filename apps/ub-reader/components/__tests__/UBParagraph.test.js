import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect } from 'vitest';
import { render, screen, checkA11y } from './test-utils';
import UBParagraph from '../UBParagraph';
describe('UBParagraph', () => {
    it('renders paragraph text correctly', () => {
        const testParagraph = {
            number: 1,
            text: 'This is a test paragraph',
        };
        render(_jsx(UBParagraph, { paragraph: testParagraph }));
        expect(screen.getByText(testParagraph.text)).toBeInTheDocument();
    });
    it('applies the correct CSS class', () => {
        const testParagraph = {
            number: 2,
            text: 'This is a test paragraph',
        };
        render(_jsx(UBParagraph, { paragraph: testParagraph }));
        const paragraphElement = screen.getByText(testParagraph.text).closest('.ub-paragraph');
        expect(paragraphElement).toHaveClass('ub-paragraph');
    });
    it('should not have any accessibility violations', async () => {
        const testParagraph = {
            number: 3,
            text: 'This is a test paragraph for accessibility',
        };
        const { container } = render(_jsx(UBParagraph, { paragraph: testParagraph }));
        // Check for accessibility violations
        await checkA11y(container);
    });
});
//# sourceMappingURL=UBParagraph.test.js.map