import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { assertNoAccessibilityViolations, AccessibilityTestOptions } from './utils/accessibility';

/**
 * Theme context mock provider
 */
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="theme-provider">{children}</div>;
};

/**
 * Custom render function that includes providers
 *
 * @param ui - The React element to render
 * @param options - Additional render options
 * @returns The render result plus additional test utilities
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options,
  });
}

/**
 * Helper function to test a component for accessibility violations
 *
 * @param html - The HTML element to test
 * @param options - Optional configuration for the accessibility test
 * @returns Promise that resolves when the test is complete
 */
async function checkA11y(html: Element, options?: AccessibilityTestOptions) {
  await assertNoAccessibilityViolations(html, options);
}

/**
 * Setup user event for testing interactions
 *
 * @returns A user event instance
 */
function setupUser() {
  return userEvent.setup();
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render, checkA11y, setupUser };
