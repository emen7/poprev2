// Add Jest DOM matchers
require('@testing-library/jest-dom');
const { toHaveNoViolations } = require('jest-axe');

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);
