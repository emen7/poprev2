import { configureAxe, toHaveNoViolations } from 'jest-axe';
import { expect } from 'vitest';
// Add the custom matcher to Jest's expect
expect.extend(toHaveNoViolations);
// Configure axe for your specific needs
export const axe = configureAxe({
    rules: {
    // You can customize rules here
    // For example, to disable a specific rule:
    // 'color-contrast': { enabled: false },
    },
});
/**
 * Helper function to test a component for accessibility violations
 * @param html The HTML to test
 */
export async function checkA11y(html) {
    const results = await axe(html);
    expect(results).toHaveNoViolations();
}
//# sourceMappingURL=axe-helper.js.map