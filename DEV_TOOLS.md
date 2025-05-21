# Development Tools Guide

This document provides an overview of the development tools used in the UB Ecosystem project and how to use them effectively.

## Table of Contents

- [Package Management](#package-management)
- [Build Tools](#build-tools)
- [Code Quality Tools](#code-quality-tools)
- [Testing Tools](#testing-tools)
- [UI Development Tools](#ui-development-tools)
- [Deployment Tools](#deployment-tools)
- [Recommended VS Code Extensions](#recommended-vs-code-extensions)

## Package Management

### pnpm

The project uses [pnpm](https://pnpm.io/) for package management. pnpm is faster and more efficient than npm or yarn, especially for monorepos.

```bash
# Install dependencies
pnpm install

# Add a dependency to a specific package
pnpm add <package-name> --filter=<workspace-name>

# Add a dev dependency to a specific package
pnpm add -D <package-name> --filter=<workspace-name>

# Add a dependency to the root package
pnpm add -w <package-name>

# Link a local package
pnpm add <package-name> --workspace
```

### Workspaces

The project uses pnpm workspaces to manage multiple packages in a monorepo. Workspaces are defined in the `pnpm-workspace.yaml` file.

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## Build Tools

### Turborepo

[Turborepo](https://turbo.build/) is used for build orchestration and task running. It provides caching, parallel execution, and dependency graph optimization.

```bash
# Run a script in all packages
pnpm turbo run <script-name>

# Run a script in specific packages
pnpm turbo run <script-name> --filter=<workspace-name>

# Run a script with cache disabled
pnpm turbo run <script-name> --no-cache
```

### TypeScript

The project uses [TypeScript](https://www.typescriptlang.org/) for type safety. TypeScript configuration is defined in `tsconfig.json` files.

```bash
# Type check all packages
pnpm type-check

# Type check in watch mode
pnpm type-check:watch
```

### Next.js

The reader applications are built with [Next.js](https://nextjs.org/), a React framework for production.

```bash
# Start a Next.js application in development mode
pnpm dev --filter=<app-name>

# Build a Next.js application
pnpm build --filter=<app-name>
```

## Code Quality Tools

### ESLint

[ESLint](https://eslint.org/) is used for static code analysis. ESLint configuration is defined in `.eslintrc.js`.

```bash
# Lint all files
pnpm lint:js

# Lint and fix all files
pnpm lint:js:fix
```

### Prettier

[Prettier](https://prettier.io/) is used for code formatting. Prettier configuration is defined in `.prettierrc`.

```bash
# Format all files
pnpm format

# Check if files are formatted correctly
pnpm format:check
```

### Stylelint

[Stylelint](https://stylelint.io/) is used for CSS linting. Stylelint configuration is defined in `.stylelintrc.json`.

```bash
# Lint CSS files
pnpm lint:css

# Lint and fix CSS files
pnpm lint:css:fix
```

### Husky and lint-staged

[Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) are used to run linters and formatters on staged files before committing.

```bash
# Install Husky hooks
pnpm prepare
```

### Commitlint

[Commitlint](https://commitlint.js.org/) is used to enforce commit message conventions. Commitlint configuration is defined in `commitlint.config.js`.

```bash
# Verify a commit message
npx commitlint --from HEAD~1 --to HEAD
```

## Testing Tools

### Vitest

[Vitest](https://vitest.dev/) is used for unit testing. Vitest configuration is defined in `vitest.config.js`.

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Testing Library

[Testing Library](https://testing-library.com/) is used for testing React components.

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});
```

## UI Development Tools

### Storybook

[Storybook](https://storybook.js.org/) is used for UI component development and documentation. Storybook configuration is defined in `.storybook/`.

```bash
# Start Storybook
pnpm storybook

# Build Storybook static site
pnpm build-storybook
```

### Chromatic

[Chromatic](https://www.chromatic.com/) is used for visual regression testing and Storybook publishing.

```bash
# Publish Storybook to Chromatic
pnpm chromatic
```

## Deployment Tools

### Vercel

[Vercel](https://vercel.com/) is used for deployment. Vercel configuration is defined in `vercel.json`.

```bash
# Deploy to Vercel (preview)
vercel

# Deploy to Vercel (production)
vercel --prod
```

### GitHub Actions

[GitHub Actions](https://github.com/features/actions) is used for continuous integration and deployment. GitHub Actions workflows are defined in `.github/workflows/`.

## Recommended VS Code Extensions

The project includes VS Code settings and recommended extensions to provide a consistent development experience:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [TypeScript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)
- [Storybook](https://marketplace.visualstudio.com/items?itemName=storybook.storybook-vscode)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions)
- [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
