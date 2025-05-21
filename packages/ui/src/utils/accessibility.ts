import { axe, toHaveNoViolations, AxeResults } from 'jest-axe';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

/**
 * Configuration options for accessibility testing
 */
export interface AccessibilityTestOptions {
  /**
   * Rules to include in the test
   */
  includeRules?: string[];
  
  /**
   * Rules to exclude from the test
   */
  excludeRules?: string[];
  
  /**
   * Whether to run the test in debug mode
   */
  debug?: boolean;
}

/**
 * Tests a DOM element for accessibility violations
 * 
 * @param element - The DOM element to test
 * @param options - Configuration options for the test
 * @returns The axe results
 */
export async function testAccessibility(
  element: Element | string,
  options?: AccessibilityTestOptions
): Promise<AxeResults> {
  const axeOptions = {
    rules: {},
  };

  // Include specific rules if provided
  if (options?.includeRules?.length) {
    options.includeRules.forEach(rule => {
      axeOptions.rules[rule] = { enabled: true };
    });
  }

  // Exclude specific rules if provided
  if (options?.excludeRules?.length) {
    options.excludeRules.forEach(rule => {
      axeOptions.rules[rule] = { enabled: false };
    });
  }

  const results = await axe(element, axeOptions);
  
  if (options?.debug) {
    // eslint-disable-next-line no-console
    console.log(results);
  }
  
  return results;
}

/**
 * Asserts that an element has no accessibility violations
 * 
 * @param element - The DOM element to test
 * @param options - Configuration options for the test
 */
export async function assertNoAccessibilityViolations(
  element: Element | string,
  options?: AccessibilityTestOptions
): Promise<void> {
  const results = await testAccessibility(element, options);
  expect(results).toHaveNoViolations();
}
