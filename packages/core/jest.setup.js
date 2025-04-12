// Add Jest DOM matchers
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);
