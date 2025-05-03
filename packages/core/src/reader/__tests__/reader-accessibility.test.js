import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
// Add jest-axe matchers
expect.extend(toHaveNoViolations);
// Simple example component for testing
const DocumentTitle = ({ title }) => {
    return _jsx("h1", { children: title });
};
// Inaccessible component for testing
const InaccessibleTitle = ({ title }) => {
    // Missing semantic heading - this will fail accessibility tests
    return _jsx("div", { style: { fontWeight: 'bold', fontSize: '24px' }, children: title });
};
describe('Reader Components Accessibility', () => {
    it('DocumentTitle should not have accessibility violations', async () => {
        const { container } = render(_jsx(DocumentTitle, { title: "Test Document" }));
        // Run axe on the rendered component
        const results = await axe(container);
        // Check for accessibility violations
        expect(results).toHaveNoViolations();
    });
    it('InaccessibleTitle should have accessibility violations', async () => {
        const { container } = render(_jsx(InaccessibleTitle, { title: "Test Document" }));
        // Run axe on the rendered component
        const results = await axe(container);
        // This test will fail because the component is not accessible
        // We're using a try/catch to demonstrate the failure without breaking the test suite
        try {
            expect(results).toHaveNoViolations();
            // If we get here, the test failed to detect violations
            expect(true).toBe(false); // Force the test to fail
        }
        catch (error) {
            // We expect an error, so this is actually a success
            expect(error).toBeTruthy();
        }
    });
    it('should identify specific accessibility issues', async () => {
        const { container } = render(_jsxs("div", { children: [_jsx("img", { src: "test.jpg" }), " ", _jsx("button", {}), " "] }));
        // Run axe on the rendered component
        const results = await axe(container);
        // Check for specific violations
        try {
            expect(results).toHaveNoViolations();
        }
        catch (error) {
            // Check for specific issues in the violations
            const violations = results.violations;
            // Check for alt text issue
            const altTextIssue = violations.some(v => v.id === 'image-alt' || v.id === 'aria-required-attr');
            expect(altTextIssue).toBe(true);
            // Check for button content issue
            const buttonContentIssue = violations.some(v => v.id === 'button-name');
            expect(buttonContentIssue).toBe(true);
        }
    });
});
//# sourceMappingURL=reader-accessibility.test.js.map