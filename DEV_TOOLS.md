# Development Tools Guide

This document provides an overview of the development tools set up in this project and how to use them effectively.

## Code Quality Tools

### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that enforces a consistent style across the codebase.

- **Usage**:
  - Format all files: `pnpm format`
  - Check formatting: `pnpm format:check`
  - Automatically runs on staged files via lint-staged

### ESLint

[ESLint](https://eslint.org/) is a static code analysis tool for identifying problematic patterns in JavaScript/TypeScript code.

- **Usage**:
  - Lint all files: `pnpm lint:js`
  - Fix linting issues: `pnpm lint:js:fix`
  - Automatically runs on staged files via lint-staged

#### Configured ESLint Plugins

- **@typescript-eslint**: TypeScript-specific linting rules
- **eslint-plugin-react**: React-specific linting rules
- **eslint-plugin-react-hooks**: Rules for React Hooks
- **eslint-plugin-import**: Rules for import/export syntax
- **eslint-plugin-jsx-a11y**: Accessibility rules for JSX
- **eslint-plugin-testing-library**: Best practices for Testing Library
- **eslint-plugin-jest-dom**: Best practices for jest-dom assertions
- **eslint-plugin-tailwindcss**: Rules for Tailwind CSS classes

### Stylelint

[Stylelint](https://stylelint.io/) is a linter for CSS files.

- **Usage**:
  - Lint CSS files: `pnpm lint:css`
  - Automatically runs on staged files via lint-staged

### TypeScript

[TypeScript](https://www.typescriptlang.org/) provides static type checking for JavaScript.

- **Usage**:
  - Type check: `pnpm type-check`
  - Automatically runs on staged files via lint-staged

#### CSS Modules Support

The project is configured with `typescript-plugin-css-modules` to provide TypeScript support for CSS modules.

## Git Hooks

### Husky

[Husky](https://typicode.github.io/husky/) is used to set up Git hooks.

- **pre-commit**: Runs lint-staged to format and lint staged files
- **commit-msg**: Validates commit messages using commitlint

### lint-staged

[lint-staged](https://github.com/okonet/lint-staged) runs linters on staged files.

- **Configuration**: See `lint-staged` section in package.json
- **Runs**:
  - ESLint, Prettier, and TypeScript type checking on JS/TS files
  - Stylelint and Prettier on CSS files
  - Prettier on JSON and MD files

### commitlint

[commitlint](https://commitlint.js.org/) checks if commit messages meet the conventional commit format.

- **Configuration**: See commitlint.config.js

## Testing Tools

### Vitest

[Vitest](https://vitest.dev/) is a fast test runner for JavaScript.

- **Usage**:
  - Run tests: `pnpm test`
  - Watch mode: `pnpm test:watch`
  - UI mode: `pnpm test:ui`
  - Coverage: `pnpm test:coverage`

### Testing Library

[Testing Library](https://testing-library.com/) provides utilities for testing UI components.

- **Usage**: Import from test-utils.tsx for consistent testing setup

### jest-axe

[jest-axe](https://github.com/nickcolley/jest-axe) is used for accessibility testing in unit tests.

- **Usage**:

  ```typescript
  import { render, checkA11y } from './test-utils';

  it('should not have any accessibility violations', async () => {
    const { container } = render(<YourComponent />);
    await checkA11y(container);
  });
  ```

## Bundle Analysis

### @next/bundle-analyzer

[Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer) visualizes the size of webpack output files.

- **Usage**: `pnpm build:analyze`
- This will generate bundle analysis reports in the `.next/analyze` directory

## VS Code Integration

The project includes VS Code settings for optimal development experience:

- Format on save
- ESLint and Stylelint auto-fixing on save
- Recommended extensions

## Best Practices

1. **Write Accessible Components**: Use the jsx-a11y plugin and jest-axe tests to ensure accessibility
2. **Follow Import Order**: The import order is enforced by ESLint
3. **Use TypeScript Properly**: Avoid using `any` and ensure proper typing
4. **Write Tests**: Include unit tests with accessibility checks for components
5. **Follow Commit Conventions**: Use conventional commit format for commit messages
