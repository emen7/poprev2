# Code Quality Tools

This project uses several tools to ensure code quality and consistency across the codebase.

## ESLint

ESLint is configured to enforce code quality rules for JavaScript and TypeScript files. The configuration can be found in `.eslintrc.js`.

To run ESLint:

```bash
pnpm lint:js
```

To automatically fix ESLint issues:

```bash
pnpm lint:js:fix
```

## Prettier

Prettier is used for code formatting. The configuration can be found in `.prettierrc`.

To format all files:

```bash
pnpm format
```

To check if files are formatted correctly:

```bash
pnpm format:check
```

## Stylelint

Stylelint is used for CSS linting. The configuration can be found in `.stylelintrc.json`.

To run Stylelint:

```bash
pnpm lint:css
```

## Pre-commit Hooks

This project uses Husky and lint-staged to run linters and formatters on staged files before committing.

When you commit changes, the pre-commit hook will:

1. Run ESLint on staged JavaScript and TypeScript files
2. Run Stylelint on staged CSS files
3. Format all staged files with Prettier

This ensures that all committed code meets the project's quality standards.

## VSCode Integration

The project includes VSCode settings and recommended extensions to provide a consistent development experience:

- Format on save
- ESLint and Stylelint integration
- Debugging configurations for Next.js

To get the best experience, install the recommended extensions when prompted by VSCode.
